/* Build CSP-safe generative-tree public HTML: focus styles, controls, cursor-wind birds. */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src/templates/background/generative-tree-elements/sources');
const OUT = path.join(ROOT, 'public/effects/generative-tree.html');

const provenance = fs.readFileSync(path.join(SRC, 'generative-tree.html'), 'utf8');

const particleCount = 50;
const treePadding = (1).toFixed(4);

const focusStyles = `<style data-generative-tree-focus>
html, body, canvas { width: 100%; height: 100%; margin: 0; overflow: hidden; background: #0a0a0a; }
.label { display: none !important; }
</style>`;

const controls = `<script data-generative-tree-controls>
(function () {
  var nativeFrame = window.requestAnimationFrame.bind(window);
  var clock = { last: null, time: null };
  window.__GENERATIVE_TREE_CONTROLS = { speed: 1, paused: false };
  window.requestAnimationFrame = function (callback) {
    return nativeFrame(function (realTime) {
      var state = window.__GENERATIVE_TREE_CONTROLS;
      if (clock.last === null) {
        clock.last = realTime;
        clock.time = realTime;
      } else {
        if (!state.paused) clock.time += (realTime - clock.last) * state.speed;
        clock.last = realTime;
      }
      callback(clock.time);
    });
  };
  window.addEventListener('message', function (event) {
    if (!event.data || event.data.type !== 'generative-tree-controls') return;
    var next = event.data.controls || {};
    if (Number.isFinite(next.speed)) {
      window.__GENERATIVE_TREE_CONTROLS.speed = Math.max(0, Math.min(3, next.speed));
    }
    window.__GENERATIVE_TREE_CONTROLS.paused = Boolean(next.paused);
  });
})();
</script>`;

const nightSkyBlock = `
  // --- Night sky: stars, left moon, drifting clouds ---
  var stars = [];
  var nightClouds = [];

  function initNightSky() {
    stars = [];
    for (let i = 0; i < 110; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random() * 0.7,
        r: rand(0.35, 1.55),
        a: rand(0.3, 0.95),
        tw: rand(0, Math.PI * 2),
        twSpeed: rand(0.0012, 0.0045),
      });
    }
    nightClouds = [];
    for (let i = 0; i < 6; i++) {
      nightClouds.push({
        x: rand(-0.25, 1.15),
        y: rand(0.06, 0.36),
        w: rand(0.2, 0.48),
        h: rand(0.035, 0.085),
        speed: rand(0.000012, 0.000038) * (Math.random() < 0.5 ? 1 : -1),
        alpha: rand(0.07, 0.16),
      });
    }
  }

  function drawNightSky(time) {
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, '#04060e');
    sky.addColorStop(0.45, '#07090f');
    sky.addColorStop(1, '#0a0a0a');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    for (const s of stars) {
      const twinkle = 0.5 + 0.5 * Math.sin(time * s.twSpeed + s.tw);
      ctx.globalAlpha = s.a * twinkle;
      ctx.fillStyle = '#eef2ff';
      ctx.beginPath();
      ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    const mx = W * 0.13;
    const my = H * 0.16;
    const mr = Math.min(W, H) * 0.058;
    const moonGlow = ctx.createRadialGradient(mx, my, mr * 0.15, mx, my, mr * 3.2);
    moonGlow.addColorStop(0, 'rgba(210, 225, 255, 0.28)');
    moonGlow.addColorStop(0.5, 'rgba(140, 170, 230, 0.07)');
    moonGlow.addColorStop(1, 'rgba(4, 6, 14, 0)');
    ctx.fillStyle = moonGlow;
    ctx.beginPath();
    ctx.arc(mx, my, mr * 3.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#d5dceb';
    ctx.beginPath();
    ctx.arc(mx, my, mr, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#04060e';
    ctx.beginPath();
    ctx.arc(mx + mr * 0.38, my - mr * 0.1, mr * 0.9, 0, Math.PI * 2);
    ctx.fill();

    for (const c of nightClouds) {
      c.x += c.speed * 16;
      if (c.x > 1.35) c.x = -0.4;
      if (c.x < -0.4) c.x = 1.35;
      const cx = c.x * W;
      const cy = c.y * H;
      const cw = c.w * W;
      const ch = c.h * H;
      ctx.globalAlpha = c.alpha;
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, cw * 0.55);
      cg.addColorStop(0, 'rgba(70, 85, 120, 0.9)');
      cg.addColorStop(0.55, 'rgba(40, 50, 75, 0.45)');
      cg.addColorStop(1, 'rgba(10, 12, 20, 0)');
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.ellipse(cx, cy, cw * 0.55, ch, 0, 0, Math.PI * 2);
      ctx.ellipse(cx - cw * 0.28, cy + ch * 0.15, cw * 0.35, ch * 0.75, 0, 0, Math.PI * 2);
      ctx.ellipse(cx + cw * 0.3, cy + ch * 0.1, cw * 0.32, ch * 0.7, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
`;

