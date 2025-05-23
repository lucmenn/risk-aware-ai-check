
# Guia de Deployment - CyberRiskScore

Este guia abrange todas as opções de deployment para o CyberRiskScore, desde desenvolvimento até produção em diferentes plataformas.

## 🚀 Visão Geral

O CyberRiskScore é uma aplicação React/Vite que gera arquivos estáticos, tornando-a compatível com praticamente qualquer serviço de hosting web.

### Requisitos Mínimos
- Node.js 18+
- npm ou yarn
- Servidor web com suporte a SPA (Single Page Application)

## 🏗️ Build de Produção

### 1. Preparando o Build

```bash
# Instale dependências
npm install

# Execute o build de produção
npm run build

# Visualize o build localmente (opcional)
npm run preview
```

### 2. Estrutura do Build

Após o build, a pasta `dist/` conterá:

```
dist/
├── index.html          # Página principal
├── assets/
│   ├── index-[hash].js # JavaScript bundle
│   ├── index-[hash].css# CSS bundle
│   └── ...             # Outros assets
└── vite.svg           # Favicon e ícones
```

### 3. Configurações de Build

#### `vite.config.ts` Otimizado

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Otimizações para produção
    minify: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-accordion', '@radix-ui/react-card'],
        }
      }
    }
  },
  // Configuração base para subpaths (se necessário)
  base: './',
});
```

## 🌐 Plataformas de Deployment

### 1. Vercel (Recomendado)

#### Deploy Automático via GitHub

1. **Conecte o repositório**:
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Conecte seu repositório GitHub

2. **Configuração automática**:
   - Vercel detecta automaticamente React/Vite
   - Build e deploy são executados automaticamente

3. **Configuração personalizada** (`vercel.json`):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### Deploy Manual

```bash
# Instale Vercel CLI
npm i -g vercel

# Execute deploy
vercel

# Deploy de produção
vercel --prod
```

### 2. Netlify

#### Deploy via GitHub

1. **Conecte repositório** em [netlify.com](https://netlify.com)
2. **Configurações de build**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

#### Configuração (`netlify.toml`):

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

#### Deploy Manual

```bash
# Instale Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy de produção
netlify deploy --prod
```

### 3. GitHub Pages

#### Configuração do Workflow (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build
      run: npm run build

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

#### Configuração manual:

1. **Ative GitHub Pages** nas configurações do repositório
2. **Configure vite.config.ts**:

```typescript
export default defineConfig({
  // ... outras configurações
  base: '/nome-do-repositorio/',
});
```

### 4. Firebase Hosting

#### Setup

```bash
# Instale Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Inicialize projeto
firebase init hosting
```

#### Configuração (`firebase.json`):

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

#### Deploy

```bash
# Build e deploy
npm run build
firebase deploy
```

### 5. AWS S3 + CloudFront

#### Configuração do S3

```bash
# Upload dos arquivos
aws s3 sync dist/ s3://seu-bucket-name --delete

# Configurar website hosting
aws s3 website s3://seu-bucket-name \
  --index-document index.html \
  --error-document index.html
```

#### CloudFront Distribution

```json
{
  "Origins": [{
    "DomainName": "seu-bucket-name.s3.amazonaws.com",
    "Id": "S3-seu-bucket-name"
  }],
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-seu-bucket-name",
    "ViewerProtocolPolicy": "redirect-to-https"
  },
  "CustomErrorResponses": [{
    "ErrorCode": 404,
    "ResponseCode": 200,
    "ResponsePagePath": "/index.html"
  }]
}
```

### 6. Docker

#### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy build files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf

```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Handle client routing
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

#### Build e Run

```bash
# Build image
docker build -t cyberrisk-score .

# Run container
docker run -p 3000:80 cyberrisk-score
```

### 7. Railway

```bash
# Instale Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up
```

## 🔧 Configurações Avançadas

### Variáveis de Ambiente

#### `.env.production`

```env
VITE_APP_TITLE=CyberRiskScore
VITE_APP_VERSION=1.0.0
VITE_ANALYTICS_ID=your-analytics-id
```

#### Uso no código

```typescript
const config = {
  title: import.meta.env.VITE_APP_TITLE || 'CyberRiskScore',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
};
```

### Compressão e Otimização

#### Gzip/Brotli

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import { compression } from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    compression({ algorithm: 'gzip' }),
    compression({ algorithm: 'brotliCompress', ext: '.br' }),
  ],
});
```

### Headers de Segurança

#### Para Netlify (`_headers`):

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:
```

## 📊 Monitoramento

### Analytics

```typescript
// src/utils/analytics.ts
export const trackEvent = (eventName: string, properties?: object) => {
  if (import.meta.env.PROD && window.gtag) {
    window.gtag('event', eventName, properties);
  }
};

// Uso
trackEvent('assessment_completed', {
  score: riskProfile.overallScore,
  areas_count: riskProfile.areaScores.length
});
```

### Error Tracking

```typescript
// src/utils/errorTracking.ts
export const reportError = (error: Error, context?: string) => {
  if (import.meta.env.PROD) {
    // Sentry, LogRocket, etc.
    console.error(`[${context}]`, error);
  }
};
```

## 🚨 Troubleshooting

### Problemas Comuns

#### 1. 404 em rotas do React Router

**Solução**: Configure redirects/rewrites para SPAs:

```nginx
# nginx
try_files $uri $uri/ /index.html;
```

```apache
# Apache (.htaccess)
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

#### 2. Assets não carregam

**Solução**: Verifique o `base` no `vite.config.ts`:

```typescript
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/subpath/' : '/',
});
```

#### 3. Build muito grande

**Solução**: Implemente code splitting:

```typescript
// Lazy loading de componentes
const LazyComponent = lazy(() => import('./components/HeavyComponent'));
```

### Logs e Debug

```bash
# Build com logs detalhados
npm run build -- --debug

# Análise do bundle
npm run build -- --mode analyze
```

## ✅ Checklist de Deploy

- [ ] Build executa sem erros
- [ ] Todos os assets são carregados corretamente
- [ ] Rotas do React Router funcionam
- [ ] Aplicação funciona em diferentes navegadores
- [ ] Performance adequada (Lighthouse > 90)
- [ ] Headers de segurança configurados
- [ ] Analytics e error tracking funcionando
- [ ] Certificado SSL ativo
- [ ] DNS configurado corretamente

---

Com essas configurações, o CyberRiskScore estará pronto para produção em qualquer plataforma escolhida! 🚀
