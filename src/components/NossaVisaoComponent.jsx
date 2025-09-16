import React from 'react';

export default function NossaVisaoComponent() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      {/* Background pattern/texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Texto da Visão */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-8 leading-tight">
                NOSSA
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-500">
                  VISÃO
                </span>
              </h1>
            </div>

            <div className="space-y-6 text-gray-200 text-lg lg:text-xl leading-relaxed">
              <p>
                Sermos reconhecidos como uma{' '}
                <span className="font-bold text-white">associação parceira do usuário de transporte coletivo</span>,
                batalhando sempre pela eficiência, sustentabilidade e inclusão que atenda as necessidades da comunidade
                e promova a mobilidade urbana de forma justa.
              </p>
            </div>
          </div>

          {/* Letra S com imagem */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Letra S estilizada */}
              <div className="relative w-80 h-96 lg:w-96 lg:h-[480px]">
                {/* Parte superior do S */}
                <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-r from-red-400 to-red-500 rounded-t-[120px] rounded-bl-[120px] transform rotate-12"></div>
                
                {/* Parte inferior do S */}
                <div className="absolute bottom-0 right-0 w-full h-48 bg-gradient-to-r from-blue-500 to-blue-600 rounded-b-[120px] rounded-tr-[120px] transform -rotate-12"></div>
                
                {/* Container da imagem no meio */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-white shadow-2xl z-10">
                  <img
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f0f0f0'/%3E%3Cg fill='%23666'%3E%3Ccircle cx='200' cy='150' r='20'/%3E%3Ccircle cx='180' cy='180' r='15'/%3E%3Ccircle cx='220' cy='180' r='15'/%3E%3Ccircle cx='160' cy='210' r='12'/%3E%3Ccircle cx='200' cy='210' r='12'/%3E%3Ccircle cx='240' cy='210' r='12'/%3E%3Ctext x='200' y='280' text-anchor='middle' font-size='24' font-family='Arial'%3ETransporte Coletivo%3C/text%3E%3C/g%3E%3C/svg%3E"
                    alt="Transporte coletivo - pessoas na parada de ônibus"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay com gradiente sutil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Efeitos de brilho */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-white/20 rounded-full blur-sm animate-pulse"></div>
                <div className="absolute bottom-8 right-8 w-6 h-6 bg-white/30 rounded-full blur-sm animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo no rodapé */}
        <div className="mt-16 lg:mt-24 flex justify-center lg:justify-start">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <span className="text-white text-2xl lg:text-3xl font-light">a</span>
              <div className="relative mx-1">
                <span className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-500">S</span>
                <span className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-400">S</span>
              </div>
              <span className="text-white text-2xl lg:text-3xl font-light">ut</span>
              <span className="text-red-400 text-2xl lg:text-3xl font-bold ml-1">MT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Elementos decorativos de fundo */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-red-400/10 to-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-blue-500/10 to-red-400/10 rounded-full blur-3xl"></div>
    </div>
  );
}