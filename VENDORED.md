# Vendored third-party assets

Provenance and integrity of every third-party file shipped by this module. When updating a library: replace the file, update this table and the matching `sha256` in [.vendored/package.json](.vendored/package.json), and update [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md) if the upstream license changed.

All files live in `assets/libs/hugo-mod-graphviz/`.

| File | Library | Version | License | SHA-256 |
|---|---|---|---|---|
| `viz.js` | [Viz.js](https://github.com/mdaines/viz-js) (standalone build) | 3.29.0 | MIT | `d94405c431c23f674e740f042514231e559d60fffc93dc557b22fafc295fbbc0` |

Source: `https://cdn.jsdelivr.net/npm/@viz-js/viz@3.29.0/dist/viz-global.js`

That is the standalone build, the one that defines `window.Viz` and exposes `Viz.instance()`. Up to 3.11.0 it shipped as `lib/viz-standalone.js`; from 3.12.0 upstream moved it to `dist/viz-global.js`. The 3.11.0 copy vendored before this update came through jsDelivr's minifier, which prepends a banner, so its checksum did not match the raw upstream file either.

First-party files, under this repository's [LICENSE](LICENSE): `hugo-mod-graphviz.js`, `hugo-mod-graphviz.css`.

## How updates reach us

[.vendored/package.json](.vendored/package.json) pins the same versions as ordinary npm dependencies. Nothing ever installs it. It exists so Dependabot opens a pull request when one of these libraries releases, and so GitHub raises a security alert against the exact code this module serves to readers.

Dependabot can bump that manifest but cannot re-download a minified bundle, so a merged bump would otherwise leave the declared version and the shipped bytes silently out of sync. `scripts/check-vendored.mjs` closes that gap: it fails the build unless the pinned version, this table and the checksum of the committed file all agree.

## Verifying integrity

```bash
node scripts/check-vendored.mjs
sha256sum assets/libs/hugo-mod-graphviz/viz.js
```
