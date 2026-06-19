import React from 'react';
import { Quote, TrendingDown, Calendar } from 'lucide-react';
import { Card } from './components/paddle';

interface Story {
  name: string;
  location: string;
  before: number;
  after: number;
  days: number;
  quote: string;
  highlight: string;
  initial: string;
  accent: string;
}

const stories: Story[] = [
  {
    name: 'Alex P.',
    location: 'Berlin, 34',
    before: 92,
    after: 78,
    days: 147,
    quote:
      "The daily prediction is pure sorcery. Seeing 'goal: November 12' every morning turned dieting into a countdown instead of a chore.",
    highlight: '−14 kg in ~5 months',
    initial: 'A',
    accent: 'var(--blue-500)',
  },
  {
    name: 'Maria K.',
    location: 'Warsaw, 29',
    before: 74,
    after: 62,
    days: 180,
    quote:
      'Voice logging in Russian + Telegram coach is the only reason I stuck with tracking for six months. Everything else felt like a second job.',
    highlight: '−12 kg, zero typing',
    initial: 'M',
    accent: 'var(--lilac-500)',
  },
  {
    name: 'Dmitry S.',
    location: 'Lisbon, 41',
    before: 104,
    after: 88,
    days: 210,
    quote:
      'Garmin sync + plateau detection nailed me twice. Each time the app suggested a re-feed and weight started dropping again within a week.',
    highlight: '−16 kg, 2 plateaus broken',
    initial: 'D',
    accent: 'var(--green-500)',
  },
];

const CaseStudies: React.FC = () => {
  return (
    <section id="stories" className="pdl-bg-warm pdl-section">
      <div className="pdl-container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="pdl-overline" style={{ marginBottom: 16 }}>Real results</div>
          <h2 className="pdl-h2" style={{ margin: '0 0 16px' }}>
            People who hit their date ahead of schedule
          </h2>
          <p className="pdl-lead" style={{ maxWidth: 520, margin: '0 auto' }}>
            Not cherry-picked transformations — everyday users letting the AI do the heavy lifting.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {stories.map((s, i) => {
            const delta = s.before - s.after;
            const months = (s.days / 30).toFixed(1);
            return (
              <Card key={i} interactive padding={28}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: s.accent,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: 16,
                    }}
                  >
                    {s.initial}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-strong)' }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>{s.location}</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 20 }}>
                  <div style={{ background: 'var(--ink-50)', borderRadius: 'var(--radius-sm)', padding: '12px 8px', textAlign: 'center' }}>
                    <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-subtle)', fontWeight: 600, marginBottom: 4 }}>Before</div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-body)' }}>{s.before} kg</div>
                  </div>
                  <div style={{ background: 'var(--success-bg)', borderRadius: 'var(--radius-sm)', padding: '12px 8px', textAlign: 'center' }}>
                    <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--success-fg)', fontWeight: 600, marginBottom: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                      <TrendingDown size={10} /> Lost
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--success-fg)' }}>−{delta} kg</div>
                  </div>
                  <div style={{ background: 'var(--ink-50)', borderRadius: 'var(--radius-sm)', padding: '12px 8px', textAlign: 'center' }}>
                    <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-subtle)', fontWeight: 600, marginBottom: 4 }}>After</div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-strong)' }}>{s.after} kg</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-subtle)', marginBottom: 20 }}>
                  <Calendar size={12} />
                  <span>
                    {months} months · <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{s.highlight}</span>
                  </span>
                </div>

                <div style={{ position: 'relative' }}>
                  <Quote size={24} color="var(--blue-100)" style={{ position: 'absolute', top: -4, left: -4 }} strokeWidth={1.5} />
                  <p style={{ margin: 0, paddingLeft: 24, fontSize: 14, lineHeight: 1.6, color: 'var(--text-body)', fontStyle: 'italic' }}>
                    &ldquo;{s.quote}&rdquo;
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-subtle)', marginTop: 32 }}>
          Stories shared with permission. Individual results vary and depend on consistency of logging.
        </p>
      </div>
    </section>
  );
};

export default CaseStudies;
