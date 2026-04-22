const reveals = document.querySelectorAll(".reveal");
const signalValues = document.querySelectorAll("[data-count]");
const copyButton = document.querySelector("#copy-install");
const installCommand = document.querySelector("#install-command");
const ambients = document.querySelectorAll(".ambient");
const navToggle = document.querySelector("#nav-toggle");
const topbar = document.querySelector(".topbar");
const navLinks = document.querySelectorAll(".topnav a");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  },
);

reveals.forEach((element) => revealObserver.observe(element));

const countUp = (node) => {
  const target = Number(node.dataset.count || "0");
  const duration = 1200;
  const start = performance.now();

  const tick = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    node.textContent = String(Math.max(1, Math.round(target * eased)));

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

signalValues.forEach((node) => countUp(node));

if (copyButton && installCommand) {
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(installCommand.textContent.trim());
      const original = copyButton.textContent;
      copyButton.textContent = "Copied";
      window.setTimeout(() => {
        copyButton.textContent = original;
      }, 1800);
    } catch (_error) {
      copyButton.textContent = "Copy failed";
      window.setTimeout(() => {
        copyButton.textContent = "Copy Install Command";
      }, 1800);
    }
  });
}

const closeNav = () => {
  if (!topbar || !navToggle) return;
  topbar.classList.remove("nav-open");
  document.body.classList.remove("nav-open");
  navToggle.setAttribute("aria-expanded", "false");
};

if (navToggle && topbar) {
  navToggle.addEventListener("click", () => {
    const isOpen = topbar.classList.toggle("nav-open");
    document.body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 920) {
      closeNav();
    }
  });
}

let pointerFrame = null;
let pointerX = 0;
let pointerY = 0;

const renderAmbientMotion = () => {
  pointerFrame = null;
  const x = (pointerX / window.innerWidth - 0.5) * 24;
  const y = (pointerY / window.innerHeight - 0.5) * 24;

  ambients.forEach((ambient, index) => {
    const multiplier = (index + 1) * 0.55;
    ambient.style.transform = `translate3d(${x * multiplier}px, ${y * multiplier}px, 0)`;
  });
};

if (!prefersReducedMotion.matches) {
  window.addEventListener("pointermove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;

    if (!pointerFrame) {
      pointerFrame = window.requestAnimationFrame(renderAmbientMotion);
    }
  });
}
