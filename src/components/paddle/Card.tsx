import React from 'react';

type CardTone = 'base' | 'warm' | 'sunken' | 'dark';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: CardTone;
  interactive?: boolean;
  padding?: number | string;
  radius?: string;
}

const tones: Record<CardTone, React.CSSProperties> = {
  base: { background: 'var(--surface-card)', color: 'var(--text-body)', border: 'var(--card-border)' },
  warm: { background: 'var(--bone)', color: 'var(--text-body)', border: '1px solid var(--bone-deep)' },
  sunken: { background: 'var(--surface-sunken)', color: 'var(--text-body)', border: '1px solid var(--border-subtle)' },
  dark: { background: 'var(--ink-900)', color: 'var(--text-on-dark)', border: '1px solid var(--border-inverse)' },
};

export const Card: React.FC<CardProps> = ({
  children,
  tone = 'base',
  interactive = false,
  padding = 24,
  radius,
  style,
  className,
  ...rest
}) => {
  const t = tones[tone];

  return (
    <div
      className={interactive ? `pdl-card-interactive ${className ?? ''}`.trim() : className}
      style={{
        borderRadius: radius || 'var(--card-radius)',
        boxShadow: tone === 'dark' ? 'none' : 'var(--card-shadow)',
        padding,
        transition: 'transform 0.15s ease, box-shadow 0.2s ease',
        cursor: interactive ? 'pointer' : undefined,
        ...t,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