const birdsBlock = `
  // --- Birds: perch on the tree first; take off into the sky when it shakes ---
  const PERCH_BIRD_COUNT = 9;
  let birds = [];
  let birdsSeated = false;

  function pickPerchBranches() {
    const deep = allBranches.filter((b) => b.depth >= MAX_DEPTH - 2 && b.growthProgress >= 0.9);
    if (deep.length) return deep;
    return allBranches.filter((b) => b.depth >= 5 && b.growthProgress >= 0.75);
  }

  function seatBirdsOnTree() {
    birds = [];
    birdsSeated = true;
    const candidates = pickPerchBranches();
    if (!candidates.length) {
      birdsSeated = false;
      return;
    }
    const used = new Set();
    const count = Math.min(PERCH_BIRD_COUNT, candidates.length);
    for (let i = 0; i < count; i++) {
      let branch = candidates[(Math.random() * candidates.length) | 0];
      let guard = 0;
      while (used.has(branch) && guard++ < 16) {
        branch = candidates[(Math.random() * candidates.length) | 0];
      }
      used.add(branch);
      birds.push({
        state: 'perched',
        branch,
        perchT: rand(0.7, 0.98),
        wing: rand(0, Math.PI * 2),
        wingSpeed: rand(0.32, 0.55),
        size: rand(5, 7.5),
        alpha: rand(0.65, 0.95),
        facing: Math.random() < 0.5 ? -1 : 1,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
      });
    }
  }

  function flushPerchedBirdsToSky() {
    let flushed = 0;
    for (const bird of birds) {
      if (bird.state !== 'perched') continue;
      bird.state = 'flying';
      bird.branch = null;
      const dir = bird.facing || (Math.random() < 0.5 ? -1 : 1);
      bird.facing = dir;
      bird.vx = dir * rand(2.4, 4.2);
      bird.vy = rand(-4.2, -2.0);
      bird.wingSpeed = rand(0.45, 0.7);
      flushed++;
    }
    return flushed;
  }

  function triggerTreeShake() {
    shakeAmount = 1.0;
    flushPerchedBirdsToSky();
  }

  function updateBirds(time) {
    if (!birdsSeated && treeState === 'holding' && allBranches.some((b) => b.growthProgress >= 0.9)) {
      seatBirdsOnTree();
    }

    for (let i = birds.length - 1; i >= 0; i--) {
      const bird = birds[i];
      if (bird.state === 'perched') {
        if (bird.branch) {
          const ep = getBranchEnd(bird.branch, bird.perchT, time);
          bird.x = ep.x;
          bird.y = ep.y - bird.size * 0.4;
        }
        bird.wing += 0.04;
        continue;
      }

      bird.x += bird.vx + windForce * 0.35;
      bird.y += bird.vy + Math.sin(time * 0.005 + bird.wing) * 0.35;
      bird.vy *= 0.998;
      bird.wing += bird.wingSpeed;
      if (bird.x < -80 || bird.x > W + 80 || bird.y < -120) {
        birds.splice(i, 1);
      }
    }
  }

  function drawBirds(drawCtx) {
    for (const bird of birds) {
      const perched = bird.state === 'perched';
      const flap = perched ? Math.sin(bird.wing) * 0.15 : Math.sin(bird.wing);
      const face = perched ? bird.facing : (bird.vx < 0 ? -1 : 1);
      const s = bird.size;
      drawCtx.save();
      drawCtx.translate(bird.x, bird.y);
      drawCtx.scale(face, 1);
      drawCtx.globalAlpha = bird.alpha * Math.max(treeAlpha, 0.35);
      drawCtx.fillStyle = 'rgba(220, 200, 165, 0.95)';
      drawCtx.strokeStyle = 'rgba(235, 220, 190, 0.95)';
      drawCtx.lineWidth = 1.35;
      drawCtx.lineCap = 'round';
      drawCtx.lineJoin = 'round';

      if (perched) {
        drawCtx.beginPath();
        drawCtx.ellipse(0, 0, s * 0.7, s * 0.38, 0, 0, Math.PI * 2);
        drawCtx.fill();
        drawCtx.beginPath();
        drawCtx.arc(s * 0.55, -s * 0.1, s * 0.28, 0, Math.PI * 2);
        drawCtx.fill();
        drawCtx.beginPath();
        drawCtx.moveTo(-s * 0.15, -s * 0.05);
        drawCtx.quadraticCurveTo(-s * 0.05, -s * (0.55 + flap * 0.2), -s * 0.85, -s * 0.2);
        drawCtx.stroke();
      } else {
        drawCtx.beginPath();
        drawCtx.moveTo(-s * 1.35, -s * (0.15 + flap * 0.85));
        drawCtx.quadraticCurveTo(-s * 0.2, -s * 0.1, s * 0.15, 0);
        drawCtx.quadraticCurveTo(s * 0.55, -s * 0.05, s * 1.05, -s * 0.12);
        drawCtx.moveTo(s * 0.1, 0);
        drawCtx.quadraticCurveTo(s * 0.05, -s * (0.7 + flap * 0.9), -s * 0.95, -s * (0.95 + flap * 0.7));
        drawCtx.stroke();
        drawCtx.beginPath();
        drawCtx.ellipse(0, 0, s * 0.55, s * 0.22, 0, 0, Math.PI * 2);
        drawCtx.fill();
      }
      drawCtx.restore();
    }
    drawCtx.globalAlpha = 1;
  }
`;

