
# Screenshots - CyberRiskScore

Esta pasta contém screenshots e assets visuais para documentação do projeto.

## 📸 Screenshots Necessários

Para completar a documentação, os seguintes screenshots devem ser adicionados:

### 1. Tela Inicial
- **Arquivo**: `homepage.png`
- **Descrição**: Landing page com call-to-action para iniciar avaliação
- **Resolução**: 1920x1080 (desktop) e 390x844 (mobile)

### 2. Questionário em Andamento
- **Arquivo**: `assessment-in-progress.png`
- **Descrição**: Tela do questionário mostrando uma pergunta e opções
- **Elementos**: Barra de progresso, navegação, área atual

### 3. Dashboard de Resultados
- **Arquivo**: `dashboard.png`
- **Descrição**: Tela principal de resultados com score e recomendações
- **Elementos**: Score circular, breakdown por área, cards de recomendação

### 4. Score Detalhado
- **Arquivo**: `risk-score-detail.png`
- **Descrição**: Componente de score com detalhamento por área
- **Elementos**: Score circular, barras de progresso por área

### 5. Recomendações
- **Arquivo**: `recommendations.png`
- **Descrição**: Lista de recomendações organizadas por prioridade
- **Elementos**: Cards com badges de prioridade, ações práticas

### 6. Versão Mobile
- **Arquivo**: `mobile-view.png`
- **Descrição**: Composição mostrando responsividade
- **Elementos**: Múltiplas telas em dispositivos móveis

## 🎨 Diretrizes de Screenshot

### Configurações de Captura
- **Browser**: Chrome ou Firefox (mais recente)
- **Viewport**: 1920x1080 para desktop, 390x844 para mobile
- **Zoom**: 100%
- **Theme**: Tema padrão (dark)

### Dados para Screenshots
Use estes dados fictícios para screenshots consistentes:

#### Exemplo de Score Alto (para demonstração)
```typescript
const sampleHighRiskProfile = {
  overallScore: 78,
  areaScores: [
    { areaId: 'passwords', name: 'Senhas & Autenticação', score: 85 },
    { areaId: 'devices', name: 'Segurança de Dispositivos', score: 70 },
    { areaId: 'privacy', name: 'Privacidade Online', score: 79 }
  ],
  recommendations: [/* array de recomendações */]
};
```

#### Exemplo de Score Baixo (ideal)
```typescript
const sampleLowRiskProfile = {
  overallScore: 15,
  areaScores: [
    { areaId: 'passwords', name: 'Senhas & Autenticação', score: 10 },
    { areaId: 'devices', name: 'Segurança de Dispositivos', score: 20 },
    { areaId: 'privacy', name: 'Privacidade Online', score: 15 }
  ],
  recommendations: []
};
```

### Elementos para Destacar
- Paleta de cores cyber (azuis e ciano)
- Indicadores visuais de risco (cores semafóricas)
- Interface limpa e moderna
- Responsividade em diferentes tamanhos

## 🔧 Ferramentas Recomendadas

### Captura
- **macOS**: Cmd + Shift + 4
- **Windows**: Windows + Shift + S
- **Linux**: Flameshot, GNOME Screenshot
- **Browser**: DevTools device simulation

### Edição
- **Básica**: Preview (macOS), Paint (Windows)
- **Avançada**: Figma, Photoshop, GIMP
- **Composições**: Figma, Sketch

### Otimização
- **TinyPNG**: Compressão sem perda
- **ImageOptim**: Otimização automática
- **WebP**: Formato otimizado para web

## 📱 Capturas Mobile

Para screenshots mobile consistentes:

1. **Abra DevTools** (F12)
2. **Ative device mode** (Ctrl/Cmd + Shift + M)
3. **Selecione dispositivo**: iPhone 12 Pro (390x844)
4. **Capture a tela** com proporção correta

### Dispositivos de Referência
- iPhone 12 Pro: 390x844
- iPhone SE: 375x667
- Galaxy S21: 360x800
- iPad: 768x1024

## 🎯 Screenshots Específicos por Componente

### RiskScore Component
- Score baixo (verde): 15-20%
- Score médio (amarelo): 50-60%  
- Score alto (vermelho): 75-85%

### RecommendationCard Component
- Prioridade alta (vermelho)
- Prioridade média (amarelo)
- Prioridade baixa (verde)

### RiskAssessment Component
- Primeira pergunta de senhas
- Pergunta de dispositivos
- Última pergunta com progresso 100%

## 📝 Metadados para Screenshots

Cada screenshot deve incluir:

```yaml
# Exemplo: homepage.png
filename: homepage.png
description: "Página inicial do CyberRiskScore com call-to-action"
date: "2024-01-XX"
resolution: "1920x1080"
device: "Desktop"
browser: "Chrome 120"
component: "Index.tsx"
state: "Initial load"
```

## 🚀 Automatização

Para futuras atualizações, considere ferramentas de screenshot automatizadas:

### Playwright
```typescript
import { test } from '@playwright/test';

test('screenshot homepage', async ({ page }) => {
  await page.goto('/');
  await page.screenshot({ 
    path: 'docs/screenshots/homepage.png',
    fullPage: true 
  });
});
```

### Puppeteer
```typescript
const puppeteer = require('puppeteer');

const takeScreenshot = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:8080');
  await page.screenshot({ path: 'homepage.png' });
  await browser.close();
};
```

---

**Nota**: Screenshots atuais devem ser capturados manualmente e adicionados a esta pasta para completar a documentação visual do projeto.
