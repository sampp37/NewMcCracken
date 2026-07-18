import { useState } from 'react';
import { Phone } from 'lucide-react';
import BelowFold from './BelowFold';
import ContactForm from './ContactForm';

function gtagReportConversion() {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: 'AW-17160454175/cEAlCKXboNEcEJ-A3_Y_',
      value: 1.0,
      currency: 'USD',
    });
  }
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Sticky Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24 lg:h-28">
            <a href="#" className="flex items-center flex-shrink-0">
              <img
                src="/LOGOO.webp"
                alt="McCracken Painting"
                className="h-16 sm:h-20 lg:h-24 w-auto object-contain"
              />
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-12 lg:gap-16 text-lg lg:text-xl font-semibold text-gray-700">
              <a href="#reviews" className="hover:text-orange-500 transition">Reviews</a>
              <a href="#portfolio" className="hover:text-orange-500 transition">Services</a>
              <a href="#process" className="hover:text-orange-500 transition">About</a>
              <a href="#lafayette-map" className="hover:text-orange-500 transition">Areas</a>
            </nav>

            <div className="flex items-center gap-4 lg:gap-6 ml-6 lg:ml-10">
              <a
                href="tel:+17654302200"
                onClick={() => gtagReportConversion()}
                className="hidden sm:flex items-center gap-2 text-gray-700 hover:text-orange-500 transition font-semibold text-lg"
              >
                <Phone className="w-5 h-5" />
                (765) 430-2200
              </a>
              <button
                onClick={() => setModalOpen(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-6 py-3 rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
              >
                GET MY FREE QUOTE
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
              <a href="#process" onClick={() => setMenuOpen(false)} className="hover:text-orange-500 transition">About</a>
              <a href="#lafayette-map" onClick={() => setMenuOpen(false)} className="hover:text-orange-500 transition">Areas</a>
              <a href="tel:+17654302200" onClick={() => gtagReportConversion()} className="flex items-center gap-2 hover:text-orange-500 transition text-lg">
                <Phone className="w-5 h-5" />
                (765) 430-2200
              </a>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="mt-20 sm:mt-24 lg:mt-28 bg-white">
        <div className="flex flex-col lg:flex-row min-h-[82vh]">
          {/* Left: Text */}
          <div className="w-full lg:w-[40%] flex items-center justify-center px-6 sm:px-10 lg:px-10 xl:px-8 py-14 lg:py-0 order-2 lg:order-1">
            <div className="max-w-lg w-full">
              <h1 className="font-black text-orange-500 uppercase leading-[1.05] tracking-tight mb-3 text-3xl sm:text-4xl lg:text-[1.9rem] xl:text-[2.15rem]">
                <span className="block whitespace-nowrap">THIRD GENERATION OF</span>
                <span className="block whitespace-nowrap">PAINTERS</span>
              </h1>
              <p className="font-black text-slate-900 leading-[1.1] tracking-tight mb-6 text-3xl sm:text-4xl lg:text-[1.9rem] xl:text-[2.15rem]">
                Award Winning Company<br />
                Serving Lafayette and<br />
                Surroundings
              </p>
              <div className="flex mb-6">
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-lg px-7 py-3.5 rounded-md transition-transform duration-300 ease-in-out hover:scale-105 shadow-sm uppercase tracking-wide"
                >
                  GET MY FREE QUOTE
                </button>
              </div>
              <p className="text-gray-700 text-xl font-bold mb-6">
                5 Stars Google
                <span className="mx-2 text-gray-400">&bull;</span>
                Family Owned
                <span className="mx-2 text-gray-400">&bull;</span>
                Over 1000 Projects
              </p>
              <div className="flex items-center justify-between gap-6 sm:gap-8 w-full">
                <div className="flex-1 flex justify-center">
                  <img src="/award1-p.webp" alt="Award" className="h-28 sm:h-32 lg:h-36 xl:h-40 w-auto max-w-full object-contain transition-transform duration-300 ease-out hover:scale-110 hover:drop-shadow-lg" />
                </div>
                <div className="flex-1 flex justify-center">
                  <img src="/consumersp.webp" alt="Consumer Choice Premier Business 2025" className="h-28 sm:h-32 lg:h-36 xl:h-40 w-auto max-w-full object-contain transition-transform duration-300 ease-out hover:scale-110 hover:drop-shadow-lg" />
                </div>
                <div className="flex-1 flex justify-center">
                  <img src="/S-w-logo-p.webp" alt="Sherwin-Williams Preferred" className="h-28 sm:h-32 lg:h-36 xl:h-40 w-auto max-w-full object-contain transition-transform duration-300 ease-out hover:scale-110 hover:drop-shadow-lg" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="w-full lg:w-[65%] relative bg-white order-1 lg:order-2 min-h-[60vw] lg:min-h-0">
            <img
              src="/McClientsout-p.webp"
              alt="McCracken Painting owners holding company sign in front of a Lafayette Indiana stone home"
              className="absolute inset-0 w-full h-full object-cover object-[65%_center]"
            />
            {/* Soft white fade on left edge (desktop) / top edge (mobile) so image melts into text side */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/70 to-transparent hidden lg:block" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white via-white/70 to-transparent lg:hidden" />
          </div>
        </div>
      </section>

      <BelowFold openModal={() => setModalOpen(true)} />

      {modalOpen && <ContactForm onClose={() => setModalOpen(false)} />}
    </>
  );
}
