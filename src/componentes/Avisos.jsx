import { useId, useState } from "react";
import Icone from "./Icone.jsx";

/**
 * Avisos importantes, um de cada vez.
 *
 * Decisões de acessibilidade:
 * - NÃO passa sozinho. Carrossel automático tira o controle de quem lê devagar
 *   (WCAG 2.2.2 — Pausar, parar, ocultar). Só muda quando a pessoa toca.
 * - O contador "Aviso 1 de 4" é texto visível, não bolinhas: bolinhas de 8px
 *   não são alvo de toque nem dizem onde a pessoa está.
 * - A região tem aria-live="polite": ao trocar, o leitor de tela lê o novo aviso
 *   sem roubar o foco do botão.
 */
export default function Avisos({ avisos }) {
  const [indice, setIndice] = useState(0);
  const idTitulo = useId();
  const atual = avisos[indice];
  const total = avisos.length;

  const irPara = (proximo) => setIndice((proximo + total) % total);

  return (
    <section className="secao" aria-labelledby={idTitulo}>
      <h2 id={idTitulo}>Avisos importantes</h2>
      <p className="campo__dica">
        Os avisos só mudam quando você tocar nos botões.
      </p>

      <div aria-live="polite" aria-atomic="true">
        <article className="aviso">
          <span className="etiqueta">{atual.etiqueta}</span>
          <h3>{atual.titulo}</h3>
          <p>{atual.texto}</p>
          <a href={atual.href}>{atual.rotuloLink}</a>
          <p className="apenas-leitor-tela">
            Aviso {indice + 1} de {total}.
          </p>
        </article>
      </div>

      <div className="avisos__controles">
        <button
          type="button"
          className="botao botao--secundario botao--navegacao"
          onClick={() => irPara(indice - 1)}
          aria-label="Ver aviso anterior"
        >
          <Icone nome="seta-esquerda" tamanho={22} />
          <span>Anterior</span>
        </button>

        <p className="avisos__contador" aria-hidden="true">
          Aviso {indice + 1} de {total}
        </p>

        <button
          type="button"
          className="botao botao--secundario botao--navegacao"
          onClick={() => irPara(indice + 1)}
          aria-label="Ver próximo aviso"
        >
          <span>Próximo</span>
          <Icone nome="seta-direita" tamanho={22} />
        </button>
      </div>
    </section>
  );
}
