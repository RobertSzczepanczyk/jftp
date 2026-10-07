# Direct application package architecture

## Scope

This is a source review of the 72 Java files directly in `src/main/java/com/myjavaworld/jftp/`. It excludes the `actions` and `ssl` subpackages, which have separate guides. It describes observed code only; no application, build, or test execution was performed for this review. File and line references point to the current source tree and should be refreshed with future changes.

## Inventory

| File | Responsibility and primary relationships |
| --- | --- |
| `AboutDlg.java` | About/memory dialog; displays `JFTPConstants` and `SystemUtil` details, starts a Swing `Timer`, and offers GC. |
| `AdvancedConnectionPrefsPanel.java` | Edits default client/parser class, passive mode, buffer size, and timeout in `JFTP.prefs`; maps user units to bytes/milliseconds. |
| `AutoUpdater.java` | Background thread reads the fixed HTTP update properties URL and reports update status through `GUIUtil`. |
| `CertificatePrefsPanel.java` | Edits certificate store paths in `JFTP.prefs`; no references from `PreferencesDlg`'s assembled cards were found. |
| `ChangeLocalDirectoryDlg.java` | Validates and returns a local directory string. |
| `ChangeRemoteDirectoryDlg.java` | Validates and returns a remote directory string. |
| `ConnectionDlg.java` | Collects ad hoc `RemoteHost` connection fields, TLS choices, client/parser, paths, and post-login commands. |
| `DnDTransferHandler.java` | Uses typed local/remote file-array `Transferable`s and forwards imports to upload/download actions. |
| `DownloadAndUnzipDlg.java` | Selects ZIP download and extraction destinations; exposes approved paths and temporary-delete choice. |
| `DownloadAsDlg.java` | Collects the local filename for a single remote download. |
| `DriveCellRenderer.java` | Renders local filesystem roots with display names/icons. |
| `ExecuteCommandDlg.java` | Splits non-empty command lines and returns them only after approval. |
| `Favorite.java` | Serializable `RemoteHost` specialization; equality and ordering use favorite label. |
| `FavoritePropertiesDlg.java` | Creates/edits full favorite connection properties and validates label/host/user/password/ports. |
| `FavoritesDlg.java` | Loads, sorts, edits, deletes, saves, and connects selected favorites; delegates persistence to `FavoritesManager`. |
| `FavoritesManager.java` | Serializes favorite lists at `JFTP.DATA_HOME/favorites.ser`; wraps lists in `SealedObject` AES where cipher setup succeeds. |
| `FTPMenu.java` | Connect/transfer/abort menu wiring to `actions`; enables entries using active session/selection state. |
| `FTPSession.java` | Session UI and FTP orchestration: owns one FTP client/parser, local/remote panes, status, filters, transfers, CRUD, listeners, and abort state. |
| `GeneralConnectionPrefsPanel.java` | Edits contact email and default local path. |
| `HelpMenu.java` | Connects help IDs and About to `JFTPHelp2`/`AboutDlg`. |
| `JFTP.java` | Main frame, menus/toolbar/tabs, session routing, preferences load/save, and window shutdown. |
| `JFTPApplet.java` | Legacy applet launcher; button creates a `JFTP(true)` frame and a new session. |
| `JFTPApplication.java` | Desktop entry point; sets locale/LAF, wires Mac hooks, displays frame, and creates first session. |
| `JFTPConstants.java` | Product metadata. |
| `JFTPHelp2.java` | Lazy singleton around JavaHelp HelpSet/HelpBroker and help IDs. |
| `JFTPPreferences.java` | Serializable preferences schema and defaults, including transfer extensions, proxy/security values, UI, window, license marker, and update flag. |
| `JFTPToolBar.java` | Toolbar wiring and action enablement based on the selected `FTPSession`. |
| `JFTPUtil.java` | Resource image helpers, elapsed-time formatting, and JVM SOCKS proxy/authenticator configuration. |
| `LocaleCellRenderer.java` | Renders `Locale` values by display name. |
| `LocalePrefsPanel.java` | Edits locale and short/medium date/time formats; updates previews. |
| `LocalFile.java` | `File`/`FileSystemView` wrapper with display metadata, roots, listings, permissions, deletion, and `Filter` application. |
| `LocalFileCellRenderer.java` | Renders local-file names and OS/fallback file icons. |
| `LocalFileComparator.java` | Sorts local files by name/type/size/date while grouping drives/directories according to comparator rules. |
| `LocalFileFilter.java` | Local include/exclude filter for hidden files, regex filename, and modified-date range; directories always pass. |
| `LocalFileFilterDlg.java` | Builds a `LocalFileFilter`; validates regex/date input and captures hidden-file setting. |
| `LocalFilePropertiesDlg.java` | Read-only local metadata and recursive size/count worker, respecting the active filter. |
| `LocalFileTableModel.java` | Four-column local table model: file, type, size, modified date. |
| `LocalPane.java` | Local filesystem navigation/table, selection, sorting, filtering refresh, context menus, keyboard actions, and DnD. |
| `LocalSystemMenu.java` | Local operations menu for open/edit/print, create/navigation/rename/delete/filter/refresh/properties/selection. |
| `LocalSystemPopupMenu.java` | Local context menu counterpart with upload actions and selection-state enablement. |
| `NewLocalDirectoryDlg.java` | Validates and returns a requested local directory name. |
| `NewLocalFileDlg.java` | Validates and returns a requested local filename. |
| `NewRemoteDirectoryDlg.java` | Validates and returns a remote directory name. |
| `NewRemoteFileDlg.java` | Validates and returns a remote filename. |
| `OSXAdapter.java` | Reflection-based Mac application-menu, dock icon, and fullscreen integration. |
| `OSXAdapterOld.java` | Older compile-time EAWT adapter; appears unused by `JFTPApplication`, which initializes `OSXAdapter`. |
| `package-info.java` | Package description. |
| `PreferencesDlg.java` | Preference tree/card dialog; validates each panel then writes its values through `JFTP.savePreferences`. |
| `ProxyPrefsPanel.java` | Edits SOCKS proxy/auth fields, validates host/port, and applies JVM-wide proxy settings. |
| `RemoteFileCellRenderer.java` | Renders remote-file names and generic file/directory icons. |
| `RemoteFileComparator.java` | Sorts external `ftp.RemoteFile` values by name/type/size/date. |
| `RemoteFileFilterDlg.java` | Builds an external `ftp.RemoteFileFilter` using regex/date and include/exclude choices. |
| `RemoteFilePropertiesDlg.java` | Remote metadata/permission editor and recursive size/count worker using `FTPClient` and its parser. |
| `RemoteFileTableModel.java` | Five-column remote table model, including permissions/attributes. |
| `RemoteHost.java` | Serializable connection record: host/authentication/client/parser/passive/TLS/initial directories/commands. |
| `RemotePane.java` | Remote navigation/table, sorting, selection, context menus, keyboard actions, DnD, and clear-on-disconnect. |
| `RemoteSystemMenu.java` | Remote file/command/filter/navigation menu wired to the corresponding actions/session APIs. |
| `RemoteSystemPopupMenu.java` | Remote context menu with download/edit/open/print/CRUD/filter/command actions. |
| `RenameLocalFileDlg.java` | Collects non-empty source and target names for local rename. |
| `RenameRemoteFileDlg.java` | Collects non-empty source and target names for remote rename. |
| `SecurityPrefsPanel.java` | Edits default SSL mode and unencrypted-data-channel flag. |
| `SessionPanel.java` | `JRootPane` wrapper with busy glass pane and title; `dispose()` is intentionally empty in this class. |
| `SoftwareUpdatePrefsPanel.java` | Edits update-check flag and starts manual `AutoUpdater`. |
| `StatusBar.java` | Status/progress/speed/time/security indicator display. |
| `StatusWindow.java` | Styled bounded command/reply/error/status log; clears the document when it reaches 16 KiB. |
| `ToolsMenu.java` | Favorites, certificates, and preferences action wiring. |
| `TransferModeMenu.java` | Session-scoped auto/ASCII/binary selection. |
| `TransferModesPrefsPanel.java` | Default mode and extension-to-mode map editor. |
| `TransferObject.java` | Local/remote file and direction tuple for changed-temp-file upload monitoring. |
| `UIPrefsPanel.java` | Edits installed Swing Look & Feel selection. |
| `UploadAsDlg.java` | Collects the remote target name for one local upload. |
| `ZipAndUploadDlg.java` | Collects ZIP filename and temporary/current/other ZIP output location. |

