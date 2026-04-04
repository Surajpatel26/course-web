import { motion } from 'framer-motion';
const logos = [
    { name: 'Google', src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
    { name: 'Microsoft', src: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
    { name: 'Meta', src: 'https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/meta-brand-color.png' },
    { name: 'Amazon', src: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', invertProps: 'brightness-0 invert' },
    { name: 'Netflix', src: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
    { name: 'Apple', src: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg', invertProps: 'brightness-0 invert' },
    { name: 'Slack', src: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg' },
    { name: 'Spotify', src: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg', invertProps: 'brightness-0 invert' }
];

function LogoItem({ logo }: { logo: typeof logos[0] }) {
    return (
        <motion.div
            className="flex items-center justify-center px-10 group cursor-default"
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
            <div className="relative h-16 flex items-center justify-center min-w-[140px] px-4">
                <img
                    src={logo.src}
                    alt={logo.name}
                    className={`max-h-8 max-w-[120px] w-auto object-contain transition-all duration-500 opacity-90 group-hover:opacity-100 ${logo.invertProps || ''}`}
                    loading="lazy"
                    crossOrigin="anonymous"
                />
            </div>
        </motion.div>
    );
}

export function LogoMarquee() {
    // For a perfect infinite loop, we need exactly two sets of the items
    const duplicatedLogos = [...logos, ...logos];

    return (
        <div className="w-full overflow-hidden py-10 relative">
            {/* Gradient overlays - hardcoded to dark bg */}
            <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right, #020617, transparent)' }} />
            <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to left, #020617, transparent)' }} />

            <motion.div
                className="flex whitespace-nowrap items-center w-max"
                animate={{
                    x: ["0%", "-50%"]
                }}
                transition={{
                    duration: 30, // Faster, smoother scroll
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                {duplicatedLogos.map((logo, index) => (
                    <LogoItem key={`${logo.name}-${index}`} logo={logo} />
                ))}
            </motion.div>
        </div>
    );
}
