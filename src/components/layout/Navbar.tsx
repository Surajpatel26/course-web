import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Home',        path: '/' },
    { name: 'Courses',     path: '/courses' },
    { name: 'Upcoming',    path: '/upcoming-courses' },
    { name: 'Testimonials',path: '/testimonials' },
    { name: 'Blog',        path: '/blog' },
    { name: 'About',       path: '/about' },
    { name: 'Contact',     path: '/contact' },
];

    export function Navbar() {
    const [isOpen, setIsOpen]   = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState<any>(null);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // close mobile menu on route change
    useEffect(() => { 
        setIsOpen(false); 
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
        }
    }, [location.pathname]);

    const isActive = (path: string) =>
        location.pathname === path;

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${
                scrolled
                    ? 'py-3'
                    : 'py-6'
            }`}
        >
            {/* Backdrop bar */}
            <div
                className={`absolute inset-0 transition-all duration-500 ${
                    scrolled
                        ? 'opacity-100'
                        : 'opacity-0'
                }`}
                style={{
                    background: 'rgba(2, 6, 23, 0.88)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    borderBottom: '1px solid rgba(6,182,212,0.1)',
                    boxShadow: '0 4px 40px rgba(0,0,0,0.4)',
                }}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14">

                    {/* ── Logo ── */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative w-9 h-9 flex items-center justify-center rounded-xl"
                            style={{
                                background: 'linear-gradient(135deg, #06b6d4, #6366f1, #a855f7)',
                                boxShadow: '0 0 20px rgba(6,182,212,0.4)',
                            }}>
                            <Zap className="w-5 h-5 text-white" />
                            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ background: 'rgba(6,182,212,0.2)' }} />
                        </div>
                        <span className="font-display font-black text-xl tracking-tighter text-white uppercase italic">
                            Course<span style={{ color: '#06b6d4' }}>Pro</span>
                        </span>
                    </Link>

                    {/* ── Desktop nav ── */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map(link => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="relative text-[10px] font-black uppercase tracking-[0.3em] transition-colors duration-300"
                                style={{ color: isActive(link.path) ? '#06b6d4' : 'rgba(248,250,252,0.35)' }}
                                onMouseEnter={e => { if (!isActive(link.path)) (e.currentTarget as HTMLElement).style.color = '#f8fafc'; }}
                                onMouseLeave={e => { if (!isActive(link.path)) (e.currentTarget as HTMLElement).style.color = 'rgba(248,250,252,0.35)'; }}
                            >
                                {link.name}
                                {isActive(link.path) && (
                                    <motion.span
                                        layoutId="nav-indicator"
                                        className="absolute -bottom-1 left-0 right-0 h-px"
                                        style={{ background: 'linear-gradient(90deg, transparent, #06b6d4, transparent)' }}
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* ── Desktop actions ── */}
                    <div className="hidden lg:flex items-center gap-4">
                        {user && (user.email || user.name) ? (
                            <Link to="/dashboard" className="flex items-center gap-4 group">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-brand-400 transition-colors">
                                    {user.name || 'Student'}
                                </span>
                                <div className="relative">
                                    <img 
                                        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'Student')}&background=06b6d4&color=fff`} 
                                        className="w-10 h-10 rounded-xl object-cover border border-white/10 group-hover:border-brand-500/50 transition-all font-bold"
                                        alt={user.name || 'Student'} 
                                        referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-brand-500 rounded-full border-2 border-[#020617] shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                                </div>
                            </Link>
                        ) : (
                            <>
                                <Link to="/login"
                                    className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white/80 transition-colors">
                                    Portal
                                </Link>
                                <Link to="/register"
                                    className="relative px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider text-white overflow-hidden"
                                    style={{
                                        background: 'linear-gradient(135deg, #06b6d4, #6366f1)',
                                        boxShadow: '0 0 20px rgba(6,182,212,0.3)',
                                    }}>
                                    Enroll Now
                                </Link>
                            </>
                        )}
                    </div>

                    {/* ── Mobile toggle ── */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-colors"
                        style={{ border: '1px solid rgba(6,182,212,0.15)', background: 'rgba(6,182,212,0.05)' }}>
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* ── Mobile menu ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -16, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -16, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden fixed inset-x-4 top-24 rounded-2xl overflow-hidden z-50"
                        style={{
                            background: 'rgba(2, 6, 23, 0.96)',
                            border: '1px solid rgba(6,182,212,0.15)',
                            backdropFilter: 'blur(40px)',
                            boxShadow: '0 20px 80px rgba(0,0,0,0.6), 0 0 40px rgba(6,182,212,0.08)',
                        }}>
                        {/* Top neon line */}
                        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #06b6d4, #a855f7, transparent)' }} />

                        <div className="p-6 space-y-1">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.04 }}>
                                    <Link
                                        to={link.path}
                                        className="block py-3 px-4 rounded-xl font-display font-black text-lg tracking-tight uppercase italic transition-all"
                                        style={{
                                            color: isActive(link.path) ? '#06b6d4' : 'rgba(248,250,252,0.4)',
                                            background: isActive(link.path) ? 'rgba(6,182,212,0.08)' : 'transparent',
                                        }}>
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}

                            <div className="pt-4 mt-4 space-y-3" style={{ borderTop: '1px solid rgba(6,182,212,0.08)' }}>
                                {user && (user.email || user.name) ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                            <img 
                                                src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'Student')}&background=06b6d4&color=fff`} 
                                                className="w-12 h-12 rounded-xl object-cover border border-white/10"
                                                alt={user.name || 'Student'} 
                                                referrerPolicy="no-referrer"
                                            />
                                            <div className="flex flex-col">
                                                <span className="text-white font-bold">{user.name || 'Student'}</span>
                                                <span className="text-white/40 text-[10px] uppercase tracking-widest">{user.role || 'Learner'}</span>
                                            </div>
                                        </div>
                                        <Link to="/dashboard"
                                            className="block w-full text-center py-4 rounded-xl text-white font-black text-sm uppercase tracking-wider"
                                            style={{ background: 'linear-gradient(135deg, #06b6d4, #6366f1, #a855f7)' }}>
                                            Go to Dashboard
                                        </Link>
                                    </div>
                                ) : (
                                    <>
                                        <Link to="/login"
                                            className="block w-full text-center py-3 rounded-xl text-white/40 font-black text-xs uppercase tracking-widest">
                                            Student Portal
                                        </Link>
                                        <Link to="/register"
                                            className="block w-full text-center py-4 rounded-xl text-white font-black text-sm uppercase tracking-wider"
                                            style={{ background: 'linear-gradient(135deg, #06b6d4, #6366f1, #a855f7)', boxShadow: '0 0 30px rgba(6,182,212,0.25)' }}>
                                            Join The Circle
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
