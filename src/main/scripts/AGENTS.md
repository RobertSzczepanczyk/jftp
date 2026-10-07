# Launch script guidance

- Keep the Windows and POSIX launchers aligned with the assembled file layout. The scripts look for the application JAR under `lib/`, while the assembly descriptor currently places that JAR at the distribution root.
- Preserve filtered Maven placeholders, platform-specific quoting and path separators, script executable mode, and visible failure behavior when changing launchers.
- Check [build-and-dependencies.md](../../../docs/build-and-dependencies.md) when changing launcher paths or distribution startup behavior.
- When these constraints change, update this guidance and the relevant documentation.
