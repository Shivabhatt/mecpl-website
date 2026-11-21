const installStyles = () => {
  if (document.getElementById("footer-home-trust-styles")) return;
  const link = document.createElement("link");
  link.id = "footer-home-trust-styles";
  link.rel = "stylesheet";
  link.href = "/assets/footer-home-trust-20261110.css";
  document.head.append(link);
};

const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

const enhanceFooter = () => {
  const footer = document.querySelector("footer.home-site-footer");
  if (!footer || footer.dataset.footerRedesign === "true") return;

  const main = footer.querySelector(".home-footer-main");
  const grid = main?.querySelector(".home-footer-grid");
  const brand = grid?.querySelector(".home-footer-brand");
  const contact = grid?.querySelector(".home-footer-contact");
  const affiliations = grid?.querySelector(".home-footer-affiliations");
  const group = grid?.querySelector(".home-footer-group");
  const copy = brand?.querySelector(".home-footer-copy");
  const social = brand?.querySelector(".home-footer-social");
  if (!main || !grid || !brand || !contact || !affiliations || !group || !copy || !social) return;

  const oldCompany = copy.querySelector(".home-footer-full-company");
  const oldTagline = copy.querySelector(".home-footer-tagline");
  if (oldCompany) oldCompany.remove();
  if (oldTagline) oldTagline.remove();

  const trust = createElement("h3", "home-footer-trust-heading");
  const firstLine = createElement("span", "home-footer-trust-line");
  firstLine.append(
    createElement("span", "home-footer-trust-rank", "No. 1"),
    createElement("span", "home-footer-trust-emphasis", "Trusted"),
  );
  const secondLine = createElement("span", "home-footer-trust-line home-footer-trust-line--secondary");
  secondLine.append(
    createElement("span", "home-footer-trust-descriptor", "Contractor"),
    createElement("span", "home-footer-trust-location", "in Pune"),
  );
  trust.append(firstLine, secondLine);
  copy.append(trust);
  brand.setAttribute("aria-label", "MECPL, No. 1 Trusted Contractor in Pune");

  const band = createElement("div", "home-footer-band");
  const cta = createElement("div", "home-footer-cta");
  const ctaText = createElement("div", "home-footer-cta-text");
  ctaText.append(
    createElement("strong", "", "Have a project in mind?"),
    createElement("span", "", "Let’s build it together."),
  );
  const ctaButton = createElement("button", "home-footer-cta-button");
  ctaButton.type = "button";
  ctaButton.setAttribute("data-testid", "button-footer-enquire");
  ctaButton.append(document.createTextNode("Enquire Now "), createElement("span", "", "→"));
  ctaButton.addEventListener("click", () => {
    document.querySelector(".navbar-enquire-button, [data-testid='button-contact-nav']")?.click();
  });
  cta.append(ctaText, ctaButton);
  band.append(brand, cta);
  main.insertBefore(band, grid);

  const quickLinks = createElement("section", "home-footer-column home-footer-quick-links");
  quickLinks.setAttribute("aria-labelledby", "home-footer-navigation-title");
  const quickLinksHeading = createElement("div", "home-footer-heading", "Quick Links");
  quickLinksHeading.id = "home-footer-navigation-title";
  quickLinks.append(quickLinksHeading);
  const nav = createElement("nav", "home-footer-navigation");
  nav.setAttribute("aria-label", "Footer navigation");
  [
    ["HOME", "/"],
    ["ABOUT US", "/about"],
    ["PROJECTS", "/projects"],
    ["CERTIFICATIONS", "/certifications"],
    ["AWARDS", "/awards"],
    ["CAREERS", "/careers"],
  ].forEach(([label, href]) => {
    const link = createElement("a", "home-footer-navigation-link", label);
    link.href = href;
    nav.append(link);
  });
  quickLinks.append(nav);

  social.classList.add("home-footer-social--band");
  const groupHeading = group.querySelector(".home-footer-heading");
  if (groupHeading) {
    const followHeading = createElement("div", "home-footer-heading home-footer-follow-heading", "Follow Us");
    group.append(followHeading, social);
  }

  grid.replaceChildren(quickLinks, contact, affiliations, group);
  footer.dataset.footerRedesign = "true";
};

installStyles();
const applyUpdates = () => {
  enhanceFooter();
};
applyUpdates();
const observer = new MutationObserver(applyUpdates);
observer.observe(document.documentElement, { childList: true, subtree: true });
