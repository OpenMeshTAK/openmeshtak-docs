# Security

- Keep `root_encryption_key` outside the data volume and back it up separately.
- Use HTTPS for Web and API access.
- Put API keys only in the `Authorization` header.
- Never log or publish passwords, private keys, certificates, API keys, claim tokens, or Meshtastic PSKs.
- Give API clients only the permissions and event scopes they need.
- Revoke unused keys, sessions, claims, and certificates.
- Treat every uploaded archive, XML file, image, and map file as untrusted.
- Never expose `/server/data` as static Web content.
- Keep Web and API on one origin; do not enable broad credentialed CORS.

API errors include a safe `traceId`. Use it to find the matching sanitized server log entry.
