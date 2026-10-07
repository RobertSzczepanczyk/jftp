# Build and dependencies review

## Scope

This review covers the root Maven/Eclipse files, `src/main/scripts`, `src/main/assembly`, and the Java runtime/tooling facts that affect modernization. Repository observations below are source inspection with path and line references. No compilation, tests, packaging, or application launch was performed. See [review-build-shared.md](review-build-shared.md) for the exact file manifest.

## Inventory

- `pom.xml` is a single Maven `jar` project, coordinates `com.myjavaworld:jftp:5.0.2-SNAPSHOT` (`pom.xml:3-10`).
- Compiler source and target are both `1.5`; there is no `<profiles>` block (`pom.xml:101-110`, full project ends at line 197).
- Project metadata points at the jMethods HTTP Maven repository and an FTP distribution repository; SCM metadata names the project's GitHub repository (`pom.xml:41-60`). `maven-release-plugin` is configured to use a profile named `release`, but this POM does not define a profile (`pom.xml:179-187`; no `<profiles>` section in `pom.xml:1-197`).
- All explicitly versioned project dependencies and build tools are listed below; the POM does not inherit from a project parent.
- Maven resources: `src/main/resources`, `src/main/resources_de`, `src/main/resources_zh_TW`, `src/main/images`, and `src/main/help` (`pom.xml:83-100`).
- Packaging descriptor `src/main/assembly/binary.xml` produces `zip`, `dir`, and `tar.gz`, with a base directory (`binary.xml:5-11`).
- Launch scripts are one-line Java invocations (`jftp.bat:1`, `jftp.sh:1`). README describes features and platforms but gives no build instructions (`README.md:1-176`).
- `.classpath` has a JavaSE-1.6 container (`.classpath:11`); Eclipse compiler compliance/source/target are also 1.6 (`.settings/org.eclipse.jdt.core.prefs:13-15,91`). This conflicts with Maven's Java 5 target.
- No tracked binary files occur in the owned scope. `.settings` files are Eclipse preference text; source and packaging files are plain text.

## Responsibilities

Maven compiles the project, adds the configured resource roots, creates the application JAR, source JAR, and binary distributions. The JAR manifest names `com.myjavaworld.jftp.JFTPApplication` as the main class and adds implementation/specification entries and a dependency classpath prefixed with `lib/` (`pom.xml:111-126`). Assembly attaches a `single` goal to `package` (`pom.xml:139-157`).

The assembly copies runtime dependencies to `lib` (`binary.xml:12-19`), copies non-source JARs from `${project.build.directory}` into the distribution root (`binary.xml:20-30`), copies root `*.txt` and `*.md` (`binary.xml:31-37`), and includes filtered files from `${project.build.scriptSourceDirectory}` (`binary.xml:38-43`). Maven's effective value for that model property was not resolved here; the descriptor's intent is to package the launch scripts.

## Dependencies/interfaces

| Kind | Coordinates / version | Declared scope or purpose | Evidence |
|---|---|---|---|
| Dependency | `junit:junit:3.8.1` | `test` | `pom.xml:65-70` |
| Dependency | `com.myjavaworld:ftpapi:3.0.0` | default compile/runtime scope | `pom.xml:71-75` |
| Dependency | `javax.help:javahelp:2.0.05` | default compile/runtime scope | `pom.xml:76-80` |
| Maven plugin | `org.apache.maven.plugins:maven-compiler-plugin:2.4` | Java 1.5 source/target | `pom.xml:101-110` |
| Maven plugin | `org.apache.maven.plugins:maven-jar-plugin:2.4` | executable manifest and classpath | `pom.xml:111-126` |
| Maven plugin | `org.apache.maven.plugins:maven-source-plugin:2.1.2` | source JAR goal | `pom.xml:127-138` |
| Maven plugin | `org.apache.maven.plugins:maven-assembly-plugin:2.3` | binary assembly | `pom.xml:139-157` |
| Maven plugin | `org.apache.maven.plugins:maven-scm-plugin:1.7` | `tag` goal execution, developer connection | `pom.xml:158-173` |
| Maven plugin | `org.apache.maven.plugins:maven-deploy-plugin:2.7` | deploy | `pom.xml:174-178` |
| Maven plugin | `org.apache.maven.plugins:maven-release-plugin:2.3` | release profile name and deploy goal | `pom.xml:179-187` |
| Build extension | `org.apache.maven.wagon:wagon-ftp:2.2` | FTP distribution transport | `pom.xml:189-195` |

