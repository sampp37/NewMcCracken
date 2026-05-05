import { useState, useRef, useEffect } from 'react';
import { ChevronRight, X, Check } from 'lucide-react';

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

    if (!navigator.onLine) {
      setError('You appear to be offline. Please check your internet connection and try again.');
      setLoading(false);
      return;
    }

    const SUPABASE_URL = 'https://zroehayusudopemhfdgi.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyb2VoYXl1c3Vkb3BlbWhmZGdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1MjEzODgsImV4cCI6MjA3MjA5NzM4OH0.-AnaNIPhE5w1OSbcR-pZIE6LS1VvDrDhahdMcrTJUQQ';

    const insertToSupabase = async (data: object) => {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || body.error || `Server returned ${res.status}`);
      }
    };

    try {
      try {
        await insertToSupabase(payload);
      } catch (colErr) {
        const msg = colErr instanceof Error ? colErr.message : String(colErr);
        if (msg.includes('best_day_to_call') || msg.includes('best_time_to_reach') || msg.includes('schema cache')) {
          // columns don't exist yet — embed scheduling info in message
          const fallbackPayload = {
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            service: payload.service,
            message: `${payload.message}\n\nBest day(s): ${payload.best_day_to_call}\nBest time(s): ${payload.best_time_to_reach}`,
          };
          await insertToSupabase(fallbackPayload);
        } else {
          throw colErr;
        }
      }

      setLoading(false);
      onClose();
      window.location.href = '/formsubmitted';
      return;
    } catch (err) {
      const errName = err instanceof Error ? err.name : 'Error';
      const errMsg = err instanceof Error ? err.message : String(err);
      const isFetchFail = errName === 'TypeError' && /fetch/i.test(errMsg);

      if (isFetchFail) {
        const mailLines = [
          `Name: ${payload.name}`,
          `Email: ${payload.email}`,
          `Phone: ${payload.phone ?? '-'}`,
          `Service: ${payload.service}`,
          `Best Day: ${payload.best_day_to_call}`,
          `Best Time: ${payload.best_time_to_reach}`,
          '',
          'Message:',
          payload.message,
        ].join('\n');
        const mailto = `mailto:sampp37@gmail.com?subject=${encodeURIComponent(`Quote Request from ${payload.name}`)}&body=${encodeURIComponent(mailLines)}`;
        setError(`BLOCKED|||${mailto}`);
      } else {
        setError(`${errMsg}`);
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

        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-sky-400 transition-all duration-300"
            style={{ width: `${((stepIndex + 1) / STEP_ORDER.length) * 100}%` }}
          />
        </div>

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
