import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { WebinarCard } from '../components/ui/WebinarCard';
import type { Webinar } from '../components/ui/WebinarCard';
import { api } from '../lib/api';

export function Webinars() {
    const [webinars, setWebinars] = useState<Webinar[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        const fetchWebinars = async () => {
            try {
                const data = await api.get('/webinars');
                if (!cancelled) setWebinars(data);
            } catch (e) {
                console.error('Failed to fetch webinars', e);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };
        fetchWebinars();
        return () => { cancelled = true; };
    }, []);

    return (
        <div className="min-h-screen bg-[var(--background)] py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-display font-bold text-[var(--foreground)] mb-4"
                    >
                        Live <span className="text-blue-500">Webinars</span>
                    </motion.h1>
                    <p className="text-lg text-[var(--foreground)]/60 max-w-2xl">
                        Join interactive sessions with industry experts. Stay ahead of the curve with real-time insights and Q&A.
                    </p>
                </div>

                {/* Webinar List */}
                <div className="grid grid-cols-1 gap-8 max-w-4xl">
                    {isLoading ? (
                        <div className="text-[var(--foreground)]/40 font-bold">Loading webinars…</div>
                    ) : webinars.map((webinar, i) => (
                        <motion.div
                            key={`${webinar.id}-${i}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                            <WebinarCard webinar={webinar} />
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
}
