import { useId, useRef, useState } from "react";
import Icone from "./Icone.jsx";

/**
 * AVISOS IMPORTANTES — padrão WAI-ARIA "Tabs" (abas)
 * https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
 *
 * Substitui o carrossel. Carrossel esconde o que vem depois e obriga a passar
 * um por um; nas abas a pessoa vê TODOS os assuntos de uma vez e vai direto
 * ao que interessa.
 *
 * Papéis, estados e propriedades:
 * - role="tablist" + aria-label: "Assuntos dos avisos, lista de abas".
 * - role="tab" em cada aba, com aria-selected="true|false" e aria-controls
 *   apontando para o painel → "Pagamento, aba, selecionada, 2 de 4".
 * - role="tabpanel" + aria-labelledby (nome = aba que o controla) e
 *   tabIndex=0, para o painel receber o foco com Tab logo depois das abas.
 *
 * Teclado: Tab entra na aba selecionada; setas movem o foco entre as abas;
 * Home/End vão à primeira/última; Enter ou Espaço ABREM a aba focada.
 * Ativação manual de propósito: o conteúdo só troca quando a pessoa confirma,
 * então nada muda "sozinho" enquanto ela só está explorando (WCAG 3.2.1).
 *
 * Nada se move automaticamente (WCAG 2.2.2) e as abas quebram em duas linhas
 * no celular, em vez de rolar de lado escondendo opções.
 */
export default function Avisos({ avisos }) {
  const [selecionada, setSelecionada] = useState(0);
  const base = useId();
  const refsAbas = useRef([]);
  const idTitulo = `${base}-titulo`;
  const idAba = (indice) => `${base}-aba-${indice}`;
  const idPainel = (indice) => `${base}-painel-${indice}`;

  function focar(indice) {
    const total = avisos.length;
    refsAbas.current[(indice + total) % total]?.focus();
  }

  function aoTeclar(evento, indice) {
    switch (evento.key) {
      case "ArrowRight":
      case "ArrowDown":
        focar(indice + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        focar(indice - 1);
        break;
      case "Home":
        focar(0);
        break;
      case "End":
        focar(avisos.length - 1);
        break;
      default:
        return; // Enter e Espaço: o próprio <button> dispara o clique.
    }
    evento.preventDefault();
  }

  return (
    <section className="secao avisos" aria-labelledby={idTitulo}>
      <div className="secao__cabecalho">
        <h2 id={idTitulo}>Avisos importantes</h2>
        <p className="texto-suave">Toque em um assunto para ler o aviso.</p>
      </div>

      <div className="abas">
        <div
          role="tablist"
          aria-label="Assuntos dos avisos"
          className="abas__lista"
        >
          {avisos.map((aviso, indice) => {
            const ativa = indice === selecionada;
            return (
              <button
                key={aviso.etiqueta}
                ref={(elemento) => {
                  refsAbas.current[indice] = elemento;
                }}
                type="button"
                role="tab"
                id={idAba(indice)}
                aria-selected={ativa}
                aria-controls={idPainel(indice)}
                tabIndex={ativa ? 0 : -1}
                className="abas__aba"
                onClick={() => setSelecionada(indice)}
                onKeyDown={(evento) => aoTeclar(evento, indice)}
              >
                <Icone nome={aviso.icone} tamanho={24} />
                <span>{aviso.etiqueta}</span>
              </button>
            );
          })}
        </div>

        {/* Todos os painéis existem no DOM (para o aria-controls de cada aba
            apontar para algo real), mas os inativos ficam com hidden e são
            ignorados pelo leitor de tela e pelo Tab. */}
        {avisos.map((aviso, indice) => (
          <div
            key={aviso.etiqueta}
            role="tabpanel"
            id={idPainel(indice)}
            aria-labelledby={idAba(indice)}
            tabIndex={0}
            hidden={indice !== selecionada}
            className="abas__painel"
          >
            <article className="aviso">
              <h3>{aviso.titulo}</h3>
              <p>{aviso.texto}</p>
              <a className="link-seta" href={aviso.href}>
                <span>{aviso.rotuloLink}</span>
                <Icone nome="seta-direita" tamanho={20} />
              </a>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
