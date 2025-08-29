import React, { useState } from 'react';
import type { AppScreen, Theme } from '../types';
import HomeIcon from './icons/HomeIcon';
import UserIcon from './icons/UserIcon';
import ReviewIcon from './icons/ReviewIcon';
import Logo from './icons/Logo';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import SoundOnIcon from './icons/SoundOnIcon';
import SoundOffIcon from './icons/SoundOffIcon';
import { useSound } from '../hooks/useSound';

interface LayoutProps {
  setScreen: (screen: AppScreen) => void;
  activeScreen: AppScreen;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; isActive: boolean; }> = ({ icon, label, onClick, isActive }) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center space-x-4 px-4 py-3 rounded-lg transition-all duration-200 relative ${
      isActive 
        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400' 
        : 'text-gray-500 hover:bg-gray-100/80 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800/80 dark:hover:text-gray-100'
    }`}
  >
    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-blue-600 dark:bg-blue-400 rounded-r-full"></div>}
    {icon}
    <span className="font-bold">{label}</span>
  </button>
);

const Layout: React.FC<LayoutProps> = ({ setScreen, activeScreen, theme, setTheme, soundEnabled, setSoundEnabled }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const playClickSound = useSound('/sounds/click.mp3', soundEnabled);

  const handleThemeToggle = () => {
    playClickSound();
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSoundToggle = () => {
    setSoundEnabled(!soundEnabled);
     // Play sound before it's disabled
    if (!soundEnabled) {
       new Audio('/sounds/click.mp3').play();
    }
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full p-4">
      <div className="px-2 mb-12">
        <Logo />
      </div>
      <nav className="flex flex-col space-y-2">
        <NavItem icon={<HomeIcon />} label="Dashboard" onClick={() => { setScreen('dashboard'); setIsSidebarOpen(false); }} isActive={activeScreen === 'dashboard'} />
        <NavItem icon={<ReviewIcon />} label="Repaso General" onClick={() => { setScreen('review'); setIsSidebarOpen(false); }} isActive={activeScreen === 'review'} />
        <NavItem icon={<UserIcon />} label="Perfil" onClick={() => { setScreen('profile'); setIsSidebarOpen(false); }} isActive={activeScreen === 'profile'} />
      </nav>
      <div className="mt-auto space-y-2">
         <button onClick={handleSoundToggle} className="w-full flex items-center space-x-4 px-4 py-3 rounded-lg text-gray-500 hover:bg-gray-100/80 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800/80 dark:hover:text-gray-100 transition-colors">
          {soundEnabled ? <SoundOnIcon /> : <SoundOffIcon />}
          <span className="font-bold">Sonidos</span>
        </button>
        <button onClick={handleThemeToggle} className="w-full flex items-center space-x-4 px-4 py-3 rounded-lg text-gray-500 hover:bg-gray-100/80 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800/80 dark:hover:text-gray-100 transition-colors">
          {theme === 'light' ? <SunIcon /> : <MoonIcon />}
          <span className="font-bold">Tema</span>
        </button>
      </div>
      <div className="mt-6 border-t border-gray-200/80 dark:border-gray-700/80 pt-4 text-center text-xs text-gray-500 dark:text-gray-400 space-y-1">
        <p>Creado por:</p>
        <p className="font-semibold text-gray-600 dark:text-gray-300">Christian Núñez Vega</p>
        <p>Asesor Pedagógico</p>
        <p>Programa PACE-UDA, 2025</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg z-20 flex items-center justify-between p-4 border-b border-gray-200/80 dark:border-gray-700/80">
        <Logo className="h-8"/>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-700 dark:text-gray-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-r border-gray-200/80 dark:border-gray-800/80 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <SidebarContent />
      </aside>
      
      {/* Overlay for mobile */}
      {isSidebarOpen && <div className="md:hidden fixed inset-0 bg-black/30 z-20" onClick={() => setIsSidebarOpen(false)}></div>}
    </>
  );
};

export default Layout;