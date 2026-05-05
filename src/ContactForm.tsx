import { useState, useRef, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, X } from 'lucide-react';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const TIME_OPTIONS = ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

const STEPS = [
  { key: 'name', label: 'What is your name?', type: 'text', placeholder: 'Your full name' },
  { key: 'email', label: 'What is your email?', type: 'email', placeholder: 'your@email.com' },
  { key: 'phone', label: 'What is your phone number?', type: 'tel', placeholder: '(765) 430-2200' },
  { key: 'service', label: 'Select a service', type: 'select', options: ['Interior Painting', 'Exterior Painting', 'Power Washing', 'Epoxy Floor'] },
  { key: 'best_day_to_call', label: 'Best day to call', type: 'select', options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
  { key: 'best_time_to_reach', label: 'Best time to reach you', type: 'select', options: TIME_OPTIONS },
  { key: 'message', label: 'Simple project description', type: 'textarea', placeholder: 'Tell us about your project...' },
] as const;

interface ContactFormProps {
  onClose: () => void;
}

export default function ContactForm({ onClose }: ContactFormProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(null);

  const current = STEPS[step];
  const currentValue = values[current.key] || '';
  const canAdvance = currentValue.trim().length > 0;
  const isLastStep = step === STEPS.length - 1;

  useEffect(() => {
    inputRef.current?.focus();
  }, [step]);

  const advance = () => {
    if (!canAdvance) return;
    if (isLastStep) {
      handleSubmit();
    } else {
      setStep(s => s + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && current.type !== 'textarea') {
      e.preventDefault();
      advance();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const { name, email, phone, service, message, best_day_to_call, best_time_to_reach } = values;

    try {
      const { error: dbError } = await supabase
        .from('contact_requests')
        .insert([{ name, email, phone, service, message, best_day_to_call, best_time_to_reach }]);

      if (dbError) throw new Error(`Database error: ${dbError.message}`);

      fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/resend-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, message, service, best_day_to_call, best_time_to_reach }),
      }).catch(err => console.error('Error calling resend-email function:', err));

      setLoading(false);
      onClose();
      navigate('/thank-you');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'There was an error submitting your request. Please try again.';
      console.error('Error submitting form:', err);
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition p-1 rounded-lg hover:bg-gray-100 z-10"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-sky-400 transition-all duration-300"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        <div className="p-8 pt-10">
          {/* Step indicator */}
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
            Step {step + 1} of {STEPS.length}
          </p>

          {/* Question */}
          <h3 className="text-2xl font-bold text-gray-900 mb-6">{current.label}</h3>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">
              {error}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              {current.type === 'select' ? (
                <select
                  ref={inputRef as React.RefObject<HTMLSelectElement>}
                  value={currentValue}
                  onChange={(e) => setValues({ ...values, [current.key]: e.target.value })}
                  onKeyDown={handleKeyDown}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none text-lg transition"
                >
                  <option value="">Select an option</option>
                  {current.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : current.type === 'textarea' ? (
                <textarea
                  ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                  value={currentValue}
                  onChange={(e) => setValues({ ...values, [current.key]: e.target.value })}
                  placeholder={current.placeholder}
                  rows={3}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none text-lg transition resize-none"
                />
              ) : (
                <input
                  ref={inputRef as React.RefObject<HTMLInputElement>}
                  type={current.type}
                  value={currentValue}
                  onChange={(e) => setValues({ ...values, [current.key]: e.target.value })}
                  onKeyDown={handleKeyDown}
                  placeholder={current.placeholder}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none text-lg transition"
                />
              )}
            </div>

            {/* Arrow button */}
            <button
              onClick={advance}
              disabled={!canAdvance || loading}
              className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                canAdvance
                  ? 'bg-sky-400 text-white hover:bg-sky-500 shadow-lg shadow-sky-400/30'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Helper text */}
          <p className="text-xs text-gray-400 mt-3">
            {isLastStep ? 'Press the arrow to submit' : 'Press Enter or click the arrow to continue'}
          </p>

          {/* Back button */}
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="mt-4 text-sm text-gray-500 hover:text-gray-700 transition"
            >
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
