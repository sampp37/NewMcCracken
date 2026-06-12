import { Phone, Menu, X, MapPin, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import ContactForm from './ContactForm';


function PortfolioImage() {
  const [tapped, setTapped] = useState(false);
  return (
    <div
      className="overflow-visible flex items-center justify-center cursor-pointer"
      onClick={() => setTapped(t => !t)}
    >
      <img
        src="/portfolio_(2).webp"
        alt="McCracken Painting portfolio of completed projects"
        loading="lazy"
        className={[
          'w-full rounded-lg transition-transform duration-300 origin-center',
          'md:hover:scale-110',
          tapped ? 'scale-110 md:scale-100' : '',
        ].join(' ')}
      />
    </div>
  );
}


const allReviews = [
  {
    title: 'A Friendly Family Team You Can Actually Talk To!',
    body: <>Great group of family painters that are <strong className="text-gray-900">super friendly and easy to talk too</strong>. I highly recommend!!!</>,
    name: 'Drew Powell',
  },
  {
    title: 'Always Exceeds Expectations, Every Single Time!',
    body: <>We have used McCracken as a painting vendor for <strong className="text-gray-900">several years</strong> and they always do a <strong className="text-gray-900">great job</strong>. They always exceed expectations with quality and <strong className="text-gray-900">timeliness</strong>. They're friendly and easy to communicate with!</>,
    name: 'Caroline Baker',
  },
  {
    title: 'Amazing Work and Excellent Communication — 10/10!',
    body: <>McCracken painting <strong className="text-gray-900">has always done amazing work</strong>. Very well ran and <strong className="text-gray-900">excellent with communication</strong>. I highly recommend them for your next painting project. You will not be disappointed! 10/10.</>,
    name: 'Casey Frier',
  },
  {
    title: 'Fast, Quality Work — Hiring Again for Sure!',
    body: <>Great job. They painted my apartment and everything looks great. <strong className="text-gray-900">Fast working!!!</strong> Definitely hiring for my next paint job!</>,
    name: 'Stephen Morrow',
  },
  {
    title: 'Great Work and Kind Employees!',
    body: <>They do a great job painting and have <strong className="text-gray-900">very kind employees</strong>!</>,
    name: 'William Powell',
  },
  {
    title: '10 Years of Large Scale Projects Done Right',
    body: <>I've been working with McCracken Painting for over <strong className="text-gray-900">10 years on large-scale student housing projects</strong>, and they've consistently delivered great results. Their team is reliable, <strong className="text-gray-900">organized</strong>, and able to handle projects of any size with professionalism. I know I can count on them to get <strong className="text-gray-900">the job done right and on time</strong>.</>,
    name: 'Caitlin Wright',
  },
  {
    title: 'A Friendly Family Team You Can Actually Talk To!',
    body: <>Great group of family painters that are <strong className="text-gray-900">super friendly and easy to talk too</strong>. I highly recommend!!!</>,
    name: 'Drew Powell',
  },
  {
    title: 'Always Exceeds Expectations, Every Single Time!',
    body: <>We have used McCracken as a painting vendor for <strong className="text-gray-900">several years</strong> and they always do a <strong className="text-gray-900">great job</strong>. They always exceed expectations with quality and <strong className="text-gray-900">timeliness</strong>. They're friendly and easy to communicate with!</>,
    name: 'Caroline Baker',
  },
  {
    title: 'Amazing Work and Excellent Communication — 10/10!',
    body: <>McCracken painting <strong className="text-gray-900">has always done amazing work</strong>. Very well ran and <strong className="text-gray-900">excellent with communication</strong>. I highly recommend them for your next painting project. You will not be disappointed! 10/10.</>,
    name: 'Casey Frier',
  },
  {
    title: 'Fast, Quality Work — Hiring Again for Sure!',
    body: <>Great job. They painted my apartment and everything looks great. <strong className="text-gray-900">Fast working!!!</strong> Definitely hiring for my next paint job!</>,
    name: 'Stephen Morrow',
  },
  {
    title: 'Great Work and Kind Employees!',
    body: <>They do a great job painting and have <strong className="text-gray-900">very kind employees</strong>!</>,
    name: 'William Powell',
  },
  {
    title: '10 Years of Large Scale Projects Done Right',
    body: <>I've been working with McCracken Painting for over <strong className="text-gray-900">10 years on large-scale student housing projects</strong>, and they've consistently delivered great results. Their team is reliable, <strong className="text-gray-900">organized</strong>, and able to handle projects of any size with professionalism. I know I can count on them to get <strong className="text-gray-900">the job done right and on time</strong>.</>,
    name: 'Caitlin Wright',
  },
];

const awards = [
  { src: '/BBRAward.png', alt: 'Best of Business Rate 2025' },
  { src: '/QBAward.webp', alt: 'Quality Business Awards 2025-2026 Winner' },
  { src: '/BBB.png', alt: 'BBB Torch Awards for Ethics Winner' },
];

const serviceSlides = [
  '/McClients1.webp',
  '/McClients2.webp',
  '/McClients3.webp',
  '/McClients4.webp',
];

function ServiceCarousel() {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = serviceSlides.length;

  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5000);
  }, [next]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
    setDragging(true);
  };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX.current !== null) {
      const delta = e.clientX - dragStartX.current;
      if (delta < -50) { next(); resetTimer(); }
      else if (delta > 50) { prev(); resetTimer(); }
    }
    dragStartX.current = null;
    setDragging(false);
  };
  const handleMouseLeave = () => {
    dragStartX.current = null;
    setDragging(false);
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX.current !== null) {
      const delta = e.changedTouches[0].clientX - dragStartX.current;
      if (delta < -50) { next(); resetTimer(); }
      else if (delta > 50) { prev(); resetTimer(); }
    }
    dragStartX.current = null;
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-xl select-none"
      style={{ cursor: dragging ? 'grabbing' : 'grab' }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide strip */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {serviceSlides.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`McCracken Painting client ${i + 1}`}
            loading={i === 0 ? 'eager' : 'lazy'}
            draggable={false}
            className="w-full flex-shrink-0 object-cover"
            style={{ aspectRatio: '4/3' }}
          />
        ))}
      </div>

      {/* Left arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); resetTimer(); }}
        aria-label="Previous photo"
        className="group absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-200
          bg-white/30 hover:bg-white/60 p-2 hover:scale-125"
      >
        <ChevronLeft className="w-7 h-7 text-white drop-shadow" strokeWidth={2.5} />
      </button>

      {/* Right arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); next(); resetTimer(); }}
        aria-label="Next photo"
        className="group absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-200
          bg-white/30 hover:bg-white/60 p-2 hover:scale-125"
      >
        <ChevronRight className="w-7 h-7 text-white drop-shadow" strokeWidth={2.5} />
      </button>
    </div>
  );
}


function ReviewsSection() {
  const [reviewPage, setReviewPage] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const perPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(allReviews.length / perPage);
  const visible = allReviews.slice(reviewPage * perPage, reviewPage * perPage + perPage);

  useEffect(() => {
    const timer = setInterval(() => {
      setReviewPage(p => (p + 1) % totalPages);
    }, 6000);
    return () => clearInterval(timer);
  }, [totalPages, reviewPage]);

  const goTo = (p: number) => setReviewPage(Math.max(0, Math.min(totalPages - 1, p)));

  return (
    <section id="reviews" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <p className="text-orange-500 uppercase tracking-widest font-semibold text-sm mb-3">What Our Clients Say</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-wide">
            See Why These Hoosiers Wouldn't Go Anywhere Else
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {visible.map((review, i) => {
            const cardStyles = [
              'bg-white border border-gray-200 border-l-4 border-l-orange-400',
              'bg-orange-50 border border-orange-100 border-l-4 border-l-orange-500',
              'bg-gray-50 border border-gray-200 border-l-4 border-l-gray-400',
            ];
            return (
              <div
                key={reviewPage * perPage + i}
                className={`${cardStyles[i % 3]} rounded-2xl p-7 flex flex-col gap-4 shadow-sm`}
              >
                <h3 className="text-gray-900 font-bold text-lg leading-snug">{review.title}</h3>
                <p className="text-gray-600 text-base leading-relaxed flex-1">"{review.body}"</p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-gray-900 font-bold">{review.name}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => goTo(reviewPage - 1)}
            disabled={reviewPage === 0}
            className="p-3 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 h-2 ${
                  i === reviewPage ? 'bg-orange-500 w-6' : 'bg-gray-300 w-2'
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(reviewPage + 1)}
            disabled={reviewPage === totalPages - 1}
            className="p-3 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition"
            aria-label="Next reviews"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

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

      {/* ─── HERO SECTION ─────────────────────────────────────────── */}
      <section className="pt-28 bg-white overflow-hidden">

        {/* ── MOBILE (< lg) ── centered headline → full-bleed image → awards */}
        <div className="lg:hidden">
          <div className="text-center px-6 pt-6 pb-5">
            <h1 className="font-extrabold text-gray-900 leading-tight text-2xl sm:text-3xl">
              Painting Is Messy, Avoid The Stress With<br />
              A 3 Generation Crew That Cleans Up Every Day
            </h1>
          </div>
          {/* Full-bleed image — no padding, no rounding, no shadow */}
          <img
            src="/McClients.webp"
            alt="McCracken Painting happy clients"
            fetchPriority="high"
            loading="eager"
            className="w-full object-cover"
            style={{ maxHeight: '70vw' }}
          />
          {/* Awards centered below image */}
          <div className="flex items-center justify-center gap-6 py-6 px-6">
            {awards.map((award) => (
              <div key={award.src} className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden flex-shrink-0 bg-white">
                <img src={award.src} alt={award.alt} className="w-full h-full object-contain" />
              </div>
            ))}
          </div>
          {/* Mobile CTA */}
          <div className="px-6 pb-8 text-center">
            <button
              onClick={openModal}
              className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-base px-7 py-4 rounded-xl transition-transform hover:scale-105 transform uppercase tracking-wide shadow-lg w-full"
            >
              Get My Professional Estimate For Free Within 24 Hrs
            </button>
          </div>
        </div>

        {/* ── DESKTOP (≥ lg) ── left col content | right col edge-to-edge image */}
        <div className="hidden lg:flex lg:items-stretch lg:min-h-[520px]">

          {/* LEFT — headline, CTA, awards */}
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
                className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-base lg:text-lg px-7 py-4 rounded-xl transition-transform hover:scale-105 transform uppercase tracking-wide shadow-lg"
              >
                Get My Professional Estimate For Free Within 24 Hrs
              </button>
            </div>
            <div className="flex items-center gap-5 lg:gap-7">
              {awards.map((award) => (
                <div key={award.src} className="w-24 h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden flex-shrink-0 bg-white">
                  <img src={award.src} alt={award.alt} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — image fills column flush, no padding, no frame */}
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

      {/* ─── REVIEWS ─── */}
      <ReviewsSection />

      {/* ─── SERVICES + CAROUSEL ─── */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* Mobile: text → carousel → CTA */}
          <div className="lg:hidden flex flex-col gap-8">
            <div>
              <h2 className="text-2xl font-extrabold text-orange-500 leading-tight mb-1">
                Interior &amp; Exterior Painting
              </h2>
              <p className="text-gray-700 font-semibold text-base mb-5">
                Award Winning Company – Local Family, Trusted Since 2000
              </p>
              <ul className="space-y-3">
                {[
                  'Furniture and Paintings are Handled with Respect',
                  'Arrive Exactly When Promised',
                  'Initial Quote Stays the Same',
                  'Your House Rules are Our Priority',
                  'Kids & Pets Friendly Environment',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-gray-800 text-base font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ServiceCarousel />
            <button
              onClick={openModal}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-base py-4 rounded-xl transition-transform hover:scale-105 transform uppercase tracking-wide shadow-lg"
            >
              Get My Professional Estimate for Free
            </button>
          </div>

          {/* Desktop: carousel left | content right */}
          <div className="hidden lg:flex items-center gap-14">
            <div className="w-[55%] flex-shrink-0">
              <ServiceCarousel />
            </div>
            <div className="flex-1 flex flex-col gap-6">
              <div>
                <h2 className="text-3xl xl:text-4xl font-extrabold text-orange-500 leading-tight mb-2">
                  Interior &amp; Exterior Painting
                </h2>
                <p className="text-gray-700 font-semibold text-lg">
                  Award Winning Company – Local Family, Trusted Since 2000
                </p>
              </div>
              <ul className="space-y-4">
                {[
                  'Furniture and Paintings are Handled with Respect',
                  'Arrive Exactly When Promised',
                  'Initial Quote Stays the Same',
                  'Your House Rules are Our Priority',
                  'Kids & Pets Friendly Environment',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" strokeWidth={2.5} />
                    <span className="text-gray-800 text-lg font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={openModal}
                className="self-start bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-base lg:text-lg px-8 py-4 rounded-xl transition-transform hover:scale-105 transform uppercase tracking-wide shadow-lg"
              >
                Get My Professional Estimate for Free
              </button>
            </div>
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
            </div>
            <div className="w-full lg:w-1/2">
              <PortfolioImage />
            </div>
          </div>
        </div>
      </section>

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
          <div className="w-full lg:w-5/12 flex-shrink-0" style={{ marginTop: 'auto', marginBottom: 'auto' }}>
            <img
              src="/Painting.png"
              alt="McCracken Painting interior staircase project"
              className="w-full rounded-2xl shadow-2xl object-cover"
              loading="lazy"
            />
          </div>
          <div className="w-full lg:w-7/12 space-y-6 lg:pt-[8vh] text-center lg:text-left">
            <h2
              className="text-white font-bold uppercase tracking-wide"
              style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '36px', lineHeight: '1.25' }}
            >
              GET THE FEELING OF ENTERING A NEW HOME.
            </h2>
            <div
              className="text-gray-200 space-y-4"
              style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '22px', lineHeight: '1.75' }}
            >
              <p>Three generations of painting have made us experts in what Lafayette homes truly need.</p>
              <p>Stop searching for "painters near me" and start exploring our full list of services below to see how we can help enhance your property.</p>
            </div>
            <a
              href="tel:+17654302200"
              className="inline-flex items-center justify-center bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-lg transition text-lg font-semibold hover:scale-105 transform"
            >
              Call Now for a Free Estimate
            </a>
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
          <h2
            className="text-gray-900 font-bold text-center mb-10"
            style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '32px' }}
          >
            WHY YOUR NEIGHBORS CHOOSE US
          </h2>
          <div className="flex flex-col lg:flex-row" style={{ gap: '40px' }}>
            <div className="space-y-10" style={{ flex: '1 1 0' }}>
              {[
                { num: '1.', title: 'Respect Time & Communication', body: 'Your house. Your schedule. From your free quote to blue tape walkthrough, everything gets done on time.' },
                { num: '2.', title: 'Stress Free & Mess-Free Service', body: "Paint is messy, but your experience shouldn't be. We believe in cleaning up after ourselves every day, just like any good house guest should." },
                { num: '3.', title: 'Your Kids and Pets, Our Priority.', body: 'Kids and pet friendly atmosphere. No tools or paint buckets just hanging around.' },
                { num: '4.', title: 'Value Based Pricing', body: 'Upfront, honest pricing without hidden fees. Rest assured, you get what you pay for.' },
              ].map(({ num, title, body }) => (
                <div key={num} className="text-left">
                  <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '21px' }}>
                    {num} {title}
                  </h3>
                  <p className="text-gray-700" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '18px', lineHeight: '1.6' }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
            <div className="w-full lg:w-[420px] lg:max-w-[420px] flex-shrink-0 flex flex-col gap-4">
              <img src="/McCracken-van.jpg" alt="McCracken Painting van" style={{ borderRadius: '12px', width: '100%', flex: '1', objectFit: 'cover' }} loading="lazy" />
              <img src="/painting-s3.png" alt="Painter at work" style={{ borderRadius: '12px', width: '100%', flex: '1', objectFit: 'cover' }} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Generational Expertise */}
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
          <h2 className="text-white font-bold uppercase mb-10" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '40px' }}>
            GENERATIONAL EXPERTISE
          </h2>
          <img src="/family-photo.jpg" alt="McCracken Painting family team" className="rounded-2xl shadow-2xl w-full max-w-sm mb-10" loading="lazy" />
          <div className="text-gray-200 max-w-3xl space-y-6" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '20px', lineHeight: '1.75' }}>
            <p>Proudly family owned and serving the Lafayette area for 25+ years, we're committed to delivering exceptional results one house at the time.</p>
            <p>Our commitment goes beyond the brush, we promise to be your best guests, treating your place with the utmost care and leaving it even more pristine than when we arrived.</p>
          </div>
        </div>
      </section>

      {/* Community Sponsors Banner */}
      <div className="bg-white border-y border-gray-200 shadow-sm py-6">
        <div className="flex flex-col items-center gap-4 px-6 md:hidden">
          <h3 className="text-lg font-extrabold text-gray-900 uppercase tracking-wide">PROUDLY SPONSORING</h3>
          <div className="flex items-center justify-center gap-8">
            <img src="/sponsor2....jpg" alt="Frontier School Corporation" className="h-16 w-auto object-contain" />
            <img src="/cottages.jpg" alt="The Cottages on Lindberg" className="h-16 w-auto object-contain" />
            <img src="/Sponsor...jpg" alt="Rich Goyer Brookston Open Golf" className="h-16 w-auto object-contain" />
          </div>
        </div>
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
        className="relative py-14 bg-white"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-start">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 uppercase tracking-wide mb-4">Areas We Serve</h2>
              <p className="text-gray-600 mb-8 max-w-2xl text-xl">McCracken is proud to offer top quality painting services tailored to your neighborhood in and around Lafayette.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-3">
                {['Lafayette','Otterbein','Delphi','Frankfort','Monticello','Crawfordsville','Attica','Brookston','Lebanon','Rensselaer','Fowler','Thorntown','West Lafayette','Battle Ground','Shadeland','Dayton','Clarks Hill','Stockwell','Montmorenci'].map((area) => (
                  <div key={area} className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-orange-500 flex-shrink-0" />
                    <span className="text-gray-900 text-lg">{area}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 min-w-[280px]">
              <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wide mb-5">Contact Info:</h3>
              <div className="space-y-4 mb-6">
                <a href="tel:+17654302200" className="flex items-center gap-3 text-gray-900 hover:text-orange-500 transition">
                  <Phone className="h-5 w-5 text-orange-500" />
                  <span className="text-lg font-medium">(765) 430-2200</span>
                </a>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">104 Pineview Ln<br />Lafayette, IN 47905</span>
                </div>
              </div>
              <button onClick={openModal} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition uppercase tracking-wide text-sm">
                Get a Free Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative py-14 overflow-hidden"
        style={{ backgroundImage: 'url("/MC-6.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
      >
        <div className="absolute inset-0 bg-[#0a1e2e]/75"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide mb-6">
            That Experienced Painter You Need? We're the One
          </h2>
          <div className="text-white text-lg leading-loose space-y-3">
            <p>We understand that painting isn't just a project; it's an integral part of your home! That's why we:</p>
            <p>Run background checks on all team members.</p>
            <p>Communicate with you, so we can fully understand all your priorities and concerns.</p>
            <p>Take extra precautions when prepping and cleaning.</p>
          </div>
        </div>
      </section>

      {/* Section 8 — Color Studio */}
      <section
        id="colors"
        className="relative py-16"
        style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', backgroundImage: 'url("/MC-S3.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
      >
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <h2 className="text-4xl sm:text-5xl font-bold text-white uppercase tracking-wide text-center mb-10">
            How To Choose Colors?
          </h2>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <img src="/Color_consultation11.webp" alt="Color consultation paint buckets" className="w-full rounded-lg" loading="lazy" />
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <p className="text-gray-200" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '19.5px', lineHeight: '1.8' }}>
                When every color is available at your fingertips, the creative possibilities are endless.
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

      {/* Contact Section */}
      <div id="FreeEstimate" />
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600">Ready to transform your space? Contact us today for a free estimate.</p>
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

      {modalOpen && <ContactForm onClose={closeModal} />}

      {/* Pulsing call button — bottom right */}
      <a
        href="tel:+17654302200"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-3 rounded-full shadow-lg transition-transform hover:scale-105 animate-call-pulse"
        aria-label="Call us now"
      >
        <Phone className="w-5 h-5" />
        <span className="text-sm font-bold uppercase tracking-wide">Call</span>
      </a>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="/McCracken_logo.jpg" alt="McCracken Painting" className="h-16" loading="lazy" />
              </div>
              <p className="text-gray-400">Professional painting services in West Lafayette, Indiana for over 25 years.</p>
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
                <li>(765) 430-2200</li>
                <li>Monday - Friday</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 McCracken Painting. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
