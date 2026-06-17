import React from 'react';

const badges = [
  { name: 'Garmin', src: '/icons/integrations/garmin.svg' },
  { name: 'Strava', src: '/icons/integrations/strava.svg' },
  { name: 'Telegram', src: '/icons/integrations/telegram.svg' },
];

const IntegrationBadges: React.FC = () => (
  <div className="flex flex-col items-center gap-3 mb-6 sm:mb-8">
    <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
      Syncs with your stack
    </p>
    <div className="flex items-center justify-center gap-5 sm:gap-8">
      {badges.map(({ name, src }) => (
        <div key={name} className="flex flex-col items-center gap-1.5">
          <img
            src={src}
            alt={`${name} integration`}
            width={48}
            height={48}
            loading="eager"
            decoding="async"
            className="h-12 w-12 rounded-[10px] shadow-lg shadow-black/25 ring-1 ring-white/10"
          />
          <span className="text-[11px] sm:text-xs font-medium text-slate-400">{name}</span>
        </div>
      ))}
    </div>
  </div>
);

export default IntegrationBadges;
