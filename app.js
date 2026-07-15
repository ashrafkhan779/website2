const legacyRoutes = {
  "#home": "index.html",
  "#capabilities": "products.html",
  "#products": "products.html",
  "#services": "services.html",
  "#quality": "quality.html",
  "#contact": "contact.html"
};

if ((location.pathname.endsWith("/") || location.pathname.endsWith("index.html")) && legacyRoutes[location.hash]) {
  location.replace(legacyRoutes[location.hash]);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));

document.querySelectorAll(".visual-stack, .media-panel").forEach((panel) => {
  panel.addEventListener("pointermove", (event) => {
    const box = panel.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    panel.style.setProperty("--tilt-x", `${(-y * 5).toFixed(2)}deg`);
    panel.style.setProperty("--tilt-y", `${(x * 7).toFixed(2)}deg`);
  });
  panel.addEventListener("pointerleave", () => {
    panel.style.setProperty("--tilt-x", "0deg");
    panel.style.setProperty("--tilt-y", "0deg");
  });
});

document.querySelectorAll(".media-panel").forEach((panel) => {
  panel.style.transform = "perspective(900px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))";
});
