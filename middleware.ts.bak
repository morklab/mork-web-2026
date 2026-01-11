import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

// 1. Configuración de idiomas
const intlMiddleware = createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en'
});

export default function middleware(req: NextRequest) {
  // 2. SEGURIDAD (Basic Auth) 🔒
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    // Decodifica usuario:contraseña
    const [user, pwd] = atob(authValue).split(':');

    // 👇 TUS CREDENCIALES EXACTAS
    if (user === 'familia' && pwd === 'mork2026') {
      // Si la contraseña es correcta, dejamos pasar al sistema de idiomas
      return intlMiddleware(req);
    }
  }

  // 3. Si no tiene pase, bloqueamos y pedimos contraseña
  return new NextResponse('Acceso Restringido - MØRK LAB', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

// Configuración para proteger TODA la web y detectar idiomas
export const config = {
  matcher: ['/', '/(es|en)/:path*']
};