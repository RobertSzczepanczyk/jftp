# Build and shared components review manifest

## Scope

This is the per-file coverage record for the build/shared-components review requested for the modernization planning phase. The inventory comes from `git ls-files` (so it includes hidden files and empty placeholders that `rg --files` did not show). The reviewed scope contains **86 tracked paths**: 12 root/Eclipse config and legal/project files, 3 assembly/script files, 69 Java source files in `gui`, `util`, and `zip`, and 2 test placeholders. The repository has 576 tracked paths overall, 564 under `src/`; the remaining 490 tracked paths are outside this review assignment and all lie under `src/`.

Files were read as text. There were no binary assets in the owned package/build directories. `src/test/java/.gitkeep` and `src/test/resources/.gitkeep` are empty tracked placeholders. No files outside this manifest were reviewed as part of this assignment. Existing untracked `docs/modernization-plan.md` and root `micro` were left untouched; `micro` was not read.

This was source/configuration review only. No build, test, package, or application launch was performed. No runtime behavior below is claimed as verified. Local environment inventory was read-only: `java` was not available on PATH; `mvn.cmd` existed but could not report a version because `JAVA_HOME` is invalid/unset.

## Inventory

### Root, Eclipse, legal, build, and packaging files (15)

| Tracked path | Review notes / anchors |
|---|---|
| `.classpath` | Read complete, 14 lines; Maven/Eclipse source/resource roots, test roots, JavaSE-1.6 and output directories (`.classpath:1-14`). |
| `.project` | Read complete, 23 lines; Eclipse Java and m2e builders/natures (`.project:1-23`). |
| `.settings/org.eclipse.core.resources.prefs` | Read complete, 10 lines; UTF-8 source/resource encodings (`:1-10`). |
| `.settings/org.eclipse.jdt.core.prefs` | Read complete, 374 lines; Java 1.6 source/compliance/bytecode settings and compiler warnings (`:12-94`); formatting preferences continue through EOF. |
| `.settings/org.eclipse.jdt.ui.prefs` | Read complete, 119 lines; cleanup, formatting, and templates (`:1-119`). |
| `.settings/org.eclipse.ltk.core.refactoring.prefs` | Read complete, 2 lines; refactoring history disabled (`:1-2`). |
| `.settings/org.eclipse.m2e.core.prefs` | Read complete, 4 lines; no active Maven profile (`:1-4`). |
| `.settings/org.eclipse.wst.sse.core.prefs` | Read complete, 3 lines; task tag preferences (`:1-3`). |
| `LICENSE.txt` | Read complete, 202 lines; Apache License 2.0 text. |
| `NOTICE.txt` | Read complete, 13 lines; jMethods copyright/Apache notice (`:1-13`). |
| `README.md` | Read complete, 176 lines; product and feature/platform claims; no build/run instructions (`:1-176`). |
| `pom.xml` | Read complete, 197 lines; coordinates, dependencies, resource roots, explicit plugin versions, profiles absent, and release/deploy endpoints (`:1-197`). |
| `src/main/assembly/binary.xml` | Read complete, 44 lines; distribution formats, dependency/application JAR placement, docs and script filtering (`:1-44`). |
| `src/main/scripts/jftp.bat` | Read complete, 1 line; filtered `java -jar` launch target (`:1`). |
| `src/main/scripts/jftp.sh` | Read complete, 1 line; filtered `java -jar` launch target (`:1`). |

### GUI source files (50)

