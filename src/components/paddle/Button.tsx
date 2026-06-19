import React from 'react';

type ButtonVariant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'inverse' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  href?: string;
}

const sizes: Record<ButtonSize, { padding: string; height: number; font: number; gap: number; radius: string }> = {
  sm: { padding: '0 14px', height: 36, font: 14, gap: 7, radius: 'var(--radius-sm)' },
  md: { padding: '0 18px', height: 44, font: 15, gap: 8, radius: 'var(--radius-md)' },
  lg: { padding: '0 24px', height: 54, font: 17, gap: 10, radius: 'var(--radius-md)' },
};

const variants: Record<ButtonVariant, React.CSSProperties> = {
  primary: { background: 'var(--ink-900)', color: '#fff', border: '1px solid var(--ink-900)' },
  accent: { background: 'var(--accent)', color: '#fff', border: '1px solid var(--accent)' },
  secondary: { background: 'var(--paper)', color: 'var(--ink-900)', border: '1px solid var(--border-strong)' },
  ghost: { background: 'transparent', color: 'var(--ink-900)', border: '1px solid transparent' },
  inverse: { background: '#fff', color: 'var(--ink-900)', border: '1px solid #fff' },
  danger: { background: 'var(--danger-solid)', color: '#fff', border: '1px solid var(--danger-solid)' },
};

const baseStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontWeight: 600,
  letterSpacing: '-0.005em',
  lineHeight: 1,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  transition: 'transform 0.12s ease, background 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease',
  textDecoration: 'none',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
  href,
  style,
  onClick,
  type = 'button',
  ...rest
}) => {
  const s = sizes[size];
  const v = variants[variant];
  const isDisabled = disabled || loading;

  const combinedStyle: React.CSSProperties = {
    ...baseStyle,
    display: block ? 'flex' : 'inline-flex',
    width: block ? '100%' : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    height: s.height,
    padding: s.padding,
    fontSize: s.font,
    borderRadius: s.radius,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    opacity: isDisabled ? 0.5 : 1,
    ...v,
    ...style,
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    if (!isDisabled) (e.currentTarget as HTMLElement).style.transform = 'scale(0.975)';
  };
  const handleMouseUp = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
  };

  const content = (
    <>
      {loading && (
        <span
          style={{
            width: 15,
            height: 15,
            borderRadius: '50%',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            display: 'inline-block',
            animation: 'pdl-spin 0.7s linear infinite',
          }}
        />
      )}
      {!loading && iconLeft}
      {children}
      {!loading && iconRight}
    </>
  );

  if (href && !isDisabled) {
    return (
      <a
        href={href}
        style={combinedStyle}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={isDisabled}
      style={combinedStyle}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {content}
    </button>
  );
};

export default Button;
