/* 
Em projetos next, às vezes devemos aposentar contextos globais e pedir o request no componente. 
Fazemos isso devido a análise avançada do Next, que identifica e faz cache da informação
anteriormente requisitada. 

Isso funciona por padrão no fetch() nativo, mas para ser configurado 
em actions servers precisamos usar o objeto cache, do react.
*/

import { cache } from 'react';
import db from '@/lib/dbClient'  //Client de algum DB Serverless;

// Envolvemos a função do banco com o "cache"
export const getCurrentUser = cache(async (id: string) => {
  
  const user = await db.user.findUnique({ where: { id } });
  return user;
});