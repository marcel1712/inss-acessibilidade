# Meu INSS — releitura acessível

Recriação das telas de entrada do aplicativo Meu INSS com foco em
**público idoso**, seguindo **WCAG 2.2 nível AA** e o **eMAG 3.1**
(Modelo de Acessibilidade em Governo Eletrônico).

Projeto de estudo. Não tem ligação oficial com o INSS nem com o gov.br.

## Como rodar

```bash
npm install
npm run dev      # ambiente de desenvolvimento
npm run build    # gera a versão de produção em dist/
npm run preview  # serve a versão de produção
```

## Telas

| Tela | Arquivo |
| --- | --- |
| Início (Meu INSS, avisos, serviços sem senha) | [src/paginas/Inicio.jsx](src/paginas/Inicio.jsx) |
| Entrar com gov.br — etapa 1 de 2: CPF | [src/paginas/Login.jsx](src/paginas/Login.jsx) |
| Entrar com gov.br — etapa 2 de 2: senha | [src/paginas/Senha.jsx](src/paginas/Senha.jsx) |
| Área logada (serviços para você, assistente Helô) | [src/paginas/Painel.jsx](src/paginas/Painel.jsx) |

Fluxo: Início → CPF → Senha → Área logada → Sair volta ao Início.
Qualquer senha com 8 caracteres ou mais entra (não há back-end).

A navegação entre telas é um estado simples em [src/App.jsx](src/App.jsx),
sem biblioteca de rotas — a troca de tela atualiza o `<title>` e move o foco
para o `<h1>` da nova tela.

## Estrutura

```
src/
├── App.jsx                    troca de tela + gestão de foco e título
├── contexto/
│   └── AcessibilidadeContexto.jsx   fonte, contraste e avisos ao leitor de tela
├── componentes/
│   ├── BarraAcessibilidade.jsx  faixa gov.br + barra do eMAG (letra, contraste, Libras)
│   ├── GrupoOpcoes.jsx          padrão ARIA Radio Group
│   ├── MenuPrincipal.jsx        padrão ARIA Menubar com submenus
│   ├── Dialogo.jsx              padrão ARIA Dialog (modal)
│   ├── Acordeao.jsx             padrão ARIA Disclosure
│   ├── Avisos.jsx               padrão ARIA Tabs (nada anda sozinho)
│   ├── CampoCPF.jsx             rótulo, dica, máscara e erro acessíveis
│   ├── CampoSenha.jsx           senha com alternador "Mostrar senha"
│   ├── TopoApp.jsx              barra do app logado, com menu e rótulos
│   ├── CabecalhoGov.jsx         cabeçalho das telas de CPF e senha
│   ├── Passos.jsx               "Etapa 1 de 2"
│   ├── ListaServicos.jsx        lista semântica de serviços
│   ├── Icone.jsx                SVGs decorativos (aria-hidden)
│   ├── LogoINSS.jsx             marca do INSS (imagem com alt)
│   └── Rodape.jsx
├── paginas/
├── utilidades/cpf.js          máscara e validação com mensagens úteis
└── styles/
    ├── tokens.css             cores, tipografia, espaçamento, temas
    ├── base.css               reset, foco visível, skip link
    └── componentes.css
```

## WAI-ARIA usado (requisito do trabalho)

Quatro widgets completos, seguindo o [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/).
A explicação detalhada está no relatório [docs/relatorio-acessibilidade.pdf](docs/relatorio-acessibilidade.pdf).

| Widget | Onde | Papéis e estados | Arquivo |
| --- | --- | --- | --- |
| Grupo de opções | Tamanho da letra (topo) e "Como você quer entrar?" (login) | `radiogroup`, `radio`, `aria-checked`, `aria-labelledby`, `aria-describedby` | [GrupoOpcoes.jsx](src/componentes/GrupoOpcoes.jsx) |
| Menu com subitens | Menu principal da área logada | `menubar`, `menu`, `menuitem`, `aria-haspopup`, `aria-expanded`, `aria-orientation` | [MenuPrincipal.jsx](src/componentes/MenuPrincipal.jsx) |
| Abas | Avisos importantes (tela inicial) | `tablist`, `tab`, `tabpanel`, `aria-selected`, `aria-controls` | [Avisos.jsx](src/componentes/Avisos.jsx) |
| Diálogo modal | Confirmação "Quer mesmo sair da conta?" | `dialog`, `aria-modal`, `aria-labelledby`, `aria-describedby` | [Dialogo.jsx](src/componentes/Dialogo.jsx) |

