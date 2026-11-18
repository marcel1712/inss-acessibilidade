import logoInss from "../assets/logo-inss.webp";

/** Proporção da imagem original (564 × 383). */
const PROPORCAO = 383 / 564;

/**
 * Marca do INSS.
 *
 * É uma imagem FUNCIONAL — identifica de qual órgão é o serviço — então tem
 * texto alternativo (WCAG 1.1.1). Quando aparece ao lado do texto "Meu INSS",
 * passe `decorativa`: o alt fica vazio e o leitor de tela não repete o nome.
 *
 * width e height fixos reservam o espaço antes da imagem carregar, então a
 * página não "pula" (bom para quem lê devagar e perde o lugar).
 */
export default function LogoINSS({ tamanho = 120, decorativa = false }) {
  return (
    <img
      className="logo-inss"
      src={logoInss}
      width={tamanho}
      height={Math.round(tamanho * PROPORCAO)}
      alt={decorativa ? "" : "INSS — Instituto Nacional do Seguro Social"}
    />
  );
}
