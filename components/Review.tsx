import React, { useState, useEffect } from 'react';
import { generateReviewContent, generateReviewQuiz } from '../services/geminiService';
import type { AppScreen, Question } from '../types';
import GlassCard from './common/GlassCard';
import ProgressBar from './common/ProgressBar';
import { quizModules } from '../constants/data';
import { useSound } from '../hooks/useSound';

interface ReviewProps {
  setScreen: (screen: AppScreen) => void;
  soundEnabled: boolean;
}

const Review: React.FC<ReviewProps> = ({ setScreen, soundEnabled }) => {
  const [content, setContent] = useState<string>('');
  const [isLoadingSummary, setIsLoadingSummary] = useState<boolean>(true);

  // Sound hooks
  const playClickSound = useSound('/sounds/click.mp3', soundEnabled);
  const playSuccessSound = useSound('/sounds/success.mp3', soundEnabled);
  const playErrorSound = useSound('/sounds/error.mp3', soundEnabled);
  const playCompleteSound = useSound('/sounds/complete.mp3', soundEnabled);

  // Quiz State
  const [quizQuestions, setQuizQuestions] = useState<Question[] | null>(null);
  const [isQuizLoading, setIsQuizLoading] = useState<boolean>(false);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoadingSummary(true);
      const moduleTitles = quizModules.map(m => m.title);
      const generatedContent = await generateReviewContent(moduleTitles);
      setContent(generatedContent);
      setIsLoadingSummary(false);
    };
    fetchContent();
  }, []);

  useEffect(() => {
    if (showResults) {
      playCompleteSound();
    }
  }, [showResults, playCompleteSound]);

  const handleStartQuiz = async () => {
    playClickSound();
    setIsQuizLoading(true);
    resetQuiz();
    const moduleTitles = quizModules.map(m => m.title);
    const questions = await generateReviewQuiz(moduleTitles);
    if (questions && questions.length > 0) {
      setQuizQuestions(questions);
      setShowQuiz(true);
    } else {
      alert("No se pudieron generar las preguntas. Inténtalo de nuevo.");
    }
    setIsQuizLoading(false);
  };
  
  const resetQuiz = () => {
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
  }

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;
    const currentQuestion = quizQuestions?.[currentQuestionIndex];
    if(!currentQuestion) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === currentQuestion.correctAnswer) {
      setScore(s => s + 1);
      playSuccessSound();
    } else {
      playErrorSound();
    }
  };

  const handleNextQuestion = () => {
    playClickSound();
    if (!quizQuestions) return;
    if (currentQuestionIndex < quizQuestions.length - 1) {
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
    const currentQuestion = quizQuestions?.[currentQuestionIndex];
    if (option === currentQuestion?.correctAnswer) {
      return 'bg-green-500 border-green-600 text-white font-bold';
    }
    if (option === selectedAnswer) {
      return 'bg-red-500 border-red-600 text-white font-bold';
    }
    return 'bg-white/50 border-gray-200 opacity-60 cursor-not-allowed dark:bg-gray-800/30 dark:border-gray-700/50 dark:text-gray-500';
  };

  const formattedContent = content.split('\n').map((paragraph, index) => {
    if (paragraph.startsWith('* ')) {
        return <li key={index} className="mb-2 ml-4">{paragraph.substring(2)}</li>;
    }
    if (paragraph.trim().startsWith('##')) {
        return <h2 key={index} className="font-heading text-2xl font-bold text-gray-700 dark:text-gray-200 mt-6 mb-3">{paragraph.replace('##','').trim()}</h2>
    }
    if (paragraph.trim().startsWith('#')) {
        return <h1 key={index} className="font-heading text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">{paragraph.replace('#','').trim()}</h1>
    }
    if (paragraph.trim() === '') {
        return <br key={index}/>;
    }
    return <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>;
  });
  
  if (showQuiz && quizQuestions) {
    const currentQuestion = quizQuestions[currentQuestionIndex];

    if (showResults) {
        return (
          <GlassCard className="text-center p-8">
            <h2 className="font-heading text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">¡Prueba de Repaso Completada!</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              Tu puntaje: <span className="font-bold text-blue-600 dark:text-blue-400">{score}</span> de <span className="font-bold">{quizQuestions.length}</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <button
                    onClick={handleStartQuiz}
                    className="bg-green-500 text-white font-bold py-3 px-8 rounded-xl hover:bg-green-600 transition-all duration-200"
                >
                    Reintentar
                </button>
                <button
                    onClick={() => { playClickSound(); setShowQuiz(false); resetQuiz()}}
                    className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 transition-all duration-200"
                >
                    Volver al Resumen
                </button>
            </div>
          </GlassCard>
        );
      }

    return (
        <div>
            <ProgressBar current={currentQuestionIndex + 1} total={quizQuestions.length} />
            <GlassCard>
                <div className="p-8">
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-2">Pregunta {currentQuestionIndex + 1} de {quizQuestions.length}</p>
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
                        {currentQuestionIndex < quizQuestions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
                    </button>
                    )}
                </div>
            </GlassCard>
        </div>
      );
  }


  return (
    <GlassCard>
      <div className="p-6 sm:p-8">
        <button onClick={() => setScreen('dashboard')} className="mb-8 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-bold">
          &larr; Volver al Dashboard
        </button>
        <h1 className="font-heading text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">Repaso General para la Prueba</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg mb-8">Un resumen de todos los temas clave para consolidar tu conocimiento.</p>
        
        <div className="prose-lg max-w-none text-gray-700 dark:text-gray-300">
            {isLoadingSummary ? (
            <div className="space-y-4">
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-1/2 rounded-md"></div>
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-6 w-3/4 rounded-md mt-6"></div>
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 w-full rounded-md"></div>
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 w-5/6 rounded-md"></div>
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-6 w-3/4 rounded-md mt-6"></div>
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 w-full rounded-md"></div>
            </div>
            ) : (
            <div className="whitespace-pre-wrap">{formattedContent}</div>
            )}
        </div>
        <div className="mt-8 border-t border-gray-200/80 dark:border-gray-700/80 pt-6">
            <h2 className="font-heading text-3xl font-bold text-gray-700 dark:text-gray-200 mb-3">¿Listo para probarte?</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Genera una prueba única de 10 preguntas para evaluar tu conocimiento sobre todos los temas.</p>
            <button
                onClick={handleStartQuiz}
                disabled={isQuizLoading}
                className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 disabled:bg-green-300 dark:disabled:bg-green-800/50"
            >
                {isQuizLoading ? 'Generando prueba...' : 'Generar Prueba de Repaso'}
            </button>
        </div>
      </div>
    </GlassCard>
  );
};

export default Review;