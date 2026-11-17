import { useEffect, useId, useRef } from "react";
import Icone from "./Icone.jsx";

/**
 * DIÁLOGO DE CONFIRMAÇÃO — padrão WAI-ARIA "Dialog (Modal)"
 * https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
 *
 * Usado antes de ações difíceis de desfazer, como sair da conta: um toque sem
 * querer no lugar errado não deve jogar a pessoa para fora (WCAG 3.3.4 —
 * prevenção de erros).
 *
 * Papéis, estados e propriedades:
 * - <dialog> aberto com showModal() tem papel "dialog" nativo. Reforçamos com
 *   aria-modal="true": avisa ao leitor de tela que o resto da página está
 *   inativo e não deve ser lido.
 * - aria-labelledby → título ("Quer mesmo sair da conta?") vira o nome.
 * - aria-describedby → o texto explicativo é lido logo depois do nome.
 *
 * Foco e teclado:
 * - Ao abrir, o foco vai para a opção SEGURA ("Não, continuar aqui"), não para
 *   a destrutiva — um Enter apressado não causa estrago.
 * - Tab e Shift+Tab ficam presos dentro do diálogo (showModal deixa o fundo
 *   inerte); Esc fecha e equivale a "Não".
 * - Ao fechar, o foco volta ao botão que abriu o diálogo (WCAG 2.4.3).
 */
export default function Dialogo({
  aberto,
  titulo,
  descricao,
  rotuloConfirmar,
  rotuloCancelar,
  aoConfirmar,
  aoCancelar,
}) {
  const refDialogo = useRef(null);
  const refCancelar = useRef(null);
  const refOrigem = useRef(null);
  const idTitulo = useId();
  const idDescricao = useId();

  useEffect(() => {
    const dialogo = refDialogo.current;
    if (!dialogo) return;
    if (aberto && !dialogo.open) {
      refOrigem.current = document.activeElement;
      dialogo.showModal();
      refCancelar.current?.focus();
    } else if (!aberto && dialogo.open) {
      dialogo.close();
      refOrigem.current?.focus?.();
    }
  }, [aberto]);

  return (
    <dialog
      ref={refDialogo}
      className="dialogo"
      aria-modal="true"
      aria-labelledby={idTitulo}
      aria-describedby={idDescricao}
      // Esc dispara "cancel": tratamos como "Não" e deixamos o React fechar.
      onCancel={(evento) => {
        evento.preventDefault();
        aoCancelar();
      }}
      // Prende o Tab: do último botão volta ao primeiro, e vice-versa.
      // (O showModal deixa o fundo inerte, mas alguns navegadores ainda
      // deixam o foco escapar para a barra de endereço.)
      onKeyDown={(evento) => {
        if (evento.key !== "Tab") return;
        const focaveis = refDialogo.current.querySelectorAll("button");
        const primeiro = focaveis[0];
        const ultimo = focaveis[focaveis.length - 1];
        if (evento.shiftKey && document.activeElement === primeiro) {
          evento.preventDefault();
          ultimo.focus();
        } else if (!evento.shiftKey && document.activeElement === ultimo) {
          evento.preventDefault();
          primeiro.focus();
        }
      }}
    >
      <div className="dialogo__icone" aria-hidden="true">
        <Icone nome="sair" tamanho={32} />
      </div>
      <h2 id={idTitulo} className="dialogo__titulo">
        {titulo}
      </h2>
      <p id={idDescricao}>{descricao}</p>
      <div className="dialogo__acoes">
        <button
          ref={refCancelar}
          type="button"
          className="botao botao--primario"
          onClick={aoCancelar}
        >
          {rotuloCancelar}
        </button>
        <button
          type="button"
          className="botao botao--secundario"
          onClick={aoConfirmar}
        >
          {rotuloConfirmar}
        </button>
      </div>
    </dialog>
  );
}
