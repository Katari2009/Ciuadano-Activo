
import React from 'react';
import ModuleCard from './ModuleCard';
import { quizModules } from '../constants/data';
import type { QuizModule, UserProgress } from '../types';

interface DashboardProps {
  onStartQuiz: (module: QuizModule) => void;
  onStartStudy: (module: QuizModule) => void;
  userProgress: UserProgress;
  soundEnabled: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartQuiz, onStartStudy, userProgress, soundEnabled }) => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-5xl font-bold text-gray-800 dark:text-gray-100">Tus Módulos de Estudio</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-3 text-lg">Selecciona un tema para estudiar o poner a prueba tus conocimientos.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizModules.map(module => (
          <ModuleCard
            key={module.id}
            module={module}
            onStartQuiz={onStartQuiz}
            onStartStudy={onStartStudy}
            isCompleted={userProgress[module.id]?.completed || false}
            soundEnabled={soundEnabled}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;