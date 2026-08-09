# Vendored third-party assets

Provenance and integrity of every third-party file shipped by this module. When updating a library: replace the file, update this table, and update [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md) if the upstream license changed.

All files live in `assets/libs/hugo-mod-graphviz/`.

| File | Library | Version | License | SHA-256 |
|---|---|---|---|---|
| `viz.js` | [Viz.js](https://github.com/mdaines/viz-js) (standalone build) | 3.11.0 | MIT | `4d463fa09ba8fcae7abd5aaf56c9870ec38e03db05e79e9e2eebc61d20fa8ab3` |

Source: `https://cdn.jsdelivr.net/npm/@viz-js/viz@3.11.0/lib/viz-standalone.js`

First-party files, under this repository's [LICENSE](LICENSE): `hugo-mod-graphviz.js`, `hugo-mod-graphviz.css`.

## Verifying integrity

```bash
sha256sum assets/libs/hugo-mod-graphviz/viz.js
```
