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
  Video,
} from 'lucide-react';
import InteractiveDemo from './InteractiveDemo';
import CaseStudies from './CaseStudies';
import TelegramCoach from './TelegramCoach';
import FunFactsShow from './FunFactsShow';
import ClientOnly from './ClientOnly';
import IntegrationBadges from './IntegrationBadges';
import HeroCardStack from './components/HeroCardStack';
import ScrollStackShowcase from './components/ScrollStackShowcase';
import VoiceLoggingMock from './components/VoiceLoggingMock';
import { Link } from 'react-router-dom';
import { Button, Card, Badge } from './components/paddle';

declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
    dataLayer?: any[];
  }
}

const APP_URL = 'https://weight-forecast.com';

const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

const ACCENTS = ['var(--blue-500)', 'var(--green-500)', 'var(--coral-500)', 'var(--lilac-500)', 'var(--gold-500)'];
const ACCENT_SOFT = ['var(--blue-100)', 'var(--green-100)', 'var(--coral-100)', 'var(--lilac-100)', 'var(--gold-100)'];

const LandingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    { icon: Brain, title: 'We help you foresee the future', description: 'Stop guessing "when?" — Our AI calculates the EXACT DATE you will hit your target weight. We do the math for you daily.' },
    { icon: Mic, title: 'We help you log meals instantly', description: "Just use your voice. We extract the food items, estimate calories, and log them—so you don't have to type a thing." },
    { icon: Sparkles, title: 'We help you scan your food', description: 'Take a photo, and our AI does the heavy lifting. No more databases or manual entry. We calculate the calories for you.' },
    { icon: MessageCircle, title: 'We help you stay on track', description: 'Your Telegram AI Coach delivers daily actionable plans and a weekly 60s personalized podcast to keep you perfectly aligned.' },
    { icon: Video, title: 'Time Travel Progress Videos', description: 'Since you are taking progress photos, we auto-generate timelapse videos of your transformation to share.' },
    { icon: Activity, title: 'We help you break plateaus', description: 'Our mathematical plateau detection triggers custom coaching interventions so we can keep your progress moving.' },
    { icon: Award, title: 'We help you build habits', description: 'We track your consistency and reward you for showing up. Building the habit is half the job, and we guide you there.' },
    { icon: Activity, title: 'Garmin & Wearables Sync', description: 'Connect your Garmin, Strava, or Apple Health. We automatically sync your activity, sleep, and recovery data.' },
    { icon: BookOpen, title: 'Daily Diary & Day Rating', description: 'Write daily entries and rate your day (1-5 stars) to visually map how your mood tracks with your progress.' },
    { icon: Globe, title: 'Fully Operational Offline', description: 'Log food and weight with zero internet. We sync everything perfectly when you are back online.' },
  ];

  const faqs = [
    { q: 'How accurate is the AI weight prediction?', a: 'Our AI uses linear regression on your weight history. After 2 weeks of daily logging, predictions are typically within 0.5kg accuracy. The more data you provide, the smarter it gets.' },
    { q: 'Is Weight Forecast really 100% free?', a: 'Yes! All features are completely free — AI predictions, unlimited tracking, food scanning, and cloud sync. No trials, no paywalls, no hidden fees. Ever.' },
    { q: 'Why track weight 3 times per day?', a: 'Your weight naturally fluctuates 1-3kg daily due to food, water, and activity. 3x tracking helps you see the real trend and gives AI better data for predictions.' },
    { q: 'Does it work offline?', a: 'Yes! Weight Forecast is a Progressive Web App. Your data saves locally and syncs when online. Install it like a native app on any device.' },
    { q: 'Does it work with Garmin or Apple Health?', a: 'Yes! You can connect Garmin, Strava, and Apple Health. We use your activity and sleep data to refine our weight predictions.' },
    { q: 'Is my data private?', a: 'Absolutely. Your data is encrypted and never sold. We use Firebase with strict security rules. You can export or delete your data anytime.' },
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

  const navLinkStyle: React.CSSProperties = {
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontFamily: 'var(--font-sans)',
    fontSize: 15,
    fontWeight: 500,
    color: 'var(--text-body)',
    padding: '8px 12px',
    borderRadius: 'var(--radius-sm)',
    textDecoration: 'none',
    transition: 'background 0.15s ease',
  };

  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden', fontFamily: 'var(--font-sans)' }}>
      {/* Sticky header — Paddle chrome */}
      <header className="pdl-chrome" style={{ position: 'sticky', top: 0, zIndex: 40 }}>
        <div className="pdl-container" style={{ height: 68, display: 'flex', alignItems: 'center', gap: 28 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div
              style={{
                width: 36,
                height: 36,
                background: 'var(--ink-900)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Banana size={20} color="#fff" />
            </div>
            <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text-strong)' }}>
              Weight Forecast
            </span>
          </Link>

          <nav style={{ display: 'flex', gap: 4, flex: 1 }} className="hidden md:flex">
            {[
              { href: '#stories', label: 'Stories' },
              { href: '#features', label: 'Features' },
              { href: '#faq', label: 'FAQ' },
            ].map((n) => (
              <a
                key={n.href}
                href={n.href}
                style={navLinkStyle}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--ink-50)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                {n.label}
              </a>
            ))}
            <Link
              to="/vs/macrofactor"
              style={navLinkStyle}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--ink-50)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              vs MacroFactor
            </Link>
            <Link
              to="/blog"
              style={navLinkStyle}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--ink-50)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              Blog
            </Link>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Button
              variant="accent"
              size="sm"
              href={APP_URL}
              onClick={() => trackEvent('cta_click', { location: 'hero_nav', cta_text: 'Start free' })}
            >
              Start free
            </Button>
          </div>
        </div>
      </header>

      {/* Hero — dark inverse section like Paddle AnimatedHero */}
      <section className="pdl-bg-inverse" style={{ overflow: 'hidden' }}>
        <div
          className="pdl-container"
          style={{
            paddingTop: 88,
            paddingBottom: 96,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: 56,
            alignItems: 'center',
          }}
        >
          <div>
            <div className="pdl-overline pdl-overline-dark" style={{ marginBottom: 18 }}>
              For athletes &amp; data geeks
            </div>
            <h1 className="pdl-display pdl-display-dark" style={{ margin: 0 }}>
              Smart predictive
              <br />
              weight analyzer
            </h1>
            <p className="pdl-lead pdl-lead-dark" style={{ margin: '22px 0 0', maxWidth: 480 }}>
              Know the <strong style={{ color: '#fff', fontWeight: 600 }}>exact date</strong> you&apos;ll hit your target weight —
              powered by your Garmin, Strava &amp; Telegram data.
            </p>

            <IntegrationBadges dark />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
              <Button
                variant="inverse"
                size="lg"
                href={APP_URL}
                onClick={() => trackEvent('cta_click', { location: 'hero_primary', cta_text: 'Start free with Google' })}
              >
                Start free with Google
              </Button>
              <Button
                variant="ghost"
                size="lg"
                href={`${APP_URL}?demo=1`}
                style={{ color: '#fff', border: '1px solid var(--border-inverse)' }}
                onClick={() => trackEvent('cta_click', { location: 'hero_primary', cta_text: 'Try Demo' })}
              >
                Try live demo
              </Button>
            </div>
            <p style={{ marginTop: 16, fontSize: 13, color: 'var(--text-on-dark-muted)' }}>
              Free forever · No credit card · 1-click Google sign-in
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px 28px', marginTop: 28 }}>
              {[
                { icon: Shield, label: 'Privacy-First', color: 'var(--green-500)' },
                { icon: Smartphone, label: 'Works Offline', color: 'var(--blue-400)' },
                { icon: Zap, label: 'AI-Powered', color: 'var(--gold-500)' },
                { icon: Heart, label: 'Free Forever', color: 'var(--coral-500)' },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-on-dark-muted)' }}>
                  <Icon size={16} color={color} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          <ClientOnly
            fallback={
              <div
                aria-hidden="true"
                style={{
                  height: 420,
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-inverse)',
                  background: 'rgba(255,255,255,0.04)',
                }}
              />
            }
          >
            <HeroCardStack />
          </ClientOnly>
        </div>
      </section>

      {/* Product showcase — compact stacked cards */}
      <ScrollStackShowcase />

      {/* Interactive forecast demo */}
      <section className="pdl-bg-base pdl-section-sm">
        <div className="pdl-container" style={{ maxWidth: 960 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="pdl-overline" style={{ marginBottom: 16 }}>Live preview</div>
            <h2 className="pdl-h2" style={{ margin: '0 0 12px' }}>Play with your weight prediction</h2>
            <p className="pdl-lead" style={{ maxWidth: 480, margin: '0 auto' }}>
              Drag the sliders — no signup required.
            </p>
          </div>
          <ClientOnly
            fallback={
              <div
                aria-hidden="true"
                style={{ height: 420, borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)', background: 'var(--ink-50)' }}
              />
            }
          >
            <InteractiveDemo />
          </ClientOnly>
        </div>
      </section>

      {/* Video demo — light base */}
      <section className="pdl-bg-base pdl-section">
        <div className="pdl-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: 56, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 14 }}>Voice logging</div>
              <h2 className="pdl-h2" style={{ margin: 0 }}>
                We log your meals from just your voice
              </h2>
              <p className="pdl-lead" style={{ margin: '16px 0 24px', maxWidth: 440 }}>
                No more tedious manual tracking. Just tap the microphone and say what you ate. We extract food items, estimate calories, and adjust your goal date automatically.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10, marginBottom: 28 }}>
                {[
                  "Say 'I had a bowl of oatmeal and a banana'",
                  'AI instantly calculates calories and logs the meal',
                  'Your goal date adjusts automatically based on intake',
                  'Supports multiple languages including Russian and English',
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      padding: '12px 14px',
                      background: 'var(--ink-50)',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    <span className="pdl-check-dot" style={{ width: 18, height: 18, marginTop: 1 }}>
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                        <path d="M3.5 8.5l3 3 6-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ fontSize: 14, lineHeight: 1.45, color: 'var(--text-body)' }}>{item}</span>
                  </div>
                ))}
              </div>

              <Button
                variant="accent"
                size="lg"
                href={APP_URL}
                iconLeft={<Mic size={18} />}
                onClick={() => trackEvent('cta_click', { location: 'video_demo', cta_text: 'Try Voice Logging' })}
              >
                Try Voice Logging Free
              </Button>
            </div>

            <div style={{ position: 'relative' }}>
              <VoiceLoggingMock />
            </div>
          </div>
        </div>
      </section>

      {/* Fun facts — warm bone section */}
      <section className="pdl-bg-warm pdl-section">
        <div className="pdl-container" style={{ maxWidth: 960 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="pdl-overline" style={{ marginBottom: 16 }}>Hidden in your data</div>
            <h2 className="pdl-h2" style={{ margin: '0 0 16px' }}>
              The fun facts hiding in a weight tracker
            </h2>
            <p className="pdl-lead" style={{ maxWidth: 520, margin: '0 auto' }}>
              Four screens. Thirteen insights. One very tired spreadsheet. Every number tells a story — we just highlight them.
            </p>
          </div>
          <ClientOnly
            fallback={
              <div
                aria-hidden="true"
                style={{ height: 520, borderRadius: 'var(--radius-xl)', border: '1px solid var(--bone-deep)', background: 'var(--paper)' }}
              />
            }
          >
            <FunFactsShow />
          </ClientOnly>
        </div>
      </section>

      <TelegramCoach />

      {/* Features — base */}
      <section id="features" className="pdl-bg-base pdl-section">
        <div className="pdl-container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="pdl-overline" style={{ marginBottom: 16 }}>Advanced job done</div>
            <h2 className="pdl-h2" style={{ margin: '0 0 16px' }}>
              How we get the job done for you
            </h2>
            <p className="pdl-lead" style={{ maxWidth: 520, margin: '0 auto' }}>
              Not just another weight tracker — an advanced assistant that does the heavy lifting to keep you motivated.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {features.map((feature, index) => {
              const accent = ACCENTS[index % ACCENTS.length];
              const soft = ACCENT_SOFT[index % ACCENT_SOFT.length];
              return (
                <Card key={index} interactive padding={28}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      background: soft,
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 20,
                    }}
                  >
                    <feature.icon size={24} color={accent} />
                  </div>
                  <h3 style={{ margin: '0 0 10px', fontSize: 18, fontWeight: 600, letterSpacing: 'var(--tracking-snug)', color: 'var(--text-strong)' }}>
                    {feature.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: 'var(--text-muted)' }}>{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works — warm */}
      <section id="how-it-works" className="pdl-bg-warm pdl-section">
        <div className="pdl-container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 className="pdl-h2" style={{ margin: '0 0 16px' }}>Three steps to your goal</h2>
            <p className="pdl-lead">Get your prediction in under 60 seconds.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 40 }}>
            {[
              { step: '01', title: 'Sign Up Free', description: 'One click with Google. No forms, no credit card, no friction.', icon: Activity, accent: 'var(--green-500)' },
              { step: '02', title: 'Set Your Goal', description: 'Enter your target weight. AI calculates ideal BMI and timeline.', icon: Target, accent: 'var(--blue-500)' },
              { step: '03', title: 'Get Your Date', description: "Log daily weights. Watch AI predict when you'll arrive.", icon: Calendar, accent: 'var(--coral-500)' },
            ].map((item) => (
              <div key={item.step} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 56,
                    height: 56,
                    background: item.accent,
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 20,
                  }}
                >
                  <item.icon size={26} color="#fff" />
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 8 }}>
                  Step {item.step}
                </div>
                <h3 style={{ margin: '0 0 10px', fontSize: 20, fontWeight: 600, color: 'var(--text-strong)' }}>{item.title}</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: 'var(--text-muted)' }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CaseStudies />

      {/* Comparison — base */}
      <section className="pdl-bg-base pdl-section-sm">
        <div className="pdl-container-narrow">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="pdl-h2" style={{ margin: '0 0 16px' }}>Why we&apos;re different</h2>
            <p className="pdl-lead" style={{ marginBottom: 16 }}>See what other apps are missing.</p>
            <Link
              to="/vs/macrofactor"
              onClick={() => trackEvent('navigation_click', { destination: 'vs_macrofactor' })}
              style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)', textDecoration: 'none' }}
            >
              Full comparison vs MacroFactor →
            </Link>
          </div>

          <Card padding={0} style={{ overflow: 'hidden' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                padding: '14px 20px',
                background: 'var(--ink-50)',
                borderBottom: '1px solid var(--border-subtle)',
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              <div>Feature</div>
              <div style={{ textAlign: 'center', color: 'var(--accent)' }}>Weight Forecast</div>
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Other Apps</div>
            </div>
            {comparisonData.map((row, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  padding: '14px 20px',
                  borderBottom: i !== comparisonData.length - 1 ? '1px solid var(--border-subtle)' : undefined,
                  fontSize: 14,
                }}
              >
                <div style={{ color: 'var(--text-body)' }}>{row.feature}</div>
                <div style={{ textAlign: 'center' }}>
                  {row.us ? <CheckCircle2 size={20} color="var(--success-solid)" style={{ margin: '0 auto' }} /> : '—'}
                </div>
                <div style={{ textAlign: 'center' }}>
                  {row.others === true ? <CheckCircle2 size={20} color="var(--text-subtle)" style={{ margin: '0 auto' }} /> :
                    row.others === '💰' ? <span title="Paid feature">💰</span> :
                      <span style={{ color: 'var(--text-subtle)' }}>—</span>}
                </div>
              </div>
            ))}
          </Card>
        </div>
      </section>

      {/* FAQ — warm */}
      <section id="faq" className="pdl-bg-warm pdl-section">
        <div className="pdl-container-narrow">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="pdl-h2" style={{ margin: 0 }}>Questions? Answers.</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((faq, i) => (
              <Card key={i} padding={0} style={{ overflow: 'hidden' }}>
                <button
                  onClick={() => {
                    setOpenFaq(openFaq === i ? null : i);
                    trackEvent('faq_interaction', { question: faq.q, action: openFaq === i ? 'close' : 'open' });
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '18px 22px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 16,
                    fontWeight: 600,
                    color: 'var(--text-strong)',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ paddingRight: 16 }}>{faq.q}</span>
                  <ChevronDown
                    size={20}
                    color="var(--accent)"
                    style={{ flexShrink: 0, transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease' }}
                  />
                </button>
                {openFaq === i && (
                  <div
                    style={{
                      padding: '0 22px 18px',
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: 'var(--text-muted)',
                      borderTop: '1px solid var(--border-subtle)',
                      paddingTop: 16,
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — warm band like Paddle CTABand */}
      <section className="pdl-bg-warm" style={{ padding: '88px 0' }}>
        <div className="pdl-container" style={{ textAlign: 'center' }}>
          <Badge status="success" style={{ marginBottom: 20 }}>Get your goal date in 60 seconds</Badge>
          <h2 className="pdl-h2" style={{ margin: '0 auto', maxWidth: 640 }}>
            Let us help you hit your goal. Start now.
          </h2>
          <p className="pdl-lead" style={{ margin: '18px auto 0', maxWidth: 480 }}>
            Your personal assistant is ready to work for you. Join 10,847+ people who are getting the job done.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
            <Button
              variant="accent"
              size="lg"
              href={APP_URL}
              onClick={() => trackEvent('cta_click', { location: 'final_cta', cta_text: 'Let Us Help You' })}
            >
              Let Us Help You (FREE)
            </Button>
          </div>
          <p style={{ marginTop: 16, fontSize: 13, color: 'var(--text-subtle)' }}>
            Free forever · No credit card · Start in 60 seconds
          </p>
        </div>
      </section>

      {/* Footer — ink-950 like Paddle SiteFooter */}
      <footer className="pdl-bg-ink-950" style={{ padding: '72px 0 40px' }}>
        <div className="pdl-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    background: '#fff',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Banana size={18} color="var(--ink-900)" />
                </div>
                <span style={{ fontWeight: 700, fontSize: 16 }}>Weight Forecast</span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-on-dark-muted)', maxWidth: 240, margin: 0 }}>
                AI-powered weight prediction tells you the exact date you&apos;ll hit your goal weight.
              </p>
            </div>

            {[
              { h: 'Product', items: [{ label: 'Features', href: '#features' }, { label: 'Stories', href: '#stories' }, { label: 'FAQ', href: '#faq' }] },
              { h: 'Compare', items: [{ label: 'vs MacroFactor', to: '/vs/macrofactor' }] },
              { h: 'Resources', items: [{ label: 'Blog', to: '/blog' }] },
              { h: 'Legal', items: [{ label: 'Privacy', to: '/privacy' }, { label: 'Terms', to: '/terms' }, { label: 'Contact', href: 'mailto:working.projects.info@gmail.com' }] },
            ].map((col) => (
              <div key={col.h}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'var(--text-on-dark-muted)',
                    marginBottom: 16,
                  }}
                >
                  {col.h}
                </div>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
                  {col.items.map((it) => (
                    <li key={it.label}>
                      {'to' in it && it.to ? (
                        <Link
                          to={it.to}
                          style={{ color: 'rgba(255,255,255,0.78)', textDecoration: 'none', fontSize: 14.5 }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.78)'; }}
                        >
                          {it.label}
                        </Link>
                      ) : (
                        <a
                          href={'href' in it ? it.href : '#'}
                          style={{ color: 'rgba(255,255,255,0.78)', textDecoration: 'none', fontSize: 14.5 }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.78)'; }}
                        >
                          {it.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 48,
              paddingTop: 24,
              borderTop: '1px solid var(--border-inverse)',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
              fontSize: 13.5,
              color: 'var(--text-on-dark-muted)',
            }}
          >
            <span>© {new Date().getFullYear()} Weight Forecast. All rights reserved.</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Globe size={14} />
              Made with care for a healthier world
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
