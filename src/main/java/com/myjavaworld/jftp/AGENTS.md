# Application constraints

- Before changing lifecycle, session ownership, or threading, consult `docs/application-architecture.md`. Before changing user operations or persistence, consult `docs/application-workflows.md` and `docs/behavioral-test-plan.md`.
- `JFTP` holds static preferences and application data paths; isolate `user.home` before class initialization in persistence tests. Changing the home afterwards does not reset that state.
- Preferences and favorites use Java serialization. Keep stored class names, serial IDs, fields, and legacy favorite compatibility stable until a fixture-backed migration exists; preserve original files during recovery.
- Each `FTPSession` owns its client/parser, directories, filters, and selection. Avoid leaking state between tabs when extracting logic from this class.
- The shared worker schedules `finished()` on the EDT; file-monitor Timer callbacks also use the EDT, while ZIP callbacks run on the archive caller thread. FTP callback threading remains dependent on the resolved external API.
- Desktop, applet, and Mac entry paths have different lifecycle behavior. Consult the current compatibility plan before removing or excluding a legacy entry point; do not equate desktop startup with restoration of every deployment mode.
- No durable transfer queue or resume workflow was found in the analyzed source. Modernization must not invent either as an existing contract.
- Update these constraints and related architecture/workflow documentation when ownership, persistence, entry points, or callback semantics change.
