import React, { useState, useRef } from 'react';
import { MinecraftButton } from './MinecraftButton';

interface ImageUploaderProps {
  onImageSelected: (base64: string, mimeType: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert("Only blocky images allowed! (Please upload an image file)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      // Remove data URL prefix to get raw base64
      const [prefix, base64] = result.split(',');
      const mimeType = prefix.match(/:(.*?);/)?.[1] || 'image/png';
      onImageSelected(base64, mimeType);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div 
      className={`
        border-4 border-dashed p-10 text-center transition-colors duration-200 bg-[#00000080]
        ${dragActive ? 'border-[#5e7c16] bg-[#5e7c1620]' : 'border-[#7c7c7c]'}
      `}
      onDragEnter={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input 
        ref={inputRef}
        type="file" 
        className="hidden" 
        accept="image/*" 
        onChange={handleChange}
      />
      
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-[#7c7c7c] minecraft-border flex items-center justify-center">
           {/* Simple Plus Icon */}
           <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
             <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
           </svg>
        </div>
        
        <h3 className="text-2xl text-[#dedede]">Upload Image</h3>
        <p className="text-xl text-[#a0a0a0] mb-4">Drag & Drop or Click</p>
        
        <MinecraftButton onClick={onButtonClick} variant="primary">
          Select File
        </MinecraftButton>
      </div>
    </div>
  );
};