import { useId, useRef, useState } from "react";
import Icone from "./Icone.jsx";
import LogoINSS from "./LogoINSS.jsx";
import MenuPrincipal from "./MenuPrincipal.jsx";
import { useMidia } from "../utilidades/useMidia.js";

/**
 * Cabeçalho da área logada.
 *
 * - Computador: o menu principal (menubar com subitens) fica sempre visível
 *   numa faixa abaixo da barra azul.
 * - Celular: o mesmo menu fica atrás do botão "Menu" (um disclosure, com
 *   aria-expanded), e vira vertical — setas ↑↓.
 *
 * Os ícones do topo têm RÓTULO VISÍVEL ("Buscar", "Avisos"): "sino = avisos"
 * não é óbvio para quem usa o celular há pouco tempo (WCAG 2.5.3).
 */
export default function TopoApp({ aviso, aoSair }) {
  const computador = useMidia("(min-width: 60rem)");
  const [menuAberto, setMenuAberto] = useState(false);
  const botaoMenuRef = useRef(null);
  const idMenu = useId();

  const menu = (
    <MenuPrincipal
      vertical={!computador}
      aoSair={aoSair}
      aoEscapar={() => {
        if (computador) return;
        setMenuAberto(false);
        botaoMenuRef.current?.focus();
      }}
    />
  );

  return (
    <header className="topo">
      <div className="topo__barra">
        <div className="container topo__interno">
          <p className="topo__marca">
            <span className="topo__logo">
              <LogoINSS tamanho={52} decorativa />
            </span>
            <span>Meu INSS</span>
          </p>

          <div className="topo__acoes">
            <button type="button" className="topo__acao">
              <Icone nome="busca" tamanho={26} />
              <span>Buscar</span>
            </button>

            <button
              type="button"
              className="topo__acao"
              aria-label={`Avisos: ${aviso} não lido`}
            >
              <span className="topo__icone-com-selo">
                <Icone nome="sino" tamanho={26} />
                <span className="topo__selo" aria-hidden="true">
                  {aviso}
                </span>
              </span>
              <span aria-hidden="true">Avisos</span>
            </button>

            {!computador && (
              <button
                type="button"
                ref={botaoMenuRef}
                className="topo__acao"
                aria-expanded={menuAberto}
                aria-controls={idMenu}
                onClick={() => setMenuAberto((atual) => !atual)}
              >
                <Icone nome={menuAberto ? "fechar" : "menu"} tamanho={26} />
                <span>Menu</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {computador ? (
        <nav className="topo__navegacao" aria-label="Navegação principal">
          <div className="container">{menu}</div>
        </nav>
      ) : (
        menuAberto && (
          <nav
            className="topo__navegacao topo__navegacao--celular"
            id={idMenu}
            aria-label="Navegação principal"
          >
            <div className="container">{menu}</div>
          </nav>
        )
      )}
    </header>
  );
}
