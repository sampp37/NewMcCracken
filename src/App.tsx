import { useState } from 'react';
import { Phone, Calendar } from 'lucide-react';
import BelowFold from './BelowFold';
import ContactForm from './ContactForm';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Sticky Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-2 flex-shrink-0">
              <img
                src="/McCracken_Painting_Logo.webp"
                alt="McCracken Painting"
                className="h-10 object-contain"
              />
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-700">
              <a href="#reviews" className="hover:text-orange-500 transition">Reviews</a>
              <a href="#portfolio" className="hover:text-orange-500 transition">Services</a>
              <a href="#about" className="hover:text-orange-500 transition">About</a>
              <a href="#areasweserve" className="hover:text-orange-500 transition">Areas</a>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="tel:+17654302200"
                className="hidden sm:flex items-center gap-2 text-gray-700 hover:text-orange-500 transition font-semibold text-sm"
              >
                <Phone className="w-4 h-4" />
                (765) 430-2200
              </a>
              <button
                onClick={() => setModalOpen(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-4 py-2 rounded-lg transition"
              >
                Get a Free Estimate
              </button>
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
                onClick={() => setMenuOpen(m => !m)}
                aria-label="Toggle menu"
              >
                <span className="block w-5 h-0.5 bg-gray-700 mb-1" />
                <span className="block w-5 h-0.5 bg-gray-700 mb-1" />
                <span className="block w-5 h-0.5 bg-gray-700" />
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <nav className="md:hidden pb-4 flex flex-col gap-3 text-sm font-semibold text-gray-700 border-t border-gray-100 pt-3">
              <a href="#reviews" onClick={() => setMenuOpen(false)} className="hover:text-orange-500 transition">Reviews</a>
              <a href="#portfolio" onClick={() => setMenuOpen(false)} className="hover:text-orange-500 transition">Services</a>
              <a href="#about" onClick={() => setMenuOpen(false)} className="hover:text-orange-500 transition">About</a>
              <a href="#areasweserve" onClick={() => setMenuOpen(false)} className="hover:text-orange-500 transition">Areas</a>
              <a href="tel:+17654302200" className="flex items-center gap-2 hover:text-orange-500 transition">
                <Phone className="w-4 h-4" />
                (765) 430-2200
              </a>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="mt-16 min-h-[82vh] flex flex-col lg:flex-row bg-white overflow-hidden">
        {/* Left: Text */}
        <div className="flex-1 flex items-center justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-16 lg:py-0">
          <div className="max-w-lg w-full">
            <p className="text-orange-500 font-bold text-lg sm:text-xl tracking-wide mb-4">
              Third Generation of Painters
            </p>
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight mb-8">
              Award Winning<br />
              Painting Company<br />
              Serving Lafayette<br />
              Indiana
            </h1>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-base px-7 py-4 rounded-lg transition-colors duration-150 mb-8 shadow-sm"
            >
              Get My Free Estimate
              <Calendar className="w-5 h-5" />
            </button>
            <p className="text-gray-500 text-sm mb-8">
              Family Owned Since 2000 &bull; 25+ Years Experience &bull; Locally Owned &amp; Operated
            </p>
            <div className="flex items-center gap-5 flex-wrap">
              <img src="/BBB.png" alt="BBB Accredited" className="h-16 w-auto object-contain" />
              <img src="/BBRAward.png" alt="BBR Award" className="h-16 w-auto object-contain" />
              <img src="/QBAward.webp" alt="Quality Business Award" className="h-16 w-auto object-contain" />
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex-1 relative flex items-center justify-center bg-white">
          <img
            src="/McClients...webp"
            alt="McCracken Painting — Family Owners"
            className="w-full h-auto max-h-full object-contain object-center"
          />
        </div>
      </section>

      <BelowFold openModal={() => setModalOpen(true)} />

      {modalOpen && <ContactForm onClose={() => setModalOpen(false)} />}
    </>
  );
}
