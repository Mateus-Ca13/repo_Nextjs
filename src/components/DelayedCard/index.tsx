import React from 'react'
import { db } from '@/lib/dbClient'

/* Mudança DRÁSTICA na criação de componentes:

Agora, encerra-se o uso excessivo de useEffect com useState (data, isLoading), pois transformam
desnecessariamente o compomnente em client component. Agora a função vira assíncrona e salva o valor de
uma server action numa simples variável. 

Isso trabalha em conjunto com o <Suspense/> nativo do React. Com isso fazemos render streaming 
(carregamento parcelado da interface).
*/

export default async function DelayedCard() {

    await new Promise(resolve => setTimeout(resolve, 3000));
    const user = await db.user.find(); // Busca direta

  return (
    <div className='text-center'>
    <p>Fetch concluído</p>
    </div>
  )
}
