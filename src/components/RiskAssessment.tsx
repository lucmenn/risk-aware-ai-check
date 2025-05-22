
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { riskAreas, UserAnswer, calculateRiskScore, RiskProfile } from '@/utils/riskAnalysis';
import { Lock, Smartphone, Eye, ArrowRight, ArrowLeft } from "lucide-react";

interface RiskAssessmentProps {
  onComplete: (riskProfile: RiskProfile) => void;
}

const RiskAssessment: React.FC<RiskAssessmentProps> = ({ onComplete }) => {
  const [currentAreaIndex, setCurrentAreaIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  
  const allAreas = riskAreas;
  const currentArea = allAreas[currentAreaIndex];
  const currentQuestion = currentArea.questions[currentQuestionIndex];
  
  const totalQuestions = allAreas.reduce((total, area) => total + area.questions.length, 0);
  const answeredQuestions = userAnswers.length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  // Get the icon for the current area
  const getAreaIcon = () => {
    switch (currentArea.id) {
      case 'passwords':
        return <Lock className="w-6 h-6 text-primary" />;
      case 'devices':
        return <Smartphone className="w-6 h-6 text-primary" />;
      case 'privacy':
        return <Eye className="w-6 h-6 text-primary" />;
      default:
        return null;
    }
  };

  const handleAnswer = (optionValue: string) => {
    // Find the selected option
    const selectedOption = currentQuestion.options.find(
      (option) => option.value === optionValue
    );

    if (!selectedOption) return;

    // Save the answer
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      answer: optionValue,
      riskScore: selectedOption.riskScore,
    };

    // Update the answers array
    setUserAnswers([...userAnswers.filter(a => a.questionId !== currentQuestion.id), newAnswer]);

    // Move to the next question or area
    goToNext();
  };

  const goToNext = () => {
    // If there are more questions in the current area
    if (currentQuestionIndex < currentArea.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } 
    // If there are more areas
    else if (currentAreaIndex < allAreas.length - 1) {
      setCurrentAreaIndex(currentAreaIndex + 1);
      setCurrentQuestionIndex(0);
    } 
    // Assessment complete
    else {
      // Calculate the final risk score
      const riskProfile = calculateRiskScore(userAnswers);
      onComplete(riskProfile);
    }
  };

  const goToPrevious = () => {
    // If we're not at the first question of the current area
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } 
    // If we're at the first question but not the first area
    else if (currentAreaIndex > 0) {
      setCurrentAreaIndex(currentAreaIndex - 1);
      setCurrentQuestionIndex(allAreas[currentAreaIndex - 1].questions.length - 1);
    }
  };

  // Get the current answer if it exists
  const getCurrentAnswer = () => {
    return userAnswers.find(a => a.questionId === currentQuestion.id)?.answer || '';
  };

  return (
    <div className="flex flex-col">
      {/* Progress bar */}
      <div className="w-full h-1 bg-secondary mb-6">
        <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
      </div>
      
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-2">
          {getAreaIcon()}
          <h2 className="text-xl font-semibold ml-2">{currentArea.name}</h2>
        </div>
        <p className="text-muted-foreground text-sm">{currentArea.description}</p>
      </div>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">{currentQuestion.text}</h3>
          
          <RadioGroup 
            value={getCurrentAnswer()} 
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            {currentQuestion.options.map((option) => (
              <div 
                key={option.value} 
                className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-secondary/50 transition-colors"
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex-grow cursor-pointer">{option.text}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={goToPrevious} 
          disabled={currentAreaIndex === 0 && currentQuestionIndex === 0}
          className="flex items-center space-x-1"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Anterior
        </Button>
        
        <div className="text-sm text-center">
          <span className="text-primary font-medium">{answeredQuestions}</span>
          <span className="text-muted-foreground"> / {totalQuestions}</span>
        </div>
        
        <Button 
          variant="outline"
          onClick={goToNext}
          disabled={!getCurrentAnswer()}
          className="flex items-center space-x-1"
        >
          Próxima
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default RiskAssessment;
