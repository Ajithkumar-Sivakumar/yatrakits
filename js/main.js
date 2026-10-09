(() => {
  "use strict";

  const fallbackConfig = { business: {}, products: [], contentsCategories: [], galleryImages: [], faqs: [] };
  const config = window.YATRA_KITS_CONFIG || fallbackConfig;
  const business = config.business || {};
  const products = Array.isArray(config.products) ? config.products : [];
  const whatsappNumber = String(business.whatsappNumber || "").replace(/\D/g, "");
  const hasWhatsApp = /^\d{8,15}$/.test(whatsappNumber);
  const email = String(business.email || "").trim();
  const phone = String(business.phone || "").trim();
  const productGrid = document.querySelector("#product-grid");
  const galleryGrid = document.querySelector("#gallery-grid");
  const productDialog = document.querySelector("#product-dialog");
  const imageDialog = document.querySelector("#image-dialog");
  let lastDialogTrigger = null;
  let toastTimer;

  const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
  const safeURL = (value) => {
    try {
      const url = new URL(String(value), window.location.href);
      return ["http:", "https:"].includes(url.protocol) ? url.href : "";
    } catch {
      return "";
    }
  };
  const whatsappURL = (message) => hasWhatsApp
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    : "";
  const showToast = (message) => {
    const toast = document.querySelector(".toast");
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
  };
  const fillText = (selector, value, fallback) => {
    document.querySelectorAll(selector).forEach((node) => {
      node.textContent = value || fallback;
    });
  };
  const imageMarkup = (src, alt, className = "") => `
    <span class="media-frame ${escapeHTML(className)}" data-image-frame>
      <img src="${escapeHTML(src || "")}" alt="${escapeHTML(alt || "")}" loading="lazy" width="800" height="800" data-fallback-image>
      <span class="image-fallback generic-fallback" aria-hidden="true"><span class="fallback-symbol">✳</span><span>Photograph coming soon</span></span>
    </span>`;

  function renderProducts() {
    if (!productGrid) return;
    if (!products.length) {
      productGrid.innerHTML = '<p class="empty-state">Kit options will be added here soon. Please contact us for current information.</p>';
      return;
    }
    productGrid.innerHTML = products.map((product, index) => {
      const priceText = product.price ? escapeHTML(product.price) : "Contact us for pricing";
      const enquireHref = whatsappURL(`Hello, I would like to enquire about the ${product.name || "Yatra Kit"}.`);
      return `<article class="product-card">
        <button class="product-image-button" type="button" data-view-product="${escapeHTML(product.id || "")}" aria-label="View details for ${escapeHTML(product.name || "Yatra Kit")}">
          ${imageMarkup(product.image, product.imageAlt || product.name, "product-media")}
          <span class="product-count">0${index + 1}</span><span class="image-open-hint">View kit <span aria-hidden="true">↗</span></span>
        </button>
        <div class="product-card-body"><div class="product-card-heading"><h3>${escapeHTML(product.name || "Yatra Kit")}</h3><span class="product-price">${priceText}</span></div>
          <p>${escapeHTML(product.description || "Details will be confirmed directly with the business.")}</p>
          <div class="availability"><span class="availability-dot" aria-hidden="true"></span>${escapeHTML(product.availability || "Availability to be confirmed")}</div>
          <div class="product-actions"><button class="button button-outline" type="button" data-view-product="${escapeHTML(product.id || "")}">View Details</button><a class="product-enquire-link" href="${enquireHref || "#contact"}" ${hasWhatsApp ? 'target="_blank" rel="noopener noreferrer"' : ""}>Enquire about this kit <span aria-hidden="true">↗</span></a></div>
        </div>
      </article>`;
    }).join("");
    attachImageFallbacks(productGrid);
  }

  function renderContents() {
    const list = document.querySelector("#contents-list");
    const categories = Array.isArray(config.contentsCategories) ? config.contentsCategories : [];
    if (list) {
      list.innerHTML = categories.length ? categories.map((item, index) => `<article class="contents-item"><span>0${index + 1}</span><div><h3>${escapeHTML(item.title || "Travel consideration")}</h3><p>${escapeHTML(item.text || "Ask us about this part of your journey.")}</p></div></article>`).join("") : '<p>Ask us about what may suit your journey.</p>';
    }
    fillText("[data-contents-note]", config.contentsNote, "Kit contents may vary by package. Please confirm the included items before enquiring.");
  }

  function renderGallery() {
    if (!galleryGrid) return;
    const images = Array.isArray(config.galleryImages) ? config.galleryImages : [];
    if (!images.length) {
      galleryGrid.innerHTML = '<p class="empty-state">Product photographs will be added here by the owner.</p>';
      return;
    }
    galleryGrid.innerHTML = images.map((image, index) => `<button class="gallery-item" type="button" data-gallery-index="${index}" aria-label="View larger: ${escapeHTML(image.alt || image.caption || "Product photograph")}">${imageMarkup(image.src, image.alt || image.caption, "gallery-media")}<span class="gallery-caption">${escapeHTML(image.caption || "Yatra Kits")}</span><span class="gallery-zoom" aria-hidden="true">↗</span></button>`).join("");
    attachImageFallbacks(galleryGrid);
  }

  function renderFAQs() {
    const list = document.querySelector("#faq-list");
    const faqs = Array.isArray(config.faqs) ? config.faqs : [];
    if (!list) return;
    list.innerHTML = faqs.length ? faqs.map((item, index) => `<details class="faq-item"><summary><span class="faq-index">0${index + 1}</span><span>${escapeHTML(item.question || "Question")}</span><span class="faq-toggle" aria-hidden="true"></span></summary><div class="faq-answer"><p>${escapeHTML(item.answer || "Please contact us for details.")}</p></div></details>`).join("") : '<p class="empty-state">Frequently asked questions will be added soon.</p>';
  }

  function attachImageFallbacks(root = document) {
    root.querySelectorAll("img[data-fallback-image]").forEach((image) => {
      const fail = () => image.closest("[data-image-frame]")?.classList.add("has-fallback");
      image.addEventListener("error", fail, { once: true });
      if (image.complete && image.naturalWidth === 0) fail();
    });
  }

  function configureBusinessDetails() {
    fillText("[data-business-name]", business.name, "Yatra Kits");
    fillText("[data-tagline]", business.tagline, "Everything You Need for a Peaceful Yatra.");
    fillText("[data-company-intro]", business.introduction, "[Add your company introduction here.]");
    fillText("[data-company-story]", business.story, "[Add why the business was started here.]");
    fillText("[data-company-mission]", business.mission, "[Add your mission here.]");
    fillText("[data-company-values]", business.values, "[Add the values that guide your work here.]");
    fillText("[data-company-team]", business.team, "[Add a founder or team introduction here.]");
    fillText("[data-service-location], [data-contact-location]", business.serviceLocation, "[Add your service area]");
    document.title = `${business.name || "Yatra Kits"} | ${business.tagline || "Everything You Need for a Peaceful Yatra."}`;

    document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
      const url = whatsappURL(link.dataset.message || "Hello, I would like to enquire about Yatra Kits.");
      if (url) {
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.hidden = false;
      }
    });
    document.querySelectorAll("[data-whatsapp-fallback]").forEach((link) => { link.hidden = hasWhatsApp; });
    document.querySelectorAll("[data-contact-display=whatsapp]").forEach((link) => {
      if (hasWhatsApp) {
        link.textContent = business.whatsappNumber;
        link.href = whatsappURL("Hello, I would like to enquire about Yatra Kits.");
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.hidden = false;
      }
    });
    document.querySelectorAll("[data-copy=whatsapp]").forEach((button) => { button.hidden = !hasWhatsApp; });

    if (email) {
      document.querySelectorAll("[data-email-link]").forEach((link) => { link.href = `mailto:${encodeURIComponent(email)}`; link.hidden = false; });
      document.querySelectorAll("[data-contact-display=email]").forEach((link) => { link.textContent = email; link.href = `mailto:${encodeURIComponent(email)}`; link.hidden = false; });
      document.querySelectorAll("[data-copy=email]").forEach((button) => { button.hidden = false; });
      document.querySelectorAll("[data-footer-email]").forEach((link) => { link.href = `mailto:${encodeURIComponent(email)}`; link.hidden = false; });
      document.querySelector("[data-mailto-note]")?.removeAttribute("hidden");
    }
    if (phone) {
      document.querySelectorAll("[data-phone-link]").forEach((link) => { link.href = `tel:${phone.replace(/[^+\d]/g, "")}`; link.hidden = false; });
      document.querySelectorAll("[data-contact-display=phone]").forEach((link) => { link.textContent = phone; link.href = `tel:${phone.replace(/[^+\d]/g, "")}`; link.hidden = false; });
      document.querySelectorAll("[data-copy=phone]").forEach((button) => { button.hidden = false; });
    }
    document.querySelectorAll("[data-footer-whatsapp]").forEach((link) => {
      if (hasWhatsApp) { link.href = whatsappURL("Hello, I would like to enquire about Yatra Kits."); link.target = "_blank"; link.rel = "noopener noreferrer"; link.hidden = false; }
    });

    const contactSetup = document.querySelector("[data-contact-setup]");
    if (!hasWhatsApp && !email && !phone && contactSetup) {
      contactSetup.textContent = config.developmentMode
        ? "Contact details are not configured yet. Add your WhatsApp number, email or phone in js/config.js to enable enquiries."
        : "Contact details will be added here soon.";
      contactSetup.hidden = false;
    }
    renderSocialLinks();
  }

  function renderSocialLinks() {
    const container = document.querySelector("[data-social-links]");
    if (!container) return;
    const links = Object.entries(business.socialLinks || {}).map(([name, value]) => ({ name, href: safeURL(value) })).filter((item) => item.href);
    container.innerHTML = links.map((item) => `<a href="${escapeHTML(item.href)}" target="_blank" rel="noopener noreferrer">${escapeHTML(item.name)}</a>`).join("");
  }

  function openProduct(productId, trigger) {
    const product = products.find((item) => String(item.id) === String(productId));
    if (!product || !productDialog) return;
    lastDialogTrigger = trigger;
    const contents = Array.isArray(product.contents) ? product.contents : [];
    const price = product.price ? escapeHTML(product.price) : "Contact us for pricing";
    const message = `Hello, I would like to enquire about the ${product.name || "Yatra Kit"}.`;
    const href = whatsappURL(message);
    document.querySelector("#dialog-content").innerHTML = `<div class="dialog-image">${imageMarkup(product.image, product.imageAlt || product.name, "dialog-media")}</div><div class="dialog-copy"><p class="eyebrow"><span></span> ${escapeHTML(product.availability || "Availability to be confirmed")}</p><h2 id="dialog-title">${escapeHTML(product.name || "Yatra Kit")}</h2><p class="dialog-description">${escapeHTML(product.description || "Details will be confirmed directly with the business.")}</p><div class="dialog-fact"><h3>Intended for</h3><p>${escapeHTML(product.intendedUse || "Please contact us to discuss who this kit may suit.")}</p></div><div class="dialog-fact"><h3>Contents to discuss</h3><ul>${contents.length ? contents.map((item) => `<li>${escapeHTML(item)}</li>`).join("") : "<li>Confirm the contents directly with the business.</li>"}</ul></div><p class="dialog-price">${price}</p><a class="button button-dark" href="${href || "#contact"}" ${href ? 'target="_blank" rel="noopener noreferrer"' : "data-unconfigured-enquiry"}>Enquire about this kit <span aria-hidden="true">↗</span></a></div>`;
    attachImageFallbacks(document.querySelector("#dialog-content"));
    productDialog.showModal();
  }

  function openGalleryImage(index, trigger) {
    const image = (Array.isArray(config.galleryImages) ? config.galleryImages : [])[index];
    if (!image || !imageDialog) return;
    lastDialogTrigger = trigger;
    const expanded = document.querySelector("#expanded-image");
    expanded.src = image.src || "";
    expanded.alt = image.alt || image.caption || "Yatra Kits product photograph";
    expanded.classList.remove("is-missing");
    expanded.onerror = () => expanded.classList.add("is-missing");
    document.querySelector("#expanded-caption").textContent = image.caption || "Yatra Kits";
    imageDialog.classList.remove("image-unavailable");
    imageDialog.showModal();
  }

  function setupNavigation() {
    const toggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".primary-navigation");
    const setMenu = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
      document.body.classList.toggle("menu-open", open);
    };
    toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      if (imageDialog?.open) {
        event.preventDefault();
        imageDialog.close();
      } else if (productDialog?.open) {
        event.preventDefault();
        productDialog.close();
      } else if (toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
      }
    });
  }

  function setupInteractions() {
    productGrid?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-view-product]");
      if (button) openProduct(button.dataset.viewProduct, button);
    });
    productGrid?.addEventListener("click", (event) => {
      const anchor = event.target.closest(".product-enquire-link");
      if (!hasWhatsApp && anchor) {
        showToast("Add a WhatsApp number in js/config.js to enable direct kit enquiries.");
      }
    });
    galleryGrid?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-gallery-index]");
      if (button) openGalleryImage(Number(button.dataset.galleryIndex), button);
    });

    document.querySelectorAll(".detail-dialog, .image-dialog").forEach((dialog) => {
      dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
      dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
      dialog.addEventListener("close", () => {
        if (lastDialogTrigger?.isConnected) lastDialogTrigger.focus();
      });
    });
    productDialog?.addEventListener("click", (event) => {
      if (event.target.closest("[data-unconfigured-enquiry]")) {
        productDialog.close();
        showToast("Configure WhatsApp, email or phone details in js/config.js to receive enquiries.");
      }
    });
    document.querySelectorAll("[data-copy]").forEach((button) => {
      button.addEventListener("click", async () => {
        const value = button.dataset.copy === "whatsapp" ? business.whatsappNumber : button.dataset.copy === "email" ? email : phone;
        try {
          await navigator.clipboard.writeText(value);
          showToast(`${button.dataset.copy === "email" ? "Email" : "Contact detail"} copied.`);
        } catch {
          showToast("Copy is unavailable in this browser. Select the contact detail to copy it.");
        }
      });
    });
  }

  function initialize() {
    renderProducts();
    renderContents();
    renderGallery();
    renderFAQs();
    configureBusinessDetails();
    setupNavigation();
    setupInteractions();
    attachImageFallbacks();
    document.querySelector("#copyright-year").textContent = new Date().getFullYear();
  }

  initialize();
})();
