/* ==========================================================================
   track.js — click-event instrumentation for Umami analytics.
   Additive only; site works fully without it. Sends named events for
   document downloads (CV, JMP, statements) and outbound links so the
   analytics dashboard shows WHAT visitors clicked, not just pages viewed.
   ========================================================================== */
(function () {
  "use strict";
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!a || !window.umami || typeof window.umami.track !== "function") return;
    var href = a.getAttribute("href") || "";
    var page = location.pathname;
    if (/\.pdf(\?|#|$)/i.test(href) || href.indexOf("/docs/") === 0) {
      var file = href.split("?")[0].split("#")[0].split("/").pop();
      window.umami.track("doc-click", { doc: file, page: page });
    } else if (/^https?:\/\//i.test(href) && a.host !== location.host) {
      window.umami.track("outbound", { url: a.host + a.pathname, page: page });
    }
  }, true);
})();
