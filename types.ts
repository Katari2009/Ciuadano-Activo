import React from 'react';

export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizModule {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface AnswerRecord {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export interface ModuleProgress {
  score: number;
  completed: boolean;
  answers?: AnswerRecord[];
  completionDate?: string;
}

export interface UserProgress {
  [moduleId: string]: ModuleProgress;
}

export interface UserInfo {
  name: string;
  course: string;
}

export type AppScreen = 'dashboard' | 'quiz' | 'study' | 'profile' | 'review';

export type Theme = 'light' | 'dark';

export interface Badge {
  id: string;
  name: string;
  description: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  criteria: (progress: UserProgress) => boolean;
}
