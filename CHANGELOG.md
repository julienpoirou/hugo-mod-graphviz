# Changelog

## [0.4.2](https://github.com/julienpoirou/hugo-mod-graphviz/compare/v0.4.1...v0.4.2) (2026-11-01)


### Corrections 🐛

* **test:** Add fast-check fuzz test for the decode boundary ([#30](https://github.com/julienpoirou/hugo-mod-graphviz/issues/30)) ([b6c75d9](https://github.com/julienpoirou/hugo-mod-graphviz/commit/b6c75d92d60ef0cbd4ac9f9089a1454da6842418))

## [0.4.1](https://github.com/julienpoirou/hugo-mod-graphviz/compare/v0.4.0...v0.4.1) (2026-11-01)


### Corrections 🐛

* **ci:** Restore release-please PAT token fallback ([#29](https://github.com/julienpoirou/hugo-mod-graphviz/issues/29)) ([7df2a04](https://github.com/julienpoirou/hugo-mod-graphviz/commit/7df2a040f1e613fcddb4b77e2431c4d3e227cbbe))
* **security:** Harden workflow execution ([9f4ed48](https://github.com/julienpoirou/hugo-mod-graphviz/commit/9f4ed480e09a5cf8ef25b4f6255e75724961221a))

## [0.4.0](https://github.com/julienpoirou/hugo-mod-graphviz/compare/v0.3.3...v0.4.0) (2026-08-10)


### Features ✨

* **assets:** Update viz.js to 3.29.0 ([c04ef1c](https://github.com/julienpoirou/hugo-mod-graphviz/commit/c04ef1c87d355aada582b90c5e55c987985350c1))

## [0.3.3](https://github.com/julienpoirou/hugo-mod-graphviz/compare/v0.3.2...v0.3.3) (2026-08-09)


### Corrections 🐛

* **security:** Uncontrolled data used in path expression ([1328d3e](https://github.com/julienpoirou/hugo-mod-graphviz/commit/1328d3ef7ab663a7da7e6f6b8349c5a7449b0e83))

## [0.3.2](https://github.com/julienpoirou/hugo-mod-graphviz/compare/v0.3.1...v0.3.2) (2026-07-14)


### Corrections 🐛

* **tests:** Contain served paths within rootDir in serve.js ([c505f3a](https://github.com/julienpoirou/hugo-mod-graphviz/commit/c505f3a0c69cb3eb06b50ec6bdbee3d60af30693))

## [0.3.1](https://github.com/julienpoirou/hugo-mod-graphviz/compare/v0.3.0...v0.3.1) (2026-07-14)


### Corrections 🐛

* **assets:** Move vendored assets out of a "vendor/" path component ([205ac94](https://github.com/julienpoirou/hugo-mod-graphviz/commit/205ac9448a341dbc478db90b4963e4490c3e6d5a))

## [0.3.0](https://github.com/julienpoirou/hugo-mod-graphviz/compare/v0.2.0...v0.3.0) (2026-07-10)


### Features ✨

* **render:** Add build-time rendering mode via graphviz-static ([70d20e2](https://github.com/julienpoirou/hugo-mod-graphviz/commit/70d20e273eb6d8c5d63ba5f2212d6b40051fdbcd))


### Corrections 🐛

* **release:** Use plain GITHUB_TOKEN for release-please ([b100388](https://github.com/julienpoirou/hugo-mod-graphviz/commit/b100388df7bd1d5b191fe0c2a303bd67a6e92bea))
* **shortcode:** Support inline and b64 input when src param is absent ([36f3cca](https://github.com/julienpoirou/hugo-mod-graphviz/commit/36f3cca17d557456a63d07df99218379edcce8a0))


### Performance ⚡

* **assets:** Fingerprint vendored assets via hugo pipes ([bc7426a](https://github.com/julienpoirou/hugo-mod-graphviz/commit/bc7426a17966f93b1f505ce7b21dea70dfc46e6d))
* **assets:** Load vendored scripts with defer ([4ef1100](https://github.com/julienpoirou/hugo-mod-graphviz/commit/4ef110056aec90905d508bd2d3b27ec0559d2e49))
* **runtime:** Defer wasm instantiation until diagrams near viewport ([ce07f9c](https://github.com/julienpoirou/hugo-mod-graphviz/commit/ce07f9c695293984cc62d640c27c55fc42dee566))

## [0.2.0](https://github.com/julienpoirou/hugo-mod-graphviz/compare/v0.1.0...v0.2.0) (2026-03-29)


### Features ✨

* **delivery:** Trigger release ([5b074f3](https://github.com/julienpoirou/hugo-mod-graphviz/commit/5b074f3133dae9a478853c8f61dc10110fd1821e))

## Changelog
