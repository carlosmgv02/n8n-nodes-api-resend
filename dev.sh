#!/bin/bash

# Local development script for Resend node

echo "🔨 Building n8n-nodes-api-resend..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📦 To use the node in local n8n:"
    echo ""
    echo "Option 1 - npm link (first time):"
    echo "  npm link"
    echo "  cd ~/.n8n && npm link n8n-nodes-api-resend"
    echo ""
    echo "Option 2 - Environment variable:"
    echo "  N8N_CUSTOM_EXTENSIONS=\"$(pwd)\" n8n start"
    echo ""
    echo "Then restart n8n to see changes"
else
    echo "❌ Build failed"
    exit 1
fi
