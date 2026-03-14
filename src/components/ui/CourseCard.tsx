import { Clock, Users, Star } from 'lucide-react';
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

export function CourseCard({ course }: CourseCardProps) {
    return (
        <Link to={`/courses/${course.id}`} className="block h-full">
            <motion.div
                whileHover={{ y: -8 }}
                className="bg-[var(--card)] rounded-2xl overflow-hidden border border-[var(--foreground)]/10 shadow-xl group hover:shadow-brand-500/20 transition-all duration-300 h-full flex flex-col"
            >
                <div className="relative h-48 overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent z-10" />
                    <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 z-20">
                        <span className="bg-brand-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                            {course.category}
                        </span>
                    </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-1 mb-3 shrink-0">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-[var(--foreground)] font-medium text-sm">{course.rating.toFixed(1)}</span>
                    </div>

                    <h3 className="text-lg font-bold text-[var(--foreground)] mb-2 line-clamp-2 group-hover:text-brand-500 transition-colors shrink-0">
                        {course.title}
                    </h3>

                    <p className="text-[var(--foreground)]/60 text-sm mb-4 shrink-0">by {course.instructor}</p>

                    <div className="flex items-center gap-4 text-xs text-[var(--foreground)]/50 mb-6 shrink-0">
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-brand-500" />
                            <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Users className="w-4 h-4 text-blue-500" />
                            <span>{course.students.toLocaleString()} students</span>
                        </div>
                    </div>

                    <div className="flex flex-col mt-auto pt-4 border-t border-[var(--foreground)]/10 gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-[var(--foreground)]">${course.price}</span>
                                {course.originalPrice && (
                                    <span className="text-[var(--foreground)]/40 line-through text-sm">${course.originalPrice}</span>
                                )}
                            </div>
                        </div>
                        <button className="w-full py-2.5 rounded-xl bg-[var(--foreground)]/5 hover:bg-brand-500 text-[var(--foreground)] hover:text-white font-bold transition-all text-sm border border-[var(--foreground)]/10 hover:border-brand-500">
                            Enroll Now
                        </button>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
