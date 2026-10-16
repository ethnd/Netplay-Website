const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
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
}

const tabs = [...document.querySelectorAll('[role="tab"]')];

function activateTab(activeTab) {
  tabs.forEach((tab) => {
    const active = tab === activeTab;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    const panel = document.getElementById(tab.getAttribute('aria-controls'));
    if (panel) panel.hidden = !active;
  });
}

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

const detailSearch = document.getElementById('detail-search');
const detailClear = document.getElementById('detail-search-clear');
const detailStatus = document.getElementById('detail-search-status');
const detailEmpty = document.getElementById('detail-empty');
const detailCards = [...document.querySelectorAll('[data-detail]')];

function filterDetails() {
  if (!detailSearch || !detailStatus || !detailEmpty) return;

  const query = detailSearch.value.trim().toLocaleLowerCase();
  let visibleCount = 0;

  detailCards.forEach((card) => {
    const searchableText = `${card.dataset.search || ''} ${card.textContent}`.toLocaleLowerCase();
    const matches = !query || searchableText.includes(query);
    card.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  detailStatus.textContent = query
    ? `${visibleCount} matching ${visibleCount === 1 ? 'detail' : 'details'} found.`
    : `Showing all ${detailCards.length} details.`;
  detailEmpty.hidden = visibleCount !== 0;
  if (detailClear) detailClear.hidden = !query;
}

if (detailSearch) {
  detailSearch.addEventListener('input', filterDetails);
  filterDetails();
}

if (detailClear && detailSearch) {
  detailClear.addEventListener('click', () => {
    detailSearch.value = '';
    filterDetails();
    detailSearch.focus();
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
    gameDownload.textContent = 'Game package not added yet';
    downloadStatus.textContent = 'Add NetPlay-Windows-v1.17.1.50.zip to the downloads folder, then preview this website through a local web server.';
    return;
  }

  try {
    const response = await fetch(downloadPath, {
      method: 'HEAD',
      cache: 'no-store'
    });

    if (!response.ok) throw new Error('Game package unavailable');

    gameDownload.href = downloadPath;
    gameDownload.setAttribute('download', 'NetPlay-Windows-v1.17.1.50.zip');
    gameDownload.removeAttribute('aria-disabled');
    gameDownload.removeAttribute('tabindex');
    gameDownload.classList.remove('button-disabled');
    gameDownload.classList.add('button-primary');
    gameDownload.textContent = 'Download NetPlay for Windows';
    downloadStatus.textContent = 'Download the 64-bit Windows ZIP, extract all files, then open NetPlay.exe.';
  } catch {
    gameDownload.textContent = 'Game package not added yet';
    downloadStatus.textContent = 'Place NetPlay-Windows-v1.17.1.50.zip inside the downloads folder. The button will activate automatically after deployment.';
  }
}

// checkGameDownload();
