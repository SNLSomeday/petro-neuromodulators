/*
 * Accessible, dependency-free nerve → muscle → skin explainer.
 * Load mechanism.css and this script, then call:
 *   const mechanism = window.initMechanism(document.querySelector('#mechanism'));
 * Optional API: setStep(0|1|2), setTreated(true|false), destroy().
 * No animation runs on initialization. A user action plays one short transition.
 */
(function () {
  'use strict';
  const instances = new WeakMap();
  let sequence = 0;
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const copy = {
    usual: [
      ['First, the nerve sends a message.', 'When you raise a brow or make a face, nerves pass along the instructions. At the nerve ending, a chemical messenger called acetylcholine (ACh) is released and crosses a tiny gap to the muscle.'],
      ['The muscle gets the message.', 'ACh reaches receptors on the muscle: the receiving points for the message. That starts a contraction. Muscle fibers shorten and pull, helping your brows lift or draw together.'],
      ['You see the movement in your skin.', 'Lift your eyebrows and watch your forehead. As the muscles move, the skin folds with them. Those everyday movements help explain why lines appear where they do.']
    ],
    treated: [
      ['Treatment turns down the message.', 'The medicine works inside selected nerve endings, where it interferes with the machinery that releases ACh. Less of that messenger makes it across the gap to the muscle.'],
      ['The muscle has less reason to pull.', 'With less ACh arriving, the treated muscle receives less stimulation and can pull less strongly. Its receptors are still available to receive messages; treatment changes how much messenger the nerve releases.'],
      ['Less pulling can soften the crease.', 'When the muscle pulls less, the skin may fold less. A line may soften without disappearing. The effect wears off, and both the amount of change and how long it lasts vary from person to person.']
    ]
  };

  window.initMechanism = function initMechanism(target) {
    const container = typeof target === 'string' ? document.querySelector(target) : target;
    if (!container || container.nodeType !== 1) throw new TypeError('initMechanism needs a container element.');
    if (instances.has(container)) return instances.get(container);
    const originalNodes = Array.from(container.childNodes);
    const id = 'mechanism-' + (++sequence);
    let step = 0;
    let treated = false;
    let disposed = false;
    const animations = new Set();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const root = document.createElement('section');
    root.className = 'nm-mechanism';
    root.setAttribute('aria-labelledby', id + '-heading');
    root.innerHTML = `
      <div class="nm-mechanism__intro">
        <h3 id="${id}-heading">Follow the <mark class="nm-mechanism__mark">signal.</mark></h3>
        <p>Choose a step. Switch between the two views to see what treatment changes.</p>
      </div>
      <div class="nm-mechanism__controls">
        <div class="nm-mechanism__steps" role="group" aria-label="Explore the three stages">
          <button type="button" data-step="0" aria-pressed="true"><span aria-hidden="true">01</span> Nerve sends</button>
          <button type="button" data-step="1" aria-pressed="false"><span aria-hidden="true">02</span> Muscle pulls</button>
          <button type="button" data-step="2" aria-pressed="false"><span aria-hidden="true">03</span> Skin folds</button>
        </div>
        <button class="nm-mechanism__switch" type="button" role="switch" aria-checked="false" aria-describedby="${id}-switch-help">
          <span class="nm-mechanism__switch-track" aria-hidden="true"><span></span></span>
          <span>With neuromodulator</span>
          <span class="nm-mechanism__switch-state" aria-hidden="true">Off</span>
        </button>
      </div>
      <p class="nm-mechanism__switch-help" id="${id}-switch-help">Watch how releasing less messenger changes the muscle’s pull.</p>
      <p class="nm-mechanism__color-key"><span><i class="nm-mechanism__swatch nm-mechanism__swatch--nerve" aria-hidden="true"></i>Nerve</span><span><i class="nm-mechanism__swatch nm-mechanism__swatch--muscle" aria-hidden="true"></i>Muscle</span><span><i class="nm-mechanism__swatch nm-mechanism__swatch--message" aria-hidden="true"></i>ACh messenger</span></p>

      <figure class="nm-mechanism__figure">
        <div class="nm-mechanism__visuals">
          <div class="nm-mechanism__junction">
            <svg class="nm-mechanism__diagram" viewBox="0 0 600 460" role="img" aria-labelledby="${id}-svg-title ${id}-svg-desc">
              <title id="${id}-svg-title">A nerve ending sends a message to a muscle</title>
              <desc id="${id}-svg-desc"></desc>
              <defs>
                <linearGradient id="${id}-nerve-wash" x1="0%" y1="0%" x2="80%" y2="100%">
                  <stop offset="0%" stop-color="#defbed"/><stop offset="44%" stop-color="#9aefdb"/><stop offset="100%" stop-color="#65d5ce"/>
                </linearGradient>
                <radialGradient id="${id}-nerve-bloom" cx="45%" cy="30%" r="65%">
                  <stop offset="0%" stop-color="#f3fff2" stop-opacity=".85"/><stop offset="65%" stop-color="#b4f4df" stop-opacity=".25"/><stop offset="100%" stop-color="#b4f4df" stop-opacity="0"/>
                </radialGradient>
                <linearGradient id="${id}-muscle-wash" x1="0%" y1="0%" x2="75%" y2="100%">
                  <stop offset="0%" stop-color="#ffd1d4"/><stop offset="42%" stop-color="#ffacb4"/><stop offset="100%" stop-color="#f99583"/>
                </linearGradient>
                <radialGradient id="${id}-message-wash" cx="35%" cy="25%" r="80%">
                  <stop offset="0%" stop-color="#fffbd0"/><stop offset="55%" stop-color="#fff065"/><stop offset="100%" stop-color="#b7ecd4"/>
                </radialGradient>
                <pattern id="${id}-muscle-lines" width="16" height="12" patternUnits="userSpaceOnUse">
                  <path d="M0 3Q8 2 16 3M0 9Q8 10 16 9" fill="none" stroke="#84726e" stroke-width=".7" opacity=".24" />
                </pattern>
              </defs>
              <g class="nm-mechanism__nerve">
                <path class="nm-mechanism__nerve-outline" fill="url(#${id}-nerve-wash)" d="M245 10V49C245 70 112 61 95 125C75 194 124 229 196 231H405C477 230 521 190 504 127C486 65 355 70 355 49V10" />
                <path class="nm-mechanism__pigment-bloom" fill="url(#${id}-nerve-bloom)" d="M249 13V50C249 74 119 66 101 126C85 187 130 222 198 224H404C472 223 512 186 498 129C481 72 351 75 351 50V13Z" />
                <path d="M258 13V48M342 13V48" class="nm-mechanism__fine-line" />
                <text x="300" y="106" text-anchor="middle" class="nm-mechanism__svg-label">Nerve ending</text>
                <g class="nm-mechanism__vesicles"></g>
                <path d="M153 230H444" class="nm-mechanism__release-edge" />
              </g>
              <g class="nm-mechanism__messenger-dots"></g>
              <g class="nm-mechanism__release-label">
                <text x="32" y="279" class="nm-mechanism__svg-small">ACh</text>
                <path d="M83 272H119" class="nm-mechanism__fine-line" />
              </g>
              <text x="489" y="279" class="nm-mechanism__svg-small">Tiny gap</text>
              <g class="nm-mechanism__muscle-whole">
                <rect x="74" y="331" width="452" height="89" rx="44.5" class="nm-mechanism__muscle-outline" fill="url(#${id}-muscle-wash)" />
                <path class="nm-mechanism__muscle-glaze" d="M111 345C176 339 244 353 301 346S426 340 489 350C506 354 512 363 510 371C429 355 375 374 302 363S185 353 99 365C98 356 103 350 111 345Z" />
                <rect x="85" y="343" width="430" height="65" rx="32.5" fill="url(#${id}-muscle-lines)" />
                <g class="nm-mechanism__receptors"></g>
                <text x="300" y="383" text-anchor="middle" class="nm-mechanism__svg-label">Muscle</text>
              </g>
              <text x="300" y="452" text-anchor="middle" class="nm-mechanism__svg-small nm-mechanism__muscle-state">Ready to receive a signal</text>
            </svg>
            <p class="nm-mechanism__legend"><span class="nm-mechanism__dot" aria-hidden="true"></span><span><strong>ACh</strong> = acetylcholine, the chemical messenger.</span></p>
            <p class="nm-mechanism__receptor-note"><span class="nm-mechanism__receptor-key" aria-hidden="true">∪</span> The small cups represent <strong>receptors</strong>: the muscle’s receiving points.</p>
          </div>
          <div class="nm-mechanism__skin-view">
            <p class="nm-mechanism__eyebrow">What happens at the skin</p>
            <svg viewBox="0 0 360 150" role="img" aria-labelledby="${id}-skin-title ${id}-skin-desc">
              <title id="${id}-skin-title">Skin response to muscle pull</title>
              <desc id="${id}-skin-desc"></desc>
              <defs><linearGradient id="${id}-skin-wash" x1="0%" y1="0%" x2="15%" y2="100%"><stop offset="0%" stop-color="#ffb9b6"/><stop offset="50%" stop-color="#ffdad0"/><stop offset="100%" stop-color="#fff2d3"/></linearGradient></defs>
              <path class="nm-mechanism__skin-wash" fill="url(#${id}-skin-wash)" d="M18 67H342V84H18Z" />
              <path class="nm-mechanism__skin-under" d="M18 84H342" />
              <path class="nm-mechanism__skin-line" d="M18 67H342" />
              <path class="nm-mechanism__pull-arrow nm-mechanism__pull-left" d="M32 124H130M117 115L130 124L117 133" />
              <path class="nm-mechanism__pull-arrow nm-mechanism__pull-right" d="M328 124H230M243 115L230 124L243 133" />
            </svg>
            <p class="nm-mechanism__skin-status">Explore all three stages.</p>
            <p class="nm-mechanism__skin-note">Skin response is shown separately. These are linked ideas, not an anatomical cross-section.</p>
          </div>
        </div>
        <div class="nm-mechanism__explanation" aria-live="polite" aria-atomic="true">
          <p class="nm-mechanism__mode"></p>
          <h4 class="nm-mechanism__state-title"></h4>
          <p class="nm-mechanism__state-copy"></p>
        </div>
        <figcaption class="nm-mechanism__caption">This drawing slows the process down and simplifies it. The dots show the idea of messenger release; their number does not represent a dose or predict your result.</figcaption>
      </figure>`;
    container.replaceChildren(root);
    const q = (selector) => root.querySelector(selector);
    const buttons = Array.from(root.querySelectorAll('[data-step]'));
    const switchButton = q('.nm-mechanism__switch');
    const muscle = q('.nm-mechanism__muscle-whole');
    const dots = q('.nm-mechanism__messenger-dots');
    const skinLine = q('.nm-mechanism__skin-line');
    const skinUnder = q('.nm-mechanism__skin-under');
    const skinWash = q('.nm-mechanism__skin-wash');
    const vesicles = q('.nm-mechanism__vesicles');
    const receptors = q('.nm-mechanism__receptors');
    const receptorXs = [155, 213, 271, 329, 387, 445];

    function svgElement(tag, attrs) {
      const element = document.createElementNS(SVG_NS, tag);
      Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, String(value)));
      return element;
    }
    // Vesicles remain inside the nerve in both modes; only RELEASE is reduced.
    [[160,158],[224,178],[287,152],[356,181],[427,157]].forEach(([x,y]) => {
      vesicles.append(svgElement('circle', { cx:x, cy:y, r:23, class:'nm-mechanism__vesicle' }));
      [[-7,-4],[7,-5],[0,8]].forEach(([dx,dy]) => vesicles.append(svgElement('circle', {cx:x+dx, cy:y+dy, r:3.2, fill:`url(#${id}-message-wash)`, class:'nm-mechanism__packed-dot'})));
    });
    receptorXs.forEach((x) => receptors.append(svgElement('path', {
      d:`M${x-10} 303V312Q${x-10} 320 ${x} 320Q${x+10} 320 ${x+10} 312V303M${x} 320V332`,
      class:'nm-mechanism__receptor'
    })));

    function stopAnimations() {
      animations.forEach(animation => animation.cancel());
      animations.clear();
    }
    function animate(element, frames, options) {
      if (reducedMotion.matches || typeof element.animate !== 'function') return;
      const animation = element.animate(frames, Object.assign({duration:560, easing:'ease-out', fill:'backwards'}, options));
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    }
    function skinPath(amplitude, offset) {
      const base = 67 + offset;
      // A schematic crease, with a broad flat line before the skin stage.
      return `M18 ${base}H82C112 ${base} 124 ${base-amplitude} 147 ${base-amplitude}S166 ${base+amplitude} 180 ${base+amplitude}S193 ${base-amplitude} 216 ${base-amplitude}S251 ${base} 278 ${base}H342`;
    }
    function skinBandPath(amplitude) {
      const depth = amplitude * .75;
      return skinPath(amplitude, 0) + `L342 84H278C251 84 239 ${84-depth} 216 ${84-depth}C193 ${84-depth} 194 ${84+depth} 180 ${84+depth}C166 ${84+depth} 170 ${84-depth} 147 ${84-depth}C124 ${84-depth} 112 84 82 84H18Z`;
    }
    function render(userInitiated) {
      if (disposed) return;
      stopAnimations();
      root.dataset.treated = String(treated);
      root.dataset.step = String(step);
      buttons.forEach((button, index) => button.setAttribute('aria-pressed', String(step === index)));
      switchButton.setAttribute('aria-checked', String(treated));
      q('.nm-mechanism__switch-state').textContent = treated ? 'On' : 'Off';
      const [title, explanation] = copy[treated ? 'treated' : 'usual'][step];
      q('.nm-mechanism__mode').textContent = (treated ? 'With neuromodulator' : 'Usual signal') + ' · Step ' + (step + 1) + ' of 3';
      q('.nm-mechanism__state-title').textContent = title;
      q('.nm-mechanism__state-copy').textContent = explanation;
      q('#' + id + '-svg-desc').textContent = title + ' ' + explanation + ' Small cups on the muscle represent receptors, which remain available in both views.';

      const scale = step >= 1 ? (treated ? 0.94 : 0.78) : 1;
      const muscleTransform = `translate(300px, 375px) scale(${scale}, ${1+(1-scale)*.35}) translate(-300px, -375px)`;
      muscle.style.transform = muscleTransform;
      q('.nm-mechanism__muscle-state').textContent = step === 0 ? 'Ready to receive a signal' : treated ? 'Less muscle pull' : 'Muscle shortens and pulls';

      const releasedXs = treated ? [213, 387] : receptorXs;
      q('.nm-mechanism__release-label').style.display = step === 0 ? '' : 'none';
      dots.replaceChildren();
      releasedXs.forEach((sourceX, index) => {
        const x = step === 0 ? sourceX : 300 + (sourceX - 300) * scale;
        const y = step === 0 ? 261 + (index % 2)*17 : 375 + (310 - 375) * (1+(1-scale)*.35);
        const dot = svgElement('circle', {cx:x, cy:y, r:5.5, fill:`url(#${id}-message-wash)`, class:'nm-mechanism__ach-dot'});
        dots.append(dot);
        // A single, finite release transition. No particles run in a loop.
        if (userInitiated) animate(dot, [
          {transform:`translate(${sourceX-x}px, ${212-y}px)`, opacity:0},
          {transform:'translate(0px, 0px)', opacity:1}
        ], {duration:480, delay:index*35});
      });
      const amplitude = step === 2 ? (treated ? 5 : 25) : 0;
      skinLine.setAttribute('d', skinPath(amplitude, 0));
      skinUnder.setAttribute('d', skinPath(amplitude*.75, 17));
      skinWash.setAttribute('d', skinBandPath(amplitude));
      const skinStatus = step < 2 ? 'Step 3 shows the skin response.' : treated ? 'Less folding in this illustration.' : 'More folding with the stronger pull.';
      q('.nm-mechanism__skin-status').textContent = skinStatus;
      q('#' + id + '-skin-desc').textContent = step < 2 ? 'Skin shown at rest. Choose Skin folds to show the response.' : treated ? 'A shallow skin crease represents reduced muscle pull. This is an illustrative comparison, not a predicted outcome.' : 'A deeper skin crease represents muscle pull. This is an illustrative comparison, not a predicted outcome.';
      root.querySelectorAll('.nm-mechanism__pull-arrow').forEach(arrow => {
        arrow.style.opacity = step === 2 ? (treated ? '.45' : '1') : '0';
      });
      if (userInitiated && step >= 1) animate(muscle, [
        {transform:'translate(300px, 375px) scale(1) translate(-300px, -375px)'},
        {transform:muscleTransform}
      ], {duration:560});
      if (userInitiated && step === 2) animate(skinLine, [{opacity:.35}, {opacity:1}], {duration:400});
    }
    function onStepClick(event) {
      step = Number(event.currentTarget.dataset.step);
      render(true);
    }
    function onStepKey(event) {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const current = buttons.indexOf(event.currentTarget);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (current + (event.key === 'ArrowRight' ? 1 : -1) + 3) % 3;
      buttons[next].focus();
      step = next;
      render(true);
    }
    function onToggle() { treated = !treated; render(true); }
    function onMotionChange() { if (reducedMotion.matches) stopAnimations(); }
    buttons.forEach(button => {
      button.addEventListener('click', onStepClick);
      button.addEventListener('keydown', onStepKey);
    });
    switchButton.addEventListener('click', onToggle);
    if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', onMotionChange);
    else if (reducedMotion.addListener) reducedMotion.addListener(onMotionChange);

    const api = {
      setStep(next) {
        if (!Number.isInteger(next) || next < 0 || next > 2) throw new RangeError('Step must be 0, 1, or 2.');
        step = next; render(false);
      },
      setTreated(next) { treated = Boolean(next); render(false); },
      destroy() {
        if (disposed) return;
        disposed = true;
        stopAnimations();
        buttons.forEach(button => {
          button.removeEventListener('click', onStepClick);
          button.removeEventListener('keydown', onStepKey);
        });
        switchButton.removeEventListener('click', onToggle);
        if (reducedMotion.removeEventListener) reducedMotion.removeEventListener('change', onMotionChange);
        else if (reducedMotion.removeListener) reducedMotion.removeListener(onMotionChange);
        container.replaceChildren(...originalNodes);
        instances.delete(container);
      }
    };
    instances.set(container, api);
    render(false);
    return api;
  };
})();
