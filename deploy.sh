#!/bin/bash

# FlyVenezuela Deployment Script
# This script is executed on the server after git pull

echo "🚀 Starting deployment for espirituviajero.net..."

# Navigate to app directory
cd /var/www/next/espirituviajero || exit

# Create logs directory if it doesn't exist
mkdir -p logs

# Pull latest changes
echo "📥 Pulling latest changes from GitHub..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Build the application
echo "🔨 Building Next.js application..."
npm run build

# Restart PM2 process
echo "🔄 Restarting PM2 process..."
pm2 restart espirituviajero || pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

echo "✅ Deployment completed successfully!"
echo "📊 Application status:"
pm2 list | grep espirituviajero
