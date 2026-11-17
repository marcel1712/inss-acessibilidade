import { useSyncExternalStore } from "react";

/** true quando a media query casa; acompanha mudanças de tamanho e de zoom. */
export function useMidia(consulta) {
  return useSyncExternalStore(
    (avisar) => {
      const lista = window.matchMedia(consulta);
      lista.addEventListener("change", avisar);
      return () => lista.removeEventListener("change", avisar);
    },
    () => window.matchMedia(consulta).matches,
    () => false,
  );
}
