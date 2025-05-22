
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, AlertTriangle, AlertCircle } from "lucide-react";
import { Recommendation } from '@/utils/riskAnalysis';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  const { title, description, priority, actionSteps } = recommendation;
  
  // Set priority indicator
  const getPriorityIcon = () => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-cyber-risk-high" />;
      case 'medium':
        return <AlertCircle className="h-5 w-5 text-cyber-risk-medium" />;
      case 'low':
        return <Check className="h-5 w-5 text-cyber-risk-low" />;
      default:
        return null;
    }
  };
  
  const getPriorityClass = () => {
    switch (priority) {
      case 'high':
        return 'text-cyber-risk-high border-cyber-risk-high';
      case 'medium':
        return 'text-cyber-risk-medium border-cyber-risk-medium';
      case 'low':
        return 'text-cyber-risk-low border-cyber-risk-low';
      default:
        return '';
    }
  };
  
  const getPriorityLabel = () => {
    switch (priority) {
      case 'high':
        return 'Alta Prioridade';
      case 'medium':
        return 'Média Prioridade';
      case 'low':
        return 'Baixa Prioridade';
      default:
        return '';
    }
  };

  return (
    <Card className="bg-card hover:bg-card/90 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          <div className={`flex items-center px-2 py-1 rounded-full border text-xs ${getPriorityClass()}`}>
            {getPriorityIcon()}
            <span className="ml-1">{getPriorityLabel()}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h4 className="text-sm font-medium mb-2">Ações Recomendadas:</h4>
        <ul className="space-y-1">
          {actionSteps.map((step, index) => (
            <li key={index} className="text-sm flex items-start">
              <span className="text-primary mr-2">•</span>
              <span className="text-muted-foreground">{step}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
