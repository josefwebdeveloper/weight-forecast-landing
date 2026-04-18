import React from 'react';
import { MessageCircle, Headphones, Bell, Sparkles, CheckCircle2 } from 'lucide-react';

const APP_URL = 'https://weight-forecast.com';

const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
};

const TelegramCoach: React.FC = () => {
  return (
    <section id="coach" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 -translate-y-1/2 -left-40 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm font-medium mb-6">
              <Sparkles size={16} />
              Your AI coach, where you already are
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight">
              A coach in Telegram.
              <span className="block text-blue-400">A podcast every Monday.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              No new app to babysit. Your Weight Forecast AI lives in Telegram — sending daily nudges,
              answering voice messages about what you ate, and shipping a 60-second personalized audio
              recap of your week every Monday morning.
            </p>

            <div className="space-y-3 mb-8">
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
                <div
                  key={i}
                  className="flex gap-4 p-4 glass border border-slate-700/50 rounded-xl hover:border-blue-500/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/15 flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-blue-400" size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-white mb-1">{item.title}</div>
                    <div className="text-sm text-slate-400 leading-relaxed">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={APP_URL}
              onClick={() =>
                trackEvent('cta_click', {
                  location: 'telegram_coach',
                  cta_text: 'Connect Telegram Coach',
                })
              }
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white rounded-xl font-bold text-base transition-all hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-0.5"
            >
              <MessageCircle size={18} /> Connect Telegram Coach
            </a>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />
            <div className="relative bg-slate-900/90 border border-slate-700/60 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-700/60">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg">
                  WF
                </div>
                <div>
                  <div className="font-bold text-white">Weight Forecast</div>
                  <div className="text-xs text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> online
                  </div>
                </div>
              </div>

              <div className="py-5 space-y-3 text-sm">
                <div className="flex justify-end">
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[75%] text-slate-100">
                    🎙️ Had two pieces of salmon, rice, salad and a beer
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] text-slate-200">
                    Logged: <span className="text-amber-300 font-semibold">~820 kcal</span>, 42g protein.
                    <br />
                    Today you're <span className="text-emerald-400 font-semibold">−340 kcal</span> under target.
                    Nice work 🎯
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] text-slate-200">
                    Your goal date just moved forward by <span className="text-emerald-400 font-semibold">2 days</span>.
                    New estimate: <span className="text-amber-300 font-semibold">Nov 8, 2026</span>.
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-blue-500/15 to-cyan-500/10 border border-blue-500/30 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[90%] text-slate-200">
                    <div className="flex items-center gap-2 mb-1.5 text-blue-300 text-xs font-bold uppercase tracking-wider">
                      <Headphones size={12} /> Monday podcast · 58s
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0">
                        <div className="w-0 h-0 border-l-[10px] border-l-white border-y-[6px] border-y-transparent ml-1" />
                      </div>
                      <div className="flex-1">
                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full w-1/3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                          <span>0:19</span>
                          <span>0:58</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700/60 flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 size={12} className="text-emerald-400" />
                <span>End-to-end synced with your web app</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TelegramCoach;
