import React from 'react';
import { Button } from './paddle';

const APP_URL = 'https://weight-forecast.com';

function ForecastDashboard() {
  return (
    <div className="stack-card stack-card--dashboard">
      <div className="stack-card__chrome">
        <span className="stack-dot" />
        <span className="stack-dot" />
        <span className="stack-dot" />
        <span className="stack-card__label">Goal Forecast</span>
      </div>
      <div className="stack-card__body">
        <div className="stack-stats stack-stats--light">
          {[
            { l: 'Current', v: '78.4 kg', d: '−0.3 today' },
            { l: 'Goal date', v: 'Nov 8', d: '74.2 kg target' },
            { l: 'Weekly trend', v: '−0.6 kg', d: 'On track' },
          ].map((s) => (
            <div key={s.l} className="stack-stat stack-stat--light">
              <div className="stack-stat__label stack-stat__label--light">{s.l}</div>
              <div className="stack-stat__value stack-stat__value--light">{s.v}</div>
              <div className="stack-stat__delta stack-stat__delta--light">{s.d}</div>
            </div>
          ))}
        </div>
        <svg viewBox="0 0 480 100" className="stack-chart" preserveAspectRatio="none">
          <polygon fill="#2D5BFF" opacity="0.1" points="0,78 50,68 100,72 150,52 200,58 250,38 300,44 350,28 400,34 480,22 480,100 0,100" />
          <polyline fill="none" stroke="#2D5BFF" strokeWidth="2.5" strokeLinecap="round" points="0,78 50,68 100,72 150,52 200,58 250,38 300,44 350,28 400,34 480,22" />
        </svg>
      </div>
    </div>
  );
}

function VoicePhoneCard() {
  return (
    <div className="stack-card stack-card--phone">
      <div className="stack-phone-notch" />
      <div className="stack-card__body">
        <div className="stack-bubble stack-bubble--out">🎙️ Salmon, rice, salad and a beer</div>
        <div className="stack-bubble stack-bubble--in">
          Logged <strong>820 kcal</strong>
          <br />
          Goal → <strong className="stack-accent">Nov 8</strong>
        </div>
        <div className="stack-mic">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="9" y="3" width="6" height="12" rx="3" fill="#fff" />
            <path d="M6 11a6 6 0 0012 0" stroke="#fff" strokeWidth="2" />
            <path d="M12 17v4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function InsightsPanel() {
  const rows = [
    ['Best weigh-in day', 'Tuesday AM', 88],
    ['Protein ↔ progress', 'r = 0.72', 72],
    ['Sleep score avg', '82 / 100', 64],
  ];
  return (
    <div className="stack-card stack-card--insights">
      <div className="stack-card__body">
        <div className="stack-insights-title">Hidden in your data</div>
        {rows.map(([k, v, w], i) => (
          <div key={k} className="stack-insight-row" style={{ borderTop: i ? undefined : 'none' }}>
            <span>{k}</span>
            <span className="stack-bar" style={{ width: `${w}%` }} />
            <span className="stack-insight-val">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Compact product showcase — no scroll-jacking, cards stacked at rest */
const ScrollStackShowcase: React.FC = () => (
  <section className="product-showcase pdl-bg-warm pdl-section-sm" aria-label="Product showcase">
    <div className="pdl-container product-showcase__inner">
      <div className="product-showcase__copy">
        <p className="pdl-overline" style={{ marginBottom: 16 }}>AI prediction</p>
        <h2 className="scroll-showcase__headline">Forecast</h2>
        <p className="scroll-showcase__desc">
          Know <u>exactly when</u> you&apos;ll hit your goal. Daily tracking, voice logging, and Telegram coaching — working together in one app.
        </p>
        <Button variant="secondary" size="lg" href={APP_URL}>
          See your forecast
        </Button>
      </div>

      <div className="product-showcase__stack" aria-hidden={false}>
        <div className="product-showcase__layer product-showcase__layer--insights">
          <InsightsPanel />
        </div>
        <div className="product-showcase__layer product-showcase__layer--dashboard">
          <ForecastDashboard />
        </div>
        <div className="product-showcase__layer product-showcase__layer--phone">
          <VoicePhoneCard />
        </div>
      </div>
    </div>
  </section>
);

export default ScrollStackShowcase;
