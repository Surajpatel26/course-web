import { motion } from 'framer-motion';
import { useState } from 'react';

// Company logos with multiple fallback sources and brand colors
const logos = [
    {
        name: 'Google',
        slug: 'google',
        color: '#4285F4',
        bgColor: '#4285F4',
        sources: [
            'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
            'https://cdn.simpleicons.org/google/4285F4',
            'https://logo.clearbit.com/google.com',
            'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg'
        ]
    },
    {
        name: 'Microsoft',
        slug: 'microsoft',
        color: '#00A4EF',
        bgColor: '#00A4EF',
        sources: [
            'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31',
            'https://cdn.simpleicons.org/microsoft/00A4EF',
            'https://logo.clearbit.com/microsoft.com',
            'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg'
        ]
    },
    {
        name: 'Meta',
        slug: 'meta',
        color: '#0668E1',
        bgColor: '#0668E1',
        sources: [
            'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
            'https://cdn.simpleicons.org/meta/0668E1',
            'https://logo.clearbit.com/meta.com',
            'https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png'
        ]
    },
    {
        name: 'Amazon',
        slug: 'amazon',
        color: '#FF9900',
        bgColor: '#FF9900',
        sources: [
            'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
            'https://cdn.simpleicons.org/amazon/FF9900',
            'https://logo.clearbit.com/amazon.com',
            'https://www.amazon.com/favicon.ico'
        ]
    },
    {
        name: 'Netflix',
        slug: 'netflix',
        color: '#E50914',
        bgColor: '#E50914',
        sources: [
            'https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg',
            'https://cdn.simpleicons.org/netflix/E50914',
            'https://logo.clearbit.com/netflix.com',
            'https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.ico'
        ]
    },
    {
        name: 'Apple',
        slug: 'apple',
        color: '#555555',
        bgColor: '#555555',
        sources: [
            'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
            'https://cdn.simpleicons.org/apple/555555',
            'https://logo.clearbit.com/apple.com',
            'https://www.apple.com/favicon.ico'
        ]
    },
    {
        name: 'Adobe',
        slug: 'adobe',
        color: '#FF0000',
        bgColor: '#FF0000',
        sources: [
            'https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_logo.svg',
            'https://cdn.simpleicons.org/adobe/FF0000',
            'https://logo.clearbit.com/adobe.com',
            'https://www.adobe.com/favicon.ico'
        ]
    },
    {
        name: 'Slack',
        slug: 'slack',
        color: '#4A154B',
        bgColor: '#4A154B',
        sources: [
            'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg',
            'https://cdn.simpleicons.org/slack/4A154B',
            'https://logo.clearbit.com/slack.com',
            'https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png'
        ]
    },
    {
        name: 'Spotify',
        slug: 'spotify',
        color: '#1DB954',
        bgColor: '#1DB954',
        sources: [
            'https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png',
            'https://cdn.simpleicons.org/spotify/1DB954',
            'https://logo.clearbit.com/spotify.com',
            'https://www.scdn.co/i/_global/twitter_card-default.png'
        ]
    },
    {
        name: 'Intel',
        slug: 'intel',
        color: '#0071C5',
        bgColor: '#0071C5',
        sources: [
            'https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel-logo.svg',
            'https://cdn.simpleicons.org/intel/0071C5',
            'https://logo.clearbit.com/intel.com',
            'https://www.intel.com/favicon.ico'
        ]
    },
    {
        name: 'Nvidia',
        slug: 'nvidia',
        color: '#76B900',
        bgColor: '#76B900',
        sources: [
            'https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg',
            'https://cdn.simpleicons.org/nvidia/76B900',
            'https://logo.clearbit.com/nvidia.com',
            'https://www.nvidia.com/favicon.ico'
        ]
    },
    {
        name: 'IBM',
        slug: 'ibm',
        color: '#0062AD',
        bgColor: '#0062AD',
        sources: [
            'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
            'https://cdn.simpleicons.org/ibm/0062AD',
            'https://logo.clearbit.com/ibm.com',
            'https://www.ibm.com/favicon.ico'
        ]
    },
    {
        name: 'Salesforce',
        slug: 'salesforce',
        color: '#00A1E0',
        bgColor: '#00A1E0',
        sources: [
            'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg',
            'https://cdn.simpleicons.org/salesforce/00A1E0',
            'https://logo.clearbit.com/salesforce.com',
            'https://www.salesforce.com/favicon.ico'
        ]
    },
    {
        name: 'Oracle',
        slug: 'oracle',
        color: '#F80000',
        bgColor: '#F80000',
        sources: [
            'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg',
            'https://cdn.simpleicons.org/oracle/F80000',
            'https://logo.clearbit.com/oracle.com',
            'https://www.oracle.com/favicon.ico'
        ]
    },
];

