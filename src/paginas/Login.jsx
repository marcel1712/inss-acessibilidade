import { useRef, useState } from "react";
import Icone from "../componentes/Icone.jsx";
import CampoCPF from "../componentes/CampoCPF.jsx";
import Acordeao from "../componentes/Acordeao.jsx";
import { validarCPF } from "../utilidades/cpf.js";

const OUTRAS_FORMAS = [
  {
    icone: "banco",
    nome: "Pelo seu banco",
    descricao: "Use o acesso do banco onde você já tem conta.",
  },
  {
    icone: "celular",
    nome: "Pelo aplicativo gov.br",
    descricao: "Se você já tem o aplicativo gov.br instalado no celular.",
  },
  {
    icone: "escudo",
    nome: "Com certificado digital",
    descricao: "Para quem tem certificado digital em cartão ou token.",
  },
];

export default function Login({
  cpf: cpfInicial,
  aoVoltar,
  aoConfirmarCpf,
  referenciaTitulo,
}) {
  const [cpf, setCpf] = useState(cpfInicial ?? "");
  const [erro, setErro] = useState(null);
  const campoRef = useRef(null);

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
      <header className="cabecalho cabecalho--interno">
        <button
          type="button"
          className="botao botao--secundario botao--navegacao"
          onClick={aoVoltar}
        >
          <Icone nome="voltar" tamanho={22} />
          <span>Voltar ao Meu INSS</span>
        </button>
        <p className="cabecalho__marca">gov.br</p>
      </header>

      <main className="conteudo" id="conteudo">
        <section className="secao">
          <p className="passos">Etapa 1 de 2: CPF. Depois: senha.</p>
          <div className="barra-progresso" aria-hidden="true">
            <div
              className="barra-progresso__preenchimento"
              style={{ width: "50%" }}
            />
          </div>

          <h1 ref={referenciaTitulo} tabIndex={-1}>
            Digite seu CPF para entrar
          </h1>
          <p>
            Serve para entrar ou para criar sua conta gov.br. É gratuito e leva
            poucos minutos.
          </p>

          {/* noValidate: a validação do navegador some rápido demais e some
              também para leitores de tela. Fazemos a nossa, que fica na tela. */}
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

            <button type="submit" className="botao botao--primario botao--bloco">
              Continuar
            </button>
          </form>

          <Acordeao titulo="Onde encontro o meu CPF?">
            <p>O número do CPF está escrito em:</p>
            <ol>
              <li>Cartão do CPF ou documento de identidade (RG ou CNH).</li>
              <li>Cartão do banco ou extrato do benefício.</li>
              <li>Carteira de trabalho.</li>
            </ol>
            <p>
              Se não encontrar, ligue para a Central 135 e peça ajuda a um
              atendente.
            </p>
          </Acordeao>

          <div className="caixa caixa--sucesso">
            <p className="caixa__titulo">
              <Icone nome="certo" />
              <span>Você não precisa resolver desafios de imagens</span>
            </p>
            <p>
              A segurança é verificada automaticamente. Não vamos pedir para
              você identificar semáforos ou copiar letras tortas.
            </p>
          </div>
        </section>

        <section className="secao" aria-labelledby="outras-formas">
          <h2 id="outras-formas">Outras formas de entrar</h2>
          <p>
            Se preferir, use uma destas opções no lugar do CPF e senha.
          </p>
          <ul className="servicos">
            {OUTRAS_FORMAS.map((forma) => (
              <li key={forma.nome}>
                <button type="button" className="opcao">
                  <span className="servico__icone">
                    <Icone nome={forma.icone} tamanho={26} />
                  </span>
                  <span className="servico__texto">
                    <span className="servico__nome">{forma.nome}</span>
                    <span className="servico__descricao">
                      {forma.descricao}
                    </span>
                  </span>
                  <span className="servico__seta">
                    <Icone nome="seta-direita" tamanho={26} />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

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
      </main>
    </>
  );
}
