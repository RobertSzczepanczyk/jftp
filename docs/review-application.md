# Direct application-package source review coverage

## Scope and method

Reviewed all direct Java source files in `src/main/java/com/myjavaworld/jftp/`, end-to-end, including imports, fields, constructors, every method body, comments, and error paths. The exact set is 72 files. Counts below are physical source line counts at review time; check them again after edits. Child directories `actions/` and `ssl/` are excluded and have separate review guides. No code, app, build, or tests were executed for this source review. Observed statements in the application docs mean static source evidence only; they do not establish dependency callback behavior or runtime results.

## Per-file coverage

| Repository-relative Java file | Reviewed source coverage | Areas reviewed |
| --- | ---: | --- |
| `src/main/java/com/myjavaworld/jftp/AboutDlg.java` | Complete, 353 lines | About/memory dialog; displays `JFTPConstants` and `SystemUtil` details, starts a Swing `Timer`, and offers GC. |
| `src/main/java/com/myjavaworld/jftp/AdvancedConnectionPrefsPanel.java` | Complete, 221 lines | Edits default client/parser class, passive mode, buffer size, and timeout in `JFTP.prefs`; maps user units to bytes/milliseconds. |
| `src/main/java/com/myjavaworld/jftp/AutoUpdater.java` | Complete, 93 lines | Background thread reads the fixed HTTP update properties URL and reports update status through `GUIUtil`. |
| `src/main/java/com/myjavaworld/jftp/CertificatePrefsPanel.java` | Complete, 218 lines | Edits certificate store paths in `JFTP.prefs`; no references from `PreferencesDlg`'s assembled cards were found. |
| `src/main/java/com/myjavaworld/jftp/ChangeLocalDirectoryDlg.java` | Complete, 193 lines | Validates and returns a local directory string. |
| `src/main/java/com/myjavaworld/jftp/ChangeRemoteDirectoryDlg.java` | Complete, 194 lines | Validates and returns a remote directory string. |
| `src/main/java/com/myjavaworld/jftp/ConnectionDlg.java` | Complete, 714 lines | Collects ad hoc `RemoteHost` connection fields, TLS choices, client/parser, paths, and post-login commands. |
| `src/main/java/com/myjavaworld/jftp/DnDTransferHandler.java` | Complete, 168 lines | Uses typed local/remote file-array `Transferable`s and forwards imports to upload/download actions. |
| `src/main/java/com/myjavaworld/jftp/DownloadAndUnzipDlg.java` | Complete, 415 lines | Selects ZIP download and extraction destinations; exposes approved paths and temporary-delete choice. |
| `src/main/java/com/myjavaworld/jftp/DownloadAsDlg.java` | Complete, 176 lines | Collects the local filename for a single remote download. |
| `src/main/java/com/myjavaworld/jftp/DriveCellRenderer.java` | Complete, 63 lines | Renders local filesystem roots with display names/icons. |
| `src/main/java/com/myjavaworld/jftp/ExecuteCommandDlg.java` | Complete, 182 lines | Splits non-empty command lines and returns them only after approval. |
| `src/main/java/com/myjavaworld/jftp/Favorite.java` | Complete, 55 lines | Serializable `RemoteHost` specialization; equality and ordering use favorite label. |
| `src/main/java/com/myjavaworld/jftp/FavoritePropertiesDlg.java` | Complete, 799 lines | Creates/edits full favorite connection properties and validates label/host/user/password/ports. |
| `src/main/java/com/myjavaworld/jftp/FavoritesDlg.java` | Complete, 407 lines | Loads, sorts, edits, deletes, saves, and connects selected favorites; delegates persistence to `FavoritesManager`. |
| `src/main/java/com/myjavaworld/jftp/FavoritesManager.java` | Complete, 188 lines | Serializes favorite lists at `JFTP.DATA_HOME/favorites.ser`; wraps lists in `SealedObject` AES where cipher setup succeeds. |
| `src/main/java/com/myjavaworld/jftp/FTPMenu.java` | Complete, 281 lines | Connect/transfer/abort menu wiring to `actions`; enables entries using active session/selection state. |
| `src/main/java/com/myjavaworld/jftp/FTPSession.java` | Complete, 1667 lines | Session UI and FTP orchestration: owns one FTP client/parser, local/remote panes, status, filters, transfers, CRUD, listeners, and abort state. |
| `src/main/java/com/myjavaworld/jftp/GeneralConnectionPrefsPanel.java` | Complete, 195 lines | Edits contact email and default local path. |
| `src/main/java/com/myjavaworld/jftp/HelpMenu.java` | Complete, 116 lines | Connects help IDs and About to `JFTPHelp2`/`AboutDlg`. |
| `src/main/java/com/myjavaworld/jftp/JFTP.java` | Complete, 757 lines | Main frame, menus/toolbar/tabs, session routing, preferences load/save, and window shutdown. |
| `src/main/java/com/myjavaworld/jftp/JFTPApplet.java` | Complete, 82 lines | Legacy applet launcher; button creates a `JFTP(true)` frame and a new session. |
| `src/main/java/com/myjavaworld/jftp/JFTPApplication.java` | Complete, 91 lines | Desktop entry point; sets locale/LAF, wires Mac hooks, displays frame, and creates first session. |
| `src/main/java/com/myjavaworld/jftp/JFTPConstants.java` | Complete, 34 lines | Product metadata. |
| `src/main/java/com/myjavaworld/jftp/JFTPHelp2.java` | Complete, 71 lines | Lazy singleton around JavaHelp HelpSet/HelpBroker and help IDs. |
| `src/main/java/com/myjavaworld/jftp/JFTPPreferences.java` | Complete, 460 lines | Serializable preferences schema and defaults, including transfer extensions, proxy/security values, UI, window, license marker, and update flag. |
| `src/main/java/com/myjavaworld/jftp/JFTPToolBar.java` | Complete, 325 lines | Toolbar wiring and action enablement based on the selected `FTPSession`. |
| `src/main/java/com/myjavaworld/jftp/JFTPUtil.java` | Complete, 96 lines | Resource image helpers, elapsed-time formatting, and JVM SOCKS proxy/authenticator configuration. |
| `src/main/java/com/myjavaworld/jftp/LocaleCellRenderer.java` | Complete, 58 lines | Renders `Locale` values by display name. |
| `src/main/java/com/myjavaworld/jftp/LocalePrefsPanel.java` | Complete, 257 lines | Edits locale and short/medium date/time formats; updates previews. |
| `src/main/java/com/myjavaworld/jftp/LocalFile.java` | Complete, 283 lines | `File`/`FileSystemView` wrapper with display metadata, roots, listings, permissions, deletion, and `Filter` application. |
| `src/main/java/com/myjavaworld/jftp/LocalFileCellRenderer.java` | Complete, 65 lines | Renders local-file names and OS/fallback file icons. |
| `src/main/java/com/myjavaworld/jftp/LocalFileComparator.java` | Complete, 159 lines | Sorts local files by name/type/size/date while grouping drives/directories according to comparator rules. |
| `src/main/java/com/myjavaworld/jftp/LocalFileFilter.java` | Complete, 143 lines | Local include/exclude filter for hidden files, regex filename, and modified-date range; directories always pass. |
| `src/main/java/com/myjavaworld/jftp/LocalFileFilterDlg.java` | Complete, 475 lines | Builds a `LocalFileFilter`; validates regex/date input and captures hidden-file setting. |
| `src/main/java/com/myjavaworld/jftp/LocalFilePropertiesDlg.java` | Complete, 424 lines | Read-only local metadata and recursive size/count worker, respecting the active filter. |
| `src/main/java/com/myjavaworld/jftp/LocalFileTableModel.java` | Complete, 105 lines | Four-column local table model: file, type, size, modified date. |
| `src/main/java/com/myjavaworld/jftp/LocalPane.java` | Complete, 538 lines | Local filesystem navigation/table, selection, sorting, filtering refresh, context menus, keyboard actions, and DnD. |
| `src/main/java/com/myjavaworld/jftp/LocalSystemMenu.java` | Complete, 303 lines | Local operations menu for open/edit/print, create/navigation/rename/delete/filter/refresh/properties/selection. |
| `src/main/java/com/myjavaworld/jftp/LocalSystemPopupMenu.java` | Complete, 279 lines | Local context menu counterpart with upload actions and selection-state enablement. |
| `src/main/java/com/myjavaworld/jftp/NewLocalDirectoryDlg.java` | Complete, 191 lines | Validates and returns a requested local directory name. |
| `src/main/java/com/myjavaworld/jftp/NewLocalFileDlg.java` | Complete, 172 lines | Validates and returns a requested local filename. |
| `src/main/java/com/myjavaworld/jftp/NewRemoteDirectoryDlg.java` | Complete, 159 lines | Validates and returns a remote directory name. |
| `src/main/java/com/myjavaworld/jftp/NewRemoteFileDlg.java` | Complete, 159 lines | Validates and returns a remote filename. |
| `src/main/java/com/myjavaworld/jftp/OSXAdapter.java` | Complete, 186 lines | Reflection-based Mac application-menu, dock icon, and fullscreen integration. |
| `src/main/java/com/myjavaworld/jftp/OSXAdapterOld.java` | Complete, 140 lines | Older compile-time EAWT adapter; appears unused by `JFTPApplication`, which initializes `OSXAdapter`. |
| `src/main/java/com/myjavaworld/jftp/package-info.java` | Complete, 20 lines | Package description. |
| `src/main/java/com/myjavaworld/jftp/PreferencesDlg.java` | Complete, 336 lines | Preference tree/card dialog; validates each panel then writes its values through `JFTP.savePreferences`. |
| `src/main/java/com/myjavaworld/jftp/ProxyPrefsPanel.java` | Complete, 257 lines | Edits SOCKS proxy/auth fields, validates host/port, and applies JVM-wide proxy settings. |
| `src/main/java/com/myjavaworld/jftp/RemoteFileCellRenderer.java` | Complete, 65 lines | Renders remote-file names and generic file/directory icons. |
| `src/main/java/com/myjavaworld/jftp/RemoteFileComparator.java` | Complete, 149 lines | Sorts external `ftp.RemoteFile` values by name/type/size/date. |
| `src/main/java/com/myjavaworld/jftp/RemoteFileFilterDlg.java` | Complete, 438 lines | Builds an external `ftp.RemoteFileFilter` using regex/date and include/exclude choices. |
| `src/main/java/com/myjavaworld/jftp/RemoteFilePropertiesDlg.java` | Complete, 752 lines | Remote metadata/permission editor and recursive size/count worker using `FTPClient` and its parser. |
| `src/main/java/com/myjavaworld/jftp/RemoteFileTableModel.java` | Complete, 110 lines | Five-column remote table model, including permissions/attributes. |
| `src/main/java/com/myjavaworld/jftp/RemoteHost.java` | Complete, 255 lines | Serializable connection record: host/authentication/client/parser/passive/TLS/initial directories/commands. |
| `src/main/java/com/myjavaworld/jftp/RemotePane.java` | Complete, 435 lines | Remote navigation/table, sorting, selection, context menus, keyboard actions, DnD, and clear-on-disconnect. |
| `src/main/java/com/myjavaworld/jftp/RemoteSystemMenu.java` | Complete, 331 lines | Remote file/command/filter/navigation menu wired to the corresponding actions/session APIs. |
| `src/main/java/com/myjavaworld/jftp/RemoteSystemPopupMenu.java` | Complete, 331 lines | Remote context menu with download/edit/open/print/CRUD/filter/command actions. |
| `src/main/java/com/myjavaworld/jftp/RenameLocalFileDlg.java` | Complete, 198 lines | Collects non-empty source and target names for local rename. |
| `src/main/java/com/myjavaworld/jftp/RenameRemoteFileDlg.java` | Complete, 193 lines | Collects non-empty source and target names for remote rename. |
| `src/main/java/com/myjavaworld/jftp/SecurityPrefsPanel.java` | Complete, 223 lines | Edits default SSL mode and unencrypted-data-channel flag. |
| `src/main/java/com/myjavaworld/jftp/SessionPanel.java` | Complete, 60 lines | `JRootPane` wrapper with busy glass pane and title; `dispose()` is intentionally empty in this class. |
| `src/main/java/com/myjavaworld/jftp/SoftwareUpdatePrefsPanel.java` | Complete, 110 lines | Edits update-check flag and starts manual `AutoUpdater`. |
| `src/main/java/com/myjavaworld/jftp/StatusBar.java` | Complete, 134 lines | Status/progress/speed/time/security indicator display. |
| `src/main/java/com/myjavaworld/jftp/StatusWindow.java` | Complete, 122 lines | Styled bounded command/reply/error/status log; clears the document when it reaches 16 KiB. |
| `src/main/java/com/myjavaworld/jftp/ToolsMenu.java` | Complete, 112 lines | Favorites, certificates, and preferences action wiring. |
| `src/main/java/com/myjavaworld/jftp/TransferModeMenu.java` | Complete, 125 lines | Session-scoped auto/ASCII/binary selection. |
| `src/main/java/com/myjavaworld/jftp/TransferModesPrefsPanel.java` | Complete, 262 lines | Default mode and extension-to-mode map editor. |
| `src/main/java/com/myjavaworld/jftp/TransferObject.java` | Complete, 55 lines | Local/remote file and direction tuple for changed-temp-file upload monitoring. |
| `src/main/java/com/myjavaworld/jftp/UIPrefsPanel.java` | Complete, 146 lines | Edits installed Swing Look & Feel selection. |
| `src/main/java/com/myjavaworld/jftp/UploadAsDlg.java` | Complete, 174 lines | Collects the remote target name for one local upload. |
| `src/main/java/com/myjavaworld/jftp/ZipAndUploadDlg.java` | Complete, 337 lines | Collects ZIP filename and temporary/current/other ZIP output location. |

## Source-evidence anchors

- App shell and preference initialization/shutdown: `src/main/java/com/myjavaworld/jftp/JFTP.java:79-198, 497-550`.
- Desktop and applet launch flows: `JFTPApplication.java:20-62`; `JFTPApplet.java:34-70`.
- Session connection and transfer implementations: `FTPSession.java:593-971`; callback and disconnect state: `FTPSession.java:518-590, 1495-1531`.
- Persistence schema and storage: `JFTPPreferences.java:40-380`; `FavoritesManager.java:44-177`; connection fields `RemoteHost.java:47-212`.
- Pane/filter model behavior: `LocalFileFilter.java:97-121`; `LocalPane.java:104-142, 256-322`; `RemotePane.java:99-127, 253-285`.

## Review limits and uncertainties

This review does not validate external FTP or JavaHelp APIs, or establish runtime behavior for shared in-repository GUI, utility, SSL, or ZIP APIs; it does not establish thread dispatch, network interoperability, data conversion, or resource packaging. It does not imply that all direct package classes are used in shipping UI; `CertificatePrefsPanel` and `OSXAdapterOld` appear unreferenced by their primary owner path but were still reviewed. The current source branch may change after this snapshot; update this coverage record when direct-package files change.
