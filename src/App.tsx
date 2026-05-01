import { Phone, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ContactForm from './ContactForm';

function TrustindexWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://cdn.trustindex.io/loader.js?d22052870ed050906a86c76039c';
    script.defer = true;
    script.async = true;
    containerRef.current.appendChild(script);
  }, []);

  return <div ref={containerRef} />;
}

function VoiceGenieWidget() {
  useEffect(() => {
    window.VG_CONFIG = {
      ID: 'Rw5lqbJJc9jUkVvs2SI0',
      region: 'na',
      render: 'bottom-right',
      stylesheets: ['https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css'],
    };

    const container = document.createElement('div');
    container.style.width = '0';
    container.style.height = '0';
    container.id = 'VG_OVERLAY_CONTAINER';
    document.body.appendChild(container);

    const script = document.createElement('script');
    script.src = 'https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(container);
      document.body.removeChild(script);
    };
  }, []);

  return null;
}

function App() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center h-28">

            {/* Left links */}
            <div className="hidden md:flex flex-1 items-center justify-around">
              <a href="#reviews" className="text-black hover:text-gray-700 transition text-2xl font-extrabold whitespace-nowrap">Reviews</a>
              <a href="#services" className="text-black hover:text-gray-700 transition text-2xl font-extrabold whitespace-nowrap">Services</a>
            </div>

            {/* Logo — center column, fixed width */}
            <div className="flex-shrink-0 flex items-center h-24 mx-8">
              <img src="/McCracken_logo.jpg" alt="McCracken Painting" className="h-full w-auto object-contain" />
            </div>

            {/* Right links */}
            <div className="hidden md:flex flex-1 items-center justify-around">
              <a href="#AreasWeServe" className="text-black hover:text-gray-700 transition text-2xl font-extrabold whitespace-nowrap">Areas We Serve</a>
              <a href="#contact" className="text-black hover:text-gray-700 transition text-2xl font-extrabold whitespace-nowrap">Contact</a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden ml-auto">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <a href="#reviews" className="block text-gray-700 hover:text-blue-600">Reviews</a>
              <a href="#services" className="block text-gray-700 hover:text-blue-600">Services</a>
              <a href="#AreasWeServe" className="block text-gray-700 hover:text-blue-600">Areas We Serve</a>
              <a href="#contact" className="block text-gray-700 hover:text-blue-600">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 relative overflow-hidden" style={{ minHeight: '75vh' }}>
        <img
          src="/Lafayette_Downtown_esquina.jpeg"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: '50% -5%' }}
        />
        <div className="absolute inset-0 bg-black/[0.35]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
          <div className="flex flex-col items-center text-center space-y-8">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight whitespace-nowrap">
              ON TIME &amp; ON BUDGET<br />
              HOME PAINTERS<br />
              LAFAYETTE IN
            </h1>
            <button
              onClick={openModal}
              className="inline-flex items-center justify-center bg-sky-400 hover:bg-sky-500 text-white px-8 py-4 rounded-lg transition text-lg font-semibold hover:scale-105 transform border-4 border-white"
            >
              GET A FREE ESTIMATE
            </button>
            <p className="text-base text-white font-semibold tracking-wide drop-shadow">* Same Day Free Estimates — Spots Fill Up Fast!</p>
            <a href="tel:+17652938680" className="inline-flex items-center justify-center text-white text-2xl lg:text-3xl font-bold hover:text-sky-300 transition">
              (765) 293-8680
            </a>
          </div>
        </div>
        {/* Bottom fade shadow */}
        <div className="absolute bottom-0 left-0 right-0 h-8" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.18))' }} />
      </section>

      {/* Marquee Banner */}
      <div className="bg-white overflow-hidden border-y border-gray-200 shadow-sm py-4">
        <div className="flex animate-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
          {[...Array(8)].map((_, i) => (
            <span key={i} className="inline-flex items-center mx-12">
              <img src="/McCracken_logo.jpg" alt="" className="h-14 w-auto object-contain mx-5" />
              <span className="text-4xl font-extrabold tracking-widest uppercase">
                <span className="text-gray-900">WE'RE THE BEST </span>
                <span className="text-sky-400">HOUSE GUESTS EVER</span>
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Section 2 */}
      <section
        id="reviews"
        className="w-full relative"
        style={{
          minHeight: '100vh',
          backgroundImage: 'url("/MC-S3.jpg")',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#060f1e',
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 flex flex-col-reverse lg:flex-row lg:items-start items-center gap-12 min-h-screen">

          {/* Left — photo — centered vertically with auto margins */}
          <div className="w-full lg:w-5/12 flex-shrink-0" style={{ marginTop: 'auto', marginBottom: 'auto' }}>
            <img
              src="/Painting.png"
              alt="McCracken Painting interior staircase project"
              className="w-full rounded-2xl shadow-2xl object-cover"
              loading="lazy"
            />
          </div>

          {/* Right — text, offset down to align title with image top */}
          <div className="w-full lg:w-7/12 space-y-6 lg:pt-[8vh] text-center lg:text-left">
            {/* Title */}
            <h2
              className="text-white font-bold uppercase tracking-wide"
              style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '36px', lineHeight: '1.25' }}
            >
              GET THE FEELING OF ENTERING A NEW HOME. EVERY DAY.
            </h2>

            {/* Body text */}
            <div
              className="text-gray-200 space-y-4"
              style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '22px', lineHeight: '1.75' }}
            >
              <p>
                Our three generations of painting experts offers a variety of interior and exterior painting services tailored to the unique needs of homes in Lafayette. When searching for professional painters in Lafayette, McCracken is the local choice.
              </p>
              <p>
                Stop searching for "painters near me" and start exploring our full list of services below to see how we can help enhance your property.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        style={{
          minHeight: '90vh',
          backgroundImage: 'url(/background-s3.png)',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#ffffff',
        }}
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-14" style={{ position: 'relative', zIndex: 1 }}>
          {/* Title */}
          <h2
            className="text-gray-900 font-bold text-center mb-10"
            style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '36px' }}
          >
            WHY CHOOSE US
          </h2>

          {/* Items */}
          <div className="space-y-6" style={{ maxWidth: '780px', marginLeft: '40px' }}>
            {[
              {
                num: '1.',
                title: 'Respect Time & Communication',
                body: 'We do everything from start to finish on time while communicating with you throughout the entire project. If the details or scope of work change, we always communicate how and when things will get done.',
              },
              {
                num: '2.',
                title: 'Stress Free & Mess-Free Service',
                body: "Paint is messy, but your experience shouldn't be. We believe in cleaning up after ourselves every day, just like any good house guest should. We start with proper prep and end with thorough cleanup.",
              },
              {
                num: '3.',
                title: 'Your Kids and Pets, Our Priority.',
                body: 'Maintaining a kids and pet friendly atmosphere and being respectful of the home environment are non negotiable core values.',
              },
              {
                num: '4.',
                title: 'Value Based Pricing',
                body: 'We offer upfront and honest pricing without any hidden fees. Rest assured, you will get what you pay for. Above all else, we prioritize giving you the most kind and cautious high quality service.',
              },
            ].map(({ num, title, body }) => (
              <div key={num} className="text-left">
                <h3
                  className="font-bold text-gray-900 mb-1"
                  style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '23px' }}
                >
                  {num} {title}
                </h3>
                <p
                  className="text-gray-700"
                  style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '19px', lineHeight: '1.6' }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Excellence Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Family Legacy Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1">
              <img
                src="/3_Generations_Owned.webp"
                alt="McCracken Painting family team"
                className="rounded-2xl shadow-2xl w-full"
                loading="lazy"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-2">
                Family-Owned Since 3 Generations
              </div>
              <h3 className="text-3xl font-bold text-gray-900">
                A Legacy of Craftsmanship Passed Down Through Generations
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                For three generations, the McCracken family has been perfecting the art of painting in Tippecanoe County. What started as a small local business has grown into a trusted name, with skills, values, and dedication to quality passed from father to son.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our family's commitment to excellence isn't just a business philosophy—it's our heritage. Every project we take on carries the weight of our family name and the pride of generations who have served this community.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">3</div>
                  <div className="text-sm text-gray-600">Generations</div>
                </div>
                <div className="h-12 w-px bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">25+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="h-12 w-px bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">1000+</div>
                  <div className="text-sm text-gray-600">Happy Homes</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Detailed Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                Transform Your Space with Professional Painting
              </h2>
              <p className="text-lg text-gray-600">
                At McCracken Painting, we understand that a fresh coat of paint can completely transform your space.
              </p>
              <p className="text-lg text-gray-600">
                25+ years of experience gives you an expert team that delivers a locally trusted service.
              </p>
              <p className="text-lg text-gray-600">
                Whether you're refreshing a single room or renovating an entire property, we handle every detail from surface preparation to final touches and cleaning.
              </p>
              <button
                onClick={openModal}
                className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
              >
                Schedule Free Consultation
              </button>
            </div>
            <div>
              <img
                src="/McCracken_Safe_Painting.jpg"
                alt="McCracken Painting team working on professional staircase project"
                className="rounded-2xl shadow-2xl w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="FreeEstimate" className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">
                Revitalize Your Property with a Stunning New Look
              </h2>
              <p className="text-xl text-blue-100">
                Let McCracken Painting bring your vision to life with expert craftsmanship and superior results. Our main goal is to exceed expectations with quality and timeliness.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={openModal}
                  className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition text-lg font-semibold"
                >
                  Get Free Estimate
                </button>
                <a id="revitalize-call-now-button" href="tel:+17652938680" className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition text-lg font-semibold">
                  <Phone className="h-5 w-5 mr-2" />
                  Call Now
                </a>
              </div>
            </div>
            <div>
              <img
                src="/McCracken_about_to_paint.webp"
                alt="McCracken painter preparing to paint a room"
                className="rounded-2xl shadow-2xl w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600">
              Ready to transform your space? Contact us today for a free estimate.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
                <a href="tel:+17652938680" className="text-blue-600 hover:text-blue-700 text-lg">
                  (765) 293-8680
                </a>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Location</h3>
                <p className="text-gray-600">
                  104 Pineview Ln, Lafayette, IN 47905<br />
                  Serving all around Indianapolis
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 8:00 AM - 5:00 PM<br />
                  Weekends: Closed
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl">
              <ContactForm fieldPrefix="contact" />
            </div>
          </div>
        </div>
      </section>

      {/* Areas We Serve Section */}
      <section id="AreasWeServe" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Areas We Serve</h2>
                <p className="text-2xl text-gray-700 font-semibold">
                  Proudly Serving Tippecanoe County & Surrounding Areas
                </p>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed">
                From historic neighborhoods in Lafayette to newer developments in West Lafayette, McCracken Painting brings quality craftsmanship to homeowners across the entire county. Wherever you are in Tippecanoe County, we come to you.
              </p>

              <div>
                <div className="flex flex-wrap gap-3">
                  {['Lafayette', 'West Lafayette', 'Battle Ground', 'Shadeland', 'Dayton', 'Clarks Hill', 'Stockwell', 'Montmorenci'].map((city) => (
                    <span key={city} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {city}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600 text-lg">
                  Don't see your city? Call us. We likely cover your area.
                </p>
                <button
                  onClick={openModal}
                  className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
                >
                  Book Your Free Quote
                </button>
              </div>
            </div>

            <div>
              <img
                src="/Battle_of_Tippecanoe.webp"
                alt="Battle of Tippecanoe Monument"
                className="rounded-2xl shadow-2xl w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">What's Your Project About?</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <ContactForm fieldPrefix="modal" onSuccess={closeModal} />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="/McCracken_logo.jpg" alt="McCracken Painting" className="h-16" loading="lazy" />
              </div>
              <p className="text-gray-400">
                Professional painting services in West Lafayette, Indiana for over 25 years.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#contact" className="hover:text-white transition">Residential Painting</a></li>
                <li><a href="#contact" className="hover:text-white transition">Commercial Painting</a></li>
                <li><a href="#contact" className="hover:text-white transition">Interior Painting</a></li>
                <li><a href="#contact" className="hover:text-white transition">Exterior Painting</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>West Lafayette, Indiana</li>
                <li>(765) 293-8680</li>
                <li>Monday - Friday</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 McCracken Painting. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <VoiceGenieWidget />
    </div>
  );
}

export default App;
