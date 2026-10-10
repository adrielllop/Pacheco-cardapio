# Pacheco Panificadora — Cardápio

Site estático pronto para publicar no GitHub e no Render.

## Publicar no Render

1. Envie todos os arquivos desta pasta para a raiz do repositório no GitHub.
2. No Render, escolha **New → Static Site** e conecte o repositório.
3. Deixe **Build Command** vazio e use `.` como **Publish Directory**.

## Atualização v2

As 43 imagens da versão v2 já estão na raiz, numeradas de `01_` a `43_`, e ligadas aos produtos correspondentes. O layout foi reorganizado com categorias completas em cada aba. Na aba **Comidas & lanches**, os produtos aparecem em **Mistos da casa**, **Pães e lanches**, **Ovos e omeletes**, **Quitandas do dia** e **Adicionais da casa**. Na aba **Cafés & bebidas**, aparecem **Cafés da casa**, **Sucos naturais** e **Cappuccinos especiais**.

As Quitandas agora ficam em sua própria categoria, antes dos adicionais. As opções pequenas em formato de lista foram removidas: todos os itens aparecem em cards maiores com foto, nome e preço.

## Arquivos principais

- `index.html` — estrutura, textos, categorias, preços e associação dos cards.
- `styles.css` — visual responsivo, tema claro/escuro e estilos das fotos.
- `script.js` — abas, troca de tema, rolagem suave e carregamento das fotos.
- `01_*.jpg` até `43_*.jpg` — fotos v2 dos produtos.
- `logo.jpg` — logo/identidade enviada.
- `render.yaml` — configuração opcional para o Render.
