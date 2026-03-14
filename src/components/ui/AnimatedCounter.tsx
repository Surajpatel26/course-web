import { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
    value: number;
    duration?: number;
    suffix?: string;
}

export function AnimatedCounter({ value, duration = 2, suffix = '' }: AnimatedCounterProps) {
    const spring = useSpring(0, {
        mass: 1,
        stiffness: 100 / (duration / 2),
        damping: 30,
    });

    const display = useTransform(spring, (current) =>
        Math.round(current).toLocaleString() + suffix
    );

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    return <motion.span>{display}</motion.span>;
}
