/* ==========================================================================
   explorer.js — JMP deep-dive interactivity (loaded only on the JMP page).
   Enhances static, already-readable content:
     #decomp-static  -> interactive gap-decomposition explorer
     #talk-static    -> click-through slide viewer
   With JS off, the static versions remain fully readable. Rule-outs use
   native <details> and need no JS at all.
   ========================================================================== */
(function () {
  "use strict";
  if (!window.JMP) return;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var J = window.JMP;

  /* ---------------- decomposition explorer ---------------- */
  var dHost = document.getElementById("decomp-interactive");
  var dStatic = document.getElementById("decomp-static");
  if (dHost) {
    var steps = J.decomp;
    var rawResidual = steps[0].residual;

    var stepsHtml = steps.map(function (s, i) {
      return '<button class="dstep" data-i="' + i + '" aria-pressed="' + (i === 0 ? "true" : "false") + '">' +
               '<span class="dk">' + s.key + '</span>' +
               '<span class="dv">' + s.label + ' gap</span>' +
             '</button>';
    }).join("");

    dHost.innerHTML =
      '<div class="decomp">' +
        '<div class="bar-track"><div class="bar-fill" id="dbar"><span class="pct" id="dpct"></span></div></div>' +
        '<div class="bar-cap">How big the view gap still is</div>' +
        '<div class="decomp-steps">' + stepsHtml + '</div>' +
        '<div class="decomp-controls">' +
          '<button class="btn btn-line btn-sm" id="dprev">&larr; Back</button>' +
          '<button class="btn btn-ink btn-sm" id="dplay">Play it through</button>' +
          '<button class="btn btn-line btn-sm" id="dnext">Next &rarr;</button>' +
        '</div>' +
        '<div class="decomp-readout" id="dread"></div>' +
      '</div>';

    var bar = document.getElementById("dbar");
    var pct = document.getElementById("dpct");
    var read = document.getElementById("dread");
    var stepEls = Array.prototype.slice.call(dHost.querySelectorAll(".dstep"));
    var cur = 0, playing = null;

    function render(i) {
      cur = i;
      var s = steps[i];
      var w = Math.max((s.residual / rawResidual) * 100, 4);
      bar.style.width = w + "%";
      bar.style.background = s.punch ? "linear-gradient(90deg,var(--green),#5b9c79)" : "linear-gradient(90deg,var(--lava),#ff5a2b)";
      pct.textContent = s.label;
      stepEls.forEach(function (b, j) { b.setAttribute("aria-pressed", j === i ? "true" : "false"); });
      read.innerHTML =
        '<div class="explains" style="color:' + (s.punch ? "var(--green)" : "var(--lava)") + '">' +
          (i === 0 ? "Starting point" : "After accounting for " + s.factor) + '</div>' +
        '<div class="big">' + s.explains + '</div>' +
        '<div style="font-size:15px;color:var(--ink-soft)">' + s.sub + '</div>';
    }
    function go(i) {
      if (i < 0 || i >= steps.length) return;
      stopPlay(); render(i);
    }
    function stopPlay() { if (playing) { clearInterval(playing); playing = null; document.getElementById("dplay").textContent = "Play it through"; } }

    stepEls.forEach(function (b) { b.addEventListener("click", function () { go(+b.getAttribute("data-i")); }); });
    document.getElementById("dprev").addEventListener("click", function () { go(cur - 1); });
    document.getElementById("dnext").addEventListener("click", function () { go(cur + 1); });
    document.getElementById("dplay").addEventListener("click", function () {
      if (playing) { stopPlay(); return; }
      if (cur >= steps.length - 1) cur = -1;
      document.getElementById("dplay").textContent = "Pause";
      playing = setInterval(function () {
        if (cur >= steps.length - 1) { stopPlay(); return; }
        render(cur + 1);
      }, reduce ? 400 : 1400);
    });

    render(0);
    if (dStatic) { dStatic.setAttribute("hidden", ""); }

    /* autoplay the decomposition once, the first time it scrolls into view,
       so a visitor sees the gap collapse without clicking. Manual controls
       still work. Skipped under prefers-reduced-motion. */
    if (!reduce && "IntersectionObserver" in window) {
      var autoPlayed = false;
      var pio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && !autoPlayed) {
            autoPlayed = true;
            pio.unobserve(e.target);
            if (!playing) { document.getElementById("dplay").click(); }
          }
        });
      }, { threshold: 0.4 });
      pio.observe(dHost);
    }
  }

  /* ---------------- talk slide viewer ---------------- */
  var tHost = document.getElementById("talk-interactive");
  var tStatic = document.getElementById("talk-static");
  if (tHost && J.talk) {
    var slides = J.talk;
    var slidesHtml = slides.map(function (s, i) {
      var inner = s.html ? s.html : "<p>" + s.body + "</p>";
      return '<div class="slide' + (i === 0 ? " active" : "") + '" data-s="' + i + '" role="group" aria-label="Slide ' + (i + 1) + '">' +
               '<div class="sn">' + s.sn + '</div>' +
               '<h3>' + s.h + '</h3>' + inner +
             '</div>';
    }).join("");
    var dotsHtml = slides.map(function (s, i) {
      return '<button class="' + (i === 0 ? "on" : "") + '" data-d="' + i + '" aria-label="Go to slide ' + (i + 1) + '"></button>';
    }).join("");

    tHost.innerHTML =
      '<div class="talk">' +
        '<div class="slide-stage" id="stage">' + slidesHtml + '</div>' +
        '<div class="slide-controls">' +
          '<button class="btn btn-line btn-sm" id="sprev" style="border-color:rgba(255,255,255,.3);color:#fff">&larr;</button>' +
          '<div class="slide-dots" id="sdots">' + dotsHtml + '</div>' +
          '<span class="slide-count" id="scount">1 / ' + slides.length + '</span>' +
          '<button class="btn btn-line btn-sm" id="snext" style="border-color:rgba(255,255,255,.3);color:#fff">&rarr;</button>' +
        '</div>' +
      '</div>';

    var slideEls = Array.prototype.slice.call(tHost.querySelectorAll(".slide"));
    var dotEls = Array.prototype.slice.call(tHost.querySelectorAll("#sdots button"));
    var scount = document.getElementById("scount");
    var si = 0;
    function show(i) {
      si = (i + slides.length) % slides.length;
      slideEls.forEach(function (el, j) { el.classList.toggle("active", j === si); });
      dotEls.forEach(function (el, j) { el.classList.toggle("on", j === si); });
      scount.textContent = (si + 1) + " / " + slides.length;
    }
    document.getElementById("sprev").addEventListener("click", function () { show(si - 1); });
    document.getElementById("snext").addEventListener("click", function () { show(si + 1); });
    dotEls.forEach(function (b) { b.addEventListener("click", function () { show(+b.getAttribute("data-d")); }); });
    tHost.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") show(si + 1);
      if (e.key === "ArrowLeft") show(si - 1);
    });
    tHost.setAttribute("tabindex", "0");
    // swipe
    var x0 = null;
    document.getElementById("stage").addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    document.getElementById("stage").addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) show(si + (dx < 0 ? 1 : -1));
      x0 = null;
    });

    if (tStatic) tStatic.setAttribute("hidden", "");
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
      function cshow(i) {
        ci = Math.min(Math.max(i, 0), cImgs.length - 1);
        cImgs.forEach(function (im, j) {
          if (j === ci) { im.classList.add("on"); im.removeAttribute("loading"); }
          else { im.classList.remove("on"); }
        });
        ccount.textContent = "Slide " + (ci + 1) + " of " + cImgs.length;
      }
      document.getElementById("cprev").addEventListener("click", function () { cshow(ci - 1); });
      document.getElementById("cnext").addEventListener("click", function () { cshow(ci + 1); });
      cImgs.forEach(function (im) { im.addEventListener("click", function () { cshow(ci + 1); }); });
      // swipe
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
