(() => {
  const selector = 'article.ps-panel-hse .ps-carousel img.ps-carousel-image[alt="Fire hose reel installed at a MECPL site"]';
  const previousPath = "/assets/people-safety/hse-fire-hose-reel-full-no-watermark.jpg";
  const nextPath = "/assets/people-safety/fire-hose-reel.webp";

  function replace(image) {
    if (image.nodeType !== Node.ELEMENT_NODE || !image.matches(selector)) return;
    if (image.src.endsWith(previousPath)) image.src = nextPath;
  }

  function scan(root) {
    replace(root);
    root.querySelectorAll?.(selector).forEach(replace);
  }

  const observer = new MutationObserver((records) => {
    for (const record of records) {
      if (record.type === "attributes") replace(record.target);
      else for (const node of record.addedNodes) scan(node);
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["src"],
    childList: true,
    subtree: true,
  });
  scan(document);
})();
