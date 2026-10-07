# Utility guidance

- Preserve event classes, listener contracts, and public accessors used by application code. Check callers before renaming legacy APIs such as `FileChangeEvent.getnewDate()`.
- `FileChangeMonitor` uses `javax.swing.Timer`; polling and listener callbacks run on the EDT. It reports only strictly later modification times, and stopping it does not make the same instance restartable.
- A missing bundle in `ResourceLoader` calls `System.exit(1)`. Keep failure-path checks out of the test JVM unless they run in a subprocess.
- `Filter`, `DateFilter`, and `RegexFilter` are imported by the app but absent from repository production source. Check the resolved dependency classpath before changing their semantics.
- See [shared-components.md](../../../../../../docs/shared-components.md) for behavior evidence and [build-and-dependencies.md](../../../../../../docs/build-and-dependencies.md) for dependency boundaries.
- When these constraints change, update this guidance and the relevant documentation.
