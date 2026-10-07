# Reverse proxy and TLS

## Web and API

Terminate public HTTPS at your normal reverse proxy and forward it to `http://127.0.0.1:8080`.

Allow WebSocket upgrades for `/api/realtime`. Without them, the live server log falls back to HTTP long-polling.

## TAK

Send enrollment, Marti, and CoT directly to Core. Do not terminate their mutual TLS at an HTTP reverse proxy.

If two TLS services must share one public port, use layer-4 SNI passthrough. The router may inspect the host name but must forward the original TLS connection unchanged.

## Certificates

The Web certificate and TAK certificate are separate. TAK can use:

- the certificate created by the OpenMeshTak CA;
- an uploaded publicly trusted certificate; or
- a certificate obtained by Core through its supported ACME configuration.

Client certificates are always issued by the OpenMeshTak TAK CA.
