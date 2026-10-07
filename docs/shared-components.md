# Shared GUI, utility, and ZIP components

## Scope

This map covers the 50 tracked Java files in `com.myjavaworld.gui`, 15 in `com.myjavaworld.util`, and 4 in `com.myjavaworld.zip`. It describes source-observed behavior only; no GUI was opened and no code was compiled or run. The manifest is [review-build-shared.md](review-build-shared.md).

## Inventory

The source tree has 69 tracked Java files in these three packages. There are no binary assets in these package directories. `gui` contains Swing widgets and UI support, `util` contains small shared services and event types, and `zip` contains archive creation/extraction plus listener contracts.

### GUI: class-by-class map

| Class | Role / source anchor |
|---|---|
| `DateCellRenderer` | Locale-based date/time table renderer; null becomes the literal `null` (`DateCellRenderer.java:31,55-71`). |
| `DefaultTheme` | Base Metal theme fonts (`DefaultTheme.java:30-74`). |
| `DefaultLargeTheme` | Larger-font variant of the default theme (`DefaultLargeTheme.java:29-74`). |
| `GreenMetalTheme` | Green primary colors layered on default theme (`GreenMetalTheme.java:27-55`). |
| `GreenMetalLargeTheme` | Larger-font green theme (`GreenMetalLargeTheme.java:29-74`). |
| `HighContrastTheme` | High contrast Metal colors layered on default theme (`HighContrastTheme.java:27-77`). |
| `HighContrastLargeTheme` | Larger-font high contrast theme (`HighContrastLargeTheme.java:29-74`). |
| `SandstoneTheme` | Sandstone primary/secondary Metal palette (`SandstoneTheme.java:27-75`). |
| `SandstoneLargeTheme` | Larger-font sandstone theme (`SandstoneLargeTheme.java:29-74`). |
| `GUIUtil` | Screen centering, look-and-feel/platform shortcuts, dialogs, throwable presentation, and HTML formatting (`GUIUtil.java:39-164`). |
| `EditPopupMenu` | Singleton localized text edit popup; dispatches undo/redo/cut/copy/paste/delete/select-all through `MTextComponent` (`EditPopupMenu.java:32-37,58-80,110-170`). |
| `IDTreeNode` | `DefaultMutableTreeNode` carrying an integer ID (`IDTreeNode.java:26-48`). |
| `ImageCellRenderer` | Image renderer for table, list, and tree cells (`ImageCellRenderer.java:40-41,74-115`). |
| `IndentIcon` | Icon wrapper with depth-based indentation (`IndentIcon.java:28-73`). |
| `IntegerField` | Integer-entry field with a document model and integer get/set methods (`IntegerField.java:32-95`). |
| `LicenseAgreementDlg` | Dialog for viewing a URL and recording agreement (`LicenseAgreementDlg.java:43-87`). |
| `MButton` | `JButton` wrapper with string mnemonic helpers (`MButton.java:30-91`). |
| `MCheckBox` | `JCheckBox` wrapper with string mnemonic helpers (`MCheckBox.java:24-79`). |
| `MComboBox` | `JComboBox` wrapper with array/vector `setData` (`MComboBox.java:30-98`). |
| `MDefaultRenderer` | Shared list/table text-and-icon renderer (`MDefaultRenderer.java:35-90`). |
| `MDesktopPane` | Internal-frame cascade and horizontal/vertical tile helpers (`MDesktopPane.java:34-162`). |
| `MDialog` | `JDialog` wrapper: non-resizable, Escape and close hide the dialog (`MDialog.java:38,142-158,186-190`). |
| `MFrame` | Main-frame wrapper with configurable content insets and busy glass pane (`MFrame.java:31-83`). |
| `MGlassPane` | Glass pane consumes mouse/key input while busy and changes cursor (`MGlassPane.java:34-46,53-87`). |
| `MInternalFrame` | Internal frame with busy state and glass pane; busy clicks select/front the frame (`MInternalFrame.java:30-88`). |
| `MLabel` | `JLabel` wrapper with string mnemonic helpers (`MLabel.java:30-88`). |
| `MLabelTextField` | Text field implementing the common text-component contract, document constraints, undo, and popup behavior (`MLabelTextField.java:40-216`). |
| `MList` | `JList` constructor wrapper (`MList.java:28-55`). |
| `MMenu` | `JMenu` wrapper with mnemonics and action addition (`MMenu.java:30-77`). |
| `MMenuItem` | `JMenuItem` wrapper with string mnemonic helpers (`MMenuItem.java:30-72`). |
| `MOptionPane` | `JOptionPane` wrapper setting a maximum line-width hint (`MOptionPane.java:26-41`). |
| `MPasswordField` | Password field with one-line document and common text API; copy/cut/undo/redo are intentionally disabled (`MPasswordField.java:39-40,84-90,107-150,178-207`). |
| `MPlainDocument` | Plain document enforcing maximum length and case mode (`MPlainDocument.java:31-85`). |
| `MPopupMenu` | Popup wrapper for platform-sensitive placement and actions (`MPopupMenu.java:37-73`). |
| `MRadioButton` | `JRadioButton` wrapper with string mnemonic helpers (`MRadioButton.java:24-79`). |
| `MRadioButtonMenuItem` | Radio menu item wrapper with string mnemonic helpers (`MRadioButtonMenuItem.java:30-85`). |
| `MScrollPane` | `JScrollPane` constructor wrapper (`MScrollPane.java:29-44`). |
| `MTable` | `JTable` constructor wrapper, row sizing, and popup trigger handling (`MTable.java:35-141`). |
| `MTableCellRenderer` | Base table text renderer (`MTableCellRenderer.java:32-55`). |
| `MTableHeaderRenderer` | Header renderer that can decorate an icon (`MTableHeaderRenderer.java:35-92`). |
| `MTextArea` | Multiline text component with max length/case, undo, and edit popup (`MTextArea.java:39-192`). |
| `MTextComponent` | Shared clipboard/edit/undo/case/length contract (`MTextComponent.java:26-135`). |
| `MTextField` | Single-line text field with document constraints, undo, popup, and focus behavior (`MTextField.java:40-223`). |
| `MTree` | `JTree` constructor wrapper (`MTree.java:32-58`). |
| `NumericCellRenderer` | Table renderer for numeric values (`NumericCellRenderer.java:31-63`). |
| `ProgressDialog` | Localized modal/modeless progress dialog with progress bar and initially disabled cancel button (`ProgressDialog.java:35-99,101-143`). |
| `SingleLineDocument` | Truncates inserted content at the first CR or LF (`SingleLineDocument.java:33,50-65`). |
| `SplashWindow` | Window displaying a supplied icon (`SplashWindow.java:32-65`). |
| `SwingWorker` | Legacy custom worker: runs `construct()` on a new thread and schedules `finished()` on Swing EDT (`SwingWorker.java:30,77-84,124-157`). |
| `package-info` | GUI package documentation (`package-info.java:16-19`). |

