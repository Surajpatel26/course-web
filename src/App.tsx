import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { Webinars } from './pages/Webinars';
import { Blog } from './pages/Blog';
import { FAQ } from './pages/FAQ';
import { CourseDetail } from './pages/CourseDetail';
import { WebinarDetail } from './pages/WebinarDetail';
import { Testimonials } from './pages/Testimonials';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { BookDemo } from './pages/BookDemo';
import { BlogDetail } from './pages/BlogDetail';

import { SmoothScroll } from './components/layout/SmoothScroll';

function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
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
      </SmoothScroll>
    </BrowserRouter>
  );
}

export default App;
