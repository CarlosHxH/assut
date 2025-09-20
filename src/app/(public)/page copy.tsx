"use client";
import Appbar from "@/components/Appbar";
import React, { useState } from 'react';
import { Menu, X, Bus, FileText, MessageCircle, Users, Phone, Mail, MapPin, ChevronRight, Star, Shield, Clock, Target } from 'lucide-react';
import Image from "next/image";

interface FormData {
  name: string;
  email: string;
  type: string;
  message: string;
}

const AssutHomepage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    type: 'denuncia',
    message: ''
  });

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
    <>
      <Appbar />
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3">
                <div className="">
                  <Image className="h-8 w-8 rounded-lg" height={500} width={500} src={"/logo.png"} alt={'Logo'} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">ASSUT-MT</h1>
                  <p className="text-sm text-gray-600">Sistema de Ouvidoria</p>
                </div>
              </div>

              <nav className="hidden md:flex space-x-8">
                <a href="#home" className="text-gray-600 font-medium hover:text-gray-700 transition-colors">Início</a>
                <a href="#sobre" className="text-gray-700 hover:text-gray-600 transition-colors">Sobre</a>
                <a href="#servicos" className="text-gray-700 hover:text-gray-600 transition-colors">Serviços</a>
                <a href="#contato" className="text-gray-700 hover:text-gray-600 transition-colors">Contato</a>
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
            <div className="md:hidden bg-white border-t">
              <div className="px-4 py-3 space-y-2">
                <a href="#home" className="block py-2 text-gray-600 font-medium">Início</a>
                <a href="#sobre" className="block py-2 text-gray-700 hover:text-gray-600">Sobre</a>
                <a href="#servicos" className="block py-2 text-gray-700 hover:text-gray-600">Serviços</a>
                <a href="#contato" className="block py-2 text-gray-700 hover:text-gray-600">Contato</a>
              </div>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <section id="home" className="relative bg-gradient-to-br from-gray-600 via-gray-700 to-indigo-800 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Sua Voz no
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-700">
                Transporte Público
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto leading-relaxed">
              Faça sua denúncia, reclamação e sugestão do transporte público do estado de Mato Grosso.
              A ASSUT-MT quer ouvir você!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#formulario"
                className="bg-white text-gray-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center group"
              >
                Fazer Denúncia
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#sobre"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-600 transition-all duration-300 transform hover:scale-105"
              >
                Saiba Mais
              </a>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-200 transition-colors">
                      <stat.icon className="h-8 w-8 text-gray-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="sobre" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Nossa Missão</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Facilitar a comunicação entre cidadãos e órgãos responsáveis pelo transporte público,
                  garantindo que denúncias, reclamações e sugestões sejam tratadas de forma eficiente.
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Nossa Visão</h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Ser reconhecida como a principal plataforma de comunicação entre cidadãos e o sistema
                  de transporte público de Mato Grosso, promovendo transparência e melhorias contínuas.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {values.map((value, index) => (
                    <div key={index} className="text-center">
                      <div className="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <value.icon className="h-6 w-6 text-gray-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{value.title}</h4>
                      <p className="text-sm text-gray-600">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-gray-500 to-indigo-600 rounded-3xl p-8 text-white">
                  <div className="absolute top-4 right-4">
                    <Star className="h-8 w-8 text-red-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Compromisso com Você</h3>
                  <p className="text-gray-100 mb-6">
                    Nossos valores fundamentais guiam cada ação que tomamos para servir melhor
                    a comunidade de Mato Grosso.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-red-300 rounded-full mr-3"></div>
                      Transparência em todos os processos
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-red-300 rounded-full mr-3"></div>
                      Responsabilidade social
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-red-300 rounded-full mr-3"></div>
                      Excelência no atendimento
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-red-300 rounded-full mr-3"></div>
                      Melhoria contínua
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="formulario" className="py-20 bg-gray-50">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all resize-none"
                    placeholder="Descreva detalhadamente sua manifestação..."
                  ></textarea>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-gray-600 to-indigo-600 text-white py-4 px-8 rounded-lg font-semibold hover:from-gray-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Enviar Manifestação
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contato" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Entre em Contato</h2>
              <p className="text-gray-300 text-lg">
                Estamos aqui para ouvir você e melhorar o transporte público de Mato Grosso
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="bg-gray-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-500 transition-colors">
                  <Phone className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Telefone</h3>
                <p className="text-gray-300">(65) 3000-0000</p>
              </div>

              <div className="text-center group">
                <div className="bg-gray-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-500 transition-colors">
                  <Mail className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">E-mail</h3>
                <p className="text-gray-300">contato@assut.mt.gov.br</p>
              </div>

              <div className="text-center group">
                <div className="bg-gray-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-500 transition-colors">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Endereço</h3>
                <p className="text-gray-300">Cuiabá - Mato Grosso</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gray-600 p-2 rounded-lg">
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
        </footer>
      </div>
    </>
  );
}
export default AssutHomepage;