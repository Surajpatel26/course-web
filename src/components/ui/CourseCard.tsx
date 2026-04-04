import { Clock, Users, Star, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export interface Course {
    id: string;
    title: string;
    instructor: string;
    image: string;
    price: number;
    originalPrice?: number;
    rating: number;
    students: number;
    duration: string;
    category: string;
}

interface CourseCardProps {
    course: Course;
}

const categoryColors: Record<string, string> = {
    default: '#06b6d4',
    design: '#a855f7',
    development: '#6366f1',
    marketing: '#f59e0b',
    business: '#10b981',
};

export function CourseCard({ course }: CourseCardProps) {
    const glow = categoryColors[course.category?.toLowerCase()] ?? categoryColors.default;

    return (
        <Link to={`/courses/${course.id}`} className="block h-full group">
            <motion.div
                whileHover={{ y: -8, boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${glow}20` }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="h-full flex flex-col overflow-hidden relative"
                style={{
                    borderRadius: 20,
                    background: 'rgba(2, 6, 23, 0.8)',
                    border: `1px solid ${glow}18`,
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
                }}
            >
                {/* Top neon accent line */}
                <div className="absolute top-0 left-8 right-8 h-px z-20"
                    style={{ background: `linear-gradient(90deg, transparent, ${glow}60, transparent)` }} />

                {/* Image */}
                <div className="relative h-52 overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/30 to-transparent z-10" />
                    <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />

                    {/* Category pill */}
                    <div className="absolute top-4 left-4 z-20">
                        <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full"
                            style={{
                                color: glow,
                                background: `${glow}18`,
                                border: `1px solid ${glow}30`,
                                backdropFilter: 'blur(12px)',
                            }}>
                            {course.category}
                        </span>
                    </div>

                    {/* Hover arrow */}
                    <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center"
                            style={{ background: glow, boxShadow: `0 0 20px ${glow}60` }}>
                            <ArrowUpRight className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                    {/* Stars */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3 h-3 ${i < Math.floor(course.rating) ? 'fill-current text-amber-400' : 'text-white/10'}`} />
                            ))}
                        </div>
                        <span className="text-xs font-black text-white/30">{course.rating.toFixed(1)}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-display font-black text-white mb-2 line-clamp-2 leading-tight tracking-tight group-hover:transition-colors duration-300"
                        style={{ transition: 'color 0.3s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = glow)}
                        onMouseLeave={e => (e.currentTarget.style.color = '#ffffff')}>
                        {course.title}
                    </h3>

                    {/* Instructor */}
                    <p className="text-xs font-bold uppercase tracking-widest italic text-white/35 mb-4">
                        {course.instructor}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/25 mb-5">
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3" style={{ color: glow }} />
                            <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Users className="w-3 h-3" style={{ color: glow }} />
                            <span>
                                {course.students >= 1000
                                    ? `${(course.students / 1000).toFixed(1)}k`
                                    : course.students} scholars
                            </span>
                        </div>
                    </div>

                    {/* Price footer */}
                    <div className="flex items-center justify-between mt-auto pt-4"
                        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-display font-black text-white tracking-tighter">
                                ${course.price}
                            </span>
                            {course.originalPrice && (
                                <span className="text-sm text-white/20 line-through font-bold">
                                    ${course.originalPrice}
                                </span>
                            )}
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-wider px-4 py-2 rounded-xl transition-all duration-300"
                            style={{
                                color: glow,
                                background: `${glow}12`,
                                border: `1px solid ${glow}25`,
                            }}>
                            Enroll
                        </div>
                    </div>
                </div>

                {/* Bottom ambient glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[20px]"
                    style={{ background: `radial-gradient(circle at 50% 100%, ${glow}06, transparent 70%)` }} />
            </motion.div>
        </Link>
    );
}
