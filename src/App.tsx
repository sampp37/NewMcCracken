import { Phone, Menu, X, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
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

const getPhoneNumber = () => {
  const hour = new Date().getHours();
  const isBusinessHours = hour >= 9 && hour < 18;
  return isBusinessHours ? "765 430 2200" : "765-293-8680";
};

function App() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const phoneNumber = getPhoneNumber();

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
              <a href="#colors" className="text-black hover:text-gray-700 transition text-2xl font-extrabold whitespace-nowrap">Colors</a>
            </div>

            {/* Logo — center column, fixed width */}
            <div className="flex-shrink-0 flex items-center h-24 mx-8">
              <img src="/McCracken_logo.jpg" alt="McCracken Painting" className="h-full w-auto object-contain" />
            </div>

            {/* Right links */}
            <div className="hidden md:flex flex-1 items-center justify-around">
              <a href="#areasweserve" className="text-black hover:text-gray-700 transition text-2xl font-extrabold whitespace-nowrap">Areas Served</a>
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
              <a href="#colors" className="block text-gray-700 hover:text-blue-600">Colors</a>
              <a href="#areasweserve" className="block text-gray-700 hover:text-blue-600">Areas Served</a>
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
          className="hero-bg-img absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/[0.45]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-32 relative">
          <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight whitespace-nowrap">
              ON TIME &amp; ON BUDGET<br />
              HOME PAINTERS<br />
              IN LAFAYETTE
            </h1>
            <button
              onClick={openModal}
              className="inline-flex items-center justify-center bg-sky-400 hover:bg-sky-500 text-white px-8 py-4 rounded-lg transition text-lg font-semibold hover:scale-105 transform border-4 border-white"
            >
              GET A FREE ESTIMATE
            </button>
            <p className="text-base text-white font-semibold tracking-wide drop-shadow">*Same Day Spots Filling Fast!</p>
            <a href={`tel:+1${phoneNumber.replace(/\D/g, '')}`} className="inline-flex items-center justify-center text-white text-2xl lg:text-3xl font-bold hover:text-sky-300 transition">
              ({phoneNumber.replace(/\D/g, '').slice(0, 3)}) {phoneNumber.replace(/\D/g, '').slice(3, 6)}-{phoneNumber.replace(/\D/g, '').slice(6)}
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
        id="about"
        style={{
          minHeight: '90vh',
          backgroundImage: 'url(/background-s3.png)',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#ffffff',
        }}
      >
        <div className="py-14" style={{ position: 'relative', zIndex: 1, paddingLeft: '40px', paddingRight: '40px' }}>
          {/* Title */}
          <h2
            className="text-gray-900 font-bold text-center mb-10"
            style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '32px' }}
          >
            WHY CHOOSE US
          </h2>

          {/* Two-column layout */}
          <div className="flex flex-col lg:flex-row" style={{ gap: '40px' }}>
            {/* Left column - text */}
            <div className="space-y-6" style={{ flex: '1 1 0' }}>
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
                    style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '21px' }}
                  >
                    {num} {title}
                  </h3>
                  <p
                    className="text-gray-700"
                    style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '18px', lineHeight: '1.6' }}
                  >
                    {body}
                  </p>
                </div>
              ))}
            </div>

            {/* Right column - images */}
            <div className="w-full lg:w-[420px] lg:max-w-[420px] flex-shrink-0 flex flex-col gap-4">
              <img
                src="/McCracken-van.jpg"
                alt="McCracken Painting van"
                style={{ borderRadius: '12px', width: '100%', flex: '1', objectFit: 'cover' }}
                loading="lazy"
              />
              <img
                src="/painting-s3.png"
                alt="Painter at work"
                style={{ borderRadius: '12px', width: '100%', flex: '1', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section
        id="about"
        className="w-full relative"
        style={{
          minHeight: '100vh',
          backgroundImage: 'url("/sec4.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#061a2e',
        }}
      >
        <div className="relative z-10 flex flex-col items-center text-center px-6 lg:px-12 py-20">
          <h2
            className="text-white font-bold uppercase mb-10"
            style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '40px' }}
          >
            GENERATIONAL EXPERTISE
          </h2>

          <img
            src="/family-photo.jpg"
            alt="McCracken Painting family team"
            className="rounded-2xl shadow-2xl w-full max-w-sm mb-10"
            loading="lazy"
          />

          <div
            className="text-gray-200 max-w-3xl space-y-6"
            style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '20px', lineHeight: '1.75' }}
          >
            <p>
              Proudly family owned and serving the Lafayette area for 25+ years, we're committed to delivering exceptional results one house at the time.
            </p>
            <p>
              Our commitment goes beyond the brush, we promise to be your best guests, treating your place with the utmost care and leaving it even more pristine than when we arrived.
            </p>
            <p>
              If you envision a painting project, reach out for a free quote today.
            </p>
          </div>
        </div>
      </section>

      {/* Community Sponsors Banner */}
      <div className="bg-white border-y border-gray-200 shadow-sm py-6">
        {/* Mobile: title above, 3 logos below */}
        <div className="flex flex-col items-center gap-4 px-6 md:hidden">
          <h3 className="text-lg font-extrabold text-gray-900 uppercase tracking-wide">PROUDLY SPONSORING</h3>
          <div className="flex items-center justify-center gap-8">
            <img src="/sponsor2....jpg" alt="Frontier School Corporation" className="h-16 w-auto object-contain" />
            <img src="/cottages.jpg" alt="The Cottages on Lindberg" className="h-16 w-auto object-contain" />
            <img src="/Sponsor...jpg" alt="Rich Goyer Brookston Open Golf" className="h-16 w-auto object-contain" />
          </div>
        </div>
        {/* Desktop: logos — title — logos */}
        <div className="hidden md:flex relative items-center justify-between px-6 lg:px-12">
          <div className="flex items-center gap-10">
            <img src="/sponsor2....jpg" alt="Frontier School Corporation" className="h-20 w-auto object-contain" />
            <img src="/cottages.jpg" alt="The Cottages on Lindberg" className="h-20 w-auto object-contain" />
            <img src="/Sponsor...jpg" alt="Rich Goyer Brookston Open Golf" className="h-20 w-auto object-contain" />
          </div>
          <h3 className="absolute left-1/2 -translate-x-1/2 text-xl sm:text-2xl font-extrabold text-gray-900 uppercase tracking-wide whitespace-nowrap">
            PROUDLY SPONSORING
          </h3>
          <div className="flex items-center gap-10">
            <img src="/sponsor2....jpg" alt="Frontier School Corporation" className="h-20 w-auto object-contain" />
            <img src="/cottages.jpg" alt="The Cottages on Lindberg" className="h-20 w-auto object-contain" />
            <img src="/Sponsor...jpg" alt="Rich Goyer Brookston Open Golf" className="h-20 w-auto object-contain" />
          </div>
        </div>
      </div>

      {/* Areas Served Section */}
      <section
        id="areasweserve"
        className="relative py-14 overflow-hidden"
        style={{
          backgroundImage: 'url("/areas-served.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-[#0a2a4a]/80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-start">
            <div>
              <h2 className="text-4xl font-bold text-white uppercase tracking-wide mb-4">
                Areas We Serve
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl text-xl">
                McCracken is proud to offer top quality painting services tailored to your neighborhood in and around Lafayette. Our painters serve the following areas with dedication and care:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-3">
                {[
                  'Lafayette', 'Otterbein', 'Delphi',
                  'Frankfort', 'Monticello', 'Crawfordsville',
                  'Attica', 'Brookston', 'Lebanon',
                  'Rensselaer', 'Fowler', 'Thorntown',
                  'West Lafayette', 'Battle Ground', 'Shadeland',
                  'Dayton', 'Clarks Hill', 'Stockwell',
                  'Montmorenci'
                ].map((area) => (
                  <div key={area} className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                    <span className="text-white text-lg">{area}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm min-w-[280px]">
              <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-5">
                Contact Info:
              </h3>
              <div className="space-y-4 mb-6">
                <a href="tel:+17654302200" className="flex items-center gap-3 text-white hover:text-cyan-300 transition">
                  <Phone className="h-5 w-5 text-cyan-400" />
                  <span className="text-lg font-medium">(765) 430-2200</span>
                </a>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white">104 Pineview Ln<br />Lafayette, IN 47905</span>
                </div>
              </div>
              <button
                onClick={openModal}
                className="w-full bg-white text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition uppercase tracking-wide text-sm"
              >
                Get a Free Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative py-14 overflow-hidden"
        style={{
          backgroundImage: 'url("/MC-6.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-[#0a1e2e]/75"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide mb-6">
            That Experienced Painter You Need? We're the One
          </h2>
          <div className="text-white text-lg leading-loose whitespace-pre-line">
            <p>We understand that painting isn't just a project; it's an integral part of your home! To ensure your total satisfaction and peace of mind, your local</p>
            <p>residential painting services in Lafayette will always:</p>
            <p>Run background checks on all team members.</p>
            <p>Communicate with you, so we can fully understand all your priorities and concerns.</p>
            <p>Take extra precautions when prepping and cleaning to make sure your property stays as beautiful and livable as possible.</p>
            <p className="mt-4"><span className="font-bold text-xl">PLUS:</span> You can rest assured McCracken Painting Lafayette is 100% locally owned and operated, meaning all our painting services are uniquely tailored</p>
            <p>to the needs and requirements of your neighborhood residential community in Lafayette.</p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="bg-white py-16" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <h2 className="text-4xl sm:text-5xl font-bold text-black text-center mb-12 uppercase tracking-wide">
            Portfolio
          </h2>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 space-y-6">
              <p className="text-gray-800" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '20px', lineHeight: '1.8' }}>
                We promise to be the best house guest you've ever had. Through courtesy and attention to detail, we ensure that every piece of furniture, lamp, speaker, artwork, and decorative object is carefully handled, protected, and returned to its original position.
              </p>
              <p className="text-gray-800" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '20px', lineHeight: '1.8' }}>
                Our goal is to generate a whole lot of joy in your home by providing excellent painting work and amazing customer service. Our three-generation painting company have completed numerous successful projects, showcasing their skill and dedication to quality.
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <img
                src="/portfolio_(2).webp"
                alt="McCracken Painting portfolio of completed projects"
                className="w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 8 - Color Studio */}
      <section
        id="colors"
        className="relative py-16"
        style={{
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          backgroundImage: 'url("/MC-S3.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <h2 className="text-4xl sm:text-5xl font-bold text-white uppercase tracking-wide text-center mb-10">
            How To Choose Colors?
          </h2>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <img
                src="/Color_consultation11.webp"
                alt="Color consultation paint buckets"
                className="w-full rounded-lg"
                loading="lazy"
              />
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <p className="text-gray-200" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '19.5px', lineHeight: '1.8' }}>
                When every color is available at your fingertips, the creative possibilities are endless. However, we know that sometimes unlimited options can be overwhelming, so we're here to guide you through the entire color decision making process.
              </p>
              <p className="text-gray-200" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '19.5px', lineHeight: '1.8' }}>
                Our professionals are always on hand to answer any questions and offer free expert color suggestions.
              </p>
              <div className="flex flex-col items-start gap-2">
                <button
                  onClick={openModal}
                  className="inline-flex items-center justify-center bg-sky-400 hover:bg-sky-500 text-white px-8 py-4 rounded-lg transition text-lg font-bold hover:scale-105 transform border-4 border-white uppercase tracking-wide"
                >
                  SAME DAY FREE QUOTE NOW
                </button>
                <span className="text-gray-300 font-semibold text-sm uppercase tracking-wide">Same Day Spots Are Filling Up Fast!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      {(() => {
        const allReviews = [
          {
            title: '10 Years of Large Scale Projects Done Right',
            body: <>I've been working with McCracken Painting for over <strong className="text-white">10 years on large-scale student housing projects</strong>, and they've consistently delivered great results. Their team is reliable, <strong className="text-white">organized</strong>, and able to handle projects of any size with professionalism. I know I can count on them to get <strong className="text-white">the job done right and on time</strong>.</>,
            name: 'Caitlin Wright',
          },
          {
            title: 'Always Exceeds Expectations, Every Single Time!',
            body: <>We have used McCracken as a painting vendor for <strong className="text-white">several years</strong> and they always do a <strong className="text-white">great job</strong>. They always exceed expectations with quality and <strong className="text-white">timeliness</strong>. They're friendly and easy to communicate with!</>,
            name: 'Caroline Baker',
          },
          {
            title: 'Amazing Work and Excellent Communication — 10/10!',
            body: <>McCracken painting <strong className="text-white">has always done amazing work</strong>. Very well ran and <strong className="text-white">excellent with communication</strong>. I highly recommend them for your next painting project. You will not be disappointed! 10/10.</>,
            name: 'Casey Frier',
          },
          {
            title: 'Fast, Quality Work — Hiring Again for Sure!',
            body: <>Great job. They painted my apartment and everything looks great. <strong className="text-white">Fast working!!!</strong> Definitely hiring for my next paint job!</>,
            name: 'Stephen Morrow',
          },
          {
            title: 'A Friendly Family Team You Can Actually Talk To!',
            body: <>Great group of family painters that are <strong className="text-white">super friendly and easy to talk too</strong>. I highly recommend!!!</>,
            name: 'Drew Powell',
          },
          {
            title: 'Great Work and Kind Employees!',
            body: <>They do a great job painting and have <strong className="text-white">very kind employees</strong>!</>,
            name: 'William Powell',
          },
          {
            title: '10 Years of Large Scale Projects Done Right',
            body: <>I've been working with McCracken Painting for over <strong className="text-white">10 years on large-scale student housing projects</strong>, and they've consistently delivered great results. Their team is reliable, <strong className="text-white">organized</strong>, and able to handle projects of any size with professionalism. I know I can count on them to get <strong className="text-white">the job done right and on time</strong>.</>,
            name: 'Caitlin Wright',
          },
          {
            title: 'Always Exceeds Expectations, Every Single Time!',
            body: <>We have used McCracken as a painting vendor for <strong className="text-white">several years</strong> and they always do a <strong className="text-white">great job</strong>. They always exceed expectations with quality and <strong className="text-white">timeliness</strong>. They're friendly and easy to communicate with!</>,
            name: 'Caroline Baker',
          },
          {
            title: 'Amazing Work and Excellent Communication — 10/10!',
            body: <>McCracken painting <strong className="text-white">has always done amazing work</strong>. Very well ran and <strong className="text-white">excellent with communication</strong>. I highly recommend them for your next painting project. You will not be disappointed! 10/10.</>,
            name: 'Casey Frier',
          },
          {
            title: 'Fast, Quality Work — Hiring Again for Sure!',
            body: <>Great job. They painted my apartment and everything looks great. <strong className="text-white">Fast working!!!</strong> Definitely hiring for my next paint job!</>,
            name: 'Stephen Morrow',
          },
          {
            title: 'A Friendly Family Team You Can Actually Talk To!',
            body: <>Great group of family painters that are <strong className="text-white">super friendly and easy to talk too</strong>. I highly recommend!!!</>,
            name: 'Drew Powell',
          },
          {
            title: 'Great Work and Kind Employees!',
            body: <>They do a great job painting and have <strong className="text-white">very kind employees</strong>!</>,
            name: 'William Powell',
          },
        ];
        const [reviewPage, setReviewPage] = useState(0);
        const totalPages = Math.ceil(allReviews.length / 3);
        const visible = allReviews.slice(reviewPage * 3, reviewPage * 3 + 3);
        return (
          <section id="reviews" className="py-20 bg-[#0a1628]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="text-center mb-14">
                <p className="text-sky-400 uppercase tracking-widest font-semibold text-sm mb-3">What Our Clients Say</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-wide">
                  See Why These Hoosiers Wouldn't Go Anywhere Else
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {visible.map((review, i) => (
                  <div key={reviewPage * 3 + i} className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col gap-4">
                    <h3 className="text-white font-bold text-xl leading-snug">{review.title}</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">"{review.body}"</p>
                    <div className="mt-auto pt-4 border-t border-white/10">
                      <p className="text-white font-bold text-lg">{review.name}</p>
                    </div>
                  </div>
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-10">
                  <button
                    onClick={() => setReviewPage(p => Math.max(0, p - 1))}
                    disabled={reviewPage === 0}
                    className="p-3 rounded-full border border-white/20 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    aria-label="Previous reviews"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <span className="text-gray-400 text-sm">{reviewPage + 1} / {totalPages}</span>
                  <button
                    onClick={() => setReviewPage(p => Math.min(totalPages - 1, p + 1))}
                    disabled={reviewPage === totalPages - 1}
                    className="p-3 rounded-full border border-white/20 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    aria-label="Next reviews"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
          </section>
        );
      })()}


      {/* Contact Section */}
      <div id="FreeEstimate" />
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600">
              Ready to transform your space? Contact us today for a free estimate.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden bg-[#1a3a9e] px-8 py-10 flex flex-col items-center gap-6 shadow-2xl">
            <p className="text-white text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-center">
              GET A FREE ESTIMATE IN 24 HRS
            </p>
            <button
              onClick={openModal}
              className="px-12 py-4 rounded-lg border-2 border-[#2cc4c4] text-white font-extrabold text-lg uppercase tracking-widest hover:bg-[#2cc4c4]/20 transition"
            >
              GET A FREE ESTIMATE TODAY
            </button>
            <p className="text-white/80 text-sm font-semibold tracking-wide">*Same Day Spots Filling Fast!</p>
          </div>
        </div>
      </section>

      {/* Multi-step Contact Form Modal */}
      {modalOpen && <ContactForm onClose={closeModal} />}

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
