# JFTP modernization plan

## Scope, branch, and status

Work branch: `Luna-subagents-modernization`. Plan prepared 2026-10-06.

This exercise is part of Signity's four-day remote Codex + GitHub Copilot course: learn agent collaboration on a large legacy application. Chat explanations are in Polish and repository documentation is in English.

Restore the existing application on supported Java and dependencies, preserving its functionality. Keep the Swing desktop application and existing workflows. New features, a UI redesign, a framework rewrite, new transfer protocols, and a new resume queue are outside this modernization plan.

The first phase authorizes repository analysis, documentation, and this plan. Source exploration was delegated to three GPT-6 Luna agents. The coordinator reviewed their reports and inventory metadata without reading application source. Production code, build files, launchers, and tests have not been changed. No application build, test suite, packaging, or launch has been executed; read-only Java/Maven availability checks do not establish a working toolchain. The user separately authorized committing and publishing the verified documentation, agent guidance, and repository-map tooling to their fork; this does not advance the runtime implementation phases.

## Fork and upstream workflow

GitHub metadata checked on 2026-10-07 confirms that [RobertSzczepanczyk/jftp](https://github.com/RobertSzczepanczyk/jftp) is already a fork of [sai-pullabhotla/jftp](https://github.com/sai-pullabhotla/jftp). No additional fork is needed.

| Remote | Purpose | Repository |
|---|---|---|
| `origin` | Publish authorized course work | `https://github.com/RobertSzczepanczyk/jftp.git` |
| `upstream` | Fetch the original author's changes | `https://github.com/sai-pullabhotla/jftp.git` |

`upstream` is a remote, not a local branch. `upstream/master` tracks the original project's default branch. Keep modernization work on `Luna-subagents-modernization`; publish it with `git push -u origin Luna-subagents-modernization` after scope verification. Check `git remote -v` before publishing and use the explicit remote rather than relying on a default push destination.

To inspect future changes, run `git fetch upstream`, then `git log --oneline HEAD..upstream/master` and `git diff HEAD...upstream/master`. Fetching does not modify the working tree. Review incoming changes before merging or rebasing on a clean working branch; rerun affected verification and refresh documentation/maps after integration. Do not push course changes to the original project unless explicitly authorized.

| Phase | Status | Required result |
|---|---|---|
| 0. Analysis and documentation | Completed static review; see coverage manifests | Current architecture/dependencies/workflows, root and nested agent guides, plan, test design. |
| 1. Toolchain and artifact reconnaissance | Planned | Usable supported JDK/Maven and a proven dependency classpath. |
| 2. Behavioral test baseline | Planned | Four meaningful functionality families, fixtures, recorded baseline results. |
| 3. Minimal startup repair | Planned | Desktop launches and ordinary workflow tests pass after minimal compatibility edits. |
| 4. Baseline milestone and commits | Planned | Reproducible usable distribution, granular changes, recorded evidence. |
| 5. Dependencies and platform compatibility | Planned | Supported dependency/tooling choices with unchanged functionality. |
| 6. Internal Java modernization | Planned | Small covered improvements to code, resource management, and threading. |
| 7. Final usability and documentation | Planned | Repeatable build, launchers, workflow checks, and accurate guides. |

## What the analysis established

See [architecture](application-architecture.md), [workflows](application-workflows.md), [build and dependencies](build-and-dependencies.md), [shared code](shared-components.md), [actions/security](actions-and-security.md), and [resources/help](resources-and-help.md) for line-level source evidence and class inventories.

| Area | Current state | Effect on the sequence |
|---|---|---|
| Application | Single Maven JAR project, `com.myjavaworld:jftp:5.0.2-SNAPSHOT`; Swing desktop with a legacy applet entry point. | Restore desktop startup first; document deployment-mode constraints without deleting entry points silently. |
| Java/build | Maven source/target 1.5 and compiler plugin 2.4; Eclipse targets 1.6. | Compiler configuration/tooling must be reconciled before meaningful tests can run on a supported JDK. |
| Declared dependencies | `ftpapi:3.0.0`, `javahelp:2.0.05`, test JUnit 3.8.1. | Establish artifact availability, licensing, transitive dependencies, and actual API compatibility before replacements. |
| Missing source contracts | `com.myjavaworld.util.Filter`, `DateFilter`, and `RegexFilter` are imported but absent from production source. | Determine whether the resolved FTP artifact supplies them. Do not invent replacements or delete affected workflows before confirming provenance. |
| Sessions/transfers | One client/parser per session; sequential workers handle selected items and recursion; no durable application retry/resume queue found. | Tests must preserve operations and state transitions without adding new transfer behavior. |
| Persistence | Java-serialized preferences and favorites under `~/.jftp/data`; favorites support legacy raw lists and AES `SealedObject` with an embedded key/fallback. | Capture old-format fixtures before changing classes or dependencies. Preserve readable user data. |
| Threading | Custom SwingWorker, Swing Timer monitor, and library callbacks; some UI/I/O thread boundaries are uncertain. | Characterize responsiveness, cancellation, and EDT ownership before replacing workers. |
| Packaging | Assembly places application JAR at distribution root; launch scripts expect it under `lib/`. | Repair actual launch path as a small packaging change and test from a freshly extracted distribution. |
| Resources | Three bundle trees, JavaHelp, icons and screenshots; a static help map path for `local.open` is invalid. | Preserve exact paths/keys and encodings; verify packaged resources, then correct the broken help target separately. |
| Local tools | No `java` on PATH; Maven launcher reports invalid/missing `JAVA_HOME`. | Configure and record the toolchain before builds; installed directory names are not confirmed versions. |

Transitive dependencies and effective lifecycle plugin versions have not been resolved. The declared-version table in the build document is exhaustive for explicit POM declarations, not a verified complete runtime dependency graph.

## Phase 0: documentation and coordinated review

The three delegated assignments are build/shared packages, direct application package, and actions/security/assets. They cover the 576 tracked files: 478 textual files reviewed and 98 binaries inventoried by path/type/size. Per-file manifests identify coverage and limits. Existing untracked `micro`, `.git` internals, and newly created documentation are outside the legacy-source count. Binary metadata does not establish visual or runtime correctness.

Deliverables are indexed in [docs/README.md](README.md). Root and subsystem `AGENTS.md` files describe the actual package boundaries; each colocated `CLAUDE.md` imports `@AGENTS.md`. All guides require updates with every relevant future change. Specialist instructions live with the code/assets, while detailed analysis lives here.

The subsequent repository-map request adds a compact navigation map, complete symbol/file map, and structured JSON inventory, generated by `tools/generate_repo_map.mjs`. See [map method](repo-map-method.md) and [independent validation](repo-map-validation.md). This documentation tooling does not advance the application test/startup/refactor phases.

**Gate:** every tracked path is covered by one owned manifest, source statements have evidence, uncertainty is explicit, all documentation links and agent imports resolve, and the Git diff contains documentation only. This is a static-analysis completion gate, not an application correctness claim.

## Phase 1: toolchain and dependency reconnaissance

1. Configure a supported JDK and verify `java`, `javac`, `JAVA_HOME`, and `mvn -version` agree. Record vendor, exact versions, paths, and OS. Avoid changing machine-wide configuration when a project/session configuration is sufficient.
2. Use Java 25 LTS as the provisional supported desktop target. Oracle identifies it as the current LTS in its [support roadmap](https://www.oracle.com/java/technologies/java-se-support-roadmap.html), checked 2026-10-06. Use Java 21 as a temporary bridge only if actual incompatibility evidence justifies it; record the reason and a route to the final target.
3. Choose a reproducible Maven 3 toolchain and compiler plugin compatible with that JDK. Candidate versions from official research are Maven 3.9.16 and compiler plugin 3.16.0; recheck supported versions at implementation time and pin them. Keep the current artifact versions for initial compatibility investigation wherever possible.
4. Inspect dependency resolution and effective configuration without invoking release, tag, upload, or deploy operations. The SCM tag execution has no phase in the POM and official mojo documentation lists no default phase; ordinary `package` is not expected to tag the repository. Verify effective behavior before executing a build.
5. Resolve `ftpapi:3.0.0` and JavaHelp and inspect artifact metadata, checksums, licenses, transitive dependencies, supplied packages, and runtime requirements. Check the availability of source/Javadoc and confirm ownership of missing utility contracts. Do not represent unavailable artifact contents as analyzed.
6. If an original artifact is unavailable, investigate an authorized existing cache or upstream source/distribution before choosing a replacement. Document provenance; avoid undocumented local `systemPath` dependencies. This is the principal branch point in the schedule.
7. If the FTP implementation cannot be obtained or cannot work on a supported runtime, outline a narrow adapter around existing session operations and a supported replacement. Characterization tests must come before replacing its behavior. An artifact recovery problem may require more than a minimal version bump; record that honestly.

**Gate:** usable toolchain, known dependency availability/provenance, identified missing classes, concrete compile blockers, and a recorded target. Do not proceed with guessed APIs or silently stub out functionality.

**Evidence to save:** tool version output, effective dependency/plugin inventory, resolution errors, and the minimal intended build edits. Keep credentials out of reports.

## Phase 2: four behavioral test families before refactoring

Implement [behavioral-test-plan.md](behavioral-test-plan.md), covering connection/listing, upload/download, preferences/favorites persistence, and ZIP workflows. Use a loopback fixture server and synthetic data, plus isolated homes and independent byte/archive checks. Tests must assert outcomes rather than internal classes or call order. Use unit tests for independent helpers and integration tests for real transfer behavior.

Sequence the work carefully because the original build may be unable to execute:

1. Freeze the test design, uncertain contracts, fixture data, and baseline serializable shapes before production edits.
2. Add the smallest test harness and modern test runner configuration. Modern compiler/test wiring may be a prerequisite to execute any original code. Keep those prerequisite changes separate from production behavior changes.
3. Attempt the unmodified behavior baseline and record failures accurately. A compilation or resolution failure means there is no measured passing baseline yet.
4. Resolve only necessary build prerequisites, then run the same tests. Where an artifact is missing, distinguish verified helper coverage from unverified end-to-end behavior; test doubles cannot substitute for a usable FTP application.
5. Preserve baseline fixtures, representative expected results, and all failures. Separate proven pre-existing defects from failures introduced by later changes.

**Gate:** all four ordinary workflow families execute and pass, or concrete build blockers are documented before Phase 3 performs their minimal repair. Broader modernization cannot begin until the passing four-family gate is reached. Do not weaken tests to bypass an unresolved prerequisite.

## Phase 3: smallest changes needed for startup

Use the actual compiler/runtime failures from Phases 1–2 to select changes. The items below are candidates, not claims that each is required.

1. Update only the compiler plugin/configuration required for the chosen supported JDK. Use `--release` rather than contradictory source/target metadata; align Eclipse settings if they are retained. Record the runtime floor separately from the JDK used to build.
2. Correct proven missing-class, removed-API, or incompatible-linkage problems. Inspect the unused legacy compile-time Mac adapter before choosing a solution; preserve desktop behavior and document any platform-specific limitation. Do not globally delete platform integration to make compilation succeed.
3. Keep the existing FTP client and JavaHelp where they resolve and work. If replacement is unavoidable for startup, isolate it and require the same behavioral suite; do not mix it with broad internal cleanup.
4. Reconcile launch scripts, assembly placement, manifest dependency paths, and script filtering so that the distribution launches from its extracted location. Prefer one consistent location and preserve both Windows and POSIX launch paths.
5. Launch with a fresh isolated home and exercise startup, a session, connection/listing, representative binary transfer, preferences save, shutdown, and restart. Then test copied synthetic legacy preferences/favorites fixtures. Do not run against the user's actual data directory.
6. Investigate failures in production code first. Fix the actual cause, then rerun the affected tests and all four families. Record why a change is needed for startup and which observation proves it.

**Gate:** build succeeds, extracted desktop distribution launches, representative transfer works, all four families pass, and persistence survives restart. There must be no disabled existing workflow masquerading as a startup fix.

If a corrupted store prevents launch, reproduce with an isolated fixture and design recovery that preserves the original file. If a dependency or deployment mode cannot be restored within scope, record the exact limitation and decision needed; do not claim a fully restored application.

## Phase 4: establish and commit the usable baseline

Review the diff against the documented behavior and make granular commits for documentation, test harness/contracts, required compiler compatibility, actual startup code fixes, and launcher repair. Commit only when checks for the committed scope pass; runtime changes also require startup and manual desktop QA. Independent documentation or tooling work can be verified and committed separately, but do not commit incomplete runtime changes as failing checkpoints. The milestone occurs only when the application is usable and tests pass.

Record a baseline commit reference, exact build/test/launch procedure, supported runtime, dependency provenance, test results, and known pre-existing defects. The archive must work without relying on loose resource directories or an IDE classpath. Confirm that changes did not accidentally trigger remote deployment/tagging.

**Gate:** reviewable history and a documented recovery point with passing tests and actual startup evidence. No remote push or deployment is required by this plan.

## Phase 5: dependency and platform modernization

| Change group | Work | Verification and rollback boundary |
|---|---|---|
| Maven lifecycle | Update JAR, source, assembly, test, and other lifecycle plugins individually. Pin versions; isolate obsolete release/FTP deployment configuration after its role is understood. Consider a wrapper for repeatability. | Compare artifact contents and launch behavior after each change; revert that plugin change alone on failure. |
| Test tooling | Retain a supported Jupiter runner and matching test plugins; keep fixtures independent of internal implementation. | Confirm tests are discovered and executed; no silent zero-test success or omitted suites. |
| FTP dependency | Prefer a maintained compatible version if one exists. Otherwise replace behind a small operation boundary after comparing API capabilities, listing parsing, ASCII/binary behavior, passive mode, errors, TLS, filters, and event semantics. | Four families plus controlled FTP/FTPS server matrix. Do not switch protocols or lose supported operations. Preserve persistence fields tied to external types or provide migration. |
| JavaHelp | Establish maintained artifact options before upgrade/substitution. Preserve help invocation, IDs/topics, links, and offline help access. Fix the concrete broken `local.open` map path separately. | Open mapped topics from the packaged artifact, inspect resource case, and verify no missing bundles/help/icons. |
| Platform entry points | Modernize Mac desktop hooks using supported APIs where needed. Keep applet compatibility policy explicit. | Windows desktop remains the local primary check; run macOS/Linux checks on actual hosts when available and label unverified platforms. |
| TLS/stores | Test explicit/implicit TLS and protected data channels, existing certificate import/trust flows, and client key selection under supported JDK defaults. | Controlled handshakes, isolated JKS persistence, positive and rejection cases. Never restore connectivity by indiscriminately disabling modern TLS protections. |

The applet limitation cannot be solved by a version number: [Oracle's removed API guide](https://docs.oracle.com/en/java/javase/26/migrate/removed-apis.html) confirms removal of `java.applet` and `javax.swing.JApplet` in JDK 26. Java 25 permits an initial compatibility target but does not restore browser hosting. If applet execution is still required, explicitly decide a deployment strategy before deleting/excluding that entry point. A modern desktop restoration should not be represented as successful applet restoration.

Review source-visible risks such as ZIP path traversal, custom certificate checks, embedded credential keys/plaintext fallback, and direct store writes. Reproduce each in isolation, add an appropriate regression case, and decide a correctness/compatibility fix separately. Preserve legitimate workflows and data; do not cement unsafe behavior as a regression requirement or perform an unreviewed security/storage redesign.

**Gate:** every chosen dependency is obtainable and compatible with the final supported target, its update has isolated results, and all originally supported workflows remain accounted for. Where no maintained artifact exists, document the chosen replacement/maintenance approach and its evidence rather than call an unchanged obsolete dependency modern.

## Phase 6: modernize internal Java in small steps

1. Add generics and type-safe collections where they do not change serialized shapes or caller behavior. Keep stable public/persisted names during early steps.
2. Improve stream/file/socket cleanup with try-with-resources where it preserves lifetime and failure behavior. Check failure, cancellation, and large-file paths, not just success.
3. Replace obsolete platform/toolkit APIs with supported equivalents while retaining shortcuts, icons, locale behavior, and desktop operations.
4. Extract limited operational logic from oversized session/UI methods only where tests cover the same public operations. Keep the existing Swing screen flow.
5. Replace the custom worker model incrementally if its semantics can be preserved. Define EDT updates, background I/O, exception propagation, and cancellation before adapting one operation at a time. Virtual threads or a new concurrency framework are not mandatory modernization steps.
6. Clarify error propagation and recovery after observing current outcomes. Separate user messages from technical diagnostics and avoid leaking credentials.
7. Improve storage writes/compatibility only through a fixture-backed design. An optional new format is a separate decision, not an automatic consequence of newer Java.
8. Keep properties encodings, MessageFormat arguments, help identifiers, and resource paths stable; verify all supported locales when touching resources.

For each step: record the intended behavioral invariant, make one coherent change, run affected coverage and the milestone suite, update root/scoped guidance and subsystem docs, then make a small commit. Avoid mass formatting mixed with behavior/dependency changes, records for persisted mutable types without migration, blanket catches, and unnecessary module-system migration while split-package provenance is unresolved.

**Gate:** maintained code uses the selected supported APIs, lifecycle/threading responsibilities are clear, no feature changes are hidden in cleanup, and all relevant tests and launch checks remain green.

## Phase 7: usability, packaging, and handover

From a fresh checkout with the documented toolchain, build and test, extract the distribution outside the checkout, then launch using the shipped Windows script and JAR entry point. Validate POSIX launch on a suitable host. Check the four functionality families, restart with persisted synthetic data, offline help, default/German/Traditional Chinese resources, certificates, local/remote file operations, multiple sessions, error/abort recovery, and external desktop handoffs where supported.

Record tested OS/JDK/server combinations and distinguish untested platforms. Document the normal development commands, startup procedure, dependency acquisition, known constraints, data backup/migration approach if introduced, and rollback procedure. Automated CI can repeat the supported build/tests when infrastructure is available; introducing a CI provider is not a prerequisite to the first local launch.

**Final gate:** the application is usable on its declared supported Java target, dependencies/build are repeatable, all retained features have appropriate evidence, no regression suite failures are concealed, and root/nested agent guidance matches the final tree. Resolve or explicitly agree any remaining dependency/deployment constraints before declaring the broader modernization complete.

## Proposed granular commit sequence

These are future commit boundaries, not commits made during analysis. Split further when actual changes warrant it.

1. `Docs: document legacy JFTP and modernization workflow`
2. `Tests: add behavioral fixtures and contract harness`
3. `Build: enable supported JDK compilation and test execution`
4. `Desktop: repair confirmed startup compatibility issue` — one specific cause per commit.
5. `Build: align distribution launch paths`
6. `Docs: record passing minimal startup baseline`
7. `Build: update <one plugin or dependency>` — repeat separately for each update.
8. `FTP: preserve <workflow> under updated dependency` — use the actual affected area for non-FTP changes.
9. `Core: modernize <one operation or shared component>` — use the actual affected area and include matching tests/docs.
10. `Docs: publish verified build and usage procedures`

Where tests cannot initially run without compiler wiring, commits 2–3 may be ordered differently or composed as a clearly identified prerequisite pair. Do not let that practical constraint turn into a broad production refactor before contracts exist.

## Working rules throughout

- Update root and affected nested `AGENTS.md`, related `CLAUDE.md` imports if needed, and `docs/` alongside every relevant change. Each stage must leave guidance true for that stage.
- Start regression investigations with modified production code and integration assumptions. Change tests only with evidence of a wrong original expectation or an explicit behavior decision, retaining equivalent coverage.
- For bug fixes, write a behavioral test first and prove the intended failure before production changes. For refactors, establish a passing characterization baseline first; missing infrastructure must be addressed, and compilation/resolution errors do not count as a red behavioral test.
- After each runtime-affecting task, exercise the real Swing flow through available native computer-use/Computer Commander tooling or human QA. Capture touched screens, verify changed success/error/cancel paths and relevant persistence, preserve existing locales and UI behavior, and report steps and screenshot locations. If desktop validation is unavailable, record the incomplete gate rather than infer success from automated tests.
- Use `Area: short summary` commit messages, keep one logical change per commit, and push only when the user explicitly requests it. Documentation-only tasks require documentation checks; unrelated Java startup is not a prerequisite for those tasks.
- Keep a tested commit/distribution as the rollback point. Back up synthetic migration fixtures; never overwrite the user's only persisted data during diagnosis.
- Record failed as well as passing results. A green build without test discovery, a mocked transfer without real file verification, or a window without a usable connection does not meet the startup gate.
- Recheck exact release versions when implementation starts. Modern standards mean supported APIs and clear behavior; they do not require introducing every new language or framework feature.

## Decisions and uncertainties to resolve as evidence becomes available

Artifact provenance/availability is the first scheduling dependency. Next come verified local tool configuration, actual FTP/TLS library compatibility, supported deployment modes and OSes, serialized-data compatibility, and interpretation of ambiguous existing error/filter behavior. These questions do not block delivering this plan; resolve them at their relevant stage with evidence before changing behavior.

Effort estimates would currently depend mainly on whether the original FTP artifact can be recovered and runs on supported Java. Do not promise a version-bump-only path before that reconnaissance.
