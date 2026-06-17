import React from 'react';

const badges = [
  {
    name: 'Garmin',
    src: '/icons/integrations/garmin.png',
    imgClass: 'h-9 w-9 object-contain',
    wrapClass: 'bg-white p-1.5 rounded-[10px]',
  },
  {
    name: 'Strava',
    src: '/icons/integrations/strava.png',
    imgClass: 'h-12 w-12 object-cover rounded-[10px]',
    wrapClass: '',
  },
  {
    name: 'Telegram',
    src: '/icons/integrations/telegram.png',
    imgClass: 'h-12 w-12 object-cover rounded-full',
    wrapClass: '',
  },
];

const IntegrationBadges: React.FC = () => (
  <div className="flex flex-col items-center gap-3 mb-6 sm:mb-8">
    <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
      Syncs with your stack
    </p>
    <div className="flex items-end justify-center gap-5 sm:gap-8">
      {badges.map(({ name, src, imgClass, wrapClass }) => (
        <div key={name} className="flex flex-col items-center gap-1.5">
          <div
            className={`flex h-12 w-12 items-center justify-center shadow-lg shadow-black/25 ring-1 ring-white/10 ${wrapClass}`}
          >
            <img
              src={src}
              alt={`${name} integration`}
              width={48}
              height={48}
              loading="eager"
              decoding="async"
              className={imgClass}
            />
          </div>
          <span className="text-[11px] sm:text-xs font-medium text-slate-400">{name}</span>
        </div>
      ))}
    </div>
  </div>
);

export default IntegrationBadges;
