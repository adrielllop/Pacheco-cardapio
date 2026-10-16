# Pacheco Panificadora — Cardápio

Site estático premium pronto para publicar no GitHub e no Render.

## Publicar no Render

1. Envie todos os arquivos desta pasta para a raiz do repositório no GitHub.
2. No Render, escolha **New → Static Site** e conecte o repositório.
3. Deixe **Build Command** vazio e use `.` como **Publish Directory**.

## Design

O site usa uma linguagem editorial de padaria artesanal: tipografia serifada de alto contraste, paleta creme, verde profundo e terracota, cards de produto em formato de galeria, hierarquia de categorias, barra de assinatura da marca e microinterações.

A abertura foi redesenhada sem a logo ampliada. Em seu lugar há uma composição premium com fotos do Burger da Casa, Cappuccino Tradicional e Quitandas, com molduras de galeria e selo tipográfico discreto. Os elementos decorativos foram reduzidos para manter um visual adulto, elegante e limpo. A interface não usa emojis; os controles são textuais e maiores para melhor leitura.

O botão de tema alterna entre **claro** e **escuro**. A escolha fica salva no navegador e é reaplicada quando o visitante volta ao site.

A aba **Comidas & Lanches** tem as categorias Mistos da casa, Pães e lanches, Ovos e omeletes, Quitandas do dia e Adicionais da casa. A aba **Cafés & Bebidas** tem Cafés da casa, Sucos naturais e Cappuccinos especiais.

## Arquivos principais

- `index.html` — estrutura, textos, categorias, preços e galeria inicial.
- `styles.css` — identidade visual premium, galeria, responsividade e temas claro/escuro.
- `script.js` — abas, troca de tema, rolagem suave e carregamento das fotos.
- `01_*.jpg` a `04_*.jpg` e `06_*.jpg` a `43_*.jpg` — fotos v2 dos produtos exibidos.
- `logo.jpg` — logo usada no cabeçalho e rodapé.
- `render.yaml` — configuração opcional para o Render.
