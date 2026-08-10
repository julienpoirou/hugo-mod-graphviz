# Vendored third-party assets

Provenance and integrity of every third-party file shipped by this module. When updating a library: replace the file, update this table and the matching `sha256` in [.vendored/package.json](.vendored/package.json), and update [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md) if the upstream license changed.

All files live in `assets/libs/hugo-mod-graphviz/`.

| File | Library | Version | License | SHA-256 |
|---|---|---|---|---|
| `viz.js` | [Viz.js](https://github.com/mdaines/viz-js) (standalone build) | 3.11.0 | MIT | `4d463fa09ba8fcae7abd5aaf56c9870ec38e03db05e79e9e2eebc61d20fa8ab3` |

Source: `https://cdn.jsdelivr.net/npm/@viz-js/viz@3.11.0/lib/viz-standalone.min.js`

That is jsDelivr's pass-through of `lib/viz-standalone.js`. The file is already minified, so the CDN only prepends a banner to it. The banner is why fetching `lib/viz-standalone.js` directly does not reproduce the checksum above.

First-party files, under this repository's [LICENSE](LICENSE): `hugo-mod-graphviz.js`, `hugo-mod-graphviz.css`.

## How updates reach us

[.vendored/package.json](.vendored/package.json) pins the same versions as ordinary npm dependencies. Nothing ever installs it. It exists so Dependabot opens a pull request when one of these libraries releases, and so GitHub raises a security alert against the exact code this module serves to readers.

Dependabot can bump that manifest but cannot re-download a minified bundle, so a merged bump would otherwise leave the declared version and the shipped bytes silently out of sync. `scripts/check-vendored.mjs` closes that gap: it fails the build unless the pinned version, this table and the checksum of the committed file all agree.

## Verifying integrity

```bash
node scripts/check-vendored.mjs
sha256sum assets/libs/hugo-mod-graphviz/viz.js
```
