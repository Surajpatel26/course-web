import { motion } from 'framer-motion';

export function Loader() {
    return (
        <div className="flex items-center justify-center min-h-[50vh] w-full">
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                    borderRadius: ["20%", "50%", "20%"],
                }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                    repeat: Infinity,
                }}
                className="w-16 h-16 border-4 border-cyan-500 border-t-purple-500 rounded-full"
                style={{
                    boxShadow: "0 0 20px rgba(6, 182, 212, 0.5), 0 0 20px rgba(168, 85, 247, 0.5)"
                }}
            />
        </div>
    );
}
