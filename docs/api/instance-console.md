# Open your installation's API console

The hosted reference cannot safely make authenticated cross-origin requests to your OpenMeshTak installation. If your installation has its API UI enabled, open its same-origin console instead.

<InstanceApiConsole />

Only the URL origin is used. Paths, query parameters, and fragments are discarded, and the value is never sent to OpenMeshTak infrastructure or saved by this documentation site. Production installations must use HTTPS; plain HTTP is accepted only for `localhost` development.

The instance must have `SWAGGER_ENABLED=true`. Enabling the console does not make an API key safe to paste into unrelated websites or browser storage.
