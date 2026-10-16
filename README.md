# Pacheco Panificadora — Cardápio

Site estático premium pronto para publicar no GitHub e no Render.

## Publicar no Render

1. Envie todos os arquivos desta pasta para a raiz do repositório no GitHub.
2. No Render, escolha **New → Static Site** e conecte o repositório.
3. Deixe **Build Command** vazio e use `.` como **Publish Directory**.

## Design

O site usa uma linguagem editorial de padaria artesanal: tipografia serifada de alto contraste, paleta creme, verde profundo e terracota, cards de produto em formato de galeria, hierarquia de categorias, barra de assinatura da marca e microinterações.

A abertura usa uma composição premium com fotos do Burger da Casa, Cappuccino Tradicional e Quitandas, com molduras de galeria e selo tipográfico discreto. Os elementos decorativos foram reduzidos para manter um visual adulto, elegante e limpo. A interface não usa emojis; os controles são textuais e maiores para melhor leitura.

O botão de tema alterna entre **claro** e **escuro**. A escolha fica salva no navegador e é reaplicada quando o visitante volta ao site.

## Funcionalidades interativas

- Pesquisa instantânea por nome e ingredientes, sem diferenciar maiúsculas, minúsculas ou acentos, funcionando em todas as categorias.
- Mensagem de estado vazio com botão para limpar a pesquisa.
- Modal acessível com foto ampliada, descrição, preço e sugestões de produtos já cadastrados.
- Navegação rápida por categorias, adaptada para celular.
- Favoritos pessoais com coração e seção **Meus Favoritos**, salvos no navegador e removíveis individualmente.
- Misto Completo e Misto Simples continuam como os dois principais destaques da padaria.
- Ordenação por recomendação, nome e preço.
- Indicador automático de aberto ou fechado usando o fuso `America/Sao_Paulo`, válido para Rio Verde, Goiás.
- Botão flutuante para voltar ao topo.
- Produtos podem ser marcados no HTML com `data-available="false"` para exibir o selo **Indisponível** sem remover o item do cardápio. Nenhum produto foi marcado sem informação confiável.
- Imagens com carregamento tardio, decodificação assíncrona e compressão progressiva para celulares.
- Navegação por teclado, foco visível, `aria` e respeito a `prefers-reduced-motion`.

O site continua sendo exclusivamente um cardápio digital de consulta. Não há carrinho, checkout, pagamentos ou sistema de pedidos.

## Arquivos principais

- `index.html` — estrutura, textos, categorias, preços, destaques e modal.
- `styles.css` — identidade visual premium, responsividade, temas e acessibilidade.
- `script.js` — busca, filtros, favoritos, modal, sugestões, status de funcionamento e navegação.
- `01_*.jpg` a `04_*.jpg` e `06_*.jpg` a `43_*.jpg` — fotos dos produtos exibidos.
- `logo.jpg` — logo usada no cabeçalho e rodapé.
- `render.yaml` — configuração opcional para o Render.
