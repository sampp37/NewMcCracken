import { Phone, MapPin, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import ContactForm from './ContactForm';

// ─── Data ────────────────────────────────────────────────────────────────────

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

const serviceSlides = [
  { src: '/McClients1.webp', position: 'center 70%' },
  { src: '/McClients2.webp', position: 'center 15%' },
  { src: '/McClients4.webp', position: 'center center' },
];

// ─── ServiceCarousel ──────────────────────────────────────────────────────────

function ServiceCarousel() {
  const total = serviceSlides.length;
  const extSlides = [serviceSlides[total - 1], ...serviceSlides, serviceSlides[0]];
  const [current, setCurrent] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setCurrent(c => c + 1), []);
  const prev = useCallback(() => setCurrent(c => c - 1), []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrent(c => c + 1), 5000);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const handleTransitionEnd = () => {
    if (current >= total + 1) {
      setTransitionEnabled(false);
      setCurrent(1);
    } else if (current <= 0) {
      setTransitionEnabled(false);
      setCurrent(total);
    }
  };

  useEffect(() => {
    if (!transitionEnabled) {
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setTransitionEnabled(true)));
      return () => cancelAnimationFrame(raf);
    }
  }, [transitionEnabled]);

  const handleMouseDown = (e: React.MouseEvent) => { dragStartX.current = e.clientX; setDragging(true); };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX.current !== null) {
      const delta = e.clientX - dragStartX.current;
      if (delta < -50) { next(); resetTimer(); }
      else if (delta > 50) { prev(); resetTimer(); }
    }
    dragStartX.current = null;
    setDragging(false);
  };
  const handleMouseLeave = () => { dragStartX.current = null; setDragging(false); };
  const handleTouchStart = (e: React.TouchEvent) => { dragStartX.current = e.touches[0].clientX; };
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
      <div
        className="flex"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: transitionEnabled ? 'transform 500ms ease-in-out' : 'none',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extSlides.map((slide, i) => (
          <img
            key={i}
            src={slide.src}
            alt="McCracken Painting client"
            loading="lazy"
            draggable={false}
            className="w-full flex-shrink-0 object-cover"
            style={{ aspectRatio: '4/3', objectPosition: slide.position }}
          />
        ))}
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); prev(); resetTimer(); }}
        aria-label="Previous photo"
        className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-200 bg-white/30 hover:bg-white/60 p-2 hover:scale-125"
      >
        <ChevronLeft className="w-7 h-7 text-white drop-shadow" strokeWidth={2.5} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); next(); resetTimer(); }}
        aria-label="Next photo"
        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-200 bg-white/30 hover:bg-white/60 p-2 hover:scale-125"
      >
        <ChevronRight className="w-7 h-7 text-white drop-shadow" strokeWidth={2.5} />
      </button>
    </div>
  );
}

// ─── ReviewsSection ───────────────────────────────────────────────────────────

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

  const goTo = (p: number) => setReviewPage(Math.max(0, Math.min(totalPages - 1, p)));

  return (
    <section id="reviews" className="py-16 bg-gray-50 relative">
      {/* Large wall-touching side arrows */}
      <button
        onClick={() => goTo(reviewPage - 1)}
        disabled={reviewPage === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center p-3 rounded-r-2xl bg-white/80 hover:bg-white shadow-md disabled:opacity-20 disabled:cursor-not-allowed transition-transform duration-200 hover:scale-125"
        aria-label="Previous reviews"
      >
        <ChevronLeft className="w-12 h-12 text-gray-700" strokeWidth={2} />
      </button>
      <button
        onClick={() => goTo(reviewPage + 1)}
        disabled={reviewPage === totalPages - 1}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center p-3 rounded-l-2xl bg-white/80 hover:bg-white shadow-md disabled:opacity-20 disabled:cursor-not-allowed transition-transform duration-200 hover:scale-125"
        aria-label="Next reviews"
      >
        <ChevronRight className="w-12 h-12 text-gray-700" strokeWidth={2} />
      </button>

      <div className="max-w-7xl mx-auto px-16 lg:px-20">
        <div className="text-center mb-12">
          <p className="text-orange-500 uppercase tracking-widest font-semibold text-[17px] mb-3">What Our Clients Say</p>
          <h2 className="text-[2rem] sm:text-[2.5rem] font-bold text-gray-900 tracking-wide">
            See Why These Homeowners Wouldn't Go Anywhere Else
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
                className={`${cardStyles[i % 3]} rounded-2xl p-7 flex flex-col gap-4 shadow-sm transition-transform duration-200 hover:scale-[1.15] cursor-default`}
              >
                <h3 className="text-gray-900 font-bold text-[21px] leading-snug">{review.title}</h3>
                <p className="text-gray-600 text-[19px] leading-relaxed flex-1">"{review.body}"</p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-gray-900 font-bold text-[19px]">{review.name}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-4 mt-10">
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
        </div>
      </div>
    </section>
  );
}

// ─── BelowFold (default export) ───────────────────────────────────────────────

