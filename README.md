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
│   ├── BarraAcessibilidade.jsx  barra do eMAG (letra, contraste, Libras)
│   ├── Acordeao.jsx             padrão ARIA Disclosure
│   ├── Avisos.jsx               carrossel que NÃO anda sozinho
│   ├── CampoCPF.jsx             rótulo, dica, máscara e erro acessíveis
│   ├── CampoSenha.jsx           senha com alternador "Mostrar senha"
│   ├── TopoApp.jsx              barra do app logado, com menu e rótulos
│   ├── ListaServicos.jsx        lista semântica de serviços
│   ├── Icone.jsx                SVGs decorativos (aria-hidden)
│   ├── LogoINSS.jsx             marca com role="img"
│   └── Rodape.jsx
├── paginas/
├── utilidades/cpf.js          máscara e validação com mensagens úteis
└── styles/
    ├── tokens.css             cores, tipografia, espaçamento, temas
    ├── base.css               reset, foco visível, skip link
    └── componentes.css
```

## Decisões de acessibilidade

### Percepção
- **Contraste**: cores escolhidas acima de 4.5:1; texto principal e azul
  primário passam de 9:1 (WCAG 1.4.3). Tema de **alto contraste**
  (preto/amarelo) exigido pelo eMAG 1.9.
- **Tamanho de letra**: base de 18px e três níveis de ampliação pelo botão
  "Aumentar letra". Todo o CSS usa `rem`, então o layout cresce junto.
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
- **Nada se move sozinho**: o carrossel de avisos só muda quando a pessoa
  toca em Anterior/Próximo (WCAG 2.2.2). Nenhum tempo limite.
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
- **Menu** é um disclosure: fecha com Esc e devolve o foco ao botão Menu.
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

- **VLibras**: o botão existe e anuncia que o tradutor não está instalado
  nesta versão de estudo. Em produção, carrega-se o widget oficial de
  `vlibras.gov.br`.
- **Back-end**: o login é simulado. Com CPF válido, a tela só confirma que a
  próxima etapa é a senha.
# inss-acessibilidade
