#!/usr/bin/env node
"use strict";

// Build-time DOT -> SVG renderer, mirroring the module's runtime shortcode
// but producing static files instead. Reuses the same vendored viz.js (one
// WASM instance for every diagram, since Viz.js instances are reusable
// across renders) so there is no separate dependency to vendor or fetch.
//
// Usage: node scripts/render-graphviz.js [siteDir]

const fs = require("fs");
const path = require("path");

const siteDir = path.resolve(process.argv[2] || "/src");
const moduleDir = path.join(siteDir, "_modules", "hugo-mod-graphviz");
const assetsDir = path.join(siteDir, "assets");
const outDir = path.join(siteDir, "static", "generated", "graphviz");
const vizPath = path.join(moduleDir, "assets", "vendor", "hugo-mod-graphviz", "viz.js");

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else if (/\.(dot|gv)$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  if (!fs.existsSync(vizPath)) {
    console.error(`[graphviz] missing vendored renderer: ${vizPath}`);
    process.exit(1);
  }
  if (!fs.existsSync(assetsDir)) {
    return;
  }

  const files = walk(assetsDir);
  if (files.length === 0) {
    return;
  }

  const Viz = require(vizPath);
  const viz = await Viz.instance();

  let failures = 0;
  for (const sourceFile of files) {
    const relPath = path.relative(assetsDir, sourceFile);
    const outRel = relPath.replace(/\.[^.]+$/, ".svg");
    const outFile = path.join(outDir, outRel);

    const sourceMtime = fs.statSync(sourceFile).mtimeMs;
    const jarMtime = fs.statSync(vizPath).mtimeMs;
    if (fs.existsSync(outFile)) {
      const outMtime = fs.statSync(outFile).mtimeMs;
      if (outMtime >= sourceMtime && outMtime >= jarMtime) {
        continue; // up to date, skip
      }
    }

    const source = fs.readFileSync(sourceFile, "utf8");
    try {
      const svg = await viz.renderString(source, { format: "svg" });
      fs.mkdirSync(path.dirname(outFile), { recursive: true });
      const tmpFile = `${outFile}.tmp.${process.pid}`;
      fs.writeFileSync(tmpFile, svg);
      fs.renameSync(tmpFile, outFile);
      console.log(`[graphviz] render ${relPath} -> ${path.relative(siteDir, outFile)}`);
    } catch (error) {
      failures += 1;
      console.error(`[graphviz] render failed: ${relPath}: ${error.message}`);
    }
  }

  if (failures > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(`[graphviz] ${error.message}`);
  process.exit(1);
});
