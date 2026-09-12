// Reveal elements once, with a small stagger inside each content group.
const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add("show");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.14, rootMargin: "0px 0px -5%" });

revealItems.forEach((element, index) => {
  const group = element.parentElement;
  const groupIndex = group ? [...group.children].indexOf(element) : index;
  element.style.setProperty("--reveal-delay", `${Math.min(groupIndex, 5) * 70}ms`);
  revealObserver.observe(element);
});

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      closeMobileMenu();
    }
  });
});

// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

function closeMobileMenu() {
  menuToggle?.classList.remove("open");
  mobileNav?.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.classList.toggle("open");
  mobileNav.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeMobileMenu();
});

document.addEventListener("click", event => {
  if (!mobileNav?.classList.contains("open")) return;
  if (!mobileNav.contains(event.target) && !menuToggle?.contains(event.target)) closeMobileMenu();
});

// Scroll progress and decorative motion share one animation frame.
const progressBar = document.querySelector(".scroll-progress span");
const navbar = document.querySelector(".navbar");
const heroVisual = document.querySelector(".hero-visual");
const grid = document.querySelector(".bg-grid");
let scrollFrame;

function updateScrollState() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

  if (progressBar) progressBar.style.transform = `scaleX(${progress})`;
  navbar?.classList.toggle("scrolled", scrollTop > 24);
  heroVisual?.style.setProperty("--parallax-y", `${Math.min(scrollTop * -0.08, 0)}px`);
  grid?.style.setProperty("--grid-shift", `${scrollTop * 0.08}px`);
  scrollFrame = undefined;
}

function requestScrollUpdate() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollState);
}

window.addEventListener("scroll", requestScrollUpdate, { passive: true });
updateScrollState();

// Active nav link on scroll (scroll-spy)
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".navbar nav a");

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });

sections.forEach(section => spyObserver.observe(section));
