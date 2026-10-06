import { useRef, useState } from "react";
import Icone from "../componentes/Icone.jsx";
import CampoSenha from "../componentes/CampoSenha.jsx";
import Acordeao from "../componentes/Acordeao.jsx";

/** Nesta versão de estudo, qualquer senha com 8 caracteres ou mais entra. */
function validarSenha(senha) {
  if (senha.trim().length === 0) {
    return "Digite a sua senha do gov.br para entrar.";
  }
  if (senha.length < 8) {
    return `A senha do gov.br tem pelo menos 8 caracteres. Você digitou ${senha.length}. Confira e complete.`;
  }
  return null;
}

export default function Senha({ cpf, aoVoltar, aoEntrar, referenciaTitulo }) {
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const campoRef = useRef(null);

  function enviar(evento) {
    evento.preventDefault();
    const mensagem = validarSenha(senha);
    setErro(mensagem);

    if (mensagem) {
      campoRef.current?.focus();
      return;
    }
    aoEntrar();
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
          <span>Voltar e corrigir o CPF</span>
        </button>
        <p className="cabecalho__marca">gov.br</p>
      </header>

      <main className="conteudo" id="conteudo">
        <section className="secao">
          <p className="passos">Etapa 2 de 2: senha. É a última etapa.</p>
          <div className="barra-progresso" aria-hidden="true">
            <div
              className="barra-progresso__preenchimento"
              style={{ width: "100%" }}
            />
          </div>

          <h1 ref={referenciaTitulo} tabIndex={-1}>
            Digite sua senha
          </h1>

          {/* Mostrar o CPF confirmado evita que a pessoa fique na dúvida se
              digitou certo na etapa anterior (WCAG 3.3.4). */}
          <p className="confirmacao">
            Entrando com o CPF <strong>{cpf}</strong>.{" "}
            <button type="button" className="botao-texto" onClick={aoVoltar}>
              Não é esse CPF? Corrigir
            </button>
          </p>

          <form onSubmit={enviar} noValidate className="secao">
            <CampoSenha
              valor={senha}
              aoMudar={(valor) => {
                setSenha(valor);
                if (erro) setErro(null);
              }}
              erro={erro}
              referencia={campoRef}
            />

            <button type="submit" className="botao botao--primario botao--bloco">
              <Icone nome="entrar" />
              <span>Entrar</span>
            </button>

            <p>
              <a href="#esqueci-senha">Esqueci a minha senha</a>
            </p>
          </form>

          <Acordeao titulo="Não lembro a minha senha. E agora?">
            <ol>
              <li>
                Toque em <strong>Esqueci a minha senha</strong>.
              </li>
              <li>
                O gov.br envia um código para o seu e-mail ou celular
                cadastrado.
              </li>
              <li>Digite o código e crie uma senha nova.</li>
            </ol>
            <p>
              Se você não tem mais acesso ao e-mail nem ao celular cadastrados,
              ligue para a Central 135.
            </p>
          </Acordeao>

          <div className="caixa caixa--ajuda">
            <p className="caixa__titulo">
              <Icone nome="alerta" />
              <span>Nunca diga a sua senha a ninguém</span>
            </p>
            <p>
              O INSS e o gov.br <strong>não ligam</strong> pedindo senha, código
              ou dinheiro. Se alguém pedir, desligue e ligue para a Central 135.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
