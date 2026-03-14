import { Link } from 'react-router-dom';
import { BookOpen, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-[var(--background)] border-t border-[var(--glass-border)] pt-16 pb-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="bg-gradient-to-br from-brand-400 to-blue-500 p-2 rounded-xl">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-display font-bold text-2xl tracking-tight text-[var(--foreground)]">
                                Course<span className="text-brand-500">Pro</span>
                            </span>
                        </Link>
                        <p className="text-[var(--foreground)]/60 text-sm leading-relaxed max-w-xs">
                            Empowering learners worldwide with premium courses and interactive webinars. Start your journey today.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <a href="#" className="w-10 h-10 rounded-full bg-[var(--foreground)]/5 flex items-center justify-center text-[var(--foreground)]/40 hover:bg-brand-500 hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[var(--foreground)]/5 flex items-center justify-center text-[var(--foreground)]/40 hover:bg-brand-500 hover:text-white transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[var(--foreground)]/5 flex items-center justify-center text-[var(--foreground)]/40 hover:bg-brand-500 hover:text-white transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[var(--foreground)] font-semibold mb-6">Explore</h3>
                        <ul className="space-y-4">
                            <li><Link to="/courses" className="text-[var(--foreground)]/60 hover:text-brand-500 transition-colors">All Courses</Link></li>
                            <li><Link to="/webinars" className="text-[var(--foreground)]/60 hover:text-brand-500 transition-colors">Live Webinars</Link></li>
                            <li><Link to="/blog" className="text-[var(--foreground)]/60 hover:text-brand-500 transition-colors">Blog</Link></li>
                            <li><Link to="/faq" className="text-[var(--foreground)]/60 hover:text-brand-500 transition-colors">FAQ</Link></li>
                            <li><Link to="/about" className="text-[var(--foreground)]/60 hover:text-brand-500 transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[var(--foreground)] font-semibold mb-6">Legal</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-[var(--foreground)]/60 hover:text-brand-500 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="text-[var(--foreground)]/60 hover:text-brand-500 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-[var(--foreground)]/60 hover:text-brand-500 transition-colors">Cookie Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[var(--foreground)] font-semibold mb-6">Newsletter</h3>
                        <p className="text-[var(--foreground)]/60 text-sm mb-4">Subscribe to get the latest updates on courses and webinars.</p>
                        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-lg px-4 py-2 text-[var(--foreground)] text-sm w-full focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                            />
                            <button className="bg-brand-500 hover:bg-brand-600 text-white rounded-lg px-4 py-2 transition-colors flex items-center justify-center">
                                <Mail className="w-5 h-5" />
                            </button>
                        </form>
                    </div>

                </div>

                <div className="pt-8 border-t border-[var(--foreground)]/5 text-center flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[var(--foreground)]/40 text-sm">
                        © {new Date().getFullYear()} CoursePro Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-[var(--foreground)]/40">
                        <span>Made with React & Tailwind</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
