"use client";

import { RiStarFill } from "react-icons/ri";
import { useState } from "react";

interface StarInputProps {
  value: number;
  onChange: (value: number) => void;
  size?: number;
  disabled?: boolean;
}

export function StarInput({
  value,
  onChange,
  size = 24,
  disabled = false,
}: StarInputProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleClick = (starIndex: number, isLeftHalf: boolean) => {
    if (disabled) return;
    
    // starIndex is 0-based, so star 1 = index 0
    const rating = starIndex + (isLeftHalf ? 0.5 : 1);
    onChange(rating);
  };

  const handleMouseMove = (starIndex: number, e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeftHalf = x < rect.width / 2;
    
    setHoverValue(starIndex + (isLeftHalf ? 0.5 : 1));
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  const displayValue = hoverValue !== null ? hoverValue : value;

  return (
    <div className="flex gap-1">
      {[0, 1, 2, 3, 4].map((starIndex) => {
        const fillPercentage = Math.min(Math.max((displayValue - starIndex) * 100, 0), 100);

        return (
          <div
            key={starIndex}
            className="relative cursor-pointer"
            onMouseMove={(e) => handleMouseMove(starIndex, e)}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const isLeftHalf = x < rect.width / 2;
              handleClick(starIndex, isLeftHalf);
            }}
            style={{ width: size, height: size }}
          >
            {/* Background (empty star) */}
            <RiStarFill
              size={size}
              className="absolute text-gray-300"
            />

            {/* Foreground (filled star) */}
            <div
              className="absolute overflow-hidden transition-all duration-150 ease-out"
              style={{ width: `${fillPercentage}%` }}
            >
              <RiStarFill
                size={size}
                className="text-cargo-accent"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
