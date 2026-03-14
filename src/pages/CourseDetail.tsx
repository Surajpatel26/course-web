import { useParams } from 'react-router-dom';
import {
    PlayCircle,
    FileText,
    Clock,
    Users,
    Star,
    CheckCircle2,
    BarChart,
    Globe,
    Share2,
    Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import { featuredCourses } from '../data/mockData';

export function CourseDetail() {
    const { id } = useParams();
    const course = featuredCourses.find(c => c.id === id) || featuredCourses[0];

    const curriculum = [
        { title: 'Introduction to the Course', duration: '15m', lessons: 3 },
        { title: 'Foundations & Best Practices', duration: '1h 20m', lessons: 8 },
        { title: 'Advanced Technical Implementation', duration: '2h 45m', lessons: 12 },
        { title: 'Real World Case Studies', duration: '1h 10m', lessons: 5 },
        { title: 'Final Project & Certification', duration: '45m', lessons: 2 },
    ];

    return (
        <div className="min-h-screen bg-[var(--background)] pt-20 transition-colors duration-300">
            {/* Course Hero */}
            <section className="relative py-20 overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-500/10 blur-[120px]" />
                    <img
                        src={course.image}
                        className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale"
                        alt=""
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold mb-6 uppercase tracking-wider">
                                {course.category}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--foreground)] mb-6 leading-tight">
                                {course.title}
                            </h1>
                            <p className="text-xl text-[var(--foreground)]/80 mb-8 max-w-xl leading-relaxed">
                                Master the advanced patterns and performance optimizations required for modern high-scale applications.
                            </p>

                            <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--foreground)]/60 mb-10">
                                <div className="flex items-center gap-2">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                    </div>
                                    <span className="text-[var(--foreground)] font-bold">{course.rating}</span>
                                    <span>(2,450 ratings)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-blue-400" />
                                    <span>{course.students.toLocaleString()} students enrolled</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" className="w-12 h-12 rounded-full ring-2 ring-brand-500/20" alt="" />
                                <div>
                                    <p className="text-xs text-[var(--foreground)]/40 uppercase font-bold tracking-widest mb-1">Instructor</p>
                                    <p className="text-[var(--foreground)] font-bold">{course.instructor}</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-[var(--card)]/80 backdrop-blur-2xl rounded-3xl p-8 border border-[var(--foreground)]/10 shadow-2xl relative z-10"
                            >
                                <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 group cursor-pointer shadow-premium">
                                    <img src={course.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
                                        <div className="w-16 h-16 rounded-full bg-brand-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                                            <PlayCircle className="w-8 h-8 text-white fill-current ml-1" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4 text-center text-white text-xs font-bold uppercase tracking-wider bg-black/60 backdrop-blur-sm py-2 rounded-lg">
                                        Watch Course Preview
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <span className="text-4xl font-extrabold text-[var(--foreground)]">${course.price}</span>
                                        {course.originalPrice && (
                                            <span className="text-slate-500 line-through text-lg ml-3">${course.originalPrice}</span>
                                        )}
                                    </div>
                                    <div className="bg-brand-500/10 text-brand-400 text-xs font-bold px-3 py-1 rounded-lg">
                                        30% OFF
                                    </div>
                                </div>

                                <button className="w-full py-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-lg mb-4 transition-all shadow-lg hover:shadow-brand-500/25 transform hover:-translate-y-0.5">
                                    Enroll in Course
                                </button>
                                <p className="text-center text-slate-500 text-xs mb-8">30-Day Money-Back Guarantee</p>

                                <div className="space-y-4">
                                    <p className="text-[var(--foreground)] font-bold text-sm mb-4">This course includes:</p>
                                    {[
                                        { icon: Clock, text: '24 hours on-demand video' },
                                        { icon: FileText, text: '12 downloadable resources' },
                                        { icon: Globe, text: 'Full lifetime access' },
                                        { icon: Award, text: 'Certificate of completion' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm text-[var(--foreground)]/60">
                                            <item.icon className="w-4 h-4 text-brand-400" />
                                            <span>{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Tabs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2">
                        <div className="mb-16">
                            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">What you'll learn</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    'Advanced state management with signals and context',
                                    'Performance profiling and bundle size optimization',
                                    'Server-side rendering and static site generation patterns',
                                    'Building highly accessible and accessible UI components',
                                    'Testing strategies for complex frontend applications',
                                    'Deployment pipelines and edge network distribution',
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 text-[var(--foreground)]/80">
                                        <CheckCircle2 className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-16">
                            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8">Course Curriculum</h2>
                            <div className="space-y-4">
                                {curriculum.map((section, i) => (
                                    <div key={i} className="bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-2xl p-6 hover:bg-[var(--foreground)]/10 transition-colors">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-lg font-bold text-[var(--foreground)]">{section.title}</h3>
                                            <span className="text-xs text-[var(--foreground)]/40 font-bold uppercase">{section.duration}</span>
                                        </div>
                                        <p className="text-sm text-[var(--foreground)]/60">{section.lessons} lessons included in this section</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-3xl p-8">
                            <h3 className="text-[var(--foreground)] font-bold mb-6">Course Stats</h3>
                            <div className="space-y-6">
                                {[
                                    { icon: BarChart, label: 'Level', value: 'Intermediate' },
                                    { icon: Users, label: 'Enrolled', value: '12,450 students' },
                                    { icon: Star, label: 'Rating', value: '4.9 / 5.0' },
                                ].map((stat, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 text-[var(--foreground)]/60">
                                            <stat.icon className="w-4 h-4" />
                                            <span>{stat.label}</span>
                                        </div>
                                        <span className="text-[var(--foreground)] font-bold">{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-600/20 to-brand-500/20 border border-[var(--foreground)]/10 rounded-3xl p-8">
                            <h3 className="text-[var(--foreground)] font-bold mb-4">Share this course</h3>
                            <p className="text-[var(--foreground)]/60 text-sm mb-6">Help your friends level up their skills by sharing this masterclass.</p>
                            <button className="w-full py-3 rounded-xl bg-[var(--foreground)]/10 hover:bg-[var(--foreground)]/20 text-[var(--foreground)] font-bold flex items-center justify-center gap-3 transition-colors">
                                <Share2 className="w-5 h-5" />
                                Copy Course Link
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
