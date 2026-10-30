// Servidor local mínimo para abrir o painel no navegador: `npm start` e acesse http://localhost:8080.
// Ele existe porque os navegadores não carregam módulos JavaScript (`import`) direto de arquivos (file://).

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const PASTA = fileURLToPath(new URL('.', import.meta.url));
const PORTA = Number(process.env.PORT) || 8080;

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
};

const servidor = createServer(async (requisicao, resposta) => {
  let caminho;
  try {
    caminho = decodeURIComponent(new URL(requisicao.url, 'http://localhost').pathname);
  } catch {
    resposta.writeHead(400).end('Endereço inválido');
    return;
  }
  const arquivo = normalize(join(PASTA, caminho === '/' ? 'index.html' : caminho));
  const tipo = TIPOS[extname(arquivo)];

  if (!arquivo.startsWith(PASTA.endsWith(sep) ? PASTA : PASTA + sep) || !tipo) {
    resposta.writeHead(404).end('Não encontrado');
    return;
  }

  try {
    const conteudo = await readFile(arquivo);
    resposta.writeHead(200, { 'Content-Type': tipo }).end(conteudo);
  } catch {
    resposta.writeHead(404).end('Não encontrado');
  }
});

servidor.listen(PORTA, () => {
  console.log(`Painel de bordo no ar: http://localhost:${PORTA}`);
});
