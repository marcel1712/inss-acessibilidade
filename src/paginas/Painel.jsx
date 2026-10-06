import Icone from "../componentes/Icone.jsx";
import TopoApp from "../componentes/TopoApp.jsx";

const SERVICOS = [
  {
    nome: "Novo Pedido",
    descricao: "Pedir aposentadoria, auxílio ou outro benefício",
    icone: "mais",
    href: "#novo-pedido",
  },
  {
    nome: "Consultar Descontos do Benefício",
    descricao: "Ver o que está sendo descontado todo mês",
    icone: "chat",
    href: "#descontos",
  },
  {
    nome: "Extrato de Contribuições",
    descricao: "Ver tudo o que você já pagou ao INSS",
    icone: "documento",
    href: "#extrato-contribuicoes",
  },
  {
    nome: "Benefícios por Incapacidade",
    descricao: "Pedir ou acompanhar auxílio por doença",
    icone: "acessibilidade",
    href: "#incapacidade",
  },
  {
    nome: "Extratos e Comprovantes",
    descricao: "Baixar comprovantes para o banco ou o imposto de renda",
    icone: "pasta",
    href: "#comprovantes",
  },
  {
    nome: "Mais Serviços",
    descricao: "Ver a lista completa de serviços do INSS",
    icone: "reticencias",
    href: "#mais-servicos",
  },
];

/** Ilustração da assistente: decorativa, o nome já está no texto ao lado. */
function AvatarHelo() {
  return (
    <svg
      className="assistente__avatar"
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="32" cy="32" r="32" fill="#e8eefb" />
      <circle cx="32" cy="26" r="11" fill="#8d5524" />
      <path d="M21 25a11 11 0 0 1 22 0c0-8-4-13-11-13s-11 5-11 13z" fill="#3b2314" />
      <path d="M11 60a21 21 0 0 1 42 0z" fill="#10418c" />
    </svg>
  );
}

export default function Painel({ nome, aoSair, referenciaTitulo }) {
  return (
    <>
      <TopoApp aviso={1} aoSair={aoSair} />

      <main className="conteudo" id="conteudo">
        <section className="secao">
          <h1 ref={referenciaTitulo} tabIndex={-1} className="saudacao">
            Olá, {nome}
          </h1>
          <p className="campo__dica">
            Você entrou na sua conta gov.br. Seus dados estão protegidos.
          </p>
        </section>

        <section className="secao" aria-labelledby="servicos-para-voce">
          <h2 id="servicos-para-voce">Serviços para você</h2>
          {/* Rótulos inteiros, sem cortar com "...": nome cortado obriga a
              adivinhar o que o botão faz. Os cartões crescem junto com a letra. */}
          <ul className="grade-servicos">
            {SERVICOS.map((servico) => (
              <li key={servico.nome}>
                <a className="cartao-servico" href={servico.href}>
                  <span className="servico__icone">
                    <Icone nome={servico.icone} tamanho={26} />
                  </span>
                  <span className="servico__nome">{servico.nome}</span>
                  <span className="servico__descricao">
                    {servico.descricao}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="secao" aria-labelledby="ajuda">
          <h2 id="ajuda">Precisa de ajuda?</h2>

          <div className="caixa assistente">
            <div className="assistente__topo">
              <AvatarHelo />
              <div>
                <h3>Converse com a Helô</h3>
                <p>
                  Helô é a assistente virtual do INSS. Ela responde por mensagens
                  escritas, a qualquer hora.
                </p>
              </div>
            </div>
            <a className="botao botao--primario botao--bloco" href="#helo">
              <Icone nome="chat" />
              <span>Iniciar atendimento com a Helô</span>
            </a>
            <p className="campo__dica">
              Prefere falar com uma pessoa? Ligue grátis para a Central 135, de
              segunda a sábado, das 7h às 22h.
            </p>
          </div>

          <a className="servico" href="#canais-ajuda">
            <span className="servico__icone">
              <Icone nome="telefone" tamanho={26} />
            </span>
            <span className="servico__texto">
              <span className="servico__nome">Outros canais de ajuda</span>
              <span className="servico__descricao">
                Central 135, agências e atendimento presencial
              </span>
            </span>
            <span className="servico__seta">
              <Icone nome="seta-direita" tamanho={26} />
            </span>
          </a>
        </section>

        <button
          type="button"
          className="botao botao--secundario botao--bloco"
          onClick={aoSair}
        >
          <Icone nome="sair" />
          <span>Sair da conta</span>
        </button>
      </main>
    </>
  );
}
