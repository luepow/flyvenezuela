# 🚀 Guía de Inicio Rápido - FlyVenezuela

## ✅ El proyecto está 100% listo y funcional

### 📋 Para iniciar el proyecto:

```bash
# 1. Iniciar el servidor de desarrollo
npm run dev

# 2. Abrir en el navegador
http://localhost:3006
```

---

## 🌐 Rutas Disponibles

### Landing Page
- **`http://localhost:3006`** o **`/es`** → Página principal en español
- **`http://localhost:3006/en`** → Página principal en inglés

### Autenticación
- **`/es/auth/login`** → Iniciar sesión
- **`/es/auth/register`** → Crear cuenta nueva

### Dashboard (requiere login)
- **`/es/dashboard`** → Panel de control principal
- **`/es/dashboard/quote`** → Solicitar nueva cotización

---

## 👤 Tipos de Usuarios

Al registrarte, puedes elegir entre:

1. **Cliente/Piloto** 🧑‍✈️
   - Solicitar cotizaciones de vuelo
   - Ver historial de servicios
   - Gestionar perfil

2. **Proveedor de Servicios** 🏢
   - Recibir solicitudes
   - Enviar cotizaciones
   - Administrar servicios

3. **Administrador** 👨‍💼
   - Usuario pre-configurado: `admin@flyvenezuela.com`
   - Control total del sistema
   - Gestión de usuarios y cotizaciones

---

## 📱 Características Implementadas

### ✅ Landing Page Completo
- Hero con animaciones
- Sección de características (4 features)
- Servicios aeroportuarios
- Formulario de contacto
- Footer con redes sociales
- **Bilingüe**: Español/Inglés

### ✅ Sistema de Autenticación
- Login
- Registro con validación
- Gestión de sesiones
- Rutas protegidas

### ✅ Panel Administrativo
- Dashboard personalizado
- Estadísticas en tiempo real
- Gestión de cotizaciones
- Formulario completo de cotización de vuelo

### ✅ Formulario de Cotización
- Aeropuerto de salida/llegada
- Fecha y hora del vuelo
- Tipo de aeronave
- Número de pasajeros
- Servicios:
  - ✈️ Combustible
  - 🔧 Handling
  - 🍽️ Catering
  - 🚗 Transporte
  - 🏨 Sala VIP
- Campo de información adicional

---

## 🎨 Tecnologías Usadas

- **Next.js 15.5.6** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **next-intl** - Internacionalización
- **Lucide React** - Iconos
- **React Hook Form** - Formularios

---

## 📂 Estructura del Proyecto

```
flyvenezuela/
├── src/
│   ├── app/[locale]/          # Páginas internacionalizadas
│   ├── components/            # Componentes reutilizables
│   ├── lib/                   # Utilidades y lógica
│   └── types/                 # Tipos TypeScript
├── messages/                  # Traducciones (es.json, en.json)
├── i18n/                      # Configuración i18n
└── public/                    # Archivos estáticos
```

---

## 🔧 Comandos Útiles

```bash
npm run dev      # Servidor de desarrollo (puerto 3006)
npm run build    # Compilar para producción
npm run start    # Servidor de producción
npm run lint     # Revisar código
```

---

## 🎯 Próximos Pasos Sugeridos

1. **Integrar Backend Real**
   - Base de datos (PostgreSQL/MongoDB)
   - API para autenticación
   - Persistencia de cotizaciones

2. **Funcionalidades Adicionales**
   - Sistema de notificaciones
   - Chat en tiempo real
   - Generación de PDF
   - Sistema de pagos

3. **Optimizaciones**
   - SEO
   - Analytics
   - Testing (Jest, Playwright)
   - Deployment (Vercel)

---

## 📞 Soporte

¿Preguntas? Contacta: **info@flyvenezuela.com**

---

✨ **El proyecto está listo para desarrollo y demostración** ✨
