/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // 👇 Esta es la clave: usamos la versión moderna del plugin
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};

export default config;