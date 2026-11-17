import { useId } from "react";

/**
 * Marca do INSS (releitura em SVG para fins didáticos).
 *
 * Desenho: oval formado por um crescente verde (esquerda) e um amarelo
 * (direita), com a esfera de quadrados azuis no centro.
 *
 * É uma imagem FUNCIONAL — identifica de qual órgão é o serviço — então
 * recebe role="img" e um nome acessível (WCAG 1.1.1). Quando aparece ao lado
 * do texto "Meu INSS", passe decorativa para não repetir a leitura.
 */

const VERDE = "#00875A";
const AMARELO = "#F2B84B";
const AZUL = "#1A6FB5";

/**
 * Gera os quadrados da esfera: uma grade de latitude × longitude projetada
 * numa esfera, então os quadrados encolhem perto das bordas, como na marca.
 */
function gerarQuadrados() {
  const cx = 100;
  const cy = 70;
  const raioX = 47;
  const raioY = 52;
  const divisoes = 8;
  const limite = (Math.PI / 2) * 0.96;
  const folga = 0.19; // espaço branco entre os quadrados

  const projetar = (lon, lat) => [
    cx + raioX * Math.sin(lon) * Math.cos(lat),
    cy + raioY * Math.sin(lat),
  ];
  const angulo = (indice, fracao) =>
    -limite + (2 * limite * (indice + fracao)) / divisoes;

  const quadrados = [];
  for (let i = 0; i < divisoes; i += 1) {
    for (let j = 0; j < divisoes; j += 1) {
      const lonCentro = angulo(i, 0.5);
      const latCentro = angulo(j, 0.5);
      // Corta os cantos da grade para formar o contorno redondo.
      if (Math.cos(lonCentro) * Math.cos(latCentro) < 0.24) continue;

      const lon0 = angulo(i, folga);
      const lon1 = angulo(i, 1 - folga);
      const lat0 = angulo(j, folga);
      const lat1 = angulo(j, 1 - folga);
      const cantos = [
        projetar(lon0, lat0),
        projetar(lon1, lat0),
        projetar(lon1, lat1),
        projetar(lon0, lat1),
      ];
      quadrados.push(
        cantos.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" "),
      );
    }
  }
  return quadrados;
}

const QUADRADOS = gerarQuadrados();

export default function LogoINSS({ tamanho = 120, decorativa = false }) {
  // id único: a marca pode aparecer mais de uma vez na mesma página.
  const idRecorte = useId();
  const acessibilidade = decorativa
    ? { "aria-hidden": true, focusable: "false" }
    : {
        role: "img",
        "aria-label": "INSS — Instituto Nacional do Seguro Social",
      };

  return (
    <svg
      className="logo-inss"
      width={tamanho}
      height={Math.round(tamanho * 0.7)}
      viewBox="0 0 200 140"
      {...acessibilidade}
    >
      <defs>
        <clipPath id={idRecorte}>
          <ellipse cx="100" cy="70" rx="98" ry="68" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${CSS.escape(idRecorte)})`}>
        {/* Crescente verde: borda interna em "<", abraçando a esfera */}
        <path
          d="M0 0H77C56 18 42 44 45 74C62 86 82 112 102 140H0Z"
          fill={VERDE}
        />
        {/* Crescente amarelo: o mesmo desenho girado 180° */}
        <path
          d="M200 140H123C144 122 158 96 155 66C138 54 118 28 98 0H200Z"
          fill={AMARELO}
        />
      </g>
      <g fill={AZUL}>
        {QUADRADOS.map((pontos) => (
          <polygon key={pontos} points={pontos} />
        ))}
      </g>
    </svg>
  );
}
