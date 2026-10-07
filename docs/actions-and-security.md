# Actions and SSL security review

## Scope

Static review of every Java file under `src/main/java/com/myjavaworld/jftp/actions` and `src/main/java/com/myjavaworld/jftp/ssl`. Related call sites were read in `JFTP`, `FTPSession`, `JFTPPreferences`, `JFTPHelp2`, and the help/resource files. The file-level coverage and assigned-area counts are in [review-security-assets.md](review-security-assets.md). No runtime, build, TLS handshake, GUI, filesystem-permission, or certificate-store verification was performed.

## Inventory

There are 31 action classes and 10 SSL/certificate classes. Every action implements `ActionListener`, stores the `JFTP` instance supplied to a synchronized singleton `getInstance`, and dispatches to the current `FTPSession`. Their behavior is summarized here:

| Class | Behavior and principal gate |
|---|---|
| `AbortAction` | If connected, marks abort and calls `FTPClient.abort()` on a `SwingWorker`; routes FTP/connection/other failures to the session. |
| `ChangeLocalDirectoryAction` | Shows the local-directory dialog and applies a non-null chosen directory; requires a session. |
| `ChangeRemoteDirectoryAction` | Shows the remote-directory dialog and applies a non-null choice; requires a connected session. |
| `ConnectAction` | Seeds a new `RemoteHost` from global FTP client/parser/passive/SSL/data-channel preferences when no host is on the session, then shows the connection dialog and calls `session.connect`. |
| `DeleteLocalFileAction` | Delegates local selection deletion to the session; requires a session. |
| `DeleteRemoteFileAction` | Delegates selected remote deletion; requires a connected session. |
| `DisconnectAction` | Calls `session.disconnect`; requires a session. |
| `DownloadAction` | Calls `session.download`; requires a connected session. |
| `DownloadAndUnzipAction` | Requires connected session, selected `.ZIP` remote file, and approved dialog; downloads then unzips on a worker and refreshes local pane. |
| `DownloadAsAction` | Requires connected session, selected remote file, approved name dialog; downloads under the chosen name on a worker and refreshes local pane. |
| `EditLocalFileAction` | Opens the selected local file in the system editor when supported; requires a session and file selection. |
| `EditRemoteFileAction` | Downloads a selected remote file to a temporary file on a worker, opens it externally, then later offers/handles upload of changes through session flow. |
| `EmailLocalFileAction` | Uses desktop mail integration for the selected local file when supported; requires a session and selection. |
| `EmailRemoteFileAction` | Downloads the selected remote file to a temporary file, then uses desktop mail integration; this action has commented-out connected/busy guards. |
| `ManageCertificatesAction` | Opens the certificate manager dialog. |
| `ManageFavoritesAction` | Opens the favorites manager dialog. |
| `NewLocalDirectoryAction` | Dialog then local directory creation; requires a session. |
| `NewLocalFileAction` | Dialog then local file creation; requires a session. |
| `NewRemoteDirectoryAction` | Dialog then remote directory creation; requires a connected session. |
| `NewRemoteFileAction` | Dialog then remote file creation; requires a connected session. |
| `OpenLocalFileAction` | Navigates into a selected directory or opens a selected local file using desktop integration; requires a session. |
| `OpenRemoteFileAction` | Requires connected session; directory selection changes remote working directory, file selection downloads to a temporary file and opens externally on a worker. |
| `PrintLocalFileAction` | Uses desktop print on a selected local file; requires a session and file. |
| `PrintRemoteFileAction` | Downloads selected remote file to a temporary file, then prints it using desktop integration on a worker. |
| `ReconnectAction` | Calls `session.reconnect`; requires a session. |
| `RenameLocalFileAction` | Dialog then local rename; requires a session. |
| `RenameRemoteFileAction` | Dialog then remote rename; requires a connected session. |
| `UploadAction` | Calls `session.upload`; requires a connected session. |
| `UploadAsAction` | Requires connected session, selected local file, approved dialog; uploads under selected destination name on a worker. |
| `ZipAndUploadAction` | Requires connected session and local selection; creates an archive and uploads it on a worker, optionally deletes archive, and refreshes both panes. |

