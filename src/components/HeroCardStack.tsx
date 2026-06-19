import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Badge } from './paddle';

export interface StackCardData {
  id: string;
  label: string;
  accent: string;
  soft: string;
  metric: string;
  sub: string;
  delta: string;
  deltaStatus?: 'success' | 'info' | 'warning';
  rows: [string, string][];
  sparkline: string;
}

export const HERO_STACK_CARDS: StackCardData[] = [
  {
    id: 'forecast',
    label: 'Goal Forecast',
    accent: 'var(--blue-500)',
    soft: 'var(--blue-100)',
    metric: 'Nov 8',
    sub: 'Predicted goal date · 74.2 kg',
    delta: '−2 days',
    deltaStatus: 'success',
    rows: [['Current', '78.4 kg'], ['Weekly loss', '0.6 kg'], ['Confidence', '±0.4 kg']],
    sparkline: '0,58 45,50 90,54 135,34 180,40 225,22 270,28 320,10',
  },
  {
    id: 'voice',
    label: 'Voice Logging',
    accent: 'var(--green-500)',
    soft: 'var(--green-100)',
    metric: '820',
    sub: 'Calories logged · lunch today',
    delta: '+42g protein',
    deltaStatus: 'success',
    rows: [['Salmon', '420 kcal'], ['Rice', '280 kcal'], ['Beer', '120 kcal']],
    sparkline: '0,62 50,55 100,48 150,52 200,38 250,42 300,30 320,24',
  },
  {
    id: 'coach',
    label: 'Telegram Coach',
    accent: 'var(--coral-500)',
    soft: 'var(--coral-100)',
    metric: '58s',
    sub: 'Weekly podcast · Monday recap',
    delta: 'live',
    deltaStatus: 'info',
    rows: [['Streak', '23 days'], ['Plateau', 'None'], ['Next action', 'Walk 30m']],
    sparkline: '0,50 40,44 80,48 120,36 160,40 200,28 240,32 280,18 320,22',
  },
  {
    id: 'garmin',
    label: 'Garmin Sync',
    accent: 'var(--lilac-500)',
    soft: 'var(--lilac-100)',
    metric: '6,420',
    sub: 'Steps today · sleep score 82',
    delta: '+340 kcal',
    deltaStatus: 'info',
    rows: [['Active', '48 min'], ['Recovery', 'Good'], ['Trend', 'On track']],
    sparkline: '0,54 45,48 90,52 135,40 180,44 225,32 270,36 320,20',
  },
];

function ProductCard({ data }: { data: StackCardData }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'var(--paper)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-default)',
        boxShadow: 'var(--shadow-xl)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          padding: '13px 16px',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--ink-200)' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--ink-200)' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--ink-200)' }} />
        <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 600, color: data.accent }}>{data.label}</span>
      </div>
      <div style={{ padding: 22, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{data.sub}</div>
            <div
              style={{
                fontSize: 38,
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: 'var(--text-strong)',
                lineHeight: 1.1,
                marginTop: 4,
              }}
            >
              {data.metric}
            </div>
          </div>
          <Badge status={data.deltaStatus ?? 'success'}>{data.delta}</Badge>
        </div>
        <svg
          viewBox="0 0 320 70"
          style={{ width: '100%', height: 70, display: 'block', margin: '16px 0' }}
          preserveAspectRatio="none"
        >
          <polygon fill={data.accent} opacity="0.08" points={`${data.sparkline} 320,70 0,70`} />
          <polyline
            fill="none"
            stroke={data.accent}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={data.sparkline}
          />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 'auto' }}>
          {data.rows.map(([k, v], i) => (
            <div
              key={k}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0',
                borderTop: i ? '1px solid var(--border-subtle)' : 'none',
                fontSize: 14,
              }}
            >
              <span style={{ color: 'var(--text-muted)' }}>{k}</span>
              <span style={{ fontWeight: 600, color: 'var(--text-strong)' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const HeroCardStack: React.FC = () => {
  const [order, setOrder] = useState([0, 1, 2, 3]);
  const [leaving, setLeaving] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const advance = useCallback(() => {
    setLeaving(order[0]);
    setTimeout(() => {
      setOrder((o) => [...o.slice(1), o[0]]);
      setLeaving(null);
    }, 560);
  }, [order]);

  useEffect(() => {
    if (reduced) return;
    timer.current = setTimeout(advance, 2600);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [advance, reduced]);

  const slot = (depth: number) => ({
    transform: `translateY(${depth * 26}px) translateX(${depth * 14}px) scale(${1 - depth * 0.05})`,
    opacity: depth > 2 ? 0 : 1 - depth * 0.14,
    zIndex: 10 - depth,
    filter: depth ? 'saturate(0.96)' : 'none',
  });

  return (
    <div
      style={{ position: 'relative', width: 420, maxWidth: '100%', height: 420, margin: '0 auto', cursor: 'pointer' }}
      onClick={() => {
        if (timer.current) clearTimeout(timer.current);
        advance();
      }}
      title="Click to shuffle"
      role="presentation"
    >
      {order.map((cardIdx, depth) => {
        const isLeaving = leaving === cardIdx;
        const base = slot(depth);
        const style = isLeaving
          ? {
              transform: 'translateY(-46px) translateX(-40px) scale(1.02) rotate(-4deg)',
              opacity: 0,
              zIndex: 20,
              filter: 'none',
            }
          : base;
        return (
          <div
            key={cardIdx}
            style={{
              position: 'absolute',
              inset: 0,
              transition: 'transform 0.56s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.56s ease, filter 0.56s ease',
              willChange: 'transform, opacity',
              ...style,
            }}
          >
            <ProductCard data={HERO_STACK_CARDS[cardIdx]} />
          </div>
        );
      })}
    </div>
  );
};

export default HeroCardStack;
