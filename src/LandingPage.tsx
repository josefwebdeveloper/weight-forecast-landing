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
  Globe
} from 'lucide-react';

const APP_URL = 'https://weight-forecast.com';

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
  
  const features = [
    {
      icon: Scale,
      title: 'Track 3x Daily',
      description: 'Log morning, afternoon & evening weights to capture your body\'s natural rhythm.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20'
    },
    {
      icon: Brain,
      title: 'AI Predictions',
      description: 'Know the exact date you\'ll reach your goal. No more guessing.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20'
    },
    {
      icon: BarChart3,
      title: 'Visual Analytics',
      description: 'Beautiful charts reveal patterns invisible to the naked eye.',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20'
    },
    {
      icon: Target,
      title: 'Goal Tracking',
      description: 'Set targets, track BMI, watch AI recalculate your goal date daily.',
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20'
    },
    {
      icon: Sparkles,
      title: 'AI Food Scanner',
      description: 'Snap a photo of your meal. AI estimates calories instantly.',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20'
    },
    {
      icon: Smartphone,
      title: 'Works Everywhere',
      description: 'PWA that works offline. Install on any device like a native app.',
      color: 'text-pink-400',
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/20'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Lost 12kg in 4 months',
      avatar: '👩‍💼',
      content: 'The AI predicted I\'d hit my goal by March 15th. I actually reached it March 12th! Knowing the date kept me motivated.',
      rating: 5
    },
    {
      name: 'Michael R.',
      role: 'Fitness Enthusiast',
      avatar: '🧔',
      content: 'I\'ve tried 10+ weight tracking apps. This is the only one that tells me WHEN I\'ll reach my goal. Game changer.',
      rating: 5
    },
    {
      name: 'Emma K.',
      role: 'Busy Mom',
      avatar: '👩',
      content: 'The 3x daily tracking helped me understand why my weight fluctuates. No more scale anxiety!',
      rating: 5
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
              Stop Guessing.
              <span className="block bg-gradient-to-r from-amber-300 via-orange-400 to-red-400 bg-clip-text text-transparent animate-gradient">
                Start Forecasting.
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Our AI doesn't just track your weight — it predicts <span className="text-white font-semibold">the exact date</span> you'll hit your goal. 
              See the finish line before you even start.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href={APP_URL}
                className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 rounded-xl font-bold text-lg text-slate-950 transition-all hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-105 flex items-center justify-center gap-2"
              >
                Start Free — No Card Needed
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#how-it-works"
                className="px-8 py-4 glass border border-slate-700 hover:border-slate-600 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 hover:bg-slate-800/50"
              >
                See How It Works
              </a>
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
              Everything You Need.
              <span className="text-amber-400"> Nothing You Don't.</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Built by weight loss enthusiasts. Designed to actually work.
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
              Real People.
              <span className="text-amber-400"> Real Results.</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Join thousands who predicted — and hit — their goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="glass border border-slate-700/50 rounded-2xl p-6 md:p-8 hover:border-amber-500/30 transition-colors">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={18} className="text-amber-400 fill-amber-400" />
                  ))}
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
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
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
                Takes less than 60 seconds
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold mb-4">
                Your Goal Date Is Waiting.
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                Stop wondering when you'll hit your target. 
                Start <span className="text-white font-semibold">knowing</span>.
              </p>
              <a
                href={APP_URL}
                className="group px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 rounded-xl font-bold text-lg text-slate-950 transition-all hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                Start Forecasting Free
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-slate-500 text-sm mt-4">
                No credit card • No spam • Cancel anytime
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
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
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
