import { useId, useRef } from "react";
import Icone from "./Icone.jsx";

/**
 * GRUPO DE OPÇÕES — padrão WAI-ARIA "Radio Group"
 * https://www.w3.org/WAI/ARIA/apg/patterns/radio/
 *
 * Para que serve: escolher UMA opção entre várias (tamanho da letra, forma de
 * entrar). Visualmente são cartões ou "pílulas" grandes, bem mais fáceis de
 * acertar com o dedo do que a bolinha de 16px do <input type="radio">.
 * O WAI-ARIA devolve a esses cartões o significado de "botão de opção".
 *
 * Papéis, estados e propriedades:
 * - role="radiogroup" no contêiner + aria-labelledby apontando para o título
 *   visível do grupo → o leitor anuncia "Tamanho da letra, grupo".
 * - role="radio" em cada opção + aria-checked="true|false" → "Grande, botão de
 *   opção, selecionado, 2 de 3".
 * - aria-labelledby aponta só para o nome da opção, e aria-describedby para a
 *   explicação: o leitor fala o nome, o estado e, depois, a explicação.
 *
 * Teclado (roving tabindex): o grupo inteiro é UMA parada do Tab — só a opção
 * marcada tem tabIndex=0. Setas ←→↑↓ movem e marcam; Espaço marca;
 * Home/End vão para a primeira/última. Menos Tabs = menos cansaço.
 *
 * Além da cor, a opção marcada mostra um círculo preenchido com ✓ e borda
 * mais grossa (WCAG 1.4.1).
 */
export default function GrupoOpcoes({
  titulo,
  tituloVisivel = true,
  opcoes,
  valor,
  aoMudar,
  variante = "cartao",
  className = "",
}) {
  const idTitulo = useId();
  const refs = useRef([]);
  const indiceMarcado = opcoes.findIndex((opcao) => opcao.valor === valor);
  // Se nada estiver marcado, a primeira opção recebe o Tab.
  const indiceTabulavel = indiceMarcado >= 0 ? indiceMarcado : 0;

  function marcar(indice) {
    const total = opcoes.length;
    const alvo = (indice + total) % total;
    aoMudar(opcoes[alvo].valor);
    refs.current[alvo]?.focus();
  }

  function aoTeclar(evento, indice) {
    switch (evento.key) {
      case "ArrowRight":
      case "ArrowDown":
        marcar(indice + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        marcar(indice - 1);
        break;
      case "Home":
        marcar(0);
        break;
      case "End":
        marcar(opcoes.length - 1);
        break;
      case " ":
        aoMudar(opcoes[indice].valor);
        break;
      default:
        return;
    }
    evento.preventDefault();
  }

  return (
    <div className={`grupo-opcoes grupo-opcoes--${variante} ${className}`}>
      <p
        id={idTitulo}
        className={
          tituloVisivel ? "grupo-opcoes__titulo" : "apenas-leitor-tela"
        }
      >
        {titulo}
      </p>
      <div
        role="radiogroup"
        aria-labelledby={idTitulo}
        className="grupo-opcoes__lista"
      >
        {opcoes.map((opcao, indice) => {
          const marcada = opcao.valor === valor;
          const idNome = `${idTitulo}-${opcao.valor}-nome`;
          const idDescricao = `${idTitulo}-${opcao.valor}-descricao`;
          return (
            <div
              key={opcao.valor}
              ref={(elemento) => {
                refs.current[indice] = elemento;
              }}
              role="radio"
              aria-checked={marcada}
              aria-labelledby={idNome}
              aria-describedby={opcao.descricao ? idDescricao : undefined}
              tabIndex={indice === indiceTabulavel ? 0 : -1}
              className="opcao-radio"
              onClick={() => marcar(indice)}
              onKeyDown={(evento) => aoTeclar(evento, indice)}
            >
              <span className="opcao-radio__marca" aria-hidden="true">
                {marcada && <Icone nome="certo" tamanho={16} />}
              </span>
              {opcao.icone && (
                <span className="opcao-radio__icone" aria-hidden="true">
                  <Icone nome={opcao.icone} tamanho={26} />
                </span>
              )}
              {opcao.amostra && (
                <span
                  className="opcao-radio__amostra"
                  style={{ fontSize: opcao.amostra }}
                  aria-hidden="true"
                >
                  A
                </span>
              )}
              <span className="opcao-radio__texto">
                <span className="opcao-radio__nome" id={idNome}>
                  {opcao.rotulo}
                </span>
                {opcao.descricao && (
                  <span className="opcao-radio__descricao" id={idDescricao}>
                    {opcao.descricao}
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
