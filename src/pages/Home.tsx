import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    ArrowRight, PlayCircle, Zap, Shield, Globe, TrendingUp
} from 'lucide-react';
import { CourseCard, type Course } from '../components/ui/CourseCard';
import { TestimonialCard, type Testimonial } from '../components/ui/TestimonialCard';
import { api } from '../lib/api';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { LogoMarquee } from '../components/ui/LogoMarquee';
import { MotionGraphic } from '../components/ui/MotionGraphic';
import { CryptoHero3D } from '../components/ui/CryptoHero3D';

/* ─── Typing animation hook ─── */
function useTypingEffect(words: string[], speed = 80, pause = 2200) {
    const [display, setDisplay] = useState('');
    const [wIdx, setWIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const word = words[wIdx];
        let timeout: ReturnType<typeof setTimeout>;

        if (!deleting && charIdx <= word.length) {
            timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
            setDisplay(word.slice(0, charIdx));
        } else if (!deleting && charIdx > word.length) {
            timeout = setTimeout(() => setDeleting(true), pause);
        } else if (deleting && charIdx >= 0) {
            timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
            setDisplay(word.slice(0, charIdx));
        } else {
            setDeleting(false);
            setWIdx(i => (i + 1) % words.length);
        }
        return () => clearTimeout(timeout);
    }, [charIdx, deleting, wIdx, words, speed, pause]);

    return display;
}

/* ─── Floating particles canvas ─── */
function ParticleCanvas() {
    const ref = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d')!;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const pts = Array.from({ length: 60 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 1.5 + 0.5,
            color: Math.random() > 0.5 ? '#06b6d4' : '#a855f7',
        }));

        let id: number;
        function draw() {
            ctx.clearRect(0, 0, canvas!.width, canvas!.height);
            pts.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > canvas!.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas!.height) p.vy *= -1;

                ctx.save();
                ctx.globalAlpha = 0.5;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 8;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });

            // Connections
            pts.forEach((a, i) => pts.slice(i + 1).forEach(b => {
                const d = Math.hypot(a.x - b.x, a.y - b.y);
                if (d < 100) {
                    ctx.save();
                    ctx.globalAlpha = (1 - d / 100) * 0.12;
                    ctx.strokeStyle = '#06b6d4';
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                    ctx.restore();
                }
            }));
            id = requestAnimationFrame(draw);
        }
        draw();
        return () => cancelAnimationFrame(id);
    }, []);

    return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

/* ─── Neon stat card ─── */
function NeonStatCard({ label, value, suffix, color, delay }: {
    label: string; value: number; suffix: string; color: string; delay: number;
}) {
    const glowMap: Record<string, string> = {
        cyan: '#06b6d4',
        purple: '#a855f7',
        indigo: '#6366f1',
        violet: '#8b5cf6',
    };
    const glow = glowMap[color] ?? '#06b6d4';

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.8 }}
            whileHover={{ scale: 1.04, y: -4 }}
            className="relative group flex-1 min-w-[200px] flex flex-col items-center py-10 px-6 rounded-2xl cursor-default"
            style={{
                background: 'rgba(2, 6, 23, 0.6)',
                border: `1px solid ${glow}25`,
                backdropFilter: 'blur(20px)',
                boxShadow: `0 0 40px ${glow}10`,
                transition: 'box-shadow 0.4s',
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 60px ${glow}30`)}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 40px ${glow}10`)}
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-24"
                style={{ background: `linear-gradient(90deg, transparent, ${glow}, transparent)` }} />
            <div className="text-5xl lg:text-6xl font-black font-mono mb-3"
                style={{ color: glow, textShadow: `0 0 30px ${glow}80` }}>
                <AnimatedCounter value={value} suffix={suffix} />
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">{label}</div>
        </motion.div>
    );
}

