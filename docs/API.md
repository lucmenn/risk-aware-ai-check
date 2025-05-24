
# API de Análise de Riscos - CyberRiskScore

Esta documentação detalha o sistema de análise de riscos utilizado pelo CyberRiskScore, incluindo estruturas de dados, algoritmos e métodos de cálculo.

## 📊 Estruturas de Dados

### Question
Define uma pergunta individual no questionário de avaliação.

```typescript
interface Question {
  id: string;              // Identificador único da pergunta
  text: string;            // Texto da pergunta exibida ao usuário
  options: {
    value: string;         // Valor interno da opção
    text: string;          // Texto exibido ao usuário
    riskScore: number;     // Score de risco (0-10)
  }[];
}
```

**Exemplo**:
```typescript
{
  id: 'pwd-1',
  text: 'Como você gerencia suas senhas?',
  options: [
    { 
      value: 'same-all', 
      text: 'Uso a mesma senha para tudo', 
      riskScore: 10 
    },
    { 
      value: 'pwd-manager', 
      text: 'Uso um gerenciador de senhas', 
      riskScore: 1 
    }
  ]
}
```

### RiskArea
Agrupa perguntas relacionadas por categoria de risco.

```typescript
interface RiskArea {
  id: string;              // Identificador da área
  name: string;            // Nome exibido da área
  description: string;     // Descrição da área
  icon: string;            // Nome do ícone (Lucide)
  questions: Question[];   // Array de perguntas da área
}
```

**Áreas Disponíveis**:
- `passwords`: Senhas & Autenticação
- `devices`: Segurança de Dispositivos
- `privacy`: Privacidade Online

### UserAnswer
Representa uma resposta fornecida pelo usuário.

```typescript
interface UserAnswer {
  questionId: string;      // ID da pergunta respondida
  answer: string;          // Valor da resposta selecionada
  riskScore: number;       // Score de risco da resposta
}
```

### RiskProfile
Resultado final da análise de riscos.

```typescript
interface RiskProfile {
  overallScore: number;    // Score geral (0-100)
  areaScores: {
    areaId: string;
    name: string;
    score: number;         // Score da área (0-100)
  }[];
  recommendations: Recommendation[];
}
```

### Recommendation
Recomendação de segurança personalizada.

```typescript
interface Recommendation {
  id: string;              // Identificador único
  title: string;           // Título da recomendação
  description: string;     // Descrição detalhada
  priority: 'high' | 'medium' | 'low';  // Nível de prioridade
  actionSteps: string[];   // Lista de ações práticas
}
```

## 🧮 Algoritmo de Cálculo

### Função Principal: `calculateRiskScore`

```typescript
const calculateRiskScore = (answers: UserAnswer[]): RiskProfile => {
  // Implementação detalhada
}
```

### 1. Agrupamento por Área

As respostas são agrupadas por área de risco:

```typescript
const answersByArea: Record<string, UserAnswer[]> = {};

answers.forEach(answer => {
  for (const area of riskAreas) {
    const question = area.questions.find(q => q.id === answer.questionId);
    if (question) {
      if (!answersByArea[area.id]) {
        answersByArea[area.id] = [];
      }
      answersByArea[area.id].push(answer);
      break;
    }
  }
});
```

### 2. Cálculo de Score por Área

Para cada área, o score é calculado como:

```typescript
const areaScore = (totalActualScore / totalPossibleScore) * 100;
```

Onde:
- `totalActualScore`: Soma dos scores das respostas na área
- `totalPossibleScore`: Score máximo possível (número de perguntas × 10)

**Exemplo**:
- Área com 2 perguntas
- Respostas com scores 7 e 3
- Score da área: `(7 + 3) / (2 × 10) × 100 = 50%`

### 3. Score Geral

O score geral é a média aritmética dos scores das áreas:

```typescript
const overallScore = areaScores.reduce((sum, area) => sum + area.score, 0) / areaScores.length;
```

### 4. Classificação de Risco

| Score | Nível | Cor | Descrição |
|-------|-------|-----|-----------|
| 0-30  | Baixo | Verde | Boa proteção de segurança |
| 31-70 | Médio | Amarelo | Melhorias necessárias |
| 71-100| Alto  | Vermelho | Ação imediata requerida |

## 🎯 Sistema de Recomendações

### Lógica de Geração

As recomendações são geradas baseadas no score de respostas específicas:

```typescript
// Exemplo: Recomendação para gerenciamento de senhas
if (passwordManagement && passwordManagement.riskScore > 3) {
  recommendations.push({
    id: 'rec-pwd-manager',
    title: 'Use um gerenciador de senhas',
    description: 'Gerenciadores de senhas ajudam a criar e armazenar senhas fortes...',
    priority: passwordManagement.riskScore > 7 ? 'high' : 'medium',
    actionSteps: [
      'Escolha um gerenciador confiável',
      'Crie uma senha mestra forte',
      'Migre senhas existentes'
    ]
  });
}
```