function LogoItem({ logo }: { logo: typeof logos[0], index: number }) {
    const [currentSourceIndex, setCurrentSourceIndex] = useState(0);
    const [loadError, setLoadError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);


    const handleError = () => {
        // Try next source if available
        if (currentSourceIndex < logo.sources.length - 1) {
            setCurrentSourceIndex(prev => prev + 1);
            setIsLoaded(false);
        } else {
            setLoadError(true);
        }
    };

    const handleLoad = () => {
        setIsLoaded(true);
        setLoadError(false);
    };

    // If all sources failed, show colored text fallback with brand color
    if (loadError) {
        return (
            <motion.div
                className="flex items-center justify-center px-8 group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
                <div className="h-16 md:h-20 w-32 flex items-center justify-center">
                    <span
                        className="text-lg font-semibold px-4 py-2 rounded-lg transition-all duration-300"
                        style={{
                            color: logo.color,
                            backgroundColor: `${logo.color}15`,
                            border: `1px solid ${logo.color}30`
                        }}
                    >
                        {logo.name}
                    </span>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="flex items-center justify-center px-8 group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            <div className="relative h-16 md:h-20 w-32 flex items-center justify-center">
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div
                            className="w-6 h-6 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"
                            style={{ borderTopColor: logo.color }}
                        />
                    </div>
                )}

                <img
                    key={logo.sources[currentSourceIndex]}
                    src={logo.sources[currentSourceIndex]}
                    alt={logo.name}
                    onLoad={handleLoad}
                    onError={handleError}
                    className={`max-h-12 md:max-h-14 max-w-28 w-auto object-contain transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    style={{
                        transition: 'opacity 0.3s ease'
                    }}
                    loading="lazy"
                />
            </div>
        </motion.div>
    );
}

export function LogoMarquee() {
    const [isHovered, setIsHovered] = useState(false);
    const [duplicatedLogos] = useState([...logos, ...logos, ...logos]);

    // Calculate total width for animation
    const logoWidth = 200; // Approximate width including padding
    const totalWidth = duplicatedLogos.length * logoWidth;

    return (
        <div className="w-full overflow-hidden py-16 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-y border-gray-200 dark:border-gray-700 relative">
            {/* Gradient overlays for smooth fade effect */}
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-gray-50 via-gray-50/90 to-transparent dark:from-gray-900 dark:via-gray-900/90 z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-gray-50 via-gray-50/90 to-transparent dark:from-gray-900 dark:via-gray-900/90 z-10 pointer-events-none" />

            <motion.div
                className="flex whitespace-nowrap items-center"
                animate={{
                    x: isHovered ? 0 : [0, -totalWidth / 3]
                }}
                transition={{
                    x: {
                        duration: isHovered ? 0 : 40,
                        repeat: isHovered ? 0 : Infinity,
                        ease: "linear",
                        repeatType: "loop",
                    }
                }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                style={{
                    willChange: "transform",
                }}
            >
                {duplicatedLogos.map((logo, index) => (
                    <LogoItem key={`${logo.slug}-${index}`} logo={logo} index={index} />
                ))}
            </motion.div>

            {/* Colored shine effect on hover */}
            {isHovered && (
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    exit={{ opacity: 0 }}
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(66, 133, 244, 0.1), rgba(234, 67, 53, 0.1), rgba(251, 188, 5, 0.1), rgba(52, 168, 83, 0.1), transparent)',
                        mixBlendMode: 'overlay'
                    }}
                />
            )}
        </div>
    );
}