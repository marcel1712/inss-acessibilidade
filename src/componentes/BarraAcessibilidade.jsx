import Icone from "./Icone.jsx";
import GrupoOpcoes from "./GrupoOpcoes.jsx";
import { useAcessibilidade } from "../contexto/AcessibilidadeContexto.jsx";

const TAMANHOS = [
  { valor: 1, rotulo: "Normal", amostra: "0.9rem" },
  { valor: 2, rotulo: "Grande", amostra: "1.1rem" },
  { valor: 3, rotulo: "Maior", amostra: "1.35rem" },
];

/**
 * Faixa gov.br + barra de acessibilidade, como manda o eMAG (recomendação 1.9:
 * controles de contraste e de tamanho de letra no topo de toda página).
 *
 * - "Tamanho da letra" é um GRUPO DE OPÇÕES (role="radiogroup"): a pessoa vê
 *   os três tamanhos de uma vez e escolhe direto, em vez de apertar um botão
 *   várias vezes sem saber quantos níveis existem.
 * - "Contraste" é um alternador (aria-pressed) com o estado escrito por extenso:
 *   não basta a cor mudar (WCAG 1.4.1).
 */
export default function BarraAcessibilidade({ aoPedirLibras }) {
  const { nivelFonte, altoContraste, definirNivelFonte, alternarContraste } =
    useAcessibilidade();

  return (
    <section className="barra-gov" aria-label="Barra do Governo Federal">
      <div className="container barra-gov__interno">
        <p className="barra-gov__marca">
          <span className="barra-gov__govbr">gov.br</span>
          <span className="barra-gov__orgao">
            Instituto Nacional do Seguro Social
          </span>
        </p>

        <section className="barra-a11y" aria-label="Opções de acessibilidade">
          <GrupoOpcoes
            titulo="Tamanho da letra"
            variante="pilula"
            opcoes={TAMANHOS}
            valor={nivelFonte}
            aoMudar={definirNivelFonte}
          />

          <div className="barra-a11y__botoes">
            <button
              type="button"
              className="barra-a11y__botao"
              onClick={alternarContraste}
              aria-pressed={altoContraste}
            >
              <Icone nome="contraste" tamanho={22} />
              <span>Alto contraste</span>
              {/* O estado já é falado pelo aria-pressed ("pressionado");
                  aqui ele aparece escrito para quem enxerga. O nome do botão
                  não muda ao alternar, como recomenda o ARIA APG. */}
              <span className="barra-a11y__estado" aria-hidden="true">
                {altoContraste ? "Ligado" : "Desligado"}
              </span>
            </button>

            <button
              type="button"
              className="barra-a11y__botao"
              onClick={aoPedirLibras}
            >
              <Icone nome="libras" tamanho={22} />
              <span>Libras</span>
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}
