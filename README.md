# hugo-mod-graphviz

[![CI](https://github.com/julienpoirou/hugo-mod-graphviz/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/julienpoirou/hugo-mod-graphviz/actions/workflows/ci.yml)
[![CodeQL](https://github.com/julienpoirou/hugo-mod-graphviz/actions/workflows/codeql.yml/badge.svg)](https://github.com/julienpoirou/hugo-mod-graphviz/actions/workflows/codeql.yml)
[![Release](https://img.shields.io/github/v/release/julienpoirou/hugo-mod-graphviz?include_prereleases&sort=semver)](https://github.com/julienpoirou/hugo-mod-graphviz/releases)
[![Hugo Module](https://img.shields.io/badge/Hugo-Module-FF4088?logo=hugo&logoColor=white)](https://gohugo.io/hugo-modules/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196.svg)](https://www.conventionalcommits.org)

<p align="center">
  <img src="./logo.svg" alt="hugo-mod-graphviz logo" width="160" height="160">
</p>

Standalone Hugo module for Graphviz and DOT rendering through a vendored `viz.js` runtime.

## Features

- Render Graphviz diagrams with `{{< graphviz >}}`
- Support `src`, `b64`, and inline body input modes
- Ship vendored `viz.js`
- Include a runtime fallback from `renderSVGElement()` to `renderString()`
- Fail explicitly at build time when shortcode source is missing

## Requirements

- Hugo `>= 0.124`
- A Hugo site with Hugo Modules enabled
- Node.js (any current LTS) — only for the optional build-time rendering mode, see below

## Installation

Import the module in your Hugo site:

```toml
[module]
  [[module.imports]]
    path = "github.com/julienpoirou/hugo-mod-graphviz"
```

## Usage

Inline source:

```text
{{< graphviz >}}
digraph {
  A -> B;
  B -> "Graph";
}
{{< /graphviz >}}
```

File source:

```text
{{< graphviz src="renderers/graphviz.dot" />}}
```

Base64 source (when the DOT text would otherwise conflict with Markdown
or shortcode parsing):

```text
{{< graphviz b64="ZGlncmFwaCB7IEEgLT4gQjsgfQ==" />}}
```

## Rendering behavior

The Graphviz WASM runtime is instantiated lazily: each diagram renders when
it approaches the viewport (200px margin). For content injected dynamically
after page load, call `window.HugoModGraphviz.observeAll(root)` for lazy
rendering or `window.HugoModGraphviz.renderAll(root)` to render immediately.

## Choosing a rendering mode

Two rendering modes are available, and DOT graphs have no interactivity to
lose either way, so build-time rendering is usually the better default:

| | `{{< graphviz >}}` (runtime) | `{{< graphviz-static >}}` (build-time) |
|---|---|---|
| Where it renders | Visitor's browser (WASM) | Your build machine (Node) |
| Client cost | ~1.4 MB WASM runtime, deferred + lazy | Zero JS shipped |
| Input modes | inline, `src`, `b64` | `src` only |
| Output | Live `<svg>` in the DOM | Static `<img>` pointing at a pre-rendered SVG |
| Requires | Nothing extra | `node scripts/render-graphviz.js` before `hugo build` |

Use the runtime shortcode for diagrams assembled from dynamic or inline
content. For diagrams that live in a file under `assets/`, prefer the
build-time shortcode: it ships no JavaScript to visitors and the output is
indexable, cacheable, plain SVG — the same tradeoff `hugo-mod-plantuml` makes
for PlantUML diagrams.

### Build-time usage

Create a source file under `assets/`:

```text
assets/diagrams/architecture.dot
```

Render it locally (mirrors `assets/**/*.{dot,gv}` into `static/generated/graphviz/**/*.svg`,
skipping files that are already up to date):

```bash
node _modules/hugo-mod-graphviz/scripts/render-graphviz.js .
```

Use the shortcode:

```text
{{< graphviz-static src="diagrams/architecture.dot" alt="Architecture diagram" >}}
```

## Output assets

The module publishes, through Hugo Pipes (`resources.Get` + `fingerprint`),
so each file's published URL includes a content hash for cache-busting and
ships a Subresource Integrity attribute:

- `vendor/hugo-mod-graphviz/viz.<hash>.js`
- `vendor/hugo-mod-graphviz/hugo-mod-graphviz.<hash>.js`
- `vendor/hugo-mod-graphviz/hugo-mod-graphviz.<hash>.css`
- `scripts/render-graphviz.js` (build-time renderer, see above)

Source files live under `assets/vendor/hugo-mod-graphviz/` in this
repository; see [`VENDORED.md`](VENDORED.md) for their unfingerprinted
checksums.

## Development

```bash
git clone https://github.com/julienpoirou/hugo-mod-graphviz
cd hugo-mod-graphviz
```

The main verification is handled by GitHub Actions with a minimal Hugo site that mounts the module and builds a sample page.

## Contributing

- Use Conventional Commits for branch history
- Update docs or changelog when behavior changes
- Keep sample DOT snippets valid and minimal
- See [`.github/CONTRIBUTING.md`](.github/CONTRIBUTING.md) for contribution guidance
