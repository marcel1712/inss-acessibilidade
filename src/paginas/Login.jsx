import { useRef, useState } from "react";
import Icone from "../componentes/Icone.jsx";
import CampoCPF from "../componentes/CampoCPF.jsx";
import Acordeao from "../componentes/Acordeao.jsx";
import GrupoOpcoes from "../componentes/GrupoOpcoes.jsx";
import CabecalhoGov from "../componentes/CabecalhoGov.jsx";
import Passos from "../componentes/Passos.jsx";
import { validarCPF } from "../utilidades/cpf.js";

const FORMAS_DE_ENTRAR = [
  {
    valor: "cpf",
    icone: "carteira",
    rotulo: "CPF e senha",
    descricao: "O jeito mais comum. Use o CPF e a senha do gov.br.",
  },
  {
    valor: "banco",
    icone: "banco",
    rotulo: "Pelo seu banco",
    descricao: "Use o acesso do banco onde você já tem conta.",
  },
  {
    valor: "app",
    icone: "celular",
    rotulo: "Aplicativo gov.br",
    descricao: "Se você já tem o aplicativo gov.br no celular.",
  },
  {
    valor: "certificado",
    icone: "escudo",
    rotulo: "Certificado digital",
    descricao: "Para quem tem certificado em cartão ou token.",
  },
];

export default function Login({
  cpf: cpfInicial,
  aoVoltar,
  aoConfirmarCpf,
  referenciaTitulo,
}) {
  const [forma, setForma] = useState("cpf");
  const [cpf, setCpf] = useState(cpfInicial ?? "");
  const [erro, setErro] = useState(null);
  const campoRef = useRef(null);
  const formaEscolhida = FORMAS_DE_ENTRAR.find((item) => item.valor === forma);

  function enviar(evento) {
    evento.preventDefault();
    const mensagem = validarCPF(cpf);
    setErro(mensagem);

    // Erro: devolve o foco ao campo que precisa ser corrigido (WCAG 3.3.1).
    if (mensagem) {
      campoRef.current?.focus();
      return;
    }
    aoConfirmarCpf(cpf);
  }

  return (
    <>
      <CabecalhoGov rotuloVoltar="Voltar ao Meu INSS" aoVoltar={aoVoltar} />

      <main id="conteudo" className="principal principal--cinza">
        <div className="conteudo conteudo--estreito">
          <div className="cartao-formulario">
            <Passos atual={1} />

            <h1 ref={referenciaTitulo} tabIndex={-1}>
              Entrar no Meu INSS
            </h1>
            <p>
              Serve para entrar ou para criar sua conta gov.br. É gratuito e
              leva poucos minutos.
            </p>

            <GrupoOpcoes
              titulo="Como você quer entrar?"
              opcoes={FORMAS_DE_ENTRAR}
              valor={forma}
              aoMudar={setForma}
            />

            {forma === "cpf" ? (
              /* noValidate: a validação do navegador some rápido demais e some
                 também para leitores de tela. Fazemos a nossa, que fica na tela. */
              <form onSubmit={enviar} noValidate className="secao">
                <CampoCPF
                  valor={cpf}
                  aoMudar={(valor) => {
                    setCpf(valor);
                    if (erro) setErro(null);
                  }}
                  erro={erro}
                  referencia={campoRef}
                />

                <button
                  type="submit"
                  className="botao botao--primario botao--bloco"
                >
                  <span>Continuar</span>
                  <Icone nome="seta-direita" tamanho={22} />
                </button>
              </form>
            ) : (
              <div className="caixa caixa--info">
                <p className="caixa__titulo">
                  <Icone nome={formaEscolhida.icone} />
                  <span>{formaEscolhida.rotulo}</span>
                </p>
                <p>
                  Nesta versão de estudo, só a entrada com{" "}
                  <strong>CPF e senha</strong> funciona. No Meu INSS de verdade,
                  esta opção levaria você para a tela de{" "}
                  {formaEscolhida.rotulo.toLowerCase()}.
                </p>
              </div>
            )}

            <Acordeao nivel={2} titulo="Onde encontro o meu CPF?">
              <p>O número do CPF está escrito em:</p>
              <ol className="passos-numerados">
                <li>Cartão do CPF ou documento de identidade (RG ou CNH).</li>
                <li>Cartão do banco ou extrato do benefício.</li>
                <li>Carteira de trabalho.</li>
              </ol>
              <p>
                Se não encontrar, ligue para a Central 135 e peça ajuda a um
                atendente.
              </p>
            </Acordeao>
          </div>

          <div className="caixa caixa--sucesso">
            <p className="caixa__titulo">
              <Icone nome="certo" />
              <span>Sem desafios de imagens</span>
            </p>
            <p>
              A segurança é verificada automaticamente. Não vamos pedir para
              você identificar semáforos ou copiar letras tortas.
            </p>
          </div>

          <div className="caixa caixa--ajuda">
            <p className="caixa__titulo">
              <Icone nome="telefone" />
              <span>Precisa de ajuda para entrar?</span>
            </p>
            <p>
              Ligue grátis para a <strong>Central 135</strong>, de segunda a
              sábado, das 7h às 22h.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
