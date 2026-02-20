import { useState } from 'react';
import { UploadArea } from './components/UploadArea';
import { LoadingState } from './components/LoadingState';
import { ResultView } from './components/ResultView';
import { generateProfessionalPhoto } from './services/gemini';
import { Sparkles, Camera, AlertCircle, Upload, Zap, Download, Star, Shield, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!originalImage) return;

    setIsLoading(true);
    setError(null);

    try {
      // Extract base64 data and mime type
      const [mimeType, base64Data] = originalImage.split(';base64,');
      const cleanMimeType = mimeType.split(':')[1];

      const result = await generateProfessionalPhoto(base64Data, cleanMimeType);
      setGeneratedImage(result);
    } catch (err) {
      console.error(err);
      setError('Falha ao gerar imagem. Por favor, tente novamente com uma foto diferente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setGeneratedImage(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#050507] font-sans text-white selection:bg-violet-500/30 selection:text-violet-200 overflow-x-hidden">
      {/* Background Grid & Glows */}
      <div className="fixed inset-0 bg-dot-pattern opacity-20 pointer-events-none z-0" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-violet-600/20 blur-[120px] rounded-full pointer-events-none z-0 opacity-50" />
      
      {/* Header */}
      <header className="border-b border-white/5 sticky top-0 z-50 bg-[#050507]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-violet-600 to-fuchsia-600 rounded-lg flex items-center justify-center text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">Pic Pro</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Preços</a>
            <a href="#" className="hover:text-white transition-colors">Como Funciona</a>
            <a href="#" className="hover:text-white transition-colors">Galeria</a>
          </nav>

          <div className="flex items-center gap-4">
            <a href="#" className="hidden md:block text-sm font-medium text-white hover:text-violet-400 transition-colors">Login</a>
            <button className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all backdrop-blur-sm">
              Começar Agora
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-24 pb-32 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-violet-300 mb-8 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              Nova V2.0 IA Disponível
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-tight"
            >
              Sua melhor versão,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 animate-gradient-x">em segundos.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed"
            >
              Transforme selfies casuais em headshots corporativos de estúdio com nossa IA de ponta. Qualidade profissional sem agendar fotógrafo.
            </motion.p>

            {/* Main App Interface */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative mx-auto max-w-3xl"
            >
              {/* Glow behind the card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-[2.5rem] blur opacity-20" />
              
              <div className="relative bg-[#0A0A0F]/90 backdrop-blur-xl rounded-[2rem] border border-white/10 p-2 shadow-2xl">
                <div className="bg-[#050507]/50 rounded-[1.5rem] border border-white/5 p-8 min-h-[400px] flex flex-col justify-center relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <LoadingState />
                      </motion.div>
                    ) : generatedImage && originalImage ? (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <ResultView 
                          originalImage={originalImage}
                          generatedImage={generatedImage}
                          onReset={handleReset}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="upload"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full"
                      >
                        {!originalImage ? (
                          <div className="space-y-6">
                            <UploadArea onImageSelect={handleImageSelect} />
                            
                            <div className="flex gap-3 p-1 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                              <input 
                                type="text" 
                                placeholder="Ou cole um link da imagem..." 
                                className="flex-1 bg-transparent border-none rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-0"
                              />
                              <button className="bg-violet-600 hover:bg-violet-500 text-white px-8 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-300 neon-glow hover:scale-105 hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] whitespace-nowrap">
                                <Sparkles className="w-4 h-4" />
                                Gerar Foto Profissional
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-8">
                            <div className="relative aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl">
                              <img 
                                src={originalImage} 
                                alt="Preview" 
                                className="w-full h-full object-cover"
                              />
                              <button 
                                onClick={() => setOriginalImage(null)}
                                className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:text-red-400 transition-colors"
                              >
                                <AlertCircle className="w-5 h-5" />
                              </button>
                            </div>

                            <div className="flex flex-col gap-4 max-w-sm mx-auto">
                              <button
                                onClick={handleGenerate}
                                className="w-full py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold text-lg neon-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] flex items-center justify-center gap-2"
                              >
                                <Sparkles className="w-5 h-5" />
                                Gerar Foto Profissional
                              </button>
                              <button
                                onClick={() => setOriginalImage(null)}
                                className="text-gray-500 hover:text-gray-300 font-medium text-sm"
                              >
                                Escolher outra foto
                              </button>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-white/5 bg-[#0B0B0F]">
          <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">+1M</div>
              <div className="text-sm text-gray-500">Fotos Geradas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">4.9/5</div>
              <div className="text-sm text-gray-500">Avaliação Média</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">&lt; 10s</div>
              <div className="text-sm text-gray-500">Tempo de Processamento</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-sm text-gray-500">Privacidade Garantida</div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Como funciona a mágica</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Três passos simples para transformar sua presença digital com nossa tecnologia proprietária.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Upload className="w-6 h-6 text-violet-400" />,
                  title: "1. Upload",
                  desc: "Envie uma selfie casual ou foto antiga. Não precisa de iluminação perfeita ou maquiagem."
                },
                {
                  icon: <Zap className="w-6 h-6 text-violet-400" />,
                  title: "2. IA Processamento",
                  desc: "Nossa IA analisa seus traços faciais e reconstrói a imagem com iluminação de estúdio e roupas profissionais."
                },
                {
                  icon: <Download className="w-6 h-6 text-violet-400" />,
                  title: "3. Download",
                  desc: "Receba 4 variações em alta resolução prontas para o LinkedIn, currículo ou site pessoal."
                }
              ].map((step, i) => (
                <div key={i} className="bg-[#121216] border border-white/5 p-8 rounded-2xl hover:border-violet-500/30 transition-colors group">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-violet-500/10 transition-colors">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-24 px-6 bg-[#121216] border-y border-white/5">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Resultados que impressionam recrutadores</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Estudos mostram que perfis com fotos profissionais recebem 21x mais visualizações e 9x mais pedidos de conexão. Não deixe uma selfie ruim atrapalhar sua carreira.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Iluminação de Estúdio", desc: "Correção automática de sombras e luzes duras." },
                  { title: "Trajes Executivos", desc: "A IA veste você com ternos e roupas adequadas." },
                  { title: "Fundo Neutro", desc: "Remoção de bagunça e aplicação de fundos corporativos." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1">
                      <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-violet-500" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{item.title}</h4>
                      <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a href="#" className="inline-flex items-center gap-2 text-violet-400 font-semibold mt-8 hover:text-violet-300 transition-colors">
                Ver Galeria de Exemplos <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 translate-y-8">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" className="rounded-2xl opacity-60 grayscale" alt="Before" />
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" className="rounded-2xl opacity-60 grayscale" alt="Before" />
                </div>
                <div className="space-y-4">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop" className="rounded-2xl shadow-2xl border border-violet-500/30" alt="After" />
                  <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop" className="rounded-2xl shadow-2xl border border-violet-500/30" alt="After" />
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black px-4 py-2 rounded-full font-bold shadow-xl flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-600" />
                Pic Pro AI
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="font-bold text-xl tracking-tight">Pic Pro</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Pic Pro utiliza inteligência artificial avançada para democratizar o acesso a fotos profissionais de alta qualidade.
              </p>
              <div className="flex gap-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-white"><span className="sr-only">Twitter</span><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg></a>
                <a href="#" className="text-gray-400 hover:text-white"><span className="sr-only">Instagram</span><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.37c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Preços</a></li>
                <li><a href="#" className="hover:text-white">Para Empresas</a></li>
                <li><a href="#" className="hover:text-white">Estudos de Caso</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-white">Licença</a></li>
              </ul>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>&copy; 2024 Pic Pro. Todos os direitos reservados.</p>
            <p className="flex items-center gap-1">
              Feito com <span className="text-violet-500">♥</span> por IA
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

function ArrowRight(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
