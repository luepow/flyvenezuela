import { ArrowRight, Plane, Shield, Clock, Star } from 'lucide-react';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Particles from '@/components/effects/Particles';
import ParallaxLayer from '@/components/effects/ParallaxLayer';

export default function Hero({ locale }: { locale: string }) {
  return (
    <section className="relative pt-32 pb-32 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden min-h-screen flex items-center">
      {/* Particles Effect */}
      <Particles />

      {/* Animated background blobs with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <ParallaxLayer speed={0.3}>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        </ParallaxLayer>
        <ParallaxLayer speed={0.5}>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </ParallaxLayer>
        <ParallaxLayer speed={0.4}>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </ParallaxLayer>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-transparent to-transparent"></div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <ParallaxLayer speed={0.2}>
            <div className="text-white">
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full mb-6 border border-blue-400/30 animate-fade-in">
                <Star className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-sm font-medium">
                  {locale === 'es' ? 'Servicios Aeroportuarios Profesionales' : 'Professional Airport Services'}
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
                {locale === 'es' ? (
                  <>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                      Planifica tu Vuelo
                    </span>
                    <br />
                    <span className="text-blue-300">en Venezuela</span>
                  </>
                ) : (
                  <>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                      Plan Your Flight
                    </span>
                    <br />
                    <span className="text-blue-300">in Venezuela</span>
                  </>
                )}
              </h1>

              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed animate-fade-in-up animation-delay-200">
                {locale === 'es'
                  ? 'La plataforma líder para cotización y gestión de servicios aeroportuarios. Conectamos pilotos, empresas y proveedores con excelencia.'
                  : 'The leading platform for airport services quotation and management. Connecting pilots, companies and providers with excellence.'
                }
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-4 mb-8 animate-fade-in-up animation-delay-400">
                <div className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <Clock className="w-5 h-5 text-blue-300 mr-2" />
                  <span className="text-sm font-medium">{locale === 'es' ? 'Respuesta 24/7' : '24/7 Response'}</span>
                </div>
                <div className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <Shield className="w-5 h-5 text-blue-300 mr-2" />
                  <span className="text-sm font-medium">{locale === 'es' ? 'Proveedores Certificados' : 'Certified Providers'}</span>
                </div>
                <div className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <Plane className="w-5 h-5 text-blue-300 mr-2" />
                  <span className="text-sm font-medium">{locale === 'es' ? 'Todos los Aeropuertos' : 'All Airports'}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-600">
                <a href={`/${locale}/cotizacion`}>
                  <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 shadow-2xl hover:shadow-blue-500/50 group transform hover:scale-105 transition-all duration-300">
                    {locale === 'es' ? 'Solicitar Cotización Ahora' : 'Request Quote Now'}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <a href="#services">
                  <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                    {locale === 'es' ? 'Ver Servicios' : 'View Services'}
                  </Button>
                </a>
              </div>
            </div>
          </ParallaxLayer>

          {/* Right Column - Stats */}
          <ParallaxLayer speed={0.15}>
            <div className="grid grid-cols-2 gap-6 animate-fade-in animation-delay-800">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                <div className="text-5xl font-bold text-white mb-2">500+</div>
                <div className="text-blue-200">{locale === 'es' ? 'Vuelos Gestionados' : 'Flights Managed'}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 animation-delay-100">
                <div className="text-5xl font-bold text-white mb-2">50+</div>
                <div className="text-blue-200">{locale === 'es' ? 'Proveedores' : 'Providers'}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 animation-delay-200">
                <div className="text-5xl font-bold text-white mb-2">24/7</div>
                <div className="text-blue-200">{locale === 'es' ? 'Soporte' : 'Support'}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 animation-delay-300">
                <div className="text-5xl font-bold text-white mb-2">98%</div>
                <div className="text-blue-200">{locale === 'es' ? 'Satisfacción' : 'Satisfaction'}</div>
              </div>
            </div>
          </ParallaxLayer>
        </div>
      </Container>

      {/* Smooth gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
