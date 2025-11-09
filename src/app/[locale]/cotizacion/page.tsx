'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plane,
  Calendar,
  Users,
  MapPin,
  Send,
  CheckCircle2,
  ArrowRight,
  Package,
  DollarSign
} from 'lucide-react';
import {
  VENEZUELAN_AIRPORTS,
  AIRCRAFT_TYPES,
  MOCK_SERVICES,
  calculateQuote
} from '@/lib/mockData';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import DatePicker from '@/components/ui/DatePicker';

export const dynamic = 'force-dynamic';

export default function QuotePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    origin: '',
    destination: '',
    date: '',
    aircraft: '',
    passengers: 1,
    selectedServices: [] as string[],
  });

  const [quote, setQuote] = useState<{
    services: any[];
    total: number;
  } | null>(null);

  const [submitted, setSubmitted] = useState(false);

  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter(id => id !== serviceId)
        : [...prev.selectedServices, serviceId]
    }));
  };

  const handleNext = () => {
    if (step === 3) {
      // Generate quote
      const calculatedQuote = calculateQuote(
        formData.origin,
        formData.destination,
        formData.aircraft,
        formData.passengers,
        formData.selectedServices
      );
      setQuote(calculatedQuote);
    }
    setStep(prev => prev + 1);
  };

  const handleSubmit = async () => {
    // Here would be the email sending logic
    console.log('Sending quote to:', formData.email);
    console.log('Quote data:', quote);
    setSubmitted(true);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.phone;
      case 2:
        return formData.origin && formData.destination && formData.date && formData.aircraft;
      case 3:
        return formData.selectedServices.length > 0;
      default:
        return true;
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Cotizacion Enviada!</h2>
          <p className="text-gray-600 mb-6">
            Hemos enviado la cotizacion estimada a <span className="font-semibold">{formData.email}</span>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Nuestro equipo revisara tu solicitud y te contactara pronto con la cotizacion final.
          </p>
          <Button onClick={() => router.push('/')} className="w-full">
            Volver al Inicio
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Plane className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Cotiza tu Vuelo</h1>
          <p className="text-gray-600">Obten una cotizacion estimada en minutos</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Datos de Contacto' },
              { num: 2, label: 'Plan de Vuelo' },
              { num: 3, label: 'Servicios' },
              { num: 4, label: 'Resumen' }
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className={`flex flex-col items-center flex-1 ${idx < 3 ? 'pr-4' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s.num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                  }`}>
                    {s.num}
                  </div>
                  <p className={`text-xs mt-2 text-center ${
                    step >= s.num ? 'text-blue-600 font-medium' : 'text-gray-400'
                  }`}>
                    {s.label}
                  </p>
                </div>
                {idx < 3 && (
                  <div className={`h-1 flex-1 ${step > s.num ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-8">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Datos de Contacto</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Juan Perez"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="juan@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefono *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+58 412-1234567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Empresa (Opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Aviacion Ejecutiva CA"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Plan de Vuelo</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Aeropuerto de Origen *
                    </label>
                    <select
                      value={formData.origin}
                      onChange={(e) => handleInputChange('origin', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Seleccionar...</option>
                      {VENEZUELAN_AIRPORTS.map(airport => (
                        <option key={airport.code} value={airport.code}>
                          {airport.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Aeropuerto de Destino *
                    </label>
                    <select
                      value={formData.destination}
                      onChange={(e) => handleInputChange('destination', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Seleccionar...</option>
                      {VENEZUELAN_AIRPORTS.map(airport => (
                        <option key={airport.code} value={airport.code}>
                          {airport.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <DatePicker
                  value={formData.date}
                  onChange={(date) => handleInputChange('date', date)}
                  minDate={new Date().toISOString().split('T')[0]}
                  label="Fecha de Vuelo"
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Plane className="w-4 h-4 inline mr-1" />
                    Tipo de Aeronave *
                  </label>
                  <select
                    value={formData.aircraft}
                    onChange={(e) => handleInputChange('aircraft', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccionar...</option>
                    {AIRCRAFT_TYPES.map(aircraft => (
                      <option key={aircraft.name} value={aircraft.name}>
                        {aircraft.name} - {aircraft.category} (Max {aircraft.passengers} pax)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    Numero de Pasajeros *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={formData.passengers}
                    onChange={(e) => handleInputChange('passengers', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Servicios Requeridos</h2>
              <p className="text-gray-600 mb-6">Selecciona los servicios que necesitas para tu vuelo</p>
              <div className="space-y-3">
                {MOCK_SERVICES.map(service => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceToggle(service.id)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      formData.selectedServices.includes(service.id)
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.selectedServices.includes(service.id)}
                            onChange={() => {}}
                            className="w-5 h-5 text-blue-600 rounded mr-3"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">{service.name}</h3>
                            <p className="text-sm text-gray-600">{service.description}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              Proveedor: {service.providerName}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-lg font-bold text-gray-900">${service.basePrice}</p>
                        <p className="text-xs text-gray-500">por {service.unit}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && quote && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumen de Cotizacion</h2>

              {/* Flight Details */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Detalles del Vuelo</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Origen:</p>
                    <p className="font-medium text-gray-900">
                      {VENEZUELAN_AIRPORTS.find(a => a.code === formData.origin)?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Destino:</p>
                    <p className="font-medium text-gray-900">
                      {VENEZUELAN_AIRPORTS.find(a => a.code === formData.destination)?.name}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600">Fecha:</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <p className="font-medium text-gray-900 capitalize">{formatDateDisplay(formData.date)}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600">Aeronave:</p>
                    <p className="font-medium text-gray-900">{formData.aircraft}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Pasajeros:</p>
                    <p className="font-medium text-gray-900">{formData.passengers}</p>
                  </div>
                </div>
              </div>

              {/* Services Breakdown */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Desglose de Servicios</h3>
                <div className="space-y-3">
                  {quote.services.map((service, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-200">
                      <div>
                        <p className="font-medium text-gray-900">{service.serviceName}</p>
                        <p className="text-sm text-gray-600">
                          {service.quantity} x ${service.unitPrice}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-gray-900">${service.total}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600">Total Estimado</p>
                    <p className="text-xs text-gray-500">Esta es una cotizacion preliminar</p>
                  </div>
                  <p className="text-4xl font-bold text-blue-600">${quote.total}</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600">
                  La cotizacion sera enviada a: <span className="font-semibold">{formData.email}</span>
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(prev => prev - 1)}
              >
                Anterior
              </Button>
            )}
            <div className="ml-auto">
              {step < 4 ? (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="flex items-center"
                >
                  Continuar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="flex items-center bg-green-600 hover:bg-green-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Cotizacion
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