## Responsibilities

`JFTP` is the application shell; `FTPSession` is the operational boundary. Each tab contains a `SessionPanel` with its own `FTPClient`, `ListParser`, local/remote working directory, per-session transfer type, filters, abort flag, and monitor. Preferences are static at `JFTP.prefs`, and the shared `JFTP.DATA_HOME` is rooted at `user.home/.jftp/data` (`JFTP.java:66-75`). `FTPSession` builds the two panes and status display and installs FTP, control, data, filesystem-monitor, progress, and ZIP listeners (`FTPSession.java:70-108, 289-313`).

## Dependencies/interfaces

- FTP behavior depends on the external `com.myjavaworld.ftp` dependency: `FTPClient`, `ListParser`, `RemoteFile`, `RemoteFileFilter`, protocol constants, and connection/data/control listener contracts. The application selects client/parser implementation class names and instantiates them reflectively during connect (`JFTP.java:79-107`; `FTPSession.java:617-642`). The implementation details and exact transfer semantics of those APIs were not established by this package review.
- Presentation uses the in-repository shared `com.myjavaworld.gui` package (`MFrame`, `MDialog`, widgets, `GUIUtil`, and legacy `SwingWorker`). The worker runs `construct()` on a background thread and schedules `finished()` on the event dispatch thread (`SwingWorker.java:72-77, 107-155`). Shared utilities in `com.myjavaworld.util` include `Filter`, `DateFilter`, `RegexFilter`, `FileChangeMonitor`, `ProgressListener`, `ResourceLoader`, and `SystemUtil`; ZIP events/listeners are in the in-repository `com.myjavaworld.zip` package. `FileChangeMonitor` callbacks run from its Swing timer on the EDT (`FileChangeMonitor.java:34-44, 69-89`); ZIP and progress callbacks are invoked synchronously on the archive caller thread (`Zip.java:117-123`; `Unzip.java:109-115`). `Filter`, `DateFilter`, and `RegexFilter` ownership/implementation remains unresolved in the shared-package review.
- `FTPSession` also reaches into `com.myjavaworld.jftp.ssl.JFTPSSLContext`; certificate management is launched through `CertificateManagerDlg`. Their details belong to the SSL guide, not this source boundary.
- Menus, toolbars, and pane keyboard/DnD routes use `com.myjavaworld.jftp.actions.*`; action enablement and orchestration details belong to the actions guide.

