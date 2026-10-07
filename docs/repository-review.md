# Repository review coordination and limits

## Method

The user requested GPT-6 Luna for repository exploration. Three GPT-6 Luna subagents reviewed separate sections using a common reporting structure: scope, inventory, responsibilities, interfaces/dependencies, behavior/data flow, compatibility risks, future verification, and open questions. Each wrote its subsystem documents and colocated agent instructions. The coordinator reviewed those reports, reconciled inventory counts and inconsistent draft descriptions, and assembled the staged plan without reading application source.

Review snapshot: 2026-10-06, branch `Luna-subagents-modernization`, 576 tracked legacy repository paths. Newly created Markdown documentation and the pre-existing untracked `micro` are excluded from this count.

## Ownership and coverage

| Luna assignment | Owned tracked scope | Paths | Review evidence |
|---|---|---:|---|
| Build/shared | Root/Eclipse files (12), GUI/util/ZIP Java (69), assembly/launchers (3), test placeholders (2). | 86 | [Per-file manifest](review-build-shared.md) |
| Application | Direct Java files in `com/myjavaworld/jftp`, excluding child actions/SSL. | 72 | [Per-file manifest](review-application.md) |
| Security/assets | Actions/SSL Java (41), locale bundles (172), help (155), application images (50). | 418 | [Per-file manifest](review-security-assets.md) |
| Total | 182 Java sources plus configuration, resources, help, legal text, placeholders, and binaries. | 576 | Combined inventory reconciliation. |

478 textual paths were reviewed, including the two test placeholders; 98 binary images/icons were inventoried by path/type/size. Cross-area call-site reads support interface descriptions and do not change the ownership totals.

The coordinator reconciled the three manifests against `git ls-files`: 86 + 72 + 418 = 576 tracked paths, with no omissions or overlapping ownership. Documentation checks covered 45 newly created Markdown files, valid UTF-8, resolving local links, and 16 colocated `CLAUDE.md` imports. Git inspection confirmed no modifications to tracked files and no unexpected additions outside Markdown; `micro` remains the pre-existing untracked file. These checks validate documentation structure and coverage, not application behavior.

## Limits and unresolved evidence

- Static source reading is not proof that a build, test, transfer, TLS handshake, UI action, or launcher works. No application build/test/launch was performed in this phase.
- Image metadata is not visual inspection. Icons/screenshots were not rendered, decoded, or compared to a running UI.
- Dependency artifact contents, transitive versions, effective build configuration, repository availability, and actual callback guarantees remain unverified until the reconnaissance phase. Missing imported classes may be supplied by the external artifact; source absence alone does not establish its contents.
- Read-only local tool checks found no Java executable on PATH and a Maven launcher unable to start because of Java configuration. They do not prove Java is absent from every location on the machine.
- Historical feature/help claims and URLs are recorded as repository contents. They do not establish modern protocol availability, supported OSes, or reachable external services.
- Line references describe the analyzed source snapshot and must be refreshed as code changes.

## Maintaining the evidence

An additional repository-map task builds regenerable compact/full/JSON maps of the working tree, including the original files and subsequent project-authored documentation and tooling. See [map methodology](repo-map-method.md) and [independent map validation](repo-map-validation.md) for current inventory and extraction checks. The 576-path review and 45-Markdown documentation checks above describe the earlier analysis phase.

Update affected documentation and root/nested `AGENTS.md` guidance with each modernization change, as required by the project instructions. Keep this inventory as an explicit historical snapshot; record additions/removals and subsequent verification separately so the original analysis remains understandable. Mark plan phases complete only when their stated evidence and gates are satisfied.
