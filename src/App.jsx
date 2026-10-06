import { useEffect, useRef, useState } from "react";
import BarraAcessibilidade from "./componentes/BarraAcessibilidade.jsx";
import Rodape from "./componentes/Rodape.jsx";
import Inicio from "./paginas/Inicio.jsx";
import Login from "./paginas/Login.jsx";
import Senha from "./paginas/Senha.jsx";
import Painel from "./paginas/Painel.jsx";
import { useAcessibilidade } from "./contexto/AcessibilidadeContexto.jsx";

const TITULOS = {
  inicio: "Meu INSS — Serviços do INSS pelo celular",
  login: "Digite seu CPF — Entrar no Meu INSS",
  senha: "Digite sua senha — Entrar no Meu INSS",
  painel: "Meus serviços — Meu INSS",
};

/** Nome que viria do gov.br depois do login. */
const USUARIO = { nome: "Luiz" };

export default function App() {
  const [pagina, setPagina] = useState("inicio");
  const [cpf, setCpf] = useState("");
  const tituloRef = useRef(null);
  const primeiraRenderizacao = useRef(true);
  const { recado, anunciar } = useAcessibilidade();

  // Troca de tela: atualiza o <title> e leva o foco para o título da página.
  // Sem isso, quem usa leitor de tela ou teclado continua "preso" no fim da
  // página anterior (WCAG 2.4.3 e 2.4.2).
  useEffect(() => {
    document.title = TITULOS[pagina];
    // Na primeira carga não mexemos no foco: ele deve começar no link
    // "Ir direto para o conteúdo".
    if (primeiraRenderizacao.current) {
      primeiraRenderizacao.current = false;
      return;
    }
    tituloRef.current?.focus();
  }, [pagina]);

  function sair() {
    setPagina("inicio");
    setCpf("");
    anunciar("Você saiu da sua conta. Voltamos para a tela inicial do Meu INSS.");
  }

  return (
    <div className="app">
      <a className="pular-para-conteudo" href="#conteudo">
        Ir direto para o conteúdo
      </a>

      <BarraAcessibilidade
        aoPedirLibras={() =>
          anunciar(
            "Tradução em Libras: nesta versão de estudo, o tradutor VLibras ainda não está instalado.",
          )
        }
      />

      {/* Região viva única para avisos de sistema (mudou a fonte, o contraste...).
          Fica sempre no DOM: regiões criadas na hora não são anunciadas. */}
      <p className="apenas-leitor-tela" role="status" aria-live="polite">
        {recado}
      </p>

      {pagina === "inicio" && (
        <Inicio
          referenciaTitulo={tituloRef}
          aoEntrar={() => setPagina("login")}
        />
      )}

      {pagina === "login" && (
        <Login
          referenciaTitulo={tituloRef}
          cpf={cpf}
          aoConfirmarCpf={(valor) => {
            setCpf(valor);
            setPagina("senha");
          }}
          aoVoltar={() => setPagina("inicio")}
        />
      )}

      {pagina === "senha" && (
        <Senha
          referenciaTitulo={tituloRef}
          cpf={cpf}
          aoVoltar={() => setPagina("login")}
          aoEntrar={() => {
            setPagina("painel");
            anunciar(`Pronto, você entrou. Olá, ${USUARIO.nome}.`);
          }}
        />
      )}

      {pagina === "painel" && (
        <Painel
          referenciaTitulo={tituloRef}
          nome={USUARIO.nome}
          aoSair={sair}
        />
      )}

      <Rodape />
    </div>
  );
}
