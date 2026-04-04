import { useEffect, useState } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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

export function Blog() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        const fetchPosts = async () => {
            try {
                const data = await api.get<BlogPost[]>('/blog');
                if (!cancelled) setPosts(data);
            } catch (e) {
                console.error('Failed to fetch blog posts', e);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };
        fetchPosts();
        return () => { cancelled = true; };
    }, []);

    return (
        <div className="min-h-screen bg-[var(--background)] py-32 transition-colors duration-500 overflow-hidden relative">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-highlight-500/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-left mb-24 max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-highlight-500 text-xs font-black uppercase tracking-[0.4em] mb-6"
                    >
                        Insights & Perspective
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-8xl font-display font-black text-[var(--foreground)] mb-10 tracking-tighter leading-tight"
                    >
                        Elite <span className="text-gradient italic">Narratives.</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-[var(--foreground)]/40 leading-relaxed font-medium tracking-tight"
                    >
                        Explorations in technology, design, and the architecting of future-proof skillsets.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {isLoading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-[500px] rounded-[48px] bg-glass animate-pulse border border-[var(--glass-border)]" />
                        ))
                    ) : (
                        posts.map((post, i) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                className="group relative flex flex-col h-full bg-glass border border-[var(--glass-border)] rounded-[48px] overflow-hidden hover:bg-[var(--foreground)]/[0.03] transition-all duration-700 shadow-premium hover:shadow-2xl hover:border-brand-500/30"
                            >
                                <Link to={`/blog/${post.id}`} className="block h-64 overflow-hidden relative">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                                    <div className="absolute top-8 left-8">
                                        <span className="bg-brand-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                                            {post.category}
                                        </span>
                                    </div>
                                </Link>

                                <div className="p-10 flex-1 flex flex-col">
                                    <div className="flex items-center gap-6 text-[var(--foreground)]/30 text-[10px] font-black uppercase tracking-widest mb-6">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>{post.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>{post.readTime}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-display font-black text-[var(--foreground)] mb-6 tracking-tight leading-[1.2] group-hover:text-brand-500 transition-colors uppercase italic">
                                        {post.title}
                                    </h3>

                                    <p className="text-[var(--foreground)]/40 text-lg mb-8 line-clamp-3 leading-relaxed font-medium flex-1">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between pt-8 border-t border-[var(--glass-border)]">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-2xl bg-brand-500 text-white flex items-center justify-center text-xs font-black shadow-lg">
                                                {post.author?.charAt(0) || '?'}
                                            </div>
                                            <div>
                                                <span className="block text-xs font-black text-[var(--foreground)] uppercase tracking-wider">{post.author || 'Member'}</span>
                                                <span className="block text-[8px] font-black text-[var(--foreground)]/30 uppercase tracking-[0.2em]">Contributor</span>
                                            </div>
                                        </div>
                                        <Link
                                            to={`/blog/${post.id}`}
                                            className="w-10 h-10 rounded-2xl bg-[var(--foreground)]/5 text-[var(--foreground)] flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-all transform group-hover:scale-110 active:scale-95"
                                        >
                                            <ArrowRight className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        ))
                    )}
                </div>

                {/* Newsletter Section - Revamped */}
                <div className="mt-48 relative p-[1px] rounded-[64px] bg-premium-gradient overflow-hidden group">
                    <div className="bg-glass-heavy backdrop-blur-3xl rounded-[63px] p-16 md:p-24 text-center relative z-10">
                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-brand-500/10 text-brand-500 text-[10px] font-black uppercase tracking-[0.3em] mb-10 border border-brand-500/20">
                            The Inner Circle
                        </div>
                        <h2 className="text-5xl md:text-7xl font-display font-black text-[var(--foreground)] mb-8 tracking-tighter leading-none italic uppercase">
                            Stay <span className="text-gradient">Ahead.</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-[var(--foreground)]/40 mb-16 max-w-2xl mx-auto leading-relaxed font-medium tracking-tight italic">
                            Curated intelligence for visionaries, delivered straight to your portal.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 max-w-xl mx-auto">
                            <input
                                type="email"
                                placeholder="ACCESS@DOMAIN.COM"
                                className="bg-[var(--foreground)]/5 border border-[var(--glass-border)] rounded-full px-8 py-5 text-[var(--foreground)] w-full focus:outline-none focus:border-brand-500 transition-all font-black uppercase tracking-widest text-xs"
                            />
                            <button className="bg-premium-gradient text-white font-black px-12 py-5 rounded-full transition-all shadow-premium hover:-translate-y-1 active:scale-95 whitespace-nowrap uppercase tracking-widest text-xs">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
