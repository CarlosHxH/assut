"use client"
import React, { useState, useEffect } from 'react';
import { Menu, X, Bus, FileText, MessageCircle, Users, Phone, Mail, MapPin, ChevronRight, Star, Shield, Clock, Target } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  type: string;
  message: string;
}

const AssutHomepage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    type: 'denuncia',
    message: ''
  });

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-animate]');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          section.classList.add('animate-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    console.log('Formulário enviado:', formData);
    // Aqui você adicionaria a lógica de envio
    alert('Sua mensagem foi enviada com sucesso!');
    setFormData({ name: '', email: '', type: 'denuncia', message: '' });
  };

  const stats = [
    { icon: FileText, number: '1,247', label: 'Denúncias Resolvidas' },
    { icon: MessageCircle, number: '890', label: 'Sugestões Recebidas' },
    { icon: Users, number: '15,623', label: 'Cidadãos Atendidos' },
    { icon: Clock, number: '72h', label: 'Tempo Médio de Resposta' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Transparência',
      description: 'Mantemos total transparência em nossos processos e resultados.'
    },
    {
      icon: Target,
      title: 'Excelência',
      description: 'Buscamos sempre a excelência no atendimento ao cidadão.'
    },
    {
      icon: Users,
      title: 'Responsabilidade Social',
      description: 'Comprometidos com o bem-estar da sociedade mato-grossense.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }

        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .opacity-0 {
          opacity: 0;
        }

        [data-animate] {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }

        [data-animate].animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .stagger-6 { animation-delay: 0.6s; }
      `}</style>
      {/* Header */}
      <header className={`bg-white shadow-lg sticky top-0 z-50 transition-all duration-500 ${isVisible ? 'animate-fade-in-down' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3 group">
              <div className="bg-blue-600 p-2 rounded-lg transition-all duration-300 group-hover:bg-blue-700 group-hover:scale-110 animate-pulse-glow">
                <Bus className="h-8 w-8 text-white transition-transform duration-300 group-hover:rotate-12" />
              </div>
              <div className="transition-all duration-300 group-hover:translate-x-1">
                <h1 className="text-2xl font-bold text-gray-900">ASSUT-MT</h1>
                <p className="text-sm text-gray-600">Sistema de Ouvidoria</p>
              </div>
            </div>

            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-blue-600 font-medium hover:text-blue-700 transition-all duration-300 relative group">
                Início
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#sobre" className="text-gray-700 hover:text-blue-600 transition-all duration-300 relative group">
                Sobre
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#servicos" className="text-gray-700 hover:text-blue-600 transition-all duration-300 relative group">
                Serviços
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#contato" className="text-gray-700 hover:text-blue-600 transition-all duration-300 relative group">
                Contato
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t animate-fade-in-down">
            <div className="px-4 py-3 space-y-2">
              <a href="#home" className="block py-2 text-blue-600 font-medium transition-all duration-300 hover:translate-x-2 hover:bg-blue-50 rounded-lg px-3">Início</a>
              <a href="#sobre" className="block py-2 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:translate-x-2 hover:bg-blue-50 rounded-lg px-3">Sobre</a>
              <a href="#servicos" className="block py-2 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:translate-x-2 hover:bg-blue-50 rounded-lg px-3">Serviços</a>
              <a href="#contato" className="block py-2 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:translate-x-2 hover:bg-blue-50 rounded-lg px-3">Contato</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-300"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-float delay-500"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            Sua Voz no
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300 animate-pulse">
              Transporte Público
            </span>
          </h1>
          <p className={`text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            Faça sua denúncia, reclamação e sugestão do transporte público do estado de Mato Grosso.
            A ASSUT-MT quer ouvir você!
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <a
              href="#formulario"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center group shadow-2xl hover:shadow-blue-500/25"
            >
              Fazer Denúncia
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </a>
            <a
              href="#sobre"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-white/25"
            >
              Saiba Mais
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className={`text-center group stagger-${index + 1}`}>
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 animate-scale-in">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-all duration-300 group-hover:scale-110 animate-float">
                    <stat.icon className="h-8 w-8 text-blue-600 transition-transform duration-300 group-hover:rotate-12" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:text-blue-600">{stat.number}</h3>
                  <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-800">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <h2 className="text-4xl font-bold text-gray-900 mb-6 transition-all duration-500 hover:text-blue-600">Nossa Missão</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed transition-all duration-300 hover:text-gray-800">
                Facilitar a comunicação entre cidadãos e órgãos responsáveis pelo transporte público,
                garantindo que denúncias, reclamações e sugestões sejam tratadas de forma eficiente.
              </p>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 transition-all duration-500 hover:text-blue-600">Nossa Visão</h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed transition-all duration-300 hover:text-gray-800">
                Ser reconhecida como a principal plataforma de comunicação entre cidadãos e o sistema
                de transporte público de Mato Grosso, promovendo transparência e melhorias contínuas.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {values.map((value, index) => (
                  <div key={index} className={`text-center group transition-all duration-500 hover:-translate-y-2 stagger-${index + 1}`}>
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                      <value.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{value.title}</h4>
                    <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-fade-in-right">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/25 animate-float">
                <div className="absolute top-4 right-4 animate-pulse">
                  <Star className="h-8 w-8 text-yellow-300 animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Compromisso com Você</h3>
                <p className="text-blue-100 mb-6">
                  Nossos valores fundamentais guiam cada ação que tomamos para servir melhor
                  a comunidade de Mato Grosso.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center group transition-all duration-300 hover:translate-x-2">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                    Transparência em todos os processos
                  </li>
                  <li className="flex items-center group transition-all duration-300 hover:translate-x-2">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                    Responsabilidade social
                  </li>
                  <li className="flex items-center group transition-all duration-300 hover:translate-x-2">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                    Excelência no atendimento
                  </li>
                  <li className="flex items-center group transition-all duration-300 hover:translate-x-2">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                    Melhoria contínua
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Form Section */}
      < section id="formulario" className="py-20 bg-gray-50" >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Fale Conosco</h2>
            <p className="text-lg text-gray-600">
              Sua opinião é fundamental para melhorarmos o transporte público em Mato Grosso
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Manifestação
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="denuncia">Denúncia</option>
                  <option value="reclamacao">Reclamação</option>
                  <option value="sugestao">Sugestão</option>
                  <option value="elogio">Elogio</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Descreva detalhadamente sua manifestação..."
                ></textarea>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Enviar Manifestação
              </button>
            </div>
          </div>
        </div>
      </section >

      {/* Contact Section */}
      < section id="contato" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Entre em Contato</h2>
            <p className="text-gray-300 text-lg">
              Estamos aqui para ouvir você e melhorar o transporte público de Mato Grosso
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 transition-colors">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Telefone</h3>
              <p className="text-gray-300">(65) 3000-0000</p>
            </div>

            <div className="text-center group">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 transition-colors">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">E-mail</h3>
              <p className="text-gray-300">contato@assut.mt.gov.br</p>
            </div>

            <div className="text-center group">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 transition-colors">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Endereço</h3>
              <p className="text-gray-300">Cuiabá - Mato Grosso</p>
            </div>
          </div>
        </div>
      </section >

      {/* Footer */}
      < footer className="bg-gray-900 text-white py-12" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Bus className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">ASSUT-MT</h3>
                  <p className="text-gray-400">Sistema de Ouvidoria</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Promovendo transparência e melhorias contínuas no sistema de transporte público
                do estado de Mato Grosso através da participação cidadã.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Links Úteis</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Início</a></li>
                <li><a href="#sobre" className="text-gray-400 hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#servicos" className="text-gray-400 hover:text-white transition-colors">Serviços</a></li>
                <li><a href="#contato" className="text-gray-400 hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Serviços</h4>
              <ul className="space-y-2">
                <li><span className="text-gray-400">Denúncias</span></li>
                <li><span className="text-gray-400">Reclamações</span></li>
                <li><span className="text-gray-400">Sugestões</span></li>
                <li><span className="text-gray-400">Elogios</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 ASSUT-MT. Todos os direitos reservados. Governo do Estado de Mato Grosso.
            </p>
          </div>
        </div>
      </footer >
    </div >
  );
};

export default AssutHomepage;