export interface GenerationState {
  status: 'idle' | 'uploading' | 'generating' | 'success' | 'error';
  message?: string;
}

export interface ImageResult {
  original: string | null;
  generated: string | null;
}
