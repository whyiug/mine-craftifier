import React from 'react';

interface MinecraftButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const MinecraftButton: React.FC<MinecraftButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  fullWidth = false,
  ...props 
}) => {
  
  const baseClasses = "relative px-6 py-3 font-minecraft-title text-xl border-2 border-black outline-none transition-none select-none minecraft-btn";
  
  const variants = {
    primary: "bg-[#7c7c7c] text-white hover:bg-[#8c8c8c] border-black", // Stone
    secondary: "bg-[#5e7c16] text-white hover:bg-[#6e8c26] border-black", // Grass green
    danger: "bg-[#8b0000] text-white hover:bg-[#a00000] border-black", // Redstone
  };

  // Inner border simulation via CSS classes in index.html (minecraft-border)
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className} minecraft-border`}
      {...props}
    >
      {children}
    </button>
  );
};