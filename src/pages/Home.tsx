import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, PlayCircle, Sparkles, CheckCircle2, Users, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { CourseCard } from '../components/ui/CourseCard';
import { WebinarCard } from '../components/ui/WebinarCard';
import { featuredCourses, upcomingWebinars } from '../data/mockData';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { LogoMarquee } from '../components/ui/LogoMarquee';

const heroImages = [
    {
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071',
        title: 'Collaborative Excellence',
        tag: 'Community'
    },
    {
        url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2070',
        title: 'Modern Digital Mastery',
        tag: 'Innovation'
    },
    {
        url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=2070',
        title: 'Professional Growth',
        tag: 'Career'
    }
];

export function Home() {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-[var(--background)] transition-colors duration-300">

            {/* Hero Section */}
            <section className="relative pt-32 pb-32 overflow-hidden mesh-gradient">
                {/* Abstract Background Elements */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 45, 0]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[160px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            rotate: [0, -45, 0]
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[160px]"
                    />

                    {/* SVG Motion Graphics - Circuits & Grids */}
                    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[var(--foreground)]/10" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.05 }}
                        className="absolute top-1/4 right-1/4 w-96 h-96 border border-[var(--foreground)]/20 rounded-full"
                        style={{ perspective: 1000, rotateX: 45 }}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* Text Content */}
                        <div className="text-left relative">
                            {/* Decorative Background Graphic */}
                            <motion.div
                                animate={{
                                    rotate: 360,
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -top-20 -left-20 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl -z-10"
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[var(--foreground)]/[0.03] border border-[var(--foreground)]/10 mb-8 backdrop-blur-md shadow-lg"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                                </span>
                                <span className="text-sm font-bold text-[var(--foreground)]/80 uppercase tracking-[0.2em]">Next-Gen Learning Platform</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-5xl md:text-7xl font-display font-black text-[var(--foreground)] leading-[1.05] mb-8 tracking-tighter"
                            >
                                {"Elevate Your Potential.".split(" ").map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }}
                                        className={word === "Potential." ? "text-gradient block" : "inline-block mr-4"}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                className="text-lg md:text-xl text-[var(--foreground)]/60 mb-10 max-w-xl leading-relaxed font-medium"
                            >
                                Experience educational luxury. Master elite skills with industry visionaries through professional-grade curriculum and community-driven excellence.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.3 }}
                                className="flex flex-col sm:flex-row items-center gap-6"
                            >
                                <Link
                                    to="/courses"
                                    className="w-full sm:w-auto px-10 py-4 rounded-full bg-[var(--foreground)] text-[var(--background)] font-black text-lg shadow-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 group active:scale-95"
                                >
                                    Start Learning
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    to="/webinars"
                                    className="w-full sm:w-auto px-10 py-4 rounded-full bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 hover:bg-[var(--foreground)]/10 text-[var(--foreground)] font-bold text-lg backdrop-blur-xl transition-all flex items-center justify-center gap-3 group active:scale-95"
                                >
                                    <PlayCircle className="w-5 h-5 text-brand-500 group-hover:scale-110 transition-transform" />
                                    Watch Demo
                                </Link>
                            </motion.div>
                        </div>

                        {/* Image Slider Component */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, delay: 0.4 }}
                            className="relative hidden lg:block"
                        >
                            <div className="relative aspect-[4/5] w-full max-w-[500px] mx-auto">
                                {/* Main Image Frame */}
                                <div className="absolute inset-0 rounded-[64px] overflow-hidden border-[12px] border-[var(--foreground)]/5 shadow-2xl z-10">
                                    <AnimatePresence mode='wait'>
                                        <motion.div
                                            key={currentImage}
                                            initial={{ opacity: 0, scale: 1.1, x: 20 }}
                                            animate={{ opacity: 1, scale: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, x: -20 }}
                                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                            className="absolute inset-0"
                                        >
                                            <img
                                                src={heroImages[currentImage].url}
                                                alt={heroImages[currentImage].title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />

                                            {/* Floating Badge on Image */}
                                            <div className="absolute bottom-10 left-10 right-10">
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.3 }}
                                                    className="p-6 rounded-3xl bg-[var(--foreground)]/10 backdrop-blur-xl border border-[var(--foreground)]/20 shadow-2xl"
                                                >
                                                    <span className="inline-block px-3 py-1 rounded-full bg-brand-500 text-[10px] font-black uppercase tracking-widest text-white mb-2">
                                                        {heroImages[currentImage].tag}
                                                    </span>
                                                    <h3 className="text-xl font-bold text-[var(--foreground)] uppercase tracking-tighter">
                                                        {heroImages[currentImage].title}
                                                    </h3>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Abstract Background Glow behind Image */}
                                <div className="absolute -inset-4 bg-gradient-to-tr from-brand-500/20 to-blue-500/20 blur-[100px] -z-10 rounded-full" />

                                {/* Slider Controls Overlay */}
                                <div className="absolute -bottom-6 -right-6 flex gap-3 z-20">
                                    <button
                                        onClick={() => setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
                                        className="w-14 h-14 rounded-2xl bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center shadow-2xl hover:opacity-80 transition-all active:scale-90 border border-[var(--foreground)]/10"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={() => setCurrentImage((prev) => (prev + 1) % heroImages.length)}
                                        className="w-14 h-14 rounded-2xl bg-brand-500 text-white flex items-center justify-center shadow-2xl hover:bg-brand-600 transition-all active:scale-90"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Decorative Element: Floating Stats */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-12 -left-12 z-20 p-6 rounded-3xl bg-[var(--background)] border border-[var(--foreground)]/10 shadow-2xl hidden xl:block"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center">
                                            <Users className="w-6 h-6 text-brand-500" />
                                        </div>
                                        <div>
                                            <span className="block text-2xl font-black text-[var(--foreground)]">50K+</span>
                                            <span className="block text-[10px] font-bold text-[var(--foreground)]/40 uppercase tracking-widest leading-none">Global Students</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* Statistics Section - Revamped */}
            <section className="relative z-20 -mt-24 mb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="p-12 md:p-16 rounded-[48px] bg-[var(--card)]/40 backdrop-blur-3xl border border-[var(--foreground)]/10 shadow-2xl flex flex-wrap justify-around gap-12"
                    >
                        {[
                            { label: 'Active Learners', value: 10000, suffix: '+', color: 'text-brand-400' },
                            { label: 'Premium Courses', value: 120, suffix: '+', color: 'text-blue-400' },
                            { label: 'Industry Experts', value: 50, suffix: '+', color: 'text-purple-400' },
                            { label: 'Student Satisfaction', value: 99, suffix: '%', color: 'text-pink-400' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center group">
                                <div className={`text-5xl md:text-7xl font-display font-black ${stat.color} mb-3 transition-transform group-hover:scale-110 duration-500`}>
                                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="text-[var(--foreground)]/40 text-xs font-black uppercase tracking-[0.3em]">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Featured Courses Section */}
            <section className="py-48 bg-[var(--background)] relative z-10 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="text-4xl md:text-5xl font-display font-bold text-[var(--foreground)] mb-6"
                            >
                                Elite <span className="text-brand-400">Curriculum</span>
                            </motion.h2>
                            <p className="text-[var(--foreground)]/60 text-lg md:text-xl max-w-xl leading-relaxed">Curated content designed for high-performance individuals and future industry leaders.</p>
                        </div>
                        <Link to="/courses" className="flex items-center gap-3 text-brand-400 font-bold text-lg hover:text-brand-300 transition-all group pb-2 border-b-2 border-brand-500/20 hover:border-brand-500">
                            Explore Catalog <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {featuredCourses.slice(0, 3).map((course, i) => (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="h-full"
                            >
                                <CourseCard course={course} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Philosophy Section - NEW & CLASSIC */}
            <section className="py-48 bg-[var(--background)] relative overflow-hidden transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1 }}
                        >
                            <h2 className="text-5xl md:text-7xl font-display font-bold text-[var(--foreground)] leading-[0.95] mb-10 tracking-tighter">
                                Excellence <br />
                                Is Not An Act, <br />
                                But A Habit.
                            </h2>
                            <p className="text-lg md:text-xl text-[var(--foreground)]/60 mb-10 leading-relaxed font-medium">
                                At CoursePro, we don't just sell courses; we curate career-defining experiences. Our philosophy centers on technical rigor, creative depth, and absolute mastery.
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-bold text-3xl md:text-4xl text-[var(--foreground)] mb-2">99%</h4>
                                    <p className="text-[var(--foreground)]/40 font-bold uppercase tracking-widest text-[10px]">Completion Rate</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-3xl md:text-4xl text-[var(--foreground)] mb-2">500+</h4>
                                    <p className="text-[var(--foreground)]/40 font-bold uppercase tracking-widest text-[10px]">Partner Companies</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1 }}
                            className="relative aspect-square"
                        >
                            <div className="absolute inset-0 bg-brand-500 translate-x-8 translate-y-8 rounded-[64px] transition-transform group-hover:translate-x-4 group-hover:translate-y-4" />
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071"
                                className="absolute inset-0 w-full h-full object-cover rounded-[64px] border-8 border-[var(--card)] shadow-2xl transition-transform hover:scale-105 duration-700"
                                alt="Students collaborating"
                                loading="lazy"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-48 bg-[var(--background)] relative z-10 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-32">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="text-4xl md:text-6xl font-display font-bold text-[var(--foreground)] mb-8"
                        >
                            The <span className="text-brand-400">Advantage</span>
                        </motion.h2>
                        <p className="text-[var(--foreground)]/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">Sophisticated education infrastructure powered by world-class technology and mentorship.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative">
                        {/* Background Motion Graphic */}
                        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.05),transparent_70%)]" />

                        {[
                            { title: 'Global Faculty', desc: 'Direct access to practitioners from Fortune 500 tech environments.', icon: Users },
                            { title: 'Always Current', desc: 'Curriculum synchronized with real-time industry demands and trends.', icon: Clock },
                            { title: 'Prestige Certs', desc: 'Verified accomplishments recognized by leading horizontal and verticals.', icon: Sparkles },
                            { title: 'Core Projects', desc: 'Architectural-level projects that define your professional caliber.', icon: CheckCircle2 },
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                className="p-10 rounded-[40px] bg-[var(--foreground)]/[0.02] border border-[var(--foreground)]/10 hover:bg-[var(--foreground)]/[0.05] hover:border-brand-500/30 transition-all duration-500 relative group overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-[60px] translate-x-16 -translate-y-16 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform" />
                                <div className="w-16 h-16 rounded-[24px] bg-brand-500/10 flex items-center justify-center text-brand-400 mb-10 group-hover:scale-110 transition-transform group-hover:bg-brand-500 group-hover:text-white duration-500">
                                    <feature.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-6 group-hover:text-brand-400 transition-colors">{feature.title}</h3>
                                <p className="text-[var(--foreground)]/60 text-lg leading-relaxed group-hover:text-[var(--foreground)]/80 transition-colors">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Webinars Section */}
            <section className="py-48 bg-[var(--card)]/30 relative z-10 border-y border-[var(--glass-border)] transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="text-4xl md:text-5xl font-display font-bold text-[var(--foreground)] mb-6"
                            >
                                Live <span className="text-blue-500">Summits</span>
                            </motion.h2>
                            <p className="text-[var(--foreground)]/60 text-lg md:text-xl max-w-xl leading-relaxed">High-impact sessions with industry leaders. Interactive, real-time, and exclusive.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {upcomingWebinars.map((webinar, i) => (
                            <motion.div
                                key={webinar.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: i * 0.2, duration: 0.8 }}
                                className="h-full"
                            >
                                <WebinarCard webinar={webinar} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Logo Slider Section */}
            <section className="py-24 bg-[var(--background)] border-b border-[var(--foreground)]/5 overflow-hidden transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-[var(--foreground)]/40 text-sm font-black uppercase tracking-[0.3em] mb-4">Trusted by Industry Leaders</p>
                    </div>
                    <LogoMarquee />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-48 relative overflow-hidden bg-[var(--background)] transition-colors duration-300">
                <div className="absolute inset-0 bg-brand-500/10 mix-blend-overlay" />
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
                >
                    <h2 className="text-5xl md:text-7xl font-display font-black text-[var(--foreground)] mb-10 tracking-tighter">
                        Become the <br /> <span className="text-gradient">Exception.</span>
                    </h2>
                    <p className="text-lg md:text-xl text-[var(--foreground)]/70 mb-14 max-w-2xl mx-auto leading-relaxed">
                        Join the top 1% of learners who are shaping the future of technology and design.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                        <Link
                            to="/courses"
                            className="w-full sm:w-auto px-12 py-6 rounded-full bg-premium-gradient text-white font-black text-xl hover:shadow-[0_20px_60px_-15px_rgba(34,197,94,0.5)] transition-all transform hover:-translate-y-2"
                        >
                            Enroll Now
                        </Link>
                        <Link
                            to="/book-demo"
                            className="w-full sm:w-auto px-12 py-6 rounded-full bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 text-[var(--foreground)] font-black text-xl hover:bg-[var(--foreground)]/10 transition-all"
                        >
                            Enterprise Solution
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
