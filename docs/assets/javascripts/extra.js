// NANDA Navigation & Header Controller
window.toggleNandaEcosystem = function(open) {
  var modal = document.getElementById("nandaEcosystemModal");
  if (!modal) return;
  if (open) {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    // Force layout reflow so the CSS transition begins from initial state
    void modal.offsetWidth;
    modal.classList.add("nanda-ecosystem-modal--visible");
    modal.setAttribute("aria-hidden", "false");
  } else {
    modal.classList.remove("nanda-ecosystem-modal--visible");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    setTimeout(function() {
      if (!modal.classList.contains("nanda-ecosystem-modal--visible")) {
        modal.style.display = "none";
      }
    }, 300);
  }
};

window._bayAreaSavedScrollY = null;
window._bayAreaOpenedInPage = false;

window.toggleBayAreaModal = function(open, shouldUpdateUrl) {
  if (typeof shouldUpdateUrl === "undefined") shouldUpdateUrl = true;
  var modal = document.getElementById("nandaBayAreaModal");
  if (!modal) return;

  var currentPath = window.location.pathname.replace(/\/$/, "");
  var isBayAreaUrl = currentPath.endsWith("/community/start-a-chapter/sf-bay-area");

  if (open) {
    // If opening from within the chapter page, save the exact scroll position
    if (!isBayAreaUrl) {
      window._bayAreaSavedScrollY = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
      window._bayAreaOpenedInPage = true;
    }

    modal.classList.add("nanda-bayarea-modal--open");
    document.body.style.overflow = "hidden";
    void modal.offsetWidth; // Force layout reflow
    modal.classList.add("nanda-bayarea-modal--visible");
    modal.setAttribute("aria-hidden", "false");

    if (shouldUpdateUrl && !isBayAreaUrl) {
      try {
        history.pushState({ bayAreaModal: true }, "", "/community/start-a-chapter/sf-bay-area/");
      } catch (e) {}
    }
  } else {
    modal.classList.remove("nanda-bayarea-modal--visible");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    setTimeout(function() {
      if (!modal.classList.contains("nanda-bayarea-modal--visible")) {
        modal.classList.remove("nanda-bayarea-modal--open");
      }
    }, 320);

    if (shouldUpdateUrl) {
      if (window._bayAreaOpenedInPage) {
        // Opened from within /community/start-a-chapter/
        // Use replaceState to change URL back without firing popstate / triggering Material instant page re-fetch
        try {
          history.replaceState(null, "", "/community/start-a-chapter/");
        } catch (e) {}

        // Restore scroll position so user never gets thrown to the top of the page
        if (typeof window._bayAreaSavedScrollY === "number") {
          var targetY = window._bayAreaSavedScrollY;
          window.scrollTo({ top: targetY, behavior: "instant" });
          requestAnimationFrame(function() {
            window.scrollTo({ top: targetY, behavior: "instant" });
          });
        }
      } else if (isBayAreaUrl) {
        // Direct cold load on /community/start-a-chapter/sf-bay-area/
        // Exit to the SF Bay Area chapter card on /community/start-a-chapter/
        window.location.href = "/community/start-a-chapter/#chapter-sf-bay-area";
      }
    } else {
      if (typeof window._bayAreaSavedScrollY === "number") {
        var targetY = window._bayAreaSavedScrollY;
        window.scrollTo({ top: targetY, behavior: "instant" });
        requestAnimationFrame(function() {
          window.scrollTo({ top: targetY, behavior: "instant" });
        });
      }
    }
  }
};

// Global Escape Key Listener
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape" || e.key === "Esc" || e.keyCode === 27) {
    if (typeof window.toggleNandaEcosystem === "function") {
      window.toggleNandaEcosystem(false);
    }
    if (typeof window.toggleBayAreaModal === "function") {
      var bayModal = document.getElementById("nandaBayAreaModal");
      if (bayModal && (bayModal.classList.contains("nanda-bayarea-modal--open") || bayModal.classList.contains("nanda-bayarea-modal--visible"))) {
        window.toggleBayAreaModal(false, true);
      }
    }
  }
});

