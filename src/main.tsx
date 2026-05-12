import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import App from './App.tsx';
import ThankYou from './ThankYou.tsx';
import FormSubmitted from './FormSubmitted.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/formsubmitted" element={<FormSubmitted />} />
      </Routes>
      <SpeedInsights />
    </BrowserRouter>
  </StrictMode>
);
