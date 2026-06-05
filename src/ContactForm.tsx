import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://tltiysrigsdwqfqygqms.supabase.co';
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsdGl5c3JpZ3Nkd3FmcXlncW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5NjQ0NzYsImV4cCI6MjA4OTU0MDQ3Nn0.DxDU8VDH5fnRsb8chTJsfZAw_q6BU1Be4tC5JZ02s7E';

export default function ContactForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/resend-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ name, phone, details }),
      });

      if (!res.ok) {
        const body = await res.text().catch(() => '');
        console.error(`Form submit failed — status ${res.status}:`, body);
        throw new Error(`HTTP ${res.status}`);
      }

      setSuccess(true);
      setTimeout(() => onClose(), 2500);
    } catch (err) {
      console.error('Form submit error:', err);
      setError('Something went wrong. Please call us at (765) 430-2200.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative">
        {/* Header */}
        <div className="bg-sky-400 rounded-t-2xl px-8 py-6">
          <h2 className="text-white text-2xl font-extrabold uppercase tracking-wide">
            Get Your Free Estimate
          </h2>
          <p className="text-sky-100 text-sm mt-1">Same day spots filling fast!</p>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-sky-200 transition"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Body */}
        <div className="px-8 py-7">
          {success ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✓</div>
              <p className="text-gray-900 text-xl font-bold mb-2">Thank you!</p>
              <p className="text-gray-600">We'll be in touch within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="cf-name">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="cf-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="cf-phone">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="cf-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(765) 000-0000"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="cf-details">
                  Details
                </label>
                <textarea
                  id="cf-details"
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Tell us about your project (optional)"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-400 transition resize-none"
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm font-medium">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-sky-400 hover:bg-sky-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-extrabold py-4 rounded-lg transition uppercase tracking-wide text-lg"
              >
                {loading ? 'Sending...' : 'Get My Free Estimate'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
