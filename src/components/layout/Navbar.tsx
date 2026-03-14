import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Webinars', path: '/webinars' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--glass-border)] shadow-lg'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-gradient-to-br from-brand-400 to-blue-500 p-2 rounded-xl group-hover:scale-105 transition-transform">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-display font-bold text-2xl tracking-tight text-[var(--foreground)]">
                            Course<span className="text-brand-500">Pro</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-medium transition-colors hover:text-brand-500 ${location.pathname === link.path ? 'text-brand-500' : 'text-[var(--foreground)]/70 hover:text-[var(--foreground)]'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/book-demo"
                            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-500 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-brand-500/25 transition-all transform hover:-translate-y-0.5"
                        >
                            Book a Demo
                        </Link>
                    </nav>

                    <div className="hidden lg:flex items-center gap-4">
                        <ThemeToggle />
                        <Link to="/login" className="text-[var(--foreground)]/70 hover:text-[var(--foreground)] font-medium transition-colors">
                            Log in
                        </Link>
                        <Link to="/register" className="px-6 py-2.5 rounded-full bg-gradient-to-r from-brand-500 to-blue-500 text-white font-bold shadow-lg hover:shadow-brand-500/25 transition-all transform hover:-translate-y-0.5 text-sm">
                            Sign Up
                        </Link>
                    </div>

                    {/* Mobile Menu Actions */}
                    <div className="flex items-center gap-4 lg:hidden">
                        <ThemeToggle />
                        <button
                            className="text-[var(--foreground)]/70 hover:text-[var(--foreground)]"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-dark/95 backdrop-blur-xl border-b border-white/10"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-3 py-2 text-base font-medium rounded-md ${location.pathname === link.path
                                        ? 'bg-brand-500/10 text-brand-500'
                                        : 'text-[var(--foreground)]/70 hover:bg-[var(--foreground)]/5 hover:text-[var(--foreground)]'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                to="/book-demo"
                                onClick={() => setIsOpen(false)}
                                className="mx-3 mt-4 block text-center px-5 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-blue-500 text-white font-medium shadow-lg"
                            >
                                Book a Demo
                            </Link>
                            <div className="pt-4 flex flex-col gap-3">
                                <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-3 text-white font-medium">Log in</Link>
                                <Link to="/register" onClick={() => setIsOpen(false)} className="w-full text-center py-3 bg-gradient-to-r from-brand-500 to-blue-500 rounded-xl text-white font-bold">Sign Up</Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
