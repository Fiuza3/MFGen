"use client";

import { CampoTexto } from "./CampoTexto";
import { CampoTextoArea } from "./CampoTextoArea";
import type { Conteudo } from "../tipos";

type FormularioConteudoProps = {
  conteudo: Conteudo;
  aoMudar: (parcial: Partial<Conteudo>) => void;
};

/**
 * Reúne os campos editáveis (tag, título, subtítulo). Sempre mostra
 * todos — os templates filtram o que realmente usam, mas manter o
 * formulário consistente evita que o usuário "perca" um campo ao
 * trocar de template.
 */
export function FormularioConteudo({
  conteudo,
  aoMudar,
}: FormularioConteudoProps) {
  return (
    <div className="flex flex-col gap-4">
      <CampoTexto
        rotulo="Tag"
        valor={conteudo.tag}
        aoMudar={(tag) => aoMudar({ tag })}
        placeholder="RELEASE, TUTORIAL..."
        maximo={20}
        mono
      />
      <CampoTexto
        rotulo="Título"
        valor={conteudo.titulo}
        aoMudar={(titulo) => aoMudar({ titulo })}
        placeholder="Texto de destaque"
        maximo={80}
      />
      <CampoTextoArea
        rotulo="Subtítulo"
        valor={conteudo.subtitulo}
        aoMudar={(subtitulo) => aoMudar({ subtitulo })}
        placeholder="Descrição curta que apoia o título"
        maximo={160}
      />
    </div>
  );
}
