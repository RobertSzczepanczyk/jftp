# Test guidance

- Keep coverage aligned with the four workflow families in [behavioral-test-plan.md](../../docs/behavioral-test-plan.md): connect/browse/disconnect, upload/download byte integrity, preferences/favorites persistence across restart, and ZIP creation/extraction.
- Exercise FTP through a disposable loopback server on an ephemeral port, with synthetic credentials and private temporary roots. Never contact public/live FTP services or use real credentials or user data.
- Use isolated temporary homes, stores, and files. Exercise real local file/ZIP/transfer boundaries where they define behavior; avoid over-mocking those workflows. Keep fixtures deterministic and assert observable results.
- Swing coverage may need EDT coordination and a headful environment because GUI helpers initialize `Toolkit`.
- When workflow or fixture expectations change, update the behavioral plan and relevant component documentation. Update [build-and-dependencies.md](../../docs/build-and-dependencies.md) when the test runner or its dependencies change.
