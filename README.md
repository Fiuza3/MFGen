# MFGen

Gerador de imagens com a identidade visual da
[MF Desenvolvimento](https://mfdesenvolvimento.online).
Escolha um template, defina a dimensão, preencha os campos editáveis e exporte
um PNG na resolução exata.

Sem APIs externas, sem backend. Os templates são componentes React
renderizados no navegador e capturados como imagem — rápido, previsível e
100% grátis para hospedar.

## Como funciona

1. **Galeria** — escolha um dos templates disponíveis (Terminal, Commit, Destaque, Code Block).
2. **Proporção** — clique num preset (1:1, 9:16, 16:9, 4:3, 3:4) ou entre com
   dimensões livres no modo `Custom`.
3. **Conteúdo** — preencha tag, título e subtítulo. O preview atualiza em tempo real.
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
│   ├── layout.tsx          # Fontes (Inter, JetBrains Mono) e metadata
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
│   ├── terminal/           # Janela de terminal
│   ├── commit/             # Linha de commit log
│   ├── tag/                # Destaque com tag + título grande
│   └── code-block/         # Bloco estilo IDE com gutter
│
├── recursos/               # Features do app
│   ├── proporcao/          # Catálogo + seletor + dimensão custom
│   ├── editor/             # Tipos do conteúdo + form (tag/título/subtítulo)
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
- **`html-to-image`** para capturar o template como PNG na resolução exata.
- **`next/font`** para self-host de Inter (sans) e JetBrains Mono (mono).

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

## Roadmap

- Persistir últimas gerações em `localStorage`.
- Compartilhar uma imagem via URL com estado serializado.
- Mais templates (carrossel multipage, capa de live, thumbnail de YouTube).
- Upload de imagem/ícone em templates que comportem.
- Tema claro alternativo.
- Testes (Vitest + Playwright para o fluxo de exportação).

## Licença

Código sob licença MIT. A identidade visual da MF Desenvolvimento
(logo, paleta) é de uso restrito a este projeto.
