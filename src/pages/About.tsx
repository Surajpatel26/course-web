import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Play, X, Sparkles, GraduationCap, Heart, Zap, ExternalLink, Loader2 } from 'lucide-react';
import { api } from '../lib/api';

// Fallback assets
import img1Fallback from '../assets/WhatsApp Image 2024-02-07 at 4.21.06 PM.jpeg';
import img2Fallback from '../assets/WhatsApp Image 2025-06-24 at 4.52.09 PM.jpeg';
import img3Fallback from '../assets/flag hoisting pic8.jpeg';
import img4Fallback from '../assets/pic with students18.jpeg';
import img5Fallback from '../assets/pic with students7.jpeg';
import videoSrcFallback from '../assets/students vedios.mp4';
import codingAnnaLogo from '../assets/android-chrome-192x192.png';
import cyberInfoMinesLogo from '../assets/logo.png';

const values = [
  {
    icon: Sparkles,
    title: 'Innovation First',
    desc: 'Cutting-edge curriculum curated by the sharpest minds in their fields.',
    color: '#06b6d4',
  },
  {
    icon: GraduationCap,
    title: 'Expert-Led',
    desc: 'Every instructor is a practitioner with proven real-world experience.',
    color: '#a855f7',
  },
  {
    icon: Heart,
    title: 'Community Driven',
    desc: 'A thriving global community of 50K+ learners supporting each other.',
    color: '#6366f1',
  },
  {
    icon: Zap,
    title: 'Outcome Focused',
    desc: 'We measure success by your transformation, not just course completions.',
    color: '#06b6d4',
  },
];

// ─── Floating 3D particle field ─── (keep as is)
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;
    const resize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; };
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 800,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      color: ['#06b6d4', '#a855f7', '#6366f1'][Math.floor(Math.random() * 3)],
    }));

    let id: number;
    function draw() {
      ctx!.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        const depth = 800 / (800 + p.z);
        const r = depth * 2.5;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = depth * 0.6;
        ctx!.shadowColor = p.color;
        ctx!.shadowBlur = 6;
        ctx!.fill();
      });
      ctx!.globalAlpha = 1;
      id = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40" />;
}

