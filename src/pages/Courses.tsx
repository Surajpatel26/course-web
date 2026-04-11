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
        const cats = ['All', ...new Set(courses.map(course => (course.category || 'Uncategorized').trim()))];
        return cats.filter(Boolean);
    }, [courses]);

    // Filter and group courses
    const groupedCourses = useMemo(() => {
        const filtered = courses.filter(course => {
            const courseCat = (course.category || 'Uncategorized').trim();
            const matchesSearch = (course.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (course.instructor || '').toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = activeCategory === 'All' || courseCat === activeCategory;
            return matchesSearch && matchesCategory;
        });

        const groups: Record<string, Course[]> = {};
        filtered.forEach(course => {
            const cat = (course.category || 'Uncategorized').trim();
            if (!groups[cat]) {
                groups[cat] = [];
            }
            groups[cat].push(course);
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

                {/* Main Layout containing Sidebar and Content Grid */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-12">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-72 flex-shrink-0 space-y-6 lg:sticky lg:top-28 h-fit self-start z-20">
                        {/* Thin Search Bar */}
                        <div className="relative w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/40 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-[var(--card)]/80 backdrop-blur-2xl border border-[var(--foreground)]/10 rounded-2xl py-3 pl-11 pr-4 text-[var(--foreground)] text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all shadow-lg"
                            />
                        </div>

                        {/* Filter Section */}
                        <div className="bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-3xl p-6 backdrop-blur-xl">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--foreground)]/10">
                                <SlidersHorizontal className="w-5 h-5 text-brand-400" />
                                <h3 className="font-bold text-[var(--foreground)] tracking-wide">Filters</h3>
                            </div>
                            
                            <div className="space-y-4">
                                <h4 className="text-xs uppercase tracking-widest text-[var(--foreground)]/40 font-black mb-3">Categories</h4>
                                <div className="flex flex-col gap-2">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                                activeCategory === cat
                                                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                                                : 'text-[var(--foreground)]/60 hover:bg-[var(--foreground)]/10 hover:text-[var(--foreground)]'
                                            }`}
                                        >
                                            <span>{cat}</span>
                                            {activeCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Grouped Courses Grid */}
                    <div className="flex-grow min-w-0 pb-20">
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

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
                                                {courses.map((course) => (
                                                    <motion.div
                                                        key={course.id}
                                                        whileHover={{ y: -10 }}
                                                        className="will-change-transform h-full flex flex-col"
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

            </div>
        </div>
    );
}
