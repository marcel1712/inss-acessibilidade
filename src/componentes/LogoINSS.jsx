/**
 * Marca do INSS (releitura simplificada para fins didáticos).
 *
 * É uma imagem funcional: recebe role="img" e um nome acessível,
 * porque identifica de qual órgão é o aplicativo (WCAG 1.1.1).
 */
export default function LogoINSS({ tamanho = 120 }) {
  const pontos = [];
  for (let linha = 0; linha < 3; linha += 1) {
    for (let coluna = 0; coluna < 4; coluna += 1) {
      pontos.push({ x: 42 + coluna * 12, y: 36 + linha * 12 });
    }
  }

  return (
    <svg
      width={tamanho}
      height={tamanho * 0.63}
      viewBox="0 0 120 76"
      role="img"
      aria-label="INSS — Instituto Nacional do Seguro Social"
    >
      {/* Arco laranja */}
      <path
        d="M112 6c-26-6-58 4-78 24C22 42 16 54 20 60c-10-2-12-16 2-32C38 8 78-4 112 6z"
        fill="#E8A33D"
      />
      {/* Folha verde */}
      <ellipse
        cx="60"
        cy="42"
        rx="38"
        ry="27"
        transform="rotate(-20 60 42)"
        fill="#1B7A4B"
      />
      {/* Malha de pontos azuis */}
      <g fill="#1351B4" transform="rotate(-20 60 42)">
        {pontos.map((ponto) => (
          <circle key={`${ponto.x}-${ponto.y}`} cx={ponto.x} cy={ponto.y} r="4" />
        ))}
      </g>
    </svg>
  );
}
