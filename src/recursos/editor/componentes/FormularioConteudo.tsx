"use client";

import { CampoTexto } from "./CampoTexto";
import { CampoTextoArea } from "./CampoTextoArea";
import type { Conteudo } from "../tipos";

type FormularioConteudoProps = {
  conteudo: Conteudo;
  aoMudar: (parcial: Partial<Conteudo>) => void;
};

// O formulário expõe todos os campos sempre. Os templates consomem só
// o que precisam, mas trocar de template não pode apagar o que já foi
// digitado — daí mantermos o conjunto completo no estado.
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
