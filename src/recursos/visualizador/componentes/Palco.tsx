"use client";

import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import type { Dimensao } from "@/recursos/proporcao/tipos";

import { calcularEscala } from "../escala";

type PalcoProps = {
  dimensao: Dimensao;
  children: ReactNode;
};

/**
 * Mantém o template em tamanho real no DOM (importante para captura
 * fiel ao exportar) e aplica `transform: scale()` num wrapper para a
 * imagem caber visualmente no espaço disponível. O ref encaminhado
 * aponta para o nó com a dimensão real, que é o que o exportador captura.
 */
export const Palco = forwardRef<HTMLDivElement, PalcoProps>(function Palco(
  { dimensao, children },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tamanhoContainer, setTamanhoContainer] = useState({
    largura: 0,
    altura: 0,
  });

  useLayoutEffect(() => {
    const elemento = containerRef.current;
    if (!elemento) return;

    const atualizar = () => {
      const { clientWidth, clientHeight } = elemento;
      setTamanhoContainer({ largura: clientWidth, altura: clientHeight });
    };

    atualizar();

    const observador = new ResizeObserver(atualizar);
    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  useEffect(() => {
    // Atualiza também quando a dimensão alvo muda, garantindo recálculo.
    if (containerRef.current) {
      setTamanhoContainer({
        largura: containerRef.current.clientWidth,
        altura: containerRef.current.clientHeight,
      });
    }
  }, [dimensao.largura, dimensao.altura]);

  const escala = calcularEscala(tamanhoContainer, dimensao);

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
          ref={ref}
          style={{
            width: dimensao.largura,
            height: dimensao.altura,
            transform: `scale(${escala})`,
            transformOrigin: "top left",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
});
