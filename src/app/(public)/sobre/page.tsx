"use client"
import React, { useState, useEffect } from 'react';
import { Bus, Users, Scale, Target, Calendar, MapPin } from 'lucide-react';

interface FloatingElementProps {
    delay?: number;
    size?: string;
    position?: string;
}

interface MissionCardProps {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
    delay?: number;
}

interface CounterAnimationProps {
    target: number;
    duration?: number;
}

interface StatCardProps {
    value: string | number;
    label: string;
    gradient: string;
    textColor: string;
}

interface MissionData {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
}

const FloatingElement: React.FC<FloatingElementProps> = ({
    delay = 0,
    size = 'w-20 h-20',
    position = 'top-1/4 left-1/4'
}) => (
    <div
        className={`absolute ${size} ${position} bg-white/10 rounded-full animate-pulse`}
        style={{
            animationDelay: `${delay}s`,
            animation: `float 6s ease-in-out infinite ${delay}s`
        }}
    />
);

const MissionCard: React.FC<MissionCardProps> = ({
    icon: Icon,
    title,
    description,
    delay = 0
}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay * 200);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div
            className={`bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-500 transform transition-all duration-700 hover:scale-105 hover:shadow-xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
        >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-gray-600 rounded-full flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    );
};

const CounterAnimation: React.FC<CounterAnimationProps> = ({
    target,
    duration = 2000
}) => {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        let startTime: number | null = null;

        const animate = (currentTime: number): void => {
            if (startTime === null) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * target));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [target, duration]);

    return <span>{count}</span>;
};

const StatCard: React.FC<StatCardProps> = ({
    value,
    label,
    gradient,
    textColor
}) => (
    <div className={`text-center p-4 ${gradient} rounded-xl transform hover:scale-105 transition-transform duration-300`}>
        <div className={`text-2xl font-bold ${textColor} mb-1`}>
            {typeof value === 'number' ? <CounterAnimation target={value} /> : value}
        </div>
        <div className="text-sm text-gray-600">{label}</div>
    </div>
);

const AssutSobre: React.FC = () => {
    const [isHeroVisible, setIsHeroVisible] = useState<boolean>(false);
    const [isContentVisible, setIsContentVisible] = useState<boolean>(false);

    useEffect(() => {
        const timer1 = setTimeout(() => setIsHeroVisible(true), 300);
        const timer2 = setTimeout(() => setIsContentVisible(true), 800);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    const missionData: MissionData[] = [
        {
            icon: Bus,
            title: "Nossa Missão",
            description: "Defender os direitos dos usuários do transporte público, promovendo melhorias na qualidade dos serviços e garantindo tarifas justas e acessíveis para toda a população."
        },
        {
            icon: Users,
            title: "Nossa Visão",
            description: "Ser reconhecida como a principal representante dos usuários de transporte público em Mato Grosso, contribuindo para um sistema de mobilidade urbana eficiente e democrático."
        },
        {
            icon: Scale,
            title: "Nossos Valores",
            description: "Transparência, compromisso social, participação cidadã e luta constante por melhores condições de mobilidade urbana para todos os cidadãos mato-grossenses."
        },
        {
            icon: Target,
            title: "Nossos Objetivos",
            description: "Fiscalizar a qualidade dos serviços, mediar conflitos entre usuários e empresas, e propor soluções inovadoras para os desafios do transporte público urbano."
        }
    ];

    const statsData: Array<{
        value: string | number;
        label: string;
        gradient: string;
        textColor: string;
    }> = [
            {
                value: 1990,
                label: "Ano de Fundação",
                gradient: "bg-gradient-to-br from-blue-50 to-indigo-100",
                textColor: "text-blue-600"
            },
            {
                value: "MT",
                label: "Mato Grosso",
                gradient: "bg-gradient-to-br from-green-50 to-emerald-100",
                textColor: "text-green-600"
            },
            {
                value: "100%",
                label: "Pelos Usuários",
                gradient: "bg-gradient-to-br from-purple-50 to-violet-100",
                textColor: "text-purple-600"
            },
            {
                value: "24h",
                label: "Dedicação",
                gradient: "bg-gradient-to-br from-orange-50 to-red-100",
                textColor: "text-orange-600"
            }
        ];

    const floatingElements: FloatingElementProps[] = [
        { delay: 0, size: "w-20 h-20", position: "top-1/4 left-1/12" },
        { delay: 2, size: "w-32 h-32", position: "top-3/5 right-1/12" },
        { delay: 4, size: "w-16 h-16", position: "bottom-1/4 left-1/5" },
        { delay: 1, size: "w-24 h-24", position: "top-1/3 right-1/3" }
    ];

    const handleCallToAction = (): void => {
        // Implementar navegação ou ação específica
        console.log('Call to action clicked');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-600 via-gray-600 to-gray-800 relative overflow-hidden">
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>

            {/* Floating Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                {floatingElements.map((element, index) => (
                    <FloatingElement
                        key={index}
                        delay={element.delay}
                        size={element.size}
                        position={element.position}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 py-8 relative z-10">
                {/* Hero Section */}
                <header className={`text-center text-white mb-12 transform transition-all duration-1000 ${isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}>
                    <div className="flex items-center justify-center mb-6">
                        <div>
                            <h1 className="text-5xl md:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                                ASSUT-MT
                            </h1>
                            <p className="text-xl md:text-2xl opacity-90 font-light">
                                Associação dos Usuários de Transporte Público de Mato Grosso
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center space-x-6 text-sm opacity-80">
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>Fundada em 1990</span>
                        </div>
                        <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>Mato Grosso, Brasil</span>
                        </div>
                    </div>
                </header>

                {/* Main Content Card */}
                <main className={`bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 transform transition-all duration-1000 ${isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}>

                    {/* About Section */}
                    <section className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 relative">
                            Sobre Nós
                            <div className="absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2"></div>
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
                            <div>
                                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                    A ASSUT-MT é uma associação comprometida com a defesa dos direitos e interesses dos usuários do transporte público no estado de Mato Grosso. Nossa organização atua como ponte entre a comunidade e os órgãos responsáveis pelo sistema de transporte.
                                </p>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    Com mais de três décadas de atuação, desenvolvemos uma sólida experiência na fiscalização e acompanhamento dos serviços de transporte coletivo, trabalhando incansavelmente para melhorar a qualidade, segurança e acessibilidade.
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-gray-500 to-gray-500 text-white p-8 rounded-2xl text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                                <div className="text-6xl font-bold mb-2">
                                    <CounterAnimation target={34} />
                                </div>
                                <div className="text-xl opacity-90">
                                    Anos de Experiência
                                </div>
                                <div className="text-sm opacity-80 mt-2">
                                    Fundada em maio de 1990
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Stats Section */}
                    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12" aria-label="Estatísticas da ASSUT-MT">
                        {statsData.map((stat, index) => (
                            <StatCard
                                key={index}
                                value={stat.value}
                                label={stat.label}
                                gradient={stat.gradient}
                                textColor={stat.textColor}
                            />
                        ))}
                    </section>

                    {/* Mission Cards Grid */}
                    <section className="grid md:grid-cols-2 gap-6 mb-12" aria-label="Missão, Visão, Valores e Objetivos">
                        {missionData.map((item, index) => (
                            <MissionCard
                                key={index}
                                icon={item.icon}
                                title={item.title}
                                description={item.description}
                                delay={index}
                            />
                        ))}
                    </section>

                    {/* Call to Action */}
                    <section className="text-center">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl">
                            <h3 className="text-2xl font-bold mb-4">Junte-se à Nossa Causa</h3>
                            <p className="text-lg opacity-90 mb-6">
                                Trabalhe conosco para melhorar o transporte público em Mato Grosso
                            </p>
                            <button
                                onClick={handleCallToAction}
                                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                                aria-label="Saiba mais sobre como participar da ASSUT-MT"
                            >
                                Saiba Mais
                            </button>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default AssutSobre;