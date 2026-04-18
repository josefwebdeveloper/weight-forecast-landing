import React from 'react';
import { Link } from 'react-router-dom';
import {
  Banana,
  Check,
  X,
  DollarSign,
  Sparkles,
  Mic,
  Brain,
  MessageCircle,
  Headphones,
  Globe,
  Wifi,
  Video,
  Shield,
  ArrowRight,
} from 'lucide-react';

const APP_URL = 'https://weight-forecast.com';

const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
};

type Cell = true | false | 'paid' | string;

interface Row {
  feature: string;
  us: Cell;
  them: Cell;
  note?: string;
}

const rows: Row[] = [
  { feature: 'Exact AI-predicted goal date', us: true, them: false, note: 'Unique to Weight Forecast' },
  { feature: 'Voice meal logging', us: true, them: false },
  { feature: 'Photo meal scanning (AI)', us: true, them: 'paid', note: 'Free in WF, premium in MF' },
  { feature: 'Telegram AI coach', us: true, them: false },
  { feature: 'Weekly personalized audio podcast', us: true, them: false },
  { feature: 'Time-travel timelapse videos', us: true, them: false },
  { feature: 'Plateau detection + re-feed coaching', us: true, them: 'paid' },
  { feature: 'Russian language support', us: true, them: false },
  { feature: 'Garmin / Strava / Apple Health sync', us: true, them: 'paid' },
  { feature: 'Full offline PWA', us: true, them: false, note: 'MacroFactor is native-only' },
  { feature: 'Works without app store install', us: true, them: false },
  { feature: 'Macro & protein tracking', us: true, them: true },
  { feature: 'Expenditure (TDEE) adaptation', us: true, them: true },
  { feature: 'Food database with barcode scan', us: 'Coming soon', them: true },
  { feature: 'Workouts app / strength tracking', us: false, them: true, note: 'MF has a separate workouts app' },
  { feature: 'Price', us: '$0 forever', them: '~$71.99/yr', note: 'MF is subscription-only' },
];

