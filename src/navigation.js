export function initNavigation() {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const commandPalette = document.querySelector(".command-palette");
  const commandInput = document.querySelector(".command-palette input");
  const commandTrigger = document.querySelector("[data-command-trigger]");

  const closeMobileMenu = () => {
    menuToggle?.classList.remove("open");
    mobileNav?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  };

  const closePalette = () => {
    commandPalette?.classList.remove("open");
    commandPalette?.setAttribute("aria-hidden", "true");
  };

  const openPalette = () => {
    commandPalette?.classList.add("open");
    commandPalette?.setAttribute("aria-hidden", "false");
    commandInput?.focus();
  };

  commandTrigger?.addEventListener("click", openPalette);

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("open");
    mobileNav?.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      closeMobileMenu();
      closePalette();
    });
  });

  document.addEventListener("keydown", event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openPalette();
    }
    if (event.key === "Escape") {
      closeMobileMenu();
      closePalette();
    }
  });

  commandPalette?.addEventListener("click", event => {
    if (event.target === commandPalette) closePalette();
  });

  document.querySelectorAll(".command-item").forEach(item => {
    item.addEventListener("click", () => {
      const target = document.querySelector(item.dataset.target);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      closePalette();
    });
  });

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".navbar nav a");
  const spyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(section => spyObserver.observe(section));
}
