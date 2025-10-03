"use client"
import React, { useState, useEffect } from 'react';
import { Phone, CreditCard, User, Home, Camera, Upload } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/lib/supabase';
import { CarteirinhaSchema, carteirinhaSchema } from '@/schemas/carteirinhaSchema';
import { defaultCarteirinhaData } from './defaultCarteirinhaData';


const AssutHomepage: React.FC = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CarteirinhaSchema>({ resolver: zodResolver(carteirinhaSchema) });

  const [formData, setFormData] = useState<CustomFormData>({
    name: '',
    email: '',
    type: 'denuncia',
    message: ''
  });

  const [carteirinhaData, setCarteirinhaData] = useState<CarteirinhaData>(defaultCarteirinhaData);

  useEffect(() => {
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

  const handleCarteirinhaSubmit = async (data: CarteirinhaSchema) => {
    try {
      const { error } = await supabase.from('carteirinhas').insert([data]);
      if (error) throw error;
      alert('Solicitação de carteirinha enviada com sucesso! Em breve você receberá mais informações.');
      reset();
    } catch (err: Error | unknown) {
      alert('Erro ao enviar solicitação: ' + (err as Error).message);
    }
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

  const handleSubmits = () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    console.log('Formulário enviado:', formData);
    alert('Sua mensagem foi enviada com sucesso!');
    setFormData({ name: '', email: '', type: 'denuncia', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3 group">
              <div className="flex">
                <Image className="h-10 w-10 rounded-lg" height={500} width={500} src={"/logo.png"} alt={'Logo'} />
              </div>
              <div className="transition-all duration-300 group-hover:translate-x-1">
                <h1 className="text-2xl font-bold text-gray-900">ASSUT-MT</h1>
                <p className="text-sm text-gray-600">Sistema de Ouvidoria</p>
              </div>
            </div>
            <Link href={'/'} className="text-black hover:text-primary-blue transition-all duration-300 relative group">
              Voltar ao Início
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>
      </header>

      {/* Carteirinha Form */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-500 p-3 rounded-full">
                <CreditCard className="h-12 w-12 text-primary-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Solicitar Carteirinha</h1>
            <p className="text-lg text-gray-600">
              Preencha os dados abaixo para solicitar sua carteirinha de transporte público
            </p>
          </div>

          <div className="bg-primary-white rounded-3xl shadow-2xl p-8">
            <form onSubmit={handleSubmit(handleCarteirinhaSubmit)}>
              <div className="space-y-8">
                {/* Informações Pessoais */}
                <div>
                  <div className="flex items-center mb-6">
                    <User className="h-6 w-6 text-primary-blue mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">Informações Pessoais</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        value={carteirinhaData.nomeCompleto}
                        {...register("nomeCompleto")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300"
                        placeholder="Seu nome completo"
                      />
                      {errors.nomeCompleto && <p className="text-red-500 text-xs mt-1">{errors.nomeCompleto.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        CPF *
                      </label>
                      <input
                        type="text"
                        {...register("cpf")}
                        value={carteirinhaData.cpf}
                        onChange={(e) => {
                          const formatted = formatCPF(e.target.value);
                          setCarteirinhaData(prev => ({ ...prev, cpf: formatted }));
                        }}
                        maxLength={14}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300"
                        placeholder="000.000.000-00"
                      />
                      {errors.cpf && <p className="text-red-500 text-xs mt-1">{errors.cpf.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
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
                      {errors.rg && <p className="text-red-500 text-xs mt-1">{errors.rg.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Data de Nascimento *
                      </label>
                      <input
                        type="date"
                        name="dataNascimento"
                        value={carteirinhaData.dataNascimento}
                        onChange={handleCarteirinhaInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300"
                      />
                      {errors.dataNascimento && <p className="text-red-500 text-xs mt-1">{errors.dataNascimento.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
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
                      {errors.nomeMae && <p className="text-red-500 text-xs mt-1">{errors.nomeMae.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
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
                      <label className="block text-sm font-medium text-gray-900 mb-2">
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
                    <h3 className="text-2xl font-bold text-gray-900">Endereço</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
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
                      {errors.cep && <p className="text-red-500 text-xs mt-1">{errors.cep.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
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
                      <label className="block text-sm font-medium text-gray-900 mb-2">
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
                      {errors.endereco && <p className="text-red-500 text-xs mt-1">{errors.endereco.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
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
                      {errors.numero && <p className="text-red-500 text-xs mt-1">{errors.numero.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
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
                      <label className="block text-sm font-medium text-gray-900 mb-2">
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
                      {errors.bairro && <p className="text-red-500 text-xs mt-1">{errors.bairro.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
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
                      {errors.cidade && <p className="text-red-500 text-xs mt-1">{errors.cidade.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Contato */}
                <div>
                  <div className="flex items-center mb-6">
                    <Phone className="h-6 w-6 text-primary-blue mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">Contato</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
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
                      <label className="block text-sm font-medium text-gray-900 mb-2">
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
                      {errors.celular && <p className="text-red-500 text-xs mt-1">{errors.celular.message}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-900 mb-2">
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
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Foto */}
                <div>
                  <div className="flex items-center mb-6">
                    <Camera className="h-6 w-6 text-primary-blue mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">Foto 3x4</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
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
                    type="button"
                    onClick={() => { reset(); setCarteirinhaData({ nomeCompleto: '', cpf: '', rg: '', dataNascimento: '', nomeMae: '', estadoCivil: '', profissao: '', cep: '', endereco: '', numero: '', complemento: '', bairro: '', cidade: '', estado: 'MT', telefone: '', celular: '', email: '', foto: null }); }}
                    className="flex-1 bg-gray-500 text-primary-white py-4 px-8 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 bg-gradient-to-r from-primary-blue to-primary-red text-primary-white py-4 px-8 rounded-lg font-semibold hover:from-primary-red hover:to-primary-blue transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Solicitar Carteirinha
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssutHomepage;