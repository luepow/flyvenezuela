'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  DollarSign,
  FileText,
  LogOut,
  Plane,
  CheckCircle,
  XCircle,
  Users,
  Building2,
  Wallet,
  Clock,
  AlertCircle,
  Eye
} from 'lucide-react';
import { logout } from '@/lib/auth';
import {
  MOCK_QUOTES,
  MOCK_PROVIDERS,
  MOCK_CLIENTS,
  MOCK_SETTLEMENTS,
  getFinancialSummary
} from '@/lib/mockData';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface AdminDashboardProps {
  user: any;
  locale: string;
}

type TabType = 'quotes' | 'providers' | 'clients' | 'settlements';

export default function AdminDashboard({ user, locale }: AdminDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('quotes');
  const financialSummary = getFinancialSummary();

  const handleLogout = () => {
    logout();
    router.push(`/${locale}`);
  };

  const tabs = [
    { id: 'quotes' as TabType, label: 'Cotizaciones', icon: FileText },
    { id: 'providers' as TabType, label: 'Proveedores', icon: Building2 },
    { id: 'clients' as TabType, label: 'Clientes', icon: Users },
    { id: 'settlements' as TabType, label: 'Liquidaciones', icon: Wallet },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Plane className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">FlyVenezuela</h1>
                <p className="text-xs text-gray-500">Panel de Administracion</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
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
        {/* Financial Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
                <h3 className="text-2xl font-bold text-gray-900">${financialSummary.totalRevenue}</h3>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Comisiones</p>
                <h3 className="text-2xl font-bold text-gray-900">${financialSummary.platformCommissions}</h3>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pagos Pendientes</p>
                <h3 className="text-2xl font-bold text-gray-900">${financialSummary.pendingPayments}</h3>
              </div>
              <DollarSign className="w-8 h-8 text-orange-600" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cotizaciones</p>
                <h3 className="text-2xl font-bold text-gray-900">{financialSummary.totalQuotes}</h3>
              </div>
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
          </Card>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'quotes' && <QuotesTab />}
        {activeTab === 'providers' && <ProvidersTab />}
        {activeTab === 'clients' && <ClientsTab />}
        {activeTab === 'settlements' && <SettlementsTab />}
      </main>
    </div>
  );
}

function QuotesTab() {
  const pendingQuotes = MOCK_QUOTES.filter(q => q.status === 'pending');
  const allQuotes = MOCK_QUOTES;

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Cotizaciones Pendientes de Aprobacion</h2>
        <div className="space-y-4">
          {pendingQuotes.map((quote) => (
            <div key={quote.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{quote.id} - {quote.clientName}</h3>
                  <p className="text-sm text-gray-600">{quote.flight.origin} a {quote.flight.destination}</p>
                  <p className="text-sm text-gray-600">Fecha: {quote.flight.date}</p>
                  <p className="text-sm text-gray-600">Aeronave: {quote.flight.aircraft}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">${quote.total}</p>
                  <div className="mt-2 space-x-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Aprobar
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-600 text-red-600">
                      <XCircle className="w-4 h-4 mr-1" />
                      Rechazar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Todas las Cotizaciones</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ruta</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allQuotes.map((quote) => (
                <tr key={quote.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{quote.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{quote.clientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{quote.flight.origin} - {quote.flight.destination}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{quote.flight.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${quote.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      quote.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      quote.status === 'approved' ? 'bg-green-100 text-green-800' :
                      quote.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {quote.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function ProvidersTab() {
  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Gestion de Proveedores</h2>
          <Button>
            <Building2 className="w-4 h-4 mr-2" />
            Agregar Proveedor
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Empresa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contacto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Servicios</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ganado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {MOCK_PROVIDERS.map((provider) => (
                <tr key={provider.id}>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{provider.company}</div>
                      <div className="text-sm text-gray-500">{provider.rif}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-900">{provider.name}</div>
                      <div className="text-sm text-gray-500">{provider.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{provider.servicesCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">${provider.totalEarned}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-orange-600">${provider.pendingBalance}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      provider.status === 'active' ? 'bg-green-100 text-green-800' :
                      provider.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {provider.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {provider.status === 'pending' && (
                        <>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-600 text-red-600">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function ClientsTab() {
  const registeredClients = MOCK_CLIENTS.filter(c => c.type === 'registered');
  const guestClients = MOCK_CLIENTS.filter(c => c.type === 'guest');

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Clientes Registrados</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Empresa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contacto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cotizaciones</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gastado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {registeredClients.map((client) => (
                <tr key={client.id}>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{client.name}</div>
                      <div className="text-sm text-gray-500">{client.rif}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.company}</td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-600">{client.email}</div>
                      <div className="text-sm text-gray-500">{client.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{client.totalQuotes}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">${client.totalSpent}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Clientes Invitados</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Telefono</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cotizaciones</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registro</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {guestClients.map((client) => (
                <tr key={client.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{client.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{client.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{client.totalQuotes}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.registeredAt.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function SettlementsTab() {
  const pendingSettlements = MOCK_SETTLEMENTS.filter(s => s.status === 'pending');
  const approvedSettlements = MOCK_SETTLEMENTS.filter(s => s.status === 'approved');
  const paidSettlements = MOCK_SETTLEMENTS.filter(s => s.status === 'paid');

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Liquidaciones Pendientes de Aprobacion</h2>
        <div className="space-y-4">
          {pendingSettlements.map((settlement) => (
            <div key={settlement.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{settlement.id} - {settlement.providerName}</h3>
                  <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Monto Total:</p>
                      <p className="font-semibold text-gray-900">${settlement.amount}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Comision (10%):</p>
                      <p className="font-semibold text-orange-600">-${settlement.platformCommission}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Monto Neto:</p>
                      <p className="font-semibold text-green-600">${settlement.netAmount}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Metodo de Pago:</p>
                      <p className="font-medium text-gray-900">
                        {settlement.paymentMethod.type === 'bank_transfer' ? 'Transferencia Bancaria' :
                         settlement.paymentMethod.type === 'zelle' ? 'Zelle' : 'Crypto'}
                      </p>
                    </div>
                  </div>
                  {settlement.paymentMethod.bank && (
                    <div className="mt-2 text-sm">
                      <p className="text-gray-600">Banco: {settlement.paymentMethod.bank}</p>
                      <p className="text-gray-600">Cuenta: {settlement.paymentMethod.accountNumber}</p>
                    </div>
                  )}
                  {settlement.notes && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">{settlement.notes}</p>
                    </div>
                  )}
                </div>
                <div className="ml-6">
                  <div className="space-y-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 w-full">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Aprobar
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-600 text-red-600 w-full">
                      <XCircle className="w-4 h-4 mr-1" />
                      Rechazar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Liquidaciones Aprobadas - Pendientes de Pago</h2>
        <div className="space-y-4">
          {approvedSettlements.map((settlement) => (
            <div key={settlement.id} className="border border-green-200 bg-green-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{settlement.id} - {settlement.providerName}</h3>
                  <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Monto Neto:</p>
                      <p className="font-semibold text-green-600">${settlement.netAmount}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Aprobado:</p>
                      <p className="text-gray-900">{settlement.approvedAt?.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Metodo:</p>
                      <p className="text-gray-900">
                        {settlement.paymentMethod.type === 'bank_transfer' ? 'Transferencia' :
                         settlement.paymentMethod.type === 'zelle' ? 'Zelle' : 'Crypto'}
                      </p>
                    </div>
                  </div>
                  {settlement.paymentMethod.accountNumber && (
                    <div className="mt-2 text-sm">
                      <p className="text-gray-600">Cuenta: {settlement.paymentMethod.accountNumber}</p>
                    </div>
                  )}
                </div>
                <div className="ml-6">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Wallet className="w-4 h-4 mr-1" />
                    Marcar como Pagado
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Historial de Pagos</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Proveedor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monto Neto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Metodo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Referencia</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pagado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paidSettlements.map((settlement) => (
                <tr key={settlement.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{settlement.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{settlement.providerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">${settlement.netAmount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {settlement.paymentMethod.type === 'bank_transfer' ? 'Transferencia' :
                     settlement.paymentMethod.type === 'zelle' ? 'Zelle' : 'Crypto'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {settlement.paymentMethod.reference || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {settlement.paidAt?.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
