
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import RiskAssessment from '@/components/RiskAssessment';
import RiskScore from '@/components/RiskScore';
import RecommendationCard from '@/components/RecommendationCard';
import { RiskProfile } from '@/utils/riskAnalysis';
import { Shield, ArrowRight } from 'lucide-react';

const Index: React.FC = () => {
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [riskProfile, setRiskProfile] = useState<RiskProfile | null>(null);

  const handleAssessmentComplete = (profile: RiskProfile) => {
    setRiskProfile(profile);
  };

  const startNewAssessment = () => {
    setAssessmentStarted(true);
    setRiskProfile(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 lg:px-8 bg-cyber-blue">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-cyber-cyan" />
            <h1 className="text-2xl font-bold text-white">CyberRisk<span className="text-cyber-cyan">Score</span></h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!assessmentStarted && !riskProfile ? (
          <div className="max-w-3xl mx-auto mt-12">
            <Card className="bg-gradient-to-br from-cyber-blue to-cyber-navy border-0 shadow-xl">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-3xl font-bold text-white">Avalie sua Segurança Digital</CardTitle>
                <CardDescription className="text-lg text-gray-200">
                  Descubra vulnerabilidades e melhore sua proteção online
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pt-4 pb-8">
                <p className="text-gray-300 mb-8">
                  Responda algumas perguntas simples para obter uma análise personalizada 
                  de seus riscos de segurança cibernética e receber recomendações específicas.
                </p>
                <Button 
                  onClick={() => setAssessmentStarted(true)}
                  className="bg-cyber-cyan hover:bg-cyber-cyan/90 text-cyber-navy font-medium px-8 py-6 rounded-lg text-lg"
                >
                  Iniciar Avaliação de Risco
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg text-center">
                <div className="bg-cyber-cyan/20 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
                  <span className="text-cyber-cyan text-xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Avaliação Personalizada</h3>
                <p className="text-muted-foreground text-sm">
                  Analisamos seu perfil de segurança cibernética com base em suas respostas.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg text-center">
                <div className="bg-cyber-cyan/20 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
                  <span className="text-cyber-cyan text-xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Score de Risco</h3>
                <p className="text-muted-foreground text-sm">
                  Receba um score detalhado que identifica suas áreas de vulnerabilidade.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg text-center">
                <div className="bg-cyber-cyan/20 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
                  <span className="text-cyber-cyan text-xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Recomendações</h3>
                <p className="text-muted-foreground text-sm">
                  Obtenha sugestões práticas e personalizadas para melhorar sua segurança.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {!riskProfile ? (
              <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                  <Button variant="outline" onClick={() => setAssessmentStarted(false)} className="mb-4">
                    Voltar
                  </Button>
                  <h2 className="text-2xl font-bold mb-2">Avaliação de Risco Cibernético</h2>
                  <p className="text-muted-foreground">
                    Responda todas as perguntas para receber sua análise personalizada de segurança.
                  </p>
                </div>
                <RiskAssessment onComplete={handleAssessmentComplete} />
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold">Seu Perfil de Segurança</h2>
                  <Button onClick={startNewAssessment}>Nova Avaliação</Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <RiskScore riskProfile={riskProfile} />
                  </div>
                  
                  <div className="lg:col-span-2">
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle>Recomendações de Segurança</CardTitle>
                        <CardDescription>
                          Ações priorizadas para melhorar sua segurança cibernética
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    
                    <div className="space-y-4">
                      {riskProfile.recommendations.length > 0 ? (
                        riskProfile.recommendations
                          .sort((a, b) => {
                            const priorityOrder = { high: 0, medium: 1, low: 2 };
                            return priorityOrder[a.priority] - priorityOrder[b.priority];
                          })
                          .map((recommendation) => (
                            <RecommendationCard 
                              key={recommendation.id} 
                              recommendation={recommendation} 
                            />
                          ))
                      ) : (
                        <Card className="bg-card p-6 text-center">
                          <p className="text-muted-foreground">
                            Parabéns! Seu perfil de segurança parece excelente. 
                            Continue mantendo boas práticas de segurança cibernética.
                          </p>
                        </Card>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 bg-cyber-navy">
        <div className="container mx-auto">
          <Separator className="mb-4 bg-gray-700" />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              CyberRiskScore © {new Date().getFullYear()} - Análise de riscos em segurança cibernética
            </p>
            <p className="text-sm text-gray-500 mt-2 md:mt-0">
              Esta é uma ferramenta educacional e não substitui uma avaliação de segurança profissional
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
