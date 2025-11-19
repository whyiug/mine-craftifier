import React from 'react';

interface MinecraftSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  className?: string;
}

export const MinecraftSlider: React.FC<MinecraftSliderProps> = ({
  value,
  onChange,
  min = 1,
  max = 10,
  label = "Granularity",
  className = ""
}) => {
  
  const getLabelText = (val: number) => {
    if (val <= 2) return "16x Grid (Abstract)";
    if (val <= 4) return "24x Grid (Chunky)";
    if (val <= 6) return "32x Grid (Large Blocks)"; // Default range (5)
    if (val <= 8) return "64x Grid (Standard)";
    return "100x+ Grid (Detailed)";
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex justify-between items-end">
        <label className="text-[#dedede] text-xl font-minecraft-title uppercase tracking-widest shadow-black drop-shadow-md">
          {label}
        </label>
        <span className="text-[#5e7c16] text-lg font-bold">
          {getLabelText(value)}
        </span>
      </div>
      <div className="bg-[#3a3a3a] p-1 border-2 border-black">
        <input
          type="range"
          min={min}
          max={max}
          step="1"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className="minecraft-slider w-full"
        />
      </div>
      <div className="flex justify-between text-xs text-[#666] font-mono px-1">
        <span>Blocky</span>
        <span>Detailed</span>
      </div>
    </div>
  );
};