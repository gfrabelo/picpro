import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import type { DragEvent, ChangeEvent } from 'react';
import { motion } from 'motion/react';

interface UploadAreaProps {
  onImageSelect: (file: File) => void;
}

export function UploadArea({ onImageSelect }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  }, [onImageSelect]);

  const handleFileInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  }, [onImageSelect]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative border-2 border-dashed rounded-3xl p-16 text-center transition-all duration-300 cursor-pointer group overflow-hidden
        ${isDragging 
          ? 'border-violet-500 bg-violet-500/10 shadow-[0_0_50px_rgba(139,92,246,0.2)]' 
          : 'border-white/10 hover:border-violet-500/50 hover:bg-white/5 bg-[#0A0A0F]/80'
        }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-upload')?.click()}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <input
        id="file-upload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileInput}
      />
      
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className={`p-6 rounded-2xl transition-all duration-300 ${isDragging ? 'bg-violet-500 text-white shadow-lg scale-110' : 'bg-white/5 text-violet-400 group-hover:bg-violet-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]'}`}>
          <Upload className="w-10 h-10" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Clique para enviar ou arraste e solte</h3>
          <p className="text-gray-400 text-sm font-medium">SVG, PNG, JPG ou GIF (MAX. 800x400px)</p>
        </div>
      </div>
    </motion.div>
  );
}
