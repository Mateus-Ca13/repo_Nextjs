// SSG - Por padrão, o Next mantém cache: force-cache (cache no build, não busca depois)

const API_URL = 'http://apiurl.com.br'

async function getDataSSG (id: string){
    const data = await fetch(API_URL).then(response => response.json())
    return data
}

// SSG - Fetch no build, mas revalida (refetch) a cada intervalo de tempo.

async function getDataISR (id: string){
    const data = await fetch(API_URL, {next: {revalidate: 60}}).then(response => response.json())
    return data
}

// SSR - Dinâmico. Sempre retorna dados a cada refresh de página. 

async function getDataSSR (id: string){
    const data = await fetch(API_URL, {cache: 'no-cache'}).then(response => response.json())
    return data
}

// ISR por tag - Ao invés de tempo, revalida dados apartir de gatilhos vinculados à uma tag.

async function getDataISRByTag (id: string){
    const data = await fetch(API_URL, {next: {tags: ['data-tag']}}).then(response => response.json())
    return data
}