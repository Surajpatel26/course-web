import { useEffect, useMemo, useState } from 'react';
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
import { api } from '../lib/api';
import type { Course } from '../components/ui/CourseCard';

type CourseSection = {
    id: string;
    courseId: string;
    title: string;
    duration: string | null;
    lessons: number | null;
    sortOrder: number;
};

export function CourseDetail() {
    const { id } = useParams();
    const [course, setCourse] = useState<Course | null>(null);
    const [sections, setSections] = useState<CourseSection[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        const fetchData = async () => {
            if (!id) return;
            setIsLoading(true);
            try {
                const [c, s] = await Promise.all([
                    api.get(`/courses/${id}`),
                    api.get(`/courses/${id}/sections`)
                ]);
                if (cancelled) return;
                setCourse(c);
                setSections(s);
            } catch (e) {
                console.error('Failed to fetch course detail', e);
                if (!cancelled) {
                    setCourse(null);
                    setSections([]);
                }
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };
        fetchData();
        return () => { cancelled = true; };
    }, [id]);

    const whatYouWillLearn = useMemo(() => {
        const raw = (course as { whatYouWillLearnJson?: string | null } | null)?.whatYouWillLearnJson;
        if (!raw) return null;
        try {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed.filter(Boolean) : null;
        } catch {
            return null;
        }
    }, [course]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[var(--background)] pt-28 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-[var(--foreground)]/60 font-bold">Loading course…</div>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-[var(--background)] pt-28 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Course not found</h1>
                    <p className="text-[var(--foreground)]/60">This course may have been removed.</p>
                </div>
            </div>
        );
    }

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
                                {(course as { description?: string | null } | null)?.description || 'Explore this course and its curriculum.'}
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
                                        <span className="text-4xl font-extrabold text-[var(--foreground)]">${(course as { price?: number | null } | null)?.price ?? ''}</span>
                                        {course.originalPrice && (
                                            <span className="text-slate-500 line-through text-lg ml-3">${course.originalPrice}</span>
                                        )}
                                    </div>
                                    <div className="bg-brand-500/10 text-brand-400 text-xs font-bold px-3 py-1 rounded-lg">
                                        30% OFF
                                    </div>
                                </div>

                                <button 
                                    onClick={() => {
                                        const storedUser = localStorage.getItem('user');
                                        if (!storedUser) {
                                            window.location.href = '/register';
                                        } else {
                                            // Handle enrollment logic here
                                            alert('Thank you for enrolling! This feature is coming soon.');
                                        }
                                    }}
                                    className="w-full py-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-lg mb-4 transition-all shadow-lg hover:shadow-brand-500/25 transform hover:-translate-y-0.5"
                                >
                                    {localStorage.getItem('user') ? 'Enroll in Course' : 'Enroll Now'}
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
                                {(whatYouWillLearn || [
                                    'Advanced state management patterns',
                                    'Performance profiling and bundle optimization',
                                    'SSR/SSG patterns and trade-offs',
                                    'Building accessible UI components',
                                    'Testing strategies for complex apps',
                                    'Deployment and distribution basics',
                                ]).map((item: string, i: number) => (
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
                                {sections.length === 0 ? (
                                    <div className="text-[var(--foreground)]/40 font-medium">No sections added yet.</div>
                                ) : (
                                sections.map((section) => (
                                    <div key={section.id} className="bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-2xl p-6 hover:bg-[var(--foreground)]/10 transition-colors">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-lg font-bold text-[var(--foreground)]">{section.title}</h3>
                                            <span className="text-xs text-[var(--foreground)]/40 font-bold uppercase">{section.duration || ''}</span>
                                        </div>
                                        <p className="text-sm text-[var(--foreground)]/60">{section.lessons ?? 0} lessons included in this section</p>
                                    </div>
                                )))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-3xl p-8">
                            <h3 className="text-[var(--foreground)] font-bold mb-6">Course Stats</h3>
                            <div className="space-y-6">
                                    {[
                                    {
                                        icon: BarChart,
                                        label: 'Level',
                                        value: (course as { level?: string | null } | null)?.level || '—',
                                    },
                                    {
                                        icon: Users,
                                        label: 'Enrolled',
                                        value: `${(course as { students?: number | null } | null)?.students?.toLocaleString?.() ?? course.students ?? '—'} students`,
                                    },
                                    {
                                        icon: Star,
                                        label: 'Rating',
                                        value: `${(course as { rating?: number | null } | null)?.rating ?? course.rating ?? '—'} / 5.0`,
                                    },
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
