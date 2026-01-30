# Projeto Next.js

Projeto pessoal que segue sintaxe moderna do Next (Next.js +13)

---

## Preparando projeto / Dicas

* `<Image/>` do Next é muito mais performático do que a `<img>` padrão. Estas devem estar autorizadas a serem baixadas pela aplicação. Isso é configurado dentro do `next.config`, com `remotePatterns`.

* Aqui o `/pages` não existe. Com base no conteúdo do `/app`, rotas são criadas dinamicamente.
  **Exemplo:**
  Dentro de `/app`, criamos `/about`, `/account`, `/user/[id]` etc. Tudo isso permite a criação de rotas aninhadas e com conteúdo dinâmico (clássico `useParams`).

* `@` no path é uma referência ao `/src` da aplicação.
  **Exemplo:** `"@/components/Card"`.

* Podemos inserir fontes do Google Fonts de forma nativa com Next (presente em `layout.tsx`).

* `'use client'` deve ser usado em arquivos que requerem APIs de navegador, hooks ou interatividade, como `useState`, `useEffect`, `onClick`, `localStorage`, etc.
  Isso os transforma em **Client Components**.
  Server Components são o padrão do Next. Podemos conectar a banco de dados e etc. sem fazer uso de `fetch`, pois eles se encontram no mesmo ambiente. O Next entrega apenas o HTML pronto para o usuário.

* `'use server'` é extremamente necessário em **Server Actions**, com as quais podemos remover a parte de fetch/rotas da aplicação, importando diretamente as funções que se conectam ao backend no componente clicável do navegador.
  Esse processo “protege” a chamada à API, transformando-a em algo como `callServerAction()` no HTML da página buildada.
  Comumente ela fica apenas no arquivo `controllers/actions.ts`, que é chamado pelos componentes.

* O next moderno possui memoização nativa de requisições, apresentada em `src/api/fetchMemo.ts`.
---

## Organização de rotas

Dentro de `/app`, definimos as rotas da aplicação. Dentro dela, existem nuances importantes para a construção da aplicação.

---

### Nome do arquivo — O que ele faz?

| Arquivo         | Função                                                                 |
| --------------- | ---------------------------------------------------------------------- |
| `page.tsx`      | É a tela em si. Torna aquela pasta acessível publicamente.             |
| `layout.tsx`    | A moldura. Envolve a página (cabeçalho, rodapé, sidebar).              |
| `loading.tsx`   | O esqueleto. Aparece automaticamente enquanto a page carrega.          |
| `error.tsx`     | A barreira. Aparece se a page der erro (Error Boundary).               |
| `route.ts`      | A API. Transforma a pasta num endpoint de backend (substituto do api). |
| `not-found.tsx` | O 404. Tela de página não encontrada específica daquela rota.          |

---

## Dicas para criação de rotas

### Route Groups `()`

Servem para agrupar rotas com layouts padronizados, sem criar necessariamente URLs aninhadas.

```text
app
└── (auth)
    ├── layout.tsx
    └── login
        └── page.tsx
```

Isso gera a rota: `/login` (não `/auth/login`).

---

### Rotas privadas `_`

Servem para alocar componentes e recursos que não devem aparecer como rotas.

```text
app
└── checkout
    ├── layout.tsx
    └── form
        ├── page.tsx
        └── _utils
            └── CEPCalc.ts
```

Aqui, a função utilitária `CEPCalc.ts` não irá aparecer como rota, pois toda a pasta `_utils` é desconsiderada.

---

### `middleware.ts`

Utilizado para garantir que rotas protegidas não sejam acessadas.
Por uma questão de performance, esse é o padrão do Next.

Ele funciona como um `useAuth` do front-end, que apenas verifica superficialmente a existência do token, sem renderizar a rota antes disso.


## Renderização no Next moderno

* O uso de servers componentes (assíncronos) em junção de ` <Suspense/>` otimiza a renderização da interface (render streaming). Mais detalhes em `src/components/DelayedCard`.

* `useOptimistic` trás ótimos resultados em situações onde a tela muda primeiro, e o backend trás a resposta concreta posteriormente (ex: Botão de like primeiro fica em destaque e altera valores, depois desfaz, caso tenha dado erro na requisição.). Mais detalhes do exemplo em `src/components/LikeButton`
