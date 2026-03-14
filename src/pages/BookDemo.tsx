import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export function BookDemo() {
    return (
        <div className="min-h-screen bg-dark py-20 relative overflow-hidden flex items-center">
            {/* Background */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark/95 to-brand-900/40 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Info Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white mb-6 leading-tight">
                            Scale learning <br /> across your <span className="text-gradient">organization</span>
                        </h1>
                        <p className="text-lg text-slate-300 mb-10 leading-relaxed">
                            Book a personalized demo of CoursePro Enterprise. Discover how our centralized learning platform can upskill your team effectively.
                        </p>

                        <ul className="space-y-6">
                            {[
                                'Unlimited access to 200+ premium tech and design courses',
                                'Advanced analytics, reporting, and learning paths',
                                'Dedicated Customer Success Manager',
                                'Single Sign-On (SSO) integrations'
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-brand-400 shrink-0" />
                                    <span className="text-slate-300 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-card/80 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl"
                    >
                        <h3 className="text-2xl font-bold text-white mb-8">Schedule your free demo</h3>

                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Work Email</label>
                                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500" placeholder="name@company.com" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Company Name</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Team Size</label>
                                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 appearance-none">
                                    <option value="1-50">1 - 50 employees</option>
                                    <option value="51-200">51 - 200 employees</option>
                                    <option value="201-1000">201 - 1000 employees</option>
                                    <option value="1000+">1000+ employees</option>
                                </select>
                            </div>

                            <button className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-xl transition-colors mt-4">
                                Request Demo
                            </button>

                            <p className="text-xs text-slate-500 text-center mt-4">
                                By submitting this form, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </form>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
