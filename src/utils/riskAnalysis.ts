
export interface Question {
  id: string;
  text: string;
  options: {
    value: string;
    text: string;
    riskScore: number;
  }[];
}

export interface UserAnswer {
  questionId: string;
  answer: string;
  riskScore: number;
}

export interface RiskArea {
  id: string;
  name: string;
  description: string;
  icon: string;
  questions: Question[];
}

export interface RiskProfile {
  overallScore: number;
  areaScores: {
    areaId: string;
    name: string;
    score: number;
  }[];
  recommendations: Recommendation[];
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionSteps: string[];
}

// Define risk assessment questions grouped by areas
export const riskAreas: RiskArea[] = [
  {
    id: 'passwords',
    name: 'Senhas & Autenticação',
    description: 'Avaliação da força e gestão de suas senhas',
    icon: 'lock',
    questions: [
      {
        id: 'pwd-1',
        text: 'Como você gerencia suas senhas?',
        options: [
          { value: 'same-all', text: 'Uso a mesma senha para tudo', riskScore: 10 },
          { value: 'few-diff', text: 'Tenho algumas senhas diferentes que reutilizo', riskScore: 7 },
          { value: 'many-diff', text: 'Uso senhas diferentes para serviços importantes', riskScore: 4 },
          { value: 'pwd-manager', text: 'Uso um gerenciador de senhas', riskScore: 1 },
        ],
      },
      {
        id: 'pwd-2',
        text: 'Você utiliza autenticação de dois fatores (2FA)?',
        options: [
          { value: 'never', text: 'Nunca', riskScore: 10 },
          { value: 'some', text: 'Apenas em alguns serviços', riskScore: 5 },
          { value: 'critical', text: 'Em todos os serviços críticos (email, banco)', riskScore: 2 },
          { value: 'always', text: 'Em todos os serviços que oferecem esta opção', riskScore: 0 },
        ],
      },
    ],
  },
  {
    id: 'devices',
    name: 'Segurança de Dispositivos',
    description: 'Proteção de seus computadores e dispositivos móveis',
    icon: 'smartphone',
    questions: [
      {
        id: 'dev-1',
        text: 'Com que frequência você atualiza seus dispositivos?',
        options: [
          { value: 'never', text: 'Raramente ou nunca', riskScore: 10 },
          { value: 'when-broken', text: 'Apenas quando algo não funciona', riskScore: 7 },
          { value: 'eventually', text: 'Eventualmente, quando lembro', riskScore: 5 },
          { value: 'immediately', text: 'Assim que as atualizações estão disponíveis', riskScore: 1 },
        ],
      },
      {
        id: 'dev-2',
        text: 'Você utiliza antivírus ou software de segurança?',
        options: [
          { value: 'no', text: 'Não uso nenhum', riskScore: 10 },
          { value: 'free-basic', text: 'Apenas proteção básica/gratuita', riskScore: 6 },
          { value: 'paid', text: 'Uso solução paga e atualizada', riskScore: 2 },
          { value: 'comprehensive', text: 'Uso solução completa com firewall e outras proteções', riskScore: 0 },
        ],
      },
    ],
  },
  {
    id: 'privacy',
    name: 'Privacidade Online',
    description: 'Proteção de dados pessoais e comportamento online',
    icon: 'eye',
    questions: [
      {
        id: 'priv-1',
        text: 'Como você gerencia permissões de aplicativos?',
        options: [
          { value: 'never-check', text: 'Nunca verifico as permissões', riskScore: 10 },
          { value: 'accept-all', text: 'Geralmente aceito todas as solicitações', riskScore: 8 },
          { value: 'sometimes', text: 'Às vezes verifico permissões suspeitas', riskScore: 4 },
          { value: 'always', text: 'Sempre verifico e limito ao necessário', riskScore: 1 },
        ],
      },
      {
        id: 'priv-2',
        text: 'Você verifica a autenticidade de sites antes de fornecer informações?',
        options: [
          { value: 'never', text: 'Nunca verifico', riskScore: 10 },
          { value: 'sometimes', text: 'Às vezes, quando parece suspeito', riskScore: 6 },
          { value: 'usually', text: 'Geralmente verifico em sites importantes', riskScore: 3 },
          { value: 'always', text: 'Sempre verifico o HTTPS e a fonte', riskScore: 0 },
        ],
      },
    ],
  },
];

