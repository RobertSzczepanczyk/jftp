# Behavioral regression test plan

## Status and purpose

Design only, 2026-10-06. No tests were added or executed during repository analysis. The tracked test directories contain placeholders, and the POM declares JUnit 3.8.1; neither demonstrates existing regression coverage.

Implement these four functionality families before production refactoring. Each family contains multiple scenarios, rather than one superficial assertion. Preserve the same observable contracts when the implementation or library changes. Source evidence and unresolved dependency semantics are in [application workflows](application-workflows.md), [shared components](shared-components.md), and [actions and security](actions-and-security.md).

## Harness and isolation

- Use a supported JDK and a pinned test runner. A provisional choice is JUnit Jupiter 6.1.3, which the [official user guide](https://docs.junit.org/6.1.3/overview.html) identifies as requiring Java 17 or later; verified 2026-10-06. Confirm a compatible Maven Surefire version before implementation. There are no existing JUnit 3 test classes to migrate in the tracked inventory.
- Use temporary input, output, home, and keystore directories. Launch persistence cases in an isolated JVM with `user.home` set before loading application classes because home paths and preferences are initialized statically.
- Run an FTP fixture on loopback with ephemeral ports, deterministic credentials, a private filesystem root, and controllable server responses. Select the fixture implementation after dependency reconnaissance. Avoid public FTP services and real credentials.
- Assert results from the fixture server filesystem, downloaded bytes, displayed listings/state, saved settings, and reloaded favorites. A mock that merely verifies an invocation is insufficient proof that files were transferred correctly.
- Use a fake transport only for controlled failure/cancellation cases that a real local server cannot reproduce reliably. Put assertions on operation outcomes rather than exact call order or concrete client types.
- Keep any adapters small and at a public operation boundary. Avoid private-field reflection, singleton reset hacks, and broad architectural extraction just to install tests.
- File and archive tests should be headless where dependencies permit. Session tests may need a display because application helpers initialize AWT toolkit state. Execute UI work on the event dispatch thread, use bounded condition waits, and close workers/windows/servers in cleanup.
- Record the fixture seed, tool versions, timeout, and expected outcome. Never log passwords, embedded encryption key material, or private keys.

## Family 1: connect, browse, and disconnect

**Functionality:** a user connects to an FTP server, sees the correct remote directory, navigates and filters the listing, then disconnects or reconnects.

**Fixtures:** a local FTP account with nested directories, an empty directory, ordinary and hidden files, known names/sizes/timestamps, and an initial remote directory. Include a favorite with an initial local directory and optional post-login commands supported by the fixture. Use one known parser/server combination first.

| Scenario | Observable assertions |
|---|---|
| Successful login and initial directories | The session becomes connected, remote listing corresponds to the configured initial directory, local view uses the configured initial local directory, and connect controls reflect the completed operation. |
| Navigate into a directory and return | The visible path and listed children match the fixture filesystem; stale children from the previous directory disappear. |
| Filter, clear filter, and sort | Matching file names appear, clearing restores the listing, and ascending/descending results match documented file/directory grouping. Expectations for remote filter semantics must be established using the resolved library. |
| Disconnect and reconnect | Disconnection clears remote state and disables unavailable remote operations; reconnect restores a usable connection and listing. |
| Wrong credentials or unavailable server | An understandable failure is observable, the session leaves its busy state, and a later valid connection remains possible. No indefinite wait or unusable window. |
| Two sessions | Each session retains its own remote directory and selection; operations in one session do not replace the other's listing. |

**Boundary:** use the session connection/navigation APIs or a small behavioral driver around those APIs. Avoid asserting the chosen parser class, listener registration count, or exact command sequence unless an actual server contract requires it.

**Evidence needed before freezing expectations:** login failure state, callback threading, filter behavior, and reconnect semantics depend in part on `ftpapi`. A source observation alone cannot establish a passing baseline.

## Family 2: upload and download preserve file contents

**Functionality:** files and directories reach the chosen destination with the correct names and contents, and transfer errors/cancellation leave the application usable.

**Fixtures:** deterministic binary payload containing all byte values and zero bytes, an empty file, text with known line endings, a multi-buffer file, nested directories, and names that are valid on Windows. Add a delayed transfer and a server-controlled interruption. Use binary mode for exact byte equality.

| Scenario | Observable assertions |
|---|---|
| Binary upload | The server contains the requested path and byte-identical content. The remote view reflects completion and the UI stops being busy. |
| Binary download | The local destination contains byte-identical content and the local view reflects completion. |
| Nested tree round trip | Relative paths and all included file bytes match the fixture after upload followed by download, including empty files and directories where supported by observed behavior. |
| Upload As / Download As | The chosen destination name is used, content is preserved, and the original source name/content is unchanged. |
| ASCII and automatic mode | Text conversion follows the resolved FTP client/server contract; automatic extension/default selection produces the expected content transformation. Do not assume byte equality for ASCII. |
| Failure and abort | The operation finishes within a bound, reports its failure/cancellation, releases busy state and resources, and permits a subsequent valid transfer. Freeze partial-file and remaining-selection behavior only after characterization. |

Check bytes independently, using hashes or complete byte comparisons against fixture data. Progress should be valid and the final outcome clear; exact intermediate percentages or event counts are implementation details.

Source review found sequential selected-file loops and no durable retry/resume queue. Do not introduce or test a new resume feature as part of modernization. Filters affect some recursion paths; characterize that behavior before changing traversal.

## Family 3: preferences and favorites survive restart

**Functionality:** saved settings and connection favorites remain usable across application restarts and upgrades.

**Fixtures:** an isolated `.jftp/data` directory; representative preferences for locale, paths, passive mode, transfer modes, proxy, TLS/store paths, and window state; favorites with all connection fields. Generate legacy raw-list and current encrypted favorite fixtures with the original serializable types and resolved dependency set before changing their schemas. Keep only synthetic credentials in test data.

| Scenario | Observable assertions |
|---|---|
| First use | Defaults load in an empty home, required application data is created, and the application remains usable. |
| Save and restart | A new JVM reloads each chosen setting and favorite field unchanged. Validate through public getters/user-visible values rather than serialized byte layout. |
| Add, edit, delete favorites | Reloaded favorites contain the intended entries and values in the existing name ordering. Do not assert private list implementation or cipher internals. |
| Legacy favorite migration | A raw serialized list loads without loss and remains readable on a subsequent restart after the application saves it. |
| Compatibility after code changes | The modernized application reads fixtures from the baseline and preserves connection settings and credentials needed to use them. |
| Malformed or unwritable storage | Reproduce in an isolated JVM; record current behavior and the intended recovery decision. Never overwrite or discard the only copy of a user's data to make startup succeed. |

Keep persisted class names and `serialVersionUID` stable during early refactoring. If a later dependency replacement changes serializable field types, design migration before replacement. Tests must cover the migration, not recreate fixtures using only new classes and thereby miss compatibility failures.

Plaintext encryption fallback, embedded keys, and startup failure on bad data are risks to investigate. They are not requirements to preserve as desirable behavior. Changes to credential storage require a separate compatibility design and documented decision.

## Family 4: ZIP creation and extraction preserve the selected tree

**Functionality:** ZIP and Upload produces a valid archive of the selected local files; Download and Unzip restores an equivalent directory tree.

**Fixtures:** nested directories, an empty directory, zero-byte file, binary and text payloads, a filter excluding one file, and a chosen relative root. Use the JDK ZIP reader/writer as an independent format oracle.

| Scenario | Observable assertions |
|---|---|
| Create archive from selection | The archive can be read independently; entries use the documented relative paths and slash separators, file bytes match originals, and excluded files are absent. |
| Extract normal archive | The target tree contains expected paths and byte-identical content, with existing overwrite semantics characterized explicitly. |
| ZIP and Upload | The independently inspected server-side archive contains the selected data and the chosen archive name; temporary archive deletion follows the user's option. |
| Download and Unzip | The extracted local files match the server archive; keep/delete archive choices produce the expected archive presence. |
| Empty/large data and failure | Empty content is handled, multi-buffer payloads remain intact, operations release files/archives, errors are observable, and the next operation remains usable. |

Do not freeze the current incorrect extraction end-event filename or single-use object lifecycle as user contracts. Tests of event behavior should describe meaningful completion/file identity rather than reproduce an erroneous argument.

**Additional negative cases:** source review found an extraction path traversal risk. Before relying on untrusted archives, add containment cases for `../`, absolute paths, drive paths, and mixed separators. Assert that no output escapes the isolated extraction root. If those fail on the baseline, record them as pre-existing defects, with a dedicated correctness fix and regression test; do not label them refactor regressions or weaken the intended safety assertion.

## Baseline and failure rules

1. Define and review expected outcomes before modifying production behavior. Record uncertain contracts as pending characterization.
2. Add test fixtures and minimal test harness/build wiring. Attempt the baseline and keep full results.
3. If the original tree cannot compile or resolve dependencies, record the blocker. Make only the minimal build prerequisite changes needed to run the same tests. Do not claim an original passing baseline that could not be measured.
4. Require all four ordinary workflow families to pass before broader modernization. Track reproduced pre-existing defects separately and address them with explicit tests and small fixes.
5. After every production/dependency change, rerun affected tests and the four-family gate at each milestone. For newly failing tests, start by investigating the changed application or dependency integration. Correct production code first.
6. Revise a test expectation only with concrete evidence that the expectation was wrong or a documented behavior decision changes it. Record the reason and keep equivalent coverage. Do not remove assertions, skip tests, inflate timeouts, or replace integration checks with mocks to obtain a green gate.

## Additional release checks

Beyond the four initial families, add resource/locale and JavaHelp smoke checks, certificate-store compatibility and controlled FTPS handshakes, shared worker EDT/cancellation checks, local CRUD/filter checks, and packaged launcher checks as their corresponding subsystems change. These protect existing features rather than expand scope.

A usable desktop window, successful representative FTP transfer, and all four passing families are required for the minimal-startup milestone. A passing unit suite alone does not establish that the distribution launches.