### Utility classes and contracts

| Type | Behavior / source anchor |
|---|---|
| `CommonResources` | Static lookup facade over the common resource bundle (`CommonResources.java:25-32`). |
| `Encoder` | Uppercase hexadecimal encoding of bytes (`Encoder.java:22-35`). |
| `FileChangeEvent` | Event with public file/old/new timestamp fields and getters; getter is spelled `getnewDate` (`FileChangeEvent.java:24-47`). |
| `FileChangeListener` | File-change callback contract (`FileChangeListener.java:23-25`). |
| `FileChangeMonitor` | Swing `Timer` polls registered file modification times every second and notifies listeners (`FileChangeMonitor.java:34-71,73-97`). |
| `FileUtilities` | Buffered file copy with 4096-byte buffer (`FileUtilities.java:28-52`). |
| `ProgressEvent` | Carries integer progress (`ProgressEvent.java:25-36`). |
| `ProgressListener` | Progress callback contract (`ProgressListener.java:25-27`). |
| `RandomKeyGenerator` | SecureRandom uppercase A-Z token generation and hyphenation every four characters (`RandomKeyGenerator.java:23-68`). |
| `ResourceLoader` | Locale-aware `ResourceBundle` lookup; on missing bundle prints a trace/message and exits (`ResourceLoader.java:29-60`). |
| `StatusEvent` | Carries a status string (`StatusEvent.java:25-36`). |
| `StatusListener` | Status callback contract (`StatusListener.java:25-27`). |
| `StringUtilities` | Wraps message text at a requested width, default 120 (`StringUtilities.java:25-58`). |
| `SystemUtil` | Caches OS/JRE/home/working-directory properties and detects Mac OS X from `os.name` (`SystemUtil.java:27-71,73-103`). |
| `package-info` | Utility package documentation (`package-info.java:16-19`). |

