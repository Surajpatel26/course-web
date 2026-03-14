import { Star, Quote, Rocket, ShieldCheck, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { testimonials } from '../data/mockData';

export function Testimonials() {
    return (
        <div className="min-h-screen bg-[var(--background)] py-24 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-display font-bold text-[var(--foreground)] mb-6"
                    >
                        Success <span className="text-brand-400">Stories</span>
                    </motion.h1>
                    <p className="text-lg text-[var(--foreground)]/60 max-w-2xl mx-auto">
                        Don't just take our word for it. Join thousands of satisfied students who have transformed their careers with CoursePro.
                    </p>
                </div>

                {/* Statistics Center */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
                    {[
                        { label: 'Courses', value: '120+', icon: Rocket, color: 'text-brand-400' },
                        { label: 'Students', value: '10K+', icon: Heart, color: 'text-pink-500' },
                        { label: 'Rating', value: '4.9/5', icon: Star, color: 'text-yellow-400' },
                        { label: 'Secure', value: '100%', icon: ShieldCheck, color: 'text-blue-500' },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-2xl p-6 text-center group hover:bg-[var(--foreground)]/10 transition-all"
                        >
                            <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-4 group-hover:scale-110 transition-transform`} />
                            <div className="text-3xl font-bold text-[var(--foreground)] mb-1">{stat.value}</div>
                            <div className="text-sm text-[var(--foreground)]/40 font-medium uppercase tracking-wider">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-3xl p-8 relative group"
                        >
                            <Quote className="absolute top-6 right-8 w-12 h-12 text-[var(--foreground)]/5 group-hover:text-brand-500/10 transition-colors" />

                            <div className="flex items-center gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-[var(--foreground)]/20'}`}
                                    />
                                ))}
                            </div>

                            <p className="text-[var(--foreground)]/80 italic mb-8 relative z-10 leading-relaxed">
                                "{item.content}"
                            </p>

                            <div className="flex items-center gap-4">
                                <img
                                    src={item.avatar}
                                    alt={item.name}
                                    className="w-12 h-12 rounded-full ring-2 ring-brand-500/20"
                                />
                                <div>
                                    <h4 className="text-[var(--foreground)] font-bold">{item.name}</h4>
                                    <p className="text-[var(--foreground)]/40 text-xs">{item.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <button className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-premium-gradient text-white font-bold text-lg hover:shadow-2xl hover:shadow-brand-500/20 transition-all transform hover:-translate-y-1">
                        Start Your Success Story
                    </button>
                </div>
            </div>
        </div>
    );
}
