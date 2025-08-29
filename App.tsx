import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import Profile from './components/Profile';
import Study from './components/Study';
import Review from './components/Review';
import { useUserProgress } from './hooks/useUserProgress';
import type { QuizModule, AppScreen, UserInfo, AnswerRecord, Theme } from './types';
import { quizModules } from './constants/data';
import { useSound } from './hooks/useSound';

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>('dashboard');
  const [activeModule, setActiveModule] = useState<QuizModule | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const { progress, updateProgress } = useUserProgress();
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'light');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => localStorage.getItem('soundEnabled') !== 'false');

  const playClickSound = useSound('/sounds/click.mp3', soundEnabled);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  useEffect(() => {
    localStorage.setItem('soundEnabled', String(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    try {
      const savedUserInfo = localStorage.getItem('userInfo');
      if (savedUserInfo) {
        setUserInfo(JSON.parse(savedUserInfo));
      }
    } catch (error) {
      console.error('Failed to load user info from localStorage', error);
      localStorage.removeItem('userInfo');
    }
  }, []);
  
  const handleSetScreen = (newScreen: AppScreen) => {
    playClickSound();
    setScreen(newScreen);
  }

  const handleOnboardingComplete = (name: string, course: string) => {
    const newUserInfo = { name, course };
    setUserInfo(newUserInfo);
    playClickSound();
    try {
      localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
    } catch (error) {
      console.error('Failed to save user info to localStorage', error);
    }
  };

  const handleStartQuiz = (module: QuizModule) => {
    playClickSound();
    setActiveModule(module);
    setScreen('quiz');
  };

  const handleStartStudy = (module: QuizModule) => {
    playClickSound();
    setActiveModule(module);
    setScreen('study');
  };

  const handleQuizComplete = (moduleId: string, score: number, total: number, answers: AnswerRecord[]) => {
    const percentage = (score / total) * 100;
    updateProgress(moduleId, { 
      score: percentage, 
      completed: true, 
      answers,
      completionDate: new Date().toISOString(),
    });
    setScreen('dashboard');
  };

  const renderContent = () => {
    switch (screen) {
      case 'dashboard':
        return <Dashboard onStartQuiz={handleStartQuiz} onStartStudy={handleStartStudy} userProgress={progress} soundEnabled={soundEnabled} />;
      case 'quiz':
        return activeModule ? <Quiz module={activeModule} onComplete={handleQuizComplete} soundEnabled={soundEnabled}/> : <Dashboard onStartQuiz={handleStartQuiz} onStartStudy={handleStartStudy} userProgress={progress} soundEnabled={soundEnabled} />;
      case 'study':
        return activeModule ? <Study module={activeModule} setScreen={handleSetScreen} soundEnabled={soundEnabled} /> : <Dashboard onStartQuiz={handleStartQuiz} onStartStudy={handleStartStudy} userProgress={progress} soundEnabled={soundEnabled} />;
      case 'profile':
        return <Profile userProgress={progress} userInfo={userInfo} soundEnabled={soundEnabled} />;
      case 'review':
        return <Review setScreen={handleSetScreen} soundEnabled={soundEnabled}/>;
      default:
        return <Dashboard onStartQuiz={handleStartQuiz} onStartStudy={handleStartStudy} userProgress={progress} soundEnabled={soundEnabled}/>;
    }
  };

  if (!userInfo) {
    return <Onboarding onComplete={handleOnboardingComplete} soundEnabled={soundEnabled} />;
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200">
      <Layout 
        setScreen={handleSetScreen} 
        activeScreen={screen}
        theme={theme}
        setTheme={setTheme}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
       />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 md:ml-64">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      {/* FIX: An extraneous </Layout> tag was removed from here, which was causing a JSX parsing error. */}
    </div>
  );
};

export default App;