import { Phone, Menu, X } from 'lucide-react';
import { useState, useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import ContactForm from './ContactForm';

const BelowFold = lazy(() => import('./BelowFold'));

const awards = [
  { src: '/BBRAward.png', alt: 'Best of Business Rate 2025' },
  { src: '/QBAward.webp', alt: 'Quality Business Awards 2025-2026 Winner' },
  { src: '/BBB.png', alt: 'BBB Torch Awards for Ethics Winner' },
];

function App() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center h-28">
            <div className="hidden md:flex flex-1 items-center justify-around">
              <a href="#reviews" className="text-black hover:text-gray-700 transition text-2xl font-extrabold whitespace-nowrap">Reviews</a>
              <a href="#colors" className="text-black hover:text-gray-700 transition text-2xl font-extrabold whitespace-nowrap">Colors</a>
            </div>
            <div className="flex-shrink-0 flex items-center h-24 mx-8">
              <img src="/McCracken_logo.jpg" alt="McCracken Painting" className="h-full w-auto object-contain" />
            </div>
            <div className="hidden md:flex flex-1 items-center justify-around">
              <a href="#areasweserve" className="text-black hover:text-gray-700 transition text-2xl font-extrabold whitespace-nowrap">Areas Served</a>
              <a href="#contact" className="text-black hover:text-gray-700 transition text-2xl font-extrabold whitespace-nowrap">Contact</a>
            </div>
            <div className="md:hidden ml-auto">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <a href="#reviews" className="block text-gray-700 hover:text-blue-600">Reviews</a>
              <a href="#colors" className="block text-gray-700 hover:text-blue-600">Colors</a>
              <a href="#areasweserve" className="block text-gray-700 hover:text-blue-600">Areas Served</a>
              <a href="#contact" className="block text-gray-700 hover:text-blue-600">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* ─── HERO SECTION ─────────────────────────────────────────── */}
      <section className="pt-28 bg-white overflow-hidden">

        {/* Mobile */}
        <div className="lg:hidden">
          <div className="text-center px-6 pt-6 pb-5">
            <h1 className="font-extrabold text-gray-900 leading-tight text-2xl sm:text-3xl">
              Painting Is Messy, Avoid The Stress With<br />
              A 3 Generation Crew That Cleans Up Every Day
            </h1>
          </div>
          <img
            src="/McClients.webp"
            alt="McCracken Painting happy clients"
            fetchPriority="high"
            loading="eager"
            className="w-full object-cover"
            style={{ maxHeight: '70vw' }}
          />
          <div className="flex items-center justify-center gap-6 py-6 px-6">
            {awards.map((award) => (
              <div key={award.src} className="w-[134px] h-[134px] sm:w-40 sm:h-40 rounded-full overflow-hidden flex-shrink-0 bg-white">
                <img src={award.src} alt={award.alt} className="w-full h-full object-contain" />
              </div>
            ))}
          </div>
          <div className="px-6 pb-8 text-center">
            <button
              onClick={openModal}
              className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-base px-7 py-4 rounded-xl transition-transform hover:scale-105 transform shadow-lg w-full"
            >
              Get My Professional Estimate For Free Today!
            </button>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex lg:items-stretch lg:min-h-[520px]">
          <div className="flex flex-col justify-center px-12 lg:px-16 py-12 lg:w-[50%] xl:w-[46%] flex-shrink-0">
            <h1 className="font-extrabold text-gray-900 leading-tight text-3xl xl:text-4xl mb-6">
              Painting Is Messy<br />
              Avoid The Stress With<br />
              A 3 Generation Crew That<br />
              Cleans Up Every Day
            </h1>
            <div className="mb-8">
              <button
                onClick={openModal}
                className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-base lg:text-lg px-7 py-4 rounded-xl transition-transform hover:scale-105 transform shadow-lg"
              >
                Get My Professional Estimate For Free Today!
              </button>
            </div>
            <div className="flex items-center gap-5 lg:gap-7">
              {awards.map((award) => (
                <div key={award.src} className="w-[134px] h-[134px] lg:w-40 lg:h-40 rounded-full overflow-hidden flex-shrink-0 bg-white">
                  <img src={award.src} alt={award.alt} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 relative overflow-hidden">
            <img
              src="/McClients.webp"
              alt="McCracken Painting happy clients"
              fetchPriority="high"
              loading="eager"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* ─── BELOW FOLD (lazy) ─────────────────────────────────────── */}
      <Suspense fallback={<div className="h-32" />}>
        <BelowFold openModal={openModal} />
      </Suspense>

      {modalOpen && <ContactForm onClose={closeModal} />}

      {/* Floating call button */}
      <a
        href="tel:+17654302200"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-3 rounded-full shadow-lg transition-transform hover:scale-105 animate-call-pulse"
        aria-label="Call us now"
      >
        <Phone className="w-5 h-5" />
        <span className="text-sm font-bold uppercase tracking-wide">Call</span>
      </a>
    </div>
  );
}

export default App;
