import React, { useMemo, useState } from 'react';
import { Calendar, Target, TrendingDown, Sparkles, ArrowRight } from 'lucide-react';

const APP_URL = 'https://weight-forecast.com';

const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
};

interface Result {
  date: Date;
  days: number;
  weeksNeeded: number;
  weeklyLoss: number;
  totalDeficit: number;
  dailyDeficit: number;
  isHealthy: boolean;
  warning: string | null;
}

/**
 * Interactive goal date calculator.
 *
 * Model: we assume ~7700 kcal per 1 kg of fat. Given a daily caloric
 * deficit the user already sustains, we compute the expected weekly rate
 * of loss and project when they will reach their target weight.
 * This is intentionally simple — the app itself runs a more accurate
 * regression model on historical data.
 */
const GoalDateCalculator: React.FC = () => {
  const [currentWeight, setCurrentWeight] = useState<number>(85);
  const [targetWeight, setTargetWeight] = useState<number>(70);
  const [dailyDeficit, setDailyDeficit] = useState<number>(500);
  const [tracked, setTracked] = useState<boolean>(false);

  const result = useMemo<Result | null>(() => {
    const toLose = currentWeight - targetWeight;
    if (toLose <= 0 || dailyDeficit <= 0) return null;

    const totalDeficit = toLose * 7700;
    const days = Math.round(totalDeficit / dailyDeficit);
    const weeklyLoss = (dailyDeficit * 7) / 7700;
    const weeksNeeded = days / 7;

    const date = new Date();
    date.setDate(date.getDate() + days);

    const isHealthy = weeklyLoss <= 1 && weeklyLoss >= 0.25;
    let warning: string | null = null;
    if (weeklyLoss > 1) {
      warning = 'Loss rate above 1 kg/week is aggressive and hard to sustain. Consider a smaller deficit.';
    } else if (weeklyLoss < 0.25) {
      warning = 'Very slow pace. A larger deficit (300-700 kcal) is usually more motivating.';
    }

    return {
      date,
      days,
      weeksNeeded,
      weeklyLoss,
      totalDeficit,
      dailyDeficit,
      isHealthy,
      warning,
    };
  }, [currentWeight, targetWeight, dailyDeficit]);

  const handleInteraction = () => {
    if (!tracked) {
      trackEvent('calculator_interaction', { location: 'hero' });
      setTracked(true);
    }
  };

  const formattedDate = result
    ? result.date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '—';

  return (
    <div className="relative mt-12 max-w-3xl mx-auto">
      <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl blur opacity-20 pointer-events-none" />
      <div className="relative glass border border-amber-500/30 rounded-3xl p-6 sm:p-8 bg-slate-900/80 backdrop-blur-md text-left">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
            <Sparkles className="text-amber-400" size={20} />
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              Free instant preview
            </div>
            <div className="text-lg font-bold">When will you hit your goal?</div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <label className="block">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <TrendingDown size={12} /> Current weight (kg)
            </span>
            <input
              type="number"
              min={30}
              max={300}
              step={0.1}
              value={currentWeight}
              onChange={(e) => {
                setCurrentWeight(parseFloat(e.target.value) || 0);
                handleInteraction();
              }}
              className="w-full bg-slate-800/60 border border-slate-700 focus:border-amber-500 focus:outline-none rounded-lg px-4 py-3 text-white text-lg font-semibold transition-colors"
            />
          </label>

          <label className="block">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Target size={12} /> Target (kg)
            </span>
            <input
              type="number"
              min={30}
              max={300}
              step={0.1}
              value={targetWeight}
              onChange={(e) => {
                setTargetWeight(parseFloat(e.target.value) || 0);
                handleInteraction();
              }}
              className="w-full bg-slate-800/60 border border-slate-700 focus:border-amber-500 focus:outline-none rounded-lg px-4 py-3 text-white text-lg font-semibold transition-colors"
            />
          </label>

          <label className="block">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Calendar size={12} /> Daily deficit (kcal)
            </span>
            <input
              type="number"
              min={100}
              max={1500}
              step={50}
              value={dailyDeficit}
              onChange={(e) => {
                setDailyDeficit(parseFloat(e.target.value) || 0);
                handleInteraction();
              }}
              className="w-full bg-slate-800/60 border border-slate-700 focus:border-amber-500 focus:outline-none rounded-lg px-4 py-3 text-white text-lg font-semibold transition-colors"
            />
          </label>
        </div>

        {result ? (
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-amber-500/15 to-orange-500/10 border border-amber-500/30 rounded-2xl p-5">
              <div className="text-xs uppercase tracking-wider text-amber-300 font-bold mb-2">
                Estimated goal date
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-1">
                {formattedDate}
              </div>
              <div className="text-sm text-slate-400">
                In {result.days} days ({result.weeksNeeded.toFixed(1)} weeks) · {result.weeklyLoss.toFixed(2)} kg/week
              </div>
            </div>

            <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                  {result.warning ? 'Heads up' : 'Looking good'}
                </div>
                <div className="text-sm text-slate-300 leading-relaxed">
                  {result.warning ??
                    `A ${dailyDeficit} kcal/day deficit is a sustainable pace. Track daily and our AI will sharpen this prediction.`}
                </div>
              </div>
              <a
                href={APP_URL}
                onClick={() =>
                  trackEvent('cta_click', {
                    location: 'calculator',
                    cta_text: 'Save prediction',
                  })
                }
                className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 rounded-xl font-bold text-sm transition-all hover:shadow-lg hover:shadow-amber-500/30"
              >
                Save & track daily <ArrowRight size={16} />
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5 text-sm text-slate-400">
            Target weight should be lower than current weight.
          </div>
        )}

        <p className="text-xs text-slate-500 mt-5 leading-relaxed">
          Rough estimate based on ~7,700 kcal per kg of fat. The app uses your real daily weigh-ins
          and linear regression for a far more accurate forecast — typically within ±0.5 kg after 2 weeks.
        </p>
      </div>
    </div>
  );
};

export default GoalDateCalculator;
