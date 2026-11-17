import { useEffect, useId, useRef, useState } from "react";
import Icone from "./Icone.jsx";

const MENU = [
  { id: "inicio", rotulo: "Início", icone: "casa", href: "#conteudo" },
  {
    id: "beneficio",
    rotulo: "Meu benefício",
    icone: "documento",
    subitens: [
      { rotulo: "Extrato de pagamento", href: "#extrato-pagamento" },
      { rotulo: "Descontos do benefício", href: "#descontos" },
      { rotulo: "Comprovante para o imposto de renda", href: "#comprovantes" },
    ],
  },
  {
    id: "pedidos",
    rotulo: "Meus pedidos",
    icone: "pasta",
    subitens: [
      { rotulo: "Fazer um novo pedido", href: "#novo-pedido" },
      { rotulo: "Acompanhar meus pedidos", href: "#consultar-pedido" },
      { rotulo: "Agendar atendimento", href: "#agendamento" },
    ],
  },
  {
    id: "conta",
    rotulo: "Minha conta",
    icone: "pessoa",
    subitens: [
      { rotulo: "Meus dados", href: "#dados" },
      { rotulo: "Segurança da conta", href: "#seguranca" },
      { rotulo: "Sair da conta", acao: "sair", icone: "sair" },
    ],
  },
];

/**
 * MENU PRINCIPAL COM SUBITENS — padrão WAI-ARIA "Menu / Menubar"
 * https://www.w3.org/WAI/ARIA/apg/patterns/menubar/
 *
 * Organiza os serviços em grupos ("Meu benefício ▸ Extrato, Descontos…").
 * Para o idoso, isso reduz a quantidade de opções vistas de uma vez; para quem
 * usa leitor de tela, o ARIA conta a estrutura que a pessoa vidente vê.
 *
 * Papéis, estados e propriedades:
 * - role="menubar" + aria-label="Menu principal" na lista de cima;
 *   aria-orientation diz se as setas são ←→ (computador) ou ↑↓ (celular).
 * - role="menuitem" em cada item. Os que abrem subitens têm
 *   aria-haspopup="menu" (avisa "tem submenu") e aria-expanded (aberto/fechado).
 * - role="menu" no submenu + aria-labelledby apontando para o item-pai.
 * - role="none" nos <li>: a semântica de lista é trocada pela de menu.
 *
 * Teclado (roving tabindex — o menu é uma só parada do Tab):
 * - Barra: ←→ (ou ↑↓ no celular) andam entre os itens; Home/End.
 * - ↓, Enter ou Espaço abrem o submenu e focam o 1º subitem; ↑ foca o último.
 * - No submenu: ↑↓ andam; Esc fecha e volta ao item-pai; ←→ passam para o
 *   grupo vizinho (no celular, ← volta ao pai).
 * - Tab sai do menu e fecha o que estiver aberto. Clique fora também fecha.
 */
