import { useCallback, useEffect } from 'react';

// Crea un pool global para mantener las instancias de audio y evitar duplicados.
const audioPool: { [src: string]: HTMLAudioElement } = {};

export const useSound = (soundSrc: string, enabled: boolean) => {
  // Precarga el sonido cuando el hook se utiliza por primera vez para una fuente de sonido específica.
  useEffect(() => {
    if (!audioPool[soundSrc]) {
      const audio = new Audio(soundSrc);
      audio.preload = 'auto'; // Indica al navegador que comience a cargar el archivo.
      audio.load();
      audioPool[soundSrc] = audio;
    }
  }, [soundSrc]);

  const playSound = useCallback(() => {
    if (enabled && audioPool[soundSrc]) {
      const audio = audioPool[soundSrc];
      // Siempre rebobina al principio para permitir clics rápidos y repetidos.
      audio.currentTime = 0;
      audio.play().catch(error => {
        // El navegador puede bloquear la reproducción automática si no es iniciada por el usuario.
        console.warn(`La reproducción del sonido falló para ${soundSrc}:`, error);
      });
    }
  }, [soundSrc, enabled]);

  return playSound;
};
