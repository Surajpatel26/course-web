import { Calendar, Clock, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export interface Webinar {
    id: string;
    title: string;
    speaker: string;
    speakerRole: string;
    image: string;
    date: string;
    time: string;
    isLive?: boolean;
}

interface WebinarCardProps {
    webinar: Webinar;
}

export function WebinarCard({ webinar }: WebinarCardProps) {
    return (
        <Link to={`/webinars/${webinar.id}`} className="block h-full">
            <motion.div
                whileHover={{ y: -5 }}
                className="bg-[var(--card)] rounded-2xl overflow-hidden border border-[var(--foreground)]/10 shadow-lg group relative h-full flex flex-col transition-colors"
            >
                {webinar.isLive && (
                    <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-red-500/90 text-white text-xs font-bold px-3 py-1.5 rounded-full animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-white" />
                        LIVE NOW
                    </div>
                )}

                <div className="flex flex-col md:flex-row h-full">
                    <div className="md:w-2/5 relative h-48 md:h-auto overflow-hidden shrink-0">
                        <img
                            src={webinar.image}
                            alt={webinar.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    <div className="p-6 md:w-3/5 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 group-hover:text-blue-500 transition-colors">
                            {webinar.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--foreground)]/60 mb-6">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-brand-500" />
                                <span>{webinar.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-brand-500" />
                                <span>{webinar.time}</span>
                            </div>
                        </div>

                        <div className="mt-auto pt-6 border-t border-[var(--foreground)]/5 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                                    {webinar.speaker.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-[var(--foreground)] text-sm font-medium">{webinar.speaker}</p>
                                    <p className="text-[var(--foreground)]/40 text-xs">{webinar.speakerRole}</p>
                                </div>
                            </div>

                            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95">
                                <Video className="w-4 h-4" />
                                Join
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
