import React, { useState, useEffect } from 'react';
import type { QuizModule, AnswerRecord } from '../types';
import GlassCard from './common/GlassCard';
import ProgressBar from './common/ProgressBar';
import { useSound } from '../hooks/useSound';

interface QuizProps {
  module: QuizModule;
  onComplete: (moduleId: string, score: number, total: number, answers: AnswerRecord[]) => void;
  soundEnabled: boolean;
}

const Quiz: React.FC<QuizProps> = ({ module, onComplete, soundEnabled }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [answerHistory, setAnswerHistory] = useState<AnswerRecord[]>([]);

  const playSuccessSound = useSound('/sounds/success.mp3', soundEnabled);
  const playErrorSound = useSound('/sounds/error.mp3', soundEnabled);
  const playCompleteSound = useSound('/sounds/complete.mp3', soundEnabled);
  const playClickSound = useSound('/sounds/click.mp3', soundEnabled);

  useEffect(() => {
    if (showResults) {
      playCompleteSound();
    }
  }, [showResults, playCompleteSound]);

  const currentQuestion = module.questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;
    const isCorrect = answer === currentQuestion.correctAnswer;
    setSelectedAnswer(answer);
    setIsAnswered(true);

    setAnswerHistory(prev => [...prev, {
      question: currentQuestion.question,
      selectedAnswer: answer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
    }]);

    if (isCorrect) {
      setScore(s => s + 1);
      playSuccessSound();
    } else {
      playErrorSound();
    }
  };

  const handleNextQuestion = () => {
    playClickSound();
    if (currentQuestionIndex < module.questions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };
  
  const getButtonClass = (option: string) => {
    if (!isAnswered) {
      return 'bg-white/50 hover:bg-white/90 border-gray-300 text-gray-700 dark:bg-gray-700/50 dark:hover:bg-gray-700/80 dark:border-gray-600 dark:text-gray-300';
    }
    if (option === currentQuestion.correctAnswer) {
      return 'bg-green-500 border-green-600 text-white font-bold';
    }
    if (option === selectedAnswer) {
      return 'bg-red-500 border-red-600 text-white font-bold';
    }
    return 'bg-white/50 border-gray-200 opacity-60 cursor-not-allowed dark:bg-gray-800/30 dark:border-gray-700/50 dark:text-gray-500';
  };

  if (showResults) {
    return (
      <GlassCard className="text-center p-8">
        <h2 className="font-heading text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">¡Prueba Completada!</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          Tu puntaje: <span className="font-bold text-blue-600 dark:text-blue-400">{score}</span> de <span className="font-bold">{module.questions.length}</span>
        </p>
        <button
          onClick={() => { playClickSound(); onComplete(module.id, score, module.questions.length, answerHistory); }}
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 transition-all duration-200"
        >
          Volver al Dashboard
        </button>
      </GlassCard>
    );
  }

  return (
    <div>
        <ProgressBar current={currentQuestionIndex + 1} total={module.questions.length} />
        <GlassCard>
            <div className="p-8">
                <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-2">Pregunta {currentQuestionIndex + 1} de {module.questions.length}</p>
                <h2 className="font-heading text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">{currentQuestion.question}</h2>
                <div className="space-y-4">
                {currentQuestion.options.map((option, index) => (
                    <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-lg border text-lg transition-all duration-200 ${getButtonClass(option)}`}
                    >
                    {option}
                    </button>
                ))}
                </div>
                {isAnswered && (
                <button
                    onClick={handleNextQuestion}
                    className="mt-8 w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all duration-200"
                >
                    {currentQuestionIndex < module.questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
                </button>
                )}
            </div>
        </GlassCard>
    </div>
  );
};

export default Quiz;