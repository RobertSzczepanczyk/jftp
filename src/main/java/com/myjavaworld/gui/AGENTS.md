# Shared GUI guidance

- Keep Swing mutations on the Event Dispatch Thread. `SwingWorker.construct()` runs on its worker thread; `finished()` is queued to the EDT. Preserve this split and check callers when changing the worker contract.
- Preserve shared component APIs, localized text, platform shortcuts, dialog hide behavior, and text/password-field rules. Password fields disable copy, cut, undo, and redo; `MTextComponent` and `EditPopupMenu` are shared contracts.
- `GUIUtil` initializes `Toolkit` statically, so using GUI helpers may require a display-capable environment even when a test appears headless.
- For component roles, threading, and source evidence, see [shared-components.md](../../../../../../docs/shared-components.md).
- When these constraints change, update this guidance and the relevant documentation.
