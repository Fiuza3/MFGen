import Link from "next/link";

import { LogoAnimado } from "@/identidade/LogoAnimado";
import { ComoFunciona } from "@/recursos/apresentacao/componentes/ComoFunciona";
import { Contato } from "@/recursos/apresentacao/componentes/Contato";
import { Hero } from "@/recursos/apresentacao/componentes/Hero";
import { OfertaServico } from "@/recursos/apresentacao/componentes/OfertaServico";

export default function PaginaApresentacao() {
  return (
    <div className="min-h-full bg-mf-fundo text-mf-texto">
      <Cabecalho />
      <Hero />
      <ComoFunciona />
      <OfertaServico />
      <Contato />
      <Rodape />
    </div>
  );
}

function Cabecalho() {
  return (
    <header className="sticky top-0 z-10 border-b border-mf-borda bg-mf-fundo/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <LogoAnimado tamanho={22} />
        <Link
          href="/gerar"
          className="font-mono text-xs uppercase tracking-widest text-mf-texto-secundario transition-colors hover:text-mf-accent"
        >
          abrir gerador →
        </Link>
      </div>
    </header>
  );
}

function Rodape() {
  return (
    <footer className="border-t border-mf-borda px-6 py-8">
      <div className="mx-auto flex max-w-5xl items-center justify-between font-mono text-xs uppercase tracking-widest text-mf-texto-sutil">
        <span>mfgen / {new Date().getFullYear()}</span>
        <span>marcus fiuza</span>
      </div>
    </footer>
  );
}
