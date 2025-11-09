'use client';

import { useState } from 'react';
import { Send, Plane, Calendar, MapPin, Users, Package } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Container from '@/components/ui/Container';

interface QuoteFormProps {
  locale: string;
}

export default function QuoteForm({ locale }: QuoteFormProps) {
  const [flightType, setFlightType] = useState<'domestic' | 'international'>('domestic');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Contacto
    fname: '',
    lname: '',
    email: '',
    phone: '',
    company: '',

    // Aeronave
    aircraft_registration: '',
    aircraft_type: '',

    // Vuelo
    departure_airport: '',
    arrival_airport: '',
    departure_date: '',
    arrival_date: '',
    passengers: '',

    // Adicional
    comments: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Quote submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const airports = [
    { value: '', label: locale === 'es' ? 'Seleccione...' : 'Select...' },
    { value: 'SVMI', label: 'SVMI - Maiquetía (Caracas)' },
    { value: 'SVMC', label: 'SVMC - Maracaibo' },
    { value: 'SVVA', label: 'SVVA - Valencia' },
    { value: 'SVBC', label: 'SVBC - Barcelona' },
    { value: 'SVPM', label: 'SVPM - Porlamar (Margarita)' },
    { value: 'SVMG', label: 'SVMG - Maturín' },
    { value: 'SVPR', label: 'SVPR - Puerto Ordaz' },
  ];

  const aircraftTypes = [
    { value: '', label: locale === 'es' ? 'Seleccione...' : 'Select...' },
    { value: 'light', label: locale === 'es' ? 'Avión Ligero' : 'Light Aircraft' },
    { value: 'medium', label: locale === 'es' ? 'Avión Mediano' : 'Medium Aircraft' },
    { value: 'heavy', label: locale === 'es' ? 'Avión Pesado' : 'Heavy Aircraft' },
    { value: 'jet', label: locale === 'es' ? 'Jet Privado' : 'Private Jet' },
    { value: 'helicopter', label: locale === 'es' ? 'Helicóptero' : 'Helicopter' },
  ];

  return (
    <section id="quote" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <Container>
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-4">
            <Plane className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-semibold text-blue-600">
              {locale === 'es' ? 'Cotización Gratuita' : 'Free Quote'}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'es' ? 'Solicita tu Cotización' : 'Request Your Quote'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'es'
              ? 'Complete el formulario y reciba una cotización personalizada en menos de 24 horas'
              : 'Fill out the form and receive a personalized quote in less than 24 hours'
            }
          </p>
        </div>

        <Card className="max-w-5xl mx-auto shadow-2xl">
          {submitted ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <Send className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                {locale === 'es' ? '¡Cotización Enviada!' : 'Quote Sent!'}
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                {locale === 'es'
                  ? 'Gracias por contactarnos. Nos pondremos en contacto contigo pronto.'
                  : 'Thank you for contacting us. We will get in touch with you soon.'
                }
              </p>
              <Button onClick={() => setSubmitted(false)}>
                {locale === 'es' ? 'Enviar Otra Cotización' : 'Send Another Quote'}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 p-8">
              {/* Tipo de Vuelo */}
              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setFlightType('domestic')}
                  className={`flex-1 max-w-xs py-4 px-6 rounded-xl font-semibold transition-all ${
                    flightType === 'domestic'
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {locale === 'es' ? '✈️ Vuelo Doméstico' : '✈️ Domestic Flight'}
                </button>
                <button
                  type="button"
                  onClick={() => setFlightType('international')}
                  className={`flex-1 max-w-xs py-4 px-6 rounded-xl font-semibold transition-all ${
                    flightType === 'international'
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {locale === 'es' ? '🌍 Vuelo Internacional' : '🌍 International Flight'}
                </button>
              </div>

              {/* Información Personal */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  {locale === 'es' ? 'Información de Contacto' : 'Contact Information'}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label={locale === 'es' ? 'Nombre *' : 'First Name *'}
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange}
                    required
                    placeholder={locale === 'es' ? 'Juan' : 'John'}
                  />
                  <Input
                    label={locale === 'es' ? 'Apellido *' : 'Last Name *'}
                    name="lname"
                    value={formData.lname}
                    onChange={handleChange}
                    required
                    placeholder={locale === 'es' ? 'Pérez' : 'Doe'}
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
                  <div className="md:col-span-2">
                    <Input
                      label={locale === 'es' ? 'Empresa (Opcional)' : 'Company (Optional)'}
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={locale === 'es' ? 'Nombre de la empresa' : 'Company name'}
                    />
                  </div>
                </div>
              </div>

              {/* Información de Aeronave */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Plane className="w-5 h-5 mr-2 text-blue-600" />
                  {locale === 'es' ? 'Información de Aeronave' : 'Aircraft Information'}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label={locale === 'es' ? 'Matrícula *' : 'Registration *'}
                    name="aircraft_registration"
                    value={formData.aircraft_registration}
                    onChange={handleChange}
                    required
                    placeholder="N12345 / YV-123"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {locale === 'es' ? 'Tipo de Aeronave *' : 'Aircraft Type *'}
                    </label>
                    <select
                      name="aircraft_type"
                      value={formData.aircraft_type}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {aircraftTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Información de Vuelo */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  {locale === 'es' ? 'Detalles del Vuelo' : 'Flight Details'}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {locale === 'es' ? 'Aeropuerto de Salida *' : 'Departure Airport *'}
                    </label>
                    <select
                      name="departure_airport"
                      value={formData.departure_airport}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {airports.map(airport => (
                        <option key={airport.value} value={airport.value}>{airport.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {locale === 'es' ? 'Aeropuerto de Llegada *' : 'Arrival Airport *'}
                    </label>
                    <select
                      name="arrival_airport"
                      value={formData.arrival_airport}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {airports.map(airport => (
                        <option key={airport.value} value={airport.value}>{airport.label}</option>
                      ))}
                    </select>
                  </div>
                  <Input
                    label={locale === 'es' ? 'Fecha de Salida *' : 'Departure Date *'}
                    type="date"
                    name="departure_date"
                    value={formData.departure_date}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label={locale === 'es' ? 'Fecha de Llegada *' : 'Arrival Date *'}
                    type="date"
                    name="arrival_date"
                    value={formData.arrival_date}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label={locale === 'es' ? 'Número de Pasajeros *' : 'Number of Passengers *'}
                    type="number"
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleChange}
                    required
                    min="1"
                    placeholder="1"
                  />
                </div>
              </div>

              {/* Comentarios */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-blue-600" />
                  {locale === 'es' ? 'Servicios Adicionales' : 'Additional Services'}
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'es' ? 'Comentarios o Requerimientos Especiales' : 'Comments or Special Requirements'}
                  </label>
                  <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={locale === 'es'
                      ? 'Ej: Necesito combustible, catering, transporte terrestre...'
                      : 'E.g: I need fuel, catering, ground transportation...'
                    }
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  size="lg"
                  className="px-12 py-6 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl"
                >
                  <Send className="w-6 h-6 mr-3" />
                  {locale === 'es' ? 'Enviar Solicitud de Cotización' : 'Send Quote Request'}
                </Button>
              </div>

              <p className="text-center text-sm text-gray-500 mt-4">
                {locale === 'es'
                  ? '* Campos obligatorios. Recibirás una respuesta en menos de 24 horas.'
                  : '* Required fields. You will receive a response in less than 24 hours.'
                }
              </p>
            </form>
          )}
        </Card>
      </Container>
    </section>
  );
}