### ZIP classes and contracts

| Type | Behavior / source anchor |
|---|---|
| `Zip` | Writes recursively traversed files to `ZipOutputStream`; accepts a `Filter`, optional relative root, ZIP/progress listeners (`Zip.java:38-56,73-95,144-177,185-209`). |
| `Unzip` | Reads a `ZipFile`, creates directories/files under a target directory, and emits file/progress events (`Unzip.java:36-58,119-151,153-187`). |
| `ZipEvent` | Carries ZIP/UNZIP integer type and filename (`ZipEvent.java:23-43`). |
| `ZipListener` | Begin/end per-file callback contract (`ZipListener.java:23-28`). |

## Responsibilities

GUI classes supply reusable Swing wrappers and common UX behavior rather than domain FTP logic. `MTextField`, `MTextArea`, `MPasswordField`, and `MLabelTextField` implement or closely follow `MTextComponent`; the shared edit menu queries capabilities before enabling actions. `SwingWorker` is a hand-rolled background-work convention used across JFTP actions and `FTPSession` (examples: `src/main/java/com/myjavaworld/jftp/actions/ZipAndUploadAction.java:82-104`, `FTPSession.java:171-177`). Components that mutate Swing controls in `finished()` rely on its documented EDT scheduling (`SwingWorker.java:80-84,141`).

Utilities provide file-copy, localized-resource, OS metadata, event callback, and string/encoding helpers. `ProgressEvent`/`ProgressListener` form the progress interface reused by ZIP; `FileChangeEvent`/`FileChangeListener` form the watched-file interface consumed by `FTPSession` (`FTPSession.java:72,153-160`).

ZIP is a local filesystem helper rather than an FTP protocol implementation. `ZipAndUploadAction` sets a relative local root, adds selected local files, and closes the archive before upload (`ZipAndUploadAction.java:90-100`). `DownloadAndUnzipAction` selects a target directory and calls `open`, `unzip`, `close` (`DownloadAndUnzipAction.java:91-97`). `FTPSession` receives ZIP file and progress notifications through the two listener interfaces (`FTPSession.java:72,1632-1650`).

## Dependencies/interfaces

- All GUI classes depend on the JDK Swing/AWT stack. `GUIUtil` initializes a static toolkit shortcut mask and reads display dimensions (`GUIUtil.java:41-42,53-56`), so headless execution needs a design/behavior decision.
- The GUI localizes popup, progress, and common dialog labels through `ResourceLoader` and `CommonResources` (`EditPopupMenu.java:35-36`; `ProgressDialog.java:37-38,109-110`; `GUIUtil.java:79-81`). Maven explicitly includes base, German, Traditional Chinese, image, and help resource roots (`pom.xml:83-100`).
- `Zip` imports `com.myjavaworld.jftp.LocalFile` and `com.myjavaworld.util.Filter` (`Zip.java:28-31`); `LocalFile` is in the repository, but `Filter` is not declared in production source. Other application packages import `Filter`, `DateFilter`, and `RegexFilter` (for example, `FTPSession.java:56`, `LocalFileFilter.java:18-20`, `RemoteFileFilterDlg.java:50-52`), none of which is defined under `src/main/java/com/myjavaworld/util`. The FTP API dependency is a possible provider; only a resolved effective classpath can confirm ownership. `LocalFile.list(filter)` controls recursion/filter behavior (`Zip.java:202-206`).
- `Zip` and `Unzip` dispatch synchronously on their caller's thread through Swing `EventListenerList`; callbacks are not marshaled onto EDT (`Zip.java:97-124,219-240`; `Unzip.java:89-117,153-187`). Current app callers use the legacy `SwingWorker` for archive work (`ZipAndUploadAction.java:82-104`; `DownloadAndUnzipAction.java:80-99`), so listeners can update Swing from that worker thread unless they explicitly defer.
- `FileChangeMonitor` uses `javax.swing.Timer`, hence its poll and listener callback execute on Swing EDT (`FileChangeMonitor.java:24,34-38,45-51,73-95`). The source class comment calls it a thread, but implementation uses the Swing timer.

