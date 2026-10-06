import { useId } from "react";
import Icone from "./Icone.jsx";

/**
 * Lista de serviços sem senha.
 *
 * Cada item é um <a> dentro de <li>: o leitor de tela anuncia "lista com N itens"
 * e a pessoa sabe o tamanho do menu antes de percorrer (eMAG 3.5).
 * O nome do serviço vem acompanhado de uma descrição curta, porque
 * "Novo Pedido" sozinho não diz nada a quem usa o app pela primeira vez.
 */
export default function ListaServicos({ titulo, servicos }) {
  const idTitulo = useId();

  return (
    <section className="secao" aria-labelledby={idTitulo}>
      <h2 id={idTitulo}>{titulo}</h2>
      <ul className="servicos">
        {servicos.map((servico) => (
          <li key={servico.nome}>
            <a className="servico" href={servico.href}>
              <span className="servico__icone">
                <Icone nome={servico.icone} tamanho={26} />
              </span>
              <span className="servico__texto">
                <span className="servico__nome">{servico.nome}</span>
                <span className="servico__descricao">{servico.descricao}</span>
              </span>
              <span className="servico__seta">
                <Icone nome="seta-direita" tamanho={26} />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
