# TLS and certificate handling

- Treat TLS mode, host/chain/date checks, interactive trust overrides and their in-memory caching, client identity selection, and warnings as one existing security policy. Preserve it unless a documented policy change defines observable outcomes.
- Treat JKS format, preference paths/passwords, import/delete behavior, and persisted certificates as compatibility contracts. Preserve existing stores and account for migration and restart behavior when changing them.
- The certificate manager currently exposes a server-certificate tab while client-store handling and localized strings remain. Keep visible UI, client identity behavior, warnings, and help aligned; do not assume the client store is unused.
- Before changing TLS or certificate storage, consult [actions-and-security.md](../../../../../../../docs/actions-and-security.md). Keep that review and the root/scoped guidance current with relevant policy, data, or dependency changes.