// The exact official unclipped FontAwesome/Material Git Diamond Icon
const MATERIAL_GIT_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
  <path d="M439.55 236.05 244 40.45a28.87 28.87 0 0 0-40.81 0l-40.66 40.63 51.52 51.52c27.06-9.14 52.68 16.77 43.39 43.68l49.66 49.66c34.23-11.8 61.18 31 35.47 56.69-26.49 26.49-70.21-2.87-56-37.34L240.22 199v121.85c25.3 12.54 22.26 41.85 9.08 55a34.34 34.34 0 0 1-48.55 0c-17.57-17.6-11.07-46.91 11.25-56v-123c-20.8-8.51-24.6-30.74-18.64-45L142.57 101 8.45 235.14a28.86 28.86 0 0 0 0 40.81l195.61 195.6a28.86 28.86 0 0 0 40.8 0l194.69-194.69a28.86 28.86 0 0 0 0-40.81z"/>
</svg>`;

// Edge-to-edge zero-margin 100% full height viewBox="3 3 18 18"
const LINKEDIN_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="3 3 18 18" fill="currentColor">
  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 1.63 1.64c0-.9-.73-1.64-1.63-1.64Z"/>
</svg>`;

const STAR_ICON_SVG = `<svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
const FORK_ICON_SVG = `<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><path d="M18 9v3a6 6 0 0 1-6 6H9"/></svg>`;
const REPO_ICON_SVG = `<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>`;

const SITE_PAGES = [
  { path: "/", title: "Home", section: "" },
  { path: "/research/", title: "Overview", section: "Research" },
  { path: "/publication/", title: "Publications", section: "Research" },
  { path: "/publication/nanda-index/", title: "NANDA Index", section: "Research" },
  { path: "/publication/get-involved/", title: "Get Involved", section: "Research" },
  { path: "/projects/", title: "Overview", section: "Projects" },
  { path: "/community/", title: "Overview", section: "Community" },
  { path: "/community/start-a-chapter/", title: "Start a Chapter!", section: "Community" },
  { path: "/developer/open-source/", title: "Open Source", section: "Contribute" },
  { path: "/developer/hackathons/", title: "Hackathons", section: "Contribute" },
  { path: "/developer/fellowships/", title: "Fellowships", section: "Contribute" },
  { path: "/resources/faq/", title: "FAQ", section: "Resources" },
  { path: "/resources/talks-archive/", title: "Talks & Archive", section: "Resources" },
  { path: "/people/advisors/", title: "Advisors & Speakers", section: "People & Talent" },
  { path: "/people/team/", title: "Team", section: "People & Talent" },
  { path: "/about/project-nanda/", title: "Project NANDA", section: "About" }
];

function setupSidebarStructure() {
  document.querySelectorAll(".md-sidebar--primary .md-nav--primary").forEach(nav => {
    // Clean unwanted elements
    nav.querySelectorAll(".md-nav__source, > .md-nav__title, label.md-nav__title, .md-nav--secondary, .nanda-sidebar-footer, label[for='__toc']").forEach(el => el.remove());

    let header = nav.querySelector(".nanda-sidebar-header");
    if (!header) {
      // Fallback: create header if not already rendered by Jinja template
      const origLogo = nav.querySelector("a.md-logo, a[data-md-component='logo']");
      const logoHref = origLogo ? (origLogo.getAttribute("href") || ".") : ".";
      header = document.createElement("div");
      header.className = "nanda-sidebar-header";
      header.innerHTML = `
        <a href="${logoHref}" class="nanda-sidebar-logo" aria-label="Project NANDA Home" data-md-component="logo">
          <img src="assets/logo.svg" alt="Project NANDA" class="nanda-sidebar-logo-img">
        </a>
      `;
      nav.insertBefore(header, nav.firstChild);
    }

    const logoLink = header.querySelector(".nanda-sidebar-logo");
    if (logoLink) {
      logoLink.onclick = (e) => {
        // If drawer on mobile is open, close it
        const drawer = document.getElementById("__drawer");
        if (drawer && drawer.checked) {
          drawer.checked = false;
        }
        // Ensure default section state when returning to home
        saveOpenedSections(new Set(["Research"]));
      };
    }
  });
}

function getOpenedSections() {
  try {
    const raw = sessionStorage.getItem("nanda_opened_sections");
    if (raw) {
      return new Set(JSON.parse(raw));
    }
  } catch (e) {}
  return new Set(["Research"]); // Default Research is open
}

function saveOpenedSections(openedSet) {
  try {
    sessionStorage.setItem("nanda_opened_sections", JSON.stringify(Array.from(openedSet)));
  } catch (e) {}
}

function getSectionName(sectionItem) {
  const label = sectionItem.querySelector("> label.md-nav__link, > .md-nav__link");
  return label ? label.textContent.trim() : "";
}

function setupSidebarNavigation() {
  let isHomepage = false;
  let currentPath = window.location.pathname.replace(/\/index\.html$/, "/");
  if (!currentPath.endsWith("/")) {
    currentPath += "/";
  }
  if (currentPath === "/" || currentPath.endsWith("/site/")) {
    isHomepage = true;
  }

  const openedSections = getOpenedSections();
  const nestedSections = document.querySelectorAll(".md-nav--primary .md-nav__item--nested");

  nestedSections.forEach((section, index) => {
    const name = getSectionName(section);
    const activeChild = section.querySelector("a.md-nav__link--active, .md-nav__item--active");
    const toggle = section.querySelector("input.md-nav__toggle");

    if (activeChild && name) {
      openedSections.add(name);
    }
    if (isHomepage && index === 0 && name) {
      openedSections.add(name);
    }

    if (toggle) {
      // Multiple sections can be open simultaneously
      if (openedSections.has(name) || activeChild || (isHomepage && index === 0)) {
        toggle.checked = true;
      }

      // Track individual toggle checkbox state changes
      toggle.onchange = () => {
        if (toggle.checked) {
          openedSections.add(name);
        } else {
          openedSections.delete(name);
        }
        saveOpenedSections(openedSections);
      };
    }
  });

  saveOpenedSections(openedSections);

  // When clicking a top-level section header label, expand it without closing any other open sections
  document.querySelectorAll(".md-nav--primary > .md-nav__list > .md-nav__item--nested > label.md-nav__link").forEach(label => {
    label.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();

      const parentItem = label.closest(".md-nav__item--nested");
      if (!parentItem) return;

      const name = getSectionName(parentItem);
      if (name) {
        openedSections.add(name);
        saveOpenedSections(openedSections);
      }

      const toggle = parentItem.querySelector("input.md-nav__toggle");
      if (toggle) {
        toggle.checked = !toggle.checked;
        if (toggle.checked) {
          openedSections.add(name);
        } else {
          openedSections.delete(name);
        }
        saveOpenedSections(openedSections);
      }
    };
  });
}

// Previous / Next Page End Navigation
function setupPagePagination() {
  const contentWrapper = document.querySelector(".md-content .md-typeset");
  if (!contentWrapper) return;

  // Remove existing pagination if any
  document.querySelectorAll(".nanda-page-nav").forEach(el => el.remove());

  // Normalize path
  let currentPath = window.location.pathname.replace(/\/index\.html$/, "/");
  if (!currentPath.endsWith("/")) {
    currentPath += "/";
  }

  let currentIndex = SITE_PAGES.findIndex(p => p.path === currentPath);
  if (currentIndex === -1) {
    // fallback exact match
    currentIndex = SITE_PAGES.findIndex(p => window.location.pathname.includes(p.path) && p.path !== "/");
  }
  if (currentIndex === -1 && (currentPath === "/" || currentPath.endsWith("/site/"))) {
    currentIndex = 0;
  }

  if (currentIndex === -1) return;

  const prevPage = currentIndex > 0 ? SITE_PAGES[currentIndex - 1] : null;
  const nextPage = currentIndex < SITE_PAGES.length - 1 ? SITE_PAGES[currentIndex + 1] : null;

  if (!prevPage && !nextPage) return;

  const navEl = document.createElement("nav");
  navEl.className = "nanda-page-nav";
  navEl.setAttribute("aria-label", "Page navigation");

  const prevLabel = prevPage ? (prevPage.section ? `${prevPage.section} - ${prevPage.title}` : prevPage.title) : "";
  const nextLabel = nextPage ? (nextPage.section ? `${nextPage.section} - ${nextPage.title}` : nextPage.title) : "";

  navEl.innerHTML = `
    ${prevPage ? `
      <a href="${prevPage.path}" class="nanda-page-nav__link nanda-page-nav__link--prev" aria-label="Previous: ${prevLabel}">
        <span class="nanda-page-nav__direction">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Previous
        </span>
        <span class="nanda-page-nav__title">${prevLabel}</span>
      </a>
    ` : `<div class="nanda-page-nav__spacer"></div>`}

    ${nextPage ? `
      <a href="${nextPage.path}" class="nanda-page-nav__link nanda-page-nav__link--next" aria-label="Next: ${nextLabel}">
        <span class="nanda-page-nav__direction">
          Next
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </span>
        <span class="nanda-page-nav__title">${nextLabel}</span>
      </a>
    ` : `<div class="nanda-page-nav__spacer"></div>`}
  `;

  contentWrapper.appendChild(navEl);
}

// Header Actions: Optical & Physical Height Equality for LinkedIn and Git Diamond
function setupHeaderSocials() {
  const headerInner = document.querySelector(".md-header__inner");
  if (!headerInner) return;

  // Clean out standard header source to avoid default styling clashes
  let existingSource = headerInner.querySelector(".md-header__source");
  if (existingSource) {
    existingSource.remove();
  }

  let actionsContainer = headerInner.querySelector(".nanda-header-actions");
  if (!actionsContainer) {
    actionsContainer = document.createElement("div");
    actionsContainer.className = "nanda-header-actions";
    headerInner.appendChild(actionsContainer);
  }

  let stats = { stars: 279, forks: 352, count: 18 };
  try {
    const cachedStats = sessionStorage.getItem("nanda_gh_stats");
    if (cachedStats) {
      stats = JSON.parse(cachedStats);
    }
  } catch (e) {}

  actionsContainer.innerHTML = `
    <a href="https://www.linkedin.com/company/projectnanda/" target="_blank" rel="noopener noreferrer" class="nanda-header-linkedin" title="NANDA on LinkedIn" aria-label="LinkedIn">
      ${LINKEDIN_ICON_SVG}
    </a>
    <a href="https://github.com/projnanda" target="_blank" rel="noopener noreferrer" class="nanda-header-github" title="GitHub - projnanda" aria-label="GitHub">
      <div class="nanda-header-git-icon">
        ${MATERIAL_GIT_ICON_SVG}
      </div>
      <div class="nanda-header-git-text">
        <div class="nanda-header-git-title">projnanda</div>
        <ul class="nanda-header-git-facts nanda-header-git-facts--loaded">
          <li class="nanda-header-git-fact" title="Stars">${STAR_ICON_SVG} <span>${stats.stars}</span></li>
          <li class="nanda-header-git-fact" title="Forks">${FORK_ICON_SVG} <span>${stats.forks}</span></li>
          <li class="nanda-header-git-fact" title="Repositories">${REPO_ICON_SVG} <span>${stats.count} repos</span></li>
        </ul>
      </div>
    </a>
  `;

  // Fetch live stats in background and update
  if (!sessionStorage.getItem("nanda_gh_stats")) {
    fetch("https://api.github.com/users/projnanda/repos?sort=updated&per_page=100")
      .then(res => res.ok ? res.json() : null)
      .then(repos => {
        if (Array.isArray(repos)) {
          let totalStars = 0;
          let totalForks = 0;
          repos.forEach(r => {
            totalStars += (r.stargazers_count || 0);
            totalForks += (r.forks_count || 0);
          });
          const liveStats = { stars: totalStars, forks: totalForks, count: repos.length };
          sessionStorage.setItem("nanda_gh_stats", JSON.stringify(liveStats));
          const factsList = actionsContainer.querySelector(".nanda-header-git-facts");
          if (factsList) {
            factsList.innerHTML = `
              <li class="nanda-header-git-fact" title="Stars">${STAR_ICON_SVG} <span>${liveStats.stars}</span></li>
              <li class="nanda-header-git-fact" title="Forks">${FORK_ICON_SVG} <span>${liveStats.forks}</span></li>
              <li class="nanda-header-git-fact" title="Repositories">${REPO_ICON_SVG} <span>${liveStats.count} repos</span></li>
            `;
          }
        }
      })
      .catch(() => {});
  }
}

function setupScrollLockOnDrawer() {
  const drawerToggle = document.getElementById("__drawer");
  if (!drawerToggle) return;

  const updateScrollLock = () => {
    if (window.innerWidth < 1220) {
      if (drawerToggle.checked) {
        document.body.classList.add("nanda-drawer-open");
        document.documentElement.classList.add("nanda-drawer-open");
      } else {
        document.body.classList.remove("nanda-drawer-open");
        document.documentElement.classList.remove("nanda-drawer-open");
      }
    } else {
      document.body.classList.remove("nanda-drawer-open");
      document.documentElement.classList.remove("nanda-drawer-open");
    }
  };

  drawerToggle.addEventListener("change", updateScrollLock);
  window.addEventListener("resize", updateScrollLock);
}

function setupBackToTopButton() {
  let btn = document.getElementById("nandaBackToTop");
  if (!btn) {
    btn = document.createElement("button");
    btn.id = "nandaBackToTop";
    btn.className = "nanda-back-to-top";
    btn.setAttribute("aria-label", "Back to top");
    btn.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5 12 12 5 19 12"></polyline>
      </svg>
      <span>Back to top</span>
    `;
    document.body.appendChild(btn);

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const handleScroll = () => {
    if (window.scrollY > 250) {
      btn.classList.add("nanda-back-to-top--visible");
    } else {
      btn.classList.remove("nanda-back-to-top--visible");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

function isExternalLink(href, linkElement) {
  if (!href) return false;
  href = href.trim();
  if (href.startsWith("#") || href.startsWith("javascript:") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }
  // Relative links without scheme are always internal
  if (!/^(?:https?:)?\/\//i.test(href)) {
    return false;
  }
  try {
    const currentOrigin = window.location.origin.toLowerCase();
    const url = new URL(href, window.location.origin);
    const targetHost = url.hostname.toLowerCase();
    const targetOrigin = url.origin.toLowerCase();

    // Exact origin match (handles localhost, 127.0.0.1, pages.dev, projectnanda.org, etc.)
    if (targetOrigin === currentOrigin) {
      return false;
    }

    // Whitelist known internal production / development domains
    if (
      targetHost === "projectnanda.org" ||
      targetHost === "www.projectnanda.org" ||
      targetHost === "nanda.ai" ||
      targetHost === "www.nanda.ai" ||
      targetHost === "localhost" ||
      targetHost === "127.0.0.1"
    ) {
      return false;
    }

    // All other domains or external subdomains (like nest.projectnanda.org, nandatown.projectnanda.org, etc.) are external
    return true;
  } catch (e) {
    return false;
  }
}

function setupExternalLinks() {
  document.querySelectorAll("a").forEach(link => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("javascript:")) return;

    if (isExternalLink(href, link)) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
      if (link.textContent.includes("↗")) {
        link.classList.add("nanda-has-arrow");
      }
    } else {
      // Internal site link: ensure target="_blank" is never set
      if (link.getAttribute("target") === "_blank") {
        link.removeAttribute("target");
      }
      const rel = link.getAttribute("rel");
      if (rel === "noopener noreferrer" || rel === "noopener") {
        link.removeAttribute("rel");
      }
    }

    // Prevent double redirect icons: if link text node contains multiple ↗, clean it
    if (link.childNodes.length === 1 && link.childNodes[0].nodeType === 3) {
      if (/↗\s*↗+/.test(link.textContent)) {
        link.textContent = link.textContent.replace(/↗\s*↗+/g, "↗");
      }
    }
  });
}

