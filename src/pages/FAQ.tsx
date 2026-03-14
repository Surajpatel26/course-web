import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { faqs } from '../data/mockData';

export function FAQ() {
    const [openId, setOpenId] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-[var(--background)] py-24 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 mb-6"
                    >
                        <HelpCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Support Center</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-display font-bold text-[var(--foreground)] mb-6"
                    >
                        Frequently Asked <span className="text-brand-400">Questions</span>
                    </motion.h1>
                    <p className="text-lg text-[var(--foreground)]/60">
                        Everything you need to know about the platform and our courses.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={faq.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[var(--foreground)]/5 transition-colors"
                            >
                                <span className="text-[var(--foreground)] font-medium">{faq.question}</span>
                                {openId === faq.id ? (
                                    <ChevronUp className="w-5 h-5 text-brand-500" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-[var(--foreground)]/40" />
                                )}
                            </button>
                            <AnimatePresence>
                                {openId === faq.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="border-t border-[var(--foreground)]/10"
                                    >
                                        <div className="px-6 py-4 text-[var(--foreground)]/60 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center bg-brand-500/5 rounded-3xl p-12 border border-brand-500/10">
                    <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">Still have questions?</h2>
                    <p className="text-[var(--foreground)]/60 mb-8">Can't find the answer you're looking for? Please chat to our friendly team.</p>
                    <button className="px-8 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold transition-all transform hover:-translate-y-1">
                        Contact Us
                    </button>
                </div>
            </div>
        </div>
    );
}
