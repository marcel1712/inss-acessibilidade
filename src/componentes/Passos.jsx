import Icone from "./Icone.jsx";

const ETAPAS = ["CPF", "Senha"];

/**
 * Indicador "Etapa 1 de 2". A frase escrita é o que vale para todos;
 * os círculos numerados são reforço visual e ficam fora do leitor de tela.
 */
export default function Passos({ atual }) {
  return (
    <div className="passos">
      <p className="passos__texto">
        Etapa {atual} de {ETAPAS.length}: {ETAPAS[atual - 1]}
      </p>
      <ol className="passos__lista" aria-hidden="true">
        {ETAPAS.map((nome, indice) => {
          const numero = indice + 1;
          const estado =
            numero < atual ? "feita" : numero === atual ? "atual" : "proxima";
          return (
            <li key={nome} className={`passos__item passos__item--${estado}`}>
              <span className="passos__numero">
                {estado === "feita" ? (
                  <Icone nome="certo" tamanho={18} />
                ) : (
                  numero
                )}
              </span>
              <span>{nome}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