### Critérios de Prioridade

| Prioridade | Condição | Cor |
|------------|----------|-----|
| Alta | riskScore > 7 | Vermelho |
| Média | riskScore 4-7 | Amarelo |
| Baixa | riskScore ≤ 3 | Verde |

### Tipos de Recomendações

#### Senhas & Autenticação
- **Gerenciador de senhas** (score > 3)
- **Autenticação 2FA** (score > 2)

#### Segurança de Dispositivos
- **Atualizações de software** (score > 4)
- **Software antivírus** (score > 5)

#### Privacidade Online
- **Permissões de aplicativos** (score > 4)
- **Verificação de sites** (score > 3)

## 📈 Métricas e Analytics

### Distribuição de Scores

```typescript
interface ScoreDistribution {
  low: number;     // Porcentagem de usuários com score baixo
  medium: number;  // Porcentagem de usuários com score médio
  high: number;    // Porcentagem de usuários com score alto
}
```

### Métricas por Área

```typescript
interface AreaMetrics {
  areaId: string;
  averageScore: number;
  commonIssues: string[];
  improvementTrend: number;
}
```

## 🔧 Extensibilidade

### Adicionando Novas Perguntas

1. **Definir a pergunta**:
```typescript
const newQuestion: Question = {
  id: 'new-q-1',
  text: 'Nova pergunta sobre segurança?',
  options: [
    { value: 'option1', text: 'Opção 1', riskScore: 8 },
    { value: 'option2', text: 'Opção 2', riskScore: 2 }
  ]
};
```

2. **Adicionar à área correspondente**:
```typescript
riskAreas.find(area => area.id === 'targetArea')?.questions.push(newQuestion);
```

### Criando Nova Área de Risco

```typescript
const newArea: RiskArea = {
  id: 'network',
  name: 'Segurança de Rede',
  description: 'Avaliação da segurança da sua rede',
  icon: 'wifi',
  questions: [/* array de perguntas */]
};

riskAreas.push(newArea);
```

### Adicionando Recomendações Customizadas

```typescript
// No algoritmo de geração
if (customCondition) {
  recommendations.push({
    id: 'custom-rec',
    title: 'Recomendação Personalizada',
    description: 'Descrição específica...',
    priority: determinePriority(score),
    actionSteps: ['Ação 1', 'Ação 2']
  });
}
```

## 🧪 Validação e Testes

### Testes de Unidade Sugeridos

```typescript
describe('calculateRiskScore', () => {
  test('calcula score correto para respostas baixo risco', () => {
    const lowRiskAnswers = [
      { questionId: 'pwd-1', answer: 'pwd-manager', riskScore: 1 },
      { questionId: 'pwd-2', answer: 'always', riskScore: 0 }
    ];
    
    const result = calculateRiskScore(lowRiskAnswers);
    expect(result.overallScore).toBeLessThan(30);
  });
  
  test('gera recomendações apropriadas', () => {
    const highRiskAnswers = [
      { questionId: 'pwd-1', answer: 'same-all', riskScore: 10 }
    ];
    
    const result = calculateRiskScore(highRiskAnswers);
    expect(result.recommendations).toContainEqual(
      expect.objectContaining({
        id: 'rec-pwd-manager',
        priority: 'high'
      })
    );
  });
});
```

### Validação de Dados

```typescript
const validateAnswers = (answers: UserAnswer[]): boolean => {
  return answers.every(answer => 
    answer.questionId && 
    answer.answer && 
    typeof answer.riskScore === 'number' &&
    answer.riskScore >= 0 && 
    answer.riskScore <= 10
  );
};
```

## 📊 Exemplos de Uso

### Calculando Score Completo

```typescript
const userAnswers: UserAnswer[] = [
  { questionId: 'pwd-1', answer: 'few-diff', riskScore: 7 },
  { questionId: 'pwd-2', answer: 'some', riskScore: 5 },
  { questionId: 'dev-1', answer: 'eventually', riskScore: 5 },
  { questionId: 'dev-2', answer: 'free-basic', riskScore: 6 }
];

const riskProfile = calculateRiskScore(userAnswers);

console.log('Score geral:', riskProfile.overallScore);
console.log('Recomendações:', riskProfile.recommendations.length);
```

### Filtrando Recomendações por Prioridade

```typescript
const highPriorityRecs = riskProfile.recommendations
  .filter(rec => rec.priority === 'high')
  .sort((a, b) => a.title.localeCompare(b.title));
```

---

Esta API foi projetada para ser extensível e fácil de manter, permitindo futuras expansões do sistema de análise de riscos.
