import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
  // Para development em mobile via túnel
  env: {
    CUSTOM_KEY: 'development_mobile'
  },
  allowedDevOrigins: ['*'],
  /*allowedDevOrigins: [
    'wks-ti004',                    // O dispositivo que está tentando acessar
    '169.254.83.107',              // Seu IP atual
    'localhost',                   // Acesso local
    '127.0.0.1',                   // Localhost IP
    // Adicione outros IPs conforme necessário
  ],*/
  // Outras configurações experimentais se necessário
  experimental: {
    // suas configurações experimentais aqui
  },
  // Para development
  ...(process.env.NODE_ENV === 'development' && {
    experimental: {
      // outras configurações experimentais...
    }
  }),
  // Para production, você pode querer diferentes configurações
  ...(process.env.NODE_ENV === 'production' && {
    // configurações específicas de produção
  })
};

export default withFlowbiteReact(nextConfig);
