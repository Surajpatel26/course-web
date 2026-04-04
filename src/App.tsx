import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { SmoothScroll } from './components/layout/SmoothScroll';

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Courses = lazy(() => import('./pages/Courses').then(m => ({ default: m.Courses })));
const Webinars = lazy(() => import('./pages/Webinars').then(m => ({ default: m.Webinars })));
const Blog = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })));
const FAQ = lazy(() => import('./pages/FAQ').then(m => ({ default: m.FAQ })));
const CourseDetail = lazy(() => import('./pages/CourseDetail').then(m => ({ default: m.CourseDetail })));
const WebinarDetail = lazy(() => import('./pages/WebinarDetail').then(m => ({ default: m.WebinarDetail })));
const Testimonials = lazy(() => import('./pages/Testimonials').then(m => ({ default: m.Testimonials })));
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const Register = lazy(() => import('./pages/Register').then(m => ({ default: m.Register })));
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const BookDemo = lazy(() => import('./pages/BookDemo').then(m => ({ default: m.BookDemo })));
const BlogDetail = lazy(() => import('./pages/BlogDetail').then(m => ({ default: m.BlogDetail })));

const FallbackLoader = () => (
  <div className="flex items-center justify-center min-h-[70vh] bg-transparent">
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 rounded-full border-t-2 border-[#06b6d4] animate-spin" style={{ animationDuration: '1s' }}></div>
      <div className="absolute inset-2 rounded-full border-r-2 border-[#a855f7] animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
      <div className="absolute inset-4 rounded-full border-b-2 border-[#6366f1] animate-spin" style={{ animationDuration: '2s' }}></div>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <Suspense fallback={<FallbackLoader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="courses" element={<Courses />} />
              <Route path="webinars" element={<Webinars />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:id" element={<BlogDetail />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="testimonials" element={<Testimonials />} />
              <Route path="courses/:id" element={<CourseDetail />} />
              <Route path="webinars/:id" element={<WebinarDetail />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="book-demo" element={<BookDemo />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </Suspense>
      </SmoothScroll>
    </BrowserRouter>
  );
}

export default App;
