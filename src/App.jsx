import React, { useState } from 'react';
import logo from "/logo.png";
import MouseScrollAnimation from "./components/MouseScrollAnimation";
import Navbar from "./components/Navbar";
import About from "./components/About";
import EventsSection from "./components/Events";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Register from "./components/Register";
import Modal from "./components/Modal";
import { Helmet } from 'react-helmet';
import Hero from './components/Hero';
import { ToastContainer } from "react-toastify";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRegisterClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Cognitio'26 | Mechanical Engineering Society Branch Fest 2026</title>
        <meta
          name="description"
          content="Explore the Mechanical Engineering Society (MES) Branch Fest at NIT Jamshedpur. Discover past events, student projects, and register for upcoming tech & cultural competitions. Join fellow students in workshops, robotics challenges, and more!"
        />
        <meta property="og:title" content="Join MES NIT Jamshedpur's Branch Fest 2026!" />
        <meta
          property="og:description"
          content="Celebrate innovation at MES NIT Jamshedpur's Branch Fest! Participate in technical workshops, robotics competitions, and cultural events. Register now for student-led activities."
        />
        <meta property="og:image" content="https://cognitio25.in/logo.webp" />
      </Helmet>

      <main className='bg-[#0b0f14] min-h-screen relative overflow-hidden text-slate-100'>
        <Hero />
        <ToastContainer
          position="top-right"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="dark"
        />
        <section className='relative z-20'>
          <Navbar logo={logo} onRegisterClick={handleRegisterClick} />
          <div className='flex flex-col items-center justify-center min-h-screen text-center px-0 md:px-4'>
            <img
              className='h-48 md:h-64 mb-12 opacity-90 hover:opacity-100 transition-opacity drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)] fade-in'
              src={logo}
              alt="Cognitio Main Logo"
            />

            <div className='space-y-6'>
              <button
                className='group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 px-10 py-3 text-base font-semibold tracking-wide text-white shadow-[0_16px_30px_rgba(15,118,110,0.35)] ring-1 ring-white/10 hover:-translate-y-1 hover:shadow-[0_22px_40px_rgba(16,185,129,0.4)] transition-all cursor-pointer fade-up'
                onClick={handleRegisterClick}
              >
                <span>Register Now</span>
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>

              <div className='mb-16 flex flex-col items-center gap-2 text-slate-300/80'>
                <MouseScrollAnimation
                  size={30}
                  color="#f59e0b"
                  animationDuration={2}
                />
                <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
              </div>
            </div>
            <About />
            <EventsSection />
            <Gallery />
          </div>
          <Contact />
        </section>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <Register onClose={handleCloseModal} />
        </Modal>
      </main>

    </>
  );
}

export default App;
