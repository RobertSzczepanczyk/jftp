# Repository map: method and use

## Purpose and Aider reference

The user requested a repository map based on [Aider's repository-map documentation](https://aider.chat/docs/repomap.html), read 2026-10-06. Aider supplies files and important definitions/signatures as editing context, ranks references between files, and selects relevant content within a configurable token budget. Its default map budget is 1,000 tokens; the selected context can change with the task.

This repository adds an Aider-inspired local map. The implementation and limitations below describe this project's mapper, rather than asserting equivalence to Aider's parser or ranking. The full inventory remains available alongside the compact context.

## Artifacts

- [Compact map](repo-map.md): ranked definitions and signatures for initial navigation.
- [Complete map](repo-map-full.md): all included file paths and extracted Java declarations, without compact-view truncation.
- [Structured map](repo-map.json): machine-readable inventory, symbols, references, rankings, and input fingerprints.
- [Independent validation](repo-map-validation.md): checks performed by a separate GPT-6 Luna agent and remaining extraction limits.
- `tools/generate_repo_map.mjs`: regenerates the artifacts using Node built-ins. Read [tooling instructions](../tools/AGENTS.md) before changing it.

## Repository boundaries

The original review snapshot contains 576 tracked paths, including 182 Java sources and 98 binary assets. The mapper also includes project-authored documentation, agent guides, and map tooling in the working tree. It must retain hidden tracked Eclipse configuration and empty test placeholders.

Git internals, ignored caches, and the pre-existing untracked `micro` are excluded. Images are metadata entries; they are not interpreted as code. External dependency artifact contents remain unavailable to this source map. File inclusion rules and generated-output handling are documented by the tool and validation report.

Known text extensions remain text even when their bytes fail UTF-8 decoding. The byte audit found 41 of 57 German `.properties` bundles fail strict UTF-8; the mapper uses a legacy single-byte fallback and preserves a raw-byte fingerprint without emitting property values. A successful fallback does not prove the original editor encoding. See [resource encoding evidence](resources-and-help.md) for Java's runtime bundle-decoding rules.

## Symbols and relationships

The map extracts Java type declarations, superclass/interfaces, constructors, method signatures, and field names/types with source locations. It omits method bodies, comments, string values, and field initializers. Use source locations to inspect implementation only when a task requires it.

The generator uses a comment/literal-aware structural scanner rather than a compiler or semantic Java resolver. Relationships inferred from imports, package/type names, and lexical references must retain their evidence kinds and ambiguity. They are navigation hints, not proof of runtime dispatch, a complete call graph, or behavior. Overloads, nested classes, anonymous classes, and unresolved names require particular care; see the validation report for measured coverage and limitations.

External FTP/JavaHelp references remain boundaries. Imported `Filter`, `DateFilter`, and `RegexFilter` lack declarations in repository production source; their ownership must be established from resolved dependencies. Do not invent implementations or represent these as resolved internal classes.

An unresolved map reference means no matching declaration was identified in the scanned source. This includes ordinary JDK and third-party imports; it is not a compiler diagnostic or proof that a dependency is missing. Keep those external boundaries distinct from source-only extraction ambiguities.

Dependency-based ranking prioritizes central definitions for the compact view. A focused view can prioritize a specified path and its relationships. The full map and structured inventory are the authority for inclusion; absence from the compact view does not mean a file or method is absent from the repository.

The file graph points from a referencing Java file to a referenced definition/import file. Weighted PageRank uses damping 0.85 and 35 iterations, redistributing dangling scores uniformly. Import and declared superclass/interface edges have weight 1; package-import edges have weight 0.75; lexical matches have weight 0.25. Paths break equal-score ties deterministically. These weights express the mapper's navigation priorities, not probabilities that a reference resolves at runtime.

Within ranked files, compact selection favors non-private definitions, higher reference counts, type declarations, and stable source-line/name ordering. Focused context changes selection priorities rather than the complete source inventory. Consult JSON metadata and the validation report for actual selected-file/symbol counts.

## Regeneration and focused context

Use Node to run the generator from the repository root; no package install, Java build, or application launch is required:

```powershell
node tools/generate_repo_map.mjs
node tools/generate_repo_map.mjs --check
node tools/generate_repo_map.mjs --focus src/main/java/com/myjavaworld/jftp/FTPSession.java --max-tokens 1000 --stdout
```

If Node is not on PATH, use its verified local executable path as recorded in the tooling guide or validation report. Exact execution results and runtime version are recorded there rather than assumed from these example commands.

The token setting uses `ceil(UTF-8 output bytes / 4)`, not a measurement by an LLM tokenizer. Do not promise that a compact view fits exactly 1,000 tokens for every model. The generator enforces this estimate against the rendered output and distinguishes it from actual tokenizer counts.

Use `--stdout` for transient task context so a focused task does not replace the committed/default navigation map. Review the tool's flag behavior before combining regeneration and focused output. `--check` verifies the default generated artifacts and rejects combinations with focus, stdout, or a custom token budget; run focused context separately. Regenerate after edits to included files or mapping rules.

Generated map files are present in the inventory as output entries with zero recorded input bytes and no content hash. This prevents self-referential size/hash changes on each generation; their actual output sizes are not source fingerprints. Other included inputs retain content or metadata fingerprints according to their classification.

## Maintenance and verification

After changes to files, packages, declarations, dependencies, resources, guides, or the mapper, regenerate the map and update affected root/scoped `AGENTS.md` instructions and detailed docs in the same change. Keep baseline source-review manifests historical; describe current map inventory separately.

Check complete inventory coverage, input staleness, deterministic regeneration, symbol locations and representative signatures, unresolved-reference reporting, compact budget accounting, and exclusion of bodies/initializer values. Maintain the independent report when changing extraction/ranking logic. These checks establish map quality, not compilation, tests, transfers, TLS behavior, or application startup.
