import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

function ThankYou() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8 flex justify-center">
          <CheckCircle className="w-20 h-20 text-green-600" />
        </div>

        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Thank You!
        </h1>

        <p className="text-2xl text-gray-600 mb-8">
          We received your request. We'll contact you shortly.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <p className="text-gray-700 mb-4">
            Our team at McCracken Painting is excited to help you transform your space.
            We'll review your message and get back to you as soon as possible.
          </p>
          <p className="text-gray-600">
            In the meantime, feel free to call us directly at <a href="tel:765-430-2200" className="text-blue-600 hover:text-blue-700 font-semibold">(765) 430-2200</a>
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default ThankYou;
