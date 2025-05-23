
# Guia de Contribuição - CyberRiskScore

Obrigado por seu interesse em contribuir com o CyberRiskScore! Este guia irá ajudá-lo a começar.

## 🤝 Como Contribuir

### Tipos de Contribuição

- 🐛 **Correção de Bugs**: Identifique e corrija problemas
- ✨ **Novas Funcionalidades**: Adicione recursos úteis
- 📚 **Documentação**: Melhore ou adicione documentação
- 🎨 **UI/UX**: Aprimore a interface e experiência do usuário
- 🔧 **Refatoração**: Melhore o código existente
- 🧪 **Testes**: Adicione ou melhore a cobertura de testes

## 🚀 Configuração do Ambiente

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Git
- Editor de código (VS Code recomendado)

### Setup Local

1. **Fork o repositório** no GitHub

2. **Clone seu fork**:
```bash
git clone https://github.com/SEU_USUARIO/cyberrisk-score.git
cd cyberrisk-score
```

3. **Adicione o repositório original como upstream**:
```bash
git remote add upstream https://github.com/REPO_ORIGINAL/cyberrisk-score.git
```

4. **Instale dependências**:
```bash
npm install
```

5. **Execute o projeto**:
```bash
npm run dev
```

## 📋 Processo de Desenvolvimento

### 1. Criando uma Branch

```bash
# Sincronize com o repositório principal
git checkout main
git pull upstream main

# Crie uma nova branch
git checkout -b feature/nova-funcionalidade
# ou
git checkout -b bugfix/correcao-bug
# ou
git checkout -b docs/melhoria-documentacao
```

### 2. Convenções de Naming

#### Branches
- `feature/nome-da-funcionalidade`
- `bugfix/descricao-do-bug`
- `docs/tipo-de-documentacao`
- `refactor/area-refatorada`
- `test/tipo-de-teste`

#### Commits
Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
tipo(escopo): descrição

feat(assessment): adiciona nova pergunta sobre autenticação
fix(score): corrige cálculo de risco médio
docs(readme): atualiza instruções de instalação
style(ui): ajusta cores do tema escuro
refactor(utils): reorganiza funções de cálculo
test(assessment): adiciona testes para componente
```

### 3. Desenvolvimento

#### Estrutura de Código

```typescript
// ✅ Bom: Componente bem estruturado
import React from 'react';
import { Card } from '@/components/ui/card';

interface Props {
  title: string;
  description: string;
}

const MeuComponente: React.FC<Props> = ({ title, description }) => {
  return (
    <Card>
      <h2>{title}</h2>
      <p>{description}</p>
    </Card>
  );
};

export default MeuComponente;
```

#### Padrões de Estilo

- **TypeScript**: Sempre use tipagem explícita
- **Componentes**: Functional components com hooks
- **Props**: Interfaces para todas as props
- **Imports**: Use imports absolutos (`@/`)
- **CSS**: Tailwind CSS classes apenas

### 4. Testando

```bash
# Execute testes (quando implementados)
npm run test

# Verifique lint
npm run lint

# Build de produção
npm run build
```

### 5. Submetendo Mudanças

```bash
# Commit suas mudanças
git add .
git commit -m "feat(assessment): adiciona validação de entrada"

# Push para sua branch
git push origin feature/nova-funcionalidade
```

## 🔍 Code Review

### Critérios de Review

#### ✅ Checklist Obrigatório

- [ ] Código segue os padrões estabelecidos
- [ ] TypeScript sem erros
- [ ] Build executa sem warnings
- [ ] Funcionalidade testada manualmente
- [ ] Documentação atualizada (se necessário)
- [ ] Commits seguem convenção
- [ ] Branch está atualizada com main

#### 📝 Aspectos Avaliados

1. **Funcionalidade**: Resolve o problema proposto?
2. **Performance**: Não impacta negativamente a performance?
3. **Segurança**: Não introduz vulnerabilidades?
4. **Manutenibilidade**: Código é legível e bem estruturado?
5. **Compatibilidade**: Funciona em diferentes browsers/dispositivos?

## 🐛 Reportando Bugs

### Template de Issue

```markdown
## Descrição do Bug
Descrição clara e concisa do problema.

## Passos para Reproduzir
1. Vá para '...'
2. Clique em '...'
3. Veja o erro

## Comportamento Esperado
O que deveria acontecer.

## Screenshots
Se aplicável, adicione screenshots.

## Ambiente
- OS: [ex: Windows 10]
- Browser: [ex: Chrome 91]
- Versão: [ex: 1.0.0]

## Informações Adicionais
Qualquer contexto adicional sobre o problema.
```

## ✨ Sugerindo Funcionalidades

### Template de Feature Request

```markdown
## Resumo da Funcionalidade
Descrição breve da funcionalidade solicitada.

## Problema que Resolve
Qual problema esta funcionalidade resolveria?

## Solução Proposta
Como você imagina que isso deveria funcionar?

## Alternativas Consideradas
Outras soluções que você considerou?

## Informações Adicionais
Contexto adicional, screenshots, mockups, etc.
```

## 📚 Áreas que Precisam de Contribuição

### Prioridade Alta
- [ ] Testes unitários para `riskAnalysis.ts`
- [ ] Testes de componente para `RiskAssessment`
- [ ] Validação de entrada robusta
- [ ] Tratamento de erros

### Prioridade Média
- [ ] Tema escuro
- [ ] Animações e transições
- [ ] Internacionalização (i18n)
- [ ] PWA (Progressive Web App)

### Prioridade Baixa
- [ ] Exportação de relatórios
- [ ] Integração com APIs externas
- [ ] Dashboard administrativo
- [ ] Sistema de notificações

## 🎯 Guidelines Específicas

### Componentes React

```typescript
// ✅ Estrutura padrão
import React from 'react';
import { ComponentProps } from '@/types';

interface Props extends ComponentProps {
  customProp: string;
}

const ComponentName: React.FC<Props> = ({ customProp, ...props }) => {
  // Hooks no topo
  const [state, setState] = useState(initialValue);
  
  // Funções auxiliares
  const handleAction = () => {
    // implementação
  };
  
  // Render
  return (
    <div className="container mx-auto" {...props}>
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

### Utilitários e Lógica

```typescript
// ✅ Funções puras quando possível
export const calculateSomething = (input: InputType): OutputType => {
  // Lógica pura sem side effects
  return result;
};

// ✅ Tipagem explícita
export interface ConfigType {
  property: string;
  optional?: number;
}
```

### Styling com Tailwind

```typescript
// ✅ Classes organizadas por categoria
const className = cn(
  // Layout
  "flex items-center justify-between",
  // Spacing
  "p-4 m-2",
  // Typography
  "text-lg font-medium",
  // Colors
  "bg-card text-foreground",
  // Responsive
  "sm:p-6 md:text-xl",
  // State
  "hover:bg-card/90 focus:ring-2",
  // Conditional
  isActive && "border-primary"
);
```

## 🏆 Reconhecimento

Contribuidores serão reconhecidos:
- 📝 **README**: Nome na seção de contribuidores
- 🎉 **Releases**: Menção nas notas de release
- 🏅 **Issues**: Label "good first issue" para novatos
- 📊 **Insights**: Estatísticas no GitHub Insights

## 📞 Suporte

- **Issues**: Para bugs e features
- **Discussions**: Para dúvidas e ideias
- **Email**: contribuicoes@cyberriskscore.com

---

Obrigado por contribuir! Juntos tornamos a segurança cibernética mais acessível. 🛡️
