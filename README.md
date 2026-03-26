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

## Output assets

The module publishes:

- `vendor/hugo-mod-graphviz/viz.js`
- `vendor/hugo-mod-graphviz/hugo-mod-graphviz.js`
- `vendor/hugo-mod-graphviz/hugo-mod-graphviz.css`

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
