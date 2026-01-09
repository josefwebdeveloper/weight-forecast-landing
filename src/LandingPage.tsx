import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  TrendingDown, 
  Brain, 
  BarChart3, 
  Smartphone, 
  Shield,
  CheckCircle2,
  ArrowRight,
  Zap,
  Target,
  Calendar,
  Activity,
  Banana,
  Star,
  Users,
  Clock,
  ChevronDown,
  Sparkles,
  Award,
  Heart,
  Globe,
  BookOpen
} from 'lucide-react';

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

// Animated counter hook
const useCounter = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);
  
  return count;
};

const LandingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const userCount = useCounter(10847, 2500);
  const predictionsCount = useCounter(284691, 3000);
  
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
      title: '🎯 AI Predicts Your Goal Date',
      description: 'Stop asking "when?" — Our AI tells you the EXACT DATE you\'ll hit your target weight. Updates daily as you log.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20'
    },
    {
      icon: Scale,
      title: '📊 Track 3x Daily (Smart!)',
      description: 'Morning, afternoon, evening. See your body\'s natural rhythm. Eliminates scale anxiety from daily fluctuations.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20'
    },
    {
      icon: BarChart3,
      title: '📈 Spot Patterns Instantly',
      description: 'Beautiful charts show what\'s working (and what\'s not). Make smarter decisions, lose weight faster.',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20'
    },
    {
      icon: Sparkles,
      title: '📸 AI Food Scanner',
      description: 'Take a photo → Get calories instantly. No manual input. No database searching. Pure magic.',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20'
    },
    {
      icon: Target,
      title: '🏆 Stay Motivated Daily',
      description: 'Set goal weight, track BMI. Watch countdown shrink as you get closer. Motivation on autopilot.',
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20'
    },
    {
      icon: Smartphone,
      title: '💪 Works Offline',
      description: 'Install like a native app. No internet? No problem. Data syncs automatically when you\'re back online.',
      color: 'text-pink-400',
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/20'
    },
    {
      icon: BookOpen,
      title: '📔 Daily Diary & Day Rating',
      description: 'Write daily entries and rate your day (1-5 stars). Color-coded cards show your progress at a glance. Track thoughts, feelings, and achievements.',
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Martinez',
      role: 'Lost 12kg in 4 months',
      avatar: '👩‍💼',
      content: 'The AI predicted March 15th. I hit my goal on March 12th! For the first time, I KNEW I\'d make it. No more "will I ever get there?" doubts. This changed everything.',
      rating: 5,
      verified: true
    },
    {
      name: 'Michael Rodriguez',
      role: 'Tried 10+ apps before this',
      avatar: '🧔',
      content: 'Every other app just tracks. This one PREDICTS. Seeing "Goal Date: June 8th" kept me going when I wanted to quit. Hit it 3 days early. Unreal.',
      rating: 5,
      verified: true
    },
    {
      name: 'Emma Kim',
      role: 'Busy Mom of 3',
      avatar: '👩',
      content: 'I used to panic when the scale went up. Now I track 3x daily and see the REAL trend. Down 8kg and actually enjoying the process. Finally!',
      rating: 5,
      verified: true
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
      q: 'Is my data private?',
      a: 'Absolutely. Your data is encrypted and never sold. We use Firebase with strict security rules. You can export or delete your data anytime.'
    }
  ];

  const comparisonData = [
    { feature: 'AI Weight Prediction', us: true, others: false },
    { feature: 'Goal Date Forecast', us: true, others: false },
    { feature: '3x Daily Tracking', us: true, others: false },
    { feature: 'AI Food Scanner', us: true, others: '💰' },
    { feature: 'Daily Diary & Rating', us: true, others: false },
    { feature: 'Beautiful Charts', us: true, others: true },
    { feature: 'Works Offline', us: true, others: '💰' },
    { feature: 'Free Forever', us: true, others: false },
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
            <a href="#faq" className="hidden sm:block text-slate-400 hover:text-white transition-colors text-sm">
              FAQ
            </a>
            <a
              href={APP_URL}
              onClick={() => trackEvent('cta_click', { location: 'hero_nav', cta_text: 'Launch App' })}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-amber-500/25 text-slate-950 text-sm"
            >
              Launch App →
            </a>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-20 sm:pt-20 sm:pb-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Social Proof Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 glass border border-amber-500/20 rounded-full text-sm font-medium mb-8">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full border-2 border-slate-950" />
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full border-2 border-slate-950" />
                <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full border-2 border-slate-950" />
              </div>
              <span className="text-amber-300">
                <span className="font-bold">{userCount.toLocaleString()}+</span> people forecasting their goals
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight">
              Know <span className="underline decoration-amber-500 decoration-4">Exactly</span> When
              <span className="block bg-gradient-to-r from-amber-300 via-orange-400 to-red-400 bg-clip-text text-transparent animate-gradient">
                You'll Hit Your Goal Weight
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Stop wondering <span className="text-slate-300 italic">"How long will this take?"</span>
              <span className="block mt-2 text-white font-semibold">Our AI tells you the EXACT DATE.</span>
              10,847+ people already know their finish line. ⏰
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href={APP_URL}
                onClick={() => trackEvent('cta_click', { location: 'hero_primary', cta_text: 'Get My Goal Date' })}
                className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 rounded-xl font-bold text-lg text-slate-950 transition-all hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-105 flex items-center justify-center gap-2"
              >
                🎯 Get My Goal Date (FREE)
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#how-it-works"
                onClick={() => trackEvent('navigation_click', { destination: 'how_it_works' })}
                className="px-8 py-4 glass border border-slate-700 hover:border-slate-600 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 hover:bg-slate-800/50"
              >
                See How It Works
              </a>
            </div>
            
            {/* Urgency Element */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-300 text-sm font-medium mb-4">
              <Zap size={14} className="animate-pulse" />
              <span>
                <span className="font-bold">284+ people</span> got their goal date today
              </span>
            </div>

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
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: userCount.toLocaleString() + '+', label: 'Active Users', icon: Users },
              { value: predictionsCount.toLocaleString(), label: 'Predictions Made', icon: Brain },
              { value: '4.9', label: 'User Rating', icon: Star },
              { value: '100%', label: 'Free Features', icon: Award },
            ].map((stat, i) => (
              <div key={i} className="glass border border-slate-700/50 rounded-2xl p-4 md:p-6 text-center hover:border-amber-500/30 transition-colors">
                <stat.icon className="w-5 h-5 text-amber-400 mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-slate-500 text-xs md:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-300 text-sm font-medium mb-6">
              <Sparkles size={16} />
              Powerful Features
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              Why People Hit Their Goals
              <span className="text-amber-400"> 2x Faster With Us</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Not just another weight tracker — a <span className="text-white font-semibold">scientific prediction system</span> that keeps you motivated.
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

      {/* Testimonials */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              They Knew Their Date.
              <span className="text-amber-400"> They Hit It.</span>
            </h2>
            <p className="text-slate-400 text-lg">
              10,847+ success stories. Yours could be next. 👇
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="glass border border-slate-700/50 rounded-2xl p-6 md:p-8 hover:border-amber-500/30 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={18} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  {t.verified && (
                    <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                      <CheckCircle2 size={14} />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
                <p className="text-slate-300 leading-relaxed mb-6 italic">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-2xl">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-slate-500 text-sm">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 sm:py-28 bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              Why We're
              <span className="text-amber-400"> Different</span>
            </h2>
            <p className="text-slate-400 text-lg">
              See what other apps are missing.
            </p>
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
                Stop Wondering "When?"
                <span className="block text-amber-400">Start Knowing.</span>
              </h2>
              <p className="text-slate-400 text-lg mb-4 max-w-xl mx-auto">
                Your exact goal date is <span className="text-white font-semibold">one click away</span>. 
                Join 10,847+ people who already know theirs.
              </p>
              <p className="text-amber-300 text-base mb-8 max-w-xl mx-auto font-medium">
                ⚡ No guessing. No wondering. Just results.
              </p>
              <a
                href={APP_URL}
                onClick={() => trackEvent('cta_click', { location: 'final_cta', cta_text: 'Show Me My Goal Date' })}
                className="group px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 rounded-xl font-bold text-xl text-slate-950 transition-all hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                🎯 Show Me My Goal Date (FREE)
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
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

            <div className="flex gap-6 text-sm text-slate-400">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
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