## Behavior/data flow

**ZIP creation:** caller constructs `Zip`, optionally supplies a filter and relative directory, calls `open`, then `addEntry` for each input. For directories, `Zip` emits a directory entry, asks `LocalFile.list(filter)` for children, and recurses (`Zip.java:185-209`). Entry names are derived by subtracting the configured base path and converting separators to `/` (`Zip.java:250-272`). Files stream in 16 KiB chunks and progress is per current file (`Zip.java:219-241`).

**ZIP extraction:** caller constructs `Unzip`, may override its default target to the source ZIP's parent, then calls `open`, `unzip`, and `close` (`Unzip.java:55-59,65-71,119-151`). Each entry name is appended directly under target; missing parent directories are created, file bytes stream in 16 KiB chunks, and entry timestamps are applied only when a directory is newly created (`Unzip.java:138-149,153-187`).

**Important source-observed edge cases:**

- Extraction does not canonicalize/check entry paths against the target root before creating directories/files (`Unzip.java:138-159`). Entries containing `../` can escape the target; this is a ZIP Slip risk that should block broadening trust in archive extraction until fixed and tested.
- `Unzip.close()` closes the `ZipFile` but does not null its field, so a second close is rejected as “not open or already closed” and the same instance cannot be reopened (`Unzip.java:126-132,119-124`). By contrast, `Zip.close()` nulls its stream (`Zip.java:172-177`).
- `Unzip.unzipFile` calls its end-file callback with the archive field `file`, not the extracted `target` (`Unzip.java:153-155,179`). The event therefore reports the archive filename on end for every member.
- `Zip.computeEntryName` slices by base-path string length without checking that the file is inside that base (`Zip.java:250-272`). Callers must keep inputs under the chosen root; add explicit path/containment handling if making this API safe for arbitrary files.
- ZIP progress is per-file, not whole-operation progress. `Zip` and `Unzip` fire events inline on their caller's thread; callbacks can block archive work.
- `FileChangeMonitor` only reports `currDate > prevDate` (`FileChangeMonitor.java:73-86`), so backward timestamps and changes within the filesystem's timestamp granularity are missed. `stopMonitor()` stops its timer but leaves the timer reference non-null, so later `add()` will not restart it (`FileChangeMonitor.java:45-52,67-71`).
- `MPasswordField` intentionally reports no copy/cut/undo/redo capability and returns 0 for undo limit (`MPasswordField.java:84-90,107-150`). Preserve its secret-handling behavior while modernizing the shared text API.
- `MDialog` hides on Escape/window-close rather than disposing (`MDialog.java:142-146,186-190`). `ProgressDialog` starts indeterminate and disables Cancel; it only exposes cancel-button listeners (`ProgressDialog.java:81-83,101-111`).
- `MDefaultRenderer` and `ImageCellRenderer` use a table's selection foreground as the selected-cell background (`MDefaultRenderer.java:84-87`; `ImageCellRenderer.java:96-99`). Preserve intentionally or correct with a focused rendering regression check.

## Compatibility risks

