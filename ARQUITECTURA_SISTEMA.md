# Arquitectura del Sistema FlyVenezuela

## Visión General
Plataforma de marketplace de servicios aeroportuarios con gestión financiera integrada.

## Roles de Usuario

### 1. Administrador 👨‍💼
**Responsabilidades:**
- Ver todas las cotizaciones del sistema
- Aprobar/Rechazar cotizaciones
- Autorizar liquidaciones a proveedores
- Gestionar pagos
- Ver estadísticas financieras globales
- Administrar usuarios y proveedores
- Configurar comisiones y tarifas

**Dashboard incluye:**
- Resumen financiero (ingresos, pagos pendientes, comisiones)
- Lista de cotizaciones pendientes de aprobación
- Panel de liquidaciones
- Gestión de pagos a proveedores
- Estadísticas y reportes

### 2. Cliente (Piloto/Empresa) ✈️
**Responsabilidades:**
- Solicitar cotizaciones para vuelos
- Ver precios de todos los servicios disponibles
- Ver historial de cotizaciones
- Gestionar planes de vuelo
- Ver estados de aprobación

**Dashboard incluye:**
- Nueva cotización (formulario completo)
- Mis cotizaciones (estado: pendiente, aprobada, rechazada, completada)
- Detalle de precios por servicio y proveedor
- Historial de vuelos
- Documentos y facturas

### 3. Proveedor de Servicios 🏢
**Responsabilidades:**
- Publicar servicios disponibles (combustible, catering, handling, etc.)
- Establecer precios por servicio
- Ver cotizaciones que incluyen sus servicios
- Gestionar su balance de cuenta
- Ver pagos recibidos y pendientes
- Configurar método de pago
- Ver estadísticas de ventas

**Dashboard incluye:**
- Balance de cuenta
- Servicios activos y precios
- Cotizaciones aprobadas
- Pagos recibidos/pendientes
- Configuración de cuenta bancaria
- Estadísticas de ventas

## Flujo del Sistema

### Flujo de Cotización:
1. **Cliente** crea cotización seleccionando:
   - Aeropuerto origen/destino
   - Fecha de vuelo
   - Tipo de aeronave
   - Servicios requeridos (combustible, catering, handling, etc.)

2. **Sistema** calcula precios:
   - Por cada servicio, busca proveedores disponibles
   - Muestra precio de cada proveedor
   - Calcula total de la cotización

3. **Cliente** envía cotización

4. **Administrador** revisa y aprueba/rechaza

5. Si aprobada:
   - Cliente recibe confirmación
   - Proveedores reciben notificación
   - Se registra en balance de proveedores

### Flujo de Liquidación:
1. **Proveedor** ve cotizaciones aprobadas que incluyen sus servicios

2. **Sistema** calcula balance del proveedor:
   - Suma de servicios prestados aprobados
   - Menos comisión de plataforma
   - Menos pagos ya realizados

3. **Administrador** autoriza liquidación

4. **Sistema** procesa pago:
   - Registra transacción
   - Actualiza balance del proveedor
   - Genera comprobante

## Servicios Aeroportuarios

### Categorías de Servicios:
1. **Combustible** (Jet A1, AvGas)
2. **Handling** (Asistencia en tierra)
3. **Catering** (Alimentos y bebidas)
4. **Estacionamiento/Hangaraje**
5. **Limpieza de Aeronave**
6. **Servicios de Pasajeros** (VIP, inmigración)
7. **Servicios de Tripulación** (alojamiento, transporte)
8. **Mantenimiento** (preventivo, AOG)
9. **Permisos y Autorizaciones**
10. **Servicios de Emergencia** (24/7)

### Estructura de Servicio:
```typescript
interface Service {
  id: string;
  providerId: string;
  providerName: string;
  category: ServiceCategory;
  name: string;
  description: string;
  basePrice: number;
  unit: string; // 'galón', 'hora', 'servicio', 'pax'
  currency: 'USD' | 'BS';
  available: boolean;
  airports: string[]; // ICAO codes
}
```

### Estructura de Cotización:
```typescript
interface Quote {
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

interface QuoteService {
  serviceId: string;
  serviceName: string;
  providerId: string;
  providerName: string;
  quantity: number;
  unit Price: number;
  total: number;
}
```

### Estructura de Balance de Proveedor:
```typescript
interface ProviderBalance {
  providerId: string;
  providerName: string;
  totalEarned: number; // Total de servicios aprobados
  platformCommission: number; // Comisión de la plataforma (%)
  totalPayments: number; // Total pagado
  pendingBalance: number; // Por cobrar
  paymentMethod: {
    type: 'bank_transfer' | 'zelle' | 'crypto';
    accountNumber?: string;
    bank?: string;
    walletAddress?: string;
  };
}
```

## Próximos Pasos de Desarrollo

### Fase 1: Dashboards Básicos ✅
- [x] Sistema de autenticación con roles
- [ ] Dashboard Admin con resumen financiero
- [ ] Dashboard Cliente con cotizaciones
- [ ] Dashboard Proveedor con balance

### Fase 2: Sistema de Servicios
- [ ] CRUD de servicios para proveedores
- [ ] Catálogo de servicios por aeropuerto
- [ ] Sistema de precios dinámicos

### Fase 3: Sistema de Cotizaciones
- [ ] Formulario de cotización completo
- [ ] Cálculo automático de precios
- [ ] Sistema de aprobación
- [ ] Notificaciones

### Fase 4: Sistema Financiero
- [ ] Balance de proveedores
- [ ] Gestión de liquidaciones
- [ ] Procesamiento de pagos
- [ ] Reportes financieros
- [ ] Comisiones de plataforma

### Fase 5: Integraciones
- [ ] Pasarelas de pago (Stripe, PayPal)
- [ ] Sistema de notificaciones (email, SMS)
- [ ] Generación de facturas PDF
- [ ] API para integraciones externas

## Tecnologías
- **Frontend:** Next.js 15, React 18, TypeScript, Tailwind CSS
- **Estado:** React Context + localStorage (temporal)
- **Backend (futuro):** Node.js + Express / NestJS
- **Base de Datos (futuro):** PostgreSQL
- **Autenticación (futuro):** JWT + bcrypt
- **Pagos (futuro):** Stripe, PayPal