## Behavior/data flow

Desktop startup enters `JFTPApplication.main`, configures platform locale/look-and-feel, attempts Mac integration, creates and shows `JFTP`, and opens a session (`JFTPApplication.java:20-62`). Applet startup initializes a launch button and creates a `JFTP(true)` frame and session when pressed (`JFTPApplet.java:34-70`). `JFTP` loads preferences in static initialization, constructs menus/toolbar/tabs, and `newSession()` adds/selects an `FTPSession` (`JFTP.java:79-147`). On first window open it maximizes if no saved bounds and may start an updater. Closing routes to `exit()`, which closes sessions, stores frame bounds/preferences, disposes, and exits only outside applet mode (`JFTP.java:151-198`).

The session connects by creating configured client/parser instances, applying passive/timeout/buffer/TLS settings, attaching listeners, connecting/logging in, issuing favorite-specific commands, navigating to the initial remote directory, listing it, and applying the favorite's local start directory (`FTPSession.java:593-699`). Connection callbacks update status, toolbar, remote pane, and title (`FTPSession.java:518-590`).

Local and remote panes display typed table models. Local listings use `LocalFile.list(filter)` and remote listings call `FTPClient.list(remoteFileFilter)`; both panes sort their current arrays and track selection/status. Local filters support regex, dates, hidden files and include/exclude, with directories accepted by `LocalFileFilter`; remote filtering delegates to external `RemoteFileFilter` (`LocalFileFilter.java:20-122`; `LocalPane.java:104-142`; `RemotePane.java:99-127`). Both comparators put directories before files for ascending ordering; clicking headers changes key/order. This describes source logic, not platform-specific renderer behavior.

Uploads/downloads run selected-file loops sequentially inside the in-repository `SwingWorker`; recursive directory traversal also occurs in that worker's background `construct()` call. Its `finished()` callback is scheduled on the EDT. Transfers choose ASCII/binary from per-session manual mode or extension/default preferences. A transfer abort flag is checked between files and recursion; the `AbortAction` also invokes external `FTPClient.abort()` (owned by actions guide). No application-level durable transfer queue, retry queue, or resume call was found in direct package source. Current upload/download calls pass `false` and `0L` for the external client's trailing options (`FTPSession.java:707-971`). ZIP/unzip and edited remote temp files are separate action workflows, not a common queue.

## Data and storage

