(function () {
  function createArcadeCharacter(n, cw, ch) {
    var tempStr = "",
      t = 0,
      l = 0,
      b = 0;
    var pattern = createArcadeCharacterPattern(n);
    for (var i = 0; i < n * n; i++) {
      b = pattern.charAt(i);
      tempStr +=
        '<div class="bit' +
        (b == 1 ? " bit--active" : "") +
        '" style="top:' +
        t +
        "px;left:" +
        l +
        "px;width:" +
        cw +
        "px;height:" +
        ch +
        'px;"></div>';
      if (i > 0 && (i + 1) % n == 0) {
        t = 0;
        l += cw;
      } else {
        t += ch;
      }
    }
    return tempStr;
  }

  function createArcadeCharacterPattern(n, { p = 0.45, blobs = 6 } = {}) {
    const pts = Array.from({ length: blobs }, () => [
      Math.random() * n,
      Math.random() * n,
    ]);
    const grid = [];
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        // distance to nearest blob center
        let dmin = 1e9;
        for (const [x, y] of pts) {
          const dx = x - c,
            dy = y - r;
          const d = Math.hypot(dx, dy);
          if (d < dmin) dmin = d;
        }
        // Map distance to 0..1 and threshold by p
        const v = 1 - Math.min(dmin / (n / 2), 1);
        grid.push(v > 1 - p ? "1" : "0");
      }
    }
    return grid.join("");
  }

  function createArcadeCharacterWall(count, an, bw, bh) {
    var container = document.querySelector(".arcadewall");
    var tempStr = "",
      acw = bw * an,
      ach = bh * an;
    for (var i = 0; i < count; i++) {
      tempStr +=
        '<div class="arcade" style="width:' +
        acw +
        "px;height:" +
        ach +
        "px;margin:" +
        bw +
        'px;">';
      tempStr += createArcadeCharacter(an, bw, bh);
      tempStr += "</div>";
    }
    container.innerHTML = tempStr;
  }

  // NEW: compute how many tiles are needed to fill the viewport
  function computeCountToFillViewport(an, bw, bh, margin) {
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var tileW = an * bw + 2 * margin; // width plus left/right margin
    var tileH = an * bh + 2 * margin; // height plus top/bottom margin
    var cols = Math.ceil(vw / tileW);
    var rows = Math.ceil(vh / tileH);
    // Add a tiny buffer so we never under-fill due to rounding
    return (cols + 1) * (rows + 1);
  }

  function render() {
    var an = 6; // cells per side in one character
    var bw = 6; // bit width
    var bh = 6; // bit height
    var margin = bw; // keep your existing margin usage

    var count = computeCountToFillViewport(an, bw, bh, margin);
    createArcadeCharacterWall(count, an, bw, bh);
  }

  // Initial render + re-render on resize (debounced)
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(render, 100);
  });

  // Optional: animate/regenerate periodically
  function loop() {
    render();
    setTimeout(loop, 1000);
  }
  loop();
})();
