import React from 'react';
import { Quote, TrendingDown, Calendar, Sparkles } from 'lucide-react';

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
    accent: 'from-amber-400 to-orange-500',
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
    accent: 'from-purple-400 to-pink-500',
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
    accent: 'from-emerald-400 to-teal-500',
  },
];

const CaseStudies: React.FC = () => {
  return (
    <section id="stories" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-950/10 to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-sm font-medium mb-6">
            <Sparkles size={16} />
            Real Results
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            People who hit their date
            <span className="text-amber-400"> ahead of schedule</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Not cherry-picked transformations — everyday users letting the AI do the heavy lifting.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((s, i) => {
            const delta = s.before - s.after;
            const months = (s.days / 30).toFixed(1);
            return (
              <article
                key={i}
                className="group glass border border-slate-700/60 rounded-2xl p-6 sm:p-8 hover:border-amber-500/40 hover:-translate-y-1 transition-all hover:shadow-2xl hover:shadow-black/20"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${s.accent} flex items-center justify-center text-slate-950 font-bold text-lg shadow-lg`}
                  >
                    {s.initial}
                  </div>
                  <div>
                    <div className="font-bold text-white">{s.name}</div>
                    <div className="text-xs text-slate-500">{s.location}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-5 text-center">
                  <div className="bg-slate-800/40 rounded-lg py-3">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                      Before
                    </div>
                    <div className="text-lg font-bold text-slate-300">{s.before} kg</div>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg py-3">
                    <div className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold mb-1 flex items-center justify-center gap-1">
                      <TrendingDown size={10} /> Lost
                    </div>
                    <div className="text-lg font-bold text-emerald-400">−{delta} kg</div>
                  </div>
                  <div className="bg-slate-800/40 rounded-lg py-3">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                      After
                    </div>
                    <div className="text-lg font-bold text-white">{s.after} kg</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 mb-5">
                  <Calendar size={12} />
                  <span>
                    {months} months · <span className="text-amber-400 font-semibold">{s.highlight}</span>
                  </span>
                </div>

                <div className="relative">
                  <Quote
                    className="absolute -top-2 -left-1 text-amber-500/20"
                    size={28}
                    strokeWidth={1.5}
                  />
                  <p className="text-slate-300 leading-relaxed text-sm pl-6 italic">“{s.quote}”</p>
                </div>
              </article>
            );
          })}
        </div>

        <p className="text-center text-slate-600 text-xs mt-8">
          Stories shared with permission. Individual results vary and depend on consistency of logging.
        </p>
      </div>
    </section>
  );
};

export default CaseStudies;
