import Icone from "./Icone.jsx";
import LogoINSS from "./LogoINSS.jsx";

export default function Rodape() {
  return (
    <footer className="rodape">
      <div className="container rodape__interno">
        <div className="rodape__marca">
          <span className="rodape__logo">
            <LogoINSS tamanho={64} decorativa />
          </span>
          <p>
            <strong>INSS</strong>
            <br />
            Instituto Nacional do Seguro Social
          </p>
        </div>

        <div className="rodape__ajuda">
          <p className="rodape__titulo">
            <Icone nome="telefone" tamanho={24} />
            <span>Central 135</span>
          </p>
          <p>
            Ligação gratuita, de segunda a sábado, das 7h às 22h. Quem atende é
            uma pessoa.
          </p>
        </div>

        <nav aria-label="Links do rodapé" className="rodape__links">
          <ul>
            <li>
              <a href="#acessibilidade">Declaração de acessibilidade</a>
            </li>
            <li>
              <a href="#termos">Termos de uso e privacidade</a>
            </li>
            <li>
              <a href="#agencias">Encontrar uma agência</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container rodape__aviso">
        <p>
          Projeto de estudo sobre acessibilidade. Não é o site oficial do INSS.
        </p>
      </div>
    </footer>
  );
}
