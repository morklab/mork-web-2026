import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  
  // 1. Si estamos en modo desarrollo (tu PC), pasa sin preguntar.
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next()
  }

  // 2. Comprobamos si el usuario ha metido usuario/contraseña
  const basicAuth = req.headers.get('authorization')

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    // Decodificamos lo que escribe el usuario
    const [user, pwd] = atob(authValue).split(':')

    // 👇 3. AQUÍ CONFIGURAS TU USUARIO Y CONTRASEÑA
    // Cambia 'familia' y 'mork2026' por lo que tú quieras.
    if (user === 'familia' && pwd === 'mork2026') {
      return NextResponse.next()
    }
  }

  // 4. Si no tiene permiso, le mostramos la ventana de login
  return new NextResponse('Acceso Restringido - MØRK LAB', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Zona Privada"',
    },
  })
}

// Configuración para que el candado no bloquee imágenes ni estilos
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}