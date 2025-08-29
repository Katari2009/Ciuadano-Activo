

import React, { useState, useEffect } from 'react';
import { generateStudyContent } from '../services/geminiService';
import type { AppScreen, QuizModule } from '../types';
import GlassCard from './common/GlassCard';
import { useSound } from '../hooks/useSound';

interface StudyProps {
  module: QuizModule;
  setScreen: (screen: AppScreen) => void;
  soundEnabled: boolean;
}

const Study: React.FC<StudyProps> = ({ module, setScreen, soundEnabled }) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const playClickSound = useSound('/sounds/click.mp3', soundEnabled);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      const generatedContent = await generateStudyContent(module.title);
      setContent(generatedContent);
      setIsLoading(false);
    };
    fetchContent();
  }, [module.title]);

  const formattedContent = content.split('\n').map((paragraph, index) => {
    if (paragraph.startsWith('* ')) {
        return <li key={index} className="mb-2 ml-4">{paragraph.substring(2)}</li>;
    }
    if (paragraph.trim() === '') {
        return <br key={index}/>;
    }
    return <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>;
  });


  return (
    <GlassCard>
      <div className="p-6 sm:p-8">
        <button onClick={() => setScreen('dashboard')} className="mb-8 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-bold">
          &larr; Volver al Dashboard
        </button>
        <h1 className="font-heading text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">{module.title}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg mb-8">{module.description}</p>
        
        <div className="prose-lg max-w-none text-gray-700 dark:text-gray-300">
            {isLoading ? (
            <div className="space-y-4">
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-6 w-3/4 rounded-md"></div>
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 w-full rounded-md"></div>
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 w-5/6 rounded-md"></div>
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 w-full rounded-md"></div>
            </div>
            ) : (
            <div className="whitespace-pre-wrap">{formattedContent}</div>
            )}
        </div>

        <button 
          onClick={() => { playClickSound(); setScreen('quiz'); }}
          className="mt-10 w-full bg-green-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 transform hover:scale-105"
        >
          ¡Listo para la prueba!
        </button>
      </div>
    </GlassCard>
  );
};

export default Study;