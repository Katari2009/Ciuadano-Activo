import React from 'react';
import type { Badge as BadgeType } from '../types';

interface BadgeProps {
  badge: BadgeType;
  isEarned: boolean;
}

const Badge: React.FC<BadgeProps> = ({ badge, isEarned }) => {
  const { Icon, name, description } = badge;

  return (
    <div className="flex flex-col items-center text-center p-2 group" title={`${name}: ${description}`}>
      <div
        className={`
          w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-110
          ${isEarned
            ? 'bg-yellow-400/20 dark:bg-yellow-400/10'
            : 'bg-gray-200 dark:bg-gray-700'
          }
        `}
      >
        <Icon
          className={`
            w-10 h-10 transition-colors duration-300
            ${isEarned
              ? 'text-yellow-500 dark:text-yellow-400'
              : 'text-gray-400 dark:text-gray-500'
            }
          `}
        />
      </div>
      <p
        className={`
          mt-2 font-bold text-sm transition-colors duration-300
          ${isEarned
            ? 'text-gray-700 dark:text-gray-200'
            : 'text-gray-400 dark:text-gray-500'
          }
        `}
      >
        {name}
      </p>
    </div>
  );
};

export default Badge;