SSL classes: `CertificateDlg` presents a certificate chain and can install it to the server trust store; `CertificateManagerDlg` imports, views, and deletes server/client certificates; `CertificatePane` renders certificate fields; `CertificateTableModel` presents store entries; `DNParser` extracts a distinguished-name attribute; `JFTPKeyManager` adapts the client keystore to `X509KeyManager`; `JFTPSSLContext` builds the context; `JFTPTrustManager` makes server trust decisions; `KeyStoreManager` owns keystore loading and mutation; and `SecurityWarningDlg` presents certificate validity/identity/trust results and lets the user continue or reject.

## Responsibilities

Actions are UI adapters, not a shared command framework: they get current session and selection state, show any dialogs, call session operations, and refresh panes or status when worker operations finish. Most transfer, archive, external-open, and remote-file actions start `SwingWorker` work; simple session actions delegate directly. Calls into `FTPSession` are the application-to-FTP integration boundary. `FTPSession.connect` constructs/configures the selected `FTPClient`, sets timeout/buffer, SSL usage and SSL context, then performs network operations in a `SwingWorker` (`FTPSession.java:610-693`).

TLS ownership is split across `JFTPSSLContext`, `JFTPKeyManager`, `JFTPTrustManager`, and `KeyStoreManager`. The certificate manager UI mutates the same stores used by the SSL context. `SecurityWarningDlg` uses an explicit affirmative choice as the only path to accepting a failed date/host/trust check; rejection throws a `CertificateException`.

## Dependencies/interfaces

- Swing action events and dialogs; `JFTP` current-window/session API; `FTPSession` selection, state, transfer, filesystem, and error APIs.
- `com.myjavaworld.ftp.FTPClient`, `RemoteFile`, `ConnectionException`, `FTPException`, `FTPConstants`; selected client and list parser names can be configured through preferences (`ConnectAction.java:57-65`).
- `SwingWorker` carries blocking transfer, connection, archive, and remote temporary-file work off the event callback. Its `finished()` callbacks update UI state. Several actions intentionally make direct file or `Desktop` calls.
- SSL integrations use JSSE `SSLContext`, `KeyManagerFactory`, `TrustManagerFactory`, X.509 certificates, and the custom FTP client's SSL-context/SSL-mode hooks.
- UI labels come from `ResourceLoader` bundles; context help IDs resolve through `JFTPHelp2` and `src/main/help/helpset/map.xml`.

## Behavior/data flow

Actions follow `UI control -> singleton ActionListener -> current session/selection checks -> optional modal input -> session API or SwingWorker -> session error/status callbacks and pane refresh`. Enablement is split between UI construction/state handling and defensive guards inside each action; a disabled menu or toolbar control is not the only protection. `JFTP` handles window-level event wiring and session selection, and each action re-fetches the current session when invoked.

TLS setup is `ConnectAction` host defaults/dialog -> `FTPSession.connect` -> `JFTPSSLContext.getSSLContext(jftp, hostname)` -> custom key and trust managers -> FTP client control/data SSL behavior (`FTPSession.java:610-693`; `JFTPSSLContext.java:37-44`). SSL is off by default (`JFTPPreferences.java:135-138`). Preferences point to `JFTP.DATA_HOME/serverCertificates.jks` and `clientCertificates.jks`; `JFTP.DATA_HOME` is under the user home in `.jftp` (`JFTPPreferences.java:41-47`; `JFTP.java:67-68`). Both stores use JKS and the default password literal `changeit`; absent files are initialized and saved when first loaded (`KeyStoreManager.java:39-55, 170-196`).

The custom server trust manager initializes JSSE's `SunX509` manager from the server certificate store, but its server decision path separately checks only the leaf certificate's validity date and exact case-insensitive CN-to-configured-host equality, and checks whether any chain certificate is present in the store (`JFTPTrustManager.java:57-65, 76-105, 110-159`). If any of those three predicates fails, a modal warning can override the result for the current trust-manager instance; the accepted chain is cached in memory to avoid another prompt for that same chain (`JFTPTrustManager.java:76-105`). Certificate UI installation persists the full displayed chain to the server trust store (`CertificateDlg.java:66-72`).

