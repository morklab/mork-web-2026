import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

// Aquí le decimos dónde está la configuración que creaste antes
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
};

// Exportamos la configuración envuelta en el plugin de idiomas
export default withNextIntl(nextConfig);