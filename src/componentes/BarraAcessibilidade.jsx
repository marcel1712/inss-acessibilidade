import Icone from "./Icone.jsx";
import { useAcessibilidade } from "../contexto/AcessibilidadeContexto.jsx";

/**
 * Barra fixa de acessibilidade, como manda o eMAG (recomendação 1.9:
 * controles de contraste e de tamanho de fonte no topo de toda página).
 *
 * Os botões que ligam/desligam algo usam aria-pressed, e o rótulo acessível
 * diz o estado atual por extenso — não basta a cor mudar (WCAG 1.4.1).
 */
export default function BarraAcessibilidade({ aoPedirLibras }) {
  const {
    nivelFonte,
    totalNiveisFonte,
    altoContraste,
    aumentarFonte,
    alternarContraste,
  } = useAcessibilidade();

  return (
    <nav className="barra-a11y" aria-label="Opções de acessibilidade">
      <button
        type="button"
        className="barra-a11y__botao"
        onClick={aumentarFonte}
        aria-label={`Aumentar letra. Tamanho atual: nível ${nivelFonte} de ${totalNiveisFonte}. Toque para ir ao próximo tamanho.`}
      >
        <Icone nome="letra" tamanho={22} />
        <span aria-hidden="true">Aumentar letra</span>
        <span aria-hidden="true">
          {nivelFonte} de {totalNiveisFonte}
        </span>
      </button>

      <button
        type="button"
        className="barra-a11y__botao"
        onClick={alternarContraste}
        aria-pressed={altoContraste}
        aria-label={`Alto contraste: ${altoContraste ? "ligado" : "desligado"}`}
      >
        <Icone nome="contraste" tamanho={22} />
        <span aria-hidden="true">Contraste</span>
        <span aria-hidden="true">{altoContraste ? "Ligado" : "Desligado"}</span>
      </button>

      <button
        type="button"
        className="barra-a11y__botao"
        onClick={aoPedirLibras}
      >
        <Icone nome="libras" tamanho={22} />
        <span>Libras</span>
      </button>
    </nav>
  );
}
