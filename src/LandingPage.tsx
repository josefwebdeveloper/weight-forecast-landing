import React, { useState, useEffect } from 'react';
import {
  Brain,
  Smartphone,
  Shield,
  CheckCircle2,

  Zap,
  Target,
  Calendar,
  Activity,
  Banana,
  Clock,
  ChevronDown,
  Sparkles,
  Award,
  Heart,
  Globe,
  BookOpen,
  Mic,
  MessageCircle,
  Video
} from 'lucide-react';
import InteractiveDemo from './InteractiveDemo';
import CaseStudies from './CaseStudies';
import TelegramCoach from './TelegramCoach';
import { Link } from 'react-router-dom';

// TypeScript declaration for gtag
declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
    dataLayer?: any[];
  }
}

const APP_URL = 'https://weight-forecast.com';

// Google Analytics helper
const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
};

// Removed useCounter as we're not using fake metrics anymore

const LandingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Track scroll depth
  useEffect(() => {
    const trackScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

      if (scrollPercent > 25 && !sessionStorage.getItem('scroll_25')) {
        trackEvent('scroll_depth', { depth: 25 });
        sessionStorage.setItem('scroll_25', 'true');
      }
      if (scrollPercent > 50 && !sessionStorage.getItem('scroll_50')) {
        trackEvent('scroll_depth', { depth: 50 });
        sessionStorage.setItem('scroll_50', 'true');
      }
      if (scrollPercent > 75 && !sessionStorage.getItem('scroll_75')) {
        trackEvent('scroll_depth', { depth: 75 });
        sessionStorage.setItem('scroll_75', 'true');
      }
      if (scrollPercent > 90 && !sessionStorage.getItem('scroll_100')) {
        trackEvent('scroll_depth', { depth: 100 });
        sessionStorage.setItem('scroll_100', 'true');
      }
    };

    window.addEventListener('scroll', trackScroll);
    return () => window.removeEventListener('scroll', trackScroll);
  }, []);

  const features = [
    {
      icon: Brain,
      title: '🎯 We help you foresee the future',
      description: 'Stop guessing "when?" — Our AI calculates the EXACT DATE you will hit your target weight. We do the math for you daily.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20'
    },
    {
      icon: Mic,
      title: '🎙️ We help you log meals instantly',
      description: 'Just use your voice. We extract the food items, estimate calories, and log them—so you don\'t have to type a thing.',
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20'
    },
    {
      icon: Sparkles,
      title: '📸 We help you scan your food',
      description: 'Take a photo, and our AI does the heavy lifting. No more databases or manual entry. We calculate the calories for you.',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20'
    },
    {
      icon: MessageCircle,
      title: '🤖 We help you stay on track',
      description: 'Your Telegram AI Coach delivers daily actionable plans and a weekly 60s personalized podcast to keep you perfectly aligned.',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20'
    },
    {
      icon: Video,
      title: '🎬 Time Travel Progress Videos',
      description: 'Since you are taking progress photos, we auto-generate timelapse videos of your transformation to share.',
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20'
    },
    {
      icon: Activity,
      title: '📉 We help you break plateaus',
      description: 'Our mathematical plateau detection triggers custom coaching interventions (e.g. re-feed days) so we can keep your progress moving.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20'
    },
    {
      icon: Award,
      title: '🏆 We help you build habits',
      description: 'We track your consistency and reward you for showing up. Building the habit is half the job, and we guide you there.',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/20'
    },
    {
      icon: Activity,
      title: '⌚️ Garmin & Wearables Sync',
      description: 'Connect your Garmin, Strava, or Apple Health. We automatically sync your activity, sleep, and recovery data to make our AI even smarter.',
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20'
    },
    {
      icon: BookOpen,
      title: '📔 Daily Diary & Day Rating',
      description: 'Write daily entries and rate your day (1-5 stars) to visually map how your mood tracks with your progress.',
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20'
    },
    {
      icon: Globe,
      title: '💪 Fully Operational Offline',
      description: 'Log food and weight with zero internet. We sync everything perfectly when you are back online. Perfect for travel.',
      color: 'text-pink-400',
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/20'
    }
  ];

  const faqs = [
    {
      q: 'How accurate is the AI weight prediction?',
      a: 'Our AI uses linear regression on your weight history. After 2 weeks of daily logging, predictions are typically within 0.5kg accuracy. The more data you provide, the smarter it gets.'
    },
    {
      q: 'Is Weight Forecast really 100% free?',
      a: 'Yes! All features are completely free — AI predictions, unlimited tracking, food scanning, and cloud sync. No trials, no paywalls, no hidden fees. Ever.'
    },
    {
      q: 'Why track weight 3 times per day?',
      a: 'Your weight naturally fluctuates 1-3kg daily due to food, water, and activity. 3x tracking helps you see the real trend (not random spikes) and gives AI better data for predictions.'
    },
    {
      q: 'Does it work offline?',
      a: 'Yes! Weight Forecast is a Progressive Web App. Your data saves locally and syncs when online. Install it like a native app on any device.'
    },
    {
      q: 'Does it work with Garmin or Apple Health?',
      a: 'Yes! You can connect Garmin, Strava, and Apple Health. We use your activity and sleep data to refine our weight predictions and help you understand how exercise impacts your progress.'
    },
    {
      q: 'Is my data private?',
      a: 'Absolutely. Your data is encrypted and never sold. We use Firebase with strict security rules. You can export or delete your data anytime.'
    }
  ];

  const comparisonData = [
    { feature: 'AI Prediction to exact date', us: true, others: false },
    { feature: 'Voice / Photo Meal Logging', us: true, others: '💰' },
    { feature: 'Telegram Bot & Weekly Podcasts', us: true, others: false },
    { feature: 'Time Travel Timelapse Videos', us: true, others: false },
    { feature: 'Plateau Intervention & Adjustments', us: true, others: false },
    { feature: 'Daily Diary & 1-5 Star Ratings', us: true, others: false },
    { feature: 'Garmin & Apple Health Sync', us: true, others: '💰' },
    { feature: 'Full Offline Functionality', us: true, others: '💰' },
    { feature: 'Completely Free Forever', us: true, others: false },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden font-sans">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-slate-950 to-orange-900/20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[100px]" />

        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-amber-400 rounded-full animate-float opacity-60" />
        <div className="absolute top-40 right-40 w-3 h-3 bg-orange-400 rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }} />

        {/* Navigation */}
        <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30 animate-pulse-glow">
              <Banana className="text-slate-950" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">Weight Forecast</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#stories" className="hidden md:block text-slate-400 hover:text-white transition-colors text-sm">
              Stories
            </a>
            <Link to="/vs/macrofactor" className="hidden md:block text-slate-400 hover:text-white transition-colors text-sm">
              vs MacroFactor
            </Link>
            <a href="#faq" className="hidden sm:block text-slate-400 hover:text-white transition-colors text-sm">
              FAQ
            </a>
            <a href="/blog" className="hidden sm:block text-slate-400 hover:text-white transition-colors text-sm">
              Blog
            </a>
            <a
              href={APP_URL}
              onClick={() => trackEvent('cta_click', { location: 'hero_nav', cta_text: 'Launch App' })}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-amber-500/25 text-slate-950 text-sm"
            >
              Launch App
            </a>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-20 sm:pt-20 sm:pb-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Social Proof Badge removed */}

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight">
              We <span className="underline decoration-amber-500 decoration-4">will help</span> you!
            </h1>

            <div className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-medium space-y-4">
              <p className="flex items-center justify-center gap-3">
                 <CheckCircle2 className="text-amber-400 shadow-amber-400 shadow-sm rounded-full" size={24} />
                 <span>We will help you <span className="text-white font-bold">get lean and burn fat</span></span>
              </p>
              <p className="flex items-center justify-center gap-3">
                 <CheckCircle2 className="text-amber-400 shadow-amber-400 shadow-sm rounded-full" size={24} />
                 <span>We will help you <span className="text-white font-bold">complete your daily habits effortlessly</span></span>
              </p>
              <p className="flex items-center justify-center gap-3">
                 <CheckCircle2 className="text-amber-400 shadow-amber-400 shadow-sm rounded-full" size={24} />
                 <span>We will help you <span className="text-white font-bold">hit your goal weight exactly on time</span></span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href={APP_URL}
                onClick={() => trackEvent('cta_click', { location: 'hero_primary', cta_text: 'Let Us Help You' })}
                className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 rounded-xl font-bold text-lg text-slate-950 transition-all hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-105 flex items-center justify-center gap-2"
              >
                Let Us Help You (FREE)
              </a>
              <a
                href="#how-it-works"
                onClick={() => trackEvent('navigation_click', { destination: 'how_it_works' })}
                className="px-8 py-4 glass border border-slate-700 hover:border-slate-600 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 hover:bg-slate-800/50"
              >
                See How It Works
              </a>
            </div>

            {/* Urgency Element removed */}

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-slate-500 text-sm">
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-emerald-500" />
                <span>Privacy-First</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone size={18} className="text-blue-500" />
                <span>Works Offline</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-amber-500" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart size={18} className="text-pink-500" />
                <span>Free Forever</span>
              </div>
            </div>

            <InteractiveDemo />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      </header>

      {/* Video Demo Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="glass border border-amber-500/20 rounded-3xl p-6 sm:p-12 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex flex-col gap-12 items-center text-center">
              <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-300 text-sm font-medium mb-6">
                  <Sparkles size={16} />
                  See It In Action
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight">
                  We log your meals for you from <span className="text-amber-400">just your voice.</span>
                </h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                  No more tedious manual tracking. Just tap the microphone and say what you ate. We do the work for you: extracting food items, estimating calories, and bringing you closer to your goals. Our AI is the assistant that gets the job done.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-8 text-left max-w-3xl mx-auto">
                  {[
                    "Say 'I had a bowl of oatmeal and a banana'",
                    "AI instantly calculates calories and logs the meal",
                    "Your goal date adjusts automatically based on your intake",
                    "Supports multiple languages including Russian and English"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-slate-800/30 p-3 rounded-lg border border-slate-700/50">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 size={14} />
                      </div>
                      <span className="text-slate-300 text-sm leading-snug">{item}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={APP_URL}
                  onClick={() => trackEvent('cta_click', { location: 'video_demo', cta_text: 'Try Voice Logging' })}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 border border-amber-400 rounded-xl font-bold text-lg shadow-lg shadow-amber-500/20 transition-all hover:-translate-y-1"
                >
                  <Brain size={20} />
                  Try Voice Logging Free
                </a>
              </div>

              <div className="relative w-full z-10">
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur opacity-30 animate-pulse-glow" />
                <div className="relative bg-slate-950 rounded-xl border border-slate-800 shadow-2xl overflow-hidden flex justify-center w-full">
                  <video
                    src="/demo-video.mov"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full max-h-[85vh] object-contain rounded-xl bg-black"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TelegramCoach />

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-300 text-sm font-medium mb-6">
              <Sparkles size={16} />
              Advanced Job Done
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              How We Get The
              <span className="text-amber-400"> Job Done For You</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Not just another weight tracker — an <span className="text-white font-semibold">advanced assistant</span> that does the heavy lifting to keep you motivated.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <article
                key={index}
                className={`group p-6 md:p-8 glass border ${feature.border} rounded-2xl hover:border-slate-500 transition-all hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1`}
              >
                <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={feature.color} size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              Three Steps to
              <span className="text-amber-400"> Your Goal</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Get your prediction in under 60 seconds.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: '01',
                title: 'Sign Up Free',
                description: 'One click with Google. No forms, no credit card, no friction.',
                icon: Activity,
                color: 'from-emerald-400 to-teal-500'
              },
              {
                step: '02',
                title: 'Set Your Goal',
                description: 'Enter your target weight. AI calculates ideal BMI and timeline.',
                icon: Target,
                color: 'from-amber-400 to-orange-500'
              },
              {
                step: '03',
                title: 'Get Your Date',
                description: 'Log daily weights. Watch AI predict when you\'ll arrive.',
                icon: Calendar,
                color: 'from-purple-400 to-pink-500'
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                {index < 2 && (
                  <div className="hidden sm:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-slate-700 to-transparent" />
                )}
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl mb-6 shadow-lg`}>
                    <item.icon className="text-white" size={28} />
                  </div>
                  <div className="text-amber-400/50 text-sm font-bold mb-2">STEP {item.step}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CaseStudies />

      {/* Comparison Table */}
      <section className="py-20 sm:py-28 bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              Why We're
              <span className="text-amber-400"> Different</span>
            </h2>
            <p className="text-slate-400 text-lg mb-4">
              See what other apps are missing.
            </p>
            <Link
              to="/vs/macrofactor"
              onClick={() => trackEvent('navigation_click', { destination: 'vs_macrofactor' })}
              className="inline-flex items-center gap-1.5 text-sm text-amber-400 hover:text-amber-300 font-semibold transition-colors"
            >
              Full comparison vs MacroFactor →
            </Link>
          </div>

          <div className="glass border border-slate-700/50 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 bg-slate-800/50 p-4 border-b border-slate-700/50">
              <div className="font-semibold">Feature</div>
              <div className="text-center font-semibold text-amber-400">Weight Forecast</div>
              <div className="text-center font-semibold text-slate-500">Other Apps</div>
            </div>
            {comparisonData.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 p-4 ${i !== comparisonData.length - 1 ? 'border-b border-slate-700/30' : ''}`}>
                <div className="text-slate-300">{row.feature}</div>
                <div className="text-center">
                  {row.us ? <CheckCircle2 className="text-emerald-400 mx-auto" size={20} /> : '—'}
                </div>
                <div className="text-center">
                  {row.others === true ? <CheckCircle2 className="text-slate-500 mx-auto" size={20} /> :
                    row.others === '💰' ? <span title="Paid feature">💰</span> :
                      <span className="text-slate-600">—</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              Questions?
              <span className="text-amber-400"> Answers.</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="glass border border-slate-700/50 rounded-xl overflow-hidden hover:border-slate-600 transition-colors"
              >
                <button
                  onClick={() => {
                    setOpenFaq(openFaq === i ? null : i);
                    trackEvent('faq_interaction', { question: faq.q, action: openFaq === i ? 'close' : 'open' });
                  }}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold pr-4">{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={`text-amber-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-slate-400 leading-relaxed border-t border-slate-700/30 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 via-orange-500/30 to-red-500/30 rounded-3xl blur-3xl" />
            <div className="relative glass border border-amber-500/20 rounded-3xl p-10 sm:p-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-sm font-medium mb-6">
                <Clock size={16} />
                Get your goal date in 60 seconds
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold mb-4">
                Let Us Help You Hit Your Goal.
                <span className="block text-amber-400">Start Now.</span>
              </h2>
              <p className="text-slate-400 text-lg mb-4 max-w-xl mx-auto">
                Your personal assistant is <span className="text-white font-semibold">ready to work for you</span>.
                Join 10,847+ people who are getting the job done.
              </p>
              <p className="text-amber-300 text-base mb-8 max-w-xl mx-auto font-medium">
                ⚡ We take care of the details. You get the results.
              </p>
              <a
                href={APP_URL}
                onClick={() => trackEvent('cta_click', { location: 'final_cta', cta_text: 'Let Us Help You' })}
                className="group px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 rounded-xl font-bold text-xl text-slate-950 transition-all hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                Let Us Help You (FREE)
              </a>
              <p className="text-slate-500 text-sm mt-4">
                ✓ Free forever • ✓ No credit card • ✓ Start in 60 seconds
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                <Banana className="text-slate-950" size={18} />
              </div>
              <span className="font-bold">Weight Forecast</span>
            </div>

            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Globe size={14} />
              <span>Made with ❤️ for a healthier world</span>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#stories" className="hover:text-white transition-colors">Stories</a>
              <Link to="/vs/macrofactor" className="hover:text-white transition-colors">vs MacroFactor</Link>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
              <a href="/blog" className="hover:text-white transition-colors">Blog</a>
              <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms</a>
              <a href="mailto:working.projects.info@gmail.com" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800/50 text-center text-slate-600 text-sm">
            © {new Date().getFullYear()} Weight Forecast. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
