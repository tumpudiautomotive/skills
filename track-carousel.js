const trackCarousel = document.querySelector('.track-details');
const slides = trackCarousel.querySelector('.track-slides');
const panels = [...slides.querySelectorAll('.track-detail')];
const cards = [...document.querySelectorAll('.course[href^="#"]')];
const controls = trackCarousel.querySelector('.track-carousel-controls');
const previous = controls.querySelector('[data-track-step="-1"]');
const next = controls.querySelector('[data-track-step="1"]');
const position = controls.querySelector('.track-position');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let active = 0;

function updateSelection(index) {
  active = index;
  previous.disabled = index === 0;
  next.disabled = index === panels.length - 1;
  const label = (index + 1) + ' / ' + panels.length;
  if (position.textContent !== label) position.textContent = label;
  cards.forEach(card => {
    if (card.hash === '#' + panels[index].id) card.setAttribute('aria-current', 'true');
    else card.removeAttribute('aria-current');
  });
}

function panelOffset(panel) {
  return panel.getBoundingClientRect().left - slides.getBoundingClientRect().left + slides.scrollLeft;
}

function showTrack(index, jumpToSection = false, animate = true) {
  updateSelection(index);
  const behavior = animate && !reducedMotion.matches ? 'smooth' : 'instant';
  slides.scrollTo({ left: panelOffset(panels[index]), behavior });
  if (jumpToSection) trackCarousel.scrollIntoView({ block: 'start', behavior });
}

function readTrackHash() {
  const index = panels.findIndex(panel => '#' + panel.id === location.hash);
  showTrack(Math.max(0, index), index >= 0, false);
}

cards.forEach(card => card.addEventListener('click', event => {
  const index = panels.findIndex(panel => '#' + panel.id === card.hash);
  if (index < 0 || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  if (location.hash !== card.hash) history.pushState(null, '', card.hash);
  showTrack(index, true);
}));

previous.addEventListener('click', () => showTrack(Math.max(0, active - 1)));
next.addEventListener('click', () => showTrack(Math.min(panels.length - 1, active + 1)));
slides.addEventListener('scroll', () => {
  const nearest = panels.reduce((best, panel, index) =>
    Math.abs(panelOffset(panel) - slides.scrollLeft) < Math.abs(panelOffset(panels[best]) - slides.scrollLeft) ? index : best, 0);
  if (nearest !== active) updateSelection(nearest);
}, { passive: true });

controls.hidden = false;
readTrackHash();
window.addEventListener('hashchange', readTrackHash);
