/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
                mono: ['Space Grotesk', 'monospace'],
            },
            colors: {
                brand: {
                    50: '#f0fdff',
                    100: '#ccfbff',
                    200: '#99f3fe',
                    300: '#4de8fd',
                    400: '#09d0ec',
                    500: '#06b6d4', // Neon Cyan
                    600: '#0891b2',
                    700: '#0e7490',
                    800: '#155e75',
                    900: '#164e63',
                    950: '#083344',
                },
                highlight: {
                    50: '#faf5ff',
                    100: '#f3e8ff',
                    200: '#e9d5ff',
                    300: '#d8b4fe',
                    400: '#c084fc',
                    500: '#a855f7', // Neon Purple
                    600: '#9333ea',
                    700: '#7e22ce',
                    800: '#6b21a8',
                    900: '#581c87',
                    950: '#3b0764',
                },
                indigo: {
                    400: '#818cf8',
                    500: '#6366f1',
                    600: '#4f46e5',
                },
                crypto: {
                    bg: '#020617',
                    surface: '#030820',
                    card: '#0a0f1e',
                    border: 'rgba(6,182,212,0.12)',
                },
                slate: {
                    950: '#020617',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'crypto-gradient': 'linear-gradient(135deg, #06b6d4 0%, #6366f1 50%, #a855f7 100%)',
                'neon-gradient': 'linear-gradient(135deg, #06b6d4, #a855f7)',
                'premium-gradient': 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                'subtle-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 100%)',
            },
            boxShadow: {
                'premium': '0 20px 60px -10px rgba(6, 182, 212, 0.2)',
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
                'neon': '0 0 40px rgba(6, 182, 212, 0.3), 0 0 80px rgba(6, 182, 212, 0.1)',
                'neon-purple': '0 0 40px rgba(168, 85, 247, 0.3)',
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'orbit': 'orbit 8s linear infinite',
                'scan': 'scan-line 4s linear infinite',
                'glow': 'glow-pulse 3s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-14px)' },
                },
                orbit: {
                    from: { transform: 'rotate(0deg)' },
                    to: { transform: 'rotate(360deg)' },
                },
                'glow-pulse': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.2)' },
                    '50%': { boxShadow: '0 0 60px rgba(6, 182, 212, 0.5)' },
                },
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
        },
    },
    plugins: [],
}