// Calculate risk score based on user answers
export const calculateRiskScore = (answers: UserAnswer[]): RiskProfile => {
  if (answers.length === 0) {
    return {
      overallScore: 0,
      areaScores: [],
      recommendations: []
    };
  }

  // Group answers by area
  const answersByArea: Record<string, UserAnswer[]> = {};
  
  answers.forEach(answer => {
    // Find which area this question belongs to
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
  
  // Calculate area scores
  const areaScores = Object.entries(answersByArea).map(([areaId, areaAnswers]) => {
    const area = riskAreas.find(a => a.id === areaId)!;
    const totalPossibleScore = area.questions.length * 10; // Max risk is 10 per question
    const totalActualScore = areaAnswers.reduce((sum, answer) => sum + answer.riskScore, 0);
    
    return {
      areaId,
      name: area.name,
      score: (totalActualScore / totalPossibleScore) * 100
    };
  });
  
  // Calculate overall score (average of area scores)
  const overallScore = areaScores.reduce((sum, area) => sum + area.score, 0) / areaScores.length;
  
  // Generate recommendations based on answers
  const recommendations: Recommendation[] = [];
  
  // Password recommendations
  const passwordAnswers = answersByArea['passwords'] || [];
  if (passwordAnswers.length > 0) {
    const pwdManagement = passwordAnswers.find(a => a.questionId === 'pwd-1');
    const twoFactorAuth = passwordAnswers.find(a => a.questionId === 'pwd-2');
    
    if (pwdManagement && pwdManagement.riskScore > 3) {
      recommendations.push({
        id: 'rec-pwd-manager',
        title: 'Use um gerenciador de senhas',
        description: 'Gerenciadores de senhas ajudam a criar e armazenar senhas fortes e únicas para cada serviço.',
        priority: pwdManagement.riskScore > 7 ? 'high' : 'medium',
        actionSteps: [
          'Escolha um gerenciador de senhas confiável como Bitwarden, 1Password ou LastPass',
          'Crie uma senha mestra forte e memorável',
          'Gradualmente substitua senhas antigas por senhas fortes geradas'
        ]
      });
    }
    
    if (twoFactorAuth && twoFactorAuth.riskScore > 2) {
      recommendations.push({
        id: 'rec-2fa',
        title: 'Ative autenticação de dois fatores',
        description: 'A autenticação de dois fatores adiciona uma camada extra de segurança às suas contas.',
        priority: twoFactorAuth.riskScore > 7 ? 'high' : 'medium',
        actionSteps: [
          'Ative 2FA em sua conta de email principal',
          'Ative 2FA em contas financeiras e redes sociais',
          'Use aplicativos autenticadores em vez de SMS quando possível'
        ]
      });
    }
  }
  
  // Device security recommendations
  const deviceAnswers = answersByArea['devices'] || [];
  if (deviceAnswers.length > 0) {
    const updates = deviceAnswers.find(a => a.questionId === 'dev-1');
    const antivirus = deviceAnswers.find(a => a.questionId === 'dev-2');
    
    if (updates && updates.riskScore > 4) {
      recommendations.push({
        id: 'rec-updates',
        title: 'Mantenha seus dispositivos atualizados',
        description: 'Atualizações de software frequentemente incluem correções de segurança importantes.',
        priority: updates.riskScore > 7 ? 'high' : 'medium',
        actionSteps: [
          'Configure atualizações automáticas quando possível',
          'Verifique regularmente se há atualizações pendentes',
          'Nunca ignore atualizações de segurança críticas'
        ]
      });
    }
    
    if (antivirus && antivirus.riskScore > 5) {
      recommendations.push({
        id: 'rec-antivirus',
        title: 'Melhore sua proteção contra malware',
        description: 'Software de segurança eficaz pode prevenir muitas ameaças comuns.',
        priority: antivirus.riskScore > 8 ? 'high' : 'medium',
        actionSteps: [
          'Instale uma solução de segurança confiável',
          'Execute verificações regulares em seus dispositivos',
          'Mantenha as definições de vírus atualizadas'
        ]
      });
    }
  }
  
  // Privacy recommendations
  const privacyAnswers = answersByArea['privacy'] || [];
  if (privacyAnswers.length > 0) {
    const appPermissions = privacyAnswers.find(a => a.questionId === 'priv-1');
    const siteVerification = privacyAnswers.find(a => a.questionId === 'priv-2');
    
    if (appPermissions && appPermissions.riskScore > 4) {
      recommendations.push({
        id: 'rec-permissions',
        title: 'Revise permissões de aplicativos',
        description: 'Muitos apps coletam mais dados do que precisam para funcionar.',
        priority: appPermissions.riskScore > 8 ? 'high' : 'medium',
        actionSteps: [
          'Revise as permissões de seus aplicativos existentes',
          'Restrinja permissões ao mínimo necessário',
          'Desinstale aplicativos que você não usa regularmente'
        ]
      });
    }
    
    if (siteVerification && siteVerification.riskScore > 3) {
      recommendations.push({
        id: 'rec-phishing',
        title: 'Aprenda a identificar sites falsos',
        description: 'Ataques de phishing são uma das formas mais comuns de roubo de dados.',
        priority: siteVerification.riskScore > 7 ? 'high' : 'low',
        actionSteps: [
          'Sempre verifique o URL antes de inserir informações',
          'Procure pelo ícone de cadeado e certificado HTTPS',
          'Desconfie de emails e links não solicitados'
        ]
      });
    }
  }
  
  return {
    overallScore,
    areaScores,
    recommendations
  };
};
