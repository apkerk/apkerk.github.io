/* ==========================================================================
   home-decomp.js: homepage mini decomposition bar (loaded on index only).
   Reads window.JMP.decomp (from jmp-data.js) and animates the view gap
   collapsing from the raw ~33% down to the final "≈ 0" resting state on
   scroll-into-view. Static with JS off (mount stays empty; the stat column
   still carries the numbers). Respects prefers-reduced-motion.
   ========================================================================== */
(function () {
  "use strict";
  var mount = document.getElementById("home-decomp");
  if (!mount || !window.JMP || !Array.isArray(window.JMP.decomp)) return;

  var steps = window.JMP.decomp;
  if (!steps.length) return;
  var raw = steps[0].residual;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var COLLAPSE_CAP = "The gap collapses to about zero once audience comment tone and heat enter the model.";

  mount.innerHTML =
    '<span class="hd-kicker">How the view gap disappears</span>' +
    '<div class="bar-track"><div class="bar-fill" id="home-bar"><span class="pct" id="home-pct"></span></div></div>' +
    '<div class="hd-cap" id="home-cap"></div>';

  var bar = document.getElementById("home-bar");
  var pct = document.getElementById("home-pct");
  var cap = document.getElementById("home-cap");

  function paint(i) {
    var s = steps[i];
    var w = Math.max((s.residual / raw) * 100, 4);
    bar.style.width = w + "%";
    bar.style.background = s.punch
      ? "linear-gradient(90deg,var(--green),#5b9c79)"
      : "linear-gradient(90deg,var(--lava),#ff5a2b)";
    pct.textContent = s.label;
    cap.innerHTML = "<strong>" + s.key + "</strong> · " + s.label + " of the view gap still unexplained";
  }

  function finalState() {
    paint(steps.length - 1);
    cap.innerHTML = COLLAPSE_CAP;
  }

  /* reduced motion: skip the animation, show the collapsed end state. */
  if (reduce) { finalState(); return; }

  paint(0);

  var played = false;
  function play() {
    if (played) return;
    played = true;
    var i = 0;
    var timer = setInterval(function () {
      i++;
      if (i >= steps.length) { clearInterval(timer); return; }
      paint(i);
      if (i === steps.length - 1) {
        clearInterval(timer);
        setTimeout(function () { cap.innerHTML = COLLAPSE_CAP; }, 700);
      }
    }, 900);
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { play(); io.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    io.observe(mount);
  } else {
    play();
  }
})();
