import type { Course } from '../components/ui/CourseCard';


export const featuredCourses: Course[] = [
    {
        id: '1',
        title: 'Advanced React Patterns & Performance',
        instructor: 'Sarah Drasner',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
        price: 99,
        originalPrice: 149,
        rating: 4.9,
        students: 12450,
        duration: '14h 30m',
        category: 'Development'
    },
    {
        id: '4',
        title: 'Mastering Python for Data Science',
        instructor: 'Dr. Angela Yu',
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
        price: 109,
        rating: 4.8,
        students: 9800,
        duration: '22h 15m',
        category: 'Data Science'
    },
    {
        id: '2',
        title: 'UI/UX Design Masterclass: From Zero to Hero',
        instructor: 'Gary Simon',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
        price: 89,
        rating: 4.8,
        students: 8320,
        duration: '10h 15m',
        category: 'Design'
    },
    {
        id: '5',
        title: 'Strategic Business Management',
        instructor: 'Seth Godin',
        image: 'https://images.unsplash.com/photo-1507679799987-c7377f3da3b2?w=800&q=80',
        price: 199,
        originalPrice: 299,
        rating: 4.9,
        students: 3200,
        duration: '12h 00m',
        category: 'Business'
    },
    {
        id: '3',
        title: 'Fullstack Next.js 14 and tRPC',
        instructor: 'Theo Browne',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
        price: 129,
        originalPrice: 199,
        rating: 5.0,
        students: 5430,
        duration: '18h 45m',
        category: 'Development'
    },
    {
        id: '6',
        title: 'Growth Marketing Strategies 2026',
        instructor: 'Neil Patel',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
        price: 79,
        rating: 4.7,
        students: 15600,
        duration: '8h 30m',
        category: 'Marketing'
    },
    {
        id: '7',
        title: 'Machine Learning A-Z: Hands-On Python',
        instructor: 'Kirill Eremenko',
        image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800&q=80',
        price: 149,
        rating: 4.9,
        students: 22000,
        duration: '44h 00m',
        category: 'Data Science'
    },
    {
        id: '8',
        title: 'Corporate Leadership & Influence',
        instructor: 'Simon Sinek',
        image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80',
        price: 159,
        originalPrice: 249,
        rating: 4.8,
        students: 4500,
        duration: '15h 45m',
        category: 'Business'
    },
    {
        id: '9',
        title: 'Final Cut Pro X: Video Editing Masterclass',
        instructor: 'Justin Odisho',
        image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
        price: 69,
        rating: 4.7,
        students: 7200,
        duration: '9h 20m',
        category: 'Design'
    }
];


export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    image: string;
    category: string;
    readTime: string;
    content: string;
}


export interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    avatar: string;
    rating: number;
}

export const blogPosts: BlogPost[] = [
    {
        id: '1',
        title: 'How to Become a Full Stack Developer in 2026',
        excerpt: 'A comprehensive guide to the modern web stack, from React 19 to advanced backend patterns.',
        author: 'Sarah Drasner',
        date: 'March 10, 2026',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
        category: 'Career',
        readTime: '8 min read',
        content: `
            <p>Becoming a full stack developer in 2026 requires a different approach than it did just a few years ago. The landscape has shifted with the integration of AI-assisted coding, the stabilization of React 19, and the rise of edge computing.</p>
            
            <h2>1. Master the Core Fundamentals</h2>
            <p>Before diving into frameworks, ensure you have a rock-solid understanding of TypeScript. In 2026, TypeScript is no longer optional; it is the industry standard. Focus on advanced patterns like generics, utility types, and conditional types.</p>
            
            <h2>2. The React 19 Revolution</h2>
            <p>React 19 has simplified many complex patterns. Learn how to leverage Server Components (RSC) efficiently. Understand the new 'use' hook for resource handling and how to use Actions for data mutations without manual state management.</p>
            
            <h2>3. Backend Beyond the Basics</h2>
            <p>The boundary between frontend and backend is blurring. Master frameworks like Next.js that handle both. Learn about tRPC for end-to-end type safety and explore how to use Postgres with modern ORMs like Drizzle or Prisma.</p>
            
            <h2>4. AI-Enhanced Workflow</h2>
            <p>Don't just use AI to write code; use it to architect systems. Learn how to use Agentic AI tools to automate testing, documentation, and even initial project scaffolding. The most valuable developers in 2026 are those who can direct AI to produce high-quality, maintainable code.</p>
        `
    },
    {
        id: '2',
        title: 'The Rise of AI in Software Engineering',
        excerpt: 'Exploring how LLMs and agentic AI are changing the way we write, debug, and ship code.',
        author: 'Theo Browne',
        date: 'March 05, 2026',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
        category: 'Trends',
        readTime: '12 min read',
        content: `
            <p>AI is no longer a helper; it's becoming a collaborator. From GitHub Copilot to fully autonomous coding agents, the role of a software engineer is undergoing its most significant transformation since the invention of the compiler.</p>
            
            <h2>The Shift to Architecture</h2>
            <p>When code generation becomes a commodity, the value of the engineer shifts to architecture, security, and human-centric design. It's not about typing fast anymore; it's about thinking deep.</p>
            
            <h2>Agentic Workflows</h2>
            <p>We are seeing the rise of Agentic AI—systems that don't just suggest code but can actively debug, run tests, and deploy services. Learning to orchestrate these agents is the next must-have skill for 2026.</p>
            
            <h2>Trust but Verify</h2>
            <p>With great power comes great responsibility. AI can introduce subtle bugs or security vulnerabilities. The engineer of the future must be an expert reviewer, capable of spotting errors in AI-generated solutions that might look perfect on the surface.</p>
        `
    },
    {
        id: '3',
        title: 'Mastering CSS Grid and Flexbox',
        excerpt: 'Stop guessing and start designing with confidence using modern CSS layout techniques.',
        author: 'Gary Simon',
        date: 'Feb 28, 2026',
        image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80',
        category: 'Design',
        readTime: '6 min read',
        content: `
            <p>CSS has evolved tremendously. While Flexbox and Grid are now baseline skills, mastering their interaction and the new CSS features of 2026 is what separates good designers from great ones.</p>
            
            <h2>Flexbox for One Dimension</h2>
            <p>Flexbox remains the king of dynamic, one-dimensional layouts. Learn how to use <code>flex-basis</code> and <code>flex-grow</code> effectively to create truly responsive UI components without media queries.</p>
            
            <h2>Grid for Two Dimensions</h2>
            <p>Grid is for layout, Flexbox is for alignment. Master <code>grid-template-areas</code> to create complex, readable layouts. Explore the new subgrid features to keep your nested elements perfectly aligned with the parent grid.</p>
            
            <h2>Container Queries</h2>
            <p>The biggest shift in modern CSS is the widespread adoption of container queries. Stop styling based on the viewport and start styling based on the component's parent container. This is the true path to component-driven design.</p>
        `
    }
];


export const testimonials: Testimonial[] = [
    {
        id: '1',
        name: 'Alex Rivera',
        role: 'Frontend Developer @ TechCo',
        content: 'The Advanced React course completely changed how I think about performance. The instructor was world-class.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
        rating: 5
    },
    {
        id: '2',
        name: 'Emily Chen',
        role: 'UX Designer',
        content: 'I went from knowing nothing about UI/UX to landing my first freelance gig in 3 months. Highly recommended!',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
        rating: 5
    },
    {
        id: '3',
        name: 'Marcus Thorne',
        role: 'SaaS Founder',
        content: 'The insights and content you just can\'t find on YouTube. The direct access to experts is priceless.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
        rating: 4
    }
];
