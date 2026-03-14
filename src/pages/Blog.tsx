import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/mockData';

export function Blog() {
    return (
        <div className="min-h-screen bg-[var(--background)] py-24 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-display font-bold text-[var(--foreground)] mb-4"
                    >
                        Our <span className="text-brand-400">Blog</span>
                    </motion.h1>
                    <p className="text-lg text-[var(--foreground)]/60 max-w-2xl mx-auto">
                        Latest news, tutorials, and insights from the team at CoursePro.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, i) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[var(--card)] border border-[var(--foreground)]/10 rounded-3xl overflow-hidden group hover:border-brand-500/50 transition-all duration-300"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="flex items-center gap-4 text-xs text-[var(--foreground)]/40 mb-4">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4 text-brand-500" />
                                        <span>{post.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-4 h-4 text-brand-500" />
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 line-clamp-2 group-hover:text-brand-500 transition-colors">
                                    {post.title}
                                </h3>

                                <p className="text-[var(--foreground)]/60 text-sm mb-6 line-clamp-3 leading-relaxed">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between pt-6 border-t border-[var(--foreground)]/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-500 text-xs font-bold">
                                            {post.author.charAt(0)}
                                        </div>
                                        <span className="text-sm text-[var(--foreground)]/70 font-medium">{post.author}</span>
                                    </div>
                                    <Link
                                        to={`/blog/${post.id}`}
                                        className="text-brand-400 hover:text-brand-300 font-bold text-sm flex items-center gap-2 group/btn"
                                    >
                                        Read More
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <div className="mt-20 p-12 rounded-3xl bg-gradient-to-br from-brand-500/20 to-blue-500/20 border border-[var(--foreground)]/10 text-center">
                    <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">Join our newsletter</h2>
                    <p className="text-[var(--foreground)]/70 mb-8 max-w-xl mx-auto">Get the best of CoursePro delivered straight to your inbox. No spam, only high-quality content.</p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-xl px-6 py-3 text-[var(--foreground)] w-full focus:outline-none focus:border-brand-500 transition-all placeholder:text-[var(--foreground)]/20"
                        />
                        <button className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg hover:shadow-brand-500/25">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
