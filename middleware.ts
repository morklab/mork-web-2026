import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Una lista de todos los idiomas soportados
  locales: ['en', 'es'],

  // El idioma por defecto si no se detecta ninguno
  defaultLocale: 'en'
});

export const config = {
  // Ignorar archivos internos de Next.js y estáticos
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};