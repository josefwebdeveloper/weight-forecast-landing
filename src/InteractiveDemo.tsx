import React, { useMemo, useState } from 'react';
import { Calendar, Target, Sparkles, ArrowRight, Zap, Check, AlertTriangle } from 'lucide-react';
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const APP_URL = 'https://weight-forecast.com';

const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
};

type ScenarioKey = 'current' | 'aggressive' | 'moderate';

interface ScenarioDef {
  key: ScenarioKey;
  label: string;
  deficitDelta: number;
  tone: string;
}

const SCENARIOS: ScenarioDef[] = [
  { key: 'moderate', label: 'Easier pace', deficitDelta: -150, tone: 'emerald' },
  { key: 'current', label: 'Your pace', deficitDelta: 0, tone: 'blue' },
  { key: 'aggressive', label: 'Push harder', deficitDelta: +200, tone: 'rose' },
];

interface Point {
  /** Day index. 0 = today. negative = history, positive = projection. */
  day: number;
  /** Label like "Mon 14". */
  date: string;
  /** Actual (simulated) past weight. undefined after today. */
  actual?: number;
  /** Projection weight. undefined before today. */
  projection?: number;
  /** Confidence band upper/lower (only on projection side). */
  hi?: number;
  lo?: number;
}

/**
 * Deterministic pseudo-random walk so the same inputs always generate the
 * same "history" — avoids the demo feeling flicky as users tweak sliders.
 */
function seededNoise(seed: number, t: number): number {
  const x = Math.sin(seed * 9301 + t * 49297) * 233280;
  return x - Math.floor(x);
}

