import { useParams } from 'react-router-dom';
import {
    Calendar,
    Clock,
    Video,
    Target,
    Users,
    CheckCircle2,
    Bell
} from 'lucide-react';
import { motion } from 'framer-motion';
import { upcomingWebinars } from '../data/mockData';

export function WebinarDetail() {
    const { id } = useParams();
    const webinar = upcomingWebinars.find(w => w.id === id) || upcomingWebinars[0];

    return (
        <div className="min-h-screen bg-[var(--background)] pt-20 transition-colors duration-300">
            {/* Webinar Hero */}
            <section className="relative py-24 border-b border-[var(--foreground)]/5 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 to-transparent flex items-center justify-center">
                    <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-8 uppercase tracking-widest"
                    >
                        <Video className="w-4 h-4" />
                        Live Interactive Webinar
                    </motion.div>

                    <h1 className="text-4xl md:text-6xl font-display font-extrabold text-[var(--foreground)] mb-8 leading-tight tracking-tight">
                        {webinar.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
                        <div className="flex items-center gap-3 bg-[var(--foreground)]/5 px-6 py-3 rounded-2xl border border-[var(--foreground)]/10">
                            <Calendar className="w-5 h-5 text-brand-500" />
                            <span className="text-[var(--foreground)] font-medium">{webinar.date}</span>
                        </div>
                        <div className="flex items-center gap-3 bg-[var(--foreground)]/5 px-6 py-3 rounded-2xl border border-[var(--foreground)]/10">
                            <Clock className="w-5 h-5 text-brand-500" />
                            <span className="text-[var(--foreground)] font-medium">{webinar.time}</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <img
                            src={webinar.image}
                            className="w-24 h-24 rounded-full object-cover ring-4 ring-blue-500/30 mb-2 shadow-2xl"
                            alt={webinar.speaker}
                        />
                        <div className="text-center">
                            <p className="text-[var(--foreground)] font-bold text-xl">{webinar.speaker}</p>
                            <p className="text-[var(--foreground)]/60">{webinar.speakerRole}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Registration Section */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-8">What we'll cover</h2>
                        <div className="space-y-6">
                            {[
                                { title: 'The Modern Landscape', desc: 'Understanding the industry shifts in 2026 and beyond.' },
                                { title: 'Technical Breakthroughs', desc: 'Deep dive into the latest tools and performance metrics.' },
                                { title: 'Live Q&A Session', desc: 'Get your specific questions answered by industry experts.' },
                                { title: 'Exclusive Resources', desc: 'Receive a curated kit of tools and checklists post-event.' },
                            ].map((topic, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-4"
                                >
                                    <div className="w-8 h-8 rounded-full bg-brand-500/10 flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-5 h-5 text-brand-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-[var(--foreground)] font-bold mb-1">{topic.title}</h3>
                                        <p className="text-[var(--foreground)]/60 text-sm leading-relaxed">{topic.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-12 p-8 rounded-3xl bg-[var(--foreground)]/5 border border-[var(--foreground)]/10">
                            <h3 className="text-[var(--foreground)] font-bold mb-4 flex items-center gap-3">
                                <Target className="w-5 h-5 text-blue-400" />
                                Targeted For:
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['Software Engineers', 'Product Designers', 'Tech Leads', 'CTOs', 'Developers'].map(label => (
                                    <span key={label} className="px-3 py-1 rounded-lg bg-[var(--foreground)]/5 text-[var(--foreground)]/60 text-xs font-medium">
                                        {label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="sticky top-32">
                            <div className="p-8 md:p-12 rounded-3xl bg-[var(--card)]/80 backdrop-blur-2xl border border-[var(--foreground)]/10 shadow-premium text-center transition-colors">
                                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">Secure your spot</h3>
                                <p className="text-[var(--foreground)]/60 mb-8">Limited seats available. Join 2,500+ professionals already registered.</p>

                                <form className="space-y-4 mb-8" onSubmit={e => e.preventDefault()}>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full bg-[var(--background)]/5 border border-[var(--foreground)]/10 rounded-xl px-5 py-3 text-[var(--foreground)] focus:outline-none focus:border-blue-500 transition-all placeholder:text-[var(--foreground)]/20"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full bg-[var(--background)]/5 border border-[var(--foreground)]/10 rounded-xl px-5 py-3 text-[var(--foreground)] focus:outline-none focus:border-blue-500 transition-all placeholder:text-[var(--foreground)]/20"
                                    />
                                    <button className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-lg shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-3">
                                        <Bell className="w-5 h-5" />
                                        Register Now
                                    </button>
                                </form>

                                <div className="flex items-center justify-center gap-4 text-xs text-[var(--foreground)]/40 font-bold uppercase tracking-widest">
                                    <div className="flex items-center gap-1.5">
                                        <Users className="w-4 h-4" />
                                        <span>2.4k Registered</span>
                                    </div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--foreground)]/20" />
                                    <div className="flex items-center gap-1.5">
                                        <Video className="w-4 h-4" />
                                        <span>Live Session</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
