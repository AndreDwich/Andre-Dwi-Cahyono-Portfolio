const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initMotion() {
  const revealItems = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -5%" });

  revealItems.forEach((element, index) => {
    const siblingIndex = element.parentElement ? [...element.parentElement.children].indexOf(element) : index;
    element.style.setProperty("--reveal-delay", `${Math.min(siblingIndex, 5) * 70}ms`);
    if (prefersReducedMotion) element.classList.add("show");
    else revealObserver.observe(element);
  });

  const progressBar = document.querySelector(".scroll-progress span");
  const navbar = document.querySelector(".navbar");
  const heroVisual = document.querySelector(".hero-visual");
  const grid = document.querySelector(".bg-grid");
  let scrollFrame;

  const updateScrollState = () => {
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = documentHeight > 0 ? Math.min(scrollTop / documentHeight, 1) : 0;

    progressBar?.style.setProperty("transform", `scaleX(${progress})`);
    navbar?.classList.toggle("scrolled", scrollTop > 24);
    if (!prefersReducedMotion) {
      heroVisual?.style.setProperty("--parallax-y", `${Math.min(scrollTop * -0.08, 0)}px`);
      grid?.style.setProperty("--grid-shift", `${scrollTop * 0.08}px`);
    }
    scrollFrame = undefined;
  };

  const requestScrollUpdate = () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollState);
  };

  window.addEventListener("scroll", requestScrollUpdate, { passive: true });
  updateScrollState();
}
