
import React from 'react';
import type { QuizModule } from '../types';
import GlassCard from './common/GlassCard';
import CheckIcon from './icons/CheckIcon';
import BookOpenIcon from './icons/BookOpenIcon';
import PencilIcon from './icons/PencilIcon';
import { useSound } from '../hooks/useSound';


interface ModuleCardProps {
  module: QuizModule;
  onStartQuiz: (module: QuizModule) => void;
  onStartStudy: (module: QuizModule) => void;
  isCompleted: boolean;
  soundEnabled: boolean;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, onStartQuiz, onStartStudy, isCompleted, soundEnabled }) => {
  const playClickSound = useSound('/sounds/click.mp3', soundEnabled);

  return (
    <GlassCard className="flex flex-col justify-between h-full group p-6 hover:shadow-2xl transition-shadow duration-300">
      <div>
        {isCompleted && (
          <div className="absolute top-4 right-4 bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400 p-2 rounded-full transform transition-transform duration-300 group-hover:scale-110">
            <CheckIcon className="w-5 h-5" />
          </div>
        )}
        <h3 className="font-heading text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">{module.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{module.description}</p>
      </div>
      <div className="mt-auto flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
        <button
          onClick={() => { playClickSound(); onStartStudy(module); }}
          className="flex-1 flex items-center justify-center bg-white/50 dark:bg-gray-700/30 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold py-2 px-4 rounded-lg hover:bg-white/80 hover:border-gray-400 dark:hover:bg-gray-700/60 dark:hover:border-gray-500 transition-all duration-200"
        >
          <BookOpenIcon className="w-5 h-5 mr-2"/>
          Estudiar
        </button>
        <button
          onClick={() => { playClickSound(); onStartQuiz(module); }}
          className="flex-1 flex items-center justify-center bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200"
        >
          <PencilIcon className="w-5 h-5 mr-2" />
          Prueba
        </button>
      </div>
    </GlassCard>
  );
};

export default ModuleCard;