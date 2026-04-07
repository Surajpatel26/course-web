import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    BookOpen,
    Video,
    Trophy,
    TrendingUp,
    Clock,
    Play,
    Settings,
    LogOut
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { featuredCourses } from '../data/mockData';
import { useEffect, useState } from 'react';

export function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const enrolledCourses = [
        { ...featuredCourses[0], progress: 65, lastAccessed: '2 hours ago' },
        { ...featuredCourses[1], progress: 20, lastAccessed: 'Yesterday' },
    ];

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[var(--background)] flex transition-colors duration-300">
            {/* Sidebar */}
            <aside className="w-64 border-r border-[var(--foreground)]/5 bg-[var(--card)] hidden lg:flex flex-col p-6">
                <div className="flex items-center gap-2 mb-10 px-2">
                    <div className="bg-brand-500 p-1.5 rounded-lg text-white">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <span className="font-display font-bold text-xl text-[var(--foreground)]">CoursePro</span>
                </div>

                <nav className="flex-grow space-y-2">
                    {[
                        { label: 'Dashboard', icon: LayoutDashboard, active: true },
                        { label: 'My Courses', icon: BookOpen },
                        { label: 'Webinars', icon: Video },
                        { label: 'Certificates', icon: Trophy },
                        { label: 'Progress', icon: TrendingUp },
                        { label: 'Settings', icon: Settings },
                    ].map((item) => (
                        <button
                            key={item.label}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${item.active
                                ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                                : 'text-[var(--foreground)]/40 hover:bg-[var(--foreground)]/5 hover:text-[var(--foreground)]'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-[var(--foreground)]/30 hover:text-red-500 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-8 md:p-12 overflow-y-auto">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
                        <p className="text-[var(--foreground)]/40">You've completed <span className="text-brand-500 font-bold">65%</span> of your current goal.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-full bg-[var(--foreground)]/5 flex items-center justify-center text-[var(--foreground)]/40 hover:text-[var(--foreground)] transition-colors">
                            <Settings className="w-5 h-5" />
                        </button>
                        <img 
                            src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=06b6d4&color=fff`} 
                            className="w-10 h-10 rounded-full ring-2 ring-brand-500/20 object-cover" 
                            alt={user.name} 
                            referrerPolicy="no-referrer"
                        />
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {[
                        { label: 'Courses in Progress', value: '2', icon: BookOpen, color: 'text-blue-400' },
                        { label: 'Webinars Attended', value: '12', icon: Video, color: 'text-purple-400' },
                        { label: 'Hours Learned', value: '45.5h', icon: Clock, color: 'text-brand-400' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-[var(--card)] border border-[var(--foreground)]/5 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
                            <stat.icon className={`w-6 h-6 ${stat.color} mb-4`} />
                            <div className="text-2xl font-bold text-[var(--foreground)] mb-1">{stat.value}</div>
                            <div className="text-sm text-[var(--foreground)]/40">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Courses in Progress */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-xl font-bold text-[var(--foreground)]">Continue Learning</h2>
                            <Link to="/courses" className="text-brand-500 text-sm font-bold hover:underline">View All</Link>
                        </div>

                        {enrolledCourses.map((course) => (
                            <div key={course.id} className="bg-[var(--card)] border border-[var(--foreground)]/5 rounded-3xl p-6 group hover:bg-[var(--foreground)]/[0.02] transition-all shadow-sm">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="w-full md:w-40 aspect-video rounded-xl overflow-hidden shrink-0">
                                        <img src={course.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="" />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-brand-500 transition-colors">{course.title}</h3>
                                            <div className="text-xs text-[var(--foreground)]/30 font-medium">Last accessed {course.lastAccessed}</div>
                                        </div>
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="flex-grow h-2 bg-[var(--foreground)]/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${course.progress}%` }}
                                                    className="h-full bg-brand-500"
                                                />
                                            </div>
                                            <span className="text-xs font-bold text-[var(--foreground)]">{course.progress}%</span>
                                        </div>
                                        <button className="flex items-center gap-2 text-brand-500 font-bold text-sm hover:text-brand-600">
                                            <Play className="w-4 h-4 fill-current" />
                                            Continue Lesson
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Upcoming Webinars */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">Upcoming Events</h2>
                        {[
                            { title: 'AI in 2026', time: 'Today, 2:00 PM', speaker: 'Kent C. Dodds' },
                            { title: 'Motion Masterclass', time: 'Oct 28, 4:00 PM', speaker: 'Matt Perry' },
                        ].map((event, i) => (
                            <div key={i} className="bg-[var(--card)] border border-[var(--foreground)]/5 rounded-2xl p-5 hover:border-blue-500 transition-all shadow-sm">
                                <h3 className="text-[var(--foreground)] font-bold mb-1">{event.title}</h3>
                                <p className="text-xs text-[var(--foreground)]/40 mb-4">{event.time}</p>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center text-[10px] font-bold">
                                        {event.speaker?.charAt(0) || '?'}
                                    </div>
                                    <span className="text-xs text-[var(--foreground)]/60">{event.speaker}</span>
                                </div>
                                <button className="w-full py-2 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-bold hover:bg-blue-500 hover:text-white transition-all">
                                    Add to Calendar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
