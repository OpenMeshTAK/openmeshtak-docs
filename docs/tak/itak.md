# iTAK

iTAK `2.12.3` is confirmed working on iOS 26.

## Setup options

- iTAK connection package
- iTAK QR code
- manual host, username, and password

The iTAK package contains the client identity and truststore. A second package is refused until the previous package certificate is revoked.

## Working features

- live CoT on `8089`
- CoT exchange with ATAK
- Data Package list and download
- manual Data Package import
- automatic Data Package installation and updates
- TAK through the Meshtastic iOS app's local TAK server

::: warning iTAK requires public Marti port 8443
iTAK `2.12.3` always uses public port `8443` for Data Packages. A different Marti port can be used for ATAK, but not for this iTAK version.
:::
