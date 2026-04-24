import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, User, ArrowRight, PlayCircle } from 'lucide-react';
import { api } from '../lib/api';

export interface UpcomingCourse {
    id: string;
    title: string;
    instructor: string;
    date: string;
    image: string;
    category: string;
    description: string;
}

export function UpcomingCourses() {
    const [courses, setCourses] = useState<UpcomingCourse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await api.get('/upcoming-courses');
                setCourses(data);
            } catch (error) {
                console.error('Failed to fetch upcoming courses:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[var(--background)] pt-8 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Sequence */}
                <header className="mb-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 text-[var(--foreground)]/60 text-sm font-black tracking-widest uppercase mb-8"
                    >
                        <PlayCircle className="w-4 h-4 text-cyan-400" />
                        Coming Soon
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-display font-black text-[var(--foreground)] tracking-tighter mb-4 uppercase italic"
                    >
                        Upcoming <span className="text-cyan-400">Courses</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-[var(--foreground)]/60 max-w-2xl font-medium"
                    >
                        Get a sneak peek at what we're working on. These courses will be dropping soon, bringing you the latest industry knowledge.
                    </motion.p>
                </header>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-4">
                    {/* Sidebar / Search */}
                    <aside className="w-full lg:w-72 flex-shrink-0 space-y-6 lg:sticky lg:top-28 h-fit self-start z-20">
                        <div className="relative w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/40 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search upcoming..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-[var(--card)]/80 backdrop-blur-2xl border border-[var(--foreground)]/10 rounded-2xl py-3 pl-11 pr-4 text-[var(--foreground)] text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-lg"
                            />
                        </div>
                    </aside>

                    {/* Content Grid */}
                    <div className="flex-grow min-w-0 pb-6">
                        <div className="space-y-8">
                            <AnimatePresence mode="popLayout">
                                {isLoading ? (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-32 text-center">
                                        <div className="text-[var(--foreground)]/40 font-bold">Loading upcoming courses…</div>
                                    </motion.div>
                                ) : filteredCourses.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
                                        {filteredCourses.map((course, idx) => (
                                            <motion.div
                                                key={course.id}
                                                initial={{ opacity: 0, y: 40 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="group relative flex flex-col h-full bg-[var(--card)]/50 backdrop-blur-sm border border-[var(--foreground)]/10 rounded-3xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                
                                                <div className="aspect-video w-full overflow-hidden relative">
                                                    <img 
                                                        src={course.image} 
                                                        alt={course.title}
                                                        className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700" 
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/20 to-transparent opacity-60" />
                                                    <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs font-black text-white uppercase tracking-widest">
                                                        {course.category}
                                                    </div>
                                                </div>

                                                <div className="p-4 flex flex-col flex-grow relative z-10 -mt-10">
                                                    <div className="bg-[var(--card)]/90 backdrop-blur-xl p-4 md:p-6 rounded-2xl shadow-xl border border-[var(--foreground)]/5 flex-grow flex flex-col">
                                                        <h3 className="text-2xl font-black text-[var(--foreground)] mb-3 leading-tight group-hover:text-cyan-400 transition-colors">
                                                            {course.title}
                                                        </h3>
                                                        <p className="text-[var(--foreground)]/60 text-sm leading-relaxed mb-6 flex-grow">
                                                            {course.description}
                                                        </p>

                                                        <div className="flex flex-col gap-3 mt-auto pt-6 border-t border-[var(--foreground)]/10">
                                                            <div className="flex items-center gap-3 text-sm font-medium text-[var(--foreground)]/60">
                                                                <User className="w-4 h-4 text-cyan-500" />
                                                                <span>{course.instructor}</span>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-2 text-sm font-black text-indigo-400">
                                                                    <Calendar className="w-4 h-4" />
                                                                    <span>{course.date}</span>
                                                                </div>
                                                                <button className="flex items-center gap-2 text-sm font-bold text-[var(--foreground)] hover:text-cyan-400 transition-colors">
                                                                    Notify Me <ArrowRight className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="py-32 text-center"
                                    >
                                        <div className="text-slate-500 mb-4 flex justify-center">
                                            <div className="p-8 rounded-full bg-[var(--foreground)]/5 border border-[var(--foreground)]/10">
                                                <Search className="w-12 h-12 text-[var(--foreground)] opacity-20" />
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">No upcoming courses found</h3>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
