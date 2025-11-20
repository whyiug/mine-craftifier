export interface GenerationState {
  status: 'idle' | 'uploading' | 'generating' | 'success' | 'error';
  message?: string;
}

export interface ImageResult {
  original: string | null;
  generated: string | null;
}

export type AnimationStyle = 'ghibli' | 'disney' | 'pixar' | 'anime' | 'cartoon';

export interface StyleOption {
  value: AnimationStyle;
  label: string;
  emoji: string;
  description: string;
}
