"use client";

import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import type { Dimensao } from "@/recursos/proporcao/tipos";

import { calcularEscala } from "../escala";

type PalcoProps = {
  dimensao: Dimensao;
  children: ReactNode;
};

// O nó com `ref` fica em tamanho real (sem transform) para que o
// exportador capture a imagem na resolução correta. O scale visual
// vive num wrapper externo, só para o preview caber na tela.
export const Palco = forwardRef<HTMLDivElement, PalcoProps>(function Palco(
  { dimensao, children },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tamanho, setTamanho] = useState({ largura: 0, altura: 0 });

  useLayoutEffect(() => {
    const elemento = containerRef.current;
    if (!elemento) return;

    const medir = () => {
      setTamanho({
        largura: elemento.clientWidth,
        altura: elemento.clientHeight,
      });
    };

    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  const escala = calcularEscala(tamanho, dimensao);

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full items-center justify-center"
    >
      <div
        style={{
          width: dimensao.largura * escala,
          height: dimensao.altura * escala,
          position: "relative",
        }}
      >
        <div
          style={{
            transform: `scale(${escala})`,
            transformOrigin: "top left",
            position: "absolute",
            inset: 0,
          }}
        >
          <div
            ref={ref}
            style={{ width: dimensao.largura, height: dimensao.altura }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
});
