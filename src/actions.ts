'use server'
import { cacheLife, cacheTag } from "next/cache";


const getDashboardData = async () => {
    'use cache'

    cacheLife({
        revalidate: 60 * 60, // 1 hora
        expire: 60 * 60 * 24, // 24 horas
        stale: 60 * 5, // 5 minutos
    }); // Revalida a cada hora
    cacheTag('dashboard'); // Revalida quando for chamado cacheTag('dashboard')


    await new Promise(resolve => setTimeout(resolve, 3000));

    return {
        name: "Dashboard",
        data: [
            { id: 1, name: "Item 1" },
            { id: 2, name: "Item 2" },
            { id: 3, name: "Item 3" },
        ]
    }
}


const getDashboardDataWithoutCacheLife = async () => {


    await new Promise(resolve => setTimeout(resolve, 3000));

    return {
        name: "Dashboard",
        data: [
            { id: 1, name: "Item 1" },
            { id: 2, name: "Item 2" },
            { id: 3, name: "Item 3" },
        ]
    }
}

export { getDashboardData, getDashboardDataWithoutCacheLife }