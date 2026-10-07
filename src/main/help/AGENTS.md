# JavaHelp content

- Preserve the case-sensitive `helpset/helpSet.xml` path and keep the JavaHelp home ID, map IDs/URLs, TOC targets, UI help IDs, topic paths, and relative CSS/image links aligned.
- `map.xml` currently maps `local.open` to `content/content/local/open.html`, while the topic is at `content/local/open.html`. Treat this as a known defect; correcting it requires focused validation and a matching documentation update.
- Keep the Apache license topic, help assets, DTDs, and package paths intact when changing content or resources. The static inventory does not establish JavaHelp runtime behavior or image appearance.
- Before changing maps, topic paths, or packaged help resources, consult [resources-and-help.md](../../../docs/resources-and-help.md). Keep that review, the coverage manifest, and root/scoped guidance current with relevant changes.
