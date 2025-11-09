# FlyVenezuela ✈️

Plataforma web completa para servicios aeroportuarios en Venezuela. Landing page bilingüe (Español/Inglés) con sistema de autenticación y panel administrativo para gestión de cotizaciones de planes de vuelo.

## 🚀 Características

### Landing Page
- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **Multiidioma**: Soporte completo para Español e Inglés
- **Secciones Completas**:
  - Hero con llamados a la acción
  - Características destacadas
  - Servicios aeroportuarios
  - Formulario de contacto
  - Footer informativo

### Sistema de Autenticación
- Registro de usuarios (Clientes/Proveedores)
- Inicio de sesión
- Gestión de sesiones con localStorage
- Rutas protegidas

### Panel Administrativo
- **Dashboard Personalizado** según tipo de usuario:
  - Administrador: Vista completa del sistema
  - Cliente/Piloto: Gestión de cotizaciones
  - Proveedor: Panel de servicios
- **Estadísticas en Tiempo Real**
- **Gestión de Cotizaciones**
- **Formulario de Cotización de Vuelo** con:
  - Detalles de vuelo (origen, destino, fecha, hora)
  - Tipo de aeronave
  - Número de pasajeros
  - Servicios requeridos (combustible, handling, catering, etc.)

## 🛠️ Tecnologías

- **Framework**: Next.js 14 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Internacionalización**: next-intl
- **Iconos**: Lucide React
- **Validación**: React Hook Form + Zod
- **Autenticación**: JWT (mock - listo para integración con backend real)

## 📁 Estructura del Proyecto

```
flyvenezuela/
├── src/
│   ├── app/
│   │   ├── [locale]/              # Rutas internacionalizadas
│   │   │   ├── auth/              # Páginas de autenticación
│   │   │   │   ├── login/         # Inicio de sesión
│   │   │   │   └── register/      # Registro
│   │   │   ├── dashboard/         # Panel administrativo
│   │   │   │   ├── quote/         # Nueva cotización
│   │   │   │   └── page.tsx       # Dashboard principal
│   │   │   ├── page.tsx           # Landing page
│   │   │   └── layout.tsx         # Layout con i18n
│   │   ├── globals.css            # Estilos globales
│   │   └── layout.tsx             # Root layout
│   ├── components/
│   │   ├── sections/              # Secciones del landing
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── CTA.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/                    # Componentes reutilizables
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Card.tsx
│   │       └── Container.tsx
│   ├── lib/
│   │   ├── auth.ts                # Lógica de autenticación
│   │   └── utils.ts               # Utilidades
│   ├── types/
│   │   └── index.ts               # Tipos TypeScript
│   ├── middleware.ts              # Middleware de i18n
│   └── i18n.ts                    # Configuración de i18n
├── messages/
│   ├── es.json                    # Traducciones en español
│   └── en.json                    # Traducciones en inglés
├── public/
│   └── images/                    # Imágenes estáticas
└── package.json
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Instalación

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd flyvenezuela
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
El archivo `.env.local` ya está creado con valores por defecto. Para producción, cambiar:
```env
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

4. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

5. Abrir en el navegador:
```
http://localhost:3006
```

### Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linter
```

## 🌐 Rutas Principales

### Públicas
- `/` o `/es` - Landing page en español
- `/en` - Landing page en inglés
- `/[locale]/auth/login` - Inicio de sesión
- `/[locale]/auth/register` - Registro

### Privadas (requieren autenticación)
- `/[locale]/dashboard` - Panel principal
- `/[locale]/dashboard/quote` - Nueva cotización

## 👥 Tipos de Usuarios

### 1. Cliente/Piloto
- Solicitar cotizaciones de servicios aeroportuarios
- Ver historial de cotizaciones
- Gestionar perfil

### 2. Proveedor de Servicios
- Recibir solicitudes de cotización
- Responder con precios
- Gestionar servicios ofrecidos

### 3. Administrador
- Vista completa del sistema
- Gestión de usuarios
- Gestión de todas las cotizaciones
- Configuración del sistema

## 🎨 Características de Diseño

- **Paleta de Colores**: Azul profesional con acentos
- **Tipografía**: Sistema de fuentes optimizado
- **Animaciones**: Transiciones suaves y animaciones blob
- **Responsivo**: Mobile-first design
- **Accesibilidad**: Componentes accesibles

## 🔒 Seguridad

**Nota Importante**: Esta implementación utiliza `localStorage` para demostración. Para producción, se recomienda:

1. Implementar httpOnly cookies
2. Usar un backend real para autenticación
3. Implementar refresh tokens
4. Añadir rate limiting
5. Implementar CORS adecuado
6. Usar HTTPS

## 🗄️ Base de Datos

Actualmente, los datos se almacenan en memoria (mock). Para producción, integrar con:
- PostgreSQL
- MongoDB
- Supabase
- Firebase

## 📝 Próximos Pasos

1. **Backend Real**:
   - API REST o GraphQL
   - Base de datos persistente
   - Autenticación robusta

2. **Funcionalidades Adicionales**:
   - Sistema de notificaciones
   - Chat en tiempo real
   - Pagos integrados
   - Generación de PDFs
   - Mapa de aeropuertos

3. **Optimizaciones**:
   - Server-Side Rendering (SSR)
   - Static Generation
   - Optimización de imágenes
   - CDN para assets

4. **Testing**:
   - Unit tests con Jest
   - Integration tests
   - E2E tests con Playwright

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto es privado y confidencial.

## 👨‍💻 Autor

FlyVenezuela Development Team

---

**¿Necesitas ayuda?** Contacta a info@flyvenezuela.com
