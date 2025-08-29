import React from 'react';
import type { UserProgress, UserInfo } from '../types';
import { quizModules } from '../constants/data';
import GlassCard from './common/GlassCard';
import ProgressBar from './common/ProgressBar';
import Badge from './Badge';
import { badges } from '../constants/badges';
import { useSound } from '../hooks/useSound';


// Declare jsPDF for TypeScript since it's loaded from a CDN
declare const jspdf: any;

interface ProfileProps {
  userProgress: UserProgress;
  userInfo: UserInfo | null;
  soundEnabled: boolean;
}

const Profile: React.FC<ProfileProps> = ({ userProgress, userInfo, soundEnabled }) => {
  const completedModules = Object.values(userProgress).filter(p => p.completed).length;
  const totalModules = quizModules.length;
  const averageScore =
    Object.values(userProgress).reduce((acc, p) => acc + p.score, 0) /
    (completedModules || 1);
  
  const playClickSound = useSound('/sounds/click.mp3', soundEnabled);

  const handleExportPDF = () => {
    playClickSound();
    if (!userInfo) return;
    const { jsPDF } = jspdf;
    const doc = new jsPDF();
    const now = new Date();
    const timestamp = `${now.toLocaleDateString('es-CL')} ${now.toLocaleTimeString('es-CL')}`;
    let yPos = 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Reporte de Progreso - Ciudadano Activo", 105, yPos, { align: "center" });
    yPos += 15;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Nombre: ${userInfo.name}`, 14, yPos);
    doc.text(`Curso: ${userInfo.course}`, 14, yPos + 7);
    doc.text(`Fecha de Exportación: ${timestamp}`, 14, yPos + 14);
    yPos += 30;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Resumen General", 14, yPos);
    yPos += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Módulos Completados: ${completedModules} de ${totalModules}`, 14, yPos);
    doc.text(`Puntaje Promedio: ${averageScore.toFixed(0)}%`, 14, yPos + 7);
    yPos += 20;

    quizModules.forEach(module => {
      const progress = userProgress[module.id];
      if (progress && progress.completed) {
        if (yPos > 260) { // Add new page if content overflows
            doc.addPage();
            yPos = 20;
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text(`Módulo: ${module.title}`, 14, yPos);
        yPos += 8;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.text(`Puntaje: ${progress.score.toFixed(0)}%`, 14, yPos);
        if(progress.completionDate) {
            doc.text(`Fecha de finalización: ${new Date(progress.completionDate).toLocaleString('es-CL')}`, 14, yPos + 7);
        }
        yPos += 14;
        
        doc.setFont("helvetica", "bold");
        doc.text("Respuestas:", 14, yPos);
        yPos += 7;

        progress.answers?.forEach((ans, index) => {
             if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }
            doc.setFont("helvetica", "italic");
            const questionText = doc.splitTextToSize(`P${index + 1}: ${ans.question}`, 180);
            doc.text(questionText, 18, yPos);
            yPos += (questionText.length * 5);


            doc.setFont("helvetica", "normal");
            const yourAnswer = `  - Tu respuesta: ${ans.selectedAnswer}`;
            const correctAnswer = `  - Respuesta correcta: ${ans.correctAnswer}`;
            
            doc.setTextColor(ans.isCorrect ? '#10B981' : '#EF4444');
            doc.text(yourAnswer, 20, yPos);
            yPos += 6;

            if (!ans.isCorrect) {
                doc.setTextColor('#10B981');
                doc.text(correctAnswer, 20, yPos);
                yPos += 6;
            }
            doc.setTextColor('#000000');
            yPos += 4;
        });
      }
    });

    doc.save(`Progreso_CiudadanoActivo_${userInfo.name.replace(/\s/g, '_')}.pdf`);
  };
  
  const earnedBadges = badges.filter(badge => badge.criteria(userProgress));
  const unearnedBadges = badges.filter(badge => !badge.criteria(userProgress));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-5xl font-bold text-gray-800 dark:text-gray-100">Tu Perfil de Progreso</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-3 text-lg">Aquí puedes ver tu avance y logros en la plataforma.</p>
      </div>

      <GlassCard>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
             <h3 className="font-heading text-2xl font-bold text-gray-700 dark:text-gray-200">Progreso General</h3>
             <button
                onClick={handleExportPDF}
                className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed dark:disabled:bg-blue-800/50 dark:disabled:text-gray-400"
                disabled={!userInfo || completedModules === 0}
                title={completedModules === 0 ? "Completa al menos un módulo para exportar" : "Exportar progreso a PDF"}
             >
                Exportar Progreso
             </button>
          </div>
          <ProgressBar current={completedModules} total={totalModules} />
          <p className="text-center mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium">{completedModules} de {totalModules} módulos completados</p>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <div className="p-6 text-center">
            <h4 className="font-heading text-lg font-bold text-gray-700 dark:text-gray-200 mb-2">Puntaje Promedio</h4>
            <p className="font-heading text-5xl font-bold text-blue-600 dark:text-blue-400">{averageScore.toFixed(0)}%</p>
          </div>
        </GlassCard>
        <GlassCard>
          <div className="p-6 text-center">
            <h4 className="font-heading text-lg font-bold text-gray-700 dark:text-gray-200 mb-2">Módulos Completados</h4>
            <p className="font-heading text-5xl font-bold text-green-600 dark:text-green-400">{completedModules}</p>
          </div>
        </GlassCard>
      </div>

      <GlassCard>
        <div className="p-6">
          <h3 className="font-heading text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">Insignias y Logros</h3>
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {earnedBadges.map(badge => <Badge key={badge.id} badge={badge} isEarned={true} />)}
              {unearnedBadges.map(badge => <Badge key={badge.id} badge={badge} isEarned={false} />)}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default Profile;