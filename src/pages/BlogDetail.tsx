import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, User, Hash } from 'lucide-react';
import { api } from '../lib/api';

type BlogPost = {
    id: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    image: string;
    category: string;
    readTime: string;
    content: string;
};

export function BlogDetail() {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        const fetchPost = async () => {
            if (!id) return;
            try {
                const data = await api.get<BlogPost>(`/blog/${id}`);
                if (!cancelled) setPost(data);
            } catch (e) {
                console.error('Failed to fetch blog post', e);
                if (!cancelled) setPost(null);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };
        fetchPost();
        return () => { cancelled = true; };
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-4 transition-colors">
                <div className="w-20 h-20 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-4 transition-colors text-center">
                <h1 className="text-6xl font-display font-black text-[var(--foreground)] mb-8 tracking-tighter uppercase italic">Legacy Lost.</h1>
                <p className="text-[var(--foreground)]/40 text-xl mb-12 font-medium">The narrative you seek has shifted through time.</p>
                <Link to="/blog" className="px-12 py-5 rounded-full bg-brand-500 text-white font-black flex items-center gap-3 shadow-premium hover:shadow-2xl transition-all active:scale-95 uppercase tracking-widest text-xs">
                    <ArrowLeft className="w-5 h-5" />
                    Return to Library
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--background)] py-32 transition-colors duration-500 relative overflow-hidden">
            {/* Ambient Overlays */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-brand-500/5 rounded-full blur-[160px] -z-10" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Navigation Back */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-20"
                >
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-4 text-[var(--foreground)]/30 hover:text-brand-500 transition-colors group"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-glass border border-[var(--glass-border)] flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ArrowLeft className="w-5 h-5" />
                        </div>
                        <span className="font-black text-xs uppercase tracking-[0.3em]">The Collection</span>
                    </Link>
                </motion.div>

                {/* Article Header */}
                <header className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-12 text-center"
                    >
                        <div className="flex items-center justify-center gap-6">
                            <span className="text-highlight-500 text-xs font-black uppercase tracking-[0.4em]">
                                {post.category}
                            </span>
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-500/30" />
                            <div className="flex items-center gap-2 text-[var(--foreground)]/30 text-xs font-black uppercase tracking-widest">
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-display font-black text-[var(--foreground)] leading-[0.95] tracking-tighter uppercase italic text-balance">
                            {post.title}
                        </h1>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-12 pt-12 border-t border-[var(--glass-border)]">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-3xl bg-brand-500 text-white flex items-center justify-center text-lg font-black shadow-xl shadow-brand-500/20">
                                    {post.author?.charAt(0) || 'A'}
                                </div>
                                <div className="text-left">
                                    <span className="block text-sm font-black text-[var(--foreground)] uppercase tracking-wider">{post.author || 'Contributor'}</span>
                                    <span className="block text-[10px] font-black text-[var(--foreground)]/30 uppercase tracking-[0.2em]">Primary Strategist</span>
                                </div>
                            </div>
                            <div className="h-px w-24 bg-[var(--glass-border)] hidden md:block" />
                            <div className="flex items-center gap-4 text-left">
                                <div className="w-14 h-14 rounded-3xl bg-glass border border-[var(--glass-border)] flex items-center justify-center text-[var(--foreground)]/40">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="block text-sm font-black text-[var(--foreground)] uppercase tracking-wider">{post.date}</span>
                                    <span className="block text-[10px] font-black text-[var(--foreground)]/30 uppercase tracking-[0.2em]">Launch Date</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </header>

                {/* Hero Feature Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 1.2 }}
                    className="relative aspect-video rounded-[80px] overflow-hidden mb-24 border border-[var(--glass-border)] shadow-2xl group"
                >
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />
                </motion.div>

                {/* Content Body */}
                <motion.article
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="prose max-w-4xl mx-auto"
                >
                    <div
                        className="blog-content"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </motion.article>

                {/* Article Footer / Recruitment */}
                <footer className="mt-48 pt-24 border-t border-[var(--glass-border)]">
                    <div className="relative p-[1px] rounded-[64px] bg-premium-gradient overflow-hidden group">
                        <div className="bg-glass-heavy backdrop-blur-3xl rounded-[63px] p-16 md:p-24 text-center relative z-10 overflow-hidden">
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-500/10 rounded-full blur-[80px]" />
                            <Hash className="w-16 h-16 text-brand-500/20 mx-auto mb-10" />
                            <h3 className="text-4xl md:text-6xl font-display font-black text-[var(--foreground)] mb-8 tracking-tighter italic uppercase">Expand Your <span className="text-gradient">Empire.</span></h3>
                            <p className="text-xl md:text-2xl text-[var(--foreground)]/40 mb-16 max-w-2xl mx-auto leading-relaxed font-medium tracking-tight">Access the full library of elite modules and professional mentorship portals.</p>
                            <div className="flex flex-col sm:flex-row gap-6 max-w-xl mx-auto">
                                <input
                                    type="email"
                                    placeholder="COMMAND@CENTER.COM"
                                    className="bg-[var(--foreground)]/5 border border-[var(--glass-border)] rounded-full px-10 py-6 text-[var(--foreground)] w-full focus:outline-none focus:border-brand-500 transition-all font-black uppercase tracking-[0.2em] text-xs"
                                />
                                <button className="bg-premium-gradient text-white font-black px-12 py-6 rounded-full transition-all shadow-premium hover:-translate-y-1 active:scale-95 uppercase tracking-widest text-xs whitespace-nowrap">
                                    Join Elite
                                </button>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>
        </div>
    );
}
