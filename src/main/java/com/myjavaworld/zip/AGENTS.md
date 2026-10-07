# ZIP guidance

- `Zip` and `Unzip` callbacks run synchronously on the invoking thread. Keep listener threading and progress behavior explicit when changing archive work.
- `Unzip` currently appends archive entry names directly under the target. Treat extraction as unsafe for untrusted archives until canonical target-root containment is implemented and verified; define overwrite and duplicate-entry behavior too.
- Preserve relative entry naming and filters. `Zip.computeEntryName` assumes inputs are under its configured root. `Unzip` currently reports the archive path in its end-file event instead of the extracted member path; check listener expectations and close/reopen behavior when changing this lifecycle.
- See [shared-components.md](../../../../../../docs/shared-components.md) for source evidence and [behavioral-test-plan.md](../../../../../../docs/behavioral-test-plan.md) for ZIP verification goals.
- When these constraints change, update this guidance and the relevant documentation.
