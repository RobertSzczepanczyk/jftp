# Repository map validation

## Scope and method

This is an independent static audit of the generated map, its file inventory, and representative Java declarations. It checks source path coverage, declaration counts, selected signatures against source, graph evidence labels, privacy boundaries, output completeness, determinism, budget enforcement, and staleness behavior. It does not claim compiler-equivalent parsing, semantic type resolution, or a complete call graph.

No Java source was built, launched, or tested. The only executed program was the Node-based map generator and its syntax/check modes. The existing application source and the untracked `micro` file were not modified; `micro` was not read or hashed.

## Input inventory coverage

The pre-report map reconciled to 628 entries: 576 tracked paths, 49 approved task-authored inputs, and 3 generated-map metadata entries. This report adds one approved Markdown input, so the final inventory is expected to contain 629 entries after map regeneration. The three generated map outputs have metadata-only entries with zero input bytes and no content hash; they are not recursively hashed as their own inputs.

The 576 mapped tracked paths matched `git ls-files` exactly. The tracked set includes all 182 Java sources, hidden `.classpath`, `.project`, and six `.settings` files, and both empty test placeholders (`src/test/java/.gitkeep` and `src/test/resources/.gitkeep`). The approved working-tree input set matched the task-authored documentation/guides and map tooling. The only excluded untracked root file was `micro`; the three generated maps are represented separately as metadata-only outputs.

The map classifies 98 binary assets as metadata only: 85 GIF, 12 PNG, and 1 ICNS. It also identifies 41 German `.properties` files as non-UTF-8 text rather than binary. Their original editor encoding is unresolved; the inventory preserves byte counts, line counts, and raw-byte hashes without emitting property values. The other inventory classes in the pre-report view were 302 UTF-8 text files, 182 Java source files, and 2 empty text placeholders.

## Java extraction coverage

All 182 mapped Java paths matched the tracked Java source set exactly. Three `package-info.java` files correctly have no declarations. Each of the other 179 files has one filename-matching top-level type; no extra or unmatched top-level types were found. The map contains 192 named types total: 179 top-level types and 13 nested types. The nested declarations checked were:

- `IntegerField.IntegerDocument`, `MDialog.EscapeAction`, `MInternalFrame.MGlassPane`, and `SwingWorker.ThreadVar`.
- `DnDTransferHandler.LocalFileTransferable` and `DnDTransferHandler.RemoteFileTransferable`.
- `FavoritesDlg.FavoritesListModel`, `LocalPane.DirectoryComboBoxModel`, and `LocalPane.DirectoryCellRenderer`.
- `OSXAdapter.MacOSXEventHandler`, `TransferModesPrefsPanel.TypesTableModel`, `TransferModesPrefsPanel.TransferTypeCellRenderer`, and `CertificateManagerDlg.DeleteCertificateAction`.

The pre-report map contains 2,641 extracted definitions: 186 classes, 6 interfaces, 254 constructors, 1,329 methods, and 866 fields. No enum, record, or annotation types occur in the current production Java tree. Full-map section counts matched the structured JSON: 628 inventory rows, 182 Java source sections, 2,641 definition bullets, 819 edge bullets, and 1,427 unresolved-reference bullets. This count reconciliation found no truncation in the full map.

Representative declarations were compared directly with source:

- `DateCellRenderer` has both constructors and its multiline `getTableCellRendererComponent` signature at `src/main/java/com/myjavaworld/gui/DateCellRenderer.java:41-66`.
- `RemoteHost` has four constructors and both `setCommands(String[])` and `setCommands(String)` overloads at `src/main/java/com/myjavaworld/jftp/RemoteHost.java:54-67,150-154`.
- The private nested `MGlassPane` and its `mousePressed(MouseEvent)` override are qualified under `MInternalFrame` at `src/main/java/com/myjavaworld/gui/MInternalFrame.java:76-88`.
- `DnDTransferHandler`'s two nested `Transferable` implementations appear under their enclosing class at `src/main/java/com/myjavaworld/jftp/DnDTransferHandler.java:117-161`.
- The `ZipListener` interface and its two methods are represented at `src/main/java/com/myjavaworld/zip/ZipListener.java:23-28`.

