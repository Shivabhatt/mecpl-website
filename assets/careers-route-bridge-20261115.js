(() => {
  const normalize = (pathname) => pathname.replace(/\/+$/, "") || "/";
  const isCareersPath = (pathname) => {
    const path = normalize(pathname);
    return path === "/careers" || path === "/careers.html";
  };
  const currentIsCareers = isCareersPath(window.location.pathname);

  document.addEventListener(
    "click",
    (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const anchor = event.target.closest("a[href]");
      if (!anchor || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) {
        return;
      }

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) return;

      const destinationIsCareers = isCareersPath(destination.pathname);
      if (currentIsCareers === destinationIsCareers) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      window.location.assign(destination.href);
    },
    true,
  );
})();
