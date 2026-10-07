# Repository map tooling

- The scanner reads tracked files plus approved task documentation, guidance, and tooling. It excludes `.git`, ignored caches, generated-map contents, and the existing root `micro`; do not read or hash `micro`. Binary files are inventory metadata only. Non-UTF-8 text keeps its raw-byte hash and unresolved encoding status.
- Never execute application code or emit method bodies, comments, literal values, field initializers, credentials, embedded keys, or private data. Fields expose names and declared types only.
- Keep imported/type references separate from ambiguous lexical-name matches. Unresolved imports are repository-map gaps, not compiler diagnostics; the reference graph is not a call graph or an exact Aider/tree-sitter implementation.
- From the repository root, `node tools/generate_repo_map.mjs` regenerates all maps and `node tools/generate_repo_map.mjs --check` checks the default artifacts. `node --check tools/generate_repo_map.mjs` checks JavaScript syntax.
- Use `--focus <repo-relative-java-path> --max-tokens <N> --stdout` for transient context; it does not replace the default maps. The estimate is approximate and enforced by the generator. `--check` only accepts default, un-focused options.
- For ranking, scanner limits, and audit coverage, see [repo-map-method.md](../docs/repo-map-method.md) and [repo-map-validation.md](../docs/repo-map-validation.md).
- When mapper behavior or these constraints change, update this guidance and the method/validation docs, then regenerate all three maps.
