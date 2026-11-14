(() => {
  const gallery = [
    { img: "award-gallery-13.webp", title: "BAI", caption: "Well Built Structure Competition" },
    { img: "award-gallery-14.webp", title: "BAI", caption: "Award presentation" },
    { img: "award-gallery-15.webp", title: "BAI", caption: "Well Built Structure recognition" },
    { img: "award-gallery-16.webp", title: "MECPL Team", caption: "Team recognition" },
    { img: "award-gallery-17.webp", title: "MECPL Team", caption: "Award ceremony" },
    { img: "award-gallery-18.webp", title: "MECPL Team", caption: "Award presentation" },
    { img: "award-gallery-19.webp", title: "India SME 100", caption: "SME Excellence Award" },
    { img: "award-gallery-20.webp", title: "MECPL Team", caption: "Recognition ceremony" },
    { img: "award-gallery-21.webp", title: "MECPL Team", caption: "Award ceremony" },
    { img: "award-gallery-22.webp", title: "PCERF", caption: "Construction Safety Award" },
  ];
  const photoBase = "/assets/awards/";
  const half = Math.floor(gallery.length / 2);
  let ribbon = null;
  let ribbonObserver = null;
  let dialogObserver = null;
  let resizeObserver = null;
  let lastActive = 0;
  let previousActive = 0;
  let hasActive = false;

  const setAttribute = (element, name, value) => {
    if (value === null || value === undefined) {
      if (element.hasAttribute(name)) element.removeAttribute(name);
    } else if (element.getAttribute(name) !== String(value)) {
      element.setAttribute(name, String(value));
    }
  };

  const offsetFor = (index, active) => {
    const raw = (index - active + gallery.length) % gallery.length;
    return raw > half ? raw - gallery.length : raw;
  };

  function syncDialog(activeIndex) {
    const dialog = document.querySelector(".aw-spotlight__lightbox");
    if (!dialog) return;

    const photo = gallery[activeIndex];
    const label = `${photo.title} ${photo.caption}`;
    const title = dialog.querySelector(".aw-spotlight__lightbox-top span");
    const image = dialog.querySelector(".aw-spotlight__lightbox-image img");
    const count = dialog.querySelector(".aw-spotlight__lightbox-bottom");

    setAttribute(dialog, "aria-label", label);

    if (title && title.textContent !== `${photo.title} — ${photo.caption}`) {
      const dash = title.querySelector("i") || document.createElement("i");
      dash.textContent = "—";
      title.replaceChildren(
        document.createTextNode(`${photo.title} `),
        dash,
        document.createTextNode(` ${photo.caption}`),
      );
    }

    if (image) {
      setAttribute(image, "src", `${photoBase}${photo.img}`);
      setAttribute(image, "alt", `${photo.title} — ${photo.caption}`);
    }

    if (count) {
      const value = `${String(activeIndex + 1).padStart(2, "0")} / ${String(gallery.length).padStart(2, "0")}`;
      if (count.textContent !== value) count.textContent = value;
    }
  }

  function sync() {
    if (!ribbon?.isConnected) return;
    const stage = ribbon.querySelector(".aw-ribbon__stage");
    if (!stage) return;

    const buttons = [...stage.querySelectorAll(".aw-ribbon__item")];
    if (buttons.length !== gallery.length) return;

    const foundActive = buttons.findIndex((button) => button.dataset.active === "true");
    const activeIndex = foundActive < 0 ? 0 : foundActive;
    if (!hasActive) {
      lastActive = activeIndex;
      previousActive = activeIndex;
      hasActive = true;
    } else if (activeIndex !== lastActive) {
      previousActive = lastActive;
      lastActive = activeIndex;
    }

    const stageWidth = stage.clientWidth || ribbon.clientWidth || window.innerWidth;
    const mobile = stageWidth < 640;
    const scale = Math.max(0.5, Math.min(stageWidth, 1360) / 1360);
    const gap = Math.round((mobile ? 10 : 22) * Math.max(scale, 0.7));
    const photoAspect = 1550 / 1080;
    const sideWidth = Math.min(stageWidth * 0.155, (stageWidth * 0.88 - gap * 4) / 5.3);
    const sizeFor = (offset) => {
      const width = mobile
        ? offset === 0
          ? Math.min(150, stageWidth * 0.38)
          : Math.min(94, stageWidth * 0.24)
        : offset === 0
          ? sideWidth * 1.5
          : sideWidth;
      const cardChrome = mobile ? 53 : 50;
      return { width, height: (width - 14) / photoAspect + cardChrome };
    };

    const offsets = gallery.map((_, index) => offsetFor(index, activeIndex));
    const previousOffsets = gallery.map((_, index) => offsetFor(index, previousActive));
    const byOffset = new Map(offsets.map((offset, index) => [offset, { offset, ...sizeFor(offset) }]));
    const centers = new Map([[0, 0]]);
    const push = ribbon.dataset.focus === "true" ? 0 : gap;

    for (let offset = 1; offset <= half; offset += 1) {
      const previous = byOffset.get(offset - 1);
      const current = byOffset.get(offset);
      if (previous && current) {
        centers.set(offset, centers.get(offset - 1) + previous.width / 2 + (offset === 1 ? push : gap) + current.width / 2);
      }

      const previousNegative = byOffset.get(-(offset - 1));
      const currentNegative = byOffset.get(-offset);
      if (previousNegative && currentNegative) {
        centers.set(-offset, centers.get(-(offset - 1)) - previousNegative.width / 2 - (offset === 1 ? push : gap) - currentNegative.width / 2);
      }
    }

    const activeSize = sizeFor(0);
    stage.style.height = `${activeSize.height + (mobile ? 32 : 42)}px`;
    setAttribute(stage, "aria-label", `Photo ${activeIndex + 1} of ${gallery.length}`);

    buttons.forEach((button, index) => {
      const photo = gallery[index];
      const offset = offsets[index];
      const previousOffset = previousOffsets[index];
      const isActive = offset === 0;
      const edge = Math.abs(offset) > (mobile ? 1 : 2);
      const size = sizeFor(offset);
      const center = centers.get(offset) ?? 0;

      setAttribute(button, "data-active", isActive ? "true" : null);
      setAttribute(button, "data-edge", edge ? "true" : null);
      setAttribute(button, "data-wrapping", Math.abs(offset - previousOffset) > half ? "true" : null);
      setAttribute(button, "aria-current", isActive ? "true" : null);
      setAttribute(
        button,
        "aria-label",
        isActive && ribbon.dataset.focus === "true"
          ? `View full image: ${photo.title}, ${photo.caption}`
          : `Focus photo ${index + 1}: ${photo.title}, ${photo.caption}`,
      );
      setAttribute(button, "data-testid", `button-award-gallery-photo-${index + 1}`);
      button.tabIndex = isActive ? 0 : -1;
      button.style.width = `${size.width}px`;
      button.style.height = `${size.height}px`;
      button.style.transform = `translate3d(${center - size.width / 2}px, -50%, 0)`;
      button.style.setProperty("padding", "6px", "important");

      const image = button.querySelector("img");
      if (image) {
        setAttribute(image, "src", `${photoBase}${photo.img}`);
        setAttribute(image, "alt", isActive ? `${photo.title} — ${photo.caption}` : "");
        setAttribute(image, "loading", Math.abs(offset) <= 2 ? "eager" : "lazy");
        setAttribute(image, "draggable", "false");
        image.style.objectFit = "cover";
      }

      const cardTitle = button.querySelector(".aw-ribbon__card-copy strong");
      const cardCaption = button.querySelector(".aw-ribbon__card-copy span");
      if (cardTitle && cardTitle.textContent !== photo.title) cardTitle.textContent = photo.title;
      if (cardCaption && cardCaption.textContent !== photo.caption) cardCaption.textContent = photo.caption;
    });

    syncDialog(activeIndex);
  }

  function detach() {
    ribbonObserver?.disconnect();
    dialogObserver?.disconnect();
    resizeObserver?.disconnect();
    ribbonObserver = null;
    dialogObserver = null;
    resizeObserver = null;
    ribbon = null;
    hasActive = false;
  }

  function connect() {
    const nextRibbon = document.querySelector(".aw-ribbon");
    if (nextRibbon === ribbon) return;
    detach();
    if (!nextRibbon) return;

    ribbon = nextRibbon;
    lastActive = 0;
    previousActive = 0;
    sync();

    ribbonObserver = new MutationObserver(sync);
    ribbonObserver.observe(ribbon, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["style", "data-active", "data-focus"],
    });

    const stage = ribbon.querySelector(".aw-ribbon__stage");
    if (stage && "ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(sync);
      resizeObserver.observe(stage);
    }

    const dialog = document.querySelector(".aw-spotlight__lightbox");
    if (dialog) {
      dialogObserver = new MutationObserver(sync);
      dialogObserver.observe(dialog, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["open", "src", "aria-label"],
      });
    }
  }

  const routeObserver = new MutationObserver(connect);
  routeObserver.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("resize", sync);
  connect();
})();
