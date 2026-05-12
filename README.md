# MFGen

Gerador de imagens com a identidade visual da
[MF Desenvolvimento](https://mfdesenvolvimento.online).
Escolha um template, defina a dimensão, preencha os campos editáveis e exporte
um PNG na resolução exata.

Sem APIs externas, sem backend. Os templates são componentes React
renderizados no navegador e capturados como imagem — rápido, previsível e
100% grátis para hospedar.

## Rotas

- **`/`** — Apresentação. Conta o que é o MFgen, lista os passos, mostra
  formas de contato e o convite para encomendar um site no mesmo estilo.
- **`/gerar`** — O gerador propriamente dito (galeria, editor e
  exportador).

## Como funciona

1. **Galeria** — escolha um template:
   - **Marca** — logo `<MF/>` centralizado com glow, ideal para avatar
   - **Post Instagram** (1:1) — feed quadrado para divulgação de serviço
   - **Story / Reels** (9:16) — vertical com CTA forte
   - **Anúncio OLX** — preço destacado + contato, para classificados
   - **Carrossel — Capa** (1:1) — primeira página de carrossel IG
   - **Terminal**, **Commit**, **Destaque**, **Code Block** — variantes dev/CLI
2. **Proporção** — clique num preset (1:1, 9:16, 16:9, 4:3, 3:4) ou entre com
   dimensões livres no modo `Custom`.
3. **Conteúdo** — preencha tag, título, subtítulo, CTA, contato e preço.
   Cada template usa o que faz sentido; o preview atualiza em tempo real.
4. **Exportar PNG** — captura o template em tamanho real e baixa um PNG com
   nome `mfgen-{template}-{LxA}-{timestamp}.png`.

O preview central usa `transform: scale()` apenas para a exibição caber na
tela. No DOM, o template existe sempre na dimensão real — é esse nó que o
exportador captura, por isso o PNG sai com a resolução exata pedida.

## Como rodar

Requer Node 20.9+.

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Estrutura de pastas

```
src/
├── app/                    # Rotas do Next.js (App Router)
│   ├── layout.tsx          # Fontes (Geist, Geist Mono) e metadata
│   ├── page.tsx            # Página única do gerador
│   └── globals.css         # Tokens Tailwind + reset
│
├── identidade/             # Tokens da marca MF Desenvolvimento
│   ├── cores.ts            # Paleta hex
│   ├── tipografia.ts       # Famílias e pesos
│   └── Logo.tsx            # Componente <MF/>
│
├── templates/              # Galeria de templates
│   ├── tipos.ts            # PropsTemplate, MetadadosTemplate, EntradaRegistro
│   ├── registro.ts         # Lista única de templates disponíveis
│   ├── escala.ts           # Helper de escala usado por todos os templates
│   ├── marca/              # Logo gigante centralizado
│   ├── post-instagram/     # Post quadrado de divulgação
│   ├── story-reels/        # Story / Reels (9:16)
│   ├── anuncio-olx/        # Anúncio com preço + contato
│   ├── carrossel-capa/     # Capa de carrossel
│   ├── terminal/           # Janela de terminal
│   ├── commit/             # Linha de commit log
│   ├── tag/                # Destaque com tag + título grande
│   └── code-block/         # Bloco estilo IDE com gutter
│
├── recursos/               # Features do app
│   ├── proporcao/          # Catálogo + seletor + dimensão custom
│   ├── editor/             # Tipos do conteúdo + form (tag, título, subtítulo, CTA, contato, preço)
│   ├── galeria/            # SeletorTemplate + CardMiniatura
│   ├── visualizador/       # Palco com escala dinâmica
│   └── exportador/         # html-to-image + botão de exportar
│
└── compartilhado/          # UI/hooks/utils genéricos
    └── hooks/
        └── useEstadoGerador.ts    # Estado central do app
```

### Por que essa estrutura

Escolhi **feature-first** com um **núcleo de identidade** separado.

- **`identidade/`** isola os tokens da marca (paleta, tipografia, logo).
  Mudar uma cor é mudar um arquivo só, e todos os templates pegam a mudança.
- **`templates/`** é uma galeria desacoplada: cada template é uma pasta com
  componente e meta. Adicionar um template novo é só criar a pasta e
  registrar uma linha em `registro.ts` — nada mais precisa mexer.
- **`recursos/`** agrupa por **domínio do usuário** (proporção, editor,
  galeria, visualizador, exportador), não por tipo de arquivo. Para mexer
  em "exportação", você abre uma pasta só.
- **`compartilhado/`** é a "biblioteca interna" — só entra aqui o que for
  realmente reusado por mais de uma feature.
- **Não** existe pasta `nucleo/` ou `lib/dominio/` porque, sem backend,
  não há domínio "puro" complexo o bastante para justificar uma camada
  extra. KISS — mantenha simples enquanto for simples.

A linguagem do código é portuguesa onde faz sentido humano (`recursos/`,
`identidade/`, `dimensao`, `conteudo`), e mantém o inglês quando é
convenção estabelecida (`useState`, `useEstadoGerador`, `props`).

## Stack

- **Next.js 16** (App Router) + **TypeScript**.
- **Tailwind CSS v4** com tokens da marca expostos via `@theme inline`.
- **`framer-motion`** para as animações da página de apresentação e do logo.
- **`html-to-image`** para capturar o template como PNG na resolução exata.
- **`next/font`** para self-host de Geist (sans) e Geist Mono (mono),
  alinhado com a tipografia do `mfdesenvolvimento.online`.

## Adicionar um novo template

1. Crie a pasta `src/templates/<id>/`.
2. Crie `meta.ts` exportando um `MetadadosTemplate` com `id`, `nome`,
   `descricao` e `camposUsados`.
3. Crie o componente, recebendo `PropsTemplate` (`dimensao` + `conteudo`)
   e renderizando em tamanho real.
4. Registre em `src/templates/registro.ts` adicionando uma linha ao array
   `templates`.

Dica: use o fator `Math.min(largura, altura) / 1080` para escalar tamanhos
internos — assim os templates ficam visualmente equivalentes em diferentes
proporções.

## Deploy

Pensado para Vercel (free tier):

```bash
vercel
```

Ou conecte o repositório no painel da Vercel — o `build` padrão do
Next.js já cobre tudo. Não há variáveis de ambiente para configurar.

## Paleta

Espelha o site `mfdesenvolvimento.online`:

| Token | Hex |
|---|---|
| `fundo` | `#0B0F14` |
| `superficie` | `#141C26` |
| `borda` | `#1E2A38` |
| `texto` | `#F7FAFC` |
| `texto-secundario` | `#A0AEC0` |
| `accent` | `#3DF2E0` |

Definidos em [`src/identidade/cores.ts`](src/identidade/cores.ts) e espelhados em
[`src/app/globals.css`](src/app/globals.css) (`@theme inline`).

### Logo

O componente [`Logo`](src/identidade/Logo.tsx) é um SVG `<text>` com as
mesmas métricas do logo do `mfdesenvolvimento.online`:

- Cor base: `accent` (`#3DF2E0`) — **tudo** ciano.
- Peso: `700` (Geist Mono Bold).
- Opacidade dos colchetes `<` e `/>`: `0.58` (variante `compacto`: `0.28`).
  É a opacidade que dá a aparência de "tom menor", não uma cor diferente.
- Avanço de glifo (advance width) e padding seguem o ratio extraído do
  Geist Mono em `fontSize 22` — escala proporcional em qualquer `tamanho`.

Props `cor`, `opacidadeColchetes` e `compacto` permitem variantes pontuais,
mas o default já sai idêntico ao site.

## Roadmap

- Persistir últimas gerações em `localStorage`.
- Compartilhar uma imagem via URL com estado serializado.
- Slides internos do carrossel (numeração 02/06, 03/06...).
- Upload de imagem/ícone em templates que comportem.
- Tema claro alternativo.
- Testes (Vitest + Playwright para o fluxo de exportação).

## Licença

Código sob licença MIT. A identidade visual da MF Desenvolvimento
(logo, paleta) é de uso restrito a este projeto.
