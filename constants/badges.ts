import type { Badge as BadgeType, UserProgress } from '../types';
import { quizModules } from './data';

import FirstStepsIcon from '../components/icons/badges/FirstStepsIcon';
import DedicatedStudentIcon from '../components/icons/badges/DedicatedStudentIcon';
import PerfectScoreIcon from '../components/icons/badges/PerfectScoreIcon';
import KnowItAllIcon from '../components/icons/badges/KnowItAllIcon';
import ReadyToVoteIcon from '../components/icons/badges/ReadyToVoteIcon';

export const badges: BadgeType[] = [
  {
    id: 'first-steps',
    name: 'Primeros Pasos',
    description: 'Completa tu primer módulo de estudio.',
    Icon: FirstStepsIcon,
    criteria: (progress: UserProgress) => Object.values(progress).some(p => p.completed),
  },
  {
    id: 'dedicated-student',
    name: 'Estudiante Dedicado',
    description: 'Completa todos los módulos de estudio.',
    Icon: DedicatedStudentIcon,
    criteria: (progress: UserProgress) => {
      const completedModules = Object.values(progress).filter(p => p.completed).length;
      return completedModules === quizModules.length;
    },
  },
  {
    id: 'perfect-score',
    name: 'Puntaje Perfecto',
    description: 'Obtén 100% en cualquier prueba.',
    Icon: PerfectScoreIcon,
    criteria: (progress: UserProgress) => Object.values(progress).some(p => p.score === 100),
  },
  {
    id: 'know-it-all',
    name: 'Sabelotodo',
    description: 'Obtén 100% en TODAS las pruebas.',
    Icon: KnowItAllIcon,
    criteria: (progress: UserProgress) => {
      const allModulesCompleted = Object.values(progress).filter(p => p.completed).length === quizModules.length;
      if (!allModulesCompleted || quizModules.length === 0) return false;
      return Object.values(progress).every(p => p.score === 100);
    },
  },
  {
    id: 'ready-to-vote',
    name: 'Listo para Votar',
    description: 'Completa el módulo de Sufragio.',
    Icon: ReadyToVoteIcon,
    criteria: (progress: UserProgress) => progress['sufragio']?.completed === true,
  },
];
