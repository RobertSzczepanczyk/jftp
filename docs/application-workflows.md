# Application workflows and verification design

## Scope

This guide covers only direct classes in `com.myjavaworld.jftp`. `actions` and `ssl` implementation details are delegated to their scoped guides. Statements below describe inspected source paths; they are not runtime results. JDK 25 is the provisional desktop target pending an actual build; newer non-LTS releases need an explicit compatibility strategy.

## Entry points and lifecycle

### Desktop

1. `JFTPApplication.main()` creates `JFTPApplication` (`JFTPApplication.java:57-59`).
2. On Mac, constructor sets legacy application-menu properties and calls reflective `OSXAdapter.init`; it also sets the default locale and attempts the preferred Look & Feel (`JFTPApplication.java:24-38`).
3. It constructs `JFTP`, makes it visible, and opens one initial session (`JFTPApplication.java:40-54`).
4. `JFTP`'s static initializer loads preferences, copies transfer types, and applies JVM proxy settings before the frame is created (`JFTP.java:79-107`). The frame builds its menu bar, window listener, toolbar, tabbed pane, and saved/default geometry (`JFTP.java:118-147`).
5. `windowOpened` maximizes only when there are no stored bounds and may start the updater (`JFTP.java:151-160`).

### Applet launcher

`JFTPApplet` statically applies locale/LAF, then `init()` builds a launch button. Pressing it creates a frame with `applet=true`, shows it, and opens a session (`JFTPApplet.java:34-70`). `JFTP.exit()` saves preferences and disposes the frame but calls `System.exit(0)` only when `applet` is false (`JFTP.java:181-198`). Keep this legacy path intact unless the owner decides otherwise. It directly extends `javax.swing.JApplet`, which Oracle lists as removed in JDK 26; compiling all source files with JDK 26 therefore needs a deliberate compatibility decision. [Oracle JDK 26 removed APIs](https://docs.oracle.com/en/java/javase/26/migrate/removed-apis.html)

### Mac integration

`OSXAdapter` reflectively looks up `com.apple.eawt.Application`, registers About/Preferences/Quit handlers, requests a dock icon, and can enable fullscreen (`OSXAdapter.java:66-171`). Handler callbacks forward to `JFTPApplication`; if the API is unavailable, it logs errors and continues. `OSXAdapterOld` uses compile-time EAWT types, but no call from `JFTPApplication` was observed.

### Shutdown

Window closing calls `JFTP.exit()`. It calls `FTPSession.closeSession()` for each current tab, stores frame bounds, attempts preference save while swallowing any exception, disposes, requests GC, and exits only in desktop mode (`JFTP.java:181-198`). `FTPSession.closeSession()` calls client disconnect synchronously if connected, stops the file monitor, and clears references (`FTPSession.java:315-328`). The distinction between this direct disconnect and the public asynchronous `disconnect()` path should be preserved/characterized when shutdown changes are proposed (`FTPSession.java:1495-1531`).

## Session connection flow

`FTPSession` owns an independent client/parser/remote host and working directories per tab (`FTPSession.java:70-108`). A connect request may first show a reconnect confirmation and starts a `SwingWorker`; `construct()` reflectively creates the configured FTP client and parser, applies passive mode, preference timeout/buffer, host TLS/data-channel options, attaches session listeners, then connects/logs in (`FTPSession.java:593-658`). It sends configured commands in order, optionally changes to the host's starting remote directory, and lists remote contents (`FTPSession.java:659-684`). `finished()` installs remote results, updates title/busy state, and changes local directory to the host-specific path (`FTPSession.java:686-698`).

Connection failures are handled through FTP/connection callbacks, status window errors, toolbar refresh, timers/progress reset, pane clearing, and title update (`FTPSession.java:518-590`). Exact event order and callback thread are external FTP API questions. Reconnect delegates to the stored host (`FTPSession.java:701-705`). Favorites connect through the currently selected session, creating a tab when absent, save favorite changes, hide the dialog, and call `session.connect(host)` (`FavoritesDlg.java:216-236`).

## Local and remote navigation/operations

- Session initialization chooses `JFTP.prefs.getLocalDirectory()` if it exists and is readable as a directory; otherwise it uses the platform default directory (`FTPSession.java:129-135`). The initial local listing runs through `SwingWorker.construct()` and updates `LocalPane` in `finished()` (`FTPSession.java:346-370`).
- Local navigation uses `FileSystemView` roots/parent traversal, working-directory combo history, local file model, selection status, and sortable columns (`LocalPane.java:104-142, 224-322`; `LocalFile.java:28-239`).
- Remote navigation calls client `setWorkingDirectory`, reads current directory, lists with the active remote filter, and updates the remote pane (`FTPSession.java:391-488`). Double-click enters remote directories/links or invokes open for files (`RemotePane.java:183-230`).
- Direct session methods create/rename/delete local and remote files/directories and refresh models. Local create/delete and remote create/rename/delete typically use `SwingWorker`; local rename acts inline. Remote delete and permission recursion call filtered listings (`FTPSession.java:973-1418`).
- Local and remote panes support selection, select-all/invert, sortable columns, menu/toolbar/keyboard commands, and cross-pane DnD; DnD's transfer payload is the selected app-level file array (`LocalPane.java:145-253, 252-319`; `RemotePane.java:137-230`; `DnDTransferHandler.java:34-164`).

## Transfers, batch sequencing, abort, and resume

Selected downloads and uploads are handled one at a time in a `SwingWorker` loop, stopping between items when the client disconnects or `abort` becomes true (`FTPSession.java:707-739, 835-877`). Direct recursive helpers descend into directories and transfer files while honoring the current local/remote filter when enumerating children (`FTPSession.java:741-810, 879-942`). Upload/download use extension-specific or default transfer type in auto mode; manual ASCII/binary applies per session (`FTPSession.java:208-234`; `JFTPPreferences.java:94-132`; `TransferModesPrefsPanel.java:78-99`). Listener callbacks update byte count/progress and reset on abort/close (`FTPSession.java:518-569`). The action layer sets the abort flag and calls external `FTPClient.abort()`; consult `src/main/java/com/myjavaworld/jftp/actions/AGENTS.md` for that workflow.

No direct-package queue object, durable queue storage, retry model, restart marker, or resume API call was found. The observed sequential selected-file loop should not be described as a resumable transfer queue. `downloadDataFile()` calls `client.download(source, target, type, false)` and upload passes `false, 0L` (`FTPSession.java:812-833, 897-920`). External client semantics for those parameters remain unverified.

### Edit, ZIP, and unzip routes

`downloadToTempFile()` makes a temp file, downloads it synchronously, and if requested registers it with `FileChangeMonitor` plus a `TransferObject`; a change asks for confirmation then uploads the edited temp file (`FTPSession.java:153-197, 1558-1602`). Menu actions expose download-as, download-and-unzip, zip-and-upload, and edit routes; the dialogs define destinations. ZIP and unzip progress is reported through `ZipListener` methods and a timer (`FTPSession.java:1632-1650`). The actual orchestration and temp-file deletion is in the actions/zip dependency and needs their guide or runtime verification.

## Filters, sorting, and user-visible state

Local filter UI captures Java regex flags, inclusive-looking date bounds (exact inclusivity belongs to external `DateFilter`), hidden-file choice, and inclusion/exclusion mode (`LocalFileFilterDlg.java:89-177`). `LocalFileFilter.accept()` applies hidden/regex/date decisions to files but unconditionally accepts directories (`LocalFileFilter.java:97-121`). Remote filter UI creates external `RemoteFileFilter` with regex/date/mode (`RemoteFileFilterDlg.java:81-172`). The local/remote comparator keys are name/type/size/date with direction state; pane header clicks toggle direction for the selected key (`LocalFileComparator.java:20-142`; `RemoteFileComparator.java:20-131`; `LocalPane.java:256-289`; `RemotePane.java:253-285`).

`StatusWindow` appends typed entries and drops the entire document once at/above 16 KiB; `StatusBar` resets progress/speed/time/secured display when asked (`StatusWindow.java:36-81`; `StatusBar.java:34-100`). This is source behavior; no UI responsiveness/EDT audit was executed.

## Preferences, favorite storage, and credential fields

`JFTPPreferences` defaults are constructed in memory and include a TreeMap of common text extensions as ASCII and binary as the fallback (`JFTPPreferences.java:75-158`). The preferences dialog edits global preferences panels, validates them, saves to `preferences.ser`, and updates proxy JVM properties on proxy panel save (`PreferencesDlg.java:95-114, 293-329`; `ProxyPrefsPanel.java:194-246`). Values are Java-serialized; preference proxy/keystore passwords are `char[]`, while `RemoteHost.password` and connection/favorite dialog values are `String` (`JFTPPreferences.java:51-69, 269-340`; `RemoteHost.java:47-111`; `ConnectionDlg.java:522-558`).

Favorites are loaded/saved by `FavoritesManager` at `~/.jftp/data/favorites.ser`; a stored item is a serialized `Favorite`/`RemoteHost` with password string and connection settings. Current save attempts AES `SealedObject` using the constant embedded byte key, and uses plaintext if cipher setup returns null. Read supports old raw list and rewrites it with current save format (`FavoritesManager.java:44-177`). This is a compatibility and security-sensitive boundary; exact wire format should be tested before changing.

## Integration and failure paths

- License agreement method exists in `JFTP` but the constructor call is commented out (`JFTP.java:118-120, 574-596`); do not assume the dialog is currently part of startup.
- Auto-update check is triggered on window open if preference says so; it waits 15 seconds, loads an HTTP properties URL and retries exceptions after five minutes (`JFTP.java:151-160`; `AutoUpdater.java:27-81`). It has no explicit stream close or stop lifecycle in this source.
- Help dialogs and buttons initialize the JavaHelp singleton through `JFTPHelp2`; `HelpSet.findHelpSet` may return a URL whose absence/error path is not robustly guarded before `hs.createHelpBroker` (`JFTPHelp2.java:34-60`). This is a possible help initialization risk, not confirmed at runtime.
- Save failures in user-triggered preferences show a GUI error; window shutdown silently ignores save exceptions (`PreferencesDlg.java:318-328`; `JFTP.java:189-195`). Favorite load/save exceptions are shown in the manager dialog (`FavoritesDlg.java:284-307`).

## Minimal startup blockers (source analysis only)

1. **Preference load failure leaves the static `prefs` field null.** `JFTP` assigns the field only inside `try`; its `IOException` catch only prints. The main constructor and both launch paths subsequently dereference preferences. A damaged/unreadable preference file or unavailable data-home path therefore has a direct null-dereference path. This is a minimal source blocker to cold startup under that failure condition, but it has not been reproduced (`JFTP.java:98-107, 523-550`; `JFTPApplication.java:30-39`; `JFTPApplet.java:47-52`).
2. **Required classpath resources can prevent UI construction.** `ResourceLoader.getBundle` and image-resource use occur in static initializers/construction across the app. If required resource bundles/images are absent, initialization can fail before the main frame is usable. The checked-in resource/package layout must be inspected separately before calling this a current deployment defect; no runtime failure is asserted.

Other concerns (slow synchronous shutdown disconnect, UI callbacks from unknown threads, updater retry loop, security of stored secrets, recursive operations honoring filters, applet obsolescence) are material follow-up risks but are not established as hard startup blockers by this source read.

## Proposed behavioral regression test families

These are implementation-independent contracts to build later; none was implemented or executed here. Distinguish the expected product contract from current-source behavior and from suspected defects.

### A. FTP connection, navigation, and listing contract

- **Fixture/setup:** use an in-process FTP server or controllable `FTPClient`/`ListParser` class names supplied through `RemoteHost`; create a remote sandbox with known directories/files plus malformed-list and denied-path cases.
- **Observable outcomes:** accepted credentials connect, initial commands and initial remote directory are applied in order, listing reaches the remote model, navigation changes working directory, filters affect visible results, and disconnect/failure clears remote state and returns the title/status to disconnected.
- **Edges/failures:** rejected login, inaccessible initial directory, parser exception, empty listing, stale/drop connection, absent selected session.
- **Seam:** reflective implementation class names in `RemoteHost`/`FTPSession.connect()` provide a narrow FTP double seam; session construction still needs Swing frame/resources and isolated preferences.
- **Defect boundary:** callback ordering and callback thread depend on external FTP interfaces and require a controlled fixture; source alone does not prove either.

### B. Upload/download round-trip contract

- **Fixture/setup:** connected test session, sandboxed local directory and remote root, known binary/text files, nested folders, plus a controllable slow/failing transfer implementation.
- **Observable outcomes:** binary file bytes round-trip unchanged; ASCII conversion follows the FTP client contract; extension mapping/manual mode choose expected transfer type; recursive directory transfers retain paths; multi-selection executes in order; abort stops subsequent items and resets status/busy state; failure is reported without claiming success.
- **Edges/failures:** empty selection, empty directory, existing target, disconnected mid-transfer, permissions, abort on first/middle item, null/failed local listing.
- **Seam:** `RemoteHost` class-name factory plus public `FTPSession` methods; actual FTP server fixture is needed for wire-level behavior.
- **Defect boundary:** no durable queue, retries, or resume call were found. Assert current intended batch/abort behavior, and gate resume assertions on a separate product/API decision.

### C. Preferences and favorite persistence contract

- **Fixture/setup:** set a temporary `user.home` before first active use of `JFTP`; use fresh JVM/classloader state and seed missing, valid, legacy raw-list, truncated, and unwritable files.
- **Observable outcomes:** missing preferences produce documented defaults; save/load preserves supported settings and transfer map; favorites preserve all connection fields and ordering; duplicate labels follow the selected case-insensitive policy; legacy raw favorites remain readable and migrate on write; errors surface or recover according to documented policy.
- **Edges/failures:** partial serialization, incompatible class version, empty favorites file, wrong serialized object type, unavailable AES, ciphertext mismatch, write failure, unknown extension and transfer type.
- **Seam:** public static `JFTP.loadPreferences/savePreferences` and `FavoritesManager` APIs; both storage paths derive from `JFTP.DATA_HOME` during class load, so isolate static state via separate processes or add a later path seam.
- **Defect boundary:** current preference IO catch may leave `JFTP.prefs` null; favorites may fall back to plaintext. Test desired startup recovery and secret-storage policy, not the failure as an expected result.

### D. ZIP upload/download/unzip contract

- **Fixture/setup:** local tree with nested/empty files and a known remote `.zip` fixture; select temp/current/other destination options through action-level harness and an isolated FTP fixture.
- **Observable outcomes:** zip upload archive contains the selected tree under the expected names; download-and-unzip produces expected files at the chosen directory; non-temp destinations persist while temporary artifacts follow the selected cleanup policy; cancellation makes no transfer; progress/status returns to idle after completion.
- **Edges/failures:** empty source selection, invalid destination, malformed ZIP, I/O/FTP failure, abort during transfer/zip, existing file collision, cleanup failure.
- **Seam:** direct dialogs expose approved destination/name choices and `FTPSession` supplies progress/zip listener methods; action sequence and delete-on-temp details are in the child actions guide and must be verified there.
- **Defect boundary:** this package shows dialog choices and progress callbacks, but does not prove action sequencing or archive library semantics. Avoid asserting behavior absent from those sources or runtime fixture.

## Future verification

Before production edits, establish a test harness that can launch Swing operations and wait for worker completion deterministically, control `user.home` before static class initialization, and run the external FTP dependency locally. The in-repository `SwingWorker` runs `construct()` in the background and schedules `finished()` on the EDT. `FileChangeMonitor` callbacks run from a Swing timer on the EDT; ZIP and progress callbacks are synchronous on the archive caller thread. Only external FTP callback thread guarantees remain unresolved. Keep source-observed behavior, approved target behavior, and actual runtime proof in separate records.

## Open questions

- Is there a supported applet host/runtime to retain, or is `JFTPApplet` a compile-only legacy artifact?
- Should cleanup use the same asynchronous disconnect path as manual disconnect, and how should application exit await transfers?
- Should filters affect recursive destructive operations, metadata counts, and recursive permission changes consistently?
- What is the intended behavior for partial upload/download files after abort or failure, and is resume an actual product requirement?
- Which current preference/favorite serialization shapes must remain backward-readable, and what credential-storage migration is acceptable?
- Are update checks expected to use HTTP, and should check failure block/affect startup? Source currently retries forever every five minutes on exception.
