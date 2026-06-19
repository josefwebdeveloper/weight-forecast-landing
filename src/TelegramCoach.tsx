import React from 'react';
import { MessageCircle, Headphones, Bell, CheckCircle2 } from 'lucide-react';
import { Button, Card } from './components/paddle';

const APP_URL = 'https://weight-forecast.com';

const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

const TelegramCoach: React.FC = () => {
  return (
    <section id="coach" className="pdl-bg-base pdl-section">
      <div className="pdl-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: 56, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 14 }}>
              Your AI coach, where you already are
            </div>
            <h2 className="pdl-h2" style={{ margin: '0 0 16px' }}>
              A coach in Telegram.
              <span style={{ display: 'block', color: 'var(--accent)' }}>A podcast every Monday.</span>
            </h2>
            <p className="pdl-lead" style={{ marginBottom: 28 }}>
              No new app to babysit. Your Weight Forecast AI lives in Telegram — sending daily nudges,
              answering voice messages about what you ate, and shipping a 60-second personalized audio
              recap of your week every Monday morning.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              {[
                {
                  icon: MessageCircle,
                  title: 'Daily plan, not a lecture',
                  text: 'Morning check-in with one concrete action based on yesterday — eat 180g more protein, cut alcohol this week, go for a 30-min walk.',
                },
                {
                  icon: Headphones,
                  title: 'Weekly 60-second podcast',
                  text: 'Custom audio summary of your progress, plateau alerts, and next-week strategy — generated from your actual data.',
                },
                {
                  icon: Bell,
                  title: 'Voice-first logging',
                  text: "Send a voice note — 'ate two slices of pizza and a beer' — and it's logged. No forms, no scrolls, no frustration.",
                },
              ].map((item, i) => (
                <Card key={i} tone="sunken" padding={16}>
                  <div style={{ display: 'flex', gap: 14 }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--blue-100)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <item.icon size={18} color="var(--accent)" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-strong)', marginBottom: 4 }}>{item.title}</div>
                      <div style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--text-muted)' }}>{item.text}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Button
              variant="accent"
              size="lg"
              href={APP_URL}
              iconLeft={<MessageCircle size={18} />}
              onClick={() =>
                trackEvent('cta_click', {
                  location: 'telegram_coach',
                  cta_text: 'Connect Telegram Coach',
                })
              }
            >
              Connect Telegram Coach
            </Button>
          </div>

          <Card tone="dark" padding={24} radius="var(--radius-xl)">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 16, borderBottom: '1px solid var(--border-inverse)' }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                WF
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Weight Forecast</div>
                <div style={{ fontSize: 12, color: 'var(--green-500)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 6, height: 6, background: 'var(--green-500)', borderRadius: '50%' }} />
                  online
                </div>
              </div>
            </div>

            <div style={{ padding: '20px 0', display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div
                  style={{
                    background: 'rgba(45, 91, 255, 0.2)',
                    border: '1px solid rgba(45, 91, 255, 0.3)',
                    borderRadius: 'var(--radius-lg)',
                    borderTopRightRadius: 4,
                    padding: '10px 16px',
                    maxWidth: '75%',
                    color: 'rgba(255,255,255,0.9)',
                  }}
                >
                  🎙️ Had two pieces of salmon, rice, salad and a beer
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid var(--border-inverse)',
                    borderRadius: 'var(--radius-lg)',
                    borderTopLeftRadius: 4,
                    padding: '10px 16px',
                    maxWidth: '85%',
                    color: 'rgba(255,255,255,0.85)',
                    lineHeight: 1.5,
                  }}
                >
                  Logged: <span style={{ color: 'var(--gold-500)', fontWeight: 600 }}>~820 kcal</span>, 42g protein.
                  <br />
                  Today you&apos;re <span style={{ color: 'var(--green-500)', fontWeight: 600 }}>−340 kcal</span> under target. Nice work 🎯
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid var(--border-inverse)',
                    borderRadius: 'var(--radius-lg)',
                    borderTopLeftRadius: 4,
                    padding: '10px 16px',
                    maxWidth: '85%',
                    color: 'rgba(255,255,255,0.85)',
                    lineHeight: 1.5,
                  }}
                >
                  Your goal date just moved forward by <span style={{ color: 'var(--green-500)', fontWeight: 600 }}>2 days</span>.
                  New estimate: <span style={{ color: 'var(--gold-500)', fontWeight: 600 }}>Nov 8, 2026</span>.
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    background: 'rgba(45, 91, 255, 0.12)',
                    border: '1px solid rgba(45, 91, 255, 0.25)',
                    borderRadius: 'var(--radius-lg)',
                    borderTopLeftRadius: 4,
                    padding: '12px 16px',
                    maxWidth: '90%',
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: 'var(--blue-400)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    <Headphones size={12} /> Monday podcast · 58s
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: 'rgba(45, 91, 255, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <div style={{ width: 0, height: 0, borderLeft: '10px solid #fff', borderTop: '6px solid transparent', borderBottom: '6px solid transparent', marginLeft: 3 }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ height: 6, background: 'rgba(255,255,255,0.15)', borderRadius: 999, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: '33%', background: 'var(--accent)', borderRadius: 999 }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-on-dark-muted)', marginTop: 4 }}>
                        <span>0:19</span>
                        <span>0:58</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ paddingTop: 12, borderTop: '1px solid var(--border-inverse)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-on-dark-muted)' }}>
              <CheckCircle2 size={12} color="var(--green-500)" />
              <span>End-to-end synced with your web app</span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TelegramCoach;
