# Resources and help review

## Scope

Static review of all text and metadata inventory under `src/main/resources`, `src/main/resources_de`, `src/main/resources_zh_TW`, `src/main/help`, and `src/main/images`. Locale bundles, JavaHelp XML/DTD, HTML, CSS, license text, and image path/type/size metadata are in [review-security-assets.md](review-security-assets.md). Images are inventoried only: no binary was decoded as source and no visual QA was performed. No application, JavaHelp, packaging build, or rendered page was run.

## Inventory

- 57 default resource bundles, 57 German bundles, and 58 Traditional Chinese (`zh_TW`) bundles. Each default bundle has an exactly named locale counterpart in both locale trees. A static property-key comparison found no missing or extra keys in the matching locale bundles. The one extra `InstallLicenseDlg_zh_TW.properties` has no default/German peer. Resource groups cover `com.myjavaworld.gui`, `com.myjavaworld.jftp`, `com.myjavaworld.jftp.ssl`, and `com.myjavaworld.util`.
- 107 textual help files: 95 HTML topics, five JavaHelp XML files, five JavaHelp DTDs, one CSS file, and one Apache license text. HTML topics cover introduction, UI, sessions, connection, transfer, local/remote browsing, favorites, security, preferences, keyboard shortcuts, support, and credits.
- `src/main/images` contains 50 binary image/icon files: 38 GIFs, 11 PNGs, and one ICNS file. `src/main/help/helpset/content` has 48 binary assets: 47 GIFs and one PNG. Together these are 98 binaries in the assigned area. The manifest records each path, type, and byte size; no image was decoded or visually reviewed.

## Responsibilities

Default `.properties` bundles provide UI labels, menu text, messages, validation errors, tooltips, and formatting templates. `_de` and `_zh_TW` bundle files provide German and Traditional Chinese values. `ResourceLoader` calls `ResourceBundle.getBundle(baseName, locale)`, which uses Java's locale-to-base fallback behavior; if no bundle resolves, it prints an error and exits (`src/main/java/com/myjavaworld/util/ResourceLoader.java:31-57`). `JFTPHelp2` resolves `helpset/helpSet.xml` for the default locale and constructs the JavaHelp broker (`src/main/java/com/myjavaworld/jftp/JFTPHelp2.java:31-54`).

JavaHelp's case-sensitive `helpSet.xml` declares `index` as home, loads `map.xml` and `toc.xml`, and declares the main presentation (`src/main/help/helpset/helpSet.xml:8-35`). `map.xml` associates help IDs with content files and icons. UI dialogs/actions reference these help IDs. HTML topics use `default.css`, relative links, and help image assets. The content license page maps to the included Apache License 2.0 text.

## Dependencies/interfaces

- `ResourceLoader` and Java `ResourceBundle` names/locale resolution; consuming Java classes depend on bundle base name, exact key, and `MessageFormat` placeholders.
- Maven declares all three resource trees plus `src/main/images` and `src/main/help` as packaged resource roots (`pom.xml:84-100`). `src/main/assembly/binary.xml` separately describes distribution contents.
- JavaHelp reads helpset, TOC, map, DTDs, HTML, CSS, and referenced icons from their relative classpath paths. `JFTPHelp2` requests IDs from UI code; map target spelling must match those IDs.
- `src/main/images/com/myjavaworld/jftp` supplies classpath UI icons by package-relative names; `src/main/help/helpset/content/images` and `screenshots` supply help-specific art.

## Behavior/data flow

UI classes request bundles by fully qualified base name and look up keys as they construct controls or messages. Locale-qualified names follow `ResourceBundle` convention (`Base_de.properties`, `Base_zh_TW.properties`), with default bundles acting as fallback. Format placeholders, escaped property syntax, literal HTML snippets, mnemonic values, and paired `mnemonicIndex.*` entries are part of the runtime contract.

JavaHelp loads the helpset on demand, uses its home ID, map, TOC, and topic relative paths, then displays associated HTML and images. Static target/path validation found exactly one missing map URL: `local.open` points at `content/content/local/open.html`, but the existing topic is `content/local/open.html` (`map.xml:49`). The HTML/CSS relative-link scan found no other missing local links. This is a static path check, not proof of JavaHelp runtime behavior.

## Compatibility risks

