import { useEffect, useId, useRef, useState } from "react";
import Icone from "./Icone.jsx";
import GrupoOpcoes from "./GrupoOpcoes.jsx";
import { useAcessibilidade } from "../contexto/AcessibilidadeContexto.jsx";
import { useMidia } from "../utilidades/useMidia.js";

const TAMANHOS = [
  { valor: 1, rotulo: "Normal", amostra: "0.85rem" },
  { valor: 2, rotulo: "Grande", amostra: "1rem" },
  { valor: 3, rotulo: "Maior", amostra: "1.2rem" },
];

/**
 * Abre o tradutor oficial VLibras (carregado em index.html).
 * A versão atual do widget desenha o próprio botão dentro de um shadow DOM;
 * versões antigas usam o elemento [vw-access-button]. Tentamos os dois.
 */
function abrirVLibras() {
  const botaoOficial =
    document
      .querySelector("#vlibras-access-wrapper")
      ?.shadowRoot?.querySelector("#vlibras-button") ??
    document.querySelector("[vw-access-button]");
  if (!botaoOficial) return false;
  botaoOficial.click();
  return true;
}

/**
 * Faixa gov.br + controles de acessibilidade (eMAG, recomendação 1.9:
 * contraste e tamanho de letra no topo de toda página).
 *
 * - Computador: uma linha fina, como no portal gov.br — marca à esquerda,
 *   controles compactos à direita.
 * - Celular: um único botão "Acessibilidade" abre um painel com as opções
 *   em tamanho grande. Padrão WAI-ARIA "Disclosure": aria-expanded diz se o
 *   painel está aberto e aria-controls aponta para ele. Esc fecha e devolve o
 *   foco ao botão.
 *
 * Controles:
 * - "Tamanho da letra": GRUPO DE OPÇÕES (role="radiogroup").
 * - "Alto contraste": alternador (aria-pressed), estado também escrito.
 * - "Libras": abre o VLibras, tradutor oficial do Governo Federal.
 */
export default function BarraAcessibilidade() {
  const {
    nivelFonte,
    altoContraste,
    definirNivelFonte,
    alternarContraste,
    anunciar,
  } = useAcessibilidade();
  const computador = useMidia("(min-width: 64rem)");
  const [painelAberto, setPainelAberto] = useState(false);
  const botaoPainelRef = useRef(null);
  const idPainel = useId();

  useEffect(() => {
    if (!painelAberto) return undefined;
    function aoTeclar(evento) {
      if (evento.key === "Escape") {
        setPainelAberto(false);
        botaoPainelRef.current?.focus();
      }
    }
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [painelAberto]);

  function pedirLibras() {
    if (!abrirVLibras()) {
      anunciar(
        "O tradutor de Libras ainda está carregando. Tente de novo em alguns segundos.",
      );
    }
  }

  const controles = (
    <>
      <GrupoOpcoes
        titulo={computador ? "Letra" : "Tamanho da letra"}
        variante="pilula"
        opcoes={TAMANHOS}
        valor={nivelFonte}
        aoMudar={definirNivelFonte}
      />

      <button
        type="button"
        className="barra-a11y__botao"
        onClick={alternarContraste}
        aria-pressed={altoContraste}
      >
        <Icone nome="contraste" tamanho={20} />
        <span>Alto contraste</span>
        {/* O estado é falado pelo aria-pressed ("pressionado"); aqui ele
            aparece escrito para quem enxerga. O nome do botão não muda. */}
        <span className="barra-a11y__estado" aria-hidden="true">
          {altoContraste ? "Ligado" : "Desligado"}
        </span>
      </button>

      <button type="button" className="barra-a11y__botao" onClick={pedirLibras}>
        <Icone nome="libras" tamanho={20} />
        <span>Libras</span>
      </button>
    </>
  );

  return (
    <section className="barra-gov" aria-label="Barra do Governo Federal">
      <div className="container barra-gov__interno">
        <p className="barra-gov__marca">
          <span className="barra-gov__govbr">gov.br</span>
          <span className="barra-gov__orgao">
            Instituto Nacional do Seguro Social
          </span>
        </p>

        {computador ? (
          <div className="barra-a11y" role="group" aria-label="Acessibilidade">
            {controles}
          </div>
        ) : (
          <button
            type="button"
            ref={botaoPainelRef}
            className="barra-a11y__abrir"
            aria-expanded={painelAberto}
            aria-controls={idPainel}
            onClick={() => setPainelAberto((atual) => !atual)}
          >
            <Icone nome="acessibilidade" tamanho={22} />
            <span>Acessibilidade</span>
            <span className="barra-a11y__seta">
              <Icone nome="seta-baixo" tamanho={18} />
            </span>
          </button>
        )}
      </div>

      {!computador && painelAberto && (
        <div className="barra-a11y-painel" id={idPainel}>
          <div className="container barra-a11y-painel__interno">
            {controles}
          </div>
        </div>
      )}
    </section>
  );
}
