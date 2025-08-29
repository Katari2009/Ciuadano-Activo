import React, { useState } from 'react';
import Logo from './icons/Logo';
import { useSound } from '../hooks/useSound';


interface OnboardingProps {
  onComplete: (name: string, course: string) => void;
  soundEnabled: boolean;
}

const courseOptions = [
    "3° Medio A", "3° Medio B", "3° Medio C", "3° Medio D", "3° Medio E", "3° Medio F"
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, soundEnabled }) => {
  const [name, setName] = useState('');
  const [course, setCourse] = useState(courseOptions[0]);
  const [error, setError] = useState('');
  const playClickSound = useSound('/sounds/click.mp3', soundEnabled);

  const handleSubmit = () => {
    playClickSound();
    if (name.trim() === '') {
      setError('Por favor, ingresa tu nombre.');
      return;
    }
    setError('');
    onComplete(name.trim(), course);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 p-4">
      <div className="w-full max-w-md text-center">
        <div className="relative p-8 md:p-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/30 dark:border-white/10">
          <div className="mb-8">
            <Logo className="h-12 mx-auto"/>
          </div>
          <h1 className="font-heading text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">Bienvenido a Ciudadano Activo</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Identifícate para guardar tu progreso.</p>
          
          <div className="space-y-6 text-left">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Nombre Completo</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Ej: Juan Pérez"
              />
            </div>
            <div>
              <label htmlFor="course" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Curso</label>
              <select
                id="course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                {courseOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>
          
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

          <button
            onClick={handleSubmit}
            className="mt-10 w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Guardar y Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;