// ─── Mouse-parallax tilt card wrapper ─── (keep as is)
function TiltCard({ children, className = '', depth = 1 }: { children: React.ReactNode; className?: string; depth?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8 * depth, -8 * depth]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8 * depth, 8 * depth]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function About() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [aboutData, setAboutData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const data = await api.get('/about');
        setAboutData(data);
      } catch (err) {
        console.error('Failed to fetch about data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAbout();
  }, []);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Section refs for stagger
  const valuesRef = useRef(null);
  const galleryRef = useRef(null);
  const videoRef = useRef(null);

  // Helper to get image with fallback
  const getImg = (key: string, fallback: string) => {
    return (aboutData && aboutData[key]) ? aboutData[key] : fallback;
  };

  const images = {
    img1: getImg('video_thumbnail', img1Fallback),
    img2: getImg('hero_img_main', img2Fallback),
    img3: getImg('video_mini_1', img3Fallback),
    img4: getImg('hero_img_bottom', img4Fallback),
    img5: getImg('hero_img_top', img5Fallback),
    videoSrc: getImg('video_url', videoSrcFallback),
    gallery1: getImg('gallery_img_1', img2Fallback),
    gallery2: getImg('gallery_img_2', img5Fallback),
    gallery3: getImg('gallery_img_3', img3Fallback),
    gallery4: getImg('gallery_img_4', img4Fallback),
    gallery5: getImg('gallery_img_5', img1Fallback),
    videoMini1: getImg('video_mini_1', img3Fallback),
    videoMini2: getImg('video_mini_2', img5Fallback),
    videoMini3: getImg('video_mini_3', img4Fallback),
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] overflow-x-hidden">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
        <ParticleField />

        {/* Ambient glows */}
        <motion.div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <motion.div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />

        {/* Animated scan line */}
        <motion.div className="absolute inset-x-0 h-px pointer-events-none"
          animate={{ y: ['-5vh', '95vh'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.6) 50%, transparent 100%)' }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-xs font-black uppercase tracking-widest text-cyan-400">About CoursePro</span>
              </div>

              <h1 className="text-5xl md:text-6xl xl:text-7xl font-display font-black leading-[0.95] tracking-tighter mb-8 whitespace-pre-line">
                {aboutData?.hero_title || 'Our Mission is to Democratize Education'}
              </h1>

              <p className="text-xl text-[var(--foreground)]/60 leading-relaxed max-w-xl mb-10">
                {aboutData?.hero_desc || 'We started CoursePro with a simple idea: everyone deserves access to world-class education. Today, we connect 50,000+ ambitious learners with elite industry experts across 120+ countries.'}
              </p>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setVideoOpen(true)}
                className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-slate-950"
                style={{ background: 'linear-gradient(135deg, #06b6d4, #6366f1)' }}
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                </div>
                Watch Our Story
              </motion.button>
            </motion.div>
          </div>

          {/* Right — stacked image collage */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative h-[520px]"
            style={{ perspective: 1000 }}
          >
            {/* Main large image */}
            <TiltCard className="absolute left-0 top-0 w-[70%] h-[65%]" depth={1.2}>
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-cyan-500/20 shadow-2xl"
                style={{ boxShadow: '0 0 60px rgba(6,182,212,0.15), 0 20px 60px rgba(0,0,0,0.5)' }}>
                <img src={images.img2} alt="Students learning" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/40 to-transparent" />
                {/* Corner badge */}
                <div className="absolute top-3 left-3 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 backdrop-blur-sm">
                  <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400">📍 Live Campus</span>
                </div>
              </div>
            </TiltCard>

            {/* Second image — bottom right overlap */}
            <TiltCard className="absolute right-0 bottom-0 w-[60%] h-[55%]" depth={0.9}>
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-purple-500/20 shadow-2xl"
                style={{ boxShadow: '0 0 60px rgba(168,85,247,0.15), 0 20px 60px rgba(0,0,0,0.5)' }}>
                <img src={images.img4} alt="Students with instructor" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tl from-slate-950/40 to-transparent" />
              </div>
            </TiltCard>

            {/* Third — small top right */}
            <TiltCard className="absolute right-4 top-4 w-[32%] h-[40%]" depth={1.5}>
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-indigo-500/20 shadow-xl"
                style={{ boxShadow: '0 0 40px rgba(99,102,241,0.2)' }}>
                <img src={images.img5} alt="Students" className="w-full h-full object-cover" />
              </div>
            </TiltCard>

            {/* Floating stat badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-2 bottom-8 z-10 px-4 py-3 rounded-2xl border border-cyan-500/30 bg-glass backdrop-blur-xl"
            >
              <div className="text-[9px] font-black uppercase tracking-widest text-cyan-400/70">Active Learners</div>
              <div className="text-2xl font-black text-cyan-400 font-mono">{aboutData?.stats_learners || '50K+'}</div>
            </motion.div>

            {/* Orbiting ring */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/10 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute -top-1.5 left-1/2 w-3 h-3 -translate-x-1/2 rounded-full bg-cyan-400"
                style={{ boxShadow: '0 0 12px #06b6d4' }} />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── VIDEO SECTION ── */}
      <section ref={videoRef} className="relative py-8 overflow-hidden">
        {/* Massive glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[800px] h-[800px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)', filter: 'blur(60px)' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Video thumbnail */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard depth={1.3}>
                <div
                  onClick={() => setVideoOpen(true)}
                  className="relative rounded-3xl overflow-hidden cursor-pointer group border border-indigo-500/20"
                  style={{ boxShadow: '0 0 80px rgba(99,102,241,0.2), 0 30px 80px rgba(0,0,0,0.5)' }}
                >
                  <img src={images.img1} alt="Video thumbnail" className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700" />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-20 h-20 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center"
                      style={{ boxShadow: '0 0 60px rgba(6,182,212,0.4)' }}
                      animate={{ boxShadow: ['0 0 40px rgba(6,182,212,0.3)', '0 0 80px rgba(6,182,212,0.6)', '0 0 40px rgba(6,182,212,0.3)'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </motion.div>
                  </div>

                  {/* Bottom label */}
                  <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-white/10 backdrop-blur-sm">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/70">🎬 Student Stories</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Live Community</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight leading-tight mb-5 whitespace-pre-line">
                  {aboutData?.mission_title || 'Join a thriving global community'}
                </h2>
                <p className="text-lg text-[var(--foreground)]/60 leading-relaxed">
                  {aboutData?.mission_desc || "Learning is better together. Our platform doesn't just offer video courses — it offers a rich community experience. Participate in live Q&As, join study groups, and network with peers from around the globe."}
                </p>
              </div>

              {/* Mini image row */}
              <div className="flex gap-3">
                {[images.videoMini1, images.videoMini2, images.videoMini3].map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 flex-1 aspect-square"
                    style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  </motion.div>
                ))}
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Live Q&A Sessions', value: '500+/mo', color: '#06b6d4' },
                  { label: 'Study Groups', value: '2,000+', color: '#a855f7' },
                ].map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="p-4 rounded-2xl bg-glass border"
                    style={{ borderColor: `${m.color}20` }}
                  >
                    <div className="text-2xl font-black" style={{ color: m.color }}>{m.value}</div>
                    <div className="text-xs text-[var(--foreground)]/50 font-medium mt-1">{m.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY ── */}
      <section ref={galleryRef} className="relative py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-4">
              Life at <span className="text-gradient">CoursePro</span>
            </h2>
            <p className="text-[var(--foreground)]/50 text-lg max-w-xl mx-auto">
              Real moments. Real learners. Real transformation.
            </p>
          </motion.div>

          {/* Masonry-style 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Col 1 */}
            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0 }}
              >
                <TiltCard depth={0.7}>
                  <div className="relative overflow-hidden rounded-3xl border border-cyan-500/15 group"
                    style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                    <img src={images.gallery1} alt="" className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <motion.div
                      className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-slate-950/80 border border-cyan-500/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    >
                      <span className="text-xs font-black text-cyan-400 uppercase tracking-widest">Student Success</span>
                    </motion.div>
                  </div>
                </TiltCard>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <TiltCard depth={0.6}>
                  <div className="relative overflow-hidden rounded-3xl border border-purple-500/15 group"
                    style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                    <img src={images.gallery2} alt="" className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </TiltCard>
              </motion.div>
            </div>

            {/* Col 2 — taller */}
            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="md:mt-8"
              >
                <TiltCard depth={1}>
                  <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 group"
                    style={{ boxShadow: '0 0 60px rgba(99,102,241,0.15), 0 30px 60px rgba(0,0,0,0.5)' }}>
                    <img src={images.gallery3} alt="" className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">🏳 Community Event</div>
                      <div className="text-white font-bold leading-tight">Flag Hoisting Ceremony</div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            </div>

            {/* Col 3 */}
            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.05 }}
              >
                <TiltCard depth={0.8}>
                  <div className="relative overflow-hidden rounded-3xl border border-cyan-500/15 group"
                    style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                    <img src={images.gallery4} alt="" className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </TiltCard>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {/* Video thumbnail card */}
                <TiltCard depth={1.1}>
                  <div
                    onClick={() => setVideoOpen(true)}
                    className="relative overflow-hidden rounded-3xl border border-purple-500/20 cursor-pointer group"
                    style={{ boxShadow: '0 0 50px rgba(168,85,247,0.15)' }}
                  >
                    <img src={images.gallery5} alt="" className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-slate-950/30 flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-14 h-14 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center"
                      >
                        <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                      </motion.div>
                    </div>
                    <div className="absolute bottom-3 left-3 px-2 py-1 rounded-lg bg-slate-950/80 border border-purple-500/20">
                      <span className="text-[9px] font-black uppercase tracking-widest text-purple-400">▶ Play Video</span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section ref={valuesRef} className="relative py-8 overflow-hidden border-t border-[var(--foreground)]/5">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <ParticleField />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-4">
              What We <span className="text-gradient">Stand For</span>
            </h2>
            <p className="text-[var(--foreground)]/50 text-lg max-w-xl mx-auto">
              Four principles that guide everything we build at CoursePro.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 50, rotateY: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard depth={1.2}>
                  <div className="h-full p-6 rounded-3xl bg-glass border border-[var(--foreground)]/5 group hover:border-opacity-30 transition-all duration-500 cursor-default"
                    style={{ '--glow': v.color } as React.CSSProperties}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${v.color}20`, boxShadow: `0 0 20px ${v.color}30` }}>
                      <v.icon className="w-6 h-6" style={{ color: v.color }} />
                    </div>
                    <h3 className="text-lg font-black mb-3 text-[var(--foreground)]">{v.title}</h3>
                    <p className="text-sm text-[var(--foreground)]/55 leading-relaxed">{v.desc}</p>

                    {/* Bottom glow bar */}
                    <motion.div
                      className="absolute bottom-0 inset-x-6 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(90deg, transparent, ${v.color}, transparent)` }}
                    />
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SISTER PLATFORMS ── */}
      <section className="relative py-8 overflow-hidden border-t border-[var(--foreground)]/5">
        <div className="absolute inset-0 mesh-gradient opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-4">
              Part of Our <span className="text-gradient">Ecosystem</span>
            </h2>
            <p className="text-[var(--foreground)]/50 text-lg max-w-2xl mx-auto">
              CoursePro is proud to be part of a larger family of educational platforms. Explore our specialized organizations dedicated to technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Coding Anna */}
            <motion.a
              href="https://codinganna.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <TiltCard depth={0.8} className="h-full">
                <div className="h-full p-8 rounded-3xl bg-glass border border-cyan-500/20 hover:border-cyan-500/50 transition-colors duration-500 overflow-hidden text-center flex flex-col items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-500/20" style={{ boxShadow: '0 0 30px rgba(6,182,212,0.2)' }}>
                    <img src={codingAnnaLogo} alt="Coding Anna" className="w-10 h-10 object-contain" />
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-[var(--foreground)] flex items-center gap-2">
                    CodingAnna
                    <ExternalLink className="w-5 h-5 text-cyan-400 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </h3>
                  <p className="text-[var(--foreground)]/60">
                    Your ultimate destination for mastering programming, algorithms, and software development.
                  </p>
                </div>
              </TiltCard>
            </motion.a>

            {/* Cyber Info Mines */}
            <motion.a
              href="https://cyberinfomines.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <TiltCard depth={0.8} className="h-full">
                <div className="h-full p-8 rounded-3xl bg-glass border border-purple-500/20 hover:border-purple-500/50 transition-colors duration-500 overflow-hidden text-center flex flex-col items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20" style={{ boxShadow: '0 0 30px rgba(168,85,247,0.2)' }}>
                    <img src={cyberInfoMinesLogo} alt="Cyber Info Mines" className="w-10 h-10 object-contain" />
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-[var(--foreground)] flex items-center gap-2">
                    Cyberinfomines
                    <ExternalLink className="w-5 h-5 text-purple-400 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </h3>
                  <p className="text-[var(--foreground)]/60">
                    Leading the frontier in cybersecurity education, ethical hacking, and advanced digital forensics.
                  </p>
                </div>
              </TiltCard>
            </motion.a>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="relative py-8 overflow-hidden border-t border-[var(--foreground)]/5">
        <motion.div className="absolute inset-0"
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          style={{
            background: 'linear-gradient(135deg, rgba(6,182,212,0.06) 0%, rgba(99,102,241,0.08) 50%, rgba(168,85,247,0.06) 100%)',
            backgroundSize: '200% 200%'
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-6">
              Ready to start your<br />
              <span className="text-gradient">learning journey?</span>
            </h2>
            <p className="text-[var(--foreground)]/60 mb-10 text-lg">
              Join 50,000+ learners already transforming their careers with CoursePro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/courses"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-2xl font-black text-slate-950 text-base"
                style={{ background: 'linear-gradient(135deg, #06b6d4, #6366f1)' }}
              >
                Explore Courses
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-2xl font-black text-[var(--foreground)] border border-[var(--foreground)]/15 bg-glass"
              >
                Contact Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── VIDEO MODAL ── */}
      {videoOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ background: 'rgba(2,6,23,0.95)', backdropFilter: 'blur(20px)' }}
          onClick={() => setVideoOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.2 }}
            className="relative w-full max-w-4xl rounded-3xl overflow-hidden border border-white/10"
            style={{ boxShadow: '0 0 100px rgba(6,182,212,0.2), 0 40px 120px rgba(0,0,0,0.7)' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-950/80 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <video
              src={images.videoSrc}
              controls
              autoPlay
              className="w-full aspect-video bg-black"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
