import { useId, useState } from "react";
import Icone from "./Icone.jsx";

/**
 * Campo de senha com botão "Mostrar senha".
 *
 * Por que o botão existe: senha escondida em bolinhas é uma das maiores causas
 * de erro de digitação em celular, ainda mais para quem tem baixa visão
 * (WCAG 3.3.x — prevenção de erro). O botão é um alternador real:
 * usa aria-pressed e o rótulo muda de "Mostrar" para "Esconder".
 */
export default function CampoSenha({ valor, aoMudar, erro, referencia }) {
  const [visivel, setVisivel] = useState(false);
  const idCampo = useId();
  const idDica = `${idCampo}-dica`;
  const idErro = `${idCampo}-erro`;

  return (
    <div className="campo">
      <label className="campo__rotulo" htmlFor={idCampo}>
        Senha do gov.br
      </label>
      <p className="campo__dica" id={idDica}>
        É a senha que você criou no gov.br. Não é a senha do banco.
      </p>

      <div className="campo__com-botao">
        <input
          id={idCampo}
          ref={referencia}
          className="campo__entrada"
          type={visivel ? "text" : "password"}
          autoComplete="current-password"
          name="senha"
          value={valor}
          aria-describedby={erro ? `${idDica} ${idErro}` : idDica}
          aria-invalid={erro ? "true" : undefined}
          onChange={(evento) => aoMudar(evento.target.value)}
        />
        <button
          type="button"
          className="botao botao--secundario campo__botao"
          aria-pressed={visivel}
          onClick={() => setVisivel((atual) => !atual)}
        >
          <Icone nome={visivel ? "olho-fechado" : "olho"} tamanho={24} />
          <span>{visivel ? "Esconder senha" : "Mostrar senha"}</span>
        </button>
      </div>

      {erro && (
        <p className="campo__erro" id={idErro} role="alert">
          <Icone nome="alerta" tamanho={24} />
          <span>{erro}</span>
        </p>
      )}
    </div>
  );
}