The FTP API is also an architectural interface: ZIP code uses application `LocalFile` and `Filter` types (`src/main/java/com/myjavaworld/zip/Zip.java:28-31,202-206`), and the production tree does not define the imported `com.myjavaworld.util.Filter` interface. The `ZipAndUploadAction` caller passes a `LocalFile`-based working directory to `Zip.setRelativeTo`, then opens/adds/closes (`src/main/java/com/myjavaworld/jftp/actions/ZipAndUploadAction.java:90-100`).

## Behavior/data flow

1. Maven compiles with bytecode/source target 1.5, while Eclipse metadata expects 1.6. This means there is no single documented compiler target until those declarations are reconciled.
2. The JAR manifest launches `JFTPApplication` and references dependency JARs using relative `lib/` entries (`pom.xml:115-125`).
3. Assembly puts dependency JARs under `lib/`, but puts the project JAR at the distribution root (`binary.xml:12-30`). The scripts currently invoke `java -jar lib/jftp-${project.version}.jar` after filtering (`jftp.sh:1`, `jftp.bat:1`). That path does not match the assembly's placement of the project JAR. This is a static configuration inconsistency, not a runtime observation.
4. README advertises the app as a desktop Java FTP client and lists file transfer, TLS/SSL, proxy, localization, and local/remote file operations; README contains no build/run procedure (`README.md:7-21,42-50,67-78,106-112,167-176`). Those feature claims are not independently runtime-verified in this review.

## Compatibility risks

