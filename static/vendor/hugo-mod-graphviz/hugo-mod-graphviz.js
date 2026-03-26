(() => {
  if (window.__hugoModGraphvizInit) return;
  window.__hugoModGraphvizInit = true;

  // Shortcodes pass source through base64 so Hugo does not mangle DOT content.
  const decodeBase64Utf8 = (value) => {
    const binary = window.atob(value || "");
    if (typeof TextDecoder !== "undefined") {
      const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
      return new TextDecoder("utf-8").decode(bytes);
    }

    let escaped = "";
    for (let index = 0; index < binary.length; index += 1) {
      escaped += `%${binary.charCodeAt(index).toString(16).padStart(2, "0")}`;
    }
    return decodeURIComponent(escaped);
  };

  const renderElement = async (element) => {
    if (element.dataset.rendered === "true" || typeof Viz === "undefined") return;

    const output = element.querySelector("[data-graphviz-output]");
    if (!output) return;

    try {
      const source = decodeBase64Utf8(element.dataset.source || "").trim();
      if (!source) {
        throw new Error("Graphviz source is empty");
      }

      const viz = await Viz.instance();
      if (typeof viz.renderSVGElement === "function") {
        try {
          const svg = await viz.renderSVGElement(source);
          output.innerHTML = svg.outerHTML;
        } catch (elementError) {
          // Some Viz runtimes expose the renderer but still fail DOM element output.
          const svg = await viz.renderString(source, { format: "svg" });
          output.innerHTML = svg;
          console.warn("hugo-mod-graphviz: renderSVGElement failed, used renderString fallback", elementError);
        }
      } else {
        const svg = await viz.renderString(source, { format: "svg" });
        output.innerHTML = svg;
      }
      output.classList.remove("is-error");
      element.dataset.rendered = "true";
    } catch (error) {
      output.textContent = error.message;
      output.classList.add("is-error");
    }
  };

  const renderAll = (root = document) => {
    root.querySelectorAll("[data-hugo-mod-graphviz]").forEach((element) => {
      renderElement(element);
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => renderAll(), { once: true });
  } else {
    renderAll();
  }

  window.HugoModGraphviz = { renderAll };
})();
