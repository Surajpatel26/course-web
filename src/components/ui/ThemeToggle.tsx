import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/themeContext';
import { motion } from 'framer-motion';

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-slate-300 hover:text-white"
            aria-label="Toggle Theme"
        >
            {theme === 'light' ? (
                <Moon className="w-5 h-5" />
            ) : (
                <Sun className="w-5 h-5" />
            )}
        </motion.button>
    );
}
