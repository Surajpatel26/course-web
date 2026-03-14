import { motion } from 'framer-motion';
import { Mail, MessageSquare, MapPin } from 'lucide-react';

export function Contact() {
    return (
        <div className="min-h-screen bg-[var(--background)] py-20 relative overflow-hidden transition-colors duration-300">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-display font-bold text-[var(--foreground)] mb-6"
                    >
                        Get in <span className="text-brand-400">Touch</span>
                    </motion.h1>
                    <p className="text-lg text-[var(--foreground)]/60">
                        Have questions about our courses or platform? Our team is here to help you out.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Contact Info */}
                    <div className="lg:col-span-1 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-start gap-4 p-6 rounded-2xl bg-[var(--foreground)]/5 border border-[var(--foreground)]/10"
                        >
                            <div className="p-3 bg-brand-500/20 rounded-xl">
                                <Mail className="w-6 h-6 text-brand-400" />
                            </div>
                            <div>
                                <h3 className="text-[var(--foreground)] font-semibold mb-1">Email Us</h3>
                                <p className="text-[var(--foreground)]/40 text-sm mb-2">Typically replies in 24h</p>
                                <a href="mailto:support@coursepro.com" className="text-brand-400 font-medium hover:underline">support@coursepro.com</a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex items-start gap-4 p-6 rounded-2xl bg-[var(--foreground)]/5 border border-[var(--foreground)]/10"
                        >
                            <div className="p-3 bg-blue-500/20 rounded-xl">
                                <MessageSquare className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-[var(--foreground)] font-semibold mb-1">Live Chat</h3>
                                <p className="text-[var(--foreground)]/40 text-sm mb-2">Available 9 AM - 5 PM EST</p>
                                <button className="text-blue-500 font-medium hover:underline">Start a conversation</button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-start gap-4 p-6 rounded-2xl bg-[var(--foreground)]/5 border border-[var(--foreground)]/10"
                        >
                            <div className="p-3 bg-purple-500/20 rounded-xl">
                                <MapPin className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <h3 className="text-[var(--foreground)] font-semibold mb-1">Headquarters</h3>
                                <p className="text-[var(--foreground)]/50 text-sm">
                                    123 Tech Boulevard, Suite 400<br />
                                    San Francisco, CA 94107
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[var(--card)] p-8 rounded-3xl border border-[var(--foreground)]/10 shadow-2xl transition-colors"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--foreground)]/60 mb-2">First Name</label>
                                    <input type="text" className="w-full bg-[var(--background)] border border-[var(--foreground)]/10 rounded-xl px-4 py-3 text-[var(--foreground)] focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-[var(--foreground)]/20" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--foreground)]/60 mb-2">Last Name</label>
                                    <input type="text" className="w-full bg-[var(--background)] border border-[var(--foreground)]/10 rounded-xl px-4 py-3 text-[var(--foreground)] focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-[var(--foreground)]/20" placeholder="Doe" />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-[var(--foreground)]/60 mb-2">Email Address</label>
                                <input type="email" className="w-full bg-[var(--background)] border border-[var(--foreground)]/10 rounded-xl px-4 py-3 text-[var(--foreground)] focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-[var(--foreground)]/20" placeholder="john@example.com" />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-[var(--foreground)]/60 mb-2">Subject</label>
                                <select className="w-full bg-[var(--background)] border border-[var(--foreground)]/10 rounded-xl px-4 py-3 text-[var(--foreground)] focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all appearance-none">
                                    <option value="general">General Inquiry</option>
                                    <option value="support">Technical Support</option>
                                    <option value="billing">Billing Question</option>
                                    <option value="partnership">Partnership</option>
                                </select>
                            </div>

                            <div className="mb-8">
                                <label className="block text-sm font-medium text-[var(--foreground)]/60 mb-2">Message</label>
                                <textarea rows={5} className="w-full bg-[var(--background)] border border-[var(--foreground)]/10 rounded-xl px-4 py-3 text-[var(--foreground)] focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all resize-none placeholder:text-[var(--foreground)]/20" placeholder="How can we help you?"></textarea>
                            </div>

                            <button className="w-full bg-gradient-to-r from-brand-500 to-blue-500 hover:from-brand-600 hover:to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-brand-500/25 transition-all transform hover:-translate-y-0.5">
                                Send Message
                            </button>
                        </motion.form>
                    </div>

                </div>
            </div>
        </div>
    );
}
