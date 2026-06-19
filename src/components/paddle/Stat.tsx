import React from 'react';

interface StatProps {
  value: string;
  label: string;
  dark?: boolean;
}

export const Stat: React.FC<StatProps> = ({ value, label, dark = false }) => (
  <div>
    <div
      style={{
        fontSize: 36,
        fontWeight: 600,
        letterSpacing: '-0.02em',
        color: dark ? 'var(--text-on-dark)' : 'var(--text-strong)',
        lineHeight: 1.1,
      }}
    >
      {value}
    </div>
    <div
      style={{
        marginTop: 6,
        fontSize: 14,
        color: dark ? 'var(--text-on-dark-muted)' : 'var(--text-muted)',
        lineHeight: 1.4,
      }}
    >
      {label}
    </div>
  </div>
);

export default Stat;