let focused = provenance
  .replace(/<script[^>]+cloudflareinsights\.com[^>]*><\/script>/gi, '')
  .replace('</head>', `${focusStyles}${controls}</head>`)
  .replace('const PARTICLE_COUNT = 50;', `const PARTICLE_COUNT = ${particleCount};`)
  .replace(
    "const _pad = parseFloat(new URLSearchParams(location.search).get('p')) || 1;",
    `const _pad = ${treePadding};`,
  )
  .replace(
    'function frame(time) {\n    // Decay shake',
    'function frame(time) {\n    if (window.__GENERATIVE_TREE_CONTROLS.paused) { requestAnimationFrame(frame); return; }\n\n    // Decay shake',
  )
  .replace(
    'b.growthProgress = Math.min(1, b.growthProgress + b.growthSpeed);',
    'b.growthProgress = Math.min(1, b.growthProgress + b.growthSpeed * window.__GENERATIVE_TREE_CONTROLS.speed);',
  )
  .replace('holdTimer++;', 'holdTimer += window.__GENERATIVE_TREE_CONTROLS.speed;')
  .replace('fadeTimer++;', 'fadeTimer += window.__GENERATIVE_TREE_CONTROLS.speed;')
  .replace('waitTimer++;', 'waitTimer += window.__GENERATIVE_TREE_CONTROLS.speed;')
  .replace(
    '  createTree();\n  requestAnimationFrame(frame);',
    `  function startTreeWhenSized() {
    resize();
    if (W <= 0 || H <= 0) {
      requestAnimationFrame(startTreeWhenSized);
      return;
    }
    running = true;
    try {
      createTree();
      if (typeof initNightSky === 'function') initNightSky();
      requestAnimationFrame(frame);
    } catch (err) {
      window.__TREE_BOOT_ERROR = String(err && err.stack || err);
      console.error(err);
    }
  }
  requestAnimationFrame(startTreeWhenSized);`,
  )
  .replace(
    `  window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'param') {`,
    `  window.__TREE_DEBUG = {
    get state() { return treeState; },
    get birdCount() { return birds.length; },
    get flying() { return birds.filter(function (b) { return b.state === 'flying'; }).length; },
    shake: function () { triggerTreeShake(); },
    seat: function () { seatBirdsOnTree(); },
  };
  window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'param') {`,
  )
  // Inject night sky + birds before color palette
  .replace(
    '  // --- Color palette (warm sienna → amber → golden at tips) ---',
    `${nightSkyBlock}\n${birdsBlock}\n  // --- Color palette (warm sienna → amber → golden at tips) ---`,
  )
  // Night sky replaces flat background fill in drawScene
  .replace(
    `    // Background
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, W, H);`,
    `    // Night sky (stars, moon, drifting clouds)
    drawNightSky(time);`,
  )
  // Init night sky on resize
  .replace(
    `  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    initParticleSprite();
  }`,
    `  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    initParticleSprite();
    if (typeof initNightSky === 'function') initNightSky();
  }`,
  )
  // Draw birds after ambient particles
  .replace(
    `    // Particles
    updateParticles(time);
    ctx.save();
    drawParticles(ctx, treeAlpha);
    ctx.restore();

    // Vignette`,
    `    // Particles
    updateParticles(time);
    ctx.save();
    drawParticles(ctx, treeAlpha);
    ctx.restore();

    updateBirds(time);
    drawBirds(ctx);

    // Vignette`,
  )
  .replace(
    `    treeState = 'growing';
    holdTimer = fadeTimer = waitTimer = 0;
    treeAlpha = 1;
    initParticles();`,
    `    treeState = 'growing';
    holdTimer = fadeTimer = waitTimer = 0;
    treeAlpha = 1;
    birds = [];
    birdsSeated = false;
    initParticles();`,
  )
  .replace(
    `        if (done) {
          treeState = 'holding';
          holdTimer = 0;
        }`,
    `        if (done) {
          treeState = 'holding';
          holdTimer = 0;
          seatBirdsOnTree();
        }`,
  )
  // Click / touch must flush birds immediately (not only decay-edge detect)
  .replace(
    "canvas.addEventListener('click', function() { shakeAmount = 1.0; });",
    "canvas.addEventListener('click', function() { triggerTreeShake(); });",
  )
  .replace(
    `  document.addEventListener('visibilitychange', function() {
    if (document.hidden) { running = false; }
    else startLoop();
  });`,
    `  document.addEventListener('visibilitychange', function() {
    // Keep animating in background tabs / automation viewports so the scene never freezes blank.
    if (!document.hidden) {
      running = true;
      startLoop();
    }
  });`,
  )
  .replace(
    `  canvas.addEventListener('touchstart', function(e) {
    e.preventDefault(); mouseActive = true;
    mouseX = e.touches[0].clientX; mouseY = e.touches[0].clientY;
    windForce = (mouseX - W / 2) / (W / 2);
    shakeAmount = 1.0;
  }, { passive: false });`,
    `  canvas.addEventListener('touchstart', function(e) {
    e.preventDefault(); mouseActive = true;
    mouseX = e.touches[0].clientX; mouseY = e.touches[0].clientY;
    windForce = (mouseX - W / 2) / (W / 2);
    triggerTreeShake();
  }, { passive: false });`,
  )
  .replace(
    `      case 'waiting': {
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, W, H);`,
    `      case 'waiting': {
        ctx.clearRect(0, 0, W, H);
        drawNightSky(performance.now());`,
  );

if (!focused.includes('data-generative-tree-focus')) throw new Error('focus styles missing');
if (!focused.includes('generative-tree-controls')) throw new Error('controls missing');
if (!focused.includes('seatBirdsOnTree')) throw new Error('perch birds missing');
if (!focused.includes('flushPerchedBirdsToSky')) throw new Error('shake takeoff missing');
if (!focused.includes('drawNightSky')) throw new Error('night sky missing');
if (!focused.includes('triggerTreeShake')) throw new Error('shake trigger missing');
if (focused.includes('cloudflareinsights')) throw new Error('beacon still present');

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, focused);
console.log('generative-tree.html bytes', Buffer.byteLength(focused, 'utf8'));
