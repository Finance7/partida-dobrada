/**
 * Ponto de entrada modular seguro.
 * A lógica atual continua em legacy.js; este módulo acrescenta
 * melhorias de apresentação e acessibilidade sem duplicar o router.
 */

function syncNavigationState() {
  document.querySelectorAll('#nav [data-s]').forEach(button => {
    button.setAttribute('aria-selected', button.classList.contains('on') ? 'true' : 'false');
  });
}

function initNavigationAccessibility() {
  const nav = document.querySelector('#nav');
  if (!nav) return;

  syncNavigationState();

  const observer = new MutationObserver(syncNavigationState);
  observer.observe(nav, {
    subtree: true,
    attributes: true,
    attributeFilter: ['class']
  });

  nav.addEventListener('keydown', event => {
    const buttons = [...nav.querySelectorAll('[data-s]')];
    const current = buttons.indexOf(document.activeElement);
    if (current < 0) return;

    let next = current;
    if (event.key === 'ArrowRight') next = (current + 1) % buttons.length;
    if (event.key === 'ArrowLeft') next = (current - 1 + buttons.length) % buttons.length;
    if (next === current) return;

    event.preventDefault();
    buttons[next].focus();
    buttons[next].click();
  });
}

function init() {
  initNavigationAccessibility();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
