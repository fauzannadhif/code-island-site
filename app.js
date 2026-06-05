// Code Island — marketing site interactions.

// ============================================================================
//  💳  CHECKOUT — paste your Stripe Payment Link below (e.g.
//      "https://buy.stripe.com/abc123"). Until it's set, the Buy buttons show a
//      reminder instead of navigating to a dead link.
// ============================================================================
const CHECKOUT_URL = "";

(function wireCheckout() {
  document.querySelectorAll(".buy").forEach((el) => {
    // Nav/hero buttons (href="#pricing") just scroll to the offer; only the real
    // checkout buttons (href="#") open Stripe.
    if (el.getAttribute("href") === "#pricing") return;
    if (CHECKOUT_URL) {
      el.setAttribute("href", CHECKOUT_URL);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    } else {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        alert(
          "Checkout isn't connected yet.\n\nAdd your Stripe Payment Link to CHECKOUT_URL at the top of app.js."
        );
      });
    }
  });
})();

// ---------- Starfield ----------
(function stars() {
  const field = document.getElementById("starfield");
  if (!field) return;
  const n = Math.min(70, Math.floor(window.innerWidth / 18));
  for (let i = 0; i < n; i++) {
    const s = document.createElement("i");
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 100 + "%";
    s.style.animationDelay = Math.random() * 4 + "s";
    const sz = Math.random() < 0.2 ? 3 : Math.random() < 0.5 ? 2 : 1;
    s.style.width = s.style.height = sz + "px";
    field.appendChild(s);
  }
})();

// ---------- Pixel crab mascot ----------
const PALETTE = {
  claude: "rgb(217,120,87)",
  thinking: "rgb(77,191,230)",
  idle: "rgb(115,199,115)",
  error: "rgb(230,89,77)",
  waitingPermission: "rgb(255,184,77)",
};
const ANIMATED = new Set(["thinking", "toolUse"]);
const LEG_OFFSETS = [
  [3, -3, 3, -3],
  [0, 0, 0, 0],
  [-3, 3, -3, 3],
  [0, 0, 0, 0],
];

function drawMascot(canvas, size, status, phase) {
  const color = PALETTE[status] || PALETTE.claude;
  const dpr = window.devicePixelRatio || 1;
  const ratio = 66 / 52;
  if (canvas.width !== size * ratio * dpr) {
    canvas.width = size * ratio * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size * ratio + "px";
    canvas.style.height = size + "px";
  }
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const scale = size / 52;
  const wCss = size * ratio;
  ctx.clearRect(0, 0, wCss, size);
  const xOff = (wCss - 66 * scale) / 2;
  const rect = (x, y, w, h, c) => {
    ctx.fillStyle = c;
    ctx.fillRect(xOff + x * scale, y * scale, w * scale, h * scale);
  };
  rect(0, 13, 6, 13, color); // antennae
  rect(60, 13, 6, 13, color);
  const offsets = ANIMATED.has(status) ? LEG_OFFSETS[phase % 4] : [0, 0, 0, 0];
  [6, 18, 42, 54].forEach((x, i) => rect(x, 39, 6, 13 + offsets[i], color));
  rect(6, 0, 54, 39, color); // body
  rect(12, 13, 6, 6.5, "#000"); // eyes
  rect(48, 13, 6, 6.5, "#000");
}

const mascots = [...document.querySelectorAll("canvas.mascot")].map((c) => ({
  el: c,
  size: parseInt(c.dataset.size || "16", 10),
  status: c.dataset.status || "claude",
}));
let phase = 0;
function renderMascots() {
  for (const m of mascots) drawMascot(m.el, m.size, m.status, phase);
}
renderMascots();
setInterval(() => {
  phase = (phase + 1) % 4;
  renderMascots();
}, 150);
window.addEventListener("resize", renderMascots);

// ---------- Island demo loop ----------
(function islandDemo() {
  const island = document.getElementById("island");
  if (!island) return;
  const sequence = [
    ["collapsed", 2600],
    ["expanded", 3400],
    ["permission", 4200],
    ["expanded", 1600],
  ];
  let i = 0;
  function tick() {
    const [state, hold] = sequence[i];
    island.dataset.state = state;
    i = (i + 1) % sequence.length;
    setTimeout(tick, hold);
  }
  // honor reduced-motion: just show the expanded panel
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    island.dataset.state = "expanded";
  } else {
    setTimeout(tick, 1200);
  }
})();

// ---------- Footer year ----------
const yEl = document.querySelector(".foot-fine");
if (yEl) yEl.innerHTML = yEl.innerHTML.replace("2026", new Date().getFullYear());