| Tracked path | Type anchor |
|---|---:|
| `src/main/java/com/myjavaworld/gui/DateCellRenderer.java` | 31 |
| `src/main/java/com/myjavaworld/gui/DefaultLargeTheme.java` | 29 |
| `src/main/java/com/myjavaworld/gui/DefaultTheme.java` | 30 |
| `src/main/java/com/myjavaworld/gui/EditPopupMenu.java` | 32 |
| `src/main/java/com/myjavaworld/gui/GreenMetalLargeTheme.java` | 29 |
| `src/main/java/com/myjavaworld/gui/GreenMetalTheme.java` | 27 |
| `src/main/java/com/myjavaworld/gui/GUIUtil.java` | 39 |
| `src/main/java/com/myjavaworld/gui/HighContrastLargeTheme.java` | 29 |
| `src/main/java/com/myjavaworld/gui/HighContrastTheme.java` | 27 |
| `src/main/java/com/myjavaworld/gui/IDTreeNode.java` | 26 |
| `src/main/java/com/myjavaworld/gui/ImageCellRenderer.java` | 40 |
| `src/main/java/com/myjavaworld/gui/IndentIcon.java` | 28 |
| `src/main/java/com/myjavaworld/gui/IntegerField.java` | 32 |
| `src/main/java/com/myjavaworld/gui/LicenseAgreementDlg.java` | 43 |
| `src/main/java/com/myjavaworld/gui/MButton.java` | 30 |
| `src/main/java/com/myjavaworld/gui/MCheckBox.java` | 24 |
| `src/main/java/com/myjavaworld/gui/MComboBox.java` | 30 |
| `src/main/java/com/myjavaworld/gui/MDefaultRenderer.java` | 35 |
| `src/main/java/com/myjavaworld/gui/MDesktopPane.java` | 34 |
| `src/main/java/com/myjavaworld/gui/MDialog.java` | 38 |
| `src/main/java/com/myjavaworld/gui/MFrame.java` | 31 |
| `src/main/java/com/myjavaworld/gui/MGlassPane.java` | 34 |
| `src/main/java/com/myjavaworld/gui/MInternalFrame.java` | 30 |
| `src/main/java/com/myjavaworld/gui/MLabel.java` | 30 |
| `src/main/java/com/myjavaworld/gui/MLabelTextField.java` | 40 |
| `src/main/java/com/myjavaworld/gui/MList.java` | 28 |
| `src/main/java/com/myjavaworld/gui/MMenu.java` | 30 |
| `src/main/java/com/myjavaworld/gui/MMenuItem.java` | 30 |
| `src/main/java/com/myjavaworld/gui/MOptionPane.java` | 26 |
| `src/main/java/com/myjavaworld/gui/MPasswordField.java` | 39 |
| `src/main/java/com/myjavaworld/gui/MPlainDocument.java` | 31 |
| `src/main/java/com/myjavaworld/gui/MPopupMenu.java` | 37 |
| `src/main/java/com/myjavaworld/gui/MRadioButton.java` | 24 |
| `src/main/java/com/myjavaworld/gui/MRadioButtonMenuItem.java` | 30 |
| `src/main/java/com/myjavaworld/gui/MScrollPane.java` | 29 |
| `src/main/java/com/myjavaworld/gui/MTable.java` | 35 |
| `src/main/java/com/myjavaworld/gui/MTableCellRenderer.java` | 32 |
| `src/main/java/com/myjavaworld/gui/MTableHeaderRenderer.java` | 35 |
| `src/main/java/com/myjavaworld/gui/MTextArea.java` | 39 |
| `src/main/java/com/myjavaworld/gui/MTextComponent.java` | 26 |
| `src/main/java/com/myjavaworld/gui/MTextField.java` | 40 |
| `src/main/java/com/myjavaworld/gui/MTree.java` | 32 |
| `src/main/java/com/myjavaworld/gui/NumericCellRenderer.java` | 31 |
| `src/main/java/com/myjavaworld/gui/package-info.java` | 16 |
| `src/main/java/com/myjavaworld/gui/ProgressDialog.java` | 35 |
| `src/main/java/com/myjavaworld/gui/SandstoneLargeTheme.java` | 29 |
| `src/main/java/com/myjavaworld/gui/SandstoneTheme.java` | 27 |
| `src/main/java/com/myjavaworld/gui/SingleLineDocument.java` | 33 |
| `src/main/java/com/myjavaworld/gui/SplashWindow.java` | 32 |
| `src/main/java/com/myjavaworld/gui/SwingWorker.java` | 30 |

Every GUI source file listed above was read. The `shared-components.md` class map records each type's source-observed responsibility with behavioral line anchors.