function formatDate(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatFullDate(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

/**
 * Interactive forecast demo — the main hero activation for the landing page.
 *
 * Design goals:
 *   1. First-touch wow-moment: user sees a real-looking chart without signup.
 *   2. Tactile controls — sliders + live update while dragging.
 *   3. Honest: we generate a plausible past from the inputs so the forecast
 *      line has context. Confidence band widens with horizon.
 *   4. Scenario switcher shows the value of tracking (different deficit →
 *      very different goal dates), which creates the pull toward registration.
 */
const InteractiveDemo: React.FC = () => {
  const [currentWeight, setCurrentWeight] = useState<number>(85);
  const [targetWeight, setTargetWeight] = useState<number>(70);
  const [dailyDeficit, setDailyDeficit] = useState<number>(500);
  const [scenario, setScenario] = useState<ScenarioKey>('current');
  const [tracked, setTracked] = useState<boolean>(false);

  const scenarioDef = SCENARIOS.find((s) => s.key === scenario) ?? SCENARIOS[1];
  const effectiveDeficit = Math.max(100, dailyDeficit + scenarioDef.deficitDelta);

  const forecast = useMemo(() => {
    const toLose = currentWeight - targetWeight;
    if (toLose <= 0) return null;

    const kcalPerKg = 7700;
    const weeklyLoss = (effectiveDeficit * 7) / kcalPerKg;
    const dailyLoss = effectiveDeficit / kcalPerKg;
    const daysToGoal = Math.round(toLose / dailyLoss);
    const isHealthy = weeklyLoss <= 1 && weeklyLoss >= 0.25;

    const HISTORY_DAYS = 56; // 8 weeks of simulated past
    const horizon = Math.min(daysToGoal + 14, 180); // cap for chart readability

    const points: Point[] = [];
    const seed = Math.round(currentWeight * 10) + Math.round(targetWeight * 10);

    for (let t = -HISTORY_DAYS; t <= horizon; t++) {
      const p: Point = {
        day: t,
        date: formatDate(t),
      };
      if (t <= 0) {
        // Simulated past: linear decline with noise, same rate as current deficit
        const expected = currentWeight + -t * dailyLoss;
        const jitter = (seededNoise(seed, t) - 0.5) * 0.7; // ±0.35 kg
        p.actual = parseFloat((expected + jitter).toFixed(2));
      }
      if (t >= 0) {
        const proj = Math.max(targetWeight - 0.5, currentWeight - t * dailyLoss);
        p.projection = parseFloat(proj.toFixed(2));
        // Confidence band widens sqrt(t/14) — typical Bayesian forecast behavior
        const sigma = 0.4 * Math.sqrt(Math.max(1, t / 7));
        p.hi = parseFloat((proj + sigma).toFixed(2));
        p.lo = parseFloat((proj - sigma).toFixed(2));
      }
      points.push(p);
    }

    return {
      points,
      daysToGoal,
      weeklyLoss,
      isHealthy,
      goalDateLabel: formatFullDate(daysToGoal),
      weeks: (daysToGoal / 7).toFixed(1),
    };
  }, [currentWeight, targetWeight, effectiveDeficit]);

  const handleInteraction = (what: string) => {
    if (!tracked) {
      trackEvent('demo_interaction', { control: what });
      setTracked(true);
    }
  };

  if (!forecast) {
    return (
      <div style={{ marginTop: 0 }}>
        <div
          style={{
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-default)',
            background: 'var(--paper)',
            padding: 32,
            textAlign: 'center',
            color: 'var(--text-muted)',
          }}
        >
          Target weight must be lower than current weight.
        </div>
      </div>
    );
  }

  const yDomain: [number, number] = [
    Math.floor(targetWeight - 2),
    Math.ceil(currentWeight + 1),
  ];

  return (
    <div style={{ position: 'relative', textAlign: 'left' }}>
      <div
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-default)',
          background: 'var(--paper)',
          boxShadow: 'var(--shadow-xl)',
          padding: '24px 28px',
          color: 'var(--text-body)',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 'var(--radius-md)',
              background: 'var(--blue-100)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Sparkles color="var(--accent)" size={20} />
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 'var(--tracking-overline)', color: 'var(--accent)', fontWeight: 600 }}>
              Live forecast preview — no signup
            </div>
            <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-strong)', letterSpacing: 'var(--tracking-snug)' }}>
              Play with your weight prediction
            </div>
          </div>
          <span
            style={{
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '4px 10px',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--ink-50)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-subtle)',
              fontWeight: 600,
            }}
          >
            demo
          </span>
        </div>

        {/* Inputs */}
        <div className="grid md:grid-cols-3 gap-5 mb-6">
          <SliderInput
            label="Current weight"
            unit="kg"
            value={currentWeight}
            min={40}
            max={200}
            step={0.5}
            onChange={(v) => {
              setCurrentWeight(v);
              handleInteraction('current_weight');
            }}
          />
          <SliderInput
            label="Target weight"
            unit="kg"
            icon={<Target size={12} />}
            value={targetWeight}
            min={40}
            max={200}
            step={0.5}
            onChange={(v) => {
              setTargetWeight(v);
              handleInteraction('target_weight');
            }}
          />
          <SliderInput
            label="Daily calorie deficit"
            unit="kcal"
            icon={<Calendar size={12} />}
            value={dailyDeficit}
            min={100}
            max={1200}
            step={25}
            onChange={(v) => {
              setDailyDeficit(v);
              handleInteraction('deficit');
            }}
          />
        </div>

        {/* Scenario tabs */}
        <div className="flex flex-wrap gap-2 mb-5">
          {SCENARIOS.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => {
                setScenario(s.key);
                handleInteraction('scenario_' + s.key);
              }}
              style={{
                flex: '1 1 120px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid',
                padding: '8px 12px',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                transition: 'border-color 0.15s ease, background 0.15s ease',
                ...(scenario === s.key
                  ? {
                      backgroundColor:
                        s.tone === 'blue'
                          ? 'var(--blue-100)'
                          : s.tone === 'emerald'
                            ? 'var(--green-100)'
                            : 'var(--coral-100)',
                      borderColor:
                        s.tone === 'blue'
                          ? 'var(--blue-400)'
                          : s.tone === 'emerald'
                            ? 'var(--green-500)'
                            : 'var(--coral-500)',
                      color:
                        s.tone === 'blue'
                          ? 'var(--blue-700)'
                          : s.tone === 'emerald'
                            ? 'var(--success-fg)'
                            : 'var(--danger-fg)',
                    }
                  : {
                      backgroundColor: 'var(--ink-50)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-muted)',
                    }),
              }}
            >
              <div>{s.label}</div>
              <div className="text-[10px] opacity-70 font-normal mt-0.5">
                {s.deficitDelta === 0
                  ? `${dailyDeficit} kcal/day`
                  : `${s.deficitDelta > 0 ? '+' : ''}${s.deficitDelta} kcal`}
              </div>
            </button>
          ))}
        </div>

        {/* Chart */}
        <div style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', background: 'var(--ink-50)', padding: '12px 16px', marginBottom: 20 }}>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={forecast.points} margin={{ top: 10, right: 16, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="confidenceBand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2D5BFF" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#2D5BFF" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(92,92,102,0.15)" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="day"
                type="number"
                domain={[-56, 'dataMax']}
                ticks={[-56, -28, 0, 28, 56, 84, 112]}
                tickFormatter={(d) => (d === 0 ? 'Today' : formatDate(d))}
                stroke="rgba(92,92,102,0.5)"
                tick={{ fontSize: 11 }}
              />
              <YAxis
                domain={yDomain}
                stroke="rgba(92,92,102,0.5)"
                tick={{ fontSize: 11 }}
                tickFormatter={(v) => `${v}`}
                width={45}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid var(--border-default)',
                  borderRadius: 8,
                  fontSize: 12,
                  boxShadow: 'var(--shadow-md)',
                }}
                labelFormatter={(day) => (day === 0 ? 'Today' : `${day > 0 ? 'In ' : ''}${Math.abs(day)} days ${day < 0 ? 'ago' : ''}`)}
                formatter={(value, key) => {
                  const k = String(key ?? '');
                  if (k === 'hi' || k === 'lo') return ['', ''];
                  const label = k === 'actual' ? 'History' : k === 'projection' ? 'Forecast' : k;
                  return [value != null ? `${value} kg` : '', label];
                }}
              />
              <ReferenceLine
                y={targetWeight}
                stroke="#00B877"
                strokeDasharray="4 4"
                label={{
                  value: `Goal: ${targetWeight} kg`,
                  position: 'insideTopRight',
                  fill: '#047857',
                  fontSize: 11,
                  fontWeight: 600,
                }}
              />
              <ReferenceLine x={0} stroke="rgba(148,163,184,0.3)" strokeDasharray="2 2" />
              <Area
                type="monotone"
                dataKey="hi"
                stroke="none"
                fill="url(#confidenceBand)"
                isAnimationActive={false}
              />
              <Area
                type="monotone"
                dataKey="lo"
                stroke="none"
                fill="#F4F4F6"
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#8A8A94"
                strokeWidth={2}
                dot={false}
                connectNulls
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="projection"
                stroke="#2D5BFF"
                strokeWidth={2.5}
                strokeDasharray="6 4"
                dot={false}
                connectNulls
                isAnimationActive={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, paddingTop: 8, paddingLeft: 8, fontSize: 11, color: 'var(--text-muted)' }}>
            <LegendDot color="#8A8A94" label="Your history (simulated)" />
            <LegendDot color="#2D5BFF" label="AI forecast" dashed />
            <LegendDot color="#00B877" label="Goal" dashed />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          <div
            style={{
              borderRadius: 'var(--radius-lg)',
              padding: 20,
              border: forecast.isHealthy ? '1px solid var(--green-500)' : '1px solid var(--gold-500)',
              background: forecast.isHealthy ? 'var(--green-100)' : 'var(--gold-100)',
            }}
          >
            <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 4 }}>
              Projected goal date
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 4, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              {forecast.goalDateLabel}
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-body)', marginBottom: 12 }}>
              {forecast.daysToGoal} days from today · {forecast.weeks} weeks · {forecast.weeklyLoss.toFixed(2)} kg/week
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 12,
                fontWeight: 600,
                color: forecast.isHealthy ? 'var(--success-fg)' : 'var(--warning-fg)',
              }}
            >
              {forecast.isHealthy ? <Check size={14} /> : <AlertTriangle size={14} />}
              {forecast.isHealthy
                ? 'Sustainable pace (0.25–1 kg/week)'
                : forecast.weeklyLoss > 1
                  ? 'Aggressive — hard to hold long-term'
                  : 'Slow — might feel unrewarding'}
            </div>
          </div>

          <a
            href={APP_URL}
            onClick={() =>
              trackEvent('cta_click', {
                location: 'interactive_demo',
                cta_text: 'Save with my real data',
                scenario,
              })
            }
            style={{
              borderRadius: 'var(--radius-lg)',
              padding: 20,
              background: 'var(--accent)',
              color: '#fff',
              fontWeight: 600,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              textDecoration: 'none',
              transition: 'transform 0.12s ease, box-shadow 0.15s ease',
              boxShadow: 'var(--shadow-md)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.85, fontWeight: 600, marginBottom: 4 }}>
                <Zap size={14} /> Next step
              </div>
              <div style={{ fontSize: 18, lineHeight: 1.25 }}>
                Save with <span style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>your</span> real data
              </div>
              <div style={{ fontSize: 12, opacity: 0.85, marginTop: 6 }}>
                1-click Google sign-in · free forever on basic tracking.
              </div>
            </div>
            <div style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
              Start tracking <ArrowRight size={16} />
            </div>
          </a>
        </div>

        <p style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 20, lineHeight: 1.6 }}>
          The dashed forecast is what the app actually generates — linear regression on your real
          morning weights, with a confidence band that shrinks as you log more days. After 2 weeks
          of tracking, prediction accuracy is typically ±0.5 kg.
        </p>
      </div>
    </div>
  );
};

const SliderInput: React.FC<{
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  icon?: React.ReactNode;
}> = ({ label, unit, value, min, max, step, onChange, icon }) => {
  return (
    <label style={{ display: 'block' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: 6 }}>
          {icon}
          {label}
        </span>
        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}>
          {value}
          <span style={{ fontSize: 10, color: 'var(--text-subtle)', fontWeight: 500, marginLeft: 2 }}>{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ width: '100%', height: 8, accentColor: 'var(--accent)', cursor: 'pointer' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-subtle)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </label>
  );
};

const LegendDot: React.FC<{ color: string; label: string; dashed?: boolean }> = ({ color, label, dashed }) => (
  <div className="flex items-center gap-1.5">
    <span
      className="inline-block w-4 h-0.5"
      style={{
        background: dashed ? `repeating-linear-gradient(to right, ${color} 0 4px, transparent 4px 7px)` : color,
      }}
    />
    <span>{label}</span>
  </div>
);

export default InteractiveDemo;
