/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Terminal, 
  Download, 
  ShieldCheck, 
  Zap, 
  Target, 
  Skull, 
  Cpu, 
  Lock,
  AlertTriangle,
  ChevronRight,
  ShieldAlert,
  Activity,
  Database,
  Globe,
  UserCheck,
  Trophy
} from 'lucide-react';

// --- Constants ---

const FEATURES = [
  { 
    icon: Target, 
    title: "Aimbot Predictivo", 
    desc: "Algoritmo de predicción de trayectoria basado en latencia. Silent aim indetectable con suavizado dinámico.",
    details: ["FOV Personalizable", "Smoothing Adaptativo", "Bone Selection"]
  },
  { 
    icon: ShieldCheck, 
    title: "Kernel Bypass v2", 
    desc: "Inyección a nivel de kernel (Ring 0). Evade Easy Anti-Cheat y verificaciones de integridad de RageMP.",
    details: ["Ring 0 Injection", "HWID Spoofer", "Anti-Screenshot"]
  },
  { 
    icon: Zap, 
    title: "Motor de Física", 
    desc: "Modifica la gravedad, fricción y torque de cualquier vehículo en tiempo real sin desincronización.",
    details: ["No-Clip", "Speed Multiplier", "Instant Stop"]
  },
  { 
    icon: Skull, 
    title: "Visuales Avanzados", 
    desc: "Renderizado DirectX 12 externo. Visualiza esqueletos, cajas 3D, líneas de visión y loot a 2km.",
    details: ["Skeleton ESP", "3D Box", "Snaplines"]
  },
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "¿Quién es considerado el mejor jugador y más habilidoso de todo GTahub?",
    options: ["Joel Saledo", "Rocio Soto", "Chapo Chavez", "Daniel Hormigón", "Isabella Rech"]
  },
  {
    id: 2,
    question: "¿Quién posee la conducción más precisa y legendaria en la historia de RageMP?",
    options: ["Goofi Jandinawe", "Joel Saledo", "Isabella Rech", "Chapo Chavez", "Rocio Soto"]
  },
  {
    id: 3,
    question: "¿Quién es el desarrollador más brillante y respetado de la escena de cheats internacional?",
    options: ["Daniel Hormigón", "Chapo Chavez", "Goofi Jandinawe", "Joel Saledo", "Isabella Rech"]
  }
];

// --- Components ---

const MatrixBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-10 z-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff41_1px,transparent_1px),linear-gradient(to_bottom,#00ff41_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
};

