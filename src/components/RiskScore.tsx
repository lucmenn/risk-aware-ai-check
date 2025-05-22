
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { RiskProfile } from '@/utils/riskAnalysis';

interface RiskScoreProps {
  riskProfile: RiskProfile;
}

const RiskScore: React.FC<RiskScoreProps> = ({ riskProfile }) => {
  const { overallScore, areaScores } = riskProfile;
  
  // Function to determine risk level color
  const getRiskColor = (score: number) => {
    if (score < 30) return 'bg-cyber-risk-low';
    if (score < 70) return 'bg-cyber-risk-medium';
    return 'bg-cyber-risk-high';
  };

  // Function to determine risk level text
  const getRiskLevelText = (score: number) => {
    if (score < 30) return 'Baixo';
    if (score < 70) return 'Médio';
    return 'Alto';
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-lg">
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-xl font-semibold mb-4">Seu Score de Risco</h2>
        
        <div className="relative w-40 h-40">
          <div className={`absolute inset-0 rounded-full flex items-center justify-center ${getRiskColor(overallScore)} bg-opacity-20`}>
            <div className={`w-32 h-32 rounded-full ${getRiskColor(overallScore)} bg-opacity-30 flex items-center justify-center`}>
              <div className={`w-24 h-24 rounded-full ${getRiskColor(overallScore)} flex items-center justify-center text-white`}>
                <span className="text-3xl font-bold">{Math.round(overallScore)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">Nível de Risco</p>
          <p className={`text-lg font-medium ${
            overallScore < 30 ? 'text-cyber-risk-low' : 
            overallScore < 70 ? 'text-cyber-risk-medium' : 
            'text-cyber-risk-high'
          }`}>
            {getRiskLevelText(overallScore)}
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-md font-medium mb-2">Áreas de Risco</h3>
        {areaScores.map((area) => (
          <div key={area.areaId} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{area.name}</span>
              <span className={`font-medium ${
                area.score < 30 ? 'text-cyber-risk-low' : 
                area.score < 70 ? 'text-cyber-risk-medium' : 
                'text-cyber-risk-high'
              }`}>
                {Math.round(area.score)}
              </span>
            </div>
            <Progress 
              value={area.score} 
              className={`h-2 ${getRiskColor(area.score)} bg-opacity-20`} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskScore;
