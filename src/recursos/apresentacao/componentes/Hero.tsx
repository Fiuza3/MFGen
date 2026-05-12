"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { LogoAnimado } from "@/identidade/LogoAnimado";

import { links } from "../links";

const SUAVE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-mf-borda">
      <BrilhoFundo />
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-6 py-24 text-center lg:py-32">
        <LogoAnimado tamanho={120} />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.55, ease: SUAVE }}
          className="flex flex-col items-center gap-5"
        >
          <h1 className="font-mono text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight">
            MFgen
          </h1>
          <p className="max-w-xl text-lg text-mf-texto-secundario sm:text-xl">
            Gerador de imagens com a identidade da MF Desenvolvimento.
            Escolhe o template, ajusta o que quiser e exporta um PNG na
            resolução exata — em segundos, sem IA e sem servidor.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.55, ease: SUAVE }}
          className="flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link
            href="/gerar"
            className="inline-flex items-center gap-2 rounded-full bg-mf-accent px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-mf-fundo transition-colors hover:bg-mf-accent-forte"
          >
            Abrir gerador
            <span aria-hidden>→</span>
          </Link>
          <a
            href={links.whatsapp.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-mf-borda-forte px-6 py-3 font-mono text-sm uppercase tracking-widest text-mf-texto transition-colors hover:border-mf-accent hover:text-mf-accent"
          >
            Quero um site assim
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function BrilhoFundo() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full"
      style={{
        background: "#3DF2E0",
        opacity: 0.08,
        filter: "blur(120px)",
      }}
    />
  );
}
