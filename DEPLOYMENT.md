# Guía de Deployment - espirituviajero.net

## Configuración Inicial del Servidor

### 1. Configurar Secretos en GitHub

Ve a tu repositorio en GitHub: https://github.com/luepow/flyvenezuela

1. Click en **Settings** → **Secrets and variables** → **Actions**
2. Agrega los siguientes secretos:

- `SERVER_HOST`: `206.189.145.186`
- `SERVER_PASSWORD`: `67HXNrrDu6S6+ds`

### 2. Configuración en el Servidor (Primera vez)

Conéctate al servidor:
```bash
ssh root@206.189.145.186
```

#### Instalar dependencias necesarias (si no están instaladas)

```bash
# Actualizar sistema
apt update && apt upgrade -y

# Instalar Node.js (si no está instalado)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Instalar PM2 globalmente (si no está instalado)
npm install -g pm2

# Asegurar que nginx esté instalado
apt install -y nginx

# Instalar git (si no está instalado)
apt install -y git
```

#### Crear estructura de directorios

```bash
mkdir -p /var/www/next/espirituviajero
cd /var/www/next/espirituviajero
```

#### Configurar Nginx

```bash
# Copiar configuración de nginx
sudo nano /etc/nginx/sites-available/espirituviajero.net
```

Pega el contenido del archivo `nginx.conf` de este repositorio.

```bash
# Crear symlink
sudo ln -s /etc/nginx/sites-available/espirituviajero.net /etc/nginx/sites-enabled/

# Verificar configuración
sudo nginx -t

# Recargar nginx
sudo systemctl reload nginx
```

#### Configurar Variables de Entorno

```bash
cd /var/www/next/espirituviajero
nano .env.production
```

Agrega:
```env
JWT_SECRET=tu-secret-jwt-key-super-seguro-cambialo-en-produccion
NEXT_PUBLIC_APP_URL=https://espirituviajero.net
NODE_ENV=production
PORT=3006
```

### 3. Primer Deployment Manual (Opcional)

Si quieres hacer el primer deployment manual antes de activar auto-deploy:

```bash
cd /var/www/next/espirituviajero

# Clonar repositorio
git clone https://github.com/luepow/flyvenezuela.git .

# Instalar dependencias
npm ci

# Build
npm run build

# Iniciar con PM2
pm2 start ecosystem.config.js

# Guardar configuración de PM2
pm2 save

# Configurar PM2 para iniciarse al reiniciar el servidor
pm2 startup
```

### 4. Auto-Deploy con GitHub Actions

Una vez configurados los secretos en GitHub, cada push a la rama `main` ejecutará automáticamente:

1. Conexión al servidor vía SSH
2. Pull del código más reciente
3. Instalación de dependencias
4. Build de la aplicación Next.js
5. Restart de PM2

### 5. Configurar SSL con Let's Encrypt (Recomendado)

```bash
# Instalar certbot
apt install -y certbot python3-certbot-nginx

# Obtener certificado SSL
sudo certbot --nginx -d espirituviajero.net -d www.espirituviajero.net

# Certbot configurará automáticamente nginx para HTTPS
```

### 6. Verificar que todo funcione

```bash
# Ver status de PM2
pm2 status

# Ver logs en tiempo real
pm2 logs espirituviajero

# Ver status de nginx
sudo systemctl status nginx

# Verificar que el sitio esté respondiendo
curl http://localhost:3006
```

## Comandos Útiles

### En el servidor

```bash
# Ver logs de la aplicación
pm2 logs espirituviajero

# Reiniciar aplicación
pm2 restart espirituviajero

# Detener aplicación
pm2 stop espirituviajero

# Ver status
pm2 status

# Monitorear recursos
pm2 monit

# Recargar nginx después de cambios de configuración
sudo systemctl reload nginx

# Ver logs de nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Deployment Manual

Si necesitas hacer un deployment manual:

```bash
cd /var/www/next/espirituviajero
./deploy.sh
```

## Estructura en el Servidor

```
/var/www/next/espirituviajero/
├── .next/              # Build de Next.js
├── src/                # Código fuente
├── public/             # Archivos estáticos
├── node_modules/       # Dependencias
├── logs/               # Logs de PM2
│   ├── err.log
│   ├── out.log
│   └── combined.log
├── .env.production     # Variables de entorno
├── ecosystem.config.js # Configuración de PM2
└── deploy.sh          # Script de deployment
```

## Troubleshooting

### La aplicación no inicia

```bash
# Ver logs de PM2
pm2 logs espirituviajero --lines 100

# Verificar que el puerto 3006 esté libre
netstat -tulpn | grep 3006

# Reiniciar PM2
pm2 restart espirituviajero
```

### Nginx muestra 502 Bad Gateway

```bash
# Verificar que la aplicación esté corriendo
pm2 status

# Verificar que esté escuchando en el puerto correcto
curl http://localhost:3006

# Ver logs de nginx
sudo tail -f /var/log/nginx/error.log
```

### El auto-deploy falla

1. Verifica que los secretos en GitHub estén correctamente configurados
2. Revisa los logs del workflow en GitHub Actions
3. Verifica la conexión SSH manualmente
4. Asegúrate de que git esté configurado en el servidor

## Actualizaciones

Para actualizar la aplicación, simplemente haz push a la rama `main`:

```bash
git add .
git commit -m "Update: descripción de los cambios"
git push origin main
```

El workflow de GitHub Actions se ejecutará automáticamente.

## Seguridad

- [ ] Cambiar la contraseña de root del servidor
- [ ] Configurar firewall (ufw)
- [ ] Habilitar SSL con Let's Encrypt
- [ ] Cambiar `JWT_SECRET` en `.env.production`
- [ ] Configurar actualizaciones automáticas de seguridad
- [ ] Considerar usar SSH keys en lugar de contraseña

## Monitoreo

Puedes configurar monitoreo adicional con:

- PM2 Plus (monitoreo avanzado de PM2)
- New Relic
- Datadog
- Uptime Robot (para verificar disponibilidad)

---

**URL del sitio:** http://espirituviajero.net (http) o https://espirituviajero.net (después de configurar SSL)

**Repositorio:** https://github.com/luepow/flyvenezuela
