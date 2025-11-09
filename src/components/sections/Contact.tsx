'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Container from '@/components/ui/Container';

interface ContactProps {
  locale: string;
}

export default function Contact({ locale }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <Container>
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-4">
            <MessageCircle className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-semibold text-blue-600">
              {locale === 'es' ? 'Contáctanos' : 'Contact Us'}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'es' ? '¿Necesitas Ayuda?' : 'Need Help?'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'es'
              ? 'Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible'
              : 'We are here to help you. Send us a message and we will respond as soon as possible'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="shadow-xl">
            {submitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Send className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {locale === 'es' ? '¡Mensaje Enviado!' : 'Message Sent!'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'es'
                    ? 'Gracias por contactarnos. Te responderemos pronto.'
                    : 'Thank you for contacting us. We will respond soon.'
                  }
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  {locale === 'es' ? 'Envíanos un Mensaje' : 'Send us a Message'}
                </h3>
                <Input
                  label={locale === 'es' ? 'Nombre Completo *' : 'Full Name *'}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={locale === 'es' ? 'Juan Pérez' : 'John Doe'}
                />
                <Input
                  label={locale === 'es' ? 'Email *' : 'Email *'}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="email@ejemplo.com"
                />
                <Input
                  label={locale === 'es' ? 'Teléfono *' : 'Phone *'}
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+58 412-0000000"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'es' ? 'Mensaje *' : 'Message *'}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={locale === 'es' ? 'Escribe tu mensaje aquí...' : 'Write your message here...'}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Send className="w-5 h-5 mr-2" />
                  {locale === 'es' ? 'Enviar Mensaje' : 'Send Message'}
                </Button>
              </form>
            )}
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                {locale === 'es' ? 'Información de Contacto' : 'Contact Information'}
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Email</p>
                    <a href="mailto:info@flyvenezuela.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                      info@flyvenezuela.com
                    </a>
                    <br />
                    <a href="mailto:operations@flyvenezuela.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                      operations@flyvenezuela.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      {locale === 'es' ? 'Teléfono' : 'Phone'}
                    </p>
                    <a href="tel:+582120000000" className="text-gray-600 hover:text-blue-600 transition-colors">
                      +58 (212) 000-0000
                    </a>
                    <br />
                    <a href="tel:+584120000000" className="text-gray-600 hover:text-blue-600 transition-colors">
                      +58 (412) 000-0000
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg flex-shrink-0">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      {locale === 'es' ? 'Dirección' : 'Address'}
                    </p>
                    <p className="text-gray-600">
                      {locale === 'es'
                        ? 'Aeropuerto Internacional Simón Bolívar'
                        : 'Simón Bolívar International Airport'
                      }
                      <br />
                      Maiquetía, Caracas, Venezuela
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Business Hours */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg border-2 border-blue-100">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg mr-3">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {locale === 'es' ? 'Horario de Atención' : 'Business Hours'}
                </h3>
              </div>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span className="font-medium">
                    {locale === 'es' ? 'Lunes - Viernes:' : 'Monday - Friday:'}
                  </span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">
                    {locale === 'es' ? 'Sábado:' : 'Saturday:'}
                  </span>
                  <span>9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">
                    {locale === 'es' ? 'Domingo:' : 'Sunday:'}
                  </span>
                  <span>{locale === 'es' ? 'Cerrado' : 'Closed'}</span>
                </div>
                <div className="pt-4 mt-4 border-t border-blue-200">
                  <p className="text-blue-700 font-semibold flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    {locale === 'es' ? 'Soporte de Emergencia: 24/7' : 'Emergency Support: 24/7'}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
