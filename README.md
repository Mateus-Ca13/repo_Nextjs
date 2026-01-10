# Projeto Next.js 14

Projeto pessoal que segue sintaxe moderna do Next (Next.js +13) 

## Preparando projeto / Dicas 

- <Image/> do Next é muito mais performático do q <img> padrão. Estas devem estar altorizadas de serem baixadas pela aplicação. Isso é configurado dentro do next.config, com remotePatterns.

- Aqui o /pages não existe. Com base no conteúdo do /app, rotas são criadas dinamicamente.
 Ex:
 Dentro de /app, criamos /about, /account, /user/[id] e etc. Tudo isso permite a criação de rotas aninhadas e com conteúdo dinâmico (clássico useParams).

 - @ no path, é uma referencia ao /src da aplicação. Ex: "@/components/Card".

 - Podemos inserir fontes do google fonts de forma nativa com next (presente em layout.tsx).

 - 'use client' deve ser usado em arquivos q requerem apis de navegador, hooks ou interatividade, como useState, useEffect, onClick,localStorage, etc. Isso os transforma em Client components.
 Server components são o padrão do Next. Podemos conectar a banco de dados e etc sem fazer uso de fetch, pois eles se encontram no mesmo ambiente. O next entrega apenas o HTML pronto para o usuário.

- 'use server' é extremamente necessário em actions servers, com as quais podemos remover a parte de fetch/rotas da aplicação, importando diretamente as funções q se conectam ao backend no componente clicável e etc. do navegador. Esse processo "protege" a chamada à API, transformando a em algo como "callServerAction()" no HTML da página buildada. Comumente ela só vai no arquivo controllers/actions.ts, que é chamado pelos componentes.

## Organização de rotas

Dentro de /app, definimos as rotas da aplicação. Dentro dela, existem nuances importantes para a construção da aplicação.

### Nome do Arquivo	--------- O que ele faz?

- page.tsx	        É a tela em si. Torna aquela pasta acessível publicamente.
- layout.tsx	        A moldura. Envolve a página (cabeçalho, rodapé, sidebar).
- loading.tsx	        O esqueleto. Aparece automaticamente enquanto a page carrega.
- error.tsx	        A barreira. Aparece se a page der erro (ErrorBoundary).
- route.ts	        A API. Transforma a pasta num endpoint de backend (substituto do api.ts).
- not-found.tsx	    O 404. Tela de página não encontrada específica daquela rota.

### Dicas para criação de rotas

- Routes groups `()` servem para a grupar rotas com layouts padronizados, sem criar necessáriamente urls aninhadas. Ex:

app
└──(auth)
    ├── layout.tsx
    └── login
        └── page.tsx  

- Isso gera a rota /login (não /auth/login).

- Rotas privadas `_` servem para alocar componentes e recursos q não devem aparecer nas rotas. Ex:

app
└── checkout
    ├── layout.tsx
    └── form
        ├── page.tsx  
        └── _utils
            └── CEPCalc.ts 

- Aqui, a função utilitária `CEPCalc.ts` não irá aparecer como rota, pois toda a pasta `_utils` é desconsiderada.


- middleware.ts é utilizado para garantir q rotas protegidas não sejam acessadas (por uma questão de perfomance, esse é o padrão do Next). Ele funciona como um useAuth do front-end, que apenas verifica superficialmente a existência do token, sem renderizar as rotas antes disso.
