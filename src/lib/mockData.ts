export interface Quote {
  id: string;
  clientId: string;
  clientName: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  flight: {
    origin: string;
    destination: string;
    date: string;
    aircraft: string;
    passengers: number;
  };
  services: QuoteService[];
  total: number;
  currency: 'USD';
  createdAt: Date;
  approvedAt?: Date;
  approvedBy?: string;
}

export interface QuoteService {
  serviceId: string;
  serviceName: string;
  providerId: string;
  providerName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Service {
  id: string;
  providerId: string;
  providerName: string;
  category: string;
  name: string;
  description: string;
  basePrice: number;
  unit: string;
  currency: 'USD' | 'BS';
  available: boolean;
  airports: string[];
}

export interface ProviderBalance {
  providerId: string;
  providerName: string;
  totalEarned: number;
  platformCommission: number;
  totalPayments: number;
  pendingBalance: number;
  paymentMethod: {
    type: 'bank_transfer' | 'zelle' | 'crypto';
    accountNumber?: string;
    bank?: string;
    walletAddress?: string;
  };
}

export interface Provider {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'active' | 'pending' | 'suspended';
  registeredAt: Date;
  servicesCount: number;
  totalEarned: number;
  pendingBalance: number;
  rif: string;
  address: string;
  contactPerson: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  type: 'guest' | 'registered';
  status: 'active' | 'inactive';
  registeredAt: Date;
  totalQuotes: number;
  totalSpent: number;
  lastQuoteDate?: Date;
  rif?: string;
  address?: string;
}

export interface Settlement {
  id: string;
  providerId: string;
  providerName: string;
  amount: number;
  platformCommission: number;
  netAmount: number;
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  requestedAt: Date;
  approvedAt?: Date;
  paidAt?: Date;
  approvedBy?: string;
  paymentMethod: {
    type: 'bank_transfer' | 'zelle' | 'crypto';
    accountNumber?: string;
    bank?: string;
    reference?: string;
  };
  notes?: string;
}

export const MOCK_QUOTES: Quote[] = [
  {
    id: 'Q001',
    clientId: '2',
    clientName: 'Juan Perez',
    status: 'pending',
    flight: {
      origin: 'SVMI (Caracas)',
      destination: 'SVMC (Maracaibo)',
      date: '2025-02-15',
      aircraft: 'Citation CJ3',
      passengers: 6
    },
    services: [
      {
        serviceId: 'S001',
        serviceName: 'Combustible Jet A1',
        providerId: '3',
        providerName: 'Servicios Aeroportuarios VE',
        quantity: 500,
        unitPrice: 3.5,
        total: 1750
      },
      {
        serviceId: 'S002',
        serviceName: 'Handling Completo',
        providerId: '3',
        providerName: 'Servicios Aeroportuarios VE',
        quantity: 1,
        unitPrice: 320,
        total: 320
      },
      {
        serviceId: 'S003',
        serviceName: 'Catering Ejecutivo',
        providerId: '3',
        providerName: 'Servicios Aeroportuarios VE',
        quantity: 6,
        unitPrice: 33.33,
        total: 200
      }
    ],
    total: 2270,
    currency: 'USD',
    createdAt: new Date('2025-02-10')
  },
  {
    id: 'Q002',
    clientId: '2',
    clientName: 'Juan Perez',
    status: 'approved',
    flight: {
      origin: 'SVMC (Maracaibo)',
      destination: 'SVMI (Caracas)',
      date: '2025-02-20',
      aircraft: 'King Air 350',
      passengers: 8
    },
    services: [
      {
        serviceId: 'S001',
        serviceName: 'Combustible Jet A1',
        providerId: '3',
        providerName: 'Servicios Aeroportuarios VE',
        quantity: 600,
        unitPrice: 3.5,
        total: 2100
      },
      {
        serviceId: 'S004',
        serviceName: 'Hangaraje 24h',
        providerId: '3',
        providerName: 'Servicios Aeroportuarios VE',
        quantity: 1,
        unitPrice: 450,
        total: 450
      },
      {
        serviceId: 'S005',
        serviceName: 'Limpieza Interior',
        providerId: '3',
        providerName: 'Servicios Aeroportuarios VE',
        quantity: 1,
        unitPrice: 180,
        total: 180
      }
    ],
    total: 2730,
    currency: 'USD',
    createdAt: new Date('2025-02-08'),
    approvedAt: new Date('2025-02-09'),
    approvedBy: '1'
  },
  {
    id: 'Q003',
    clientId: '2',
    clientName: 'Juan Perez',
    status: 'completed',
    flight: {
      origin: 'SVMI (Caracas)',
      destination: 'SVVA (Valencia)',
      date: '2025-01-25',
      aircraft: 'Citation CJ3',
      passengers: 5
    },
    services: [
      {
        serviceId: 'S001',
        serviceName: 'Combustible Jet A1',
        providerId: '3',
        providerName: 'Servicios Aeroportuarios VE',
        quantity: 400,
        unitPrice: 3.5,
        total: 1400
      },
      {
        serviceId: 'S002',
        serviceName: 'Handling Completo',
        providerId: '3',
        providerName: 'Servicios Aeroportuarios VE',
        quantity: 1,
        unitPrice: 280,
        total: 280
      },
      {
        serviceId: 'S003',
        serviceName: 'Catering Ejecutivo',
        providerId: '3',
        providerName: 'Servicios Aeroportuarios VE',
        quantity: 5,
        unitPrice: 40,
        total: 200
      }
    ],
    total: 1880,
    currency: 'USD',
    createdAt: new Date('2025-01-20'),
    approvedAt: new Date('2025-01-21'),
    approvedBy: '1'
  }
];

export const MOCK_SERVICES: Service[] = [
  {
    id: 'S001',
    providerId: '3',
    providerName: 'Servicios Aeroportuarios VE',
    category: 'Combustible',
    name: 'Combustible Jet A1',
    description: 'Suministro de combustible Jet A1 para aeronaves',
    basePrice: 3.5,
    unit: 'galon',
    currency: 'USD',
    available: true,
    airports: ['SVMI', 'SVMC', 'SVVA', 'SVBS']
  },
  {
    id: 'S002',
    providerId: '3',
    providerName: 'Servicios Aeroportuarios VE',
    category: 'Handling',
    name: 'Handling Completo',
    description: 'Asistencia completa en tierra',
    basePrice: 300,
    unit: 'servicio',
    currency: 'USD',
    available: true,
    airports: ['SVMI', 'SVMC', 'SVVA']
  },
  {
    id: 'S003',
    providerId: '3',
    providerName: 'Servicios Aeroportuarios VE',
    category: 'Catering',
    name: 'Catering Ejecutivo',
    description: 'Servicio de alimentos y bebidas premium',
    basePrice: 35,
    unit: 'pax',
    currency: 'USD',
    available: true,
    airports: ['SVMI', 'SVMC', 'SVVA', 'SVBS']
  },
  {
    id: 'S004',
    providerId: '3',
    providerName: 'Servicios Aeroportuarios VE',
    category: 'Estacionamiento',
    name: 'Hangaraje 24h',
    description: 'Estacionamiento cubierto en hangar',
    basePrice: 450,
    unit: 'dia',
    currency: 'USD',
    available: true,
    airports: ['SVMI', 'SVMC']
  },
  {
    id: 'S005',
    providerId: '3',
    providerName: 'Servicios Aeroportuarios VE',
    category: 'Limpieza',
    name: 'Limpieza Interior',
    description: 'Limpieza profunda del interior de aeronave',
    basePrice: 180,
    unit: 'servicio',
    currency: 'USD',
    available: true,
    airports: ['SVMI', 'SVMC', 'SVVA']
  },
  {
    id: 'S006',
    providerId: '3',
    providerName: 'Servicios Aeroportuarios VE',
    category: 'Pasajeros',
    name: 'Sala VIP',
    description: 'Acceso a sala VIP para pasajeros',
    basePrice: 45,
    unit: 'pax',
    currency: 'USD',
    available: true,
    airports: ['SVMI', 'SVMC', 'SVVA', 'SVBS']
  }
];

export const MOCK_PROVIDER_BALANCE: ProviderBalance = {
  providerId: '3',
  providerName: 'Servicios Aeroportuarios VE',
  totalEarned: 6880,
  platformCommission: 688,
  totalPayments: 1139,
  pendingBalance: 5053,
  paymentMethod: {
    type: 'bank_transfer',
    bank: 'Banco de Venezuela',
    accountNumber: '0102-1234-56-7890123456'
  }
};

export const MOCK_PROVIDERS: Provider[] = [
  {
    id: '3',
    name: 'Maria Garcia',
    company: 'Servicios Aeroportuarios VE',
    email: 'proveedor@demo.com',
    phone: '+58 412-1234567',
    status: 'active',
    registeredAt: new Date('2024-06-15'),
    servicesCount: 6,
    totalEarned: 6880,
    pendingBalance: 5053,
    rif: 'J-12345678-9',
    address: 'Aeropuerto Internacional Simon Bolivar, Maiquetia',
    contactPerson: 'Maria Garcia'
  },
  {
    id: '4',
    name: 'Carlos Rodriguez',
    company: 'AeroFuel Venezuela',
    email: 'carlos@aerofuel.ve',
    phone: '+58 414-9876543',
    status: 'active',
    registeredAt: new Date('2024-08-20'),
    servicesCount: 2,
    totalEarned: 12500,
    pendingBalance: 2300,
    rif: 'J-98765432-1',
    address: 'Aeropuerto La Chinita, Maracaibo',
    contactPerson: 'Carlos Rodriguez'
  },
  {
    id: '5',
    name: 'Ana Martinez',
    company: 'VIP Catering Services',
    email: 'ana@vipcatering.ve',
    phone: '+58 424-5555555',
    status: 'pending',
    registeredAt: new Date('2025-01-10'),
    servicesCount: 3,
    totalEarned: 0,
    pendingBalance: 0,
    rif: 'J-45678901-2',
    address: 'Valencia, Estado Carabobo',
    contactPerson: 'Ana Martinez'
  }
];

export const MOCK_CLIENTS: Client[] = [
  {
    id: '2',
    name: 'Juan Perez',
    email: 'cliente@demo.com',
    company: 'Aviacion Ejecutiva CA',
    phone: '+58 412-7777777',
    type: 'registered',
    status: 'active',
    registeredAt: new Date('2024-09-01'),
    totalQuotes: 3,
    totalSpent: 4610,
    lastQuoteDate: new Date('2025-02-10'),
    rif: 'J-11223344-5',
    address: 'Caracas, Venezuela'
  },
  {
    id: '6',
    name: 'Pedro Gonzalez',
    email: 'pedro@skyvenezuela.com',
    company: 'Sky Venezuela',
    phone: '+58 414-8888888',
    type: 'registered',
    status: 'active',
    registeredAt: new Date('2024-11-15'),
    totalQuotes: 5,
    totalSpent: 8900,
    lastQuoteDate: new Date('2025-02-05'),
    rif: 'J-55667788-9',
    address: 'Maracaibo, Venezuela'
  },
  {
    id: '7',
    name: 'Luis Ramirez',
    email: 'luis.ramirez@gmail.com',
    company: 'Vuelo Privado',
    phone: '+58 424-9999999',
    type: 'guest',
    status: 'active',
    registeredAt: new Date('2025-01-20'),
    totalQuotes: 1,
    totalSpent: 0,
    lastQuoteDate: new Date('2025-01-20')
  },
  {
    id: '8',
    name: 'Sofia Torres',
    email: 'sofia@corporate.ve',
    company: 'Corporate Aviation',
    phone: '+58 412-1111111',
    type: 'registered',
    status: 'inactive',
    registeredAt: new Date('2024-05-10'),
    totalQuotes: 8,
    totalSpent: 15200,
    lastQuoteDate: new Date('2024-12-15'),
    rif: 'J-99887766-5',
    address: 'Valencia, Venezuela'
  }
];

export const MOCK_SETTLEMENTS: Settlement[] = [
  {
    id: 'LIQ001',
    providerId: '3',
    providerName: 'Servicios Aeroportuarios VE',
    amount: 6880,
    platformCommission: 688,
    netAmount: 6192,
    status: 'pending',
    requestedAt: new Date('2025-02-10'),
    paymentMethod: {
      type: 'bank_transfer',
      bank: 'Banco de Venezuela',
      accountNumber: '0102-1234-56-7890123456'
    },
    notes: 'Liquidacion mensual - Enero 2025'
  },
  {
    id: 'LIQ002',
    providerId: '4',
    providerName: 'AeroFuel Venezuela',
    amount: 5800,
    platformCommission: 580,
    netAmount: 5220,
    status: 'approved',
    requestedAt: new Date('2025-02-08'),
    approvedAt: new Date('2025-02-09'),
    approvedBy: '1',
    paymentMethod: {
      type: 'zelle',
      accountNumber: 'aerofuel@gmail.com'
    },
    notes: 'Aprobada - Pendiente de pago'
  },
  {
    id: 'LIQ003',
    providerId: '3',
    providerName: 'Servicios Aeroportuarios VE',
    amount: 4200,
    platformCommission: 420,
    netAmount: 3780,
    status: 'paid',
    requestedAt: new Date('2025-01-15'),
    approvedAt: new Date('2025-01-16'),
    paidAt: new Date('2025-01-18'),
    approvedBy: '1',
    paymentMethod: {
      type: 'bank_transfer',
      bank: 'Banco de Venezuela',
      accountNumber: '0102-1234-56-7890123456',
      reference: 'REF-20250118-001'
    },
    notes: 'Pagada exitosamente'
  }
];

export const VENEZUELAN_AIRPORTS = [
  { code: 'SVMI', name: 'Caracas - Simon Bolivar', city: 'Caracas' },
  { code: 'SVMC', name: 'Maracaibo - La Chinita', city: 'Maracaibo' },
  { code: 'SVVA', name: 'Valencia - Arturo Michelena', city: 'Valencia' },
  { code: 'SVBS', name: 'Barcelona - Jose Antonio Anzoategui', city: 'Barcelona' },
  { code: 'SVBM', name: 'Barquisimeto - Jacinto Lara', city: 'Barquisimeto' },
  { code: 'SVMG', name: 'Margarita - Del Caribe', city: 'Porlamar' },
  { code: 'SVCB', name: 'Ciudad Bolivar - Tomas de Heres', city: 'Ciudad Bolivar' },
  { code: 'SVMT', name: 'Maturin - Jose Tadeo Monagas', city: 'Maturin' },
  { code: 'SVSR', name: 'San Antonio del Tachira', city: 'San Antonio' },
  { code: 'SVPA', name: 'Paraguana - Josefa Camejo', city: 'Punto Fijo' }
];

export const AIRCRAFT_TYPES = [
  { name: 'Citation CJ3', passengers: 7, category: 'Light Jet', fuelCapacity: 500 },
  { name: 'Citation CJ4', passengers: 8, category: 'Light Jet', fuelCapacity: 550 },
  { name: 'King Air 350', passengers: 9, category: 'Turboprop', fuelCapacity: 600 },
  { name: 'Beechcraft Baron', passengers: 6, category: 'Piston', fuelCapacity: 300 },
  { name: 'Cessna Citation X', passengers: 10, category: 'Midsize Jet', fuelCapacity: 800 },
  { name: 'Gulfstream G150', passengers: 8, category: 'Midsize Jet', fuelCapacity: 900 },
  { name: 'Hawker 800XP', passengers: 8, category: 'Midsize Jet', fuelCapacity: 750 },
  { name: 'Learjet 45', passengers: 8, category: 'Light Jet', fuelCapacity: 600 },
  { name: 'Pilatus PC-12', passengers: 9, category: 'Turboprop', fuelCapacity: 400 },
  { name: 'Cessna Caravan', passengers: 12, category: 'Turboprop', fuelCapacity: 350 }
];

export function getFinancialSummary() {
  const totalRevenue = MOCK_QUOTES
    .filter(q => q.status === 'approved' || q.status === 'completed')
    .reduce((sum, q) => sum + q.total, 0);

  const platformCommissions = totalRevenue * 0.10;

  const pendingPayments = MOCK_PROVIDER_BALANCE.pendingBalance;

  const totalQuotes = MOCK_QUOTES.length;

  return {
    totalRevenue,
    platformCommissions,
    pendingPayments,
    totalQuotes
  };
}

export function calculateQuote(
  origin: string,
  destination: string,
  aircraft: string,
  passengers: number,
  selectedServices: string[]
): { services: QuoteService[], total: number } {
  const services: QuoteService[] = [];

  selectedServices.forEach(serviceId => {
    const service = MOCK_SERVICES.find(s => s.id === serviceId);
    if (service) {
      let quantity = 1;
      let unitPrice = service.basePrice;

      if (service.category === 'Combustible') {
        const aircraftData = AIRCRAFT_TYPES.find(a => a.name === aircraft);
        quantity = aircraftData?.fuelCapacity || 500;
      } else if (service.unit === 'pax') {
        quantity = passengers;
      }

      const total = quantity * unitPrice;

      services.push({
        serviceId: service.id,
        serviceName: service.name,
        providerId: service.providerId,
        providerName: service.providerName,
        quantity,
        unitPrice,
        total
      });
    }
  });

  const total = services.reduce((sum, s) => sum + s.total, 0);

  return { services, total };
}
