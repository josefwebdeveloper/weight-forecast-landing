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

interface IntegrationBadgesProps {
  dark?: boolean;
}

const IntegrationBadges: React.FC<IntegrationBadgesProps> = ({ dark = false }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, margin: '24px 0 8px' }}>
    <p
      style={{
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: 'var(--tracking-overline)',
        textTransform: 'uppercase',
        color: dark ? 'var(--text-on-dark-muted)' : 'var(--text-subtle)',
        margin: 0,
      }}
    >
      Syncs with your stack
    </p>
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 28 }}>
      {badges.map(({ name, src, imgClass, wrapClass }) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div
            className={wrapClass}
            style={{
              display: 'flex',
              height: 48,
              width: 48,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--radius-md)',
              border: dark ? '1px solid var(--border-inverse)' : '1px solid var(--border-default)',
              background: dark ? 'rgba(255,255,255,0.06)' : 'var(--paper)',
              boxShadow: dark ? 'none' : 'var(--shadow-sm)',
            }}
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
          <span
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: dark ? 'var(--text-on-dark-muted)' : 'var(--text-muted)',
            }}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default IntegrationBadges;
