"use client"
import React, { useState, useEffect } from 'react';
import { Menu, X, Bus, FileText, MessageCircle, Users, Phone, Mail, MapPin, ChevronRight, Star, Shield, Clock, Target, CreditCard, User, Home, Camera, Upload } from 'lucide-react';
import Image from 'next/image';

interface FormData {
  name: string;
  email: string;
  type: string;
  message: string;
}

interface CarteirinhaData {
  // Informações Pessoais
  nomeCompleto: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  nomeMae: string;
  estadoCivil: string;
  profissao: string;

  // Endereço
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;

  // Contato
  telefone: string;
  celular: string;
  email: string;

  // Foto
  foto: string | null;
}

const AssutHomepage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    type: 'denuncia',
    message: ''
  });

  const [carteirinhaData, setCarteirinhaData] = useState<CarteirinhaData>({
    // Informações Pessoais
    nomeCompleto: '',
    cpf: '',
    rg: '',
    dataNascimento: '',
    nomeMae: '',
    estadoCivil: '',
    profissao: '',

    // Endereço
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: 'MT',

    // Contato
    telefone: '',
    celular: '',
    email: '',

    // Foto
    foto: null
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

  const handleCarteirinhaInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCarteirinhaData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCarteirinhaData(prev => ({
          ...prev,
          foto: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCarteirinhaSubmit = () => {
    console.log('Dados da carteirinha:', carteirinhaData);
    alert('Solicitação de carteirinha enviada com sucesso! Em breve você receberá mais informações.');
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatCEP = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  };

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4,5})(\d{4})$/, '$1-$2');
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    console.log('Formulário enviado:', formData);
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

  if (currentPage === 'carteirinha') {
    return (
      <div className="min-h-screen bg-gray-50">
        <style jsx>{`
          :root {
            --primary-blue: #4264fe;
            --primary-red: #fd5a58;
            --primary-white: #fefefe;
            --primary-black: #020403;
          }

          .bg-primary-blue { background-color: #4264fe; }
          .bg-primary-red { background-color: #fd5a58; }
          .bg-primary-white { background-color: #fefefe; }
          .bg-primary-black { background-color: #020403; }
          .text-primary-blue { color: #4264fe; }
          .text-primary-red { color: #fd5a58; }
          .text-primary-white { color: #fefefe; }
          .text-primary-black { color: #020403; }
          .border-primary-blue { border-color: #4264fe; }
          .border-primary-red { border-color: #fd5a58; }
          .hover\\:bg-primary-blue:hover { background-color: #4264fe; }
          .hover\\:bg-primary-red:hover { background-color: #fd5a58; }
          .hover\\:text-primary-blue:hover { color: #4264fe; }
          .hover\\:text-primary-red:hover { color: #fd5a58; }
          .focus\\:ring-primary-blue:focus { --tw-ring-color: #4264fe; }
          .focus\\:border-primary-blue:focus { border-color: #4264fe; }
        `}</style>

        {/* Header */}
        <header className="bg-primary-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3 group">
                <div className="bg-primary-blue p-2 rounded-lg transition-all duration-300 group-hover:bg-primary-red group-hover:scale-110">
                  <Bus className="h-8 w-8 text-primary-white transition-transform duration-300 group-hover:rotate-12" />
                </div>
                <div className="transition-all duration-300 group-hover:translate-x-1">
                  <h1 className="text-2xl font-bold text-primary-black">ASSUT-MT</h1>
                  <p className="text-sm text-gray-600">Sistema de Ouvidoria</p>
                </div>
              </div>

              <button
                onClick={() => setCurrentPage('home')}
                className="bg-primary-blue text-primary-white px-4 py-2 rounded-lg hover:bg-primary-red transition-all duration-300"
              >
                Voltar ao Início
              </button>
            </div>
          </div>
        </header>

        {/* Carteirinha Form */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-blue p-3 rounded-full">
                  <CreditCard className="h-12 w-12 text-primary-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-primary-black mb-4">Solicitar Carteirinha</h1>
              <p className="text-lg text-gray-600">
                Preencha os dados abaixo para solicitar sua carteirinha de transporte público
              </p>
            </div>

            <div className="bg-primary-white rounded-3xl shadow-2xl p-8">
              <div className="space-y-8">
                {/* Informações Pessoais */}
                <div>
                  <div className="flex items-center mb-6">
                    <User className="h-6 w-6 text-primary-blue mr-3" />
                    <h3 className="text-2xl font-bold text-primary-black">Informações Pessoais</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-primary-black mb-2">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        name="nomeCompleto"
                        value={carteirinhaData.nomeCompleto}
                        onChange={handleCarteirinhaInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300"
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-black mb-2">
                        CPF *
                      </label>
                      <input
                        type="text"
                        name="cpf"
                        value={carteirinhaData.cpf}
                        onChange={(e) => {
                          const formatted = formatCPF(e.target.value);
                          setCarteirinhaData(prev => ({ ...prev, cpf: formatted }));
                        }}
                        maxLength={14}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300"
                        placeholder="000.000.000-00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-black mb-2">
                        RG *
                      </label>
                      <input
                        type="text"
                        name="rg"
                        value={carteirinhaData.rg}
                        onChange={handleCarteirinhaInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300"
                        placeholder="00.000.000-0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-black mb-2">
                        Data de Nascimento *
                      </label>
                      <input
                        type="date"
                        name="dataNascimento"
                        value={carteirinhaData.dataNascimento}
                        onChange={handleCarteirinhaInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-black mb-2">
                        Nome da Mãe *
                      </label>
                      <input
                        type="text"
                        name="nomeMae"
                        value={carteirinhaData.nomeMae}
                        onChange={handleCarteirinhaInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300"
                        placeholder="Nome completo da mãe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-black mb-2">
                        Estado Civil
                      </label>
                      <select
                        name="estadoCivil"
                        value={carteirinhaData.estadoCivil}
                        onChange={handleCarteirinhaInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Selecione</option>
                        <option value="solteiro">Solteiro(a)</option>
                        <option value="casado">Casado(a)</option>
                        <option value="divorciado">Divorciado(a)</option>
                        <option value="viuvo">Viúvo(a)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-black mb-2">
                        Profissão
                      </label>
                      <input
                        type="text"
                        name="profissao"
                        value={carteirinhaData.profissao}
                        onChange={handleCarteirinhaInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300"
                        placeholder="Sua profissão"
                      />
                    </div>
                  </div>
                </div>

                {/* Endereço */}
                <div>
                  <div className="flex items-center mb-6">
                    <Home className="h-6 w-6 text-primary-blue mr-3" />
                    <h3 className="text-2xl font-bold text-primary-black">Endereço</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-primary-black mb-2">
                        CEP *
                      </label>
                      <input
                        type="text"
                        name="cep"
                        value={carteirinhaData.cep}
                        onChange={(e) => {
                          const formatted = formatCEP(e.target.value);
                          setCarteirinhaData(prev => ({ ...prev, cep: formatted }));
                        }}
                        maxLength={9}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300"
                        placeholder="00000-000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-black mb-2">
                        Estado
                      </label>
                      <select
                        name="estado"
                        value={carteirinhaData.estado}
                        onChange={handleCarteirinhaInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300"
                      >
                        <option value="MT">Mato Grosso</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-primary-black mb-2">
                        Endereço *
                      </label>
                      <input
                        type="text"
                        name="endereco"
                        value={carteirinhaData.endereco}
                        onChange={handleCarteirinhaInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300"
                        placeholder="Rua, Avenida, etc."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-black mb-2">
                        Número *
                      </label>
                      <input
                        type="text"
                        name="numero"
                        value={carteirinhaData.numero}
                        onChange={handleCarteirinhaInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300"
                        placeholder="123"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-black mb-2">
                        Complemento
                      </label>
                      <input
                        type="text"
                        name="complemento"
                        value={carteirinhaData.complemento}
                        onChange={handleCarteirinhaInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300"
                        placeholder="Apto, Casa, etc."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-black mb-2">
                        Bairro *
                      </label>
                      <input
                        type="text"
                        name="bairro"
                        value={carteirinhaData.bairro}
                        onChange={handleCarteirinhaInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300"
                        placeholder="Nome do bairro"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-black mb-2">
                        Cidade *
                      </label>
                      <input
                        type="text"
                        name="cidade"
                        value={carteirinhaData.cidade}
                        onChange={handleCarteirinhaInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300"
                        placeholder="Nome da cidade"
                      />
                    </div>
                  </div>
                </div>

                {/* Contato */}
                <div>
                  <div className="flex items-center mb-6">
                    <Phone className="h-6 w-6 text-primary-blue mr-3" />
                    <h3 className="text-2xl font-bold text-primary-black">Contato</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-primary-black mb-2">
                        Telefone
                      </label>
                      <input
                        type="text"
                        name="telefone"
                        value={carteirinhaData.telefone}
                        onChange={(e) => {
                          const formatted = formatPhone(e.target.value);
                          setCarteirinhaData(prev => ({ ...prev, telefone: formatted }));
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300"
                        placeholder="(65) 0000-0000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-black mb-2">
                        Celular *
                      </label>
                      <input
                        type="text"
                        name="celular"
                        value={carteirinhaData.celular}
                        onChange={(e) => {
                          const formatted = formatPhone(e.target.value);
                          setCarteirinhaData(prev => ({ ...prev, celular: formatted }));
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300"
                        placeholder="(65) 90000-0000"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-primary-black mb-2">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={carteirinhaData.email}
                        onChange={handleCarteirinhaInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Foto */}
                <div>
                  <div className="flex items-center mb-6">
                    <Camera className="h-6 w-6 text-primary-blue mr-3" />
                    <h3 className="text-2xl font-bold text-primary-black">Foto 3x4</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                      <label className="block text-sm font-medium text-primary-black mb-2">
                        Upload da Foto *
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="foto-upload"
                        />
                        <label
                          htmlFor="foto-upload"
                          className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-blue transition-colors duration-300 group"
                        >
                          <div className="text-center">
                            <Upload className="h-8 w-8 text-gray-400 group-hover:text-primary-blue mx-auto mb-2 transition-colors duration-300" />
                            <p className="text-sm text-gray-600">Clique para enviar sua foto</p>
                            <p className="text-xs text-gray-400">JPG, PNG até 5MB</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      {carteirinhaData.foto ? (
                        <div className="relative">
                          <Image
                            width={100}
                            height={100}
                            src={carteirinhaData.foto}
                            alt="Foto preview"
                            className="w-32 h-40 object-cover rounded-lg border-2 border-primary-blue shadow-lg"
                          />
                          <button
                            onClick={() => setCarteirinhaData(prev => ({ ...prev, foto: null }))}
                            className="absolute -top-2 -right-2 bg-primary-red text-primary-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors duration-300"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <div className="w-32 h-40 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                          <Camera className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Botões */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    onClick={() => setCurrentPage('home')}
                    className="flex-1 bg-gray-500 text-primary-white py-4 px-8 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCarteirinhaSubmit}
                    className="flex-1 bg-blue-600 bg-gradient-to-r from-primary-blue to-primary-red text-primary-white py-4 px-8 rounded-lg font-semibold hover:from-primary-red hover:to-primary-blue transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Solicitar Carteirinha
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        :root {
          --primary-blue: #4264fe;
          --primary-red: #fd5a58;
          --primary-white: #fefefe;
          --primary-black: #020403;
        }

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
            box-shadow: 0 0 20px rgba(66, 100, 254, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(66, 100, 254, 0.6);
          }
        }

        @keyframes pulse-glow-red {
          0%, 100% {
            box-shadow: 0 0 20px rgba(253, 90, 88, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(253, 90, 88, 0.6);
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

        .animate-pulse-glow-red {
          animation: pulse-glow-red 3s ease-in-out infinite;
        }

        .opacity-0 {
          opacity: 0;
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

        .bg-primary-blue { background-color: #4264fe; }
        .bg-primary-red { background-color: #fd5a58; }
        .bg-primary-white { background-color: #fefefe; }
        .bg-primary-black { background-color: #020403; }
        .text-primary-blue { color: #4264fe; }
        .text-primary-red { color: #fd5a58; }
        .text-primary-white { color: #fefefe; }
        .text-primary-black { color: #020403; }
        .border-primary-blue { border-color: #4264fe; }
        .border-primary-red { border-color: #fd5a58; }
        .hover\\:bg-primary-blue:hover { background-color: #4264fe; }
        .hover\\:bg-primary-red:hover { background-color: #fd5a58; }
        .hover\\:text-primary-blue:hover { color: #4264fe; }
        .hover\\:text-primary-red:hover { color: #fd5a58; }
        .focus\\:ring-primary-blue:focus { --tw-ring-color: #4264fe; }
        .focus\\:border-primary-blue:focus { border-color: #4264fe; }
      `}</style>
      {/* Header */}
      <header className={`bg-primary-white shadow-lg sticky top-0 z-50 transition-all duration-500 ${isVisible ? 'animate-fade-in-down' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3 group">
              <div className="bg-primary-blue p-2 rounded-lg transition-all duration-300 group-hover:bg-primary-red group-hover:scale-110 animate-pulse-glow">
                <Bus className="h-8 w-8 text-primary-white transition-transform duration-300 group-hover:rotate-12" />
              </div>
              <div className="transition-all duration-300 group-hover:translate-x-1">
                <h1 className="text-2xl font-bold text-primary-black">ASSUT-MT</h1>
                <p className="text-sm text-gray-600">Sistema de Ouvidoria</p>
              </div>
            </div>

            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-primary-blue font-medium hover:text-primary-red transition-all duration-300 relative group">
                Início
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-red transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#sobre" className="text-primary-black hover:text-primary-blue transition-all duration-300 relative group">
                Sobre
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-blue transition-all duration-300 group-hover:w-full"></span>
              </a>
              <button
                onClick={() => setCurrentPage('carteirinha')}
                className="text-primary-black hover:text-primary-blue transition-all duration-300 relative group"
              >
                Carteirinha
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-blue transition-all duration-300 group-hover:w-full"></span>
              </button>
              <a href="#contato" className="text-primary-black hover:text-primary-blue transition-all duration-300 relative group">
                Contato
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-blue transition-all duration-300 group-hover:w-full"></span>
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
          <div className="md:hidden bg-primary-white border-t animate-fade-in-down">
            <div className="px-4 py-3 space-y-2">
              <a href="#home" className="block py-2 text-primary-blue font-medium transition-all duration-300 hover:translate-x-2 hover:bg-blue-50 rounded-lg px-3">Início</a>
              <a href="#sobre" className="block py-2 text-primary-black hover:text-primary-blue transition-all duration-300 hover:translate-x-2 hover:bg-blue-50 rounded-lg px-3">Sobre</a>
              <button
                onClick={() => {
                  setCurrentPage('carteirinha');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-primary-black hover:text-primary-blue transition-all duration-300 hover:translate-x-2 hover:bg-blue-50 rounded-lg px-3"
              >
                Carteirinha
              </button>
              <a href="#contato" className="block py-2 text-primary-black hover:text-primary-blue transition-all duration-300 hover:translate-x-2 hover:bg-blue-50 rounded-lg px-3">Contato</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-primary-blue via-primary-blue to-primary-black text-primary-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-primary-black opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            Sua Voz no
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-red to-orange-300 animate-pulse">
              Transporte Público
            </span>
          </h1>
          <p className={`text-xl md:text-2xl mb-8 text-primary-white max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'} opacity-90`}>
            Faça sua denúncia, reclamação e sugestão do transporte público do estado de Mato Grosso.
            A ASSUT-MT quer ouvir você!
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <a
              href="#formulario"
              className="bg-primary-red text-primary-white px-8 py-4 rounded-full font-semibold hover:bg-primary-white hover:text-primary-red transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center group shadow-2xl hover:shadow-red-500/25"
            >
              Fazer Denúncia
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </a>
            <button
              onClick={() => setCurrentPage('carteirinha')}
              className="bg-primary-white text-primary-blue px-8 py-4 rounded-full font-semibold hover:bg-primary-blue hover:text-primary-white transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center group"
            >
              <CreditCard className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              Solicitar Carteirinha
            </button>
            <a
              href="#sobre"
              className="border-2 border-primary-white text-primary-white px-8 py-4 rounded-full font-semibold hover:bg-primary-white hover:text-primary-blue transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-white/25"
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
                <div className="bg-primary-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 animate-scale-in">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-red group-hover:bg-opacity-20 transition-all duration-300 group-hover:scale-110 animate-float">
                    <stat.icon className="h-8 w-8 text-primary-blue group-hover:text-primary-red transition-all duration-300 group-hover:rotate-12" />
                  </div>
                  <h3 className="text-3xl font-bold text-primary-black mb-2 transition-all duration-300 group-hover:text-primary-blue">{stat.number}</h3>
                  <p className="text-gray-600 transition-colors duration-300 group-hover:text-primary-black">{stat.label}</p>
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
              <h2 className="text-4xl font-bold text-primary-black mb-6 transition-all duration-500 hover:text-primary-blue">Nossa Missão</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed transition-all duration-300 hover:text-primary-black">
                Facilitar a comunicação entre cidadãos e órgãos responsáveis pelo transporte público,
                garantindo que denúncias, reclamações e sugestões sejam tratadas de forma eficiente.
              </p>
              <h3 className="text-2xl font-semibold text-primary-black mb-4 transition-all duration-500 hover:text-primary-blue">Nossa Visão</h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed transition-all duration-300 hover:text-primary-black">
                Ser reconhecida como a principal plataforma de comunicação entre cidadãos e o sistema
                de transporte público de Mato Grosso, promovendo transparência e melhorias contínuas.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {values.map((value, index) => (
                  <div key={index} className={`text-center group transition-all duration-500 hover:-translate-y-2 stagger-${index + 1}`}>
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-red group-hover:bg-opacity-20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                      <value.icon className="h-6 w-6 text-primary-blue group-hover:text-primary-red transition-colors duration-300" />
                    </div>
                    <h4 className="font-semibold text-primary-black mb-2 group-hover:text-primary-blue transition-colors duration-300">{value.title}</h4>
                    <p className="text-sm text-gray-600 group-hover:text-primary-black transition-colors duration-300">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-fade-in-right">
              <div className="bg-gradient-to-br from-primary-blue to-primary-black rounded-3xl p-8 text-primary-white transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/25 animate-float">
                <div className="absolute top-4 right-4 animate-pulse">
                  <Star className="h-8 w-8 text-primary-red animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Compromisso com Você</h3>
                <p className="text-gray-900 mb-6">
                  Nossos valores fundamentais guiam cada ação que tomamos para servir melhor
                  a comunidade de Mato Grosso.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center group transition-all duration-300 hover:translate-x-2">
                    <div className="w-2 h-2 bg-primary-red rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                    Transparência em todos os processos
                  </li>
                  <li className="flex items-center group transition-all duration-300 hover:translate-x-2">
                    <div className="w-2 h-2 bg-primary-red rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                    Responsabilidade social
                  </li>
                  <li className="flex items-center group transition-all duration-300 hover:translate-x-2">
                    <div className="w-2 h-2 bg-primary-red rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                    Excelência no atendimento
                  </li>
                  <li className="flex items-center group transition-all duration-300 hover:translate-x-2">
                    <div className="w-2 h-2 bg-primary-red rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                    Melhoria contínua
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="formulario" className="py-20 bg-gray-50" data-animate>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-primary-black mb-4 transition-all duration-500 hover:text-primary-blue">Fale Conosco</h2>
            <p className="text-lg text-gray-600 transition-all duration-300 hover:text-primary-black">
              Sua opinião é fundamental para melhorarmos o transporte público em Mato Grosso
            </p>
          </div>

          <div className="bg-primary-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-500 animate-scale-in">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-medium text-primary-black mb-2 transition-colors duration-300 group-focus-within:text-primary-blue">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 hover:border-blue-300 focus:scale-105"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-primary-black mb-2 transition-colors duration-300 group-focus-within:text-primary-blue">
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 hover:border-blue-300 focus:scale-105"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-primary-black mb-2 transition-colors duration-300 group-focus-within:text-primary-blue">
                  Tipo de Manifestação
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 hover:border-blue-300 focus:scale-105"
                >
                  <option value="denuncia">Denúncia</option>
                  <option value="reclamacao">Reclamação</option>
                  <option value="sugestao">Sugestão</option>
                  <option value="elogio">Elogio</option>
                </select>
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-primary-black mb-2 transition-colors duration-300 group-focus-within:text-primary-blue">
                  Mensagem
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 resize-none hover:border-blue-300 focus:scale-105"
                  placeholder="Descreva detalhadamente sua manifestação..."
                ></textarea>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-primary-blue to-primary-red text-primary-white py-4 px-8 rounded-lg font-semibold hover:from-primary-red hover:to-primary-blue transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-blue-500/50 animate-pulse-glow"
              >
                <span className="flex items-center justify-center text-blue-600 ">
                  Enviar Manifestação
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 bg-blue-900 bg-gradient-to-br from-primary-black to-gray-800 text-primary-white overflow-hidden relative" data-animate>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4 transition-all duration-500 hover:text-primary-blue">Entre em Contato</h2>
            <p className="text-gray-300 text-lg transition-all duration-300 hover:text-primary-white">
              Estamos aqui para ouvir você e melhorar o transporte público de Mato Grosso
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group animate-fade-in-left stagger-1">
              <div className="bg-primary-blue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-red transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 animate-float">
                <Phone className="h-8 w-8 transition-transform duration-300 group-hover:rotate-12" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-blue transition-colors duration-300">Telefone</h3>
              <p className="text-gray-300 group-hover:text-primary-white transition-colors duration-300">(65) 3000-0000</p>
            </div>

            <div className="text-center group animate-fade-in-up stagger-2">
              <div className="bg-primary-blue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-red transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 animate-float delay-200">
                <Mail className="h-8 w-8 transition-transform duration-300 group-hover:rotate-12" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-blue transition-colors duration-300">E-mail</h3>
              <p className="text-gray-300 group-hover:text-primary-white transition-colors duration-300">contato@assut.mt.gov.br</p>
            </div>

            <div className="text-center group animate-fade-in-right stagger-3">
              <div className="bg-primary-blue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-red transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 animate-float delay-400">
                <MapPin className="h-8 w-8 transition-transform duration-300 group-hover:rotate-12" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-blue transition-colors duration-300">Endereço</h3>
              <p className="text-gray-300 group-hover:text-primary-white transition-colors duration-300">Cuiabá - Mato Grosso</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-black text-primary-white py-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-blue via-primary-red to-primary-blue animate-pulse"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2 group">
              <div className="flex items-center space-x-3 mb-4 transition-all duration-300 group-hover:scale-105">
                <div className="bg-primary-blue p-2 rounded-lg transition-all duration-300 group-hover:bg-primary-red group-hover:rotate-12">
                  <Bus className="h-8 w-8 text-primary-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold transition-colors duration-300 group-hover:text-primary-blue">ASSUT-MT</h3>
                  <p className="text-gray-400 transition-colors duration-300 group-hover:text-gray-300">Sistema de Ouvidoria</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed transition-all duration-300 hover:text-gray-300">
                Promovendo transparência e melhorias contínuas no sistema de transporte público
                do estado de Mato Grosso através da participação cidadã.
              </p>
            </div>

            <div className="group">
              <h4 className="text-lg font-semibold mb-4 transition-colors duration-300 group-hover:text-primary-blue">Links Úteis</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-primary-white transition-all duration-300 hover:translate-x-2 inline-block">Início</a></li>
                <li><a href="#sobre" className="text-gray-400 hover:text-primary-white transition-all duration-300 hover:translate-x-2 inline-block">Sobre</a></li>
                <li><button onClick={() => setCurrentPage('carteirinha')} className="text-gray-400 hover:text-primary-white transition-all duration-300 hover:translate-x-2 inline-block">Carteirinha</button></li>
                <li><a href="#contato" className="text-gray-400 hover:text-primary-white transition-all duration-300 hover:translate-x-2 inline-block">Contato</a></li>
              </ul>
            </div>

            <div className="group">
              <h4 className="text-lg font-semibold mb-4 transition-colors duration-300 group-hover:text-primary-blue">Serviços</h4>
              <ul className="space-y-2">
                <li><span className="text-gray-400 transition-colors duration-300 hover:text-gray-300 cursor-default">Denúncias</span></li>
                <li><span className="text-gray-400 transition-colors duration-300 hover:text-gray-300 cursor-default">Reclamações</span></li>
                <li><span className="text-gray-400 transition-colors duration-300 hover:text-gray-300 cursor-default">Sugestões</span></li>
                <li><span className="text-gray-400 transition-colors duration-300 hover:text-gray-300 cursor-default">Carteirinha</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 transition-colors duration-300 hover:text-gray-300">
              © 2024 ASSUT-MT. Todos os direitos reservados. Governo do Estado de Mato Grosso.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AssutHomepage;