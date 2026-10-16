const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('pacheco-theme');
if (savedTheme === 'dark') setTheme('dark');
function setTheme(theme) {
  root.dataset.theme = theme;
  const dark = theme === 'dark';
  themeToggle?.setAttribute('aria-pressed', String(dark));
  themeToggle?.classList.toggle('is-dark', dark);
  localStorage.setItem('pacheco-theme', theme);
}
themeToggle?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

function makeImage(file, alt, className = 'product-image') {
  const img = document.createElement('img');
  img.src = file;
  img.alt = alt;
  img.className = className;
  img.loading = 'lazy';
  return img;
}

// As imagens usam a numeração do ZIP recebido, mantendo o pareamento original.
document.querySelectorAll('.menu-card[data-image]').forEach((card) => {
  const title = card.querySelector('h4')?.textContent || 'Produto Pacheco Panificadora';
  const image = makeImage(card.dataset.image, title);
  card.prepend(image);
  card.querySelector('.image-slot')?.remove();
});

const rowImages = {
  '#comidas .subsection .compact-list > div': ['14_Misto_Pao_Ovo_e_Presunto.jpg', '15_Misto_Pao_Salada_e_2_Mussarelas.jpg', '16_Misto_Pao_Mussarela_e_Mortadela.jpg', '17_Misto_Pao_Mussarela_e_Presunto.jpg', '18_Misto_Pao_Ovo_e_Mussarela.jpg', '19_Refeicao_Quintanda.jpg'],
  '#comidas .extras-list > span': ['20_Bacon.jpg', '21_Salada.jpg', '22_Presunto.jpg', '23_Mussarela.jpg', '24_Mortadela.jpg', '25_Ovo_Frito.jpg', '26_Carne_de_Hamburguer.jpg', '27_Ovo_Mexido_3_Unidades.jpg'],
  '#bebidas .drink-column:first-child .drink-list:nth-of-type(2) > div': ['28_Cafe_Preto_P.jpg', '29_Cafe_Preto_G.jpg', '30_Cafe_com_Leite_P.jpg', '31_Cafe_com_Leite_G.jpg', '32_Cafe_Expresso_P.jpg', '33_Cafe_Expresso_G.jpg', '34_Achocolatado_200_ml.jpg'],
  '#bebidas .drink-column:first-child .drink-list:nth-of-type(4) > div': ['35_Suco_Natural_Copo.jpg', '36_Suco_Natural_Jarra_750_ml.jpg', '37_Copo_de_Gelo_e_Limao.jpg'],
  '#bebidas .dark-column .drink-list > div': ['38_Cappuccino_Tradicional.jpg', '39_Cappuccino_Extra_Forte_sem_Acucar.jpg', '40_Cappuccino_Gelado_com_ou_sem_Acucar.jpg', '41_Cappuccino_com_Chantilly.jpg', '42_Adicional_de_Chantilly.jpg']
};
Object.entries(rowImages).forEach(([selector, files]) => {
  document.querySelectorAll(selector).forEach((row, index) => {
    const file = files[index];
    if (!file) return;
    const label = row.querySelector('span')?.textContent || 'Produto Pacheco Panificadora';
    row.prepend(makeImage(file, label, 'row-image'));
  });
});
const cinnamon = document.querySelector('.optional-note');
if (cinnamon) cinnamon.prepend(makeImage('43_Canela_Opcional.jpg', 'Canela opcional', 'mini-product-image'));

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    const id = tab.dataset.tab;
    document.querySelectorAll('.tab').forEach((item) => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    document.querySelectorAll('.menu-panel').forEach((panel) => {
      const active = panel.id === id;
      panel.classList.toggle('active', active);
      panel.hidden = !active;
    });
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
