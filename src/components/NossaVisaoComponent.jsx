import React from "react";

export default function NossaVisaoComponent() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Text Section */}
          <div className="max-w-2xl space-y-8">
            <div>
              <h1 className="mb-8 text-4xl leading-tight font-black text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                NOSSA
                <br />
                <span className="bg-gradient-to-r from-red-400 via-red-500 to-blue-500 bg-clip-text text-transparent">
                  VISÃO
                </span>
              </h1>
            </div>

            <div className="space-y-6 text-base leading-relaxed text-gray-300 sm:text-lg lg:text-xl">
              <p>
                Sermos reconhecidos como uma{" "}
                <span className="bg-gradient-to-r from-red-400 to-blue-500 bg-clip-text font-bold text-transparent text-white">
                  associação parceira do usuário de transporte coletivo
                </span>
                , batalhando sempre pela eficiência, sustentabilidade e inclusão
                que atenda as necessidades da comunidade e promova a mobilidade
                urbana de forma justa.
              </p>
            </div>
          </div>

          {/* Stylized S with Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative h-80 w-72 sm:h-96 sm:w-80 lg:h-[420px] lg:w-96">
              {/* Top curve of S */}
              <div className="absolute top-0 right-4 left-0 h-32 rotate-12 transform rounded-full bg-gradient-to-r from-red-400 to-red-500 shadow-2xl lg:h-40"></div>

              {/* Bottom curve of S */}
              <div className="absolute right-0 bottom-0 left-4 h-32 -rotate-12 transform rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-2xl lg:h-40"></div>

              {/* Center connecting element */}
              <div className="absolute top-1/2 left-1/2 h-8 w-24 -translate-x-1/2 -translate-y-1/2 rotate-45 transform rounded-full bg-gradient-to-r from-red-500 to-blue-500 lg:h-10 lg:w-32"></div>

              {/* Image container in the center */}
              <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform">
                <div className="h-36 w-36 overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-2xl sm:h-40 sm:w-40 lg:h-48 lg:w-48">
                  <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    {/* Simulated bus stop scene */}
                    <div className="absolute inset-0 flex flex-col justify-between p-4">
                      {/* Speed limit sign */}
                      <div className="flex h-8 w-8 items-center justify-center self-end rounded-full border-2 border-red-500 bg-white">
                        <span className="text-xs font-bold text-red-500">
                          50
                        </span>
                      </div>

                      {/* Building/structure representation */}
                      <div className="flex h-16 items-end justify-between">
                        <div className="h-12 w-6 rounded-t bg-teal-400"></div>
                        <div className="h-8 w-4 rounded bg-gray-600"></div>
                        <div className="h-10 w-5 rounded-t bg-orange-400"></div>
                      </div>

                      {/* People silhouettes */}
                      <div className="mb-2 flex justify-center space-x-1">
                        <div className="h-4 w-2 rounded-full bg-gray-700"></div>
                        <div className="h-4 w-2 rounded-full bg-gray-800"></div>
                        <div className="h-4 w-2 rounded-full bg-gray-600"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-8 left-8 h-3 w-3 animate-pulse rounded-full bg-white/30"></div>
              <div className="absolute right-8 bottom-8 h-2 w-2 animate-pulse rounded-full bg-white/40 delay-700"></div>
              <div className="absolute top-1/3 right-4 h-1 w-1 animate-pulse rounded-full bg-white/50 delay-1000"></div>
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className="mt-16 flex justify-center lg:mt-24 lg:justify-start">
          <div className="flex items-center space-x-1">
            <span className="text-2xl font-light text-white lg:text-3xl">
              a
            </span>
            <div className="relative">
              <span className="bg-gradient-to-r from-red-400 to-blue-500 bg-clip-text text-3xl font-black text-transparent lg:text-4xl">
                SS
              </span>
            </div>
            <span className="text-2xl font-light text-white lg:text-3xl">
              ut
            </span>
            <span className="text-2xl font-bold text-red-400 lg:text-3xl">
              MT
            </span>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 h-32 w-32 animate-pulse rounded-full bg-red-400/5 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 h-40 w-40 animate-pulse rounded-full bg-blue-500/5 blur-3xl delay-1000"></div>
      <div className="absolute top-1/2 left-0 h-24 w-24 rounded-full bg-gradient-to-r from-red-400/5 to-blue-500/5 blur-2xl"></div>
    </div>
  );
}
