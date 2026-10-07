# Distribution assembly guidance

- `binary.xml` defines ZIP, directory, and TAR.GZ layouts, places dependencies under `lib/`, and places the application JAR at the distribution root. The launch scripts currently expect that JAR under `lib/`; keep this mismatch in view when changing either side.
- Preserve the manifest's relative dependency classpath, filtered launcher resources, packaged help/resources, and legal notices. Do not add source JARs to the binary distribution.
- Keep release/tag/deploy actions separate from local packaging. Inspect the produced archive layout before describing a packaging or launcher path as verified.
- See [build-and-dependencies.md](../../../docs/build-and-dependencies.md) for current layout and release-configuration evidence.
- When these constraints change, update this guidance and the relevant documentation.
