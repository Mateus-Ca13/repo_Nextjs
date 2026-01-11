'use client'; // Obrigatório porque tem interação

import { useOptimistic } from 'react';
import { addLike } from '@/app/actions';

export default function LikeButton({ likes, postId }: { likes: number, postId: string }) {
  
  // optimisticLikes: O número que o usuário VÊ.
  // addOptimisticLike: A função que a gente chama para "mentir" pro usuário.

  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes, // Estado inicial (vem do servidor)
    (state, novoValor: number) => state + novoValor // Como calcular o novo estado
  );

  const handleClick = async () => {
    // Atualiza a tela instantaneamente
    addOptimisticLike(1);

    // Chama o servidor em background
    await addLike(postId);
  };

  return (
    <button onClick={handleClick}>
       ❤️ {optimisticLikes} Likes
    </button>
  );
}
