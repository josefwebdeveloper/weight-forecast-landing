import React from 'react';
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
  Banana
} from 'lucide-react';

const APP_URL = 'https://burn-work-go.vercel.app';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Scale,
      title: 'Track Your Weight',
      description: 'Log morning, afternoon, and evening weights to understand your body\'s natural fluctuations.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10'
    },
    {
      icon: Brain,
      title: 'AI-Powered Predictions',
      description: 'Get intelligent weight forecasts and know exactly when you\'ll reach your goal.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10'
    },
    {
      icon: BarChart3,
      title: 'Visual Analytics',
      description: 'Beautiful charts showing weight trends, calorie balance, and progress over time.',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10'
    },
    {
      icon: Target,
      title: 'Goal Tracking',
      description: 'Set your target weight and BMI goals. Track progress with AI-predicted achievement dates.',
      color: 'text-orange-400',
      bg: 'bg-orange-500/10'
    },
    {
      icon: Calendar,
      title: 'Daily Logging',
      description: 'Calendar view for easy navigation. Never miss a day with intuitive data entry.',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10'
    },
    {
      icon: Smartphone,
      title: 'Works Everywhere',
      description: 'Progressive Web App that works on any device. Install it like a native app.',
      color: 'text-pink-400',
      bg: 'bg-pink-500/10'
    }
  ];

  const benefits = [
    'Track weight 3x daily for accurate trends',
    'AI calorie estimation from photos',
    'BMI calculation and monitoring',
    'Calorie intake vs burn tracking',
    'Sleep quality correlation',
    'Activity type logging',
    'Cross-device sync',
    'Privacy-focused design'
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-slate-950 to-orange-900/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-amber-500/10 rounded-full blur-3xl" />
        
        {/* Navigation */}
        <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Banana className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">Weight Forecast</span>
          </div>
          <a
            href={APP_URL}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-amber-500/25 text-slate-950"
          >
            Launch App
          </a>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-24 sm:pt-24 sm:pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-300 text-sm font-medium mb-8">
              <Zap size={16} />
              AI-Powered Weight Prediction
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Forecast Your Weight.
              <span className="block bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Achieve Your Goals.
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Don't just track—forecast. The intelligent weight prediction app that tells you exactly when you'll reach your goal weight using AI analysis.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={APP_URL}
                className="group px-8 py-4 bg-amber-500 hover:bg-amber-400 rounded-xl font-semibold text-lg text-slate-950 transition-all hover:shadow-xl hover:shadow-amber-500/25 flex items-center justify-center gap-2"
              >
                Start Forecasting Free
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#features"
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl font-semibold text-lg transition-all flex items-center justify-center"
              >
                Learn More
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-slate-500 text-sm">
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-emerald-500" />
                <span>Privacy First</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone size={18} className="text-blue-500" />
                <span>Works Offline</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-purple-500" />
                <span>No Credit Card Required</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to
              <span className="text-amber-400"> Reach Your Goals</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Powerful features designed to make weight tracking effortless and predictions accurate.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <article
                key={index}
                className="group p-6 bg-slate-800/50 border border-slate-700/50 rounded-2xl hover:border-slate-600 transition-all hover:shadow-xl hover:shadow-black/20"
              >
                <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className={feature.color} size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Why Choose <span className="text-amber-400">Weight Forecast</span>?
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Unlike other weight tracking apps, Weight Forecast uses AI to predict your future weight. 
                Know exactly when you'll reach your goal and what you need to do to get there faster.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={20} />
                    <span className="text-slate-300">{benefit}</span>
                  </div>
                ))}
              </div>

              <a
                href={APP_URL}
                className="mt-10 px-8 py-4 bg-amber-500 hover:bg-amber-400 rounded-xl font-semibold text-slate-950 transition-all hover:shadow-xl hover:shadow-amber-500/25 inline-flex items-center gap-2"
              >
                Start Tracking Today
                <ArrowRight size={20} />
              </a>
            </div>

            {/* Stats Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl blur-2xl" />
              <div className="relative bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-amber-500/20 rounded-2xl flex items-center justify-center">
                    <TrendingDown className="text-amber-400" size={28} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Weight Progress</p>
                    <p className="text-2xl font-bold">-4.2 kg</p>
                  </div>
                </div>
                
                {/* Mini Chart Visualization */}
                <div className="h-32 flex items-end justify-between gap-2 mb-6">
                  {[65, 55, 70, 45, 60, 40, 50, 35, 45, 30, 40, 25].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-amber-500 to-amber-300 rounded-t-sm opacity-80"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-700">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-400">72.1</p>
                    <p className="text-slate-500 text-sm">Current kg</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-amber-400">68.0</p>
                    <p className="text-slate-500 text-sm">Goal kg</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-400">23.4</p>
                    <p className="text-slate-500 text-sm">BMI</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-28 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How It <span className="text-amber-400">Works</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Get started in minutes. No complicated setup required.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Sign Up Free',
                description: 'Create your account with Google. No credit card needed, ever.',
                icon: Activity
              },
              {
                step: '02',
                title: 'Set Your Goals',
                description: 'Enter your height and target weight. We\'ll calculate your ideal BMI.',
                icon: Target
              },
              {
                step: '03',
                title: 'Get Predictions',
                description: 'Log daily weights and watch AI predict when you\'ll reach your goal.',
                icon: TrendingDown
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-2xl mb-6">
                  <span className="text-amber-400 font-bold text-xl">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 rounded-3xl blur-3xl" />
            <div className="relative bg-slate-800 border border-slate-700 rounded-3xl p-12 sm:p-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Forecast Your Future?
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of users who have predicted and achieved their weight goals with Weight Forecast. 
                Start your journey today — it's completely free.
              </p>
              <a
                href={APP_URL}
                className="group px-10 py-5 bg-amber-500 hover:bg-amber-400 rounded-xl font-semibold text-lg text-slate-950 transition-all hover:shadow-xl hover:shadow-amber-500/25 inline-flex items-center justify-center gap-2"
              >
                Launch App Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                <Banana className="text-slate-950" size={16} />
              </div>
              <span className="font-semibold">Weight Forecast</span>
            </div>
            
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Weight Forecast. All rights reserved.
            </p>

            <div className="flex gap-6 text-sm text-slate-400">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

