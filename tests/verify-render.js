// Verifies, in a real headless browser, that the shortcode's runtime
// actually renders — not just that Hugo emitted the right HTML/script tags
// (which is all the shell-based CI assertions can check).
"use strict";

const path = require("path");
const { chromium } = require("playwright");
const { serve } = require("./serve.js");

const PORT = 4173;

async function main() {
  const publicDir = process.argv[2];
  const pagePath = process.argv[3] || "test/";
  if (!publicDir) {
    console.error("usage: node verify-render.js <public-dir> [page-path]");
    process.exit(1);
  }

  const server = await serve(path.resolve(publicDir), PORT);
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    const errors = [];
    const failedRequests = [];
    page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
    page.on("requestfailed", (req) => failedRequests.push(req.url()));

    await page.goto(`http://127.0.0.1:${PORT}/${pagePath}`);
    // Rendering is lazy (IntersectionObserver, 200px margin); the test page
    // is short, so the wrapper is already within range on load, but scroll
    // it into view explicitly to not depend on the default viewport size.
    await page.locator("[data-hugo-mod-graphviz]").first().scrollIntoViewIfNeeded();
    await page.waitForSelector('[data-hugo-mod-graphviz][data-rendered="true"]', { timeout: 15000 });

    const svgCount = await page.locator("[data-hugo-mod-graphviz] svg").count();
    const errorClassCount = await page.locator(".is-error").count();

    if (errors.length > 0) {
      console.error("FAIL: page errors:", errors);
      process.exit(1);
    }
    if (failedRequests.length > 0) {
      console.error("FAIL: failed network requests:", failedRequests);
      process.exit(1);
    }
    if (svgCount < 1) {
      console.error("FAIL: no <svg> rendered inside the graphviz wrapper");
      process.exit(1);
    }
    if (errorClassCount > 0) {
      console.error("FAIL: an .is-error wrapper is present");
      process.exit(1);
    }

    console.log(`PASS: ${svgCount} graph(s) rendered to real <svg> via the wasm runtime, no errors, no failed requests`);
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
