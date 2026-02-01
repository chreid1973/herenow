// HereNow extension stub.
// This should only run on https://3holepunchmedia.ca/herenow/chat*
// Keep it inert unless/until we add explicit per-session consent UI.
console.debug("[HereNow] content script loaded on chat page");

(() => {
  // Only runs on /herenow/chat* by manifest match.
  // This script must be inert except for showing consent UI.

  const FLAG = "__HERENOW_SESSION_ENABLED__";

  // If already enabled in this tab (page refreshed after enabling), do nothing.
  if (window[FLAG]) return;

  // Build overlay
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position:fixed; inset:0; z-index:2147483647;
    display:flex; align-items:center; justify-content:center;
    background:rgba(0,0,0,.55);
    font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  `;

  const card = document.createElement("div");
  card.style.cssText = `
    width:min(520px, calc(100% - 32px));
    background:#0b1220; color:#e5e7eb;
    border:1px solid rgba(255,255,255,.12);
    border-radius:16px; padding:18px 18px 14px;
    box-shadow:0 20px 60px rgba(0,0,0,.45);
  `;

  card.innerHTML = `
    <div style="font-size:16px; font-weight:700; margin-bottom:6px;">Enable chat for this session?</div>
    <div style="font-size:13px; line-height:1.35; color:rgba(229,231,235,.8); margin-bottom:14px;">
      This tab will connect only after you enable. Closing the tab ends the session.
    </div>
    <div style="display:flex; gap:10px; justify-content:flex-end;">
      <button id="hnCancel" style="padding:8px 12px; border-radius:10px; border:1px solid rgba(255,255,255,.14); background:transparent; color:#e5e7eb; cursor:pointer;">
        Cancel
      </button>
      <button id="hnEnable" style="padding:8px 12px; border-radius:10px; border:1px solid rgba(125,211,252,.35); background:rgba(14,165,233,.18); color:#e5e7eb; cursor:pointer;">
        Enable
      </button>
    </div>
  `;

  overlay.appendChild(card);
  document.documentElement.appendChild(overlay);

  const cleanup = () => overlay.remove();

  card.querySelector("#hnCancel").addEventListener("click", () => {
    cleanup();
    // Explicit NO: do not message page, do not set flag.
  });

  card.querySelector("#hnEnable").addEventListener("click", () => {
    window[FLAG] = true; // per-tab, memory-only
    window.postMessage({ source: "herenow-extension", type: "enable-session" }, "*");
    cleanup();
  });
})();
