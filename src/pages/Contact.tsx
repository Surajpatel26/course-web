import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, MapPin, Send, CheckCircle, AlertCircle, Hash } from 'lucide-react';
import { useState } from 'react';
import { api } from '../lib/api';

export function Contact() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('general');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await api.post('/contacts', {
                name: `${firstName} ${lastName}`.trim(),
                email,
                message: `[${subject}] ${message}`
            });
            setStatus('success');
            setTimeout(() => setStatus('idle'), 5000);
            setFirstName('');
            setLastName('');
            setEmail('');
            setMessage('');
            setSubject('general');
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--background)] py-12 px-4 relative overflow-hidden flex flex-col items-center justify-center">
            {/* Ambient Animated Background Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
            
            <div className="max-w-4xl w-full relative z-10">
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-black uppercase tracking-widest mb-4"
                    >
                        <MessageSquare className="w-3 h-3" />
                        Concierge
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-display font-black text-[var(--foreground)] mb-4 tracking-tighter leading-none"
                    >
                        Got a <span className="text-gradient italic">Question?</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-[var(--foreground)]/40 font-medium max-w-xl mx-auto"
                    >
                        We're here to engineer your success. Send us a message and we'll respond within 24 hours.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    {/* Compact Contact Info */}
                    <div className="md:col-span-4 space-y-4">
                        {[
                            { icon: Mail, label: 'Email Support', value: 'support@coursepro.com', color: 'text-brand-400', bg: 'bg-brand-500/10' },
                            { icon: MessageSquare, label: 'Live Assistance', value: 'Join Discord', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                            { icon: MapPin, label: 'Headquarters', value: 'SF, California', color: 'text-purple-400', bg: 'bg-purple-500/10' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 + 0.2 }}
                                className="group p-4 rounded-3xl bg-glass border border-[var(--glass-border)] hover:border-brand-500/30 transition-all duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-2xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--foreground)]/30 mb-0.5">{item.label}</p>
                                        <p className="text-sm font-bold text-[var(--foreground)]">{item.value}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Compact Form Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-8 bg-glass-heavy backdrop-blur-3xl border border-[var(--glass-border)] rounded-[40px] p-6 md:p-8 shadow-premium relative overflow-hidden"
                    >
                        {/* Status Overlays */}
                        <AnimatePresence>
                            {status === 'success' && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-8"
                                >
                                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                                        <CheckCircle className="w-10 h-10 text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tight">Transmission Received</h3>
                                    <p className="text-slate-400 text-sm font-medium">We've received your request and our team is analyzing it. Expect a response soon.</p>
                                    <button 
                                        onClick={() => setStatus('idle')}
                                        className="mt-8 px-6 py-2 rounded-full border border-white/10 text-xs font-black uppercase tracking-widest text-white hover:bg-white/5 transition-all"
                                    >
                                        Send Another
                                    </button>
                                </motion.div>
                            )}
                            {status === 'error' && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-8"
                                >
                                    <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
                                        <AlertCircle className="w-10 h-10 text-red-500" />
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tight">System Error</h3>
                                    <p className="text-slate-400 text-sm font-medium">We couldn't process your message. Please verify your connection and try again.</p>
                                    <button 
                                        onClick={() => setStatus('idle')}
                                        className="mt-8 px-6 py-2 rounded-full border border-white/10 text-xs font-black uppercase tracking-widest text-white hover:bg-white/5 transition-all"
                                    >
                                        Try Again
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Horizontal Rows */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                        <label className="text-[10px] font-black text-[var(--foreground)]/40 uppercase tracking-widest min-w-[80px]">First Name</label>
                                        <input 
                                            required 
                                            value={firstName} 
                                            onChange={(e) => setFirstName(e.target.value)} 
                                            type="text" 
                                            className="flex-1 bg-[var(--foreground)]/[0.03] border border-[var(--glass-border)] rounded-xl px-4 py-2.5 text-[var(--foreground)] text-sm focus:outline-none focus:border-brand-500 transition-all font-bold placeholder:text-[var(--foreground)]/10" 
                                            placeholder="CYRUS" 
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                        <label className="text-[10px] font-black text-[var(--foreground)]/40 uppercase tracking-widest min-w-[80px]">Last Name</label>
                                        <input 
                                            required 
                                            value={lastName} 
                                            onChange={(e) => setLastName(e.target.value)} 
                                            type="text" 
                                            className="flex-1 bg-[var(--foreground)]/[0.03] border border-[var(--glass-border)] rounded-xl px-4 py-2.5 text-[var(--foreground)] text-sm focus:outline-none focus:border-brand-500 transition-all font-bold placeholder:text-[var(--foreground)]/10" 
                                            placeholder="WELLS" 
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                <label className="text-[10px] font-black text-[var(--foreground)]/40 uppercase tracking-widest min-w-[100px]">Email Interface</label>
                                <input 
                                    required 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    type="email" 
                                    className="flex-1 bg-[var(--foreground)]/[0.03] border border-[var(--glass-border)] rounded-xl px-4 py-2.5 text-[var(--foreground)] text-sm focus:outline-none focus:border-brand-500 transition-all font-bold placeholder:text-[var(--foreground)]/10" 
                                    placeholder="CYRUS@NETWORK.COM" 
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                <label className="text-[10px] font-black text-[var(--foreground)]/40 uppercase tracking-widest min-w-[100px]">Protocol Topic</label>
                                <div className="flex-1 relative group">
                                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-500/40 group-hover:text-brand-500 transition-colors pointer-events-none" />
                                    <select 
                                        value={subject} 
                                        onChange={(e) => setSubject(e.target.value)} 
                                        className="w-full bg-[#020617] border border-[var(--glass-border)] rounded-xl px-10 py-2.5 text-[var(--foreground)] text-sm focus:outline-none focus:border-brand-500 transition-all appearance-none font-bold cursor-pointer"
                                        style={{ colorScheme: 'dark' }}
                                    >
                                        <option value="general" className="bg-[#020617] text-white">GENERAL INQUIRY</option>
                                        <option value="support" className="bg-[#020617] text-white">TECHNICAL SUPPORT</option>
                                        <option value="billing" className="bg-[#020617] text-white">BILLING QUESTION</option>
                                        <option value="partnership" className="bg-[#020617] text-white">PARTNERSHIP</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                                <label className="text-[10px] font-black text-[var(--foreground)]/40 uppercase tracking-widest min-w-[100px] mt-3">Message Payload</label>
                                <textarea 
                                    required 
                                    value={message} 
                                    onChange={(e) => setMessage(e.target.value)} 
                                    rows={4} 
                                    className="flex-1 bg-[var(--foreground)]/[0.03] border border-[var(--glass-border)] rounded-2xl px-4 py-3 text-[var(--foreground)] text-sm focus:outline-none focus:border-brand-500 transition-all resize-none font-bold placeholder:text-[var(--foreground)]/10" 
                                    placeholder="DESCRIBE YOUR REQUEST..."
                                />
                            </div>

                            <button 
                                disabled={status === 'loading'} 
                                className="w-full bg-premium-gradient text-white font-black py-4 rounded-xl shadow-xl hover:shadow-brand-500/20 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:translate-y-0 group flex items-center justify-center gap-3 overflow-hidden text-xs tracking-widest uppercase mt-4"
                            >
                                {status === 'loading' ? (
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Establish Connection
                                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

