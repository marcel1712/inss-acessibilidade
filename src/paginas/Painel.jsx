import { useState } from "react";
import Icone from "../componentes/Icone.jsx";
import TopoApp from "../componentes/TopoApp.jsx";
import Dialogo from "../componentes/Dialogo.jsx";

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
    icone: "porcentagem",
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
      <circle cx="32" cy="32" r="32" fill="#e8f0fc" />
      <circle cx="32" cy="26" r="11" fill="#8d5524" />
      <path
        d="M21 25a11 11 0 0 1 22 0c0-8-4-13-11-13s-11 5-11 13z"
        fill="#3b2314"
      />
      <path d="M11 60a21 21 0 0 1 42 0z" fill="#1351b4" />
    </svg>
  );
}

export default function Painel({ nome, aoSair, referenciaTitulo }) {
  const [confirmandoSaida, setConfirmandoSaida] = useState(false);
  const pedirParaSair = () => setConfirmandoSaida(true);

  return (
    <>
      <TopoApp aviso={1} aoSair={pedirParaSair} />

      <main id="conteudo" className="principal">
        <div className="faixa-saudacao">
          <div className="container faixa-saudacao__interno">
            <h1 ref={referenciaTitulo} tabIndex={-1}>
              Olá, {nome}
            </h1>
            <p>
              <Icone nome="escudo" tamanho={22} />
              <span>
                Você entrou com a sua conta gov.br. Seus dados estão protegidos.
              </span>
            </p>
          </div>
        </div>

        <div className="conteudo">
          <section className="secao" aria-labelledby="servicos-para-voce">
            <div className="secao__cabecalho">
              <h2 id="servicos-para-voce">Serviços para você</h2>
            </div>
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
            <div className="secao__cabecalho">
              <h2 id="ajuda">Precisa de ajuda?</h2>
            </div>

            <div className="ajuda-grade">
              <div className="caixa assistente">
                <div className="assistente__topo">
                  <AvatarHelo />
                  <div>
                    <h3>Converse com a Helô</h3>
                    <p>
                      Helô é a assistente virtual do INSS. Ela responde por
                      mensagens escritas, a qualquer hora.
                    </p>
                  </div>
                </div>
                <a className="botao botao--primario botao--bloco" href="#helo">
                  <Icone nome="chat" />
                  <span>Conversar com a Helô</span>
                </a>
              </div>

              <div className="caixa caixa--ajuda">
                <p className="caixa__titulo">
                  <Icone nome="telefone" />
                  <span>Prefere falar com uma pessoa?</span>
                </p>
                <p>
                  Ligue grátis para a <strong>Central 135</strong>, de segunda a
                  sábado, das 7h às 22h.
                </p>
                <a className="link-seta" href="#canais-ajuda">
                  <span>Ver agências e outros canais</span>
                  <Icone nome="seta-direita" tamanho={20} />
                </a>
              </div>
            </div>
          </section>

          <button
            type="button"
            className="botao botao--secundario botao--sair"
            onClick={pedirParaSair}
          >
            <Icone nome="sair" />
            <span>Sair da conta</span>
          </button>
        </div>
      </main>

      <Dialogo
        aberto={confirmandoSaida}
        titulo="Quer mesmo sair da conta?"
        descricao="Para ver seus dados de novo, você vai precisar digitar o CPF e a senha do gov.br."
        rotuloCancelar="Não, continuar aqui"
        rotuloConfirmar="Sim, sair da conta"
        aoCancelar={() => setConfirmandoSaida(false)}
        aoConfirmar={() => {
          setConfirmandoSaida(false);
          aoSair();
        }}
      />
    </>
  );
}
