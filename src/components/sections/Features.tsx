import { Zap, Users, LayoutDashboard, Headphones, Award, Globe, Clock, Shield } from 'lucide-react';
import Card from '@/components/ui/Card';
import Container from '@/components/ui/Container';

interface FeaturesProps {
  locale: string;
}

export default function Features({ locale }: FeaturesProps) {
  const features = locale === 'es' ? [
    {
      icon: Zap,
      title: 'Cotización Rápida',
      description: 'Recibe cotizaciones detalladas de servicios aeroportuarios en menos de 24 horas',
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
    },
    {
      icon: Users,
      title: 'Red de Proveedores',
      description: 'Acceso a una red confiable de proveedores certificados en todos los aeropuertos',
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      icon: LayoutDashboard,
      title: 'Gestión Centralizada',
      description: 'Administra todos tus planes de vuelo desde un solo panel de control',
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      icon: Headphones,
      title: 'Soporte 24/7',
      description: 'Equipo disponible las 24 horas para atender emergencias y consultas',
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
    {
      icon: Award,
      title: 'Calidad Garantizada',
      description: 'Todos nuestros proveedores están certificados y cumplen con estándares OACI',
      color: 'text-indigo-600',
      bg: 'bg-indigo-100',
    },
    {
      icon: Globe,
      title: 'Cobertura Nacional',
      description: 'Servicios disponibles en todos los aeropuertos principales de Venezuela',
      color: 'text-cyan-600',
      bg: 'bg-cyan-100',
    },
    {
      icon: Clock,
      title: 'Respuesta Inmediata',
      description: 'Coordinación express para operaciones AOG y servicios de emergencia',
      color: 'text-orange-600',
      bg: 'bg-orange-100',
    },
    {
      icon: Shield,
      title: 'Seguridad Total',
      description: 'Cumplimiento estricto de normativas INAC y protocolos de seguridad',
      color: 'text-red-600',
      bg: 'bg-red-100',
    },
  ] : [
    {
      icon: Zap,
      title: 'Fast Quotation',
      description: 'Receive detailed airport service quotes in less than 24 hours',
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
    },
    {
      icon: Users,
      title: 'Provider Network',
      description: 'Access to a reliable network of certified providers at all airports',
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      icon: LayoutDashboard,
      title: 'Centralized Management',
      description: 'Manage all your flight plans from a single control panel',
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Team available 24 hours to handle emergencies and inquiries',
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
    {
      icon: Award,
      title: 'Guaranteed Quality',
      description: 'All our providers are certified and meet ICAO standards',
      color: 'text-indigo-600',
      bg: 'bg-indigo-100',
    },
    {
      icon: Globe,
      title: 'National Coverage',
      description: 'Services available at all major airports in Venezuela',
      color: 'text-cyan-600',
      bg: 'bg-cyan-100',
    },
    {
      icon: Clock,
      title: 'Immediate Response',
      description: 'Express coordination for AOG operations and emergency services',
      color: 'text-orange-600',
      bg: 'bg-orange-100',
    },
    {
      icon: Shield,
      title: 'Total Security',
      description: 'Strict compliance with INAC regulations and security protocols',
      color: 'text-red-600',
      bg: 'bg-red-100',
    },
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <Container>
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-4">
            <Award className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-semibold text-blue-600">
              {locale === 'es' ? 'Por Qué Elegirnos' : 'Why Choose Us'}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'es' ? 'Características Principales' : 'Key Features'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'es'
              ? 'Ofrecemos la mejor plataforma para gestionar todos los servicios aeroportuarios que necesitas'
              : 'We offer the best platform to manage all the airport services you need'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} hover className="text-center group">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${feature.bg} mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