export default function App() {
  const [step, setStep] = useState<'landing' | 'quiz' | 'downloading' | 'prank'>('landing');
  const [quizIndex, setQuizIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [quizError, setQuizError] = useState(false);
  
  const mainRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: mainRef });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const lines = [
      "SYSTEM: Booting IPRX Kernel Driver...",
      "AUTH: Handshaking with Chapo_Chavez_Mainframe...",
      "NETWORK: Establishing encrypted tunnel via Port 8080...",
      "BYPASS: RageMP Integrity Check [SUCCESS]",
      "BYPASS: GTahub Anti-Cheat [SUCCESS]",
      "STATUS: IPRX v4.2.0 is ACTIVE and UNDETECTED.",
      "WELCOME: Authorized User Identified."
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < lines.length) {
        setTerminalLines(prev => [...prev, lines[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 600);
    
    return () => clearInterval(interval);
  }, []);

  const startQuiz = () => setStep('quiz');

  const handleQuizAnswer = (answer: string) => {
    if (answer === "Chapo Chavez") {
      setQuizError(false);
      if (quizIndex < QUIZ_QUESTIONS.length - 1) {
        setQuizIndex(prev => prev + 1);
      } else {
        setStep('downloading');
        startDownload();
      }
    } else {
      setQuizError(true);
      setTimeout(() => setQuizError(false), 1500);
    }
  };

  const startDownload = () => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 8;
      if (p >= 100) {
        p = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => setStep('prank'), 1500);
      } else {
        setProgress(p);
      }
    }, 300);
  };

  return (
    <div ref={mainRef} className="min-h-screen bg-hacker-dark text-hacker-green selection:bg-hacker-green selection:text-hacker-dark font-mono overflow-x-hidden">
      <MatrixBackground />
      <div className="scanline" />
      <div className="crt-overlay" />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 border-b border-hacker-green/20 bg-hacker-dark/90 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Terminal className="w-8 h-8 glow-text" />
              <motion.div 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-2 h-2 bg-hacker-green rounded-full"
              />
            </div>
            <span className="font-display text-2xl font-bold tracking-[0.2em] glow-text">IPRX</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-12 text-[10px] uppercase tracking-[0.3em] font-bold">
            <a href="#features" className="hover:text-white transition-all">Módulos</a>
            <a href="#security" className="hover:text-white transition-all">Seguridad</a>
            <a href="#dev" className="hover:text-white transition-all">Desarrollador</a>
            <div className="flex items-center gap-2 px-3 py-1 border border-hacker-green/30 rounded-sm">
              <Activity className="w-3 h-3 animate-pulse" />
              <span>Live Status: Undetected</span>
            </div>
          </div>

          <button 
            onClick={startQuiz}
            className="bg-hacker-green text-hacker-dark px-6 py-2 text-xs font-bold hover:bg-white transition-all uppercase tracking-widest"
          >
            Acceso VIP
          </button>
        </div>
      </header>

      <main className="relative pt-32 pb-24 px-6">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-hacker-green/10 border border-hacker-green/30 text-[10px] uppercase tracking-widest mb-6">
              <ShieldAlert className="w-3 h-3" />
              <span>Private Build v4.2.0 - Chapo Chavez Edition</span>
            </div>
            <h1 className="font-display text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter text-white">
              EL PODER <br />
              <span className="text-hacker-green glow-text">ABSOLUTO.</span>
            </h1>
            <p className="text-lg opacity-70 max-w-xl leading-relaxed mb-10 border-l-2 border-hacker-green/30 pl-6">
              IPRX no es solo un software; es la culminación de años de ingeniería inversa por parte de 
              <span className="text-white font-bold"> Chapo Chavez</span>. Diseñado específicamente para 
              dominar GTahub sin dejar rastro. Si buscas ser el mejor, necesitas la herramienta del mejor.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startQuiz}
                className="group relative bg-hacker-green text-hacker-dark px-10 py-5 font-display font-black text-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-3">
                  <Download className="w-6 h-6" />
                  OBTENER IPRX
                </span>
              </motion.button>
              
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-[10px] opacity-40 uppercase">Versión</span>
                  <span className="text-sm font-bold">4.2.0 (Stable)</span>
                </div>
                <div className="w-px h-8 bg-hacker-green/20" />
                <div className="flex flex-col">
                  <span className="text-[10px] opacity-40 uppercase">Update</span>
                  <span className="text-sm font-bold">Hace 2 horas</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-hacker-green/5 blur-3xl rounded-full" />
            <div className="relative bg-black/60 border border-hacker-green/20 p-8 rounded-lg glow-border backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6 border-b border-hacker-green/10 pb-4">
                <div className="flex items-center gap-3">
                  <Database className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-widest">Remote_Console_Stream</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-hacker-green/20" />
                  <div className="w-2 h-2 rounded-full bg-hacker-green/40" />
                  <div className="w-2 h-2 rounded-full bg-hacker-green/60" />
                </div>
              </div>
              <div className="space-y-3 font-mono text-[11px] leading-relaxed min-h-[280px]">
                {terminalLines.map((line, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-3"
                  >
                    <span className="text-hacker-green/40">[{i+1}]</span>
                    <span className={line && line.includes('SUCCESS') ? 'text-white' : ''}>{line}</span>
                  </motion.div>
                ))}
                <div className="w-2 h-4 bg-hacker-green animate-pulse inline-block align-middle ml-1" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="max-w-7xl mx-auto mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="font-display text-4xl font-bold mb-4">MÓDULOS DE ÉLITE</h2>
              <p className="opacity-50 max-w-md">Tecnología de vanguardia diseñada para la máxima ventaja competitiva.</p>
            </div>
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest opacity-40">
              <Globe className="w-4 h-4" />
              <span>Global Distribution Network</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {FEATURES.map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="group p-10 border border-hacker-green/10 bg-hacker-dim/5 hover:border-hacker-green/40 transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <f.icon className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <f.icon className="w-12 h-12 text-hacker-green mb-8" />
                  <h3 className="font-display text-2xl mb-4 text-white">{f.title}</h3>
                  <p className="opacity-60 mb-8 leading-relaxed">{f.desc}</p>
                  <div className="flex flex-wrap gap-3">
                    {f.details.map((d, j) => (
                      <span key={j} className="text-[9px] uppercase tracking-widest px-2 py-1 bg-hacker-green/10 border border-hacker-green/20">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Developer Section */}
        <section id="dev" className="max-w-7xl mx-auto mb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center bg-hacker-dim/5 border border-hacker-green/10 p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-hacker-green/50 to-transparent" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full border-2 border-hacker-green flex items-center justify-center text-2xl font-black bg-hacker-dark">
                  CC
                </div>
                <div>
                  <h3 className="font-display text-3xl font-bold text-white">CHAPO CHAVEZ</h3>
                  <p className="text-xs uppercase tracking-[0.4em] text-hacker-green">Architect & Visionary</p>
                </div>
              </div>
              <p className="text-xl italic opacity-80 leading-relaxed mb-8">
                "La perfección no es una meta, es un estándar. IPRX es el resultado de mi obsesión por el control 
                y la excelencia técnica. No solo juegas, dominas el entorno digital."
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-display font-bold text-white">99.9%</div>
                  <div className="text-[10px] uppercase opacity-40">Uptime Garantizado</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-white">0</div>
                  <div className="text-[10px] uppercase opacity-40">Detecciones en 2026</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-black/40 border border-hacker-green/10 flex items-center justify-center relative group overflow-hidden">
                <div className="absolute inset-0 bg-hacker-green/5 group-hover:bg-hacker-green/10 transition-colors" />
                <Lock className="w-16 h-16 opacity-20 group-hover:scale-110 transition-transform" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[9px] uppercase tracking-widest opacity-50">
                  <span>Encrypted_Media_Stream</span>
                  <span>Locked_by_Chapo</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-hacker-green/10 py-20 px-6 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="w-6 h-6" />
                <span className="font-display text-xl font-bold tracking-widest">IPRX PROJECT</span>
              </div>
              <p className="text-sm opacity-40 max-w-sm leading-relaxed">
                El software de asistencia más avanzado para GTahub. 
                Desarrollado con pasión y precisión por Chapo Chavez. 
                Uso bajo responsabilidad del usuario.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-white">Navegación</h4>
              <ul className="space-y-4 text-xs opacity-50">
                <li><a href="#" className="hover:text-hacker-green transition-colors">Inicio</a></li>
                <li><a href="#features" className="hover:text-hacker-green transition-colors">Módulos</a></li>
                <li><a href="#dev" className="hover:text-hacker-green transition-colors">Chapo Chavez</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-white">Legal</h4>
              <ul className="space-y-4 text-xs opacity-50">
                <li><a href="#" className="hover:text-hacker-green transition-colors">Términos</a></li>
                <li><a href="#" className="hover:text-hacker-green transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-hacker-green transition-colors">EULA</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-hacker-green/5 gap-6">
            <span className="text-[10px] opacity-30 uppercase tracking-widest">© 2026 IPRX SYSTEMS. ALL RIGHTS RESERVED.</span>
            <div className="flex items-center gap-2 text-[10px] opacity-30 uppercase tracking-widest">
              <span>Developed by</span>
              <span className="text-hacker-green font-bold">Chapo Chavez</span>
            </div>
          </div>
        </div>
      </footer>

      {/* --- Overlays / Modals --- */}

      <AnimatePresence>
        {step === 'quiz' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-hacker-dark/95 backdrop-blur-2xl p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-2xl w-full bg-black border-2 border-hacker-green p-12 glow-border relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-hacker-green/30" />
              
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3">
                  <UserCheck className="w-6 h-6" />
                  <h3 className="font-display text-xl font-bold tracking-widest uppercase">Verificación de Usuario</h3>
                </div>
                <div className="text-xs font-mono opacity-50">
                  PASO {quizIndex + 1} / {QUIZ_QUESTIONS.length}
                </div>
              </div>

              <div className="mb-12">
                <p className="text-2xl font-display mb-8 text-white leading-tight">
                  {QUIZ_QUESTIONS[quizIndex].question}
                </p>
                
                <div className="grid gap-4">
                  {QUIZ_QUESTIONS[quizIndex].options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ x: 10, backgroundColor: 'rgba(0, 255, 65, 0.1)' }}
                      onClick={() => handleQuizAnswer(opt)}
                      className="w-full text-left p-5 border border-hacker-green/20 hover:border-hacker-green transition-all flex items-center justify-between group"
                    >
                      <span className="text-sm uppercase tracking-widest">{opt}</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  ))}
                </div>
              </div>

              {quizError && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-12 left-12 right-12 bg-red-500/10 border border-red-500/50 p-4 text-center text-red-500 text-xs font-bold uppercase tracking-widest"
                >
                  <div className="flex items-center justify-center gap-2">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Respuesta Incorrecta. El sistema solo acepta la verdad absoluta.</span>
                  </div>
                </motion.div>
              )}

              <div className="text-[9px] opacity-30 uppercase tracking-[0.3em] text-center">
                Security Protocol enforced by Chapo Chavez
              </div>
            </motion.div>
          </motion.div>
        )}

        {step === 'downloading' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-hacker-dark/98 backdrop-blur-3xl p-6"
          >
            <div className="max-w-md w-full text-center">
              <h3 className="font-display text-3xl mb-12 glow-text">INJECTANDO IPRX_CORE</h3>
              
              <div className="relative h-2 bg-hacker-dim/30 rounded-full overflow-hidden mb-6 border border-hacker-green/20">
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-hacker-green shadow-[0_0_15px_#00ff41]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex justify-between text-xs font-mono mb-12">
                <span className="animate-pulse">PROCESANDO BLOQUES...</span>
                <span className="text-white">{Math.round(progress)}%</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-hacker-green/10 bg-hacker-dim/5">
                  <div className="text-[10px] opacity-40 mb-1">VELOCIDAD</div>
                  <div className="text-sm font-bold">4.2 MB/s</div>
                </div>
                <div className="p-4 border border-hacker-green/10 bg-hacker-dim/5">
                  <div className="text-[10px] opacity-40 mb-1">ESTADO</div>
                  <div className="text-sm font-bold">ENCRIPTANDO</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'prank' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-red-950/95 backdrop-blur-3xl p-6 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              className="max-w-3xl w-full bg-black border-8 border-red-600 p-16 text-center shadow-[0_0_100px_rgba(220,38,38,0.6)] relative"
            >
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(220,38,38,0.1)_2px,rgba(220,38,38,0.1)_4px)] pointer-events-none" />
              
              <AlertTriangle className="w-32 h-32 text-red-600 mx-auto mb-10 animate-bounce" />
              
              <h2 className="text-7xl md:text-9xl font-display font-black text-red-600 mb-8 italic tracking-tighter">
                ¡MANCO DETECTADO!
              </h2>
              
              <div className="space-y-6 mb-12">
                <p className="text-3xl font-display text-white leading-tight">
                  ¿En serio pensaste que <span className="text-red-500">Chapo Chavez</span> te daría sus secretos tan fácil?
                </p>
                <p className="text-xl opacity-70 font-mono">
                  Has fallado la prueba de honor. El sistema ha registrado tu intento de ser una rata.
                </p>
              </div>

              <div className="bg-red-600/10 border-2 border-red-600/40 p-8 mb-12 font-mono text-left relative">
                <div className="absolute top-0 right-0 p-2 text-[10px] bg-red-600 text-white font-bold">LOG_REPORT_#404</div>
                <p className="text-red-500 mb-2 font-bold uppercase tracking-widest">Análisis de Sujeto:</p>
                <ul className="space-y-2 text-red-200/80 text-sm">
                  <li>&gt; Intento de descarga: IPRX_CHEAT_v4.2.0</li>
                  <li>&gt; Nivel de habilidad: Negativo</li>
                  <li>&gt; Integridad moral: No encontrada</li>
                  <li>&gt; Recomendación: Desinstalar el juego y pedir perdón a Chapo.</li>
                </ul>
              </div>

              <div className="flex flex-col md:flex-row gap-6 justify-center">
                <button 
                  onClick={() => {
                    setStep('landing');
                    setQuizIndex(0);
                    setProgress(0);
                  }}
                  className="bg-red-600 text-white px-12 py-5 font-display font-black text-2xl hover:bg-white hover:text-red-600 transition-all shadow-lg"
                >
                  PROMETO JUGAR LIMPIO
                </button>
                <div className="flex items-center gap-4 px-8 py-5 border-2 border-red-600/30 text-red-500 font-bold uppercase tracking-widest">
                  <Trophy className="w-6 h-6" />
                  <span>Chapo Chavez Wins</span>
                </div>
              </div>

              <p className="mt-12 text-xs opacity-30 font-mono italic">
                Esta es una broma diseñada por Chapo Chavez. No te lo tomes en serio, pero deja de buscar cheats, crack.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