### Utility source files (15)

| Tracked path | Type / key anchor |
|---|---|
| `src/main/java/com/myjavaworld/util/CommonResources.java` | `CommonResources:25-32` |
| `src/main/java/com/myjavaworld/util/Encoder.java` | `Encoder:22-35` |
| `src/main/java/com/myjavaworld/util/FileChangeEvent.java` | `FileChangeEvent:24-47` |
| `src/main/java/com/myjavaworld/util/FileChangeListener.java` | `FileChangeListener:23-25` |
| `src/main/java/com/myjavaworld/util/FileChangeMonitor.java` | `FileChangeMonitor:34-97` |
| `src/main/java/com/myjavaworld/util/FileUtilities.java` | `FileUtilities:28-52` |
| `src/main/java/com/myjavaworld/util/package-info.java` | package docs `16-19` |
| `src/main/java/com/myjavaworld/util/ProgressEvent.java` | `ProgressEvent:25-36` |
| `src/main/java/com/myjavaworld/util/ProgressListener.java` | `ProgressListener:25-27` |
| `src/main/java/com/myjavaworld/util/RandomKeyGenerator.java` | `RandomKeyGenerator:23-68` |
| `src/main/java/com/myjavaworld/util/ResourceLoader.java` | `ResourceLoader:29-60` |
| `src/main/java/com/myjavaworld/util/StatusEvent.java` | `StatusEvent:25-36` |
| `src/main/java/com/myjavaworld/util/StatusListener.java` | `StatusListener:25-27` |
| `src/main/java/com/myjavaworld/util/StringUtilities.java` | `StringUtilities:25-58` |
| `src/main/java/com/myjavaworld/util/SystemUtil.java` | `SystemUtil:27-103` |

### ZIP source files and tracked test placeholders (6)

| Tracked path | Type / key anchor |
|---|---|
| `src/main/java/com/myjavaworld/zip/Unzip.java` | `Unzip:36-187` |
| `src/main/java/com/myjavaworld/zip/Zip.java` | `Zip:38-274` |
| `src/main/java/com/myjavaworld/zip/ZipEvent.java` | `ZipEvent:23-43` |
| `src/main/java/com/myjavaworld/zip/ZipListener.java` | `ZipListener:23-28` |
| `src/test/java/.gitkeep` | Empty tracked placeholder; no test source. |
| `src/test/resources/.gitkeep` | Empty tracked placeholder; no test resource. |

## Responsibilities

`build-and-dependencies.md` records build/version/legal/package findings. `shared-components.md` contains the class-by-class GUI/util/ZIP map, source-level cross-package data flow, compatibility risks, and proposed tests. The scoped `AGENTS.md` files encode local invariants and documentation update requirements; each sibling `CLAUDE.md` includes its corresponding `@AGENTS.md` reference.

## Dependencies/interfaces

The reviewed code interacts with app-owned `LocalFile`, FTP session/action classes, Swing/AWT, localized resource bundles, and the `ProgressListener`, `FileChangeListener`, `StatusListener`, and `ZipListener` callback contracts. The POM and missing `Filter` import are documented in `build-and-dependencies.md` and `shared-components.md` with exact evidence.

## Behavior/data flow

These observations describe code paths and declared configuration only. The launch-script mismatch and ZIP extraction path issue are static findings; they were not demonstrated by running the program. Environment availability and verification limits are explicitly recorded above.

## Compatibility risks

Modernization risks include Java target disagreement, unresolved legacy dependencies, relative artifact layout, Swing EDT behavior, old public wrapper methods, and archive path validation. See the two companion docs for path-specific evidence.

## Future verification

The manifest is intended to be updated alongside review docs when this scope changes. Later engineers should preserve the source/runtime distinction, verify every changed invariant with a suitable test, and keep test-only changes out of the production changes being reviewed.

## Open questions

The source-level unknowns about minimum JDK, resolved ownership of `Filter`, dependency availability, release publishing, archive trust boundaries, and GUI test environment remain open as recorded in the companion documents.
