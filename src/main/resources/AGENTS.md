# Default resource bundles

- Preserve bundle base names and keys used by Java. Keep `MessageFormat` arguments, escaping, HTML fragments, mnemonic characters/indices, and fallback behavior compatible.
- When keys or placeholders change, keep the German and Traditional Chinese bundles aligned or document intentional fallback. Key parity alone does not verify translation or rendering.
- `.properties` decoding depends on the supported JDK and any runtime encoding override. Do not infer file encoding from the POM; consult [resources-and-help.md](../../../docs/resources-and-help.md) before changing Unicode escapes or bytes.
- Keep that resource review and the root/scoped guidance current when bundle contracts, fallback, or encoding assumptions change.
