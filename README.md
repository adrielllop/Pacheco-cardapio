# Pacheco Panificadora — Cardápio

Site estático pronto para publicar no GitHub e no Render.

## Publicar no Render

1. Crie um repositório no GitHub e envie **todos os arquivos desta pasta para a raiz do repositório**.
2. No Render, escolha **New → Static Site** e conecte o repositório.
3. Use estas configurações:
   - **Build Command:** deixe vazio
   - **Publish Directory:** `.`
4. Confirme o deploy.

## Fotos dos produtos

As **43 fotos recebidas** já estão na raiz do projeto, numeradas de `01_` a `43_`, e foram ligadas ao produto correspondente no cardápio. A numeração segue o ZIP original:

- `01` a `19`: comidas, lanches e mistos especiais.
- `20` a `27`: adicionais.
- `28` a `37`: cafés e sucos.
- `38` a `43`: cappuccinos, chantilly e canela.

Para trocar uma foto depois, mantenha o mesmo nome do arquivo ou atualize o atributo `data-image` no card correspondente em `index.html` e a lista de imagens em `script.js`.

## Arquivos principais

- `index.html` — estrutura, textos, cardápio, preços e associação dos cards.
- `styles.css` — visual responsivo, tema claro/escuro e estilos das fotos.
- `script.js` — abas, troca de tema, rolagem suave e carregamento das 43 fotos.
- `01_*.jpg` até `43_*.jpg` — fotos dos produtos recebidas.
- `logo.jpg` — logo/identidade enviada.
- `cardapio-comidas.jpg` e `cardapio-cafes.jpg` — referências originais do cardápio.
- `render.yaml` — configuração opcional para o Render.