export default function BelowFold({ openModal }: { openModal: () => void }) {
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);

  return (
    <>
      {/* Reviews */}
      <ReviewsSection />

      {/* Services + Carousel */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="lg:hidden flex flex-col gap-8">
            <div>
              <h2 className="text-2xl font-extrabold text-orange-500 leading-tight mb-1">
                Lafayette Neighbors are Quietly Experiencing
              </h2>
              <p className="text-gray-700 font-semibold text-base mb-5">
                Award Winning Company. Local Family Painting for 3 Generations
              </p>
              <ul className="space-y-3">
                {[
                  'Your Final Bill Matches Your Original Quote',
                  'Arrive Exactly When Promised',
                  'Clean Up Every Night Before We Leave',
                  'Tools and Buckets Safely Placed to Keep Pets and Kids Safe and Comfortable',
                  '12 Months Satisfaction Warranty, Wear and Tear Included.',
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
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-base py-4 rounded-xl transition-transform hover:scale-105 transform shadow-lg"
            >
              Get My Professional Estimate For Free
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-14">
            <div className="w-[55%] flex-shrink-0">
              <ServiceCarousel />
            </div>
            <div className="flex-1 flex flex-col gap-6">
              <div>
                <h2 className="text-3xl xl:text-4xl font-extrabold text-orange-500 leading-tight mb-2">
                  Lafayette Neighbors are Quietly Experiencing
                </h2>
                <p className="text-gray-700 font-semibold text-lg">
                  Award Winning Company. Local Family Painting for 3 Generations
                </p>
              </div>
              <ul className="space-y-4">
                {[
                  'Your Final Bill Matches Your Original Quote',
                  'Arrive Exactly When Promised',
                  'Clean Up Every Night Before We Leave',
                  'Tools and Buckets Safely Placed to Keep Pets and Kids Safe and Comfortable',
                  '12 Months Satisfaction Warranty, Wear and Tear Included.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" strokeWidth={2.5} />
                    <span className="text-gray-800 text-lg font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={openModal}
                className="self-start bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-base lg:text-lg px-8 py-4 rounded-xl transition-transform hover:scale-105 transform shadow-lg"
              >
                Get My Professional Estimate For Free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="portfolio" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <h2 className="text-4xl sm:text-5xl font-bold text-black text-center mb-12 uppercase tracking-wide">
            Lafayette &ndash; Indiana Painting Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Exterior Painting',
                img: '/w-exterior1.webp',
                alt: 'Exterior house painting Lafayette Indiana',
                text: 'Taking care of your garden and avoiding painting drips is our focus while painting the exteriors of Lafayette houses.',
              },
              {
                title: 'Interior Painting',
                img: '/w-interior.webp',
                alt: 'Interior painting service Lafayette Indiana',
                text: 'All your belongings are treated with respect and put back in their place. Keeping a pet & kids-friendly environment is a minimum requirement.',
              },
              {
                title: 'Pressure Washing',
                img: '/w-powerwash.webp',
                alt: 'Pressure washing service Lafayette Indiana',
                text: 'Let your neighbors think you got a new paint job. Pressure washing done right, focused on bringing back to life your house — no paint needed.',
              },
              {
                title: 'Deck Painting',
                img: '/w-deck.webp',
                alt: 'Deck painting service Lafayette Indiana',
                text: 'Want to supercharge your relaxing moments with a fresh new deck? Our deck painting service gives you the relaxation you really deserve.',
              },
              {
                title: 'Garage Epoxy Floor',
                img: '/w-epoxy.webp',
                alt: 'Garage epoxy floor service Lafayette Indiana',
                text: 'Trusted epoxy flooring experts. Durable, slip-resistant floors for garages, basements & businesses.',
              },
            ].map(({ title, img, alt, text }) => (
              <div key={title} className="rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col">
                <div className="overflow-hidden">
                  <img
                    src={img}
                    alt={alt}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-300 hover:scale-105"
                    style={{ aspectRatio: '4/3' }}
                  />
                </div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <h3 className="text-xl font-bold text-orange-500 uppercase tracking-wide">{title}</h3>
                  <p className="text-gray-700 text-base leading-relaxed flex-1">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Home Feeling */}
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

      {/* Why Neighbors Choose Us */}
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

      {/* Generational Expertise */}
      <section
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

      {/* Areas Served */}
      <section id="areasweserve" className="relative py-14 bg-white">
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
              <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <a href="tel:+17654302200" className="text-gray-700 hover:text-orange-500 transition font-medium">(765) 430-2200</a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">104 Pineview Ln<br />Lafayette, IN 47905</span>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition mt-2"
              >
                Get a Free Estimate
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <img src="/McCracken_Painting_Logo.webp" alt="McCracken Painting Logo" className="h-14 mb-4 object-contain" loading="lazy" />
              <p className="text-gray-400">Professional painting services in West Lafayette, Indiana for over 25 years.</p>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-wide mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Exterior Painting</li>
                <li>Interior Painting</li>
                <li>Pressure Washing</li>
                <li>Deck Painting</li>
                <li>Garage Epoxy Floor</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-wide mb-4">Service Areas</h4>
              <ul className="space-y-2 text-gray-400">
                <li>West Lafayette, Indiana</li>
                <li>Lafayette, Indiana</li>
                <li>Frankfort, Indiana</li>
                <li>Crawfordsville, Indiana</li>
                <li>Battle Ground, Indiana</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} McCracken Painting. All rights reserved.</p>
            <a href="tel:+17654302200" className="hover:text-orange-400 transition">(765) 430-2200</a>
          </div>
        </div>
      </footer>

      {modalOpen && <ContactForm onClose={handleClose} />}
    </>
  );
}