https://lovable.dev/projects/9ac48071-a1ae-4eb4-b49f-31a3a6c14e49
# CyberRiskScore 🛡️

Uma ferramenta de avaliação de riscos de segurança cibernética pessoal que ajuda usuários a identificar vulnerabilidades e receber recomendações personalizadas para melhorar sua proteção digital.

![CyberRiskScore Dashboard](docs/screenshots/dashboard.png)

## 🚀 Características Principais

- **Avaliação Interativa**: Questionário estruturado cobrindo senhas, dispositivos e privacidade
- **Score de Risco Personalizado**: Algoritmo inteligente que calcula seu nível de risco
- **Recomendações Prioritizadas**: Sugestões práticas organizadas por prioridade (Alta, Média, Baixa)
- **Interface Moderna**: Design responsivo inspirado em dashboards de segurança profissionais
- **Análise por Áreas**: Avaliação detalhada de diferentes aspectos de segurança

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18, TypeScript, Vite
- **UI/UX**: Tailwind CSS, shadcn/ui, Lucide React
- **Routing**: React Router DOM
- **State Management**: React Hooks
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Instalação

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Passos para Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/cyberrisk-score.git
cd cyberrisk-score
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Abra o navegador em `http://localhost:8080`

## 🎯 Como Usar

1. **Acesse a Página Inicial**: Clique em "Iniciar Avaliação de Risco"
2. **Responda o Questionário**: Complete todas as perguntas sobre senhas, dispositivos e privacidade
3. **Visualize seu Score**: Receba uma pontuação de 0-100 indicando seu nível de risco
4. **Siga as Recomendações**: Implemente as ações sugeridas baseadas em sua prioridade

## 📊 Sistema de Pontuação

- **0-30**: Risco Baixo (Verde) - Boa proteção
- **31-70**: Risco Médio (Amarelo) - Melhorias necessárias
- **71-100**: Risco Alto (Vermelho) - Ação imediata requerida

## 🏗️ Estrutura do Projeto

```
src/
├── components/           # Componentes React
│   ├── ui/              # Componentes base (shadcn/ui)
│   ├── RecommendationCard.tsx
│   ├── RiskAssessment.tsx
│   └── RiskScore.tsx
├── pages/               # Páginas da aplicação
│   └── Index.tsx
├── utils/               # Utilitários e lógica de negócio
│   └── riskAnalysis.ts
└── styles/
    └── index.css
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run preview` - Visualiza a build de produção
- `npm run lint` - Executa o linter

## 🤝 Contribuindo

Consulte o [Guia de Contribuição](docs/CONTRIBUTING.md) para instruções detalhadas sobre como contribuir para o projeto.

## 📚 Documentação

- [Documentação Técnica](docs/TECHNICAL.md)
- [API de Análise de Riscos](docs/API.md)
- [Guia de Deployment](docs/DEPLOYMENT.md)
- [Changelog](docs/CHANGELOG.md)

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🆘 Suporte

Para suporte e dúvidas:
- Abra uma [issue](https://github.com/seu-usuario/cyberrisk-score/issues)
- Entre em contato via email: suporte@cyberriskscore.com

## 🔮 Roadmap

- [ ] Integração com APIs de threat intelligence
- [ ] Relatórios em PDF
- [ ] Dashboard administrativo
- [ ] Sistema de notificações
- [ ] Integração com gestores de senhas
- [ ] Modo empresarial (multi-usuário)

---

Desenvolvido com ❤️ para tornar a segurança cibernética acessível a todos.
