import { useId, useState } from "react";
import Icone from "./Icone.jsx";

/**
 * Bloco que abre e fecha.
 *
 * Padrão ARIA Disclosure: o botão aponta para o painel com aria-controls e
 * informa o estado com aria-expanded. O painel some do DOM quando fechado,
 * então o leitor de tela não lê conteúdo invisível (eMAG 2.1).
 */
export default function Acordeao({
  titulo,
  children,
  abertoInicialmente = false,
  nivel = 3,
}) {
  // O nível do título depende de onde o acordeão está: sem pular níveis
  // (h1 → h3), a estrutura lida pelo leitor de tela continua lógica.
  const Titulo = `h${nivel}`;
  const [aberto, setAberto] = useState(abertoInicialmente);
  const idPainel = useId();

  return (
    <section className="acordeao">
      <Titulo>
        <button
          type="button"
          className="acordeao__gatilho"
          aria-expanded={aberto}
          aria-controls={idPainel}
          onClick={() => setAberto((valor) => !valor)}
        >
          <Icone nome="pergunta" tamanho={26} />
          <span>{titulo}</span>
          <span className="acordeao__seta">
            <Icone nome="seta-baixo" tamanho={26} />
          </span>
        </button>
      </Titulo>
      {aberto && (
        <div className="acordeao__painel" id={idPainel}>
          {children}
        </div>
      )}
    </section>
  );
}