## Compatibility risks

- No startup blocker was identified in the assigned action/SSL source by static inspection. The trust-manager concerns and the action behavior differences below are security-policy or later modernization risks; runtime/provider behavior was not verified.
- **Security behavior:** hostname verification reads subject CN only and compares exact strings; it does not inspect Subject Alternative Names or apply wildcard rules. The date check calls `checkValidity()` only for the leaf certificate. These are static observations, not protocol/runtime conclusions. User acceptance can proceed despite any failed check and is cached for the lifetime of the trust manager; it is not automatically persisted unless the user installs the chain. Review before changing semantics; tests should pin the chosen policy.
- **Store safety/defaults:** JKS files are created at preference-supplied paths, with a shared default password literal. `KeyStoreManager` writes directly to the configured file and wraps load/save errors, so path creation, directory permissions, and interrupted writes have compatibility implications. Do not change storage defaults or migration behavior without an explicit migration design.
- **Client identity:** the client keystore is used through `JFTPKeyManager`; manager UI currently exposes only the server certificates tab even though client import/delete paths and localized strings exist (`CertificateManagerDlg.java:248-277, 324-347` and commented client tab near lines 455-493). Client certificates may be available to TLS selection without being manageable through this visible tab.
- **Action threading and cleanup:** remote open/print/edit/email use temp files and desktop integration. Worker `construct()` and `finished()` responsibilities are uneven; `DownloadAndUnzipAction` calls `session.downloadDataFile` before its local unzip `try`, while zip/unzip cleanup and temporary-file deletion can fail silently or leave artifacts. Busy flags, abort state, errors, and pane refresh order are observable behavior.
- **Defensive guards differ:** for example, local actions typically check session/selection but not connection; remote actions generally check connection. `EmailRemoteFileAction` has commented-out connection/busy checks. Centralizing enablement or gating changes can alter existing action behavior.
- `getInstance` implementations contain a redundant nested null check. Replacing them with a registry or fresh instances may affect caller assumptions about singleton identity and captured `JFTP` references.

## Future verification

Suggested behavior-focused checks, with observable results:

1. Trigger a remote action with no current session, a disconnected session, no selection, a directory selection, and a file selection. Observe no-op vs dialog vs session method call and control state.
2. Use a delayed/failing FTP client to verify connect, upload/download, abort, and disconnect remain responsive; observe session busy state, abort flag, error reporting, and one final pane/status refresh.
3. Exercise local and remote open/edit/print/email using a fake desktop handler or seam. Observe temp-file creation, selected object handling, external handoff, cleanup, and changed-file upload prompt.
4. After a security-policy decision, verify TLS handling for valid trusted, valid untrusted, expired, not-yet-valid, CN mismatch, SAN-only matching, and malformed/empty chain inputs. Observe handshake outcome and prompt content. Treat legacy interactive overrides as a risk to assess; do not make insecure acceptance an expected security requirement by default.
5. Use isolated temporary JKS paths to observe absent-store initialization, trusted chain addition/re-import replacement, alias assignment, deletion, restart persistence, bad password, missing parent directory, read-only file, and interrupted-write handling.
6. Verify explicit vs implicit vs disabled SSL and protected/unprotected data channel against a controllable FTP test server, observing actual control/data sockets and configured ports.

This review did not run any of those checks. There is no runtime evidence here.

## Open questions

- Is the older FTP client contract intentionally CN-only, leaf-date-only, and interactive-override trust, or should modernization adopt platform hostname and path validation? This is a compatibility/security policy decision.
- Are the hidden client certificate management UI and current client keystore/key selection still intended supported behavior?
- What guarantees (atomic replace, backup, restrictive file permissions) are expected for user certificate stores across supported platforms?
- Which action paths own temporary-file cleanup after a successful or failed desktop handoff?
