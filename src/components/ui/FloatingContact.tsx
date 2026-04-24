import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Mail, Loader2, CheckCircle } from 'lucide-react';
import { api } from '../../lib/api';

export function FloatingContact() {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await api.post('/contacts', {
                name: formData.name,
                email: formData.email,
                message: `[Quick Connect] ${formData.message}`
            });
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => {
                setStatus('idle');
                setIsOpen(false);
            }, 3000);
        } catch (error) {
            console.error('Contact submit error:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <div className="fixed right-8 bottom-8 z-[9999] flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="w-[310px] bg-[#0f172a] border border-white/20 rounded-[28px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    >
                        {/* Header */}
                        <div className="px-5 py-4 bg-white/[0.03] flex justify-between items-center border-b border-white/10">
                            <h3 className="text-white font-black uppercase tracking-widest text-[10px]">Contact Team</h3>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        {/* Form Body */}
                        <div className="p-5 space-y-4">
                            {status === 'success' ? (
                                <div className="py-8 text-center">
                                    <CheckCircle className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                                    <h4 className="text-white text-xs font-bold uppercase">Sent</h4>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-3.5">
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Name</label>
                                        <div className="relative group">
                                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 group-focus-within:text-cyan-400 transition-colors" />
                                            <input 
                                                required
                                                placeholder="REQUIRED"
                                                value={formData.name}
                                                onChange={e => setFormData({...formData, name: e.target.value})}
                                                className="w-full bg-white/5 border border-white/10 text-white text-[11px] font-bold rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-cyan-500/50 transition-all uppercase placeholder:text-white/10"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Email</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 group-focus-within:text-cyan-400 transition-colors" />
                                            <input 
                                                required
                                                type="email"
                                                placeholder="REQUIRED"
                                                value={formData.email}
                                                onChange={e => setFormData({...formData, email: e.target.value})}
                                                className="w-full bg-white/5 border border-white/10 text-white text-[11px] font-bold rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-cyan-500/50 transition-all uppercase placeholder:text-white/10"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Message</label>
                                        <textarea 
                                            required
                                            rows={2}
                                            placeholder="HOW CAN WE HELP?"
                                            value={formData.message}
                                            onChange={e => setFormData({...formData, message: e.target.value})}
                                            className="w-full bg-white/5 border border-white/10 text-white text-[11px] font-medium rounded-xl py-3 px-4 focus:outline-none focus:border-cyan-500/50 transition-all resize-none placeholder:text-white/10"
                                        />
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full relative group h-11 rounded-xl overflow-hidden shadow-lg active:scale-95 transition-transform mt-2"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-indigo-500" />
                                        <div className="relative flex items-center justify-center gap-2 h-full text-white font-black uppercase tracking-widest text-[10px]">
                                            {status === 'loading' ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <>SEND <Send className="w-3 h-3 group-hover:translate-x-1 transition-transform" /></>
                                            )}
                                        </div>
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trigger Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group w-16 h-16 rounded-[24px] flex items-center justify-center overflow-hidden shadow-2xl"
                style={{ boxShadow: '0 8px 32px rgba(6,182,212,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-indigo-600 transition-all duration-500 group-hover:rotate-12" />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />
                
                <motion.div
                    animate={isOpen ? { rotate: 90, scale: 0.8 } : { rotate: 0, scale: 1 }}
                    className="relative z-10 text-white"
                >
                    {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
                </motion.div>
                
                {!isOpen && (
                    <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]" />
                )}
            </motion.button>
        </div>
    );
}
