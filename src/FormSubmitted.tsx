import { useEffect } from 'react';
import { CheckCircle, Phone } from 'lucide-react';

function FormSubmitted() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="w-full bg-white border-b border-gray-100 py-4 px-6 flex justify-center">
        <img
          src="/McCracken_logo.jpg"
          alt="McCracken Painting"
          className="h-16 w-auto object-contain"
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center">

          {/* Check icon with animated ring */}
          <div className="mb-10 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-green-100 scale-150 animate-ping opacity-20" />
              <div className="relative bg-green-50 rounded-full p-6">
                <CheckCircle className="w-20 h-20 text-green-500" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            Thank You!
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed">
            Your request has been received.
          </p>

          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-8 mb-10 text-left space-y-4">
            <p className="text-gray-800 text-lg leading-relaxed">
              The <strong>McCracken Team</strong> will do everything possible to reach out to you as soon as possible — we take every inquiry seriously and pride ourselves on fast, personal communication.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Thank you for taking the time to fill out the form. It means a lot to us, and we can't wait to help transform your space!
            </p>
          </div>

          {/* Call CTA */}
          <div className="mb-10">
            <p className="text-gray-500 text-base mb-3">Want to talk right away? Give us a call:</p>
            <a
              href="tel:+17652938680"
              className="inline-flex items-center justify-center gap-3 bg-sky-400 hover:bg-sky-500 text-white text-xl font-bold px-10 py-5 rounded-xl transition hover:scale-105 transform border-4 border-white shadow-lg"
            >
              <Phone className="w-6 h-6" />
              (765) 293-8680
            </a>
          </div>

          {/* Back link */}
          <a
            href="/"
            className="text-sky-600 hover:text-sky-700 font-semibold text-base underline underline-offset-4 transition"
          >
            Back to McCracken Painting
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full bg-gray-900 text-gray-400 text-center py-5 text-sm">
        &copy; 2026 McCracken Painting. All rights reserved.
      </div>
    </div>
  );
}

export default FormSubmitted;