The map emits declaration signatures, field names/types, visibility, and source locations. A scan of all 2,641 extracted definition records found no literal placeholders or quoted string values, field initializer expressions, or method-body markers. Comments and method bodies are omitted by the scanner. Binary contents and non-UTF-8 property values are not emitted.

## Relationships and unresolved references

The pre-report graph contains 819 directed file references: 533 import edges, 56 declared `extends` edges, 7 declared `implements` edges, and 223 ambiguous lexical-identifier matches. Edges point from a referencing file to an imported or declared-type file. Ambiguous lexical matches are separate from the stronger import and declared-inheritance/interface evidence; none of these edges establishes runtime dispatch or a method call.

The map records 1,427 unresolved import/type references. This includes 1,168 ordinary `java.*`/`javax.*` imports because they have no declaration in the scanned repository; an unresolved record means only that the scanner found no matching repository declaration. It is not a compiler diagnostic or proof that a dependency is missing. The external `com.myjavaworld.ftp` API, JavaHelp imports, and `com.myjavaworld.util.Filter`, `DateFilter`, and `RegexFilter` remain outside the declarations present in the production source tree. In particular, the map leaves `FTPClient` and `ListParser` at the external API boundary and does not invent the missing filter definitions.

## Ranking, budget, and freshness checks

The generator was checked with Node `v24.21.0`. `node --check tools/generate_repo_map.mjs` succeeded. With unchanged inputs, two consecutive default generations produced identical SHA-256 values for all three map outputs; `node tools/generate_repo_map.mjs --check` passed before and after those generations. The pre-report compact map used the documented `ceil(UTF-8 bytes / 4)` estimate at 1,000/1,000. This is an explicit approximation, not an LLM tokenizer measurement.

A focused request for `src/main/java/com/myjavaworld/jftp/FTPSession.java` with `--max-tokens 500 --stdout` produced 1,984 UTF-8 bytes, or 496 estimated tokens, and included the partial-context notice. Hashes of the three default map outputs were unchanged by the focused request. The generator rejects combining `--check` with focus, stdout, or a custom token budget, so those modes cannot silently substitute focused output for freshness checking.

Freshness detection was checked two ways. First, a documentation update to `repo-map-method.md` made the JSON and full map stale; `--check` identified those outputs, and regeneration restored a passing check. Second, a temporary Markdown probe under `docs/` caused `--check` to exit with status 1; deleting the probe restored status 0. The probe was removed. After this report is included in the approved inputs, regenerate all three map outputs and run plain `--check` again; the final inventory should then report 629 entries.

## Publication follow-up (2026-10-07)

The user authorized publishing the documentation, scoped agent guidance, and mapping tool to their existing GitHub fork. Staging these 53 new files changes their inventory classification: the current map has 629 tracked paths and no additional untracked approved inputs. The three generated-map entries remain metadata-only; the original legacy review still covers the same 576 paths. Regeneration after staging, followed by staging the refreshed outputs, is necessary because the scanner uses the Git index for tracked-path membership.

Publication checks cover Markdown encoding and relative links, the 17 colocated instruction imports, mapping-tool syntax and output freshness, and the staged path/whitespace audit. Generated compact Markdown ends with one newline, avoiding an extra empty final line. These checks do not advance the application's build, test, or startup phases.

## Deliberate limits

The scanner is a comment/literal-aware lexical and structural parser, not a Java AST or dependency resolver. It does not model anonymous classes, lambda bodies, implicit/generated members, enum constants, or record components. Generic resolution, complex annotations, inherited members, and ambiguous simple names can still produce omissions or imperfect relationships. Current source has no enum or record declarations, but anonymous implementation details are intentionally absent. Use the map to locate code, then read the source before making behavior claims.

The validation establishes repository-map coverage and output behavior only. It does not establish that the project compiles, that declared dependencies resolve, or that startup, FTP, TLS, Swing workflows, and ZIP behavior work at runtime.
