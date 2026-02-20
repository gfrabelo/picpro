import { Download, RefreshCw, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ResultViewProps {
  originalImage: string;
  generatedImage: string;
  onReset: () => void;
}

export function ResultView({ originalImage, generatedImage, onReset }: ResultViewProps) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'pic-pro-resultado.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-5xl mx-auto"
    >
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-12">
        {/* Original */}
        <div className="space-y-4 w-full max-w-sm">
          <div className="text-sm font-medium text-gray-400 uppercase tracking-wider text-center">Original</div>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 group">
            <img 
              src={originalImage} 
              alt="Original" 
              className="w-full h-full object-cover opacity-80 grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>

        {/* Arrow for desktop */}
        <div className="hidden md:flex justify-center text-white/20">
          <ArrowRight className="w-8 h-8" />
        </div>

        {/* Result */}
        <div className="space-y-4 w-full max-w-sm">
          <div className="text-sm font-medium text-violet-400 uppercase tracking-wider text-center">Resultado Profissional</div>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/5 border border-violet-500/30 shadow-[0_0_30px_rgba(124,58,237,0.2)] group">
            <img 
              src={generatedImage} 
              alt="Generated Professional" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-gray-300 font-medium hover:bg-white/10 hover:text-white transition-all duration-300"
        >
          <RefreshCw className="w-5 h-5" />
          Tentar Outra Foto
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-500 transition-all duration-300 neon-glow hover:scale-105 hover:shadow-[0_0_40px_rgba(139,92,246,0.6)]"
        >
          <Download className="w-5 h-5" />
          Baixar Imagem
        </button>
      </div>
    </motion.div>
  );
}
