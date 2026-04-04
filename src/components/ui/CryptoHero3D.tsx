import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FloatingCard {
    title: string;
    sub: string;
    value: string;
    color: string;
    glow: string;
    delay: number;
    rotateX: number;
    rotateY: number;
    translateZ: number;
    left: string;
    top: string;
    icon: string;
}

const cards: FloatingCard[] = [
    {
        title: 'Active Learners',
        sub: 'Live right now',
        value: '12,847',
        color: 'from-cyan-500/20 to-blue-600/20',
        glow: '#06b6d4',
        delay: 0,
        rotateX: 8,
        rotateY: -12,
        translateZ: 40,
        left: '0%',
        top: '10%',
        icon: '⚡',
    },
    {
        title: 'Courses Completed',
        sub: 'This month',
        value: '3,210',
        color: 'from-purple-500/20 to-violet-600/20',
        glow: '#a855f7',
        delay: 0.3,
        rotateX: -6,
        rotateY: 10,
        translateZ: 60,
        left: '55%',
        top: '0%',
        icon: '🎓',
    },
    {
        title: 'Success Rate',
        sub: 'All-time average',
        value: '99.2%',
        color: 'from-indigo-500/20 to-brand-600/20',
        glow: '#6366f1',
        delay: 0.6,
        rotateX: 10,
        rotateY: 8,
        translateZ: 20,
        left: '30%',
        top: '55%',
        icon: '📈',
    },
];

export function CryptoHero3D() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
            const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

            el.querySelectorAll<HTMLElement>('[data-depth]').forEach((card) => {
                const depth = parseFloat(card.dataset.depth || '1');
                card.style.transform = `perspective(1200px) rotateY(${x * 10 * depth}deg) rotateX(${-y * 7 * depth}deg) translateZ(${depth * 20}px)`;
            });
        };

        const handleLeave = () => {
            el.querySelectorAll<HTMLElement>('[data-depth]').forEach((card) => {
                card.style.transform = '';
            });
        };

        el.addEventListener('mousemove', handleMove);
        el.addEventListener('mouseleave', handleLeave);
        return () => {
            el.removeEventListener('mousemove', handleMove);
            el.removeEventListener('mouseleave', handleLeave);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[520px] lg:h-[600px] select-none"
            style={{ perspective: '1200px' }}
        >
            {/* Background ambient glows */}
            <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full"
                style={{
                    background: 'radial-gradient(ellipse at 40% 40%, rgba(6,182,212,0.15) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                }}
            />
            <motion.div
                animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute inset-0 rounded-full"
                style={{
                    background: 'radial-gradient(ellipse at 70% 60%, rgba(168,85,247,0.15) 0%, transparent 70%)',
                    filter: 'blur(50px)',
                }}
            />

            {/* Grid lines */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="crypto-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#06b6d4" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#crypto-grid)" />
            </svg>

            {/* Animated scan line */}
            <motion.div
                animate={{ y: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                className="absolute inset-x-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.5), transparent)' }}
            />

            {/* 3D Cards */}
            {cards.map((card, i) => (
                <motion.div
                    key={i}
                    data-depth={(1 + i * 0.3).toString()}
                    initial={{ opacity: 0, y: 60, rotateX: card.rotateX }}
                    animate={{ opacity: 1, y: [0, -10, 0] }}
                    transition={{
                        opacity: { delay: card.delay, duration: 0.8 },
                        y: { delay: card.delay, duration: 4 + i, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    className="absolute crypto-card"
                    style={{
                        left: card.left,
                        top: card.top,
                        width: '200px',
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.3s ease',
                    }}
                >
                    <div
                        className={`relative rounded-2xl p-5 bg-gradient-to-br ${card.color} border`}
                        style={{
                            borderColor: `${card.glow}30`,
                            backdropFilter: 'blur(20px)',
                            backgroundColor: 'rgba(2, 6, 23, 0.8)',
                            boxShadow: `0 0 40px ${card.glow}20, inset 0 1px 0 ${card.glow}20`,
                        }}
                    >
                        {/* Glow top border */}
                        <div
                            className="absolute top-0 left-4 right-4 h-px"
                            style={{ background: `linear-gradient(90deg, transparent, ${card.glow}80, transparent)` }}
                        />

                        <div className="flex items-center justify-between mb-3">
                            <span className="text-lg">{card.icon}</span>
                            <span
                                className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full"
                                style={{ color: card.glow, background: `${card.glow}15`, border: `1px solid ${card.glow}30` }}
                            >
                                LIVE
                            </span>
                        </div>

                        <div className="font-mono font-black text-2xl text-white mb-1"
                            style={{ textShadow: `0 0 20px ${card.glow}80` }}>
                            {card.value}
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40">{card.title}</div>
                        <div className="text-[9px] text-white/20 mt-1">{card.sub}</div>

                        {/* Animated bar */}
                        <div className="mt-3 h-1 rounded-full" style={{ background: `${card.glow}20` }}>
                            <motion.div
                                animate={{ width: ['30%', '90%', '60%', '80%', '30%'] }}
                                transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
                                className="h-full rounded-full"
                                style={{ background: `linear-gradient(90deg, ${card.glow}, ${card.glow}50)`, boxShadow: `0 0 8px ${card.glow}` }}
                            />
                        </div>
                    </div>
                </motion.div>
            ))}

            {/* Central 3D Sphere */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    style={{ transformStyle: 'preserve-3d', width: 120, height: 120 }}
                >
                    {/* Sphere rings */}
                    {[0, 30, 60, 90].map((angle, i) => (
                        <div
                            key={i}
                            className="absolute inset-0 rounded-full border"
                            style={{
                                borderColor: i % 2 === 0 ? 'rgba(6,182,212,0.3)' : 'rgba(168,85,247,0.3)',
                                transform: `rotateY(${angle}deg)`,
                                boxShadow: `0 0 15px ${i % 2 === 0 ? 'rgba(6,182,212,0.2)' : 'rgba(168,85,247,0.2)'}`,
                            }}
                        />
                    ))}
                    {/* Sphere core */}
                    <div
                        className="absolute inset-4 rounded-full"
                        style={{
                            background: 'radial-gradient(circle at 35% 35%, rgba(6,182,212,0.9), rgba(99,102,241,0.7), rgba(168,85,247,0.5))',
                            boxShadow: '0 0 60px rgba(6,182,212,0.5), 0 0 30px rgba(168,85,247,0.3)',
                        }}
                    />
                </motion.div>
            </div>

            {/* Orbiting dots */}
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={`orbit-${i}`}
                    className="absolute left-1/2 top-1/2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8 + i * 3, repeat: Infinity, ease: 'linear', delay: i * 2 }}
                    style={{ width: 200 + i * 60, height: 200 + i * 60, marginLeft: -(100 + i * 30), marginTop: -(100 + i * 30) }}
                >
                    <div
                        className="absolute rounded-full"
                        style={{
                            width: 8,
                            height: 8,
                            top: '0%',
                            left: '50%',
                            marginLeft: -4,
                            background: ['#06b6d4', '#a855f7', '#6366f1'][i],
                            boxShadow: `0 0 15px ${['#06b6d4', '#a855f7', '#6366f1'][i]}`,
                        }}
                    />
                </motion.div>
            ))}
        </div>
    );
}
