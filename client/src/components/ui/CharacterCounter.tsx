import type { FC } from 'react';

interface CharacterCounterProps {
  charactersCount: number;
  characterLimit: number;
  percentage: number;
  wordsCount: number;
}

export const CharacterCounter: FC<CharacterCounterProps> = ({
  charactersCount,
  characterLimit,
  percentage,
  wordsCount,
}) => {
  const isLimitAchieved = charactersCount >= characterLimit;

  return (
    <div className="flex gap-2">
      <div className={isLimitAchieved ? 'text-red-500' : 'text-gray-500'}>
        <svg height="20" width="20" viewBox="0 0 20 20">
          <circle r="10" cx="10" cy="10" fill="#9ca3af" />
          <circle
            r="5"
            cx="10"
            cy="10"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="10"
            strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
            transform="rotate(-90) translate(-20)"
          />
          <circle r="6" cx="10" cy="10" fill="white" />
        </svg>
      </div>
      <div
        className={
          isLimitAchieved ? 'text-red-500' : 'text-gray-900 dark:text-gray-100'
        }
      >
        <span>
          {charactersCount} / {characterLimit} characters
        </span>
        <br />
        <span>{wordsCount} words</span>
      </div>
    </div>
  );
};