// Global capture-phase click listener: ensures internal navigation stays in the same tab
document.addEventListener("click", function(e) {
  const link = e.target.closest("a");
  if (!link) return;
  const href = link.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("javascript:")) return;

  if (isExternalLink(href, link)) {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  } else {
    // Internal link: ensure target="_blank" is NOT present so it stays in the same tab
    if (link.getAttribute("target") === "_blank") {
      link.removeAttribute("target");
    }
  }
}, true);

function setupHeaderScrollFade() {
  const handleScroll = () => {
    const actions = document.querySelector(".nanda-header-actions");
    if (!actions) return;
    if (window.scrollY > 30) {
      actions.style.opacity = "0";
      actions.style.pointerEvents = "none";
      actions.style.transform = "translateY(-8px)";
    } else {
      actions.style.opacity = "1";
      actions.style.pointerEvents = "auto";
      actions.style.transform = "translateY(0)";
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

function setupEcosystemModal() {
  // Global delegated click listener ensures clicks always work regardless of navigation state
  if (window._nandaEcosystemInitialized) return;
  window._nandaEcosystemInitialized = true;

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("#nandaEcosystemTrigger");
    if (trigger) {
      e.preventDefault();
      const modal = document.getElementById("nandaEcosystemModal");
      if (modal) {
        modal.classList.add("nanda-ecosystem-modal--open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      }
      return;
    }

    const closeBtn = e.target.closest("#nandaEcosystemClose");
    const backdrop = e.target.closest("#nandaEcosystemBackdrop");
    if (closeBtn || backdrop) {
      e.preventDefault();
      const modal = document.getElementById("nandaEcosystemModal");
      if (modal) {
        modal.classList.remove("nanda-ecosystem-modal--open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      }
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const modal = document.getElementById("nandaEcosystemModal");
      if (modal && modal.classList.contains("nanda-ecosystem-modal--open")) {
        modal.classList.remove("nanda-ecosystem-modal--open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      }
    }
  });
}

function setupBayAreaModal() {
  var currentPath = window.location.pathname.replace(/\/$/, "");
  if (currentPath.endsWith("/community/start-a-chapter/sf-bay-area")) {
    window.toggleBayAreaModal(true, false);
  }

  if (window._nandaBayAreaInitialized) return;
  window._nandaBayAreaInitialized = true;

  document.addEventListener("click", function(e) {
    var trigger = e.target.closest(".nanda-chapter-btn--learn-more");
    if (trigger) {
      e.preventDefault();
      window.toggleBayAreaModal(true, true);
      return;
    }

    var closeBtn = e.target.closest("#nandaBayAreaClose");
    var backdrop = e.target.closest("#nandaBayAreaBackdrop");
    if (closeBtn || backdrop) {
      e.preventDefault();
      window.toggleBayAreaModal(false, true);
    }
  });

  window.addEventListener("popstate", function(e) {
    var modal = document.getElementById("nandaBayAreaModal");
    if (!modal) return;
    var path = window.location.pathname.replace(/\/$/, "");
    if (path.endsWith("/community/start-a-chapter/sf-bay-area")) {
      window.toggleBayAreaModal(true, false);
    } else {
      window.toggleBayAreaModal(false, false);
      if (typeof window._bayAreaSavedScrollY === "number") {
        var targetY = window._bayAreaSavedScrollY;
        window.scrollTo({ top: targetY, behavior: "instant" });
        requestAnimationFrame(function() {
          window.scrollTo({ top: targetY, behavior: "instant" });
        });
        setTimeout(function() {
          window.scrollTo({ top: targetY, behavior: "instant" });
        }, 60);
        setTimeout(function() {
          window.scrollTo({ top: targetY, behavior: "instant" });
        }, 180);
      }
    }
  });
}

function initNanda() {
  setupSidebarStructure();
  setupSidebarNavigation();
  setupPagePagination();
  setupHeaderSocials();
  setupScrollLockOnDrawer();
  setupBackToTopButton();
  setupExternalLinks();
  setupHeaderScrollFade();
  setupEcosystemModal();
  setupBayAreaModal();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNanda);
} else {
  initNanda();
}

if (typeof document$ !== "undefined") {
  document$.subscribe(initNanda);
}
