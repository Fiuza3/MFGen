"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cores } from "./cores";
import {
  RATIO_ALTURA_LOGO,
  RATIO_AVANCO_LOGO,
  RATIO_PADDING_LOGO,
} from "./Logo";
import { familias } from "./tipografia";

type LogoAnimadoProps = {
  tamanho?: number;
  cor?: string;
  opacidadeColchetes?: number;
  className?: string;
};

const SUAVE = [0.16, 1, 0.3, 1] as const;

// Variante interativa do Logo para uso na UI: fade-in escalonado nos
// três glifos e drop-shadow ciano no hover. Respeita prefers-reduced-motion.
// Para uso dentro de templates exportados, prefira o `Logo` estático.
export function LogoAnimado({
  tamanho = 24,
  cor = cores.accent,
  opacidadeColchetes = 0.58,
  className,
}: LogoAnimadoProps) {
  const reduzido = useReducedMotion();
  const cw = tamanho * RATIO_AVANCO_LOGO;
  const altura = tamanho * RATIO_ALTURA_LOGO;
  const padX = tamanho * RATIO_PADDING_LOGO;
  const larguraTotal = padX + cw * 5;

  const base = {
    dominantBaseline: "central" as const,
    fontFamily: familias.mono,
    fontWeight: 700,
    fontSize: tamanho,
    fill: cor,
    y: altura / 2,
  };

  const entrar = (delay: number) =>
    reduzido
      ? undefined
      : {
          initial: { opacity: 0, y: 5 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.42, ease: SUAVE },
        };

  return (
    <svg
      role="img"
      aria-label="MF Desenvolvimento"
      viewBox={`0 0 ${larguraTotal} ${altura}`}
      height={altura}
      style={{ width: "auto", overflow: "visible" }}
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-[filter] duration-300 hover:[filter:drop-shadow(0_0_9px_rgba(61,242,224,0.6))] ${className ?? ""}`}
    >
      <motion.text
        {...base}
        {...entrar(0)}
        x={padX}
        fillOpacity={opacidadeColchetes}
      >
        {"<"}
      </motion.text>
      <motion.text {...base} {...entrar(0.08)} x={padX + cw}>
        MF
      </motion.text>
      <motion.text
        {...base}
        {...entrar(0.16)}
        x={padX + cw * 3}
        fillOpacity={opacidadeColchetes}
      >
        {"/>"}
      </motion.text>
    </svg>
  );
}
