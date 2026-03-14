import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, User, Hash } from 'lucide-react';
import { blogPosts } from '../data/mockData';

export function BlogDetail() {
    const { id } = useParams<{ id: string }>();
    const post = blogPosts.find(p => p.id === id);

    if (!post) {
        return (
            <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-4 transition-colors">
                <h1 className="text-4xl font-display font-bold text-[var(--foreground)] mb-4">Post not found</h1>
                <Link to="/blog" className="text-brand-400 hover:text-brand-300 font-bold flex items-center gap-2">
                    <ArrowLeft className="w-5 h-5" />
                    Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--background)] py-24 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-[var(--foreground)]/40 hover:text-brand-500 transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to all posts</span>
                    </Link>
                </motion.div>

                {/* Header */}
                <header className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-3">
                            <span className="bg-brand-500/10 text-brand-400 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-brand-500/20">
                                {post.category}
                            </span>
                            <div className="h-px w-12 bg-[var(--foreground)]/10" />
                            <div className="flex items-center gap-2 text-[var(--foreground)]/40 text-sm">
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-display font-black text-[var(--foreground)] leading-tight tracking-tighter">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-8 pt-4 border-t border-[var(--foreground)]/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 border border-brand-500/20">
                                    <User className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="block text-[var(--foreground)] font-bold text-sm">{post.author}</span>
                                    <span className="block text-[var(--foreground)]/40 text-xs uppercase font-black tracking-wider">Author</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[var(--foreground)]/5 flex items-center justify-center text-[var(--foreground)]/40 border border-[var(--foreground)]/5">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="block text-[var(--foreground)] font-bold text-sm">{post.date}</span>
                                    <span className="block text-[var(--foreground)]/40 text-xs uppercase font-black tracking-wider">Published</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </header>

                {/* Cover Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative aspect-video rounded-[48px] overflow-hidden mb-16 border border-[var(--foreground)]/10 shadow-2xl"
                >
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
                </motion.div>

                {/* Content */}
                <motion.article
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="prose dark:prose-invert prose-brand max-w-none"
                >
                    <div
                        className="text-lg text-[var(--foreground)]/80 leading-relaxed font-medium space-y-8 blog-content"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </motion.article>

                {/* Footer Section */}
                <footer className="mt-24 pt-12 border-t border-[var(--foreground)]/5">
                    <div className="bg-[var(--card)]/50 backdrop-blur-xl border border-[var(--foreground)]/10 rounded-[40px] p-12 text-center transition-colors">
                        <Hash className="w-12 h-12 text-brand-500/30 mx-auto mb-6" />
                        <h3 className="text-2xl font-display font-bold text-[var(--foreground)] mb-4">Want more insights?</h3>
                        <p className="text-[var(--foreground)]/60 mb-8 max-w-md mx-auto">Subscribe to our engineering newsletter and get the latest trends delivered to your inbox.</p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-grow bg-[var(--background)]/5 border border-[var(--foreground)]/10 rounded-2xl px-6 py-4 text-[var(--foreground)] focus:outline-none focus:border-brand-500 transition-all placeholder:text-[var(--foreground)]/20"
                            />
                            <button className="bg-brand-500 hover:bg-brand-600 text-white font-black px-8 py-4 rounded-2xl transition-all shadow-xl shadow-brand-500/20 active:scale-95">
                                Join Now
                            </button>
                        </div>
                    </div>
                </footer>

            </div>
        </div>
    );
}
