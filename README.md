# hugo-mod-graphviz

[![CI](https://github.com/julienpoirou/hugo-mod-graphviz/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/julienpoirou/hugo-mod-graphviz/actions/workflows/ci.yml)
[![CodeQL](https://github.com/julienpoirou/hugo-mod-graphviz/actions/workflows/codeql.yml/badge.svg)](https://github.com/julienpoirou/hugo-mod-graphviz/actions/workflows/codeql.yml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/julienpoirou/hugo-mod-graphviz/badge)](https://scorecard.dev/viewer/?uri=github.com/julienpoirou/hugo-mod-graphviz)
[![Release](https://img.shields.io/github/v/release/julienpoirou/hugo-mod-graphviz?include_prereleases&sort=semver)](https://github.com/julienpoirou/hugo-mod-graphviz/releases)
[![Hugo Module](https://img.shields.io/badge/Hugo-Module-FF4088?logo=hugo&logoColor=white)](https://gohugo.io/hugo-modules/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

<p align="center">
  <img src="./logo.svg" alt="hugo-mod-graphviz logo" width="160" height="160">
</p>

<p align="center">
  <strong>Graphviz / DOT diagrams in your Hugo pages.</strong><br>
  Rendered client-side by a vendored <code>viz.js</code>, or pre-rendered to plain SVG at build time.
</p>

## Requires

- Hugo >= `0.124`. The extended edition is not required.
- Node.js (any current LTS), only for the build-time `graphviz-static` mode.

## Install

**Binary** - Hugo and Go installed locally:

```bash
hugo mod init example.com/my-site
hugo mod get github.com/julienpoirou/hugo-mod-graphviz
```

```toml
# hugo.toml
[module]
  [[module.imports]]
    path = "github.com/julienpoirou/hugo-mod-graphviz"
```

**Container** - Docker installed locally:

```bash
alias hugo='docker run --rm -v "$PWD":/src -p 1313:1313 hugomods/hugo:go-git hugo'
hugo mod init example.com/my-site
hugo mod get github.com/julienpoirou/hugo-mod-graphviz
```

## Usage

**Shortcode** - Raw DOT source between the tags:

```text
{{< graphviz >}}
digraph {
  A -> B;
  B -> "Graph";
}
{{< /graphviz >}}
```

**Self-closing shortcode** - Source read from a file:

```text
{{< graphviz src="renderers/graphviz.dot" />}}
```

**Self-closing shortcode** - Source passed as base64:

```text
{{< graphviz b64="ZGlncmFwaCB7IEEgLT4gQjsgfQ==" />}}
```

**Shortcode** - Pre-rendered at build time, ships no JavaScript:

```text
{{< graphviz-static src="diagrams/architecture.dot" alt="Architecture diagram" >}}
```

### Parameters

`graphviz`, the runtime shortcode:

| Param | Description |
|---|---|
| inner content | Raw DOT source between the opening and closing tags |
| `src` | Path, relative to `assets/`, of a file holding the DOT source |
| `b64` | Base64-encoded DOT source |

> At least one input is required. If several are given, `b64` wins over `src`, and `src` wins over the inner content, the others are ignored silently.

> A missing or empty source fails the build with an explicit error rather than emitting a blank page. Invalid DOT is not caught at build time: it surfaces at render time, as the Graphviz message in place of the graph.

> `src` is resolved with `readFile` from the project root, so the file must live in your own site's `assets/`. A file mounted from a theme or from another module will not be found.

`graphviz-static`, the build-time shortcode:

| Param | Default | Description |
|---|---|---|
| `src` | *(required)* | Path, relative to `assets/`, of the DOT file. The extension is swapped for `.svg` to locate the pre-rendered output |
| `alt` | `Graphviz diagram` | Alternative text of the emitted `<img>` |
| `class` | *(none)* | Extra CSS class added to the wrapping `<figure>` |

> `graphviz-static` only points at a file already rendered by the script below. It does not check that the SVG exists: a missing render shows up as a broken image, not as a build error.

## Rendering

The runtime shortcode emits a wrapper carrying the DOT source as base64, and the graph is laid out in the reader's browser by the Graphviz WASM build inside `viz.js`.

- The stylesheet and both scripts are injected once per page, at the first `graphviz` shortcode, in the flow of the content, not in `<head>`. Each one is fingerprinted and carries a Subresource Integrity hash.
- The WASM runtime is instantiated lazily: each graph renders as it approaches the viewport, with a 200px margin. Browsers without `IntersectionObserver` render everything immediately instead.
- Output goes through `renderSVGElement()`, falling back to `renderString()` on runtimes that expose the renderer but fail DOM element output.
- For content injected after page load, call `window.HugoModGraphviz.observeAll(root)` for lazy rendering, or `renderAll(root)` to render immediately.
- A DOT syntax error is written in place of the graph and its output marked `.is-error`, leaving the rest of the page intact.
- Without JavaScript the runtime shortcode leaves an empty block. `graphviz-static` is unaffected: it is a plain `<img>`.

## Vendored assets

Viz.js `3.11.0` (1.4 MB, standalone build, Graphviz compiled to WASM) ships inside the module, no CDN, no third-party request at page load. Provenance, license and SHA-256 are recorded in [VENDORED.md](VENDORED.md).

## License

MIT © 2025 [Julien Poirou](mailto:julienpoirou@protonmail.com)
