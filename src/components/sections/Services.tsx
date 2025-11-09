import { MapPin, Fuel, Coffee, Wrench, Plane, Shield, Users, Zap } from 'lucide-react';
import Card from '@/components/ui/Card';
import Container from '@/components/ui/Container';

interface ServicesProps {
  locale: string;
}

export default function Services({ locale }: ServicesProps) {
  const services = locale === 'es' ? [
    {
      icon: MapPin,
      title: 'Planificación de Vuelo',
      description: 'Planificación completa de rutas, permisos de sobrevuelo, y documentación aeronáutica',
      features: ['Rutas optimizadas', 'Permisos de vuelo', 'Documentación NOTAM', 'Slot coordination'],
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      icon: Fuel,
      title: 'Servicios de Rampa',
      description: 'Combustible, handling, limpieza de aeronave y servicios de tierra',
      features: ['Combustible Jet A1', 'Ground handling', 'Limpieza interior/exterior', 'Servicios de tierra'],
      color: 'text-red-600',
      bg: 'bg-red-100',
    },
    {
      icon: Coffee,
      title: 'Servicios de Pasajeros',
      description: 'Atención VIP, catering de alta calidad y transporte terrestre',
      features: ['Sala VIP', 'Catering personalizado', 'Transporte ejecutivo', 'Servicios de inmigración'],
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      icon: Wrench,
      title: 'Mantenimiento',
      description: 'Conexión con talleres certificados y servicios de mantenimiento',
      features: ['Talleres certificados', 'Mantenimiento preventivo', 'Reparaciones AOG', 'Inspecciones técnicas'],
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
    {
      icon: Shield,
      title: 'Seguridad y Permisos',
      description: 'Gestión de permisos, autorizaciones y cumplimiento normativo',
      features: ['Permisos especiales', 'Autorización INAC', 'Cumplimiento OACI', 'Seguridad aeroportuaria'],
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
    },
    {
      icon: Users,
      title: 'Atención a Tripulación',
      description: 'Servicios especializados para tripulación y personal de vuelo',
      features: ['Alojamiento', 'Transporte tripulación', 'Briefing meteorológico', 'Flight planning'],
      color: 'text-indigo-600',
      bg: 'bg-indigo-100',
    },
    {
      icon: Plane,
      title: 'Hangaraje',
      description: 'Espacios seguros para resguardo de aeronaves',
      features: ['Hangares techados', 'Seguridad 24/7', 'Acceso controlado', 'Estacionamiento exterior'],
      color: 'text-orange-600',
      bg: 'bg-orange-100',
    },
    {
      icon: Zap,
      title: 'Servicios Express',
      description: 'Atención inmediata para operaciones urgentes y AOG',
      features: ['Respuesta 24/7', 'Coordinación AOG', 'Servicios de emergencia', 'Soporte técnico'],
      color: 'text-pink-600',
      bg: 'bg-pink-100',
    },
  ] : [
    {
      icon: MapPin,
      title: 'Flight Planning',
      description: 'Complete route planning, overflight permits, and aeronautical documentation',
      features: ['Optimized routes', 'Flight permits', 'NOTAM documentation', 'Slot coordination'],
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      icon: Fuel,
      title: 'Ramp Services',
      description: 'Fuel, handling, aircraft cleaning and ground services',
      features: ['Jet A1 Fuel', 'Ground handling', 'Interior/exterior cleaning', 'Ground services'],
      color: 'text-red-600',
      bg: 'bg-red-100',
    },
    {
      icon: Coffee,
      title: 'Passenger Services',
      description: 'VIP attention, high-quality catering and ground transportation',
      features: ['VIP Lounge', 'Custom catering', 'Executive transport', 'Immigration services'],
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      icon: Wrench,
      title: 'Maintenance',
      description: 'Connection with certified workshops and maintenance services',
      features: ['Certified workshops', 'Preventive maintenance', 'AOG repairs', 'Technical inspections'],
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
    {
      icon: Shield,
      title: 'Security & Permits',
      description: 'Permit management, authorizations and regulatory compliance',
      features: ['Special permits', 'INAC authorization', 'ICAO compliance', 'Airport security'],
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
    },
    {
      icon: Users,
      title: 'Crew Attention',
      description: 'Specialized services for crew and flight personnel',
      features: ['Accommodation', 'Crew transport', 'Weather briefing', 'Flight planning'],
      color: 'text-indigo-600',
      bg: 'bg-indigo-100',
    },
    {
      icon: Plane,
      title: 'Hangar Services',
      description: 'Secure spaces for aircraft storage',
      features: ['Covered hangars', '24/7 security', 'Controlled access', 'Outdoor parking'],
      color: 'text-orange-600',
      bg: 'bg-orange-100',
    },
    {
      icon: Zap,
      title: 'Express Services',
      description: 'Immediate attention for urgent operations and AOG',
      features: ['24/7 response', 'AOG coordination', 'Emergency services', 'Technical support'],
      color: 'text-pink-600',
      bg: 'bg-pink-100',
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <Container>
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-4">
            <Plane className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-semibold text-blue-600">
              {locale === 'es' ? 'Servicios Completos' : 'Complete Services'}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'es' ? 'Nuestros Servicios' : 'Our Services'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'es'
              ? 'Ofrecemos una gama completa de servicios aeroportuarios para satisfacer todas las necesidades de su operación'
              : 'We offer a complete range of airport services to meet all your operation needs'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} hover className="group">
              <div className="flex flex-col h-full">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${service.bg} mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className={`w-7 h-7 ${service.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-700">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              {locale === 'es' ? '¿Necesitas un servicio personalizado?' : 'Need a customized service?'}
            </h3>
            <p className="text-xl mb-6 text-blue-100">
              {locale === 'es'
                ? 'Contáctanos y diseñaremos un paquete de servicios adaptado a tus necesidades específicas'
                : 'Contact us and we will design a service package tailored to your specific needs'
              }
            </p>
            <a href="#quote" className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
              {locale === 'es' ? 'Solicitar Cotización' : 'Request Quote'}
              <Plane className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
