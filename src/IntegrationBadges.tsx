import React from 'react';

const GarminIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <rect width="32" height="32" rx="8" fill="#007CC3" />
    <path
      d="M16 8.5c-4.14 0-7.5 3.36-7.5 7.5s3.36 7.5 7.5 7.5 7.5-3.36 7.5-7.5-3.36-7.5-7.5-7.5zm0 12.5a5 5 0 110-10 5 5 0 010 10z"
      fill="white"
    />
    <path d="M16 11.5v5l3.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const StravaIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <rect width="32" height="32" rx="8" fill="#FC4C02" />
    <path d="M18.2 10.5l-4.8 9.6h3.2L12 22.5h8.4l2.1-4.2-4.3-7.8z" fill="white" />
  </svg>
);

const TelegramIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <rect width="32" height="32" rx="8" fill="#26A5E4" />
    <path
      d="M8.5 15.2c5.8-2.5 9.7-4.2 11.7-5 5.5-2.3 6.6-2.7 7.4-2.7.2 0 .6.04.8.25.2.17.3.4.2.55-.1.15-1.5 6.4-2.1 8.5-.3 1.2-.85 1.6-1.4 1.65-.6.05-1.05-.4-1.63-.78-.9-.6-1.4-.97-2.27-1.55-1-.65-.35-1.01.22-1.6.15-.15 2.7-2.47 2.75-2.68.01-.03.01-.12-.05-.18-.06-.06-.15-.04-.22-.02-.1.03-1.65 1.05-4.65 3.05-.44.3-.84.45-1.18.44-.39-.01-1.14-.22-1.7-.4-.68-.22-1.22-.34-1.17-.72.03-.2.3-.4.82-.62z"
      fill="white"
    />
  </svg>
);

const badges = [
  { name: 'Garmin', Icon: GarminIcon },
  { name: 'Strava', Icon: StravaIcon },
  { name: 'Telegram', Icon: TelegramIcon },
];

const IntegrationBadges: React.FC = () => (
  <div className="flex flex-col items-center gap-3 mb-6 sm:mb-8">
    <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
      Syncs with your stack
    </p>
    <div className="flex items-center justify-center gap-5 sm:gap-8">
      {badges.map(({ name, Icon }) => (
        <div key={name} className="flex flex-col items-center gap-1.5">
          <div className="rounded-xl shadow-lg shadow-black/25 ring-1 ring-white/10">
            <Icon size={36} />
          </div>
          <span className="text-[11px] sm:text-xs font-medium text-slate-400">{name}</span>
        </div>
      ))}
    </div>
  </div>
);

export default IntegrationBadges;