- `SwingWorker` is a legacy implementation without a future/task abstraction or exception/result-state API; `get()` blocks by joining and returns null on interruption (`SwingWorker.java:90-117`). Migrating to JDK `SwingWorker` changes the API and semantics, and code imports `com.myjavaworld.gui.SwingWorker` in multiple actions and `FTPSession`.
- Several wrapper classes use raw collections and pre-generics Swing constructors. Generifying them or altering overloads can change source/binary compatibility for internal callers.
- `GUIUtil.getMenuShortcutKeyMask()` and old `InputEvent` masks are legacy/deprecated APIs on modern JDKs (`GUIUtil.java:41-42,67-72`). Changes should preserve platform-specific keyboard behavior.
- Headless tests may fail during class initialization because GUI static fields read Toolkit; use a display-capable test environment or isolate those helpers.
- ResourceLoader's `System.exit(1)` on missing resources is process-global behavior (`ResourceLoader.java:35-60`); replacing it with an exception is safer for reusable code but is an observable contract change.
- The ZIP Slip issue, callback filename bug, and close-state asymmetry are source observations, not claims of an exploit demonstration. Add regression tests before changing archive semantics.

## Future verification

The application-level behavioral plan defines four workflow families; see [behavioral-test-plan.md](behavioral-test-plan.md) and [modernization-plan.md](modernization-plan.md). Candidate coverage for a later implementation phase:

1. **Connection, remote browsing, filtering, and disconnect:** use a disposable loopback FTP server bound to an ephemeral port, synthetic credentials, and a private temporary server root. Exercise listing/navigation and relevant filters; never use public/live services or real credentials.
2. **Upload/download integrity:** transfer empty and representative binary files and compare exact bytes at both ends. Use only isolated temporary client/server directories. Include `FileUtilities.copyFile` on empty and binary data and `Encoder.hexEncode` on all byte values as focused helper contracts where useful.
3. **Persistence across restart:** save and reload preferences/favorites in a separate process or isolated home with synthetic fixtures. Keep user configuration and key stores out of the test path; include `RandomKeyGenerator` and resource/string helper contracts where they support the workflow.
4. **ZIP creation/extraction:** create a temporary tree with nested directories, binary and empty files; verify relative entry names, filter behavior, bytes, directory markers, progress, and listener ordering. Extract normal entries and `../` or absolute/drive-style names, and prove no output escapes the target. Verify close/reopen and exception cleanup. Assert end-event filenames to expose `fireEndFileEvent(file)` (`Unzip.java:179`). Use deterministic fixtures and no user data.

Across these families, useful utility checks include `StringUtilities` wrapping and `FileChangeMonitor` timestamp granularity, stop/restart, and listener-thread semantics. `ResourceLoader` failure behavior calls `System.exit(1)` (`ResourceLoader.java:35-60`), so do not invoke its missing-bundle path in the test JVM without a subprocess strategy. Additional GUI verification can assert that `SwingWorker.construct()` runs off EDT and `finished()` on EDT, text documents enforce case/length/line rules, and popup actions respect editability. `Zip`/`Unzip` callbacks are synchronous on the caller thread, distinct from `SwingWorker.finished()` (`SwingWorker.java:77-84,124-157`; `Zip.java:97-124,219-240`; `Unzip.java:89-117,153-187`). Do not present a test command as known-good until Java/Maven are configured and the baseline build is established.

Additional GUI verification should assert that `SwingWorker.construct()` runs off EDT and `finished()` on EDT, text documents enforce case/length/line rules, and popup actions respect editability. Do not use a command as a “known-good” test invocation until Java/Maven are installed/configured and the baseline build is established.

## Open questions

- Does the build-resolved FTP API artifact supply the imported `com.myjavaworld.util.Filter` contract, and which version is compatible with the current sources?
- Are ZIP archives ever extracted from untrusted remote sites? If yes, define how path traversal, symlink-like entries, duplicate entries, and overwrite policy should behave.
- Should progress remain per file, or should callers receive total operation progress? Which callback thread do existing listeners rely on?
- Is the `Unzip.close()` single-use behavior intentional, and should archive objects be reusable after close?
- Can text field and password field behavior be consolidated without breaking password clipboard/undo restrictions?
- Which GUI test environment is available for EDT/headful coverage?
