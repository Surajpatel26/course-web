import { motion } from 'framer-motion';
import { Target, Award, Globe, Users } from 'lucide-react';

const stats = [
    { label: 'Active Learners', value: '50K+', icon: Users },
    { label: 'Premium Courses', value: '200+', icon: Award },
    { label: 'Countries Reached', value: '120+', icon: Globe },
    { label: 'Career Transitions', value: '10K+', icon: Target },
];

export function About() {
    return (
        <div className="min-h-screen bg-[var(--background)] py-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--foreground)] mb-6">
                            Our Mission is to <br />
                            <span className="text-brand-400">Democratize Education</span>
                        </h1>
                        <p className="text-xl text-[var(--foreground)]/60 leading-relaxed">
                            We started CoursePro with a simple idea: everyone deserves access to world-class education. Today, we connect ambitious learners with elite industry experts.
                        </p>
                    </motion.div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-2xl p-6 text-center hover:bg-[var(--foreground)]/10 transition-colors"
                        >
                            <div className="mx-auto w-12 h-12 bg-brand-500/20 rounded-full flex items-center justify-center mb-4">
                                <stat.icon className="w-6 h-6 text-brand-400" />
                            </div>
                            <div className="text-3xl font-bold text-[var(--foreground)] mb-2">{stat.value}</div>
                            <div className="text-sm text-[var(--foreground)]/60 font-medium">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl font-bold text-[var(--foreground)]">Join a thriving global community</h2>
                        <p className="text-[var(--foreground)]/60 text-lg">
                            Learning is better together. Our platform doesn't just offer video courses; it offers a rich community experience. Participate in live Q&As, join study groups, and network with peers from around the globe.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-brand-500 rounded-3xl blur-3xl opacity-20" />
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                            alt="Team collaborating"
                            className="relative rounded-3xl shadow-2xl border border-[var(--foreground)]/10 object-cover h-96 w-full"
                        />
                    </motion.div>
                </div>

            </div>
        </div>
    );
}