- No application startup blocker was identified in these assigned resource/help/image trees. The `local.open` map defect is confined to a JavaHelp topic route; the other findings below are documentation, localization, packaging, provenance, or later modernization risks and were not runtime checked.
- Bundle key, package/base name, placeholder index/type, mnemonic/index pair, and resource path mismatches can break controls at runtime or produce formatting errors. The locale comparison checked keys, not semantic translation quality, rendered strings, or placeholder correctness.
- A strict UTF-8 byte audit found 41 of 57 German `.properties` files are invalid UTF-8. For example, `AboutDlg_de.properties:1` contains byte `0xDC` for the initial `Ü` in `title.dialog`; this proves the byte sequence is not UTF-8, but does not establish its editor/source encoding. `ResourceLoader` uses `ResourceBundle.getBundle` (`ResourceLoader.java:31-42`). For standard property bundles, JDK 8 and earlier read `InputStream` data as ISO-8859-1; since JDK 9 the default is UTF-8 with ISO-8859-1 retry when malformed/unmappable input is found. The `java.util.PropertyResourceBundle.encoding` system property can force either encoding and thereby change that behavior ([Oracle JDK 8 API](https://docs.oracle.com/javase/8/docs/api/java/util/PropertyResourceBundle.html), [Oracle JDK 17 internationalization guide](https://docs.oracle.com/en/java/javase/17/intl/internationalization-enhancements1.html), [current PropertyResourceBundle API](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/PropertyResourceBundle.html)). The POM sets `project.build.sourceEncoding=UTF-8` (`pom.xml:62`) and compiler source/target 1.5 (`pom.xml:107-108`); these settings do not identify the original German file encoding or the runtime property. A repository search found no explicit `PropertyResourceBundle.encoding` setting. Preserve existing bytes and verify displayed text on the supported runtime before converting bundles.
- The default resources include established misspellings/key names such as `conform.deleteLocalFiles`; German and Chinese retain the same key. Renaming it can break callers even though the spelling looks wrong.
- `map.xml` contains the invalid `local.open` URL above. Help IDs, TOC targets, help action IDs, and map IDs must remain in sync. The help app's external online-only topics (`credits.html`, FAQ, feedback, support, tips) point at legacy `http://www.jMethods.com/...` URLs; their availability and security properties were not verified. Other static help/code mismatches include `local/rename.html` saying `subDir\new.txt` results in `subDir\old.txt`, while `FTPSession.renameLocalFile` constructs the target from `toName` (`FTPSession.java:1350-1366`); the remote file topics name their index page "Working with Local Files" (`remote/index.html:7`), the remote new-file topic names the dialog `Create New Local File` (`remote/newFile.html:42`), both local and remote email topic browser titles say `Printing a File` (`local/email.html:7`; `remote/email.html:7`), and the local refresh topic has an `img` attribute typo `wifth` (`local/refresh.html:26`). The feature page describes raw FTP commands as "soon" (`introduction/features.html:81`) while the current app has a remote command action and `FTPSession.executeCommand(s)` (`FTPSession.java:1421-1490`). Treat these as documentation inconsistencies to reconcile, not automatic behavior changes.
- Help prose is not a definitive implementation contract. For example, `introduction/features.html` claims SSL 3.0/TLS 1.0 support, says custom FTP commands are "soon", and advertises application modes/OSes; these are historical claims that may not match present dependencies, current JDK support, or current product code. The included screenshot variants are binary-only and cannot substantiate the prose here.
- Resource filenames/classes may appear complete while UI is intentionally hidden: certificate-manager strings describe server and client tabs, while current dialog code only adds the server tab. Keep visible UI and documentation aligned deliberately.
- The Apache license page is present and mapped; asset/art attribution is not inferable from the binary inventory alone. Check original notices/credits before replacing or redistributing images.

## Future verification

Suggested behavior checks and observable results:

1. Load every bundle for default, `de`, and `zh_TW` locale and assert all keys used by its consumer resolve; observe localized labels, messages, mnemonics, and no missing-resource termination.
2. Format every message template with representative values; observe valid `MessageFormat` output, preserved HTML/line breaks, and no placeholder-index mismatch.
3. Compare locale menu labels with mnemonic characters/indices and verify no collisions in the resulting UI for each supported locale.
4. Open JavaHelp home, TOC topics, and every `JFTPHelp2` help ID; observe that target topics, CSS, icon assets, anchors, and internal links load. Confirm/repair the `local.open` URL as a concrete candidate.
5. Build the packaged artifact and inspect classpath paths for all locale bundles, action icons, helpset files, DTDs, HTML/CSS, and help images. This review did not build or inspect an artifact.
6. Render UI and help screenshots on supported platforms/locales to compare icon sizing, text clipping, character rendering, mnemonic behavior, and screenshot references. No visual QA was performed here.

These are proposed checks only; there is no runtime or visual verification evidence in this review.

## Open questions

- Is there a maintained inventory of supported JDK versions and expected `.properties` encoding behavior?
- Are the help claims about SSL protocol versions, platform support, applet/Web Start, and "soon" FTP commands still intended to describe the product?
- Should `local.open` be fixed and should stale external help destinations be updated as part of help modernization?
- Which UI image/help screenshot variants are canonical, and what licenses/notices govern each supplied binary asset?
