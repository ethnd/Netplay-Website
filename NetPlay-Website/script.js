const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  menuButton.textContent = open ? '☰' : '×';
  navLinks.classList.toggle('is-open', !open);
});

navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  menuButton.textContent = '☰';
  navLinks.classList.remove('is-open');
}));

const tabs = [...document.querySelectorAll('[role="tab"]')];
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const next = tabs[(index + direction + tabs.length) % tabs.length];
    activateTab(next);
    next.focus();
  });
});

function activateTab(activeTab) {
  tabs.forEach((tab) => {
    const active = tab === activeTab;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
  });
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  revealItems.forEach((item) => observer.observe(item));
}

const gameDownload = document.getElementById('netplay-download');
const downloadStatus = document.getElementById('download-status');

async function checkGameDownload() {
  if (!gameDownload || !downloadStatus) return;

  const downloadPath = gameDownload.dataset.downloadPath;

  if (window.location.protocol === 'file:') {
    gameDownload.textContent = 'Build not uploaded yet';
    downloadStatus.textContent = 'Upload the website to a web host to check and activate the official Windows package.';
    return;
  }

  try {
    const response = await fetch(downloadPath, {
      method: 'HEAD',
      cache: 'no-store'
    });

    if (!response.ok) throw new Error('Game build unavailable');

    gameDownload.href = downloadPath;
    gameDownload.setAttribute('download', 'NetPlay-Windows-v1.0.0.zip');
    gameDownload.removeAttribute('aria-disabled');
    gameDownload.removeAttribute('tabindex');
    gameDownload.classList.remove('button-disabled');
    gameDownload.classList.add('button-primary');
    gameDownload.textContent = 'Download NetPlay v1.0.0';
    downloadStatus.textContent = 'Download the 64-bit Windows ZIP, extract all files, then open NetPlay.exe.';
  } catch {
    gameDownload.textContent = 'Build coming soon';
    downloadStatus.textContent = 'The official Windows build has not been uploaded yet. The button will activate automatically when it becomes available.';
  }
}

checkGameDownload();