const CellRenderer: React.FC<{ value: Cell; positive?: boolean }> = ({ value, positive }) => {
  if (value === true) {
    return (
      <div className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${positive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-700/50 text-slate-300'}`}>
        <Check size={16} strokeWidth={3} />
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-800/60 text-slate-600">
        <X size={16} strokeWidth={2.5} />
      </div>
    );
  }
  if (value === 'paid') {
    return (
      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
        <DollarSign size={10} /> Premium
      </div>
    );
  }
  return <span className="text-sm font-semibold text-slate-200">{value}</span>;
};

const killers = [
  {
    icon: Brain,
    title: 'Forecast your exact goal date',
    text: 'MacroFactor tells you what to eat today. Weight Forecast tells you the exact date you will hit your target weight — and updates it daily.',
    accent: 'from-amber-400 to-orange-500',
  },
  {
    icon: Mic,
    title: 'Voice logging that actually works',
    text: 'Say what you ate in Russian or English, in one sentence. No scrolling through databases, no portion pickers.',
    accent: 'from-red-400 to-pink-500',
  },
  {
    icon: MessageCircle,
    title: 'Telegram coach + weekly podcast',
    text: 'Your AI lives in Telegram. Daily nudges, voice-note logging, and a 60-second personalized audio recap every Monday.',
    accent: 'from-blue-400 to-cyan-500',
  },
  {
    icon: DollarSign,
    title: 'Free. Forever.',
    text: "MacroFactor is ~$11.99/mo. Weight Forecast is $0 — all AI features included. We're funded by believing in a healthier web, not subscriptions.",
    accent: 'from-emerald-400 to-teal-500',
  },
];

const whenMacroFactor = [
  {
    icon: Video,
    title: 'You want a dedicated workouts app',
    text: 'MacroFactor ships a separate strength-training tracker. If that is your main need, it is a solid pick.',
  },
  {
    icon: Globe,
    title: 'You live in the US/UK/EU ecosystem exclusively',
    text: 'MacroFactor is English-only and native iOS/Android — no PWA, no offline-first web, no Russian.',
  },
  {
    icon: Headphones,
    title: 'You love reading their deep-dive articles',
    text: 'Their content library and Knowledge Base is excellent. We are catching up — see /blog.',
  },
];

const VsMacroFactor: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans overflow-x-hidden">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between border-b border-slate-800">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Banana className="text-slate-950" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">Weight Forecast</span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link to="/" className="text-slate-400 hover:text-white transition-colors hidden sm:block">
            Home
          </Link>
          <Link to="/blog" className="text-slate-400 hover:text-white transition-colors hidden sm:block">
            Blog
          </Link>
          <a
            href={APP_URL}
            onClick={() => trackEvent('cta_click', { location: 'vs_nav', cta_text: 'Launch App' })}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 rounded-lg font-semibold transition-all text-slate-950"
          >
            Launch App
          </a>
        </div>
      </nav>

      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-slate-950 to-blue-900/20 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-300 text-sm font-medium mb-6">
            <Sparkles size={16} />
            Honest comparison · updated 2026
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6">
            Weight Forecast <span className="text-slate-500 font-light">vs</span>{' '}
            <span className="text-amber-400">MacroFactor</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            MacroFactor is a great premium macro tracker. Weight Forecast is a free AI-first weight
            coach that predicts the exact date you'll hit your goal. Here's the full, unvarnished comparison.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={APP_URL}
              onClick={() => trackEvent('cta_click', { location: 'vs_hero', cta_text: 'Try Weight Forecast Free' })}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 rounded-xl font-bold text-lg text-slate-950 transition-all hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              Try Weight Forecast Free <ArrowRight size={18} />
            </a>
            <a
              href="#comparison-table"
              className="px-8 py-4 glass border border-slate-700 hover:border-slate-600 rounded-xl font-semibold text-lg transition-all"
            >
              Jump to full table
            </a>
          </div>
        </div>
      </header>

      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              4 things you get in Weight Forecast
              <span className="block text-amber-400">that MacroFactor doesn't ship</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {killers.map((k, i) => (
              <article
                key={i}
                className="glass border border-slate-700/60 rounded-2xl p-6 sm:p-7 hover:border-amber-500/30 transition-colors"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${k.accent} flex items-center justify-center mb-4 shadow-lg`}
                >
                  <k.icon className="text-white" size={22} />
                </div>
                <h3 className="text-xl font-bold mb-2">{k.title}</h3>
                <p className="text-slate-400 leading-relaxed">{k.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="comparison-table" className="py-16 sm:py-20 bg-slate-900/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Full feature comparison</h2>
            <p className="text-slate-400">Every feature, side-by-side. No asterisks.</p>
          </div>

          <div className="glass border border-slate-700/60 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-[1.6fr_1fr_1fr] bg-slate-800/60 border-b border-slate-700/60">
              <div className="px-4 sm:px-6 py-4 font-bold text-sm text-slate-300 uppercase tracking-wider">
                Feature
              </div>
              <div className="px-4 py-4 text-center font-bold text-amber-400 text-sm uppercase tracking-wider">
                Weight Forecast
              </div>
              <div className="px-4 py-4 text-center font-bold text-slate-400 text-sm uppercase tracking-wider">
                MacroFactor
              </div>
            </div>
            {rows.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-[1.6fr_1fr_1fr] items-center ${i !== rows.length - 1 ? 'border-b border-slate-800' : ''} hover:bg-slate-800/20 transition-colors`}
              >
                <div className="px-4 sm:px-6 py-4">
                  <div className="text-slate-200 font-medium">{row.feature}</div>
                  {row.note && <div className="text-xs text-slate-500 mt-0.5">{row.note}</div>}
                </div>
                <div className="px-4 py-4 text-center">
                  <CellRenderer value={row.us} positive />
                </div>
                <div className="px-4 py-4 text-center">
                  <CellRenderer value={row.them} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              When you should actually pick
              <span className="text-amber-400"> MacroFactor</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We believe in honest comparisons. Here are the cases where MacroFactor might fit you better.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {whenMacroFactor.map((item, i) => (
              <div
                key={i}
                className="glass border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-700/60 flex items-center justify-center mb-4">
                  <item.icon className="text-slate-300" size={18} />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 via-orange-500/30 to-red-500/30 rounded-3xl blur-3xl" />
            <div className="relative glass border border-amber-500/20 rounded-3xl p-10 sm:p-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-sm font-medium mb-6">
                <Shield size={16} />
                Free forever · no credit card
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold mb-4">
                Try Weight Forecast
                <span className="block text-amber-400">before you pay for anything else.</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                If our free app doesn't beat your current tracker in a week, uninstall and lose
                nothing. That's our whole pitch.
              </p>
              <a
                href={APP_URL}
                onClick={() => trackEvent('cta_click', { location: 'vs_final', cta_text: 'Start Free' })}
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 rounded-xl font-bold text-xl text-slate-950 transition-all hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-105"
              >
                Start Free <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Wifi size={14} />
            <span>Weight Forecast is not affiliated with MacroFactor.</span>
          </div>
          <div className="flex gap-5">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VsMacroFactor;
