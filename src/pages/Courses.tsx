import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Hash } from 'lucide-react';
import { CourseCard, type Course } from '../components/ui/CourseCard';
import { api } from '../lib/api';

export function Courses() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await api.get('/courses');
                setCourses(data);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCourses();
    }, []);

    // Get unique categories
    const categories = useMemo(() => {
        const cats = ['All', ...new Set(courses.map(course => course.category))];
        return cats;
    }, [courses]);

    // Filter and group courses
    const groupedCourses = useMemo(() => {
        const filtered = courses.filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
            return matchesSearch && matchesCategory;
        });

        const groups: Record<string, Course[]> = {};
        filtered.forEach(course => {
            if (!groups[course.category]) {
                groups[course.category] = [];
            }
            groups[course.category].push(course);
        });

        return groups;
    }, [courses, searchTerm, activeCategory]);

    return (
        <div className="min-h-screen bg-[var(--background)] py-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <header className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-8"
                    >
                        <div className="max-w-2xl">
                            <h1 className="text-5xl md:text-6xl font-display font-black text-[var(--foreground)] mb-6">
                                Learning <span className="text-gradient">Pathways</span>
                            </h1>
                            <p className="text-xl text-[var(--foreground)]/60 font-medium leading-relaxed">
                                Curated elite curriculum designed to take you from foundational concepts to advanced industry mastery.
                            </p>
                        </div>
                        <div className="flex items-center gap-4 bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-2xl p-2 backdrop-blur-xl">
                            <div className="px-4 py-2 border-r border-[var(--foreground)]/10">
                                <span className="text-[var(--foreground)] font-bold text-2xl">{courses.length}</span>
                                <span className="text-[var(--foreground)]/40 text-xs uppercase block font-black">Total Courses</span>
                            </div>
                            <div className="px-4 py-2">
                                <span className="text-brand-500 font-bold text-2xl">{categories.length - 1}</span>
                                <span className="text-[var(--foreground)]/40 text-xs uppercase block font-black">Categories</span>
                            </div>
                        </div>
                    </motion.div>
                </header>

                {/* Search and Fixed Category Nav */}
                <div className="sticky top-20 z-30 -mx-4 px-4 py-6 mb-12 bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--foreground)]/5 space-y-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--foreground)]/40 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by title, instructor, or skills..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-[var(--card)]/80 backdrop-blur-2xl border border-[var(--foreground)]/10 rounded-[32px] py-5 pl-14 pr-6 text-[var(--foreground)] text-lg focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all shadow-2xl"
                            />
                        </div>
                        <button className="flex items-center gap-3 px-8 py-5 rounded-[32px] bg-[var(--foreground)] text-[var(--background)] font-black hover:opacity-90 transition-all shadow-xl">
                            <SlidersHorizontal className="w-5 h-5" />
                            Filters
                        </button>
                    </div>

                    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap border transition-all ${activeCategory === cat
                                    ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/20 scale-105'
                                    : 'bg-[var(--foreground)]/5 border-[var(--foreground)]/10 text-[var(--foreground)]/40 hover:border-[var(--foreground)]/20 hover:bg-[var(--foreground)]/10'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grouped Courses Grid */}
                <div className="space-y-24">
                    <AnimatePresence mode="popLayout">
                        {isLoading ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-32 text-center">
                                <div className="text-[var(--foreground)]/40 font-bold">Loading courses…</div>
                            </motion.div>
                        ) : Object.entries(groupedCourses).length > 0 ? (
                            Object.entries(groupedCourses).map(([category, courses], idx) => (
                                <motion.section
                                    key={category}
                                    id={category.toLowerCase().replace(/\s+/g, '-')}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative"
                                >
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-400">
                                            <Hash className="w-6 h-6" />
                                        </div>
                                        <h2 className="text-3xl font-display font-black text-[var(--foreground)]">
                                            {category} <span className="text-[var(--foreground)]/40 font-medium text-lg ml-2">({courses.length})</span>
                                        </h2>
                                        <div className="h-px flex-grow bg-gradient-to-r from-[var(--foreground)]/10 to-transparent" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                        {courses.map((course) => (
                                            <motion.div
                                                key={course.id}
                                                whileHover={{ y: -10 }}
                                                className="will-change-transform h-full"
                                            >
                                                <CourseCard course={course} />
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.section>
                            ))
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
                                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">No courses found</h3>
                                <p className="text-[var(--foreground)]/40">Try adjusting your search or category filters.</p>
                                <button
                                    onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                                    className="mt-8 text-brand-400 font-bold hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
}
