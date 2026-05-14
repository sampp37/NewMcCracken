import { useState } from 'react';
import { X } from 'lucide-react';

interface ContactFormProps {
  onClose: () => void;
}

export default function ContactForm({ onClose }: ContactFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = name.trim().length > 0 && phone.trim().length > 0;

  const handleSubmit = async () => {
    if (!canSubmit || loading) return;
    setLoading(true);
    setError(null);

    const payload = {
      name: name.trim(),
      phone_number: phone.trim(),
      details: details.trim() || null,
    };

    if (!navigator.onLine) {
      setError('You appear to be offline. Please check your internet connection and try again.');
      setLoading(false);
      return;
    }

    const SUPABASE_URL = 'https://zroehayusudopemhfdgi.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyb2VoYXl1c3Vkb3BlbWhmZGdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1MjEzODgsImV4cCI6MjA3MjA5NzM4OH0.-AnaNIPhE5w1OSbcR-pZIE6LS1VvDrDhahdMcrTJUQQ';

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { message?: string; error?: string }).message || (body as { message?: string; error?: string }).error || `Server returned ${res.status}`);
      }

      setLoading(false);
      onClose();
      window.location.href = '/formsubmitted';
    } catch (err) {
      const errName = err instanceof Error ? err.name : 'Error';
      const errMsg = err instanceof Error ? err.message : String(err);
      const isFetchFail = errName === 'TypeError' && /fetch/i.test(errMsg);

      if (isFetchFail) {
        const mailLines = [
          `Name: ${payload.name}`,
          `Phone: ${payload.phone_number}`,
          `Details: ${payload.details ?? '-'}`,
        ].join('\n');
        const mailto = `mailto:sampp37@gmail.com?subject=${encodeURIComponent(`Quote Request from ${payload.name}`)}&body=${encodeURIComponent(mailLines)}`;
        setError(`BLOCKED|||${mailto}`);
      } else {
        setError(errMsg);
      }
      setLoading(false);
    }
  };

  const inputClass = 'w-full px-4 py-3 border-2 rounded-xl outline-none text-base transition focus:ring-2 focus:ring-sky-400 focus:border-sky-400 border-gray-200';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition p-1 rounded-lg hover:bg-gray-100 z-10"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8 pt-10">
          {error && error.startsWith('BLOCKED|||') && (
            <div className="mb-4 p-4 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 text-sm space-y-3">
              <p className="font-semibold">We couldn't reach our server from your browser.</p>
              <p>This is usually caused by an ad blocker, VPN, or browser extension blocking <code className="bg-amber-100 px-1 rounded">supabase.co</code>.</p>
              <p className="font-semibold">Try one of these:</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Disable your ad blocker for this page and try again</li>
                <li>Try a different browser or disable extensions</li>
                <li>Or send your request directly by email:</li>
              </ul>
              <a
                href={error.split('|||')[1]}
                className="inline-block mt-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-5 py-2.5 rounded-lg transition"
              >
                Send by Email Instead
              </a>
              <p className="text-xs mt-2">Or call us directly at <a href="tel:+17652938680" className="font-bold underline">(765) 293-8680</a></p>
            </div>
          )}
          {error && !error.startsWith('BLOCKED|||') && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm break-words">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className={inputClass}
                autoFocus
              />
            </div>
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-2">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(765) 430-2200"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-2">Anything You'd Like to Share?</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Tell us about your project, timeline, or any questions..."
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!canSubmit || loading}
            className={`w-full mt-6 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-200 ${
              canSubmit
                ? 'bg-sky-400 hover:bg-sky-500 shadow-lg shadow-sky-400/30'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </span>
            ) : (
              'Get My Free Estimate'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
