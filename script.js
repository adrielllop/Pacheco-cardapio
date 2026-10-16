const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('pacheco-theme');

function setTheme(theme) {
  root.dataset.theme = theme;
  const dark = theme === 'dark';
  themeToggle?.setAttribute('aria-pressed', String(dark));
  themeToggle?.classList.toggle('is-dark', dark);
  localStorage.setItem('pacheco-theme', theme);
}
setTheme(savedTheme === 'dark' ? 'dark' : 'light');
themeToggle?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

function normalize(value = '') {
  return value.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
function makeImage(file, alt, className = 'product-image') {
  const img = document.createElement('img');
  img.src = file; img.alt = alt; img.className = className;
  img.loading = 'lazy'; img.decoding = 'async';
  return img;
}

const menuCards = [...document.querySelectorAll('.menu-card[data-image]')];
const favoriteCards = [...document.querySelectorAll('.favorite-card')];
const allProductCards = [...menuCards, ...favoriteCards];
const favoritesStore = new Set(JSON.parse(localStorage.getItem('pacheco-favorites') || '[]'));

menuCards.forEach((card, index) => {
  const title = card.querySelector('h4')?.textContent.trim() || 'Produto Pacheco Panificadora';
  card.prepend(makeImage(card.dataset.image, title));
  card.dataset.order = String(index);
  card.dataset.search = normalize(`${title} ${card.querySelector('p')?.textContent || ''}`);
  card.dataset.available = card.dataset.available !== 'false' ? 'true' : 'false';
  card.tabIndex = 0; card.setAttribute('role', 'button'); card.setAttribute('aria-label', `Ver detalhes de ${title}`);
  if (card.dataset.available === 'false') addUnavailableBadge(card);
});

favoriteCards.forEach((card, index) => {
  const title = card.querySelector('h3')?.textContent.trim() || '';
  card.dataset.productId = card.querySelector('img')?.getAttribute('src') || `favorito-${index}`;
  card.dataset.search = normalize(`${title} ${card.querySelector('.favorite-content > p:not(.favorite-label)')?.textContent || ''}`);
  card.tabIndex = 0; card.setAttribute('role', 'button'); card.setAttribute('aria-label', `Ver detalhes de ${title}`);
});

function addUnavailableBadge(card) {
  if (card.querySelector('.availability-badge')) return;
  const badge = document.createElement('span'); badge.className = 'availability-badge'; badge.textContent = 'Indisponível';
  card.append(badge); card.classList.add('is-unavailable');
}
function productId(card) { return card.dataset.image || card.dataset.productId; }
function getProduct(card) {
  const favorite = card.classList.contains('favorite-card');
  const title = card.querySelector(favorite ? 'h3' : 'h4')?.textContent.trim() || '';
  const price = card.querySelector('strong')?.textContent.trim() || '';
  const description = card.querySelector(favorite ? '.favorite-content > p:not(.favorite-label)' : 'p')?.textContent.trim() || 'Consulte os detalhes no balcão da Pacheco Panificadora.';
  return { card, title, price, description, image: card.querySelector('img')?.src || card.dataset.image, available: card.dataset.available !== 'false' };
}

function updateFavoriteButton(card) {
  let button = card.querySelector('.favorite-toggle');
  if (!button) {
    button = document.createElement('button'); button.type = 'button'; button.className = 'favorite-toggle';
    card.append(button);
    button.addEventListener('click', (event) => {
      event.stopPropagation(); const id = productId(card);
      if (favoritesStore.has(id)) favoritesStore.delete(id); else favoritesStore.add(id);
      localStorage.setItem('pacheco-favorites', JSON.stringify([...favoritesStore]));
      updateFavoriteButton(card); renderMyFavorites();
    });
  }
  const active = favoritesStore.has(productId(card));
  button.classList.toggle('is-favorite', active); button.setAttribute('aria-pressed', String(active));
  button.setAttribute('aria-label', active ? 'Remover dos favoritos' : 'Marcar como favorito');
  button.innerHTML = '<span aria-hidden="true"></span>';
}
allProductCards.forEach(updateFavoriteButton);

const myFavorites = document.querySelector('#meus-favoritos');
const myFavoritesGrid = document.querySelector('#my-favorites-grid');
function renderMyFavorites() {
  if (!myFavorites || !myFavoritesGrid) return;
  myFavoritesGrid.innerHTML = '';
  const saved = menuCards.filter((card) => favoritesStore.has(productId(card)));
  myFavorites.hidden = saved.length === 0;
  saved.forEach((card) => {
    const product = getProduct(card); const item = document.createElement('article'); item.className = 'saved-favorite-card'; item.tabIndex = 0; item.setAttribute('role', 'button');
    item.innerHTML = `<img src="${product.image}" alt="${product.title}" loading="lazy" decoding="async"><div><p>${product.title}</p><strong>${product.price}</strong><small>${product.description}</small></div><button type="button" class="saved-remove" aria-label="Remover ${product.title} dos favoritos">Remover</button>`;
    item.addEventListener('click', (event) => { if (!event.target.closest('.saved-remove')) openModal(card); });
    item.addEventListener('keydown', (event) => { if ((event.key === 'Enter' || event.key === ' ') && !event.target.closest('.saved-remove')) { event.preventDefault(); openModal(card); } });
    item.querySelector('.saved-remove').addEventListener('click', (event) => { event.stopPropagation(); favoritesStore.delete(productId(card)); localStorage.setItem('pacheco-favorites', JSON.stringify([...favoritesStore])); updateFavoriteButton(card); renderMyFavorites(); });
    myFavoritesGrid.append(item);
  });
}
renderMyFavorites();

const modal = document.querySelector('#product-modal');
const modalImage = document.querySelector('#modal-image'); const modalTitle = document.querySelector('#modal-title'); const modalPrice = document.querySelector('#modal-price'); const modalDescription = document.querySelector('#modal-description'); const modalSuggestion = document.querySelector('#modal-suggestion');
let lastFocused = null;
function findSuggestions(product) {
  const title = normalize(product.title);
  const byTitle = (terms) => menuCards.filter((item) => item !== product.card && terms.some((term) => normalize(item.querySelector('h4')?.textContent).includes(term)));
  if (title.includes('misto completo')) return byTitle(['cafe com leite','cafe preto','suco natural']);
  if (title.includes('misto simples')) return byTitle(['cappuccino','cafe preto','cafe com leite']);
  if (title.includes('cafe') || title.includes('cappuccino')) return byTitle(['pao na chapa','pao com ovo','misto']);
  if (title.includes('burger') || title.includes('pao') || title.includes('bauru')) return byTitle(['bacon','salada','presunto','mussarela']);
  return menuCards.filter((item) => item !== product.card).slice(0, 3);
}
function openModal(card) {
  const product = getProduct(card); lastFocused = document.activeElement;
  modalImage.src = product.image; modalImage.alt = product.title; modalTitle.textContent = product.title; modalPrice.textContent = product.price; modalDescription.textContent = product.description;
  modalSuggestion.innerHTML = '';
  const suggestions = findSuggestions(product).slice(0, 3);
  if (suggestions.length) {
    const label = document.createElement('p'); label.className = 'suggestion-label'; label.textContent = 'Sugestões da casa'; modalSuggestion.append(label);
    suggestions.forEach((item) => { const data = getProduct(item); const button = document.createElement('button'); button.type = 'button'; button.className = 'suggestion-item'; button.innerHTML = `<span>${data.title}</span><strong>${data.price}</strong>`; button.addEventListener('click', () => openModal(item)); modalSuggestion.append(button); });
  }
  modal.hidden = false; document.body.classList.add('modal-open'); modal.querySelector('.modal-close')?.focus();
}
function closeModal() { if (!modal || modal.hidden) return; modal.hidden = true; document.body.classList.remove('modal-open'); lastFocused?.focus?.(); }
allProductCards.forEach((card) => { const activate = (event) => { if (!event.target.closest('.favorite-toggle')) openModal(card); }; card.addEventListener('click', activate); card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); activate(event); } }); });
modal?.querySelectorAll('[data-modal-close]').forEach((element) => element.addEventListener('click', closeModal));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); if (event.key === 'Tab' && modal && !modal.hidden) { const focusables = [...modal.querySelectorAll('button, [href], input')]; const first = focusables[0]; const last = focusables[focusables.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } } });

