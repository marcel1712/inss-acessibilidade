import Icone from "./Icone.jsx";
import LogoINSS from "./LogoINSS.jsx";

/** Cabeçalho das telas de entrada: botão Voltar com texto + marca do INSS. */
export default function CabecalhoGov({ rotuloVoltar, aoVoltar }) {
  return (
    <header className="cabecalho-interno">
      <div className="container cabecalho-interno__barra">
        <button
          type="button"
          className="botao botao--secundario botao--navegacao"
          onClick={aoVoltar}
        >
          <Icone nome="voltar" tamanho={22} />
          <span>{rotuloVoltar}</span>
        </button>
        <p className="cabecalho-interno__marca">
          <LogoINSS tamanho={44} decorativa />
          <span>Meu INSS</span>
        </p>
      </div>
    </header>
  );
}
