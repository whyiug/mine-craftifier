import React, { useState } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { MinecraftButton } from './components/MinecraftButton';
import { MinecraftSlider } from './components/MinecraftSlider';
import { generateMinecraftImage } from './services/geminiService';
import { GenerationState } from './types';

// Icons
const DownloadIcon = () => (
  <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const MagicIcon = () => (
  <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const App: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<{base64: string, mimeType: string} | null>(null);
  const [generatedImageBase64, setGeneratedImageBase64] = useState<string | null>(null);
  const [granularity, setGranularity] = useState<number>(5);
  const [appState, setAppState] = useState<GenerationState>({ status: 'idle' });

  const handleImageSelected = (base64: string, mimeType: string) => {
    setSourceImage({ base64, mimeType });
    setGeneratedImageBase64(null);
    setAppState({ status: 'idle' });
  };

  const handleGenerate = async () => {
    if (!sourceImage) return;

    setAppState({ status: 'generating' });
    try {
      const resultBase64 = await generateMinecraftImage(
        sourceImage.base64, 
        sourceImage.mimeType,
        granularity
      );
      setGeneratedImageBase64(resultBase64);
      setAppState({ status: 'success' });
    } catch (error) {
      setAppState({ status: 'error', message: 'Failed to craft image. Try again.' });
    }
  };

  const handleDownload = () => {
    if (!generatedImageBase64) return;
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${generatedImageBase64}`;
    link.download = 'minecraft-style.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setSourceImage(null);
    setGeneratedImageBase64(null);
    setAppState({ status: 'idle' });
    setGranularity(5);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl flex flex-col min-h-screen">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-5xl md:text-7xl font-minecraft-title text-white mb-2 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
          MINECRAFTIFIER
        </h1>
        <p className="text-2xl text-[#aaaaaa]">Pixelate your world</p>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* Step 1: Upload */}
        {!sourceImage && (
          <div className="bg-[#3a3a3a] p-2 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,0.5)]">
            <div className="border-2 border-[#6e6e6e] p-6 bg-[#262626]">
               <ImageUploader onImageSelected={handleImageSelected} />
            </div>
          </div>
        )}

        {/* Step 2 & 3: Preview and Result */}
        {sourceImage && (
          <div className="flex flex-col gap-8">
            
            {/* Display Area */}
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Original */}
              <div className="flex flex-col gap-2">
                 <div className="bg-[#3a3a3a] p-1 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.5)]">
                    <div className="aspect-square w-full relative bg-[#111] overflow-hidden">
                      <img 
                        src={`data:${sourceImage.mimeType};base64,${sourceImage.base64}`} 
                        alt="Original" 
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute bottom-0 left-0 bg-black/70 px-3 py-1 text-white font-minecraft-title text-sm">
                        Original
                      </div>
                    </div>
                 </div>
              </div>

              {/* Result */}
              <div className="flex flex-col gap-2">
                 <div className="bg-[#3a3a3a] p-1 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.5)] h-full">
                    <div className="aspect-square w-full relative bg-[#111] flex items-center justify-center overflow-hidden">
                      {appState.status === 'generating' ? (
                        <div className="text-center p-6 animate-pulse">
                           <div className="w-16 h-16 bg-[#5e7c16] mx-auto mb-4 minecraft-border animate-bounce"></div>
                           <p className="text-2xl text-[#5e7c16]">Crafting...</p>
                        </div>
                      ) : generatedImageBase64 ? (
                        <img 
                          src={`data:image/png;base64,${generatedImageBase64}`} 
                          alt="Generated" 
                          className="w-full h-full object-contain image-pixelated"
                          style={{ imageRendering: 'pixelated' }}
                        />
                      ) : (
                        <div className="text-[#555] text-center p-4">
                          <p className="text-xl opacity-50">Ready to craft</p>
                        </div>
                      )}
                      
                      {generatedImageBase64 && (
                         <div className="absolute bottom-0 left-0 bg-[#5e7c16]/90 px-3 py-1 text-white font-minecraft-title text-sm">
                            Minecraft Style
                         </div>
                      )}
                    </div>
                 </div>
              </div>
            </div>

            {/* Controls Area */}
            <div className="bg-[#262626] p-6 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,0.5)] flex flex-col gap-6">
              
              {/* Settings */}
              <div className="w-full">
                <MinecraftSlider 
                  value={granularity} 
                  onChange={setGranularity} 
                  label="Block Size / Granularity"
                />
              </div>

              <div className="h-1 bg-[#3a3a3a] border-b border-[#555] w-full"></div>

              {/* Actions */}
              <div className="flex flex-col md:flex-row justify-center gap-4 items-center">
                
                {/* Main Generation Button (Initial) */}
                {appState.status === 'idle' && (
                  <MinecraftButton onClick={handleGenerate} variant="secondary" className="w-full md:w-auto min-w-[240px]">
                    Generate Blocks
                  </MinecraftButton>
                )}

                {/* Error State */}
                {appState.status === 'error' && (
                   <div className="flex flex-col items-center gap-4 w-full">
                      <p className="text-[#ff5555] text-xl text-center">{appState.message}</p>
                      <MinecraftButton onClick={handleGenerate} variant="secondary">
                        Try Again
                      </MinecraftButton>
                   </div>
                )}

                {/* Success Actions */}
                {appState.status === 'success' && (
                  <div className="flex flex-col md:flex-row gap-4 w-full md:justify-center">
                    <MinecraftButton onClick={handleDownload} variant="secondary" className="flex-1">
                      <DownloadIcon /> Download
                    </MinecraftButton>
                    
                    <MinecraftButton onClick={handleGenerate} variant="primary" className="flex-1">
                      <MagicIcon /> Regenerate
                    </MinecraftButton>

                    <MinecraftButton onClick={handleReset} variant="danger" className="flex-none">
                      <RefreshIcon /> New Image
                    </MinecraftButton>
                  </div>
                )}

                 {/* Cancel / Back (Only when idle) */}
                 {appState.status === 'idle' && (
                     <button 
                       onClick={handleReset}
                       className="text-[#888] hover:text-white underline mt-2 md:mt-0"
                     >
                       Cancel
                     </button>
                 )}
              </div>
            </div>

          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center text-[#666]">
        <p>Not affiliated with Mojang or Microsoft.</p>
      </footer>
    </div>
  );
};

export default App;