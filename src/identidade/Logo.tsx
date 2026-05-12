import { cores } from "./cores";
import { familias } from "./tipografia";

type LogoProps = {
  /** Altura/fontSize em px. O viewBox cresce proporcionalmente. */
  tamanho?: number;
  /** Cor base de todos os glifos. Default: accent. */
  cor?: string;
  /** Opacidade dos colchetes "<" e "/>". Default: 0.58 (compacto: 0.28). */
  opacidadeColchetes?: number;
  /** Variante mais sutil — `<` e `/>` quase apagados. */
  compacto?: boolean;
  className?: string;
};

// Metrics do Geist Mono no fontSize 22, extraídas do logo do site.
// Mantidos como ratio para escalar em qualquer tamanho.
const RATIO_AVANCO = 13.2 / 22;
const RATIO_ALTURA = 30 / 22;
const RATIO_PADDING = 1 / 22;

export function Logo({
  tamanho = 24,
  cor = cores.accent,
  opacidadeColchetes,
  compacto = false,
  className,
}: LogoProps) {
  const cw = tamanho * RATIO_AVANCO;
  const altura = tamanho * RATIO_ALTURA;
  const padX = tamanho * RATIO_PADDING;
  const larguraTotal = padX + cw * 5;
  const opColchetes = opacidadeColchetes ?? (compacto ? 0.28 : 0.58);

  const textoBase = {
    dominantBaseline: "central" as const,
    fontFamily: familias.mono,
    fontWeight: 700,
    fontSize: tamanho,
    fill: cor,
    y: altura / 2,
  };

  return (
    <svg
      role="img"
      aria-label="MF Desenvolvimento"
      viewBox={`0 0 ${larguraTotal} ${altura}`}
      height={altura}
      style={{ width: "auto", overflow: "visible" }}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <text {...textoBase} x={padX} fillOpacity={opColchetes}>
        {"<"}
      </text>
      <text {...textoBase} x={padX + cw}>
        MF
      </text>
      <text {...textoBase} x={padX + cw * 3} fillOpacity={opColchetes}>
        {"/>"}
      </text>
    </svg>
  );
}
