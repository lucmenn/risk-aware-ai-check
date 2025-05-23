
# Documentação Técnica - CyberRiskScore

## 🏛️ Arquitetura da Aplicação

### Visão Geral
O CyberRiskScore é uma Single Page Application (SPA) construída com React que utiliza uma arquitetura de componentes modulares e gerenciamento de estado local.

```
┌─────────────────────────────────────────┐
│                Frontend                 │
├─────────────────────────────────────────┤
│  React Components (UI Layer)           │
│  ├── Pages (Index.tsx)                 │
│  ├── Components (Assessment, Score)    │
│  └── UI Components (shadcn/ui)         │
├─────────────────────────────────────────┤
│  Business Logic Layer                  │
│  ├── Risk Analysis Engine              │
│  ├── Scoring Algorithm                 │
│  └── Recommendation System             │
├─────────────────────────────────────────┤
│  Styling & Theme                       │
│  ├── Tailwind CSS                      │
│  ├── Custom Color Palette              │
│  └── Responsive Design                 │
└─────────────────────────────────────────┘
```

## 📁 Estrutura Detalhada de Componentes

### Componentes Principais

#### `Index.tsx` - Página Principal
- **Responsabilidade**: Gerencia o estado global da aplicação e navegação
- **Estados**:
  - `assessmentStarted`: Controla se a avaliação foi iniciada
  - `riskProfile`: Armazena o resultado da avaliação
- **Fluxo**:
  1. Tela inicial com call-to-action
  2. Componente de avaliação
  3. Resultados com score e recomendações

#### `RiskAssessment.tsx` - Questionário Interativo
- **Responsabilidade**: Conduz o usuário através das perguntas de avaliação
- **Estados**:
  - `currentAreaIndex`: Área atual (senhas, dispositivos, privacidade)
  - `currentQuestionIndex`: Pergunta atual dentro da área
  - `userAnswers`: Array com todas as respostas do usuário
- **Funcionalidades**:
  - Navegação entre perguntas (anterior/próxima)
  - Barra de progresso dinâmica
  - Validação de respostas obrigatórias

#### `RiskScore.tsx` - Visualização do Score
- **Responsabilidade**: Exibe o score de risco e breakdown por área
- **Características**:
  - Score circular com cores dinâmicas
  - Breakdown por áreas de risco
  - Indicadores visuais de nível (baixo/médio/alto)

#### `RecommendationCard.tsx` - Cards de Recomendação
- **Responsabilidade**: Exibe recomendações individuais com ações
- **Propriedades**:
  - Prioridade (alta/média/baixa) com cores correspondentes
  - Lista de ações práticas
  - Ícones contextuais

## 🧮 Engine de Análise de Risco

### Estrutura de Dados

```typescript
interface Question {
  id: string;
  text: string;
  options: {
    value: string;
    text: string;
    riskScore: number; // 0-10
  }[];
}

interface RiskArea {
  id: string;
  name: string;
  description: string;
  icon: string;
  questions: Question[];
}
```

### Algoritmo de Scoring

1. **Coleta de Respostas**: Cada resposta tem um `riskScore` de 0-10
2. **Cálculo por Área**: 
   ```typescript
   areaScore = (totalActualScore / totalPossibleScore) * 100
   ```
3. **Score Geral**: Média ponderada das áreas
4. **Classificação**:
   - 0-30: Baixo Risco (Verde)
   - 31-70: Médio Risco (Amarelo)
   - 71-100: Alto Risco (Vermelho)

### Sistema de Recomendações

```typescript
interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionSteps: string[];
}
```

**Lógica de Geração**:
- Baseada no `riskScore` de respostas específicas
- Prioridade determinada pelo nível de risco
- Ações específicas por área de vulnerabilidade

## 🎨 Sistema de Design

### Paleta de Cores

```css
:root {
  /* Cores Principais */
  --cyber-blue: #183B56;
  --cyber-cyan: #0DE1EC;
  --cyber-navy: #0F2942;
  
  /* Cores de Risco */
  --cyber-risk-low: #14B8A6;    /* Verde */
  --cyber-risk-medium: #F59E0B; /* Amarelo */
  --cyber-risk-high: #EF4444;   /* Vermelho */
}
```

### Componentes de UI

- **shadcn/ui**: Biblioteca de componentes base
- **Tailwind CSS**: Framework de utility classes
- **Lucide React**: Ícones SVG otimizados
- **Design Responsivo**: Mobile-first approach

## 🔄 Fluxo de Dados

### Estado da Aplicação

```typescript
// Estado Principal (Index.tsx)
const [assessmentStarted, setAssessmentStarted] = useState(false);
const [riskProfile, setRiskProfile] = useState<RiskProfile | null>(null);

// Estado do Assessment (RiskAssessment.tsx)
const [currentAreaIndex, setCurrentAreaIndex] = useState(0);
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
```

### Fluxo de Execução

1. **Inicialização**: Usuário acessa página inicial
2. **Início da Avaliação**: `setAssessmentStarted(true)`
3. **Coleta de Respostas**: Navegação sequencial pelas perguntas
4. **Processamento**: `calculateRiskScore(userAnswers)`
5. **Exibição de Resultados**: `setRiskProfile(result)`

## 🔧 Hooks e Utilitários

### Hooks Customizados Potenciais

```typescript
// Hook para persistência local
const useLocalStorage = (key: string, initialValue: any) => {
  // Implementação para salvar progresso
};

// Hook para analytics
const useAnalytics = () => {
  // Tracking de eventos de usuário
};
```

### Utilitários

- `riskAnalysis.ts`: Lógica central de cálculo de risco
- Funções puras para cálculos matemáticos
- Validadores de entrada
- Formatadores de dados

## 🚀 Performance e Otimizações

### Estratégias Implementadas

1. **Lazy Loading**: Componentes carregados sob demanda
2. **Memoização**: React.memo para componentes pesados
3. **Tree Shaking**: Importação seletiva de ícones
4. **Bundle Splitting**: Chunks otimizados pelo Vite

### Métricas Alvo

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: < 500KB gzipped

## 🧪 Estratégia de Testes

### Testes Unitários
```typescript
// Exemplo de teste para calculadora de risco
describe('calculateRiskScore', () => {
  it('should calculate correct overall score', () => {
    const answers = [/* mock answers */];
    const result = calculateRiskScore(answers);
    expect(result.overallScore).toBe(expectedScore);
  });
});
```

### Testes de Componente
- Renderização correta
- Interações do usuário
- Estados intermediários
- Navegação entre telas

### Testes E2E
- Fluxo completo de avaliação
- Cálculo correto de scores
- Geração de recomendações
- Responsividade mobile

## 🔐 Considerações de Segurança

### Dados do Usuário
- **Não Persistência**: Dados mantidos apenas em memória
- **Processamento Local**: Cálculos executados no cliente
- **Sem Cookies**: Não utiliza cookies de tracking

### Validação
- Sanitização de inputs
- Validação de tipos TypeScript
- Proteção contra XSS

## 📈 Monitoramento e Analytics

### Métricas Importantes
- Taxa de completude de avaliações
- Tempo médio de conclusão
- Distribuição de scores
- Recomendações mais comuns

### Ferramentas Sugeridas
- Google Analytics 4
- Hotjar (heatmaps)
- Sentry (error tracking)
- Web Vitals monitoring
