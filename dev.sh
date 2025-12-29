#!/bin/bash

# Script para desarrollo local del nodo Resend

echo "🔨 Building n8n-nodes-resend..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📦 Para usar el nodo en n8n local:"
    echo ""
    echo "Opción 1 - npm link (primera vez):"
    echo "  npm link"
    echo "  cd ~/.n8n && npm link n8n-nodes-resend"
    echo ""
    echo "Opción 2 - Variable de entorno:"
    echo "  N8N_CUSTOM_EXTENSIONS=\"$(pwd)\" n8n start"
    echo ""
    echo "Luego reinicia n8n para ver los cambios"
else
    echo "❌ Build failed"
    exit 1
fi
