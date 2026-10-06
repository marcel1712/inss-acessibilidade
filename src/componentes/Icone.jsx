/**
 * Ícones em SVG inline.
 *
 * Todo ícone aqui é DECORATIVO: vem sempre acompanhado de texto visível,
 * por isso leva aria-hidden e fica fora da ordem de leitura (eMAG 3.6).
 * Usa currentColor para acompanhar o tema de alto contraste.
 */

const DESENHOS = {
  letra: (
    <>
      <path d="M4 20 11 5h2l7 15" />
      <path d="M7.5 15h9" />
    </>
  ),
  contraste: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18a9 9 0 0 0 0-18z" fill="currentColor" stroke="none" />
    </>
  ),
  libras: (
    <>
      <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M12 10.5V4.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M15 11V6.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-1a6 6 0 0 1-4.3-1.8L4 16.5a1.6 1.6 0 0 1 2.3-2.2L9 17" />
    </>
  ),
  entrar: (
    <>
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
    </>
  ),
  pergunta: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.2 9.3a3 3 0 1 1 3.8 3.2v1.6" />
      <path d="M12 17.4h.01" strokeWidth="2.5" />
    </>
  ),
  telefone: (
    <path d="M6.3 3h3l1.6 4-2 1.5a12 12 0 0 0 5.6 5.6l1.5-2 4 1.6v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.3 5.2 2 2 0 0 1 6.3 3z" />
  ),
  alerta: (
    <>
      <path d="M12 4.5 2.8 20h18.4L12 4.5z" />
      <path d="M12 10v4" />
      <path d="M12 17.2h.01" strokeWidth="2.5" />
    </>
  ),
  certo: <path d="M4 12.5 9.5 18 20 6.5" />,
  mais: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  calendario: (
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  porcentagem: (
    <>
      <path d="M6 18 18 6" />
      <circle cx="7.5" cy="7.5" r="2.5" />
      <circle cx="16.5" cy="16.5" r="2.5" />
    </>
  ),
  pecas: (
    <path d="M9 4h6v2.5a1.8 1.8 0 1 0 3.5 0V9H21v6h-2.5a1.8 1.8 0 1 0-3.5 0V21H9v-6a1.8 1.8 0 1 0-3.5 0H3V9h2.5A1.8 1.8 0 1 0 9 6.5V4z" />
  ),
  documento: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </>
  ),
  banco: (
    <>
      <path d="M3 10 12 4l9 6" />
      <path d="M5 10v8M10 10v8M14 10v8M19 10v8M3 20h18" />
    </>
  ),
  celular: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </>
  ),
  escudo: (
    <>
      <path d="M12 3 5 6v5.5c0 4.3 2.9 7.8 7 9.5 4.1-1.7 7-5.2 7-9.5V6l-7-3z" />
      <path d="M9 12.2l2.2 2.3L15.5 10" />
    </>
  ),
  olho: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3.2" />
    </>
  ),
  "olho-fechado": (
    <>
      <path d="M3 4l18 16" />
      <path d="M10.6 6c.45-.07.92-.1 1.4-.1 6 0 9.5 6.1 9.5 6.1a16 16 0 0 1-3.3 3.8" />
      <path d="M6.6 8.2A16 16 0 0 0 2.5 12S6 18.1 12 18.1c1.3 0 2.5-.3 3.6-.7" />
      <path d="M9.6 10.4a3.2 3.2 0 0 0 4.3 4.5" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  busca: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </>
  ),
  sino: (
    <>
      <path d="M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6z" />
      <path d="M10.3 19.5a2 2 0 0 0 3.4 0" />
    </>
  ),
  pessoa: (
    <>
      <circle cx="12" cy="8" r="3.8" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  sair: (
    <>
      <path d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </>
  ),
  pasta: (
    <path d="M3.5 7a2 2 0 0 1 2-2h3.3l2 2.5h7.7a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2V7z" />
  ),
  chat: (
    <>
      <path d="M20.5 12.5c0 4-3.8 7.2-8.5 7.2-1 0-2-.15-2.9-.4L4 21l1.4-3.6a6.8 6.8 0 0 1-2.4-5c0-4 3.8-7.2 8.5-7.2s9 3.3 9 7.3z" />
      <path d="M9 12h.01M12.5 12h.01M16 12h.01" strokeWidth="2.5" />
    </>
  ),
  acessibilidade: (
    <>
      <circle cx="12" cy="4.6" r="1.9" />
      <path d="M4.5 8.5c4.8 1.6 10.2 1.6 15 0" />
      <path d="M12 8v5m0 0-3 7.5M12 13l3 7.5" />
    </>
  ),
  reticencias: (
    <>
      <circle cx="6" cy="12" r="1.6" fill="currentColor" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <circle cx="18" cy="12" r="1.6" fill="currentColor" />
    </>
  ),
  "seta-direita": <path d="M9 5l7 7-7 7" />,
  "seta-esquerda": <path d="M15 5l-7 7 7 7" />,
  "seta-baixo": <path d="M5 9l7 7 7-7" />,
  voltar: (
    <>
      <path d="M11 5 4 12l7 7" />
      <path d="M4 12h16" />
    </>
  ),
};

export default function Icone({ nome, tamanho = 28 }) {
  const desenho = DESENHOS[nome];
  if (!desenho) return null;

  return (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {desenho}
    </svg>
  );
}
