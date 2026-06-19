import React from 'react';

/** Static mock of voice meal logging — replaces missing demo video */
const VoiceLoggingMock: React.FC = () => (
  <div className="voice-demo-mock">
    <div className="voice-demo-mock__frame">
      <div className="voice-demo-mock__header">
        <div className="voice-demo-mock__avatar">WF</div>
        <div>
          <div className="voice-demo-mock__title">Weight Forecast</div>
          <div className="voice-demo-mock__status">
            <span className="voice-demo-mock__dot" />
            Voice logging
          </div>
        </div>
      </div>

      <div className="voice-demo-mock__chat">
        <div className="voice-demo-mock__bubble voice-demo-mock__bubble--user">
          🎙️ &ldquo;I had two pieces of salmon, rice, salad and a beer&rdquo;
        </div>
        <div className="voice-demo-mock__bubble voice-demo-mock__bubble--ai">
          <strong>Logged ~820 kcal</strong>, 42g protein.
          <br />
          Today you&apos;re <span className="voice-demo-mock__green">−340 kcal</span> under target.
        </div>
        <div className="voice-demo-mock__bubble voice-demo-mock__bubble--ai">
          Goal date moved forward by <span className="voice-demo-mock__green">2 days</span> →{' '}
          <strong className="voice-demo-mock__accent">Nov 8, 2026</strong>
        </div>
      </div>

      <div className="voice-demo-mock__wave" aria-hidden>
        {[3, 5, 8, 12, 8, 5, 3, 6, 10, 7, 4, 2].map((h, i) => (
          <span key={i} className="voice-demo-mock__bar" style={{ height: h * 3 }} />
        ))}
      </div>

      <div className="voice-demo-mock__mic-row">
        <div className="voice-demo-mock__mic">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="9" y="3" width="6" height="12" rx="3" fill="#fff" />
            <path d="M6 11a6 6 0 0012 0" stroke="#fff" strokeWidth="2" />
            <path d="M12 17v4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <span className="voice-demo-mock__hint">Tap and speak — no typing</span>
      </div>
    </div>
  </div>
);

export default VoiceLoggingMock;
