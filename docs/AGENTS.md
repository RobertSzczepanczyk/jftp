# Documentation conventions

- Write repository documentation in English. Use `README.md` as the document index, with task-based triggers rather than mandatory reading order.
- Keep observed source behavior, planned changes, and executed verification distinct. Source review manifests are historical coverage records; do not rewrite them to imply runtime proof.
- Keep exact dependency versions in build configuration and dated dependency evidence, and phase gates in `modernization-plan.md`; avoid duplicating volatile facts in agent guidance.
- When tests/workflows change, update `behavioral-test-plan.md` and the affected subsystem document with expected outcomes, fixtures, and verification evidence.
- For map extraction/ranking changes, consult `repo-map-method.md` and `repo-map-validation.md`. Regenerate the compact/full/JSON artifacts rather than editing generated output by hand.
- Keep documentation and applicable instructions aligned with relevant changes. Record tool versions and results as dated verification evidence without turning a contributor's local paths or setup into repository requirements.
