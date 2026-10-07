# Action dispatch

- Preserve action singleton identity and dispatch against the current `JFTP` session. Keep existing selection and connection guards, menu/toolbar wiring, busy and abort state, errors, and pane refresh behavior.
- Preserve the established Swing event-thread/`SwingWorker` boundaries, cancellation and completion behavior. Moving network, file, archive, or desktop work between callbacks and workers can change responsiveness and cleanup.
- When controls or actions change, keep their resource keys and help IDs/topics aligned.
- Before changing action dispatch or threading, consult [actions-and-security.md](../../../../../../../docs/actions-and-security.md). Keep that review and the root/scoped guidance current with relevant behavior or dependency changes.
