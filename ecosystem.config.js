module.exports = {
  apps: [
    {
      name: 'espirituviajero',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/next/espirituviajero',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3006,
      },
      error_file: '/var/www/next/espirituviajero/logs/err.log',
      out_file: '/var/www/next/espirituviajero/logs/out.log',
      log_file: '/var/www/next/espirituviajero/logs/combined.log',
      time: true,
      merge_logs: true,
    },
  ],
};
