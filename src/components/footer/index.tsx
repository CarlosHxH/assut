import React from 'react';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';

interface SocialLink {
    name: string;
    href: string;
    icon: React.ReactNode;
}

interface ContactInfo {
    icon: React.ReactNode;
    text: string;
}

const Footer: React.FC = () => {
    const socialLinks: SocialLink[] = [
        {
            name: 'Facebook',
            href: 'https://www.facebook.com/assutmt',
            icon: <Facebook size={20} />
        },
        {
            name: 'Instagram',
            href: 'https://www.instagram.com/assut.mt/',
            icon: <Instagram size={20} />
        },
        {
            name: 'X',
            href: 'https://x.com/AssutM81167',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"></path>
            </svg>
        },
        {
            name: 'YouTube',
            href: 'https://www.youtube.com/@ASSUTMT',
            icon: <Youtube size={20} />
        }
    ];

    const contactInfo: ContactInfo[] = [
        {
            icon: <MapPin size={16} />,
            text: 'Assut, Mato Grosso - Brasil'
        },
        {
            icon: <Phone size={16} />,
            text: '(65) 3000-0000'
        },
        {
            icon: <Mail size={16} />,
            text: 'contato@assut.mt.gov.br'
        }
    ];

    const quickLinks = [
        'Início',
        'Sobre',
        'Serviços',
        'Notícias',
        'Transparência',
        'Contato'
    ];

    const services = [
        'Portal do Cidadão',
        'Licitações',
        'Concursos',
        'Documentos',
        'Ouvidoria',
        'e-SIC'
    ];

    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200">
            {/* Main Footer Content */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo and Description */}
                    <div className="lg:col-span-1">
                        <div className="mb-4">
                            <h3 className="text-2xl font-bold text-blue-600">Assut</h3>
                            <p className="text-gray-600 dark:text-gray-200 text-sm">Mato Grosso</p>
                        </div>
                        <p className="text-gray-600 dark:text-gray-200 text-sm mb-6 leading-relaxed">
                            Prefeitura Municipal de Assut, trabalhando pelo desenvolvimento e bem-estar da nossa comunidade.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-2">
                            {contactInfo.map((info, index) => (
                                <div key={index} className="flex items-center text-gray-600 dark:text-gray-200 text-sm">
                                    <span className="text-blue-500 mr-2">{info.icon}</span>
                                    <span>{info.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Links Rápidos</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href="#"
                                        className="text-gray-600 dark:text-gray-200 hover:text-blue-600 text-sm transition-colors duration-200"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Serviços</h4>
                        <ul className="space-y-2">
                            {services.map((service, index) => (
                                <li key={index}>
                                    <a
                                        href="#"
                                        className="text-gray-600 dark:text-gray-200 hover:text-blue-600 text-sm transition-colors duration-200"
                                    >
                                        {service}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Redes Sociais</h4>
                        <p className="text-gray-600 dark:text-gray-200 text-sm mb-4">
                            Siga-nos nas redes sociais para ficar por dentro das novidades.
                        </p>
                        <div className="flex space-x-3">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target='_blank'
                                    className="w-10 h-10 bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="bg-gray-50 border-t border-gray-200">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                        <p className="text-gray-600 text-sm">
                            © 2025 Prefeitura Municipal de Assut - MT. Todos os direitos reservados.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200">
                                Política de Privacidade
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200">
                                Termos de Uso
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200">
                                Acessibilidade
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;