const search = document.querySelector('#product-search'); const summary = document.querySelector('#search-summary'); const empty = document.querySelector('#search-empty'); const menuSection = document.querySelector('#cardapio'); const clearSearch = document.querySelector('#clear-search');
function applySearch() {
  const query = normalize(search?.value || '').trim(); let visible = 0;
  menuCards.forEach((card) => { const match = !query || card.dataset.search.includes(query); card.hidden = !match; if (match) visible += 1; });
  const activeTab = document.querySelector('.tab.active')?.dataset.tab || 'comidas';
  document.querySelectorAll('.menu-panel').forEach((panel) => { panel.hidden = query ? false : panel.id !== activeTab; });
  document.querySelectorAll('.category-intro[data-category]').forEach((heading) => { const grid = heading.nextElementSibling; if (!grid?.classList.contains('menu-grid')) return; const hasVisible = [...grid.querySelectorAll('.menu-card')].some((card) => !card.hidden); heading.hidden = Boolean(query) && !hasVisible; grid.hidden = Boolean(query) && !hasVisible; });
  menuSection?.classList.toggle('search-mode', Boolean(query));
  if (summary) summary.textContent = query ? `${visible} produto${visible === 1 ? '' : 's'} encontrado${visible === 1 ? '' : 's'}` : '';
  if (empty) empty.hidden = !query || visible > 0;
}
search?.addEventListener('input', applySearch); clearSearch?.addEventListener('click', () => { search.value = ''; applySearch(); search.focus(); });

const sortSelect = document.querySelector('#product-sort');
function sortCards() { const mode = sortSelect?.value || 'default'; document.querySelectorAll('.menu-grid').forEach((grid) => { const cards = [...grid.querySelectorAll('.menu-card')]; cards.sort((a, b) => { if (mode === 'name') return normalize(a.querySelector('h4')?.textContent).localeCompare(normalize(b.querySelector('h4')?.textContent), 'pt-BR'); const price = (card) => Number((card.querySelector('strong')?.textContent || '').replace(/[^0-9,]/g, '').replace(',', '.')) || 0; if (mode === 'price-asc') return price(a) - price(b); if (mode === 'price-desc') return price(b) - price(a); return Number(a.dataset.order) - Number(b.dataset.order); }); cards.forEach((card) => grid.append(card)); }); }
sortSelect?.addEventListener('change', sortCards);

const tabs = [...document.querySelectorAll('.tab')];
function activateTab(id) { tabs.forEach((tab) => { const active = tab.dataset.tab === id; tab.classList.toggle('active', active); tab.setAttribute('aria-selected', String(active)); }); document.querySelectorAll('.menu-panel').forEach((panel) => { const active = panel.id === id; panel.classList.toggle('active', active); panel.hidden = !active; }); }
tabs.forEach((tab) => tab.addEventListener('click', () => { if (search?.value) { search.value = ''; applySearch(); } activateTab(tab.dataset.tab); }));
document.querySelectorAll('.category-chip').forEach((chip) => chip.addEventListener('click', () => { if (search?.value) { search.value = ''; applySearch(); } activateTab(chip.dataset.tabTarget); document.querySelectorAll('.category-chip').forEach((item) => item.classList.toggle('active', item === chip)); document.getElementById(chip.dataset.jump)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }));

function updateOpeningStatus() {
  const status = document.querySelector('.hero-note b'); const hours = document.querySelector('.hero-note span:last-child'); if (!status || !hours) return;
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date()); const weekday = parts.find((part) => part.type === 'weekday')?.value; const hour = Number(parts.find((part) => part.type === 'hour')?.value || 0) % 24; const minute = Number(parts.find((part) => part.type === 'minute')?.value || 0); const total = hour * 60 + minute; const open = weekday === 'Sun' ? total >= 330 && total < 720 : total >= 360 && total < 1200;
  status.textContent = open ? 'Aberto agora' : 'Fechado agora'; hours.textContent = weekday === 'Sun' ? 'Domingo: 5:30 às 12:00' : 'Segunda a sábado: 6:00 às 20:00'; status.parentElement.classList.toggle('is-closed', !open);
}
updateOpeningStatus(); setInterval(updateOpeningStatus, 60000);
const backTop = document.querySelector('#back-top'); window.addEventListener('scroll', () => backTop?.classList.toggle('is-visible', window.scrollY > 650), { passive: true }); backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener('click', (event) => { const target = document.querySelector(link.getAttribute('href')); if (!target) return; event.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }));
