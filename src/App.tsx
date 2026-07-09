import { useState } from 'react';
import { Phone } from 'lucide-react';
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

      {/* Offset for fixed header */}
      <div className="h-16" />

      <BelowFold openModal={() => setModalOpen(true)} />

      {modalOpen && <ContactForm onClose={() => setModalOpen(false)} />}
    </>
  );
}
