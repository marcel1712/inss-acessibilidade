import { createContext, useContext, useEffect, useMemo, useState } from "react";

/**
 * Guarda as preferências de acessibilidade do usuário.
 *
 * As preferências ficam no localStorage: um idoso que aumentou a letra não
 * deveria precisar aumentar de novo a cada visita (eMAG 1.9).
 * O estado é aplicado em <html> via atributos data-*, e o CSS faz o resto.
 */

const AcessibilidadeContexto = createContext(null);

const CHAVE_ARMAZENAMENTO = "meu-inss-preferencias-a11y";
const NIVEIS_FONTE = [1, 2, 3];

function lerPreferencias() {
  try {
    const salvo = localStorage.getItem(CHAVE_ARMAZENAMENTO);
    if (!salvo) return null;
    return JSON.parse(salvo);
  } catch {
    // Navegação anônima ou armazenamento bloqueado: segue com o padrão.
    return null;
  }
}

export function ProvedorAcessibilidade({ children }) {
  const salvo = lerPreferencias();
  const [nivelFonte, setNivelFonte] = useState(salvo?.nivelFonte ?? 1);
  const [altoContraste, setAltoContraste] = useState(
    salvo?.altoContraste ?? false,
  );
  const [recado, setRecado] = useState("");

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-fonte", String(nivelFonte));
    html.setAttribute("data-tema", altoContraste ? "alto-contraste" : "claro");
    try {
      localStorage.setItem(
        CHAVE_ARMAZENAMENTO,
        JSON.stringify({ nivelFonte, altoContraste }),
      );
    } catch {
      // Sem armazenamento, as preferências valem só nesta visita.
    }
  }, [nivelFonte, altoContraste]);

  const valor = useMemo(
    () => ({
      nivelFonte,
      altoContraste,
      recado,
      /** Avisa leitores de tela sobre mudanças que não têm foco próprio. */
      anunciar: (texto) => setRecado(texto),
      aumentarFonte: () => {
        setNivelFonte((atual) => {
          const proximo =
            NIVEIS_FONTE[(NIVEIS_FONTE.indexOf(atual) + 1) % NIVEIS_FONTE.length];
          setRecado(`Tamanho da letra: nível ${proximo} de ${NIVEIS_FONTE.length}.`);
          return proximo;
        });
      },
      alternarContraste: () => {
        setAltoContraste((atual) => {
          setRecado(
            atual ? "Alto contraste desligado." : "Alto contraste ligado.",
          );
          return !atual;
        });
      },
      totalNiveisFonte: NIVEIS_FONTE.length,
    }),
    [nivelFonte, altoContraste, recado],
  );

  return (
    <AcessibilidadeContexto.Provider value={valor}>
      {children}
    </AcessibilidadeContexto.Provider>
  );
}

export function useAcessibilidade() {
  const contexto = useContext(AcessibilidadeContexto);
  if (!contexto) {
    throw new Error(
      "useAcessibilidade precisa estar dentro de <ProvedorAcessibilidade>.",
    );
  }
  return contexto;
}
