import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4 transition-colors duration-300">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-[128px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10">
                    <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
                        <div className="bg-gradient-to-br from-brand-500 to-blue-500 p-2 rounded-xl group-hover:scale-110 transition-transform">
                            <Lock className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-display font-bold text-2xl text-[var(--foreground)]">CoursePro</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Welcome Back</h1>
                    <p className="text-[var(--foreground)]/60">Continue your learning journey today</p>
                </div>

                <div className="bg-[var(--card)]/80 backdrop-blur-2xl border border-[var(--foreground)]/10 rounded-3xl p-8 shadow-2xl transition-colors">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-[var(--foreground)]/60 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[var(--background)]/5 border border-[var(--foreground)]/10 rounded-xl py-3 pl-12 pr-4 text-[var(--foreground)] focus:outline-none focus:border-brand-500 transition-all font-sans placeholder:text-[var(--foreground)]/20"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-medium text-[var(--foreground)]/60">Password</label>
                                <a href="#" className="text-sm text-brand-400 hover:text-brand-300 transition-colors">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[var(--background)]/5 border border-[var(--foreground)]/10 rounded-xl py-3 pl-12 pr-4 text-[var(--foreground)] focus:outline-none focus:border-brand-500 transition-all font-sans placeholder:text-[var(--foreground)]/20"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-brand-500/25 flex items-center justify-center gap-2 group">
                            Sign In
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[var(--foreground)]/10"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-[var(--card)] text-[var(--foreground)]/40 transition-colors">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-3 bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-xl py-3 text-[var(--foreground)] hover:bg-[var(--foreground)]/10 transition-all">
                                <Chrome className="w-5 h-5" />
                                Google
                            </button>
                            <button className="flex items-center justify-center gap-3 bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-xl py-3 text-[var(--foreground)] hover:bg-[var(--foreground)]/10 transition-all">
                                <Github className="w-5 h-5" />
                                GitHub
                            </button>
                        </div>
                    </div>
                </div>

                <p className="mt-8 text-center text-[var(--foreground)]/60">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-brand-400 font-bold hover:text-brand-300 transition-colors">Create account</Link>
                </p>
            </motion.div>
        </div>
    );
}