- Preferences: `~/.jftp/data/preferences.ser` is Java object serialization of `JFTPPreferences`. `loadPreferences()` creates the directory/file, writes defaults on a missing file, then deserializes; save writes directly to the same path (`JFTP.java:497-550`). The schema includes locale/LAF/theme, local path/email, FTP class names, timeout/buffer/passive, transfer map, date/time formats, toolbar, certificate paths and `char[]` store passwords, SOCKS proxy/auth fields, SSL defaults, window bounds, license-version marker, and update flag (`JFTPPreferences.java:40-380`).
- Favorites: `~/.jftp/data/favorites.ser` is a serialized `List`. Old raw-List format is read and rewritten; current save wraps the serializable list in `SealedObject` with AES, using a hard-coded key embedded in `FavoritesManager`; if cipher creation returns null, saving is plaintext (`FavoritesManager.java:44-177`). This is obfuscation/embedded-key encryption rather than a user-secret vault. Each `RemoteHost` stores its password as a `String`; favorite equality is name-based (`RemoteHost.java:47-212`; `Favorite.java:20-48`).
- Per-connection TLS certificate trust/client keys are delegated to the SSL subpackage; this package exposes paths/default passwords through preferences and launches certificate management.

## Compatibility risks

- Java serialization ties the persisted format to serializable class names and `serialVersionUID`; changing these types requires compatibility fixtures/migration planning.
- `JFTP.loadPreferences()` returns a default object after `IOException` only if it reaches its `finally`; the static initializer catches `IOException` but does not assign a fallback to `JFTP.prefs` there. Later startup code dereferences that field. An unreadable/corrupt preferences file is therefore a source-visible startup risk, not a runtime-confirmed failure (`JFTP.java:98-107, 523-550`; `JFTPApplication.java:30-40`).
- Legacy code mixes Swing `Timer` callbacks, FTP listener callbacks, SwingWorker methods, and direct I/O. The in-repository worker's `construct()` runs off the event thread and `finished()` runs on the EDT. `FileChangeMonitor` callbacks run on the EDT; ZIP and progress callbacks run synchronously on the archive caller thread. External FTP callback thread guarantees remain unresolved. Some FTP listeners call `StatusWindow`/other Swing state directly; local rename and temp downloads can run synchronously in actions.
- Recursive delete/permission/listing behavior shares the active filter. Source calls filter-aware list APIs during recursive operations; whether exclusions unintentionally skip data-changing work is a behavior to characterize before changing it (`FTPSession.java:1120-1158, 1249-1278, 1404-1418`).
- File listings and transfers depend on external FTP types and in-repository shared GUI, utility, and ZIP APIs. Preserve their observable contract until characterized with test doubles/integration fixtures.
- `JFTPApplet` directly extends `javax.swing.JApplet`. Oracle's JDK 26 migration list removes `java.applet` and `javax.swing.JApplet`; therefore this source is incompatible with compiling the complete source set on JDK 26 unless an explicit compatibility strategy is selected. JDK 25 is the provisional desktop target pending an actual build. Keep the legacy launcher behavior until product ownership decides its fate; do not delete it as a side effect of modernization. [Oracle JDK 26 removed APIs](https://docs.oracle.com/en/java/javase/26/migrate/removed-apis.html)
- Both old/new Mac EAWT adapters are environment-sensitive; source presence alone does not establish a supported modern runtime.

## Future verification

1. FTP lifecycle/listing tests: controlled FTP fixture or test `FTPClient`/`ListParser` loaded through `RemoteHost`; connect/login, initial directories, filtered listing, navigation, parser/login failure, and disconnected status state.
2. Transfer round-trip tests: sandboxed local and remote trees; binary byte equality, ASCII contract, nested directories, extension-selected mode, selected-batch order, abort behavior, and transfer failure state.
3. Preferences/favorites persistence tests: preference defaults/save-load/corrupt file handling plus favorite CRUD/current serialization and legacy raw-List migration, ordering, duplicate-name policy, and write failure.
4. ZIP workflow tests: local tree to ZIP/upload and remote ZIP download/unzip; assert archive contents and destination choices, temporary cleanup, abort/failure, and progress reset. The actual action orchestration belongs to the child actions guide and must be coordinated with that owner.

These are test-family proposals, not executed tests. Candidate tests should assert public results and user-visible state; do not lock in defects such as filtered recursive deletion, plaintext secret fallback, or malformed-data startup failure as desired behavior.

## Open questions

- Which JDK/toolchain and deployment modes remain product requirements, especially applet and historical Mac integration?
- Are `preferences.ser` and `favorites.ser` compatibility artifacts that must remain readable across versions? Is migration allowed?
- What FTP server variants and parser behaviors are supported, and which external FTP client methods actually support restart/resume?
- Which callback ordering/thread guarantees does the external FTP API provide?
- Should local/remote filters constrain recursive deletion and permission changes, or should recursive operations traverse all children?
- Is certificate path/password configuration through `JFTPPreferences` still required, given separate SSL management UI?
