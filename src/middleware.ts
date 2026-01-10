// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Tenta pegar o cookie de autenticação
  const token = request.cookies.get('auth_token')?.value;

  // 2. Define quais rotas são protegidas
  const rotaProtegida = request.nextUrl.pathname.startsWith('/dashboard');

  // 3. A Lógica do Segurança
  if (rotaProtegida && !token) {
    // Se tentar entrar no VIP sem pulseira, manda pra rua (Login)
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 4. Se tá tudo certo, deixa passar
  return NextResponse.next();
}

// Otimização: Só roda esse arquivo nessas rotas específicas
export const config = {
  matcher: ['/dashboard/:path*', '/perfil/:path*'],
};