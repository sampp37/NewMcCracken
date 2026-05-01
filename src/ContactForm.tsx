import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const TIME_OPTIONS = ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

interface ContactFormProps {
  fieldPrefix?: string;
  onSuccess?: () => void;
}

export default function ContactForm({ fieldPrefix = '', onSuccess }: ContactFormProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');

  const p = (name: string) => fieldPrefix ? `${fieldPrefix}-${name}` : name;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get(p('name')) as string;
    const email = formData.get(p('email')) as string;
    const phone = formData.get(p('phone')) as string;
    const service = formData.get(p('service')) as string;
    const message = formData.get(p('message')) as string;
    const best_day_to_call = formData.get(p('best_day_to_call')) as string;
    const best_time_to_reach = selectedTime;

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
      if (onSuccess) onSuccess();
      navigate('/thank-you');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'There was an error submitting your request. Please try again.';
      console.error('Error submitting form:', err);
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-5 leading-relaxed">
        We'll call you at your preferred time, no pressure, no obligation. Let's just talk about your project.
      </p>

      {error && (
        <div className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name={p('name')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name={p('email')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="your@email.com"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              name={p('phone')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="(765) 430-2200"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Service</label>
            <select
              name={p('service')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              required
            >
              <option value="">Select a service</option>
              <option value="Interior Painting">Interior Painting</option>
              <option value="Exterior Painting">Exterior Painting</option>
              <option value="Power Washing">Power Washing</option>
              <option value="Epoxy Floor">Epoxy Floor</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Best Day To Call</label>
          <select
            name={p('best_day_to_call')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            required
          >
            <option value="">Select a day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Best Time To Reach You</label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            required
          >
            <option value="">Select a time</option>
            {TIME_OPTIONS.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Simple Project Description</label>
          <textarea
            rows={3}
            name={p('message')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Tell us about your project..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition text-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