/* ─── Feature card ─── */
function FeatureCard({ icon: Icon, title, desc, glow, delay }: {
    icon: React.ElementType; title: string; desc: string; glow: string; delay: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.7 }}
            whileHover={{ y: -8 }}
            className="group relative rounded-2xl p-8 overflow-hidden"
            style={{
                background: 'rgba(2, 6, 23, 0.7)',
                border: `1px solid ${glow}20`,
                backdropFilter: 'blur(20px)',
            }}
        >
            <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${glow}60, transparent)` }} />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: `radial-gradient(circle at 50% 0%, ${glow}08, transparent 70%)` }} />

            <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center"
                    style={{ background: `${glow}15`, border: `1px solid ${glow}30`, boxShadow: `0 0 20px ${glow}20` }}>
                    <Icon className="w-7 h-7" style={{ color: glow }} />
                </div>
                <h3 className="text-xl font-black text-white mb-3 tracking-tight">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed font-medium">{desc}</p>
            </div>

            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
                <ArrowRight className="w-5 h-5" style={{ color: glow }} />
            </div>
        </motion.div>
    );
}

/* ─── Main Home ─── */
export function Home() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    const typingText = useTypingEffect(['Mastery.', 'Excellence.', 'Innovation.', 'Leadership.']);

    useEffect(() => {
        const fetch = async () => {
            try {
                const [c, t] = await Promise.all([api.get<Course[]>('/courses'), api.get<Testimonial[]>('/testimonials')]);
                setCourses(c);
                setTestimonials(t);
            } catch { /* silent */ }
        };
        fetch();
    }, []);

    return (
        <div className="flex flex-col min-h-screen" style={{ background: '#020617' }}>

            {/* ═══════════ HERO SECTION ═══════════ */}
            <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
                {/* Dark particle canvas */}
                <div className="absolute inset-0 z-0">
                    <ParticleCanvas />
                </div>

                {/* Radial neon glows */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
                    <motion.div animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                        className="absolute -bottom-20 -right-20 w-[600px] h-[600px] rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
                    <motion.div animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />
                </div>

                {/* Grid overlay */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.025] z-0" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#06b6d4" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hero-grid)" />
                </svg>

                {/* Animated scan line */}
                <motion.div animate={{ y: ['-5%', '105%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
                    className="absolute inset-x-0 z-10 pointer-events-none h-[2px]"
                    style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.4) 50%, transparent 100%)' }} />

                <motion.div style={{ y: heroY, opacity: heroOpacity }}
                    className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 pt-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

                        {/* ── Left: Text ── */}
                        <div>
                            {/* Live badge */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="inline-flex items-center gap-3 mb-8 px-5 py-2.5 rounded-full"
                                style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.25)', backdropFilter: 'blur(12px)' }}>
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Elite Educational Platform</span>
                            </motion.div>

                            {/* Headline */}
                            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="font-display font-black leading-[0.92] tracking-tighter mb-8"
                                style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', color: '#f8fafc' }}>
                                The Future Of
                                <br />
                                <span style={{
                                    background: 'linear-gradient(135deg, #06b6d4, #6366f1 50%, #a855f7)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    filter: 'drop-shadow(0 0 30px rgba(6,182,212,0.4))',
                                    display: 'inline-block',
                                    minHeight: '1.1em',
                                }}>
                                    {typingText || '\u00A0'}
                                    <motion.span
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ duration: 0.55, repeat: Infinity }}
                                        style={{ WebkitTextFillColor: '#06b6d4' }}>|</motion.span>
                                </span>
                            </motion.h1>

                            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="text-lg md:text-xl text-white/40 mb-12 max-w-lg leading-relaxed font-medium">
                                Experience a curriculum curated for visionaries. Master elite skills with industry leaders through a professional-grade learning ecosystem.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.45 }}
                                className="flex flex-col sm:flex-row gap-4">
                                <Link to="/courses"
                                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-black text-base overflow-hidden"
                                    style={{ background: 'linear-gradient(135deg, #06b6d4, #6366f1)', boxShadow: '0 0 40px rgba(6,182,212,0.3)', color: '#fff' }}>
                                    <span className="relative z-10 flex items-center gap-3">
                                        Start Journey
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{ background: 'linear-gradient(135deg, #0891b2, #4f46e5)' }} />
                                </Link>

                                <Link to="/upcoming-courses"
                                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-black text-base text-white/70 hover:text-white transition-colors"
                                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}>
                                    <PlayCircle className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                                    Sneak Peek
                                </Link>
                            </motion.div>

                            {/* Floating mini stats */}
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="flex items-center gap-8 mt-12 pt-8"
                                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                {[
                                    { val: '50K+', label: 'Students', color: '#06b6d4' },
                                    { val: '120+', label: 'Courses', color: '#a855f7' },
                                    { val: '99%', label: 'Success', color: '#6366f1' },
                                ].map((s, i) => (
                                    <div key={i}>
                                        <div className="text-2xl font-black font-mono" style={{ color: s.color }}>{s.val}</div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-white/30">{s.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* ── Right: 3D Hero Visual ── */}
                        <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, delay: 0.2 }}
                            className="hidden lg:block">
                            <CryptoHero3D />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
                    <div className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">Scroll</div>
                    <div className="w-px h-10 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <motion.div animate={{ y: ['-100%', '200%'] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-x-0 h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #06b6d4)' }} />
                    </div>
                </motion.div>
            </section>

            {/* ═══════════ STATS BAR ═══════════ */}
            <section className="relative z-20 py-1"
                style={{ background: 'linear-gradient(180deg, #020617 0%, #030820 100%)', borderTop: '1px solid rgba(6,182,212,0.08)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-around gap-4 py-4"
                        style={{ borderRadius: 24 }}>
                        <NeonStatCard label="Active Scholars" value={10000} suffix="+" color="cyan" delay={0} />
                        <NeonStatCard label="Premium Modules" value={120} suffix="+" color="purple" delay={0.1} />
                        <NeonStatCard label="Elite Mentors" value={50} suffix="+" color="indigo" delay={0.2} />
                        <NeonStatCard label="Graduation Rate" value={99} suffix="%" color="violet" delay={0.3} />
                    </motion.div>
                </div>
            </section>

            {/* ═══════════ FEATURED COURSES ═══════════ */}
            <section className="py-8" style={{ background: '#030820' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-6">
                        <div>
                            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                                className="text-[10px] font-black uppercase tracking-[0.4em] mb-4"
                                style={{ color: '#06b6d4' }}>
                                Exceptional Learning
                            </motion.div>
                            <motion.h2 initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                                className="font-display font-black tracking-tighter leading-none text-white"
                                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
                                Elite{' '}
                                <span style={{
                                    background: 'linear-gradient(135deg, #06b6d4, #a855f7)',
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                                }}>
                                    Curriculum
                                </span>
                            </motion.h2>
                        </div>
                        <Link to="/courses"
                            className="group flex items-center gap-3 font-black text-sm uppercase tracking-widest text-white/30 hover:text-cyan-400 transition-colors pb-2"
                            style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            Explore All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.slice(0, 3).map((course, i) => (
                            <motion.div key={course.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12, duration: 0.7 }}
                                whileHover={{ y: -6 }}>
                                <CourseCard course={course} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ PHILOSOPHY / MOTION GRAPHIC ═══════════ */}
            <section className="py-8 relative overflow-hidden"
                style={{ background: 'linear-gradient(180deg, #030820 0%, #020617 100%)' }}>
                {/* ambient glow */}
                <div className="absolute inset-y-0 left-0 w-1/2 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(6,182,212,0.05) 0%, transparent 60%)' }} />
                <div className="absolute inset-y-0 right-0 w-1/2 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(168,85,247,0.05) 0%, transparent 60%)' }} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }} transition={{ duration: 1 }}>
                            <div className="h-px w-16 mb-10" style={{ background: 'linear-gradient(90deg, #06b6d4, transparent)' }} />
                            <h2 className="font-display font-black tracking-tighter leading-[0.92] text-white mb-8 italic"
                                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
                                Excellence <br />
                                Is Not An Act,<br />
                                <span style={{ color: '#06b6d4', textShadow: '0 0 40px rgba(6,182,212,0.5)' }}>But A Habit.</span>
                            </h2>
                            <p className="text-lg text-white/35 mb-12 leading-relaxed max-w-md font-medium">
                                We transform ordinary potential into extraordinary legacy. Our philosophy centres on technical rigor and creative depth.
                            </p>
                            <div className="grid grid-cols-2 gap-8 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                {[{ n: '99.2%', l: 'Academic Excellence', c: '#06b6d4' }, { n: '500+', l: 'Global Partnerships', c: '#a855f7' }].map((s, i) => (
                                    <div key={i}>
                                        <div className="font-display font-black text-3xl mb-1" style={{ color: s.c }}>{s.n}</div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-white/25">{s.l}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }} transition={{ duration: 1.2 }}
                            className="relative aspect-square max-w-[500px] mx-auto rounded-3xl overflow-hidden"
                            style={{
                                background: 'rgba(2, 6, 23, 0.8)',
                                border: '1px solid rgba(6,182,212,0.15)',
                                boxShadow: '0 0 80px rgba(6,182,212,0.1), 0 0 40px rgba(168,85,247,0.05)',
                            }}>
                            <div className="absolute top-0 left-0 right-0 h-px"
                                style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.6), transparent)' }} />
                            <div className="p-8 w-full h-full flex items-center justify-center">
                                <MotionGraphic />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════ FEATURES ═══════════ */}
            <section className="py-8" style={{ background: '#020617' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-[10px] font-black uppercase tracking-[0.4em] mb-4" style={{ color: '#a855f7' }}>
                            Why Choose Us
                        </motion.div>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="font-display font-black tracking-tighter text-white"
                            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                            The{' '}
                            <span style={{
                                background: 'linear-gradient(135deg, #06b6d4, #6366f1 60%, #a855f7)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                            }}>Advantage</span>
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Globe, title: 'Global Faculty', desc: 'Direct access to practitioners from top-tier tech environments worldwide.', glow: '#06b6d4', delay: 0 },
                            { icon: Zap, title: 'Modern Stack', desc: 'Curriculum synchronised with real-time industry demands and cutting-edge tools.', glow: '#a855f7', delay: 0.1 },
                            { icon: Shield, title: 'Elite Network', desc: 'Verified accomplishments recognised by world-class leaders and institutions.', glow: '#6366f1', delay: 0.2 },
                            { icon: TrendingUp, title: 'Core Projects', desc: 'Professional-level builds that define your creative caliber and career path.', glow: '#8b5cf6', delay: 0.3 },
                        ].map((f, i) => <FeatureCard key={i} {...f} />)}
                    </div>
                </div>
            </section>

            {/* ═══════════ TESTIMONIALS ═══════════ */}
            <section className="py-8 relative overflow-hidden"
                style={{ background: 'linear-gradient(180deg, #020617 0%, #030820 100%)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.04) 0%, transparent 60%)' }} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-8">
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="font-display font-black tracking-tighter text-white"
                            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                            Student{' '}
                            <span style={{
                                background: 'linear-gradient(135deg, #06b6d4, #a855f7)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                            }}>Voices</span>
                        </motion.h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <motion.div key={t.id}
                                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -6 }}>
                                <TestimonialCard testimonial={t} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ LOGO MARQUEE ═══════════ */}
            <section className="py-8 overflow-hidden"
                style={{ background: '#020617', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Global Affiliations</p>
                </div>
                <LogoMarquee />
            </section>

            {/* ═══════════ FINAL CTA ═══════════ */}
            <section className="relative py-12 overflow-hidden"
                style={{ background: '#030820', borderTop: '1px solid rgba(6,182,212,0.08)' }}>
                {/* Neon background effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 right-0 h-px"
                        style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.5), rgba(168,85,247,0.5), transparent)' }} />
                    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)', filter: 'blur(40px)' }} />
                    <motion.div animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
                        className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)', filter: 'blur(30px)' }} />
                </div>

                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="text-[10px] font-black uppercase tracking-[0.5em] mb-6" style={{ color: '#06b6d4' }}>
                        Begin Today
                    </div>
                    <h2 className="font-display font-black tracking-tighter leading-[0.9] text-white mb-8 italic"
                        style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}>
                        Legacy<br />
                        <span style={{
                            background: 'linear-gradient(135deg, #06b6d4 0%, #6366f1 50%, #a855f7 100%)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                            filter: 'drop-shadow(0 0 30px rgba(6,182,212,0.3))',
                        }}>
                            Starts Here.
                        </span>
                    </h2>
                    <p className="text-lg text-white/30 mb-14 max-w-xl mx-auto leading-relaxed font-medium">
                        Join the elite circle of individuals who are architecting the future of digital mastery.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                        <Link to="/courses"
                            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-lg text-white overflow-hidden"
                            style={{ background: 'linear-gradient(135deg, #06b6d4, #6366f1, #a855f7)', boxShadow: '0 0 60px rgba(6,182,212,0.3)' }}
                            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 80px rgba(6,182,212,0.5)')}
                            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 60px rgba(6,182,212,0.3)')}>
                            Apply Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/contact"
                            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-lg text-white/60 hover:text-white transition-colors"
                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}>
                            Inquire More
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
