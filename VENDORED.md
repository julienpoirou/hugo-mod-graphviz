# Vendored third-party assets

Provenance and integrity of every third-party file shipped by this module.
When updating a library, replace the file, update this table, and update
`THIRD_PARTY_LICENSES.md` if the upstream license changed.

| File | Library | Version | Source | License | SHA-256 |
|---|---|---|---|---|---|
| `assets/libs/hugo-mod-graphviz/viz.js` | [Viz.js](https://github.com/mdaines/viz-js) (standalone build) | 3.11.0 | `https://cdn.jsdelivr.net/npm/@viz-js/viz@3.11.0/lib/viz-standalone.js` | MIT (bundles Graphviz under EPL-1.0 and Expat under MIT, in object code form) | `4d463fa09ba8fcae7abd5aaf56c9870ec38e03db05e79e9e2eebc61d20fa8ab3` |

First-party files (not covered above): `assets/libs/hugo-mod-graphviz/hugo-mod-graphviz.js`,
`assets/libs/hugo-mod-graphviz/hugo-mod-graphviz.css` — licensed under this
repository's [LICENSE](LICENSE).

## Verifying integrity

```bash
sha256sum assets/libs/hugo-mod-graphviz/viz.js
```
