import React from 'react';

type BadgeStatus = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: BadgeStatus;
  dot?: boolean;
}

const map: Record<BadgeStatus, [string, string, string]> = {
  neutral: ['var(--ink-100)', 'var(--ink-700)', 'var(--ink-400)'],
  success: ['var(--success-bg)', 'var(--success-fg)', 'var(--success-solid)'],
  warning: ['var(--warning-bg)', 'var(--warning-fg)', 'var(--warning-solid)'],
  danger: ['var(--danger-bg)', 'var(--danger-fg)', 'var(--danger-solid)'],
  info: ['var(--info-bg)', 'var(--info-fg)', 'var(--info-solid)'],
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  status = 'neutral',
  dot = true,
  style,
  ...rest
}) => {
  const [bg, fg, dotc] = map[status];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: bg,
        color: fg,
        padding: '3px 10px',
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: 13,
        lineHeight: 1.3,
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {dot && (
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: dotc,
            flex: 'none',
          }}
        />
      )}
      {children}
    </span>
  );
};

export default Badge;
