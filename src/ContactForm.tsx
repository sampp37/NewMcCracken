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

    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
    const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/save-lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          phone_number: phone.trim(),
          details: details.trim() || null,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          (body as { error?: string }).error || `Server error ${res.status}`
        );
      }

      onClose();
      window.location.href = '/formsubmitted';
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      const isFetchFail = err instanceof TypeError && /fetch/i.test(errMsg);

      if (isFetchFail) {
        const body = [
          `Name: ${name.trim()}`,
          `Phone: ${phone.trim()}`,
          `Details: ${details.trim() || '-'}`,
        ].join('\n');
        const mailto = `mailto:sampp37@gmail.com?subject=${encodeURIComponent(`Quote Request from ${name.trim()}`)}&body=${encodeURIComponent(body)}`;
        setError(`BLOCKED|||${mailto}`);
      } else {
        setError(errMsg);
      }
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 border-2 rounded-xl outline-none text-base transition focus:ring-2 focus:ring-sky-400 focus:border-sky-400 border-gray-200';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      onClick={onClose}
    >
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
              <p>This is usually caused by an ad blocker or browser extension. Try disabling it and submitting again, or:</p>
              <a
                href={error.split('|||')[1]}
                className="inline-block mt-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-5 py-2.5 rounded-lg transition"
              >
                Send by Email Instead
              </a>
              <p className="text-xs mt-1">Or call us at <a href="tel:+17654302200" className="font-bold underline">(765) 430-2200</a></p>
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
