# German resource bundles

- Preserve `_de` bundle names, consumed keys, `MessageFormat` arguments, escaped property syntax, HTML, and mnemonic pairs; keep corresponding default and Traditional Chinese keys aligned or document fallback.
- Some bundles contain invalid UTF-8 byte sequences; the audit evidence is in the resource documentation. This does not establish their editor encoding. Preserve existing bytes unless conversion is intentional and verified against the supported JDK's `PropertyResourceBundle` behavior and runtime encoding override.
- Before changing bundle bytes or locale relationships, consult [resources-and-help.md](../../../docs/resources-and-help.md). Keep that review and the root/scoped guidance current when these contracts change.
