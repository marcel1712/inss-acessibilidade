import { useId } from "react";
import Icone from "./Icone.jsx";
import { formatarCPF } from "../utilidades/cpf.js";

/**
 * Campo de CPF.
 *
 * - <label> de verdade, ligado ao input pelo id (WCAG 1.3.1, 3.3.2).
 * - A dica e o erro são ligados por aria-describedby, então o leitor de tela
 *   lê os dois logo depois do nome do campo.
 * - O erro aparece em texto, com ícone e borda: três pistas, não só a cor.
 * - inputMode="numeric" abre o teclado numérico no celular, e autoComplete
 *   permite preenchimento automático (WCAG 1.3.5).
 * - A máscara é aplicada na digitação, mas o campo nunca bloqueia a tecla:
 *   quem cola o CPF com pontos continua conseguindo.
 */
export default function CampoCPF({ valor, aoMudar, erro, referencia }) {
  const idCampo = useId();
  const idDica = `${idCampo}-dica`;
  const idErro = `${idCampo}-erro`;

  return (
    <div className="campo">
      <label className="campo__rotulo" htmlFor={idCampo}>
        CPF
      </label>
      <p className="campo__dica" id={idDica}>
        São 11 números. Exemplo: 123.456.789-00
      </p>
      <input
        id={idCampo}
        ref={referencia}
        className="campo__entrada"
        type="text"
        inputMode="numeric"
        autoComplete="username"
        name="cpf"
        value={valor}
        maxLength={14}
        placeholder="000.000.000-00"
        aria-describedby={erro ? `${idDica} ${idErro}` : idDica}
        aria-invalid={erro ? "true" : undefined}
        onChange={(evento) => aoMudar(formatarCPF(evento.target.value))}
      />
      {/* role="alert" faz o leitor de tela ler o erro assim que ele aparece */}
      {erro && (
        <p className="campo__erro" id={idErro} role="alert">
          <Icone nome="alerta" tamanho={24} />
          <span>{erro}</span>
        </p>
      )}
    </div>
  );
}
