import { croot } from 'https://cdn.jsdelivr.net/gh/crootss/crootss@v0.4.0/croot.min.js';

const deck = croot('[data-croot]');
const pos = document.querySelector('.hud-pos');
const link = document.getElementById('tema');
const buttons = document.querySelectorAll('[data-tema]');
const THEMES = ['poster', 'gelap', 'minimal'];

function showPos() {
  pos.textContent = deck.isOverview ? 'overview' : `${deck.index + 1} / ${deck.steps.length}`;
}

function setTheme(name) {
  if (!THEMES.includes(name)) return;
  link.href = `../${name}.css`;
  buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.tema === name)));
  // Pilihan tema hanya kenyamanan per pengunjung; halaman tetap jalan tanpa storage.
  try { localStorage.setItem('crootss-tema', name); } catch {}
}

document.querySelector('.hud').addEventListener('click', (e) => {
  const button = e.target.closest('button');
  if (!button) return;
  if (button.dataset.act) deck[button.dataset.act]();
  if (button.dataset.tema) setTheme(button.dataset.tema);
  button.blur();
});
deck.root.addEventListener('croot:enter', showPos);
deck.root.addEventListener('croot:overview', showPos);
showPos();

// ?tema=gelap di URL menang atas pilihan tersimpan.
let saved = null;
try { saved = localStorage.getItem('crootss-tema'); } catch {}
setTheme(new URLSearchParams(location.search).get('tema') || saved || 'poster');

// Bilah navigasi menghilang setelah penonton diam, muncul lagi saat mouse
// bergerak atau layar disentuh (gaya .hud-idle di base.css).
const hud = document.querySelector('.hud');
let idleTimer = 0;
function wakeHud() {
  hud.classList.remove('hud-idle');
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => hud.classList.add('hud-idle'), 2500);
}
document.addEventListener('pointermove', wakeHud, { passive: true });
document.addEventListener('pointerdown', wakeHud, { passive: true });
wakeHud();