export default function MenuPrincipal({ vertical = false, aoSair, aoEscapar }) {
  const [aberto, setAberto] = useState(null); // id do submenu aberto
  const [indiceFoco, setIndiceFoco] = useState(0); // roving tabindex da barra
  const base = useId();
  const refMenu = useRef(null);
  const refsTopo = useRef([]);
  const refsSub = useRef({});

  const idItem = (id) => `${base}-${id}`;

  // Clique/toque fora do menu fecha o submenu.
  useEffect(() => {
    if (!aberto) return undefined;
    function aoTocarFora(evento) {
      if (!refMenu.current?.contains(evento.target)) setAberto(null);
    }
    document.addEventListener("pointerdown", aoTocarFora);
    return () => document.removeEventListener("pointerdown", aoTocarFora);
  }, [aberto]);

  function focarTopo(indice) {
    const total = MENU.length;
    const alvo = (indice + total) % total;
    setIndiceFoco(alvo);
    refsTopo.current[alvo]?.focus();
    return alvo;
  }

  function abrir(indice, posicao = "primeiro") {
    const item = MENU[indice];
    if (!item.subitens) return;
    setIndiceFoco(indice);
    setAberto(item.id);
    // Espera o submenu aparecer na tela antes de mover o foco.
    requestAnimationFrame(() => {
      const lista = refsSub.current[item.id] ?? [];
      const alvo = posicao === "ultimo" ? lista.length - 1 : 0;
      lista[alvo]?.focus();
    });
  }

  function fecharEVoltar(indice) {
    setAberto(null);
    focarTopo(indice);
  }

  function aoTeclarTopo(evento, indice) {
    const item = MENU[indice];
    const proximo = vertical ? "ArrowDown" : "ArrowRight";
    const anterior = vertical ? "ArrowUp" : "ArrowLeft";
    const abrirPrimeiro = vertical ? "ArrowRight" : "ArrowDown";

    switch (evento.key) {
      case proximo:
        setAberto(null);
        focarTopo(indice + 1);
        break;
      case anterior:
        setAberto(null);
        focarTopo(indice - 1);
        break;
      case "Home":
        setAberto(null);
        focarTopo(0);
        break;
      case "End":
        setAberto(null);
        focarTopo(MENU.length - 1);
        break;
      case abrirPrimeiro:
      case "Enter":
      case " ":
        if (item.subitens) abrir(indice, "primeiro");
        else if (evento.key === " ") evento.currentTarget.click();
        else return; // Enter num link: deixa o navegador seguir o link.
        break;
      case "ArrowUp":
        if (vertical || !item.subitens) return;
        abrir(indice, "ultimo");
        break;
      case "Escape":
        if (aberto) setAberto(null);
        else aoEscapar?.();
        break;
      case "Tab":
        setAberto(null); // deixa o Tab seguir normalmente
        return;
      default:
        return;
    }
    evento.preventDefault();
  }

  function aoTeclarSub(evento, indicePai, indiceSub) {
    const item = MENU[indicePai];
    const lista = refsSub.current[item.id] ?? [];
    const total = item.subitens.length;
    const focarSub = (indice) => lista[(indice + total) % total]?.focus();

    switch (evento.key) {
      case "ArrowDown":
        focarSub(indiceSub + 1);
        break;
      case "ArrowUp":
        focarSub(indiceSub - 1);
        break;
      case "Home":
        focarSub(0);
        break;
      case "End":
        focarSub(total - 1);
        break;
      case "Escape":
        fecharEVoltar(indicePai);
        break;
      case "ArrowLeft":
        if (vertical) {
          fecharEVoltar(indicePai);
        } else {
          setAberto(null);
          const alvo = focarTopo(indicePai - 1);
          if (MENU[alvo].subitens) abrir(alvo);
        }
        break;
      case "ArrowRight":
        if (vertical) return;
        {
          setAberto(null);
          const alvo = focarTopo(indicePai + 1);
          if (MENU[alvo].subitens) abrir(alvo);
        }
        break;
      case " ":
        evento.currentTarget.click();
        break;
      case "Tab":
        setAberto(null); // deixa o Tab seguir normalmente
        return;
      default:
        return;
    }
    evento.preventDefault();
  }

  function ativarSubitem(indicePai, subitem) {
    // O submenu some ao escolher um subitem; o foco volta ao item-pai para
    // não cair no começo da página. No caso de "Sair", isso também garante
    // que, se a pessoa desistir no diálogo, o foco volte a um lugar que existe.
    fecharEVoltar(indicePai);
    if (subitem.acao === "sair") aoSair();
  }

  return (
    <ul
      ref={refMenu}
      role="menubar"
      aria-label="Menu principal"
      aria-orientation={vertical ? "vertical" : "horizontal"}
      className={`menu ${vertical ? "menu--vertical" : "menu--horizontal"}`}
    >
      {MENU.map((item, indice) => {
        const expandido = aberto === item.id;
        const propsComuns = {
          id: idItem(item.id),
          role: "menuitem",
          tabIndex: indice === indiceFoco ? 0 : -1,
          className: "menu__item",
          ref: (elemento) => {
            refsTopo.current[indice] = elemento;
          },
          onKeyDown: (evento) => aoTeclarTopo(evento, indice),
          onFocus: () => setIndiceFoco(indice),
        };

        return (
          <li key={item.id} role="none" className="menu__grupo">
            {item.subitens ? (
              <button
                type="button"
                {...propsComuns}
                aria-haspopup="menu"
                aria-expanded={expandido}
                onClick={() =>
                  expandido ? setAberto(null) : abrir(indice, "primeiro")
                }
              >
                <Icone nome={item.icone} tamanho={24} />
                <span>{item.rotulo}</span>
                <span className="menu__seta">
                  <Icone nome="seta-baixo" tamanho={20} />
                </span>
              </button>
            ) : (
              <a href={item.href} {...propsComuns}>
                <Icone nome={item.icone} tamanho={24} />
                <span>{item.rotulo}</span>
              </a>
            )}

            {item.subitens && expandido && (
              <ul
                role="menu"
                aria-labelledby={idItem(item.id)}
                className="menu__submenu"
              >
                {item.subitens.map((subitem, indiceSub) => {
                  const propsSub = {
                    role: "menuitem",
                    tabIndex: -1,
                    className: `menu__subitem${subitem.acao === "sair" ? " menu__subitem--sair" : ""}`,
                    ref: (elemento) => {
                      refsSub.current[item.id] ??= [];
                      refsSub.current[item.id][indiceSub] = elemento;
                    },
                    onKeyDown: (evento) =>
                      aoTeclarSub(evento, indice, indiceSub),
                    onClick: () => ativarSubitem(indice, subitem),
                  };
                  return (
                    <li key={subitem.rotulo} role="none">
                      {subitem.href ? (
                        <a href={subitem.href} {...propsSub}>
                          <span>{subitem.rotulo}</span>
                        </a>
                      ) : (
                        <button type="button" {...propsSub}>
                          {subitem.icone && (
                            <Icone nome={subitem.icone} tamanho={22} />
                          )}
                          <span>{subitem.rotulo}</span>
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
