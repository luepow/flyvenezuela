'use client';

import { useRouter } from 'next/navigation';
import { FileText, Plus, LogOut, Plane, Clock, CheckCircle } from 'lucide-react';
import { logout } from '@/lib/auth';
import { MOCK_QUOTES } from '@/lib/mockData';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface ClientDashboardProps {
  user: any;
  locale: string;
}

export default function ClientDashboard({ user, locale }: ClientDashboardProps) {
  const router = useRouter();
  const myQuotes = MOCK_QUOTES.filter(q => q.clientId === user.id);

  const handleLogout = () => {
    logout();
    router.push(`/${locale}`);
  };

  const handleNewQuote = () => {
    router.push(`/${locale}/dashboard/quote`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Plane className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">FlyVenezuela</h1>
                <p className="text-xs text-gray-500">Panel de Cliente</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.company}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Mis Cotizaciones</h2>
          <Button onClick={handleNewQuote}>
            <Plus className="w-4 h-4 mr-2" />
            Nueva Cotizacion
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Cotizaciones</p>
                <h3 className="text-2xl font-bold text-gray-900">{myQuotes.length}</h3>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {myQuotes.filter(q => q.status === 'pending').length}
                </h3>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aprobadas</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {myQuotes.filter(q => q.status === 'approved' || q.status === 'completed').length}
                </h3>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          {myQuotes.map((quote) => (
            <Card key={quote.id} className="hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{quote.id}</h3>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      quote.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      quote.status === 'approved' ? 'bg-green-100 text-green-800' :
                      quote.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {quote.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-600">Origen</p>
                      <p className="font-medium text-gray-900">{quote.flight.origin}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Destino</p>
                      <p className="font-medium text-gray-900">{quote.flight.destination}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Fecha</p>
                      <p className="font-medium text-gray-900">{quote.flight.date}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Aeronave</p>
                      <p className="font-medium text-gray-900">{quote.flight.aircraft}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Servicios Incluidos:</p>
                    <div className="space-y-1">
                      {quote.services.map((service, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-600">{service.serviceName}</span>
                          <span className="font-medium text-gray-900">${service.total}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="ml-6 text-right">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-3xl font-bold text-gray-900">${quote.total}</p>
                  {quote.status === 'pending' && (
                    <p className="text-xs text-gray-500 mt-2">Esperando aprobacion</p>
                  )}
                  {quote.status === 'approved' && (
                    <p className="text-xs text-green-600 mt-2">Aprobada</p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
