'use client';

import { useRouter } from 'next/navigation';
import { DollarSign, Package, LogOut, Plane, Settings } from 'lucide-react';
import { logout } from '@/lib/auth';
import { MOCK_PROVIDER_BALANCE, MOCK_SERVICES } from '@/lib/mockData';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface ProviderDashboardProps {
  user: any;
  locale: string;
}

export default function ProviderDashboard({ user, locale }: ProviderDashboardProps) {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push(`/${locale}`);
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
                <p className="text-xs text-gray-500">Panel de Proveedor</p>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Ganado</p>
              <h3 className="text-2xl font-bold text-gray-900">${MOCK_PROVIDER_BALANCE.totalEarned}</h3>
            </div>
          </Card>

          <Card>
            <div>
              <p className="text-sm font-medium text-gray-600">Comision Plataforma</p>
              <h3 className="text-2xl font-bold text-orange-600">-${MOCK_PROVIDER_BALANCE.platformCommission}</h3>
            </div>
          </Card>

          <Card>
            <div>
              <p className="text-sm font-medium text-gray-600">Balance Pendiente</p>
              <h3 className="text-2xl font-bold text-green-600">${MOCK_PROVIDER_BALANCE.pendingBalance}</h3>
            </div>
          </Card>

          <Card>
            <div>
              <p className="text-sm font-medium text-gray-600">Servicios Activos</p>
              <h3 className="text-2xl font-bold text-blue-600">{MOCK_SERVICES.length}</h3>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Mis Servicios</h2>
            <div className="space-y-3">
              {MOCK_SERVICES.map((service) => (
                <div key={service.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-600">{service.category}</p>
                      <p className="text-xs text-gray-500">{service.airports.join(', ')}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">${service.basePrice}</p>
                      <p className="text-xs text-gray-600">por {service.unit}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4">
              <Package className="w-4 h-4 mr-2" />
              Agregar Servicio
            </Button>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Configuracion de Pagos</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Metodo de Pago</p>
                <p className="text-gray-900">{MOCK_PROVIDER_BALANCE.paymentMethod.type}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Banco</p>
                <p className="text-gray-900">{MOCK_PROVIDER_BALANCE.paymentMethod.bank}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Numero de Cuenta</p>
                <p className="text-gray-900 font-mono">{MOCK_PROVIDER_BALANCE.paymentMethod.accountNumber}</p>
              </div>
              <Button variant="outline" className="w-full">
                <Settings className="w-4 h-4 mr-2" />
                Configurar Metodo de Pago
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
