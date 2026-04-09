import { Link } from 'react-router-dom';
import { Zap, Twitter, Linkedin, Github, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const cols = [
    {
        head: 'Explore',
        links: [
            { label: 'All Courses',     to: '/courses' },
            { label: 'Upcoming',        to: '/upcoming-courses' },
            { label: 'Blog',            to: '/blog' },
            { label: 'Testimonials',    to: '/testimonials' },
            { label: 'About Us',        to: '/about' },
        ],
    },
    {
        head: 'Platform',
        links: [
            { label: 'Student Portal',  to: '/login' },
            { label: 'Dashboard',       to: '/dashboard' },
            { label: 'Register',        to: '/register' },
            { label: 'Book Demo',       to: '/book-demo' },
        ],
    },
    {
        head: 'Legal',
        links: [
            { label: 'Terms of Service',to: '#' },
            { label: 'Privacy Policy',  to: '#' },
            { label: 'Cookie Policy',   to: '#' },
        ],
    },
];

const socials = [
    { icon: Twitter,  href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github,   href: '#', label: 'GitHub' },
];

export function Footer() {
    return (
        <footer
            className="relative overflow-hidden pt-20 pb-8"
            style={{
                background: '#020617',
                borderTop: '1px solid rgba(6,182,212,0.08)',
            }}
        >
            {/* Ambient glow */}
            <div
                className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse, rgba(6,182,212,0.05) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                }}
            />
            {/* Top neon line */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.4), rgba(168,85,247,0.4), transparent)' }}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

                    {/* Brand col */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link to="/" className="flex items-center gap-3 group w-fit">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{
                                    background: 'linear-gradient(135deg, #06b6d4, #6366f1, #a855f7)',
                                    boxShadow: '0 0 20px rgba(6,182,212,0.35)',
                                }}>
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-display font-black text-2xl tracking-tighter text-white uppercase italic">
                                Course<span style={{ color: '#06b6d4' }}>Pro</span>
                            </span>
                        </Link>

                        <p className="text-white/35 text-sm leading-relaxed max-w-xs font-medium">
                            Empowering visionaries worldwide with premium courses, elite mentors, and a professional-grade learning ecosystem.
                        </p>

                        {/* Newsletter */}
                        <form
                            onSubmit={e => e.preventDefault()}
                            className="flex gap-2 max-w-sm">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-xl text-white text-sm font-medium placeholder:text-white/20 focus:outline-none transition-all"
                                style={{
                                    background: 'rgba(6,182,212,0.05)',
                                    border: '1px solid rgba(6,182,212,0.15)',
                                }}
                                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(6,182,212,0.5)')}
                                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(6,182,212,0.15)')}
                            />
                            <button
                                type="submit"
                                className="px-4 py-3 rounded-xl text-white transition-all"
                                style={{
                                    background: 'linear-gradient(135deg, #06b6d4, #6366f1)',
                                    boxShadow: '0 0 15px rgba(6,182,212,0.3)',
                                }}>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </form>

                        {/* Socials */}
                        <div className="flex gap-3">
                            {socials.map(({ icon: Icon, href, label }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    whileHover={{ y: -2 }}
                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white/30 hover:text-white transition-colors"
                                    style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}>
                                    <Icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {cols.map(col => (
                        <div key={col.head}>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.35em] mb-5"
                                style={{ color: '#06b6d4' }}>
                                {col.head}
                            </h4>
                            <ul className="space-y-3">
                                {col.links.map(({ label, to }) => (
                                    <li key={label}>
                                        <Link
                                            to={to}
                                            className="text-sm font-medium text-white/30 hover:text-white transition-colors">
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div
                    className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 text-xs font-medium"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    <span>© {new Date().getFullYear()} CoursePro Inc. All rights reserved.</span>
                    <div className="flex items-center gap-2">
                        <span>Built with</span>
                        <span style={{ color: '#06b6d4' }}>React</span>
                        <span>&</span>
                        <span style={{ color: '#a855f7' }}>Tailwind</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
