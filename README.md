# Partida Dobrada — versão modular segura

Esta pasta separa o arquivo original em partes principais sem reescrever a lógica da aplicação:

- `index.html`: estrutura da página;
- `css/app.css`: estilos atuais;
- `css/tokens.css`: tokens de design;
- `js/legacy.js`: lógica original preservada;
- `js/main.js`: ponto de entrada ES Module;
- `tests/`: testes automatizados básicos;
- `scripts/check-size.mjs`: verificação de peso dos ficheiros.

## Como executar

```bash
python3 -m http.server 8080
```

Abra `http://localhost:8080`.

## Testes

O projeto usa o runner nativo do Node.js, sem dependências adicionais:

```bash
npm test
npm run test:watch
npm run check:size
```

Os testes verificam a presença dos pontos de entrada, ecrãs, IDs e atributos `data-*` que a lógica atual utiliza. Eles são testes de regressão estrutural: se uma futura refatoração remover um ID ou alterar um caminho, o teste falha imediatamente.

## Estratégia de migração

A lógica atual continua em `legacy.js`. A migração pode continuar extraindo, um de cada vez, os blocos para:

```text
js/state.js
js/ui/header.js
js/ui/navigation.js
js/features/simulator.js
js/features/glossary.js
js/render/home.js
js/render/lesson.js
```

Os IDs e atributos `data-*` foram mantidos para reduzir o risco de quebra.
