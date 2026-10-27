# Catálogo de Heróis

Projeto da atividade prática de Node.js e Express.

## Requisitos
- Node.js instalado
- npm instalado

## Como executar
1. Abra o terminal na pasta do projeto.
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor:

   ```bash
   npm start
   ```

4. Acesse `http://localhost:3030`.

## Rotas
- `/` — página inicial
- `/marvel` — página da Marvel
- `/dc` — página da DC
- `/personagem/:empresa/:nome` — página de um personagem

Exemplos:
- `http://localhost:3030/personagem/marvel/Thor`
- `http://localhost:3030/personagem/dc/Batman`

## Publicar no GitHub
Crie um repositório público no GitHub. Na pasta do projeto, execute:

```bash
git init
git add .
git commit -m "Atividade: catálogo de heróis com Express"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```

Substitua `SEU-USUARIO` e `SEU-REPOSITORIO` pelos dados do seu repositório.
