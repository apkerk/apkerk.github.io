/* ==========================================================================
   explorer.js — JMP deep-dive interactivity (loaded only on the JMP page).
   Enhances static, already-readable content:
     #decomp-static  -> decomposition bar chart (share of the 20% gap
                        accounted for by each block, grouped by family)
     #campdeck       -> click-through slide viewer (only if the section is
                        present in the page)
   With JS off, the static list remains fully readable. Rule-outs use
   native <details> and need no JS at all.
   Pre-refresh version (ladder explorer + talk viewer):
   _archive/pre-2026-09-28-refresh/assets/js/explorer.js
   ========================================================================== */
(function () {
  "use strict";
  if (!window.JMP) return;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var J = window.JMP;

  /* ---------------- decomposition bars ---------------- */
  var dHost = document.getElementById("decomp-interactive");
  var dStatic = document.getElementById("decomp-static");
  var D = J.decomp;
  if (dHost && D && Array.isArray(D.families)) {
    var span = D.max - D.min;
    var pos = function (v) { return ((v - D.min) / span) * 100; };
    var zero = pos(0);
    var fmt = function (v) {
      var s = Math.abs(v).toFixed(1) + "%";
      return (v < 0 ? "−" : "+") + s;
    };
    var esc = function (s) {
      return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    };

    var grid = D.ticks.map(function (t) {
      return '<i class="db-grid' + (t === 0 ? " db-zero" : "") + '" style="left:' + pos(t) + '%"></i>';
    }).join("");

    var html = '<div class="dbars">';
    D.families.forEach(function (fam) {
      html += '<div class="db-fam">' +
                '<div class="db-famh">' + esc(fam.name) + '</div>' +
                '<p class="db-famcap">' + esc(fam.caption) + '</p>';
      fam.items.forEach(function (it) {
        /* anchor every bar at zero so it grows outward in the right direction */
        var anchor = it.share < 0 ? "right:" + (100 - zero) + "%" : "left:" + zero + "%";
        var width = Math.abs(pos(it.share) - zero);
        var cls = it.sig ? "db-bar sig" : "db-bar ns";
        html += '<div class="db-row">' +
                  '<div class="db-lab">' + esc(it.label) + '</div>' +
                  '<div class="db-track" aria-hidden="true">' + grid +
                    '<span class="' + cls + '" data-w="' + width + '" style="' + anchor + ';width:' + (reduce ? width : 0) + '%"></span>' +
                  '</div>' +
                  '<div class="db-val">' + fmt(it.share) + (it.sig ? "" : ' <span class="db-ns">n.s.</span>') + '</div>' +
                '</div>';
      });
      html += '</div>';
    });
    var ticks = D.ticks.map(function (t) {
      return '<span style="left:' + pos(t) + '%">' + (t < 0 ? "−" + Math.abs(t) : t) + '</span>';
    }).join("");
    html += '<div class="db-row db-axisrow" aria-hidden="true"><div class="db-lab"></div><div class="db-ticks">' + ticks + '</div><div class="db-val"></div></div>' +
            '<div class="db-axis">' + esc(D.axis) + '</div>' +
            '<div class="db-key"><span><i class="k sig"></i>Significant at the .05 level</span><span><i class="k ns"></i>n.s. = not statistically distinguishable from zero</span></div>' +
          '</div>';

    dHost.innerHTML = html;
    if (dStatic) dStatic.setAttribute("hidden", "");

    var bars = Array.prototype.slice.call(dHost.querySelectorAll(".db-bar"));
    var grow = function () { bars.forEach(function (b) { b.style.width = b.getAttribute("data-w") + "%"; }); };
    if (reduce || !("IntersectionObserver" in window)) {
      grow();
    } else {
      var bio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { grow(); bio.disconnect(); }
        });
      }, { threshold: 0.25 });
      bio.observe(dHost);
    }
  }

  /* ---------------- research camp slide click-through ---------------- */
  var cd = document.getElementById("campdeck");
  if (cd) {
    var cImgs = Array.prototype.slice.call(cd.querySelectorAll("img"));
    if (cImgs.length > 1) {
      cd.classList.add("is-viewer");
      var controls = document.createElement("div");
      controls.className = "campdeck-controls";
      controls.innerHTML =
        '<button class="btn btn-line btn-sm" id="cprev">&larr; Back</button>' +
        '<button class="btn btn-ink btn-sm" id="cnext">Next &rarr;</button>' +
        '<span class="campdeck-count" id="ccount"></span>';
      cd.parentNode.insertBefore(controls, cd.nextSibling);
      var ci = 0;
      var ccount = document.getElementById("ccount");
      var cshow = function (i) {
        ci = Math.min(Math.max(i, 0), cImgs.length - 1);
        cImgs.forEach(function (im, j) {
          if (j === ci) { im.classList.add("on"); im.removeAttribute("loading"); }
          else { im.classList.remove("on"); }
        });
        ccount.textContent = "Slide " + (ci + 1) + " of " + cImgs.length;
      };
      document.getElementById("cprev").addEventListener("click", function () { cshow(ci - 1); });
      document.getElementById("cnext").addEventListener("click", function () { cshow(ci + 1); });
      cImgs.forEach(function (im) { im.addEventListener("click", function () { cshow(ci + 1); }); });
      var cx0 = null;
      cd.addEventListener("touchstart", function (e) { cx0 = e.touches[0].clientX; }, { passive: true });
      cd.addEventListener("touchend", function (e) {
        if (cx0 === null) return;
        var dx = e.changedTouches[0].clientX - cx0;
        if (Math.abs(dx) > 40) cshow(ci + (dx < 0 ? 1 : -1));
        cx0 = null;
      });
      cshow(0);
    }
  }
})();
