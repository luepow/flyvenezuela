# Generador Automático de Manual de Usuario

## Descripción

Este script genera automáticamente un manual de usuario completo en formato Word (.docx) para el sistema FlyVenezuela. El proceso incluye:

- Navegación automatizada por todas las rutas del sistema
- Captura de screenshots de página completa
- Autenticación automática para rutas protegidas
- Generación de documento Word profesional con formato estructurado

## Requisitos

- Node.js instalado
- Aplicación Next.js corriendo en `http://localhost:3006`
- Dependencias instaladas:
  - `puppeteer` - Para navegación y captura de screenshots
  - `docx` - Para generación del documento Word

## Instalación

Las dependencias ya están instaladas. Si necesitas reinstalarlas:

```bash
npm install puppeteer docx
```

## Uso

### 1. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Asegúrate de que la aplicación esté corriendo en `http://localhost:3006`

### 2. Ejecutar el generador

En otra terminal:

```bash
node generate-manual.js
```

### 3. Resultado

El script generará:
- `Manual_Usuario_Sistema.docx` - Documento Word completo con el manual

## Contenido del Manual

El manual generado incluye:

### 📄 Portada
- Título del manual
- Nombre del sistema
- Versión
- Fecha de generación

### 📋 Índice de Contenidos
- Lista completa de todas las secciones

### 📸 Secciones Documentadas

1. **Página Principal**
   - Hero, Features, Services, Quote Form, Contact

2. **Inicio de Sesión**
   - Formulario de login y acceso rápido

3. **Registro de Usuarios**
   - Formulario de registro

4. **Cotización Pública**
   - Formulario de cotización sin autenticación

5. **Dashboard - Administrador**
   - Panel completo de administración

6. **Dashboard - Cliente**
   - Gestión de vuelos y cotizaciones

7. **Dashboard - Proveedor**
   - Gestión de servicios

8. **Nueva Cotización (Dashboard)**
   - Formulario de cotización autenticado

### Para cada sección incluye:
- ✅ Título y descripción
- ✅ Información de autenticación (si aplica)
- ✅ Secciones principales
- ✅ Screenshot de página completa
- ✅ Pasos detallados de uso

## Credenciales de Prueba

El script usa automáticamente estas credenciales:

### 👨‍💼 Administrador
- Email: `admin@flyvenezuela.com`
- Contraseña: `admin123`

### ✈️ Cliente
- Email: `cliente@demo.com`
- Contraseña: `cliente123`

### 🏢 Proveedor
- Email: `proveedor@demo.com`
- Contraseña: `proveedor123`

## Configuración

Puedes modificar el archivo `generate-manual.js` para:

- Agregar o quitar rutas
- Cambiar descripciones
- Modificar pasos de uso
- Ajustar formato del documento
- Cambiar dimensiones de screenshots

### Ejemplo: Agregar una nueva ruta

```javascript
{
  path: '/nueva-ruta',
  title: 'Nueva Funcionalidad',
  description: 'Descripción de la nueva funcionalidad',
  requiresAuth: false,
  sections: [
    'Sección 1',
    'Sección 2'
  ]
}
```

## Proceso de Generación

1. **Inicialización**
   - Crea directorio temporal para screenshots
   - Inicia navegador Puppeteer en modo headless

2. **Captura de Screenshots**
   - Navega a cada ruta definida
   - Realiza login automático si es necesario
   - Hace scroll completo de la página
   - Captura screenshot de página completa
   - Limpia sesión después de rutas autenticadas

3. **Generación del Documento**
   - Crea portada profesional
   - Genera índice de contenidos
   - Agrega secciones con screenshots
   - Incluye pasos detallados de uso
   - Formatea con estilos consistentes

4. **Limpieza**
   - Elimina screenshots temporales
   - Cierra navegador
   - Reporta éxito

## Salida Esperada

```
🚀 Iniciando generación de manual de usuario...

🌐 Iniciando navegador...
✓ Navegador iniciado

📸 Capturando screenshots...
[1/8] Página Principal
  ✓ Screenshot guardado
[2/8] Inicio de Sesión
  ✓ Screenshot guardado
...

📄 Generando documento Word...
✓ Documento Word generado

🧹 Limpiando archivos temporales...
✓ Archivos temporales eliminados

✅ ¡Manual generado exitosamente!
📄 Archivo: Manual_Usuario_Sistema.docx
```

## Solución de Problemas

### El servidor no está corriendo
```
Error: net::ERR_CONNECTION_REFUSED
```
**Solución:** Ejecuta `npm run dev` antes de generar el manual

### Error de permisos
```
Error: EACCES: permission denied
```
**Solución:** Verifica permisos de escritura en el directorio

### Screenshots vacíos
```
Warning: Screenshot appears empty
```
**Solución:** Aumenta los tiempos de espera (`wait()`) en el script

### Error de memoria
```
Error: Out of memory
```
**Solución:** Reduce el tamaño de las imágenes o procesa en lotes más pequeños

## Personalización del Documento

### Cambiar tamaño de imágenes

En el script, modifica:
```javascript
new ImageRun({
  data: imageBuffer,
  transformation: {
    width: 600,  // Ajustar ancho
    height: 400  // Ajustar alto
  }
})
```

### Cambiar viewport

```javascript
await page.setViewport({
  width: 1920,  // Ajustar ancho
  height: 1080  // Ajustar alto
});
```

## Mantenimiento

Actualiza el manual cuando:
- Se agreguen nuevas rutas o funcionalidades
- Cambien las interfaces de usuario
- Se modifiquen flujos de trabajo
- Se actualicen credenciales de demo

## Notas Importantes

- ⚠️ El servidor debe estar corriendo en `localhost:3006`
- ⚠️ Asegúrate de tener espacio suficiente en disco
- ⚠️ La generación toma aproximadamente 2-3 minutos
- ⚠️ No interrumpas el proceso mientras se ejecuta

## Licencia

Este script es parte del sistema FlyVenezuela y sigue la misma licencia del proyecto principal.

---

**Última actualización:** Noviembre 2025
**Versión del generador:** 1.0