Também: painel "Acessibilidade" no celular e acordeão (disclosure, `aria-expanded` + `aria-controls`), alternador de contraste
(`aria-pressed`), região viva (`aria-live`, `role="alert"`) e campos com
`aria-describedby` / `aria-invalid`.

## Decisões de acessibilidade

### Percepção
- **Contraste**: cores escolhidas acima de 4.5:1; texto principal e azul
  primário passam de 9:1 (WCAG 1.4.3). Tema de **alto contraste**
  (preto/amarelo) exigido pelo eMAG 1.9.
- **Tamanho de letra**: base de 18px e três tamanhos (Normal, Grande, Maior)
  escolhidos num grupo de opções, todos visíveis de uma vez. Todo o CSS usa `rem`, então o layout cresce junto.
  A preferência fica salva no `localStorage`.
- **Nunca só cor**: erro tem ícone + borda grossa + texto; o botão de
  contraste mostra "Ligado/Desligado" por escrito (WCAG 1.4.1).
- **Espaçamento de linha** de 1.6 e coluna única, sem texto justificado.

### Operação
- **Alvos de toque** de no mínimo 48×48px (WCAG 2.5.8) — mão trêmula
  erra alvos pequenos.
- **Foco visível** com anel duplo (azul escuro + halo amarelo), visível
  em qualquer fundo (WCAG 2.4.7 / 2.4.13).
- **Link "Ir direto para o conteúdo"** como primeiro item tabulável.
- **Nada se move sozinho**: os avisos ficam em abas e só trocam quando a
  pessoa escolhe (WCAG 2.2.2). Nenhum tempo limite.
- **Libras com o VLibras**, o tradutor oficial do Governo Federal: o botão
  "Libras" da barra abre o intérprete (script carregado em `index.html`).
- **Barra de acessibilidade discreta**: uma linha fina no computador; no
  celular, um botão "Acessibilidade" abre as opções em tamanho grande.
- **Fonte Atkinson Hyperlegible**, criada para leitores com baixa visão
  (diferencia bem I/l/1 e 0/O — útil para CPF).
- `prefers-reduced-motion` desliga as transições.

### Compreensão
- **Linguagem simples**, frases curtas, voz ativa. "Serviços que não precisam
  de senha" no lugar de "Serviços sem senha"; cada serviço tem uma linha
  explicando o que ele faz.
- **Erros que ensinam**: "Falta 1 número no CPF. Você digitou 10 de 11.
  Confira no seu documento e complete" (WCAG 3.3.1 e 3.3.3).
- **Passo a passo visível**: "Etapa 1 de 2: CPF. Depois: senha."
- **Canal humano sempre à vista**: a Central 135 aparece nas duas telas.

### Na área logada
- **Ícones do topo com rótulo visível** (Menu, Buscar, Avisos). Ícone sozinho
  exige conhecer o símbolo de antemão; texto visível também garante que o
  nome falado bate com o escrito (WCAG 2.5.3).
- **Nome de serviço nunca cortado**: nada de "Consultar Descontos de...".
  Rótulo inteiro mais uma linha dizendo o que o serviço faz.
- **Cartões em grade elástica**: `minmax` em `rem` faz a grade virar coluna
  única sozinha quando a letra aumenta (WCAG 1.4.10 — refluxo).
- **Menu** com subitens (menubar): setas, Esc e Home/End; horizontal no
  computador e vertical no celular.
- **Sair pede confirmação** num diálogo modal com o foco na opção segura.
- **Senha visível sob demanda**: bolinhas escondidas são causa comum de erro
  de digitação; o botão alterna com `aria-pressed`.
- **Sair da conta** aparece no menu e no fim da página, e o retorno à tela
  inicial é anunciado na região `aria-live`.

### Robustez
- HTML semântico: `header`, `nav`, `main`, `footer`, listas de verdade,
  hierarquia de títulos sem pulos.
- `aria-expanded` + `aria-controls` no acordeão; `aria-pressed` no botão de
  contraste; `aria-describedby` ligando campo, dica e erro.
- Região `aria-live` permanente para avisos de sistema, e `role="alert"`
  no erro do formulário.
- Foco devolvido ao campo com erro após o envio.

## O que ficou de fora (e por quê)

- **Back-end**: o login é simulado. Com CPF válido, a tela só confirma que a
  próxima etapa é a senha.
# inss-acessibilidade
