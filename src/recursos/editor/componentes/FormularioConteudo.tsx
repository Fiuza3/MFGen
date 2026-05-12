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
      <CampoTexto
        rotulo="CTA"
        valor={conteudo.cta}
        aoMudar={(cta) => aoMudar({ cta })}
        placeholder="Solicite seu orçamento"
        maximo={40}
      />
      <CampoTexto
        rotulo="Contato"
        valor={conteudo.contato}
        aoMudar={(contato) => aoMudar({ contato })}
        placeholder="@mfdesenvolvimento · wa.me/55..."
        maximo={60}
        mono
      />
      <CampoTexto
        rotulo="Preço"
        valor={conteudo.preco}
        aoMudar={(preco) => aoMudar({ preco })}
        placeholder="A partir de R$ 1.500"
        maximo={40}
      />
    </div>
  );
}
