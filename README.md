# Aprendizados sobre cache no Next.js

---

## Princípios do Cache no Next.js

No Next.js, temos algumas formas de manter o cache de informações para evitar a busca no DB.

A ideia com isso é de que o usuário nunca mais presencie telas de carregamento (como `loading.tsx` ou semelhantes) depois do primeiro acesso. Depois que o cache for atualizado, as novas informações serão servidas quando o usuário der refresh (F5) ou quando ele sair e entrar novamente na rota.

**Exemplo:** *"Durante a criação da página, uma requisição é feita ao backend e o cache da resposta é habilitado. Se outro usuário acessar a página, a resposta será servida do cache (cross-users)."*

**Importante:** O cache é compartilhado entre usuários e pode ser diferenciado via props da server action ou semelhante (preferencilamente strings ou numbers). Se a função receber dados via cookies ou headers, o servidor pode não conseguir diferenciar os usuários e as informações de um usuário serão servidas para outros.

---

### 1. Fecth API

Navivamente, o Next.js faz cache de chamadas `fetch()`. Temos a liberdade para, durante sua escrita, definirmos um objeto que define a execução do cache.

**Exemplo:** `next: { revalidate: 60, tags: ['get-items'] }` - Aqui definimos um tempo e uma tag para o cache.

Podemos invalidar o cache dessa informação chamando `revalidateTag('get-items')`. Dessa forma ele limpa e busca novos dados antes do tempo de revalidate.
Neste modelo, NÃO usamos `cacheLife` nem `cacheTag`.

**Importante:** A Fetch API faz mais sentido quando a API está em outro ambiente. Se estiver usando o server Next como API (server actions), utilizamos os modelos abaixo. Além disso, é recomendável o uso dela em server components, devido ao peso da requisição no client-side.

---

### 2. `unstable_cache` em server actions

Para permitir o cacheamento de informações em chamadas server-side no ambiente Next, passamos a usar o `unstable_cache` durante as requisições. Nesse modelo, temos q abraçar a server action.

**Exemplo:**

``` -
export const func = unstable_cache(async () => {

    return await db.table.select(*)
},
['products-list'], // Chave do cache (Cache Key)
{ revalidate: 3600, tags: ['products'] } // Opções de revalidação
)
```

**Observação:** *"O nome unstable_ é horrível, e a sintaxe de passar chaves manualmente é propensa a erros. Se você esquecer a chave ou errar o nome, o cache quebra."*

### 3. `'use cache'`

`'use cache'` do Next (API Experimental) é definida dentro de funções de request. Este método veio como **sucessor** do falho `unstable_cache` Ela faz uso de dois métodos: `cacheLife()` e `cacheTag()`:

1. `cacheLife()` Define regras de validação de cache por um tempo determinado. Definimos esses valores dentro do método, passando um objeto como esse: `{revalidate: X, stale: Y, expire: Z}` como parâmetro.

    - `stale` - Tempo que o dado é considerado "fresco". Enquanto estiver dentro deste tempo, o Next nem tenta ir no banco. Ele entrega o que tem e ponto final.
    - `revalidate` - Intervalo mínimo para tentar atualizar em background. Se o tempo stale passou, mas ainda estamos no período de revalidate, o Next entrega o dado velho e dispara uma função em background para atualizar o cache.
    - `expire` = Tempo máximo que o dado "velho" pode ser servido. Se passar disso, o Next joga o cache fora. O usuário vai ver um loading porque o dado é considerado perigoso demais para ser mostrado

2. `cacheTag()` Define uma tag (identificador) para atualizações manuais do cache. Ao chamar `revalidateTag` passando como parâmtro a tag da chamada, revalidamos aquela informação.

---

### Qual a diferença entre `'use cache' e fetch()` do Next e `cache()` do React?

`cache()` do React: Habilita o cache para chamadas durante a criação da página.

**Exemplo:** *"Durante a criação da página, o componente Header e Dashboard são criados e requisitam o mesmo dado do backend. O cache é habilitado e a requisição é feita uma única vez."*

**Importante:** Se o usuário clicar em um botão que chama uma função que usa cache(), a função será executada novamente e o cache será invalidado. Pois o cache é habilitado apenas durante a criação da página. O mesmo vale ao dar refresh (F5) na página.

---

### Uso de `revalidatePath`

`revalidatePath` - Invalida o cache de uma URL específica ou de um conjunto de rotas.

**Exemplo:** *"Quando se edita um post e quer que a página daquele post seja atualizada, usamos revalidatePath('rota')"*

**Importante:** Graças a necessidade de uma definição da rota como parâmetro, é trabalhoso limpar o cache caso ela apareça em várias rotas.

## Regras do ouro - Fixação do aprendizado

- cache() exita excessos durante a execução. fetch() e semelhantes guardam informação pra futuras chamadas
- 'Use cache' é o modelo mais novo e recomendado para server actions
- fetch() é recomendado para chamadas a APIs externas

