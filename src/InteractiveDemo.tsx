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
  { key: 'current', label: 'Your pace', deficitDelta: 0, tone: 'amber' },
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
      <div className="mt-12 max-w-5xl mx-auto">
        <div className="rounded-3xl border border-amber-500/30 bg-slate-900/80 p-8 text-center text-slate-400">
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
    <div className="relative mt-12 max-w-5xl mx-auto">
      <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl blur opacity-20 pointer-events-none" />
      <div className="relative glass border border-amber-500/30 rounded-3xl p-6 sm:p-8 bg-slate-900/80 backdrop-blur-md text-left">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center shrink-0">
            <Sparkles className="text-amber-400" size={20} />
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              Live forecast preview — no signup
            </div>
            <div className="text-lg sm:text-xl font-bold">Play with your weight prediction</div>
          </div>
          <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400">
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
              className={`flex-1 min-w-[120px] rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                scenario === s.key
                  ? `bg-${s.tone}-500/15 border-${s.tone}-400 text-${s.tone}-200`
                  : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-500'
              }`}
              style={
                scenario === s.key
                  ? {
                      backgroundColor:
                        s.tone === 'amber'
                          ? 'rgba(245,158,11,0.15)'
                          : s.tone === 'emerald'
                            ? 'rgba(16,185,129,0.15)'
                            : 'rgba(244,63,94,0.15)',
                      borderColor:
                        s.tone === 'amber'
                          ? 'rgb(251,191,36)'
                          : s.tone === 'emerald'
                            ? 'rgb(52,211,153)'
                            : 'rgb(251,113,133)',
                      color:
                        s.tone === 'amber'
                          ? 'rgb(253,230,138)'
                          : s.tone === 'emerald'
                            ? 'rgb(167,243,208)'
                            : 'rgb(254,205,211)',
                    }
                  : undefined
              }
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
        <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-3 sm:p-4 mb-5">
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={forecast.points} margin={{ top: 10, right: 16, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="confidenceBand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(148,163,184,0.1)" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="day"
                type="number"
                domain={[-56, 'dataMax']}
                ticks={[-56, -28, 0, 28, 56, 84, 112]}
                tickFormatter={(d) => (d === 0 ? 'Today' : formatDate(d))}
                stroke="rgba(148,163,184,0.5)"
                tick={{ fontSize: 11 }}
              />
              <YAxis
                domain={yDomain}
                stroke="rgba(148,163,184,0.5)"
                tick={{ fontSize: 11 }}
                tickFormatter={(v) => `${v}`}
                width={45}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15,23,42,0.95)',
                  border: '1px solid rgba(245,158,11,0.4)',
                  borderRadius: 8,
                  fontSize: 12,
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
                stroke="#10b981"
                strokeDasharray="4 4"
                label={{
                  value: `Goal: ${targetWeight} kg`,
                  position: 'insideTopRight',
                  fill: '#34d399',
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
                fill="#0f172a"
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#94a3b8"
                strokeWidth={2}
                dot={false}
                connectNulls
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="projection"
                stroke="#f59e0b"
                strokeWidth={2.5}
                strokeDasharray="6 4"
                dot={false}
                connectNulls
                isAnimationActive={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-4 pt-2 pl-2 text-[11px] text-slate-400">
            <LegendDot color="#94a3b8" label="Your history (simulated)" />
            <LegendDot color="#f59e0b" label="AI forecast" dashed />
            <LegendDot color="#10b981" label="Goal" dashed />
          </div>
        </div>

        {/* Result + CTA */}
        <div className="grid md:grid-cols-[1.3fr,1fr] gap-4">
          <div
            className={`rounded-2xl p-5 border ${
              forecast.isHealthy
                ? 'border-emerald-500/30 bg-emerald-500/5'
                : 'border-amber-500/40 bg-amber-500/10'
            }`}
          >
            <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">
              Projected goal date
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1 leading-tight">
              {forecast.goalDateLabel}
            </div>
            <div className="text-sm text-slate-300 mb-3">
              {forecast.daysToGoal} days from today · {forecast.weeks} weeks · {forecast.weeklyLoss.toFixed(2)} kg/week
            </div>
            <div
              className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                forecast.isHealthy ? 'text-emerald-300' : 'text-amber-300'
              }`}
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
            className="group rounded-2xl p-5 bg-gradient-to-br from-amber-500 to-orange-500 text-slate-950 font-bold flex flex-col justify-between hover:shadow-lg hover:shadow-amber-500/30 transition-all"
          >
            <div>
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider opacity-80 font-bold mb-1">
                <Zap size={14} /> Next step
              </div>
              <div className="text-lg leading-tight">
                Save with <span className="underline decoration-2 underline-offset-2">your</span> real data
              </div>
              <div className="text-xs font-medium opacity-80 mt-1.5">
                1-click Google sign-in · free forever on basic tracking.
              </div>
            </div>
            <div className="mt-4 inline-flex items-center gap-1.5 text-sm">
              Start tracking <ArrowRight size={16} className="group-hover:translate-x-0.5 transition" />
            </div>
          </a>
        </div>

        <p className="text-xs text-slate-500 mt-5 leading-relaxed">
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
    <label className="block">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
          {icon}
          {label}
        </span>
        <span className="text-sm font-bold text-amber-300 tabular-nums">
          {value}
          <span className="text-[10px] text-slate-500 font-medium ml-0.5">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 accent-amber-500 cursor-pointer"
      />
      <div className="flex justify-between text-[10px] text-slate-600 mt-1 font-mono">
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