- The Java 5 Maven target, Java 6 Eclipse target, and old plugin versions are incompatible signals for selecting a supported build JDK. Compiler plugin 2.4 predates the modern `--release` configuration style; do not assume a current JDK will accept `source/target=1.5`.
- The JAR/assembly/script path mismatch can make the shipped scripts fail even if packaging succeeds.
- Maven Release/SCM/Deploy settings point at legacy SCM and FTP distribution endpoints (`pom.xml:41-60,158-195`). They must not be triggered as part of a local modernization check.
- The SCM `tag` goal is listed in a plugin execution without a `<phase>` (`pom.xml:158-173`). The official `maven-scm-plugin:tag` mojo documentation describes tagging and does not list a default lifecycle phase ([official mojo docs](https://maven.apache.org/scm/maven-scm-plugin/tag-mojo.html)); inference: this execution is not bound to ordinary `package` and should not tag during a normal package lifecycle. The release plugin and FTP distribution settings still matter for explicitly invoked release/deploy workflows (`pom.xml:53-60,179-187`). Keep those release goals out of baseline package verification.
- Application code imports `com.myjavaworld.util.Filter` across `Zip`, `FTPSession`, `JFTP`, `LocalFile`, local/remote filter dialogs, and property dialogs. `DateFilter` and `RegexFilter` are also imported by local/remote filtering classes. None is defined under production source in this repository. The declared `ftpapi:3.0.0` is a possible provider, but this remains unconfirmed until its resolved JAR is inspected.
- `src/test/java` contains only a tracked `.gitkeep` placeholder; the declared JUnit dependency does not establish a test suite (`git ls-files` inventory; `pom.xml:65-70`). No build lifecycle or tests were run.
- POM metadata and `NOTICE.txt` identify jMethods, Inc. and Apache License 2.0 (`pom.xml:31-40`; `NOTICE.txt:1-13`; `LICENSE.txt` is the Apache 2.0 text). Preserve notices and review redistribution/licensing for third-party artifacts before changing dependency versions or assembly contents.
- README's SSL 3.0/TLS 1.0/1.1/1.2 claims are historical feature statements (`README.md:42-50`), not evidence those protocols are currently enabled or safe on modern JDKs.

## Future verification

Suggested staged approach (targets remain provisional pending a baseline build):

1. **Supported-LTS compatibility bootstrap:** provision Java 25 LTS as the provisional primary build/runtime target and update the compiler plugin from 2.4 to a Maven 3-compatible 3.x release that supports `--release` (the official Compiler Plugin documentation currently shows 3.16.0 and describes Maven 3 configuration). Set an explicit release target and reconcile Eclipse metadata to it. First resolve compile/API blockers, including external artifact availability, before updating unrelated plugins. Keep Java 21 as a bridge target only if an actual dependency/API compatibility finding requires it. Do not require a Java 5/6 runtime; an isolated archival compiler/runtime may be used only if legacy compatibility evidence proves necessary. Correct the assembly/script path mismatch, then run a clean package and inspect archive contents, manifest, dependency paths, launch scripts, and startup on the supported desktop JDK. No working command is asserted before Java/Maven are configured and the repository is known to build.
2. **Compatibility stabilization:** add focused automated coverage around existing ZIP and utility contracts (see [shared-components.md](shared-components.md#future-verification)); exercise localization/resource loading and Swing EDT behavior; resolve warnings and deprecated APIs only where behavior is covered.
3. **Modern toolchain stabilization:** once the Java 25 baseline is repeatable, move other lifecycle plugins individually to supported versions, and review old Maven release/deploy/FTP extension configuration separately from ordinary package builds. The official Maven download page lists Maven 3.9.16 as current; use it as a plausible Maven 3 target after verifying compatibility with the chosen compiler and remaining plugins.
4. **Runtime verification:** after APIs, TLS defaults, UI, and external FTP API compatibility are checked on Java 25, publish the supported minimum and test it separately from the JDK used to build. Retain Java 21 only if evidence supports it as a compatibility bridge.

As of 2026-10-06, Oracle's current LTS is Java 25 (released September 2025); Java 26 is a non-LTS release listed for March 2026. Oracle lists Java 21 as the previous LTS. These are ecosystem reference points only, not a recommendation that this Java 5/6-era app can jump straight to 25. See [Oracle Java SE Support Roadmap](https://www.oracle.com/java/technologies/java-se-support-roadmap.html) and [Oracle Java Downloads](https://www.oracle.com/java/technologies/downloads/).

The official Maven download page currently lists Maven 3.9.16 as latest. It is a plausible Maven 3.x target for the bootstrap, subject to compatibility checks; the page also points to Maven archives for historical versions. See [Apache Maven downloads](https://maven.apache.org/download.cgi). The official Compiler Plugin 3.x page shows version 3.16.0 and recommends the `maven.compiler.release` property for JDK 9+; its 3.x configuration applies to Maven 3. See [Compiler Plugin: `--release` configuration](https://maven.apache.org/plugins/maven-compiler-plugin/examples/set-compiler-release.html). `--release` aligns language level, bytecode, and public APIs, which is preferable to retaining `source`/`target` alone. These official pages were checked on 2026-10-06.

**Local environment inventory (read-only):** no `java` executable is on PATH; `mvn.cmd` exists at `C:\Tools\apache-maven-3.10.0\bin\mvn.cmd`, but invoking its version command reports that `JAVA_HOME` is not defined correctly. Therefore no local JDK or Maven version was confirmed, and no build/test/launch verification is available.

## Open questions

- Can Java 25 LTS serve as the provisional primary build/runtime baseline after the FTP API and JavaHelp dependencies are checked?
- Is a Java 21 bridge build needed based on actual dependency/API compatibility evidence?
- Can `ftpapi:3.0.0` and `javahelp:2.0.05` be resolved from a currently reachable repository, and do their APIs run on the intended modern JDK?
- Is the FTP-based Maven distribution configuration still required, and should release/deploy actions be removed, isolated, or retained?
- Is the distribution intended to have the project JAR in its root or under `lib/`? The descriptor and scripts disagree.
- Is the assembly descriptor's `${project.build.scriptSourceDirectory}` effective value the standard `src/main/scripts` path for the Maven model used here?
- Which README protocol claims remain supported after the runtime baseline and security policy are decided?
