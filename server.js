const express = require('express');

const app = express();
const PORT = 3030;

// Personagens cadastrados por empresa
const personagens = {
  marvel: ['Spider-Man', 'Thor', 'Iron-Man'],
  dc: ['Batman', 'Superman', 'Wonder-Woman']
};

function listaDeLinks(empresa) {
  return personagens[empresa]
    .map(nome => {
      const nomeNaUrl = encodeURIComponent(nome);
      return `<li><a href="/personagem/${empresa}/${nomeNaUrl}">${nome.replaceAll('-', ' ')}</a></li>`;
    })
    .join('\n');
}

// Página inicial
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Catálogo de Heróis</title>
    </head>
    <body>
      <h1>Catálogo de Heróis</h1>
      <p>Bem-vindo(a) ao catálogo de personagens da Marvel e da DC!</p>

      <h2>Empresas</h2>
      <ul>
        <li><a href="/marvel">Marvel</a></li>
        <li><a href="/dc">DC</a></li>
      </ul>

      <hr>

      <h2>Personagens</h2>
      <ul>
        <li><a href="/personagem/marvel/Spider-Man">Spider-Man</a></li>
        <li><a href="/personagem/marvel/Thor">Thor</a></li>
        <li><a href="/personagem/dc/Batman">Batman</a></li>
        <li><a href="/personagem/dc/Superman">Superman</a></li>
      </ul>
    </body>
    </html>
  `);
});

// Página da Marvel
app.get('/marvel', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Marvel</title>
    </head>
    <body>
      <h1>Marvel</h1>
      <p>A Marvel é uma empresa conhecida por seus super-heróis e histórias em quadrinhos.</p>
      <h2>Personagens disponíveis</h2>
      <ul>${listaDeLinks('marvel')}</ul>
      <p><a href="/">Voltar à página inicial</a></p>
    </body>
    </html>
  `);
});

// Página da DC
app.get('/dc', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>DC</title>
    </head>
    <body>
      <h1>DC</h1>
      <p>A DC é uma editora conhecida por personagens como Batman, Superman e Mulher-Maravilha.</p>
      <h2>Personagens disponíveis</h2>
      <ul>${listaDeLinks('dc')}</ul>
      <p><a href="/">Voltar à página inicial</a></p>
    </body>
    </html>
  `);
});

// Rota com dois parâmetros obrigatórios: empresa e nome
app.get('/personagem/:empresa/:nome', (req, res) => {
  const empresa = req.params.empresa.toLowerCase();
  const nome = req.params.nome;

  const empresaValida = Object.prototype.hasOwnProperty.call(personagens, empresa);
  const personagemValido = empresaValida &&
    personagens[empresa].some(p => p.toLowerCase() === nome.toLowerCase());

  if (!empresaValida || !personagemValido) {
    return res.status(404).send(`
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head><meta charset="UTF-8"><title>Personagem não encontrado</title></head>
      <body>
        <h1>Personagem não encontrado</h1>
        <p>Não foi encontrado um personagem com os dados informados.</p>
        <p><a href="/">Voltar à página inicial</a></p>
      </body>
      </html>
    `);
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${nome.replaceAll('-', ' ')}</title>
    </head>
    <body>
      <h1>Informações do personagem</h1>
      <p><strong>Empresa:</strong> ${empresa.toUpperCase()}</p>
      <p><strong>Personagem:</strong> ${nome.replaceAll('-', ' ')}</p>
      <p><a href="/${empresa}">Ver outros personagens da ${empresa.toUpperCase()}</a></p>
      <p><a href="/">Voltar à página inicial</a></p>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado em http://localhost:${PORT}`);
});
