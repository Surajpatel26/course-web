import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  content: string;
  avatar: string | null;
  rating: number;
};

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const glows = ['#06b6d4', '#a855f7', '#6366f1'];

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const glow = glows[parseInt(testimonial.id) % glows.length] ?? '#06b6d4';

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="flex flex-col h-full relative overflow-hidden group"
      style={{
        borderRadius: 24,
        background: 'rgba(2, 6, 23, 0.75)',
        border: `1px solid ${glow}18`,
        backdropFilter: 'blur(20px)',
        boxShadow: `0 4px 40px rgba(0,0,0,0.4), 0 0 0 0 ${glow}00`,
        transition: 'box-shadow 0.4s ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 8px 50px rgba(0,0,0,0.5), 0 0 40px ${glow}18`)}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 40px rgba(0,0,0,0.4)')}
    >
      {/* Top neon accent line */}
      <div className="absolute top-0 left-8 right-8 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${glow}60, transparent)` }} />

      {/* Corner glow */}
      <div className="absolute top-0 right-0 w-28 h-28 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${glow}15, transparent 70%)` }} />

      <div className="relative z-10 p-7 flex flex-col h-full">
        {/* Header row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3.5 h-3.5 ${i < testimonial.rating ? 'fill-current text-amber-400' : 'text-white/10'}`} />
            ))}
          </div>
          <Quote className="w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ color: `${glow}50` }} />
        </div>

        {/* Quote text */}
        <p className="text-base leading-relaxed font-medium mb-6 flex-grow italic"
          style={{ color: 'rgba(248,250,252,0.65)' }}>
          "{testimonial.content || 'An outstanding learning experience that transformed my career trajectory completely.'}"
        </p>

        {/* Divider */}
        <div className="h-px w-full mb-5" style={{ background: 'rgba(255,255,255,0.05)' }} />

        {/* Author row */}
        <div className="flex items-center gap-4">
          {testimonial.avatar ? (
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-full blur-md opacity-30"
                style={{ background: glow }} />
              <img src={testimonial.avatar} alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover border-2 relative z-10"
                style={{ borderColor: `${glow}40` }} />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-xl shrink-0 border"
              style={{ background: `${glow}15`, color: glow, borderColor: `${glow}30` }}>
              {(testimonial.name || 'A')[0]}
            </div>
          )}
          <div>
            <h4 className="font-black text-base text-white tracking-tight leading-tight">
              {testimonial.name}
            </h4>
            {testimonial.role && (
              <p className="text-[10px] font-black uppercase tracking-widest mt-0.5"
                style={{ color: `${glow}80` }}>
                {testimonial.role}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
