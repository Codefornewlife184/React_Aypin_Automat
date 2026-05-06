let overlay;
function ensureOverlay() {
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "8px";
    overlay.style.left = "50%";
    overlay.style.transform = "translateX(-50%)";
    overlay.style.maxWidth = "90%";
    overlay.style.padding = "10px 12px";
    overlay.style.fontFamily = "system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
    overlay.style.background = "#fee2e2";
    overlay.style.color = "#7f1d1d";
    overlay.style.border = "1px solid #fca5a5";
    overlay.style.borderRadius = "10px";
    overlay.style.zIndex = "99999";
    overlay.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
    overlay.style.display = "none";
    document.body.appendChild(overlay);
  }
}
function show(msg) {
  ensureOverlay();
  overlay.textContent = msg;
  overlay.style.display = "block";
}
export function initErrorOverlay() {
  window.addEventListener("error", (e) => {
    show("Hata: " + (e && e.message ? e.message : "bilinmiyor"));
  });
  window.addEventListener("unhandledrejection", (e) => {
    const m = e && e.reason ? (e.reason.message || String(e.reason)) : "bilinmiyor";
    show("Hata: " + m);
  });
}
