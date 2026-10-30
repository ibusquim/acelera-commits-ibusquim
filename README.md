# Painel de bordo da AceleraOne

Bem-vindo à tripulação. Aqui é a Comandante Ada.

Este é o seu **repositório de desafio** do [Acelera Commits](https://github.com/apps/acelera-commits): um projeto
pequeno de verdade, no seu GitHub, onde você vai praticar git e GitHub com commits reais. Ele mostra o painel de
bordo da nave AceleraOne (combustível, motor, rota e tripulação) e tem testes automáticos que rodam a cada push.

## O que tem aqui

| Caminho | Para que serve |
|---|---|
| `index.html`, `styles.css` | a página do painel de bordo |
| `src/nave.js` | funções puras que fazem as contas da nave (combustível, motor, rota, decolagem) |
| `src/painel.js` | pega os dados da nave, chama as funções e escreve na página |
| `test/nave.test.js` | testes das funções, com o test runner que já vem no Node |
| `servidor.js` | servidor local mínimo para abrir o painel no navegador |
| `.acelera/` | arquivos que o jogo lê (não apague) |
| `.github/` | workflow de testes, template de PR e CODEOWNERS |

Nada aqui precisa de `npm install`: não há dependências.

## Como começar

Você precisa do [git](https://git-scm.com/) e do [Node.js](https://nodejs.org/) 22 ou mais novo.

```bash
git clone https://github.com/<seu-usuario>/<seu-repositorio>.git
cd <seu-repositorio>
```

### Rodar os testes

```bash
npm test
```

(É o mesmo que `node --test`.) Todos os testes devem passar. O GitHub Actions roda esse mesmo comando a cada push
e a cada pull request; o resultado aparece na aba **Actions** e nos seus PRs.

### Ver o painel no navegador

```bash
npm start
```

Abra <http://localhost:8080>. Para parar o servidor, use `Ctrl+C` no terminal.

> Por que não abrir o `index.html` direto? O painel usa módulos JavaScript (`import`), e os navegadores não
> carregam módulos a partir de arquivos locais (`file://`). O `servidor.js` resolve isso sem instalar nada.

## Missões do modo GitHub

Cada missão é validada pelo jogo a partir do que acontece neste repositório. Os briefings completos e as dicas
ficam no Acelera Commits; aqui vai só o mapa da rota.

### Capítulo 5: A ponte

- **5.3 Base de lançamento:** criar este repositório a partir do template e instalar o App só nele.
- **5.4 Clonar e se identificar:** clonar o repositório e registrar o seu código de tripulante em `.acelera/tripulante.yml`.
- **5.5 Rota no espaço real:** levar uma branch nova, com trabalho seu, até o GitHub.
- **5.B Chefe "Rejeitado!":** o Byte mexe em `main` enquanto você trabalha; envie o seu trabalho sem perder o dele.

### Capítulo 6: Doca de PRs

- **6.1 Primeiro PR:** abrir um pull request da sua branch para `main`.
- **6.2 PR que se explica:** preencher o template de PR e ligar o PR à issue que o Byte abriu.
- **6.3 Verde antes de juntar:** deixar os testes do PR passando no GitHub Actions.
- **6.4 Atender o review do Byte:** responder aos pedidos de mudança até o Byte aprovar.
- **6.5 Estratégias de merge:** mesclar um PR com a estratégia que a missão pede.
- **6.B Chefe "Colisão na doca":** resolver o conflito do seu PR com `main` do jeito que a missão pede.

## Regras de bordo

- Não apague nem edite `.acelera/marcador.yml`: é ele que mostra que este repositório veio do template oficial.
- Evite `git push --force` em `main`. Se acontecer, o jogo explica o que houve e você continua de onde parou.
- Mantenha o repositório público para participar das revisões entre colegas.

Boa viagem, tripulante.
