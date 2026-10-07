# Traditional Chinese resource bundles

- Preserve `_zh_TW` names, consumed keys, `MessageFormat` arguments, Unicode escapes, HTML fragments, and menu mnemonic pairs; keep corresponding default and German keys aligned or document fallback.
- This tree includes an extra `InstallLicenseDlg_zh_TW.properties` bundle. Check its callers and preserve its behavior before considering removal.
- Verify fallback, displayed CJK text, formatting, and mnemonic outcomes on supported JDKs; key parity does not establish correct rendering.
- Before changing locale keys, encoding, or fallback, consult [resources-and-help.md](../../../docs/resources-and-help.md). Keep that review and the root/scoped guidance current when these contracts change.
