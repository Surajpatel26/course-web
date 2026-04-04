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

    return (
        <div className="min-h-screen flex flex-col" style={{ background: '#020617' }}>
            <Navbar />
            {/* Home starts its own full-screen hero with pt-40+, other pages get pt-24 */}
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
