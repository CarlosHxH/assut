"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import NossaVisaoComponent from "@/components/NossaVisaoComponent";

interface SlideItem {
  href: string;
  src: string;
  alt: string;
}
// Componente Card reutilizável
interface CardProps {
  item: SlideItem;
  className?: string;
}

const Card: React.FC<CardProps> = ({ item, className = "" }) => {
  return (
    <div
      className={`max-w-md rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 ${className}`}
    >
      <a href={item.href}>
        <Image
          width={500}
          height={500}
          className="object-fit h-68 w-full rounded-t-lg"
          src={item.src}
          alt={item.alt}
        />
      </a>
    </div>
  );
};

const App: React.FC = () => {
  const [isContentVisible, setIsContentVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsContentVisible(true), 300);

    return () => {
      clearTimeout(timer1);
    };
  }, []);
  const slider: SlideItem[] = [
    {
      href: "#visao",
      src: "/docs/images/visao.jpeg",
      alt: "Visão",
    },
    {
      href: "#valores",
      src: "/docs/images/valores.jpeg",
      alt: "Valores",
    },
    {
      href: "#missao",
      src: "/docs/images/missao.jpeg",
      alt: "Missão",
    },
  ];

  return (
    <main className={`min-h-screen bg-white/95 dark:bg-gray-900 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 transform transition-all duration-1000 ${isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
      <div className="">

        <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              ASSUT-MT
            </h1>
            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
              Faça sua denúncia, reclamação e sugestão do transporte público do
              estado de Mato Grosso! ASSUT-MT Quer ouvir você.
            </p>
          </div>

          <NossaVisaoComponent />

          {/* Cards Grid */}
          <div className="mb-4 grid justify-center gap-4 md:grid-cols-2 lg:grid-cols-3">
            {slider.map((item, i) => (
              <Card key={i} item={item} />
            ))}
          </div>

          {/* Seções de conteúdo */}
          <div className="mt-16 space-y-12">
            <section id="visao" className="text-center">
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Nossa Visão
              </h2>
              <p className="mx-auto max-w-3xl text-gray-600 dark:text-gray-400">
                Ser reconhecida como a principal plataforma de comunicação entre
                cidadãos e o sistema de transporte público de Mato Grosso,
                promovendo transparência e melhorias contínuas.
              </p>
            </section>

            <section id="valores" className="text-center">
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Nossos Valores
              </h2>
              <p className="mx-auto max-w-3xl text-gray-600 dark:text-gray-400">
                Transparência, responsabilidade social, excelência no atendimento
                e compromisso com a melhoria contínua do transporte público
                estadual.
              </p>
            </section>

            <section id="missao" className="text-center">
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Nossa Missão
              </h2>
              <p className="mx-auto max-w-3xl text-gray-600 dark:text-gray-400">
                Facilitar a comunicação entre cidadãos e órgãos responsáveis pelo
                transporte público, garantindo que denúncias, reclamações e
                sugestões sejam tratadas de forma eficiente.
              </p>
            </section>
          </div>

          {/* Call to Action */}
          <div className="rounded-lg bg-gray-600 p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-white">
              Pronto para fazer sua denúncia?
            </h2>
            <p className="mb-6 text-blue-100">
              Sua voz é importante para melhorar o transporte público em Mato
              Grosso.
            </p>

            <a className="rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 transition-colors hover:bg-gray-100" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSeJbsMixWEy08VZchMWiu1ai5mPwobszE_LxmwUTeLIM0E_fA/viewform">
              <button >
                Fazer Denúncia
              </button>
            </a>
          </div>
        </div>

        <div className="rounded-lg bg-gray-800 p-8 text-center">
          <a className="rounded-lg animate-pulse px-8 py-3 font-semibold text-white transition-colors" target="_blank" href="https://chat.whatsapp.com/DCjmMkcw3NKJdfJJw4jp1l?mode=r_c&fbclid=PAZXh0bgNhZW0CMTEAAaf6rsqSuDyTaSv5cfGLdTTxcA88pB8hJ7PMPh8qkMdmcynSFKx32lTYgUjsFA_aem_4VnX90k4JNH6P55UHyWd_Q">
            Entre em contato conosco
          </a>
        </div>

      </div>
    </main>
  );
};

export default App;
