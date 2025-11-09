'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Send, Plane } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Container from '@/components/ui/Container';
import Link from 'next/link';

export default function QuotePage({ params }: { params: Promise<{ locale: string }> }) {
  const t = useTranslations('quote');
  const router = useRouter();
  const [locale, setLocale] = useState('es');
  const [submitted, setSubmitted] = useState(false);
  const [flightType, setFlightType] = useState<'domestic' | 'international'>('domestic');
  const [serviceType, setServiceType] = useState<'overflight' | 'services'>('overflight');

  const [formData, setFormData] = useState({
    // Información de contacto
    fname: '',
    lname: '',
    company_name: '',
    usr_role: '',
    email: '',
    phone: '',

    // Información de aeronave
    airc_numero: '',
    airc_type: '',
    airc_weight: '',
    airc_fuel: '',
    u_fuel: 'lts',

    // Información de vuelo - Doméstico
    D_aeropuerto_dep: '',
    D_aeropuerto_dest: '',
    D_categoria: 'pasajeros',
    D_flight_arrival_date: '',
    D_flight_arrival_time: '',
    D_flight_departure_date: '',
    D_flight_departure_time: '',

    // Información de vuelo - Internacional
    I_country_dep: '',
    I_aeropuerto_dep: '',
    I_aeropuerto_dest: '',
    I_categoria: 'pasajeros',
    I_flight_arrival_date: '',
    I_flight_arrival_time: '',
    I_flight_departure_date: '',
    I_flight_departure_time: '',

    // Tripulación y pasajeros
    flight_crew_arriving: '0',
    flight_crew_departing: '0',
    flight_pax_arriving: '0',
    flight_pax_departing: '0',

    // Carga
    flight_cargo_arriving: '0',
    flight_cargo_departing: '0',
    u_cargo: 'kg',

    // Servicios
    selec_handling: '',
    comentarios: '',
  });

  useEffect(() => {
    params.then(p => setLocale(p.locale));
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Quote submitted:', { ...formData, flightType, serviceType });
    setSubmitted(true);
    setTimeout(() => {
      router.push(`/${locale}/dashboard`);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const jobRoles = [
    { value: '', label: 'Seleccione...' },
    { value: 'pilot', label: 'Piloto' },
    { value: 'operator', label: 'Operador' },
    { value: 'dispatcher', label: 'Despachador' },
    { value: 'owner', label: 'Propietario' },
    { value: 'other', label: 'Otro' },
  ];

  const aircraftTypes = [
    { value: '', label: 'Seleccione...' },
    { value: 'cessna172', label: 'Cessna 172' },
    { value: 'cessna208', label: 'Cessna 208 Caravan' },
    { value: 'kingair350', label: 'King Air 350' },
    { value: 'learjet45', label: 'Learjet 45' },
    { value: 'citation', label: 'Citation' },
    { value: 'gulfstream', label: 'Gulfstream' },
    { value: 'other', label: 'Otro' },
  ];

  const airports = [
    { value: '', label: 'Seleccione...' },
    { value: 'SVMI', label: 'SVMI - Maiquetía (Caracas)' },
    { value: 'SVMC', label: 'SVMC - Maracaibo' },
    { value: 'SVVA', label: 'SVVA - Valencia' },
    { value: 'SVBC', label: 'SVBC - Barcelona' },
    { value: 'SVPM', label: 'SVPM - Porlamar (Margarita)' },
    { value: 'SVMG', label: 'SVMG - Maturín' },
    { value: 'SVPR', label: 'SVPR - Puerto Ordaz' },
  ];

  const countries = [
    { value: '', label: 'Seleccione...' },
    { value: 'US', label: 'Estados Unidos' },
    { value: 'CO', label: 'Colombia' },
    { value: 'PA', label: 'Panamá' },
    { value: 'BR', label: 'Brasil' },
    { value: 'AR', label: 'Argentina' },
    { value: 'MX', label: 'México' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container className="max-w-6xl">
        <div className="mb-6">
          <Link href={`/${locale}/dashboard`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Dashboard
            </Button>
          </Link>
        </div>

        <Card>
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-primary-100 rounded-lg">
                <Plane className="w-8 h-8 text-primary-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Solicitud de Cotización
                </h1>
                <p className="text-gray-600">
                  Complete los detalles de su vuelo para recibir una cotización personalizada
                </p>
              </div>
            </div>
          </div>

          {submitted ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Send className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Cotización Enviada Exitosamente
              </h2>
              <p className="text-gray-600">
                Redirigiendo al dashboard...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* INFORMACIÓN DE CONTACTO */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-3 border-b-2 border-primary-200">
                  Información de Contacto
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Nombre *"
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange}
                    placeholder="Juan"
                    required
                  />
                  <Input
                    label="Apellido *"
                    name="lname"
                    value={formData.lname}
                    onChange={handleChange}
                    placeholder="Pérez"
                    required
                  />
                  <div className="md:col-span-2">
                    <Input
                      label="Nombre de la Empresa *"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      placeholder="Empresa Aviation"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rol / Posición *
                    </label>
                    <select
                      name="usr_role"
                      value={formData.usr_role}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      {jobRoles.map(role => (
                        <option key={role.value} value={role.value}>{role.label}</option>
                      ))}
                    </select>
                  </div>
                  <Input
                    label="Email *"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@ejemplo.com"
                    required
                  />
                  <Input
                    label="Teléfono *"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+58 412-0000000"
                    required
                  />
                </div>
              </div>

              {/* INFORMACIÓN DE AERONAVE */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-3 border-b-2 border-primary-200">
                  Información de Aeronave
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Matrícula de Aeronave *"
                    name="airc_numero"
                    value={formData.airc_numero}
                    onChange={handleChange}
                    placeholder="N12345 o YV123"
                    required
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de Aeronave *
                    </label>
                    <select
                      name="airc_type"
                      value={formData.airc_type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      {aircraftTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <Input
                    label="Peso de la Aeronave (kg)"
                    type="number"
                    name="airc_weight"
                    value={formData.airc_weight}
                    onChange={handleChange}
                    placeholder="5000"
                    disabled
                  />
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        label="Combustible Requerido"
                        type="number"
                        name="airc_fuel"
                        value={formData.airc_fuel}
                        onChange={handleChange}
                        placeholder="500"
                      />
                    </div>
                    <div className="w-32">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Unidad
                      </label>
                      <select
                        name="u_fuel"
                        value={formData.u_fuel}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="lts">Litros</option>
                        <option value="gal">Galones</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* INFORMACIÓN DE VUELO */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-3 border-b-2 border-primary-200">
                  Información de Vuelo
                </h2>

                {/* Tabs para tipo de vuelo */}
                <div className="mb-6">
                  <div className="flex space-x-4 border-b border-gray-200">
                    <button
                      type="button"
                      onClick={() => setFlightType('domestic')}
                      className={`px-6 py-3 font-medium transition-colors ${
                        flightType === 'domestic'
                          ? 'border-b-2 border-primary-600 text-primary-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Vuelo Doméstico
                    </button>
                    <button
                      type="button"
                      onClick={() => setFlightType('international')}
                      className={`px-6 py-3 font-medium transition-colors ${
                        flightType === 'international'
                          ? 'border-b-2 border-primary-600 text-primary-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Vuelo Internacional
                    </button>
                  </div>
                </div>

                {/* Vuelo Doméstico */}
                {flightType === 'domestic' && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Aeropuerto de Salida *
                        </label>
                        <select
                          name="D_aeropuerto_dep"
                          value={formData.D_aeropuerto_dep}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required={flightType === 'domestic'}
                        >
                          {airports.map(airport => (
                            <option key={airport.value} value={airport.value}>{airport.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Aeropuerto de Destino *
                        </label>
                        <select
                          name="D_aeropuerto_dest"
                          value={formData.D_aeropuerto_dest}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required={flightType === 'domestic'}
                        >
                          {airports.map(airport => (
                            <option key={airport.value} value={airport.value}>{airport.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Categoría *
                        </label>
                        <select
                          name="D_categoria"
                          value={formData.D_categoria}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required={flightType === 'domestic'}
                        >
                          <option value="pasajeros">Pasajeros</option>
                          <option value="cargo">Carga</option>
                          <option value="cargo_pasajero">Carga y Pasajeros</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-4 gap-6">
                      <Input
                        label="Fecha de Llegada *"
                        type="date"
                        name="D_flight_arrival_date"
                        value={formData.D_flight_arrival_date}
                        onChange={handleChange}
                        required={flightType === 'domestic'}
                      />
                      <Input
                        label="Hora de Llegada (UTC)"
                        type="time"
                        name="D_flight_arrival_time"
                        value={formData.D_flight_arrival_time}
                        onChange={handleChange}
                      />
                      <Input
                        label="Fecha de Salida *"
                        type="date"
                        name="D_flight_departure_date"
                        value={formData.D_flight_departure_date}
                        onChange={handleChange}
                        required={flightType === 'domestic'}
                      />
                      <Input
                        label="Hora de Salida (UTC)"
                        type="time"
                        name="D_flight_departure_time"
                        value={formData.D_flight_departure_time}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}

                {/* Vuelo Internacional */}
                {flightType === 'international' && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          País de Salida *
                        </label>
                        <select
                          name="I_country_dep"
                          value={formData.I_country_dep}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required={flightType === 'international'}
                        >
                          {countries.map(country => (
                            <option key={country.value} value={country.value}>{country.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Categoría *
                        </label>
                        <select
                          name="I_categoria"
                          value={formData.I_categoria}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required={flightType === 'international'}
                        >
                          <option value="pasajeros">Pasajeros</option>
                          <option value="cargo">Carga</option>
                          <option value="cargo_pasajero">Carga y Pasajeros</option>
                        </select>
                      </div>
                      <Input
                        label="Aeropuerto de Salida (ICAO) *"
                        name="I_aeropuerto_dep"
                        value={formData.I_aeropuerto_dep}
                        onChange={handleChange}
                        placeholder="KJFK"
                        required={flightType === 'international'}
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Aeropuerto de Destino *
                        </label>
                        <select
                          name="I_aeropuerto_dest"
                          value={formData.I_aeropuerto_dest}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required={flightType === 'international'}
                        >
                          {airports.map(airport => (
                            <option key={airport.value} value={airport.value}>{airport.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-4 gap-6">
                      <Input
                        label="Fecha de Llegada *"
                        type="date"
                        name="I_flight_arrival_date"
                        value={formData.I_flight_arrival_date}
                        onChange={handleChange}
                        required={flightType === 'international'}
                      />
                      <Input
                        label="Hora de Llegada (UTC)"
                        type="time"
                        name="I_flight_arrival_time"
                        value={formData.I_flight_arrival_time}
                        onChange={handleChange}
                      />
                      <Input
                        label="Fecha de Salida *"
                        type="date"
                        name="I_flight_departure_date"
                        value={formData.I_flight_departure_date}
                        onChange={handleChange}
                        required={flightType === 'international'}
                      />
                      <Input
                        label="Hora de Salida (UTC)"
                        type="time"
                        name="I_flight_departure_time"
                        value={formData.I_flight_departure_time}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* TRIPULACIÓN Y PASAJEROS */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-3 border-b-2 border-primary-200">
                  Tripulación y Pasajeros
                </h2>
                <div className="grid md:grid-cols-4 gap-6">
                  <Input
                    label="Tripulación Llegando *"
                    type="number"
                    name="flight_crew_arriving"
                    value={formData.flight_crew_arriving}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                  <Input
                    label="Tripulación Partiendo *"
                    type="number"
                    name="flight_crew_departing"
                    value={formData.flight_crew_departing}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                  <Input
                    label="Pasajeros Llegando *"
                    type="number"
                    name="flight_pax_arriving"
                    value={formData.flight_pax_arriving}
                    onChange={handleChange}
                    min="0"
                    required
                    disabled={formData.D_categoria === 'cargo' || formData.I_categoria === 'cargo'}
                  />
                  <Input
                    label="Pasajeros Partiendo *"
                    type="number"
                    name="flight_pax_departing"
                    value={formData.flight_pax_departing}
                    onChange={handleChange}
                    min="0"
                    required
                    disabled={formData.D_categoria === 'cargo' || formData.I_categoria === 'cargo'}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-6">
                  <Input
                    label="Carga Llegando"
                    type="number"
                    name="flight_cargo_arriving"
                    value={formData.flight_cargo_arriving}
                    onChange={handleChange}
                    min="0"
                    disabled={formData.D_categoria === 'pasajeros' || formData.I_categoria === 'pasajeros'}
                  />
                  <Input
                    label="Carga Partiendo"
                    type="number"
                    name="flight_cargo_departing"
                    value={formData.flight_cargo_departing}
                    onChange={handleChange}
                    min="0"
                    disabled={formData.D_categoria === 'pasajeros' || formData.I_categoria === 'pasajeros'}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unidad de Carga
                    </label>
                    <select
                      name="u_cargo"
                      value={formData.u_cargo}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      disabled={formData.D_categoria === 'pasajeros' || formData.I_categoria === 'pasajeros'}
                    >
                      <option value="kg">Kilogramos</option>
                      <option value="t">Toneladas</option>
                      <option value="lb">Libras</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SERVICIOS ADICIONALES */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-3 border-b-2 border-primary-200">
                  Servicios Adicionales
                </h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Información Adicional / Comentarios
                  </label>
                  <textarea
                    name="comentarios"
                    value={formData.comentarios}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Incluya cualquier información adicional o requerimientos especiales para su vuelo..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Link href={`/${locale}/dashboard`}>
                  <Button type="button" variant="outline" size="lg">
                    Cancelar
                  </Button>
                </Link>
                <Button type="submit" size="lg">
                  <Send className="w-5 h-5 mr-2" />
                  Enviar Solicitud
                </Button>
              </div>
            </form>
          )}
        </Card>
      </Container>
    </div>
  );
}
