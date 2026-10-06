import { useEffect, useId, useRef, useState } from "react";
import Icone from "./Icone.jsx";

const ITENS_MENU = [
  { nome: "Início", icone: "pessoa", href: "#inicio" },
  { nome: "Meu benefício", icone: "documento", href: "#beneficio" },
  { nome: "Meus pedidos", icone: "pasta", href: "#pedidos" },
  { nome: "Minha conta", icone: "pessoa", href: "#conta" },
];

/**
 * Barra superior do aplicativo logado.
 *
 * Mudança proposital em relação ao app original: os ícones do topo
 * (menu, busca, avisos, conta) ganham RÓTULO VISÍVEL embaixo. Ícone sozinho
 * depende de a pessoa já conhecer o símbolo — e "sino = avisos" não é óbvio
 * para quem usa o celular há pouco tempo. Texto visível também atende o
 * critério WCAG 2.5.3 (rótulo no nome acessível).
 *
 * O menu é um disclosure simples (não um diálogo): abre abaixo da barra,
 * fecha com Esc e devolve o foco ao botão que o abriu (WCAG 2.4.3).
 */
export default function TopoApp({ aviso, aoSair }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const botaoMenuRef = useRef(null);
  const idMenu = useId();

  useEffect(() => {
    if (!menuAberto) return undefined;
    function aoTeclar(evento) {
      if (evento.key === "Escape") {
        setMenuAberto(false);
        botaoMenuRef.current?.focus();
      }
    }
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [menuAberto]);

  return (
    <header className="topo">
      <div className="topo__barra">
        <button
          type="button"
          ref={botaoMenuRef}
          className="topo__acao"
          aria-expanded={menuAberto}
          aria-controls={idMenu}
          onClick={() => setMenuAberto((atual) => !atual)}
        >
          <Icone nome="menu" tamanho={26} />
          <span>Menu</span>
        </button>

        <p className="topo__titulo">Meu INSS</p>

        <button type="button" className="topo__acao">
          <Icone nome="busca" tamanho={26} />
          <span>Buscar</span>
        </button>

        <button
          type="button"
          className="topo__acao"
          aria-label={`Avisos. ${aviso} aviso não lido`}
        >
          <span className="topo__icone-com-selo">
            <Icone nome="sino" tamanho={26} />
            <span className="topo__selo" aria-hidden="true">
              {aviso}
            </span>
          </span>
          <span aria-hidden="true">Avisos</span>
        </button>
      </div>

      {menuAberto && (
        <nav className="menu-painel" id={idMenu} aria-label="Menu principal">
          <ul>
            {ITENS_MENU.map((item) => (
              <li key={item.nome}>
                <a href={item.href}>
                  <Icone nome={item.icone} tamanho={24} />
                  <span>{item.nome}</span>
                </a>
              </li>
            ))}
            <li>
              <button type="button" onClick={aoSair}>
                <Icone nome="sair" tamanho={24} />
                <span>Sair da conta</span>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
