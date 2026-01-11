import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // La lista de idiomas que soporta tu web
  locales: ['es', 'en'],
 
  // El idioma por defecto si no detecta otro
  defaultLocale: 'es'
});
 
export const config = {
  // Ignora archivos internos de Next.js y estáticos
  matcher: ['/((?!api|_next|.*\\..*).*)']
};