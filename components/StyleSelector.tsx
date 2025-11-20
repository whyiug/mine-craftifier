import React from 'react';
import { AnimationStyle, StyleOption } from '../types';

interface StyleSelectorProps {
  value: AnimationStyle;
  onChange: (style: AnimationStyle) => void;
  className?: string;
}

const STYLE_OPTIONS: StyleOption[] = [
  {
    value: 'ghibli',
    label: '宫崎骏/吉卜力风格',
    emoji: '🎨',
    description: 'Studio Ghibli - 梦幻、手绘水彩感、温暖柔和的色调'
  },
  {
    value: 'disney',
    label: '迪士尼风格',
    emoji: '🏰',
    description: 'Disney - 经典童话、明亮鲜艳、圆润可爱的角色'
  },
  {
    value: 'pixar',
    label: '皮克斯3D风格',
    emoji: '🎬',
    description: 'Pixar - 3D渲染、质感丰富、生动表情'
  },
  {
    value: 'anime',
    label: '日本动漫风格',
    emoji: '⚡',
    description: 'Anime - 大眼睛、夸张表情、动态线条'
  },
  {
    value: 'cartoon',
    label: '美式卡通风格',
    emoji: '🎭',
    description: 'Cartoon - 夸张幽默、大胆用色、简洁线条'
  }
];

export const StyleSelector: React.FC<StyleSelectorProps> = ({
  value,
  onChange,
  className = ""
}) => {
  const selectedOption = STYLE_OPTIONS.find(option => option.value === value);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-[#dedede] text-xl font-minecraft-title uppercase tracking-widest shadow-black drop-shadow-md">
        Animation Style
      </label>
      
      <div className="bg-[#3a3a3a] p-1 border-2 border-black">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as AnimationStyle)}
          className="w-full bg-[#262626] text-[#dedede] font-minecraft-title text-lg p-3 
                     border-2 border-[#6e6e6e] 
                     focus:border-[#5e7c16] focus:outline-none
                     cursor-pointer
                     appearance-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23dedede'%3E%3Cpath stroke-linecap='square' stroke-linejoin='miter' stroke-width='3' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.5rem center',
            backgroundSize: '1.5em 1.5em',
            paddingRight: '2.5rem'
          }}
        >
          {STYLE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.emoji} {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      {selectedOption && (
        <div className="bg-[#262626] border-2 border-[#3a3a3a] p-3 text-[#aaaaaa] text-sm">
          <p className="font-mono leading-relaxed">
            {selectedOption.description}
          </p>
        </div>
      )}
    </div>
  );
};
