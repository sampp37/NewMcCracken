import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, X, Check } from 'lucide-react';

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string) || 'https://tltiysrigsdwqfqygqms.supabase.co';
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsdGl5c3JpZ3Nkd3FmcXlncW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5NjQ0NzYsImV4cCI6MjA4OTU0MDQ3Nn0.DxDU8VDH5fnRsb8chTJsfZAw_q6BU1Be4tC5JZ02s7E';

const SERVICES = ['Interior Painting', 'Exterior Painting', 'Power Washing', 'Epoxy Floor'];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const TIMES = ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

interface ContactFormProps {
  onClose: () => void;
}

function CheckboxGroup({
  options,
  selected,
  onChange,
  columns = 2,
}: {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  columns?: number;
}) {
  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };

  return (
    <div className={`grid gap-2 grid-cols-${columns}`}>
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-all duration-150 text-left ${
              active
                ? 'border-sky-400 bg-sky-50 text-sky-700'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span
              className={`flex-shrink-0 w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                active ? 'bg-sky-400 border-sky-400' : 'border-gray-300'
              }`}
            >
              {active && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
            </span>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

type StepId = 'nameEmail' | 'phoneService' | 'schedule' | 'message';

const STEP_ORDER: StepId[] = ['nameEmail', 'phoneService', 'schedule', 'message'];

export default function ContactForm({ onClose }: ContactFormProps) {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [times, setTimes] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const step = STEP_ORDER[stepIndex];
  const isLastStep = stepIndex === STEP_ORDER.length - 1;

  const canAdvance = (() => {
    if (step === 'nameEmail') return name.trim().length > 0 && email.trim().length > 0;
    if (step === 'phoneService') return services.length > 0;
    if (step === 'schedule') return days.length > 0 && times.length > 0;
    if (step === 'message') return message.trim().length > 0;
    return false;
  })();

  useEffect(() => {
    if (step === 'nameEmail') nameRef.current?.focus();
  }, [step]);

  const advance = () => {
    if (!canAdvance || loading) return;
    if (isLastStep) handleSubmit();
    else setStepIndex((i) => i + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      advance();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || null,
      service: services.join(', '),
      message: message.trim(),
      best_day_to_call: days.join(', '),
      best_time_to_reach: times.join(', '),
    };

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/submit-contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || `Error ${res.status}`);
      }

      setLoading(false);
      onClose();
      navigate('/thank-you');
    } catch (err) {
      console.error('Submit error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
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

        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-sky-400 transition-all duration-300"
            style={{ width: `${((stepIndex + 1) / STEP_ORDER.length) * 100}%` }}
          />
        </div>

        <div className="p-8 pt-10">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm break-words">
              {error}
            </div>
          )}

          <div className="space-y-5">
            {step === 'nameEmail' && (
              <>
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-2">What is your name?</label>
                  <input ref={nameRef} type="text" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={handleKeyDown} placeholder="Your full name" className={inputClass} />
                </div>
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-2">What is your email?</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown} placeholder="your@email.com" className={inputClass} />
                </div>
              </>
            )}

            {step === 'phoneService' && (
              <>
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-2">Phone number <span className="text-gray-400 font-normal text-sm">(optional)</span></label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} onKeyDown={handleKeyDown} placeholder="(765) 430-2200" className={inputClass} />
                </div>
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-2">Which services are you interested in?</label>
                  <CheckboxGroup options={SERVICES} selected={services} onChange={setServices} columns={2} />
                </div>
              </>
            )}

            {step === 'schedule' && (
              <>
                <div className="mb-1">
                  <p className="text-base font-semibold text-sky-600">We work around your schedule.</p>
                  <p className="text-sm text-gray-500">Let us know when it's easiest to reach you — we'll adapt to fit your availability.</p>
                </div>
                <div>
                  <label className="block text-base font-bold text-gray-900 mb-2">Best day(s) to call</label>
                  <select
                    multiple
                    value={days}
                    onChange={(e) => setDays(Array.from(e.target.selectedOptions, (o) => o.value))}
                    className="w-full border-2 border-gray-200 rounded-xl outline-none text-base transition focus:ring-2 focus:ring-sky-400 focus:border-sky-400 px-3 py-1"
                    size={5}
                  >
                    {DAYS.map((d) => (
                      <option key={d} value={d} className="py-1.5 px-2 rounded cursor-pointer">{d}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-400 mt-1">Hold Ctrl / Cmd to select multiple</p>
                </div>
                <div>
                  <label className="block text-base font-bold text-gray-900 mb-2">Best time(s) to reach you</label>
                  <select
                    multiple
                    value={times}
                    onChange={(e) => setTimes(Array.from(e.target.selectedOptions, (o) => o.value))}
                    className="w-full border-2 border-gray-200 rounded-xl outline-none text-base transition focus:ring-2 focus:ring-sky-400 focus:border-sky-400 px-3 py-1"
                    size={5}
                  >
                    {TIMES.map((t) => (
                      <option key={t} value={t} className="py-1.5 px-2 rounded cursor-pointer">{t}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-400 mt-1">Hold Ctrl / Cmd to select multiple</p>
                </div>
              </>
            )}

            {step === 'message' && (
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-2">Tell us about your project</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Brief description of the work you need done..." rows={4} className={`${inputClass} resize-none`} />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-6">
            {stepIndex > 0 ? (
              <button onClick={() => setStepIndex((i) => i - 1)} className="text-sm text-gray-500 hover:text-gray-700 transition">
                Back
              </button>
            ) : <span />}

            <button
              onClick={advance}
              disabled={!canAdvance || loading}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
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

          <p className="text-xs text-gray-400 mt-3 text-right">
            Step {stepIndex + 1} of {STEP_ORDER.length}
          </p>
        </div>
      </div>
    </div>
  );
}
