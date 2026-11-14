(() => {
  const carousels = [
    {
      selector: ".ps-panel-hse .ps-carousel",
      label: "Safety photos",
      images: [
        { src: "safety-induction.webp", alt: "MECPL workers taking part in a safety induction" },
        { src: "site-entry-verification.webp", alt: "MECPL worker completing a site-entry safety check" },
        { src: "work-at-height.webp", alt: "Worker using fall-protection equipment at height" },
        { src: "onsite-medical-exam.webp", alt: "Medical professional examining a MECPL worker" },
        { src: "worker-medical-care.webp", alt: "Medical professional providing care to a worker" },
        { src: "onsite-health-check.webp", alt: "Health professionals completing an on-site worker assessment" },
        { src: "fire-point.webp", alt: "Fire extinguisher and fire buckets at a site fire point" },
        { src: "fire-hose-reel.webp", alt: "Fire hose reel installed at a MECPL site" },
      ],
    },
    {
      selector: ".ps-panel-team .ps-carousel",
      label: "Team photos",
      images: [
        { src: "workforce-gathering.webp", alt: "MECPL workforce gathered for a team event" },
        { src: "team-recreation.webp", alt: "MECPL workers taking part in a team sport at camp" },
        { src: "worker-accommodation-exterior.webp", alt: "Exterior of a worker accommodation facility" },
        { src: "labour-camp-classroom.webp", alt: "Children attending a classroom lesson at the labour camp" },
        { src: "classroom-lesson.webp", alt: "A teacher leading a classroom lesson at the labour camp" },
        { src: "worker-living-area.webp", alt: "Shared worker living area with bunk beds" },
        { src: "award-team.webp", alt: "MECPL team receiving a CREDAI Pune Pride award" },
        { src: "award-trophy.webp", alt: "CREDAI Pune Pride Best Facility Gold Award trophy" },
      ],
    },
  ];
  const controllers = new Set();
  const styleId = "people-safety-carousel-sync-styles";

  function installStyles() {
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      #people-safety .ps-carousel {
        position: relative;
      }
      #people-safety .ps-carousel > :not(.ps-local-carousel) {
        display: none !important;
      }
      #people-safety .ps-local-carousel {
        position: absolute;
        z-index: 5;
        inset: 0;
        overflow: hidden;
        background: #232529;
      }
      #people-safety .ps-local-carousel .ps-carousel-image {
        position: absolute;
        z-index: 1;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover !important;
        object-position: center center !important;
        opacity: 0;
        transition: opacity 700ms ease;
      }
      #people-safety .ps-local-carousel .ps-carousel-image.is-active {
        opacity: 1;
      }
      #people-safety .ps-local-carousel .ps-carousel-controls {
        position: absolute;
        z-index: 2;
        right: 14px;
        bottom: 14px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        max-width: calc(100% - 28px);
        gap: 6px;
        padding: 6px 8px;
        background: transparent;
      }
      #people-safety .ps-local-carousel .ps-carousel-dots {
        display: flex;
        flex-wrap: wrap;
        gap: 2px;
      }
      #people-safety .ps-local-carousel .ps-carousel-dot {
        display: grid;
        place-items: center;
        width: 24px;
        height: 28px;
        padding: 0;
        border: 0;
        background: transparent;
        cursor: pointer;
      }
      #people-safety .ps-local-carousel .ps-carousel-dot::after {
        content: "";
        width: 6px;
        height: 6px;
        border: 1px solid rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        background: transparent;
        transition: width 180ms ease, background 180ms ease, border-color 180ms ease;
      }
      #people-safety .ps-local-carousel .ps-carousel-dot.is-active::after {
        width: 19px;
        border-radius: 10px;
        background: #ec3338;
        border-color: #ec3338;
      }
      #people-safety .ps-local-carousel .ps-carousel-dot:focus-visible {
        outline: 2px solid #ec3338;
        outline-offset: 4px;
      }
      @media (max-width: 800px) {
        #people-safety .ps-local-carousel .ps-carousel-controls {
          right: 12px;
          bottom: 12px;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        #people-safety .ps-local-carousel .ps-carousel-image,
        #people-safety .ps-local-carousel .ps-carousel-dot::after {
          transition: none;
        }
      }
    `;
    document.head.append(style);
  }

  function mountCarousel(host, config) {
    const overlay = document.createElement("div");
    overlay.className = "ps-local-carousel";
    overlay.dataset.peopleSafetyCarouselSync = "true";

    const imageNodes = config.images.map((image, index) => {
      const node = document.createElement("img");
      node.src = `/assets/people-safety/${image.src}`;
      node.alt = image.alt;
      node.className = `ps-carousel-image${index === 0 ? " is-active" : ""}`;
      node.loading = index === 0 ? "eager" : "lazy";
      node.setAttribute("aria-hidden", index === 0 ? "false" : "true");
      overlay.append(node);
      return node;
    });

    const controls = document.createElement("div");
    controls.className = "ps-carousel-controls";
    const dots = document.createElement("div");
    dots.className = "ps-carousel-dots";
    dots.setAttribute("role", "group");
    dots.setAttribute("aria-label", `${config.label} navigation`);

    let activeIndex = 0;
    let hovered = false;
    let focused = false;
    let timeoutId;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dotNodes = config.images.map((image, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `ps-carousel-dot${index === 0 ? " is-active" : ""}`;
      button.setAttribute("aria-label", `Show image ${index + 1} of ${config.images.length}`);
      if (index === 0) button.setAttribute("aria-current", "true");
      button.addEventListener("click", () => {
        activeIndex = index;
        render();
        schedule();
      });
      dots.append(button);
      return button;
    });
    controls.append(dots);
    overlay.append(controls);

    const announcement = document.createElement("span");
    announcement.className = "sr-only";
    announcement.setAttribute("aria-live", "off");
    announcement.setAttribute("aria-atomic", "true");
    overlay.append(announcement);
    host.append(overlay);

    function isStopped() {
      return motionPreference.matches || hovered || focused;
    }

    function render() {
      imageNodes.forEach((image, index) => {
        const isActive = index === activeIndex;
        image.classList.toggle("is-active", isActive);
        image.setAttribute("aria-hidden", isActive ? "false" : "true");
      });
      dotNodes.forEach((dot, index) => {
        const isActive = index === activeIndex;
        dot.classList.toggle("is-active", isActive);
        if (isActive) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
      announcement.setAttribute("aria-live", isStopped() ? "polite" : "off");
      announcement.textContent = `Photo ${activeIndex + 1} of ${config.images.length}: ${config.images[activeIndex].alt}`;
    }

    function schedule() {
      window.clearTimeout(timeoutId);
      if (isStopped() || config.images.length < 2 || !overlay.isConnected) return;
      timeoutId = window.setTimeout(() => {
        activeIndex = (activeIndex + 1) % config.images.length;
        render();
        schedule();
      }, 4000);
    }

    const onPointerEnter = (event) => {
      if (event.pointerType === "mouse" || event.pointerType === "pen") {
        hovered = true;
        render();
        schedule();
      }
    };
    const onPointerLeave = () => {
      hovered = false;
      render();
      schedule();
    };
    const onFocusIn = () => {
      focused = true;
      render();
      schedule();
    };
    const onFocusOut = (event) => {
      if (!overlay.contains(event.relatedTarget)) {
        focused = false;
        render();
        schedule();
      }
    };
    const onMotionChange = () => {
      render();
      schedule();
    };

    overlay.addEventListener("pointerenter", onPointerEnter);
    overlay.addEventListener("pointerleave", onPointerLeave);
    overlay.addEventListener("focusin", onFocusIn);
    overlay.addEventListener("focusout", onFocusOut);
    motionPreference.addEventListener("change", onMotionChange);

    render();
    schedule();

    return {
      host,
      destroy() {
        window.clearTimeout(timeoutId);
        motionPreference.removeEventListener("change", onMotionChange);
        overlay.removeEventListener("pointerenter", onPointerEnter);
        overlay.removeEventListener("pointerleave", onPointerLeave);
        overlay.removeEventListener("focusin", onFocusIn);
        overlay.removeEventListener("focusout", onFocusOut);
      },
    };
  }

  function sync() {
    for (const controller of controllers) {
      if (!controller.host.isConnected) {
        controller.destroy();
        controllers.delete(controller);
      }
    }

    const section = document.querySelector("#people-safety");
    if (!section) return;
    installStyles();

    for (const config of carousels) {
      const host = section.querySelector(config.selector);
      if (!host || host.querySelector(":scope > .ps-local-carousel")) continue;
      controllers.add(mountCarousel(host, config));
    }
  }

  const observer = new MutationObserver(sync);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  sync();

  window.addEventListener("pagehide", () => {
    observer.disconnect();
    for (const controller of controllers) controller.destroy();
    controllers.clear();
  }, { once: true });
})();
