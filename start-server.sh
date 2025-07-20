#!/bin/bash

echo "🚀 Starting SGX Stock Analyzer PWA..."
echo "📁 Current directory: $(pwd)"
echo "📋 Available files:"
ls -la *.html *.js *.css *.json

echo ""
echo "🌐 Starting web server..."
echo "💡 Access your PWA at: http://localhost:3000"
echo "🔄 Press Ctrl+C to stop the server"
echo ""

python3 -m http.server 3000