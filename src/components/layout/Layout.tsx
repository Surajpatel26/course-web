import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useEffect } from 'react';

export function Layout() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    // Force dark / crypto theme globally
    useEffect(() => {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
    }, []);

    const isDashboard = pathname === '/dashboard';

    return (
        <div className="min-h-screen flex flex-col" style={{ background: '#020617' }}>
            {!isDashboard && <Navbar />}
            {/* 
               Non-dashboard pages need padding for the fixed navbar 
               unless it's the home page (which has its own hero spacing) 
            */}
            <main className={`flex-grow ${!isDashboard && pathname !== '/' ? 'pt-24' : ''}`}>
                <Outlet />
            </main>
            {!isDashboard && <Footer />}
        </div>
    );
}
