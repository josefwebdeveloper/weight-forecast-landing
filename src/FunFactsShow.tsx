import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Native React/TS port of "Fun Facts Animation" (originally React+Babel sandbox
// bundled as a self-unpacking HTML). Same scenes, same timings, same fact copy.
// Integration differences vs the original:
//   • No playback bar / persistence. Loops silently when in viewport.
//   • Auto-pauses when offscreen or when the tab is backgrounded.
//   • Scales 1920×1080 canvas to container width via transform.
// Screenshot assets live in /public/fun-facts/ — load via plain <img src>.
// ─────────────────────────────────────────────────────────────────────────────

// ── Colors / typography ────────────────────────────────────────────────────
const ORANGE = '#F59E0B';
const MINT = '#10B981';
const CORAL = '#EF4444';
const BG = '#0B1020';
const INK = '#F5F2EA';

const MONO =
  "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";
const SANS = 'Inter, system-ui, sans-serif';

// ── Easing ─────────────────────────────────────────────────────────────────
type Ease = (t: number) => number;
const Easing = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => (--t) * t * t + 1,
  easeInOutSine: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2,
  easeOutBack: (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
};

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

// ── Timeline + sprite contexts ─────────────────────────────────────────────
interface TimelineValue {
  time: number;
  duration: number;
}
const TimelineContext = createContext<TimelineValue>({ time: 0, duration: 50 });
const useTime = () => useContext(TimelineContext).time;
const useTimeline = () => useContext(TimelineContext);

interface SpriteValue {
  localTime: number;
  progress: number;
  duration: number;
  visible: boolean;
}
const SpriteContext = createContext<SpriteValue>({
  localTime: 0,
  progress: 0,
  duration: 0,
  visible: false,
});
const useSprite = () => useContext(SpriteContext);

interface SpriteProps {
  start: number;
  end: number;
  keepMounted?: boolean;
  children: React.ReactNode;
}

function Sprite({ start, end, keepMounted = false, children }: SpriteProps) {
  const { time } = useTimeline();
  const visible = time >= start && time <= end;
  if (!visible && !keepMounted) return null;

  const duration = end - start;
  const localTime = Math.max(0, time - start);
  const progress =
    duration > 0 && isFinite(duration) ? clamp(localTime / duration, 0, 1) : 0;

  const value: SpriteValue = { localTime, progress, duration, visible };
  return (
    <SpriteContext.Provider value={value}>{children}</SpriteContext.Provider>
  );
}

// ── Primitives ─────────────────────────────────────────────────────────────

interface CircleMarkProps {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rotate?: number;
  color?: string;
  strokeWidth?: number;
  delay?: number;
  duration?: number;
}

function CircleMark({
  cx,
  cy,
  rx,
  ry,
  rotate = 0,
  color = ORANGE,
  strokeWidth = 4,
  delay = 0,
  duration = 0.6,
}: CircleMarkProps) {
  const { localTime } = useSprite();
  const t = clamp((localTime - delay) / duration, 0, 1);
  const eased = Easing.easeOutCubic(t);
  const perim = 2 * Math.PI * ((rx + ry) / 2);
  const dashOffset = perim * (1 - eased);
  return (
    <ellipse
      cx={cx}
      cy={cy}
      rx={rx}
      ry={ry}
      transform={`rotate(${rotate} ${cx} ${cy})`}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeDasharray={perim}
      strokeDashoffset={dashOffset}
      style={{ filter: `drop-shadow(0 0 6px ${color}40)` }}
    />
  );
}

interface ArrowMarkProps {
  d: string;
  color?: string;
  strokeWidth?: number;
  delay?: number;
  duration?: number;
  headAngle?: number;
  headX?: number;
  headY?: number;
}

function ArrowMark({
  d,
  color = ORANGE,
  strokeWidth = 3,
  delay = 0,
  duration = 0.5,
  headAngle = 0,
  headX,
  headY,
}: ArrowMarkProps) {
  const { localTime } = useSprite();
  const t = clamp((localTime - delay) / duration, 0, 1);
  const eased = Easing.easeOutCubic(t);
  const LEN = 1000;
  const dashOffset = LEN * (1 - eased);
  const headOpacity = t > 0.85 ? (t - 0.85) / 0.15 : 0;
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={LEN}
        strokeDashoffset={dashOffset}
      />
      {headX != null && headY != null && (
        <g
          transform={`translate(${headX} ${headY}) rotate(${headAngle})`}
          opacity={headOpacity}
        >
          <path
            d="M 0 0 L -14 -6 M 0 0 L -14 6"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </g>
      )}
    </g>
  );
}

interface HighlightSwipeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  delay?: number;
  duration?: number;
  opacity?: number;
}

function HighlightSwipe({
  x,
  y,
  width,
  height,
  color = ORANGE,
  delay = 0,
  duration = 0.35,
  opacity = 0.4,
}: HighlightSwipeProps) {
  const { localTime } = useSprite();
  const t = clamp((localTime - delay) / duration, 0, 1);
  const eased = Easing.easeOutQuad(t);
  return (
    <rect
      x={x}
      y={y}
      width={width * eased}
      height={height}
      rx={height / 2}
      fill={color}
      opacity={opacity}
    />
  );
}

interface FactCardProps {
  x: number;
  y: number;
  anchorX?: number | null;
  anchorY?: number | null;
  title: string;
  body?: string;
  tag?: string;
  color?: string;
  delay?: number;
  width?: number;
}

function FactCard({
  x,
  y,
  anchorX,
  anchorY,
  title,
  body,
  tag,
  color = ORANGE,
  delay = 0,
  width = 260,
}: FactCardProps) {
  const { localTime, duration } = useSprite();
  const entry = 0.45;
  const exit = 0.35;
  const exitStart = duration - exit;
  const rel = localTime - delay;

  let opacity = 0;
  let scale = 0.85;
  let translateY = 12;
  if (rel < 0) {
    opacity = 0;
  } else if (rel < entry) {
    const t = Easing.easeOutBack(clamp(rel / entry, 0, 1));
    opacity = clamp(rel / entry, 0, 1);
    scale = 0.85 + 0.15 * t;
    translateY = (1 - t) * 12;
  } else if (localTime > exitStart) {
    const t = Easing.easeInCubic(clamp((localTime - exitStart) / exit, 0, 1));
    opacity = 1 - t;
    scale = 1 - 0.05 * t;
    translateY = -t * 8;
  } else {
    opacity = 1;
    scale = 1;
    translateY = 0;
  }

  const lineDelay = delay + entry * 0.6;
  const lineT = clamp((localTime - lineDelay) / 0.35, 0, 1);
  const lineEased = Easing.easeOutCubic(lineT);
  const lineOpacity = localTime > exitStart ? opacity : lineT;
  const hasAnchor = anchorX != null && anchorY != null;

  return (
    <>
      {hasAnchor && (
        <svg
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            overflow: 'visible',
          }}
        >
          <line
            x1={x + (anchorX! > x + width / 2 ? width : 0)}
            y1={y + 20}
            x2={anchorX!}
            y2={anchorY!}
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray="6 4"
            pathLength={1}
            strokeDashoffset={1 - lineEased}
            opacity={lineOpacity * 0.8}
          />
          <circle
            cx={anchorX!}
            cy={anchorY!}
            r={5 * lineEased}
            fill={color}
            opacity={lineOpacity}
          />
          <circle
            cx={anchorX!}
            cy={anchorY!}
            r={10 * lineEased}
            fill="none"
            stroke={color}
            strokeWidth={2}
            opacity={lineOpacity * 0.5}
          />
        </svg>
      )}
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width,
          transform: `translateY(${translateY}px) scale(${scale})`,
          transformOrigin: 'top left',
          opacity,
          willChange: 'transform, opacity',
        }}
      >
        <div
          style={{
            background: 'rgba(11, 16, 32, 0.92)',
            border: `1.5px solid ${color}`,
            borderRadius: 10,
            padding: '10px 14px',
            boxShadow: `0 8px 24px rgba(0,0,0,0.4), 0 0 0 4px ${color}18`,
            backdropFilter: 'blur(8px)',
          }}
        >
          {tag && (
            <div
              style={{
                fontFamily: MONO,
                fontSize: 10,
                color,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: 4,
                fontWeight: 600,
              }}
            >
              {tag}
            </div>
          )}
          <div
            style={{
              fontFamily: SANS,
              fontSize: 16,
              color: INK,
              fontWeight: 700,
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
              marginBottom: body ? 4 : 0,
            }}
          >
            {title}
          </div>
          {body && (
            <div
              style={{
                fontFamily: SANS,
                fontSize: 12.5,
                color: 'rgba(245, 242, 234, 0.7)',
                lineHeight: 1.4,
              }}
            >
              {body}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

interface BigStatProps {
  x: number;
  y: number;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  duration?: number;
  color?: string;
}

function BigStat({
  x,
  y,
  value,
  prefix = '',
  suffix = '',
  label,
  duration = 1,
  color = ORANGE,
}: BigStatProps) {
  const { localTime, duration: sdur } = useSprite();
  const exit = 0.35;
  const exitStart = sdur - exit;
  const t = clamp(localTime / duration, 0, 1);
  const eased = Easing.easeOutCubic(t);
  // Only round integer counters. For fractional values (e.g. 1.7) keep one decimal.
  const isFractional = value % 1 !== 0;
  const current = isFractional
    ? Math.round(value * eased * 10) / 10
    : Math.round(value * eased);

  let opacity = 1;
  let scale = 1;
  if (localTime < 0.35) {
    const e = Easing.easeOutBack(clamp(localTime / 0.35, 0, 1));
    opacity = clamp(localTime / 0.35, 0, 1);
    scale = 0.8 + 0.2 * e;
  } else if (localTime > exitStart) {
    const e = Easing.easeInCubic(clamp((localTime - exitStart) / exit, 0, 1));
    opacity = 1 - e;
    scale = 1 + 0.05 * e;
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        textAlign: 'center',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontSize: 11,
          color,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontWeight: 600,
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: SANS,
          fontSize: 72,
          color: INK,
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1,
        }}
      >
        {prefix}
        {isFractional ? current.toFixed(1) : current.toLocaleString()}
        {suffix}
      </div>
    </div>
  );
}

interface ScreenSpriteProps {
  src: string;
  x?: number;
  y?: number;
  width: number;
  height: number;
  panFrom?: [number, number];
  panTo?: [number, number];
  scaleFrom?: number;
  scaleTo?: number;
}

function ScreenSprite({
  src,
  x = 0,
  y = 0,
  width,
  height,
  panFrom = [0, 0],
  panTo = [0, 0],
  scaleFrom = 1,
  scaleTo = 1,
}: ScreenSpriteProps) {
  const { localTime, duration, progress } = useSprite();
  const entry = 0.5;
  const exit = 0.4;
  const exitStart = duration - exit;

  let opacity = 1;
  if (localTime < entry) {
    opacity = Easing.easeOutCubic(clamp(localTime / entry, 0, 1));
  } else if (localTime > exitStart) {
    opacity =
      1 - Easing.easeInCubic(clamp((localTime - exitStart) / exit, 0, 1));
  }

  const p = progress;
  const px = panFrom[0] + (panTo[0] - panFrom[0]) * Easing.easeInOutSine(p);
  const py = panFrom[1] + (panTo[1] - panFrom[1]) * Easing.easeInOutSine(p);
  const sc = scaleFrom + (scaleTo - scaleFrom) * Easing.easeInOutSine(p);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        opacity,
        overflow: 'hidden',
        borderRadius: 12,
        boxShadow:
          '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',
      }}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: `${50 + px}% ${50 + py}%`,
          transform: `scale(${sc})`,
          transformOrigin: 'center',
        }}
      />
    </div>
  );
}

function IntroCard() {
  const { localTime, duration } = useSprite();
  const entry = 0.6;
  const exit = 0.5;
  const exitStart = duration - exit;
  let opacity = 1;
  let translateY = 0;
  if (localTime < entry) {
    const t = Easing.easeOutCubic(clamp(localTime / entry, 0, 1));
    opacity = t;
    translateY = (1 - t) * 20;
  } else if (localTime > exitStart) {
    const t = Easing.easeInCubic(clamp((localTime - exitStart) / exit, 0, 1));
    opacity = 1 - t;
    translateY = -t * 20;
  }
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontSize: 13,
          color: ORANGE,
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}
      >
        ● REC — Analysis session
      </div>
      <div
        style={{
          fontFamily: SANS,
          fontSize: 84,
          color: INK,
          fontWeight: 800,
          letterSpacing: '-0.045em',
          lineHeight: 0.95,
          textAlign: 'center',
        }}
      >
        Fun facts hiding
        <br />
        in a weight tracker
      </div>
      <div
        style={{
          fontFamily: SANS,
          fontSize: 18,
          color: 'rgba(245,242,234,0.55)',
          letterSpacing: '-0.01em',
        }}
      >
        Four screens · thirteen insights · one very tired spreadsheet
      </div>
    </div>
  );
}

function OutroCard() {
  const { localTime } = useSprite();
  const entry = 0.6;
  let opacity = 1;
  let translateY = 0;
  if (localTime < entry) {
    const t = Easing.easeOutCubic(clamp(localTime / entry, 0, 1));
    opacity = t;
    translateY = (1 - t) * 20;
  }
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          fontFamily: SANS,
          fontSize: 72,
          color: INK,
          fontWeight: 800,
          letterSpacing: '-0.045em',
          lineHeight: 0.95,
          textAlign: 'center',
        }}
      >
        Numbers tell stories.
        <br />
        <span style={{ color: ORANGE }}>Good UI reads them aloud.</span>
      </div>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 12,
          color: 'rgba(245,242,234,0.5)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginTop: 8,
        }}
      >
        end of transmission
      </div>
    </div>
  );
}

// ── Scenes ─────────────────────────────────────────────────────────────────

const SVG_OVERLAY: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
};

const ASSET = {
  dashboard: '/fun-facts/dashboard.png',
  table: '/fun-facts/table.png',
  log: '/fun-facts/log.png',
  meals: '/fun-facts/meals.png',
};

function SceneDashboard() {
  return (
    <>
      <ScreenSprite
        src={ASSET.dashboard}
        x={160}
        y={118}
        width={1600}
        height={845}
        scaleFrom={1.02}
        scaleTo={1.0}
      />
      <div
        style={{
          position: 'absolute',
          left: 160,
          top: 80,
          fontFamily: MONO,
          fontSize: 12,
          color: 'rgba(245,242,234,0.5)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}
      >
        exhibit 01 — the dashboard
      </div>

      <Sprite start={0.8} end={6.5}>
        <svg style={SVG_OVERLAY} width="1920" height="1080" viewBox="0 0 1920 1080">
          <CircleMark cx={321} cy={406} rx={86} ry={86} color={ORANGE} strokeWidth={4} delay={0} duration={0.7} />
        </svg>
        <FactCard
          x={440}
          y={340}
          anchorX={407}
          anchorY={406}
          tag="FACT #01"
          title="312 kcal left. That's one burrito bowl."
          body="The ring fills clockwise — 83% of today's budget is already gone by 2 PM. Classic."
          delay={0.6}
          width={290}
        />
      </Sprite>

      <Sprite start={2.2} end={7.5}>
        <svg style={SVG_OVERLAY} width="1920" height="1080" viewBox="0 0 1920 1080">
          <HighlightSwipe x={470} y={420} width={430} height={6} color={ORANGE} delay={0.1} duration={0.4} opacity={0.5} />
        </svg>
        <FactCard
          x={500}
          y={470}
          anchorX={690}
          anchorY={395}
          tag="FACT #02"
          title="Eaten > target + burned ÷ it's fine"
          body="1,908 in, 1,800 target, 420 out. Math says you're net negative. Vibes say pizza."
          delay={0}
          color={MINT}
          width={300}
        />
      </Sprite>

      <Sprite start={4} end={8.5}>
        <svg style={SVG_OVERLAY} width="1920" height="1080" viewBox="0 0 1920 1080">
          <CircleMark cx={1620} cy={355} rx={90} ry={28} rotate={-3} color={MINT} strokeWidth={3} delay={0} duration={0.6} />
        </svg>
        <FactCard
          x={1420}
          y={230}
          anchorX={1620}
          anchorY={340}
          tag="FACT #03"
          title="TDEE: 2,391 — 'high'"
          body="Translation: you walk a lot. Or you fidget. Science counts both."
          delay={0.2}
          color={MINT}
          width={260}
        />
      </Sprite>

      <Sprite start={5.8} end={9.8}>
        <svg style={SVG_OVERLAY} width="1920" height="1080" viewBox="0 0 1920 1080">
          <HighlightSwipe x={285} y={910} width={160} height={10} color={CORAL} delay={0.1} duration={0.4} opacity={0.55} />
          <ArrowMark
            d="M 900 890 Q 650 920 280 922"
            color={CORAL}
            strokeWidth={2.5}
            delay={0.3}
            duration={0.5}
            headX={282}
            headY={922}
            headAngle={180}
          />
        </svg>
        <FactCard
          x={930}
          y={835}
          anchorX={null}
          tag="FACT #04"
          title="Fat: 9g of 50g"
          body="You could eat an entire avocado right now and still be within budget. Just saying."
          delay={0.5}
          color={CORAL}
          width={310}
        />
      </Sprite>
    </>
  );
}

function SceneTable() {
  return (
    <>
      <ScreenSprite
        src={ASSET.table}
        x={160}
        y={140}
        width={1600}
        height={630}
        panFrom={[0, -5]}
        panTo={[0, 5]}
        scaleFrom={1.04}
        scaleTo={1.0}
      />
      <div
        style={{
          position: 'absolute',
          left: 160,
          top: 90,
          fontFamily: MONO,
          fontSize: 12,
          color: 'rgba(245,242,234,0.5)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}
      >
        exhibit 02 — 14 days of logs
      </div>

      <Sprite start={0.7} end={5.5}>
        <svg style={SVG_OVERLAY} width="1920" height="1080" viewBox="0 0 1920 1080">
          <CircleMark cx={1230} cy={440} rx={170} ry={95} rotate={-2} color={ORANGE} strokeWidth={4} delay={0} duration={0.8} />
        </svg>
        <FactCard
          x={230}
          y={800}
          anchorX={1060}
          anchorY={445}
          tag="FACT #05"
          title="14 days. 14 sessions. Zero rest."
          body="The 'Rest' rows say Rest but the stars say otherwise. Someone's lying to their app."
          delay={0.4}
          width={320}
        />
      </Sprite>

      <Sprite start={2.5} end={7}>
        <svg style={SVG_OVERLAY} width="1920" height="1080" viewBox="0 0 1920 1080">
          <HighlightSwipe x={905} y={250} width={95} height={500} color={MINT} delay={0.1} duration={0.5} opacity={0.15} />
          <rect x={905} y={250} width={95} height={500} fill="none" stroke={MINT} strokeWidth={2} strokeDasharray="4 4" rx={4} />
        </svg>
        <FactCard
          x={1050}
          y={820}
          anchorX={952}
          anchorY={745}
          tag="FACT #06"
          title="BURN column, meet the zero button"
          body="Runs burned 0. Rest days burned 500. Either the watch is broken or running is free now."
          delay={0.4}
          color={MINT}
          width={310}
        />
      </Sprite>

      <Sprite start={4.5} end={9}>
        <svg style={SVG_OVERLAY} width="1920" height="1080" viewBox="0 0 1920 1080">
          <ArrowMark
            d="M 575 760 Q 520 500 560 270"
            color={CORAL}
            strokeWidth={3}
            delay={0.2}
            duration={0.7}
            headX={560}
            headY={270}
            headAngle={-90}
          />
        </svg>
        <FactCard
          x={280}
          y={205}
          anchorX={null}
          tag="FACT #07"
          title="69.67 → 69.84 → 69.67"
          body="The weight yo-yo'd 0.2 kg and called it a Tuesday. Water weight is chaos theory."
          delay={0.6}
          color={CORAL}
          width={280}
        />
      </Sprite>
    </>
  );
}

function SceneLog() {
  return (
    <>
      <ScreenSprite
        src={ASSET.log}
        x={320}
        y={150}
        width={580}
        height={680}
        scaleFrom={1.0}
        scaleTo={1.02}
      />
      <div
        style={{
          position: 'absolute',
          left: 320,
          top: 105,
          fontFamily: MONO,
          fontSize: 12,
          color: 'rgba(245,242,234,0.5)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}
      >
        exhibit 03 — log by text
      </div>

      <Sprite start={0.6} end={3.8}>
        <BigStat
          x={1350}
          y={360}
          value={520}
          label="highest-cal recent"
          suffix=" kcal"
          color={ORANGE}
          duration={1.2}
        />
        <div
          style={{
            position: 'absolute',
            left: 1160,
            top: 440,
            width: 380,
            fontFamily: SANS,
            fontSize: 16,
            color: 'rgba(245,242,234,0.65)',
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          Chicken salad wrap is secretly a dinner in a tortilla disguise.
        </div>
      </Sprite>

      <Sprite start={3.5} end={7.5}>
        <svg style={SVG_OVERLAY} width="1920" height="1080" viewBox="0 0 1920 1080">
          <CircleMark cx={650} cy={580} rx={320} ry={115} rotate={-1} color={ORANGE} strokeWidth={4} delay={0} duration={0.8} />
        </svg>
        <FactCard
          x={1050}
          y={480}
          anchorX={970}
          anchorY={560}
          tag="FACT #08"
          title="The greatest hits playlist"
          body="Greek yogurt, oatmeal, protein bar, nuts, scrambled eggs, apple, wrap. Breakfast with extra steps."
          delay={0.4}
          width={330}
        />
      </Sprite>

      <Sprite start={5.5} end={9.5}>
        <svg style={SVG_OVERLAY} width="1920" height="1080" viewBox="0 0 1920 1080">
          <HighlightSwipe x={355} y={755} width={510} height={10} color={MINT} delay={0.1} duration={0.4} opacity={0.6} />
          <ArrowMark
            d="M 1100 790 Q 1000 790 880 790"
            color={MINT}
            strokeWidth={3}
            delay={0.3}
            duration={0.5}
            headX={880}
            headY={790}
            headAngle={180}
          />
        </svg>
        <FactCard
          x={1120}
          y={720}
          anchorX={null}
          tag="FACT #09"
          title="→ Analyze"
          body="Plain-text → macros in one button. Basically a calorie whisperer."
          delay={0.6}
          color={MINT}
          width={290}
        />
      </Sprite>
    </>
  );
}

function SceneMeals() {
  return (
    <>
      <ScreenSprite
        src={ASSET.meals}
        x={160}
        y={140}
        width={1600}
        height={630}
        panFrom={[-3, 0]}
        panTo={[3, 0]}
        scaleFrom={1.03}
        scaleTo={1.01}
      />
      <div
        style={{
          position: 'absolute',
          left: 160,
          top: 90,
          fontFamily: MONO,
          fontSize: 12,
          color: 'rgba(245,242,234,0.5)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}
      >
        exhibit 04 — the trend line never lies
      </div>

      <Sprite start={0.6} end={5.5}>
        <svg style={SVG_OVERLAY} width="1920" height="1080" viewBox="0 0 1920 1080">
          <CircleMark cx={890} cy={230} rx={45} ry={35} color={CORAL} strokeWidth={3.5} delay={0} duration={0.5} />
          <CircleMark cx={1655} cy={230} rx={45} ry={35} color={CORAL} strokeWidth={3.5} delay={0.15} duration={0.5} />
          <CircleMark cx={890} cy={295} rx={45} ry={35} color={CORAL} strokeWidth={3.5} delay={0.3} duration={0.5} />
        </svg>
        <FactCard
          x={340}
          y={380}
          anchorX={890}
          anchorY={230}
          tag="FACT #10"
          title="Three zeros. One snack."
          body="Breakfast: 0. Lunch: 0. Dinner: 0. Snack: 400. Living on protein bars and optimism."
          delay={0.5}
          color={CORAL}
          width={300}
        />
      </Sprite>

      <Sprite start={2.8} end={7.5}>
        <svg style={SVG_OVERLAY} width="1920" height="1080" viewBox="0 0 1920 1080">
          <ArrowMark
            d="M 335 475 Q 800 530 1540 615"
            color={MINT}
            strokeWidth={4}
            delay={0.1}
            duration={0.9}
            headX={1540}
            headY={615}
            headAngle={10}
          />
        </svg>
        <FactCard
          x={1260}
          y={430}
          anchorX={920}
          anchorY={540}
          tag="FACT #11"
          title="−0.51 kg per week, smoothed"
          body="29 days, one steady glide. Water noise stripped, vibes preserved."
          delay={0.6}
          color={MINT}
          width={310}
        />
      </Sprite>

      <Sprite start={5} end={9.5}>
        <svg style={SVG_OVERLAY} width="1920" height="1080" viewBox="0 0 1920 1080">
          <HighlightSwipe x={240} y={815} width={1480} height={6} color={ORANGE} delay={0.1} duration={0.5} opacity={0.4} />
          <CircleMark cx={275} cy={785} rx={50} ry={22} color={ORANGE} strokeWidth={3} delay={0.3} duration={0.5} />
        </svg>
        <FactCard
          x={600}
          y={875}
          anchorX={275}
          anchorY={808}
          tag="FACT #12"
          title="Water: 0 / 2500 ml"
          body="You're a plant. Plants need water. Drink it. +500 takes one click. Go."
          delay={0.6}
          color={ORANGE}
          width={320}
        />
      </Sprite>

      <Sprite start={7} end={10.5}>
        <BigStat
          x={960}
          y={540}
          value={1.7}
          suffix=" kg to goal"
          label="The finish line"
          color={MINT}
          duration={1}
        />
      </Sprite>
    </>
  );
}

// ── Show: top-level scene orchestration + persistent chrome ────────────────

function Show() {
  return (
    <>
      <Sprite start={0} end={3.5}>
        <IntroCard />
      </Sprite>

      <Sprite start={3.5} end={14}>
        <SceneDashboard />
      </Sprite>

      <Sprite start={14} end={24}>
        <SceneTable />
      </Sprite>

      <Sprite start={24} end={34}>
        <SceneLog />
      </Sprite>

      <Sprite start={34} end={45.5}>
        <SceneMeals />
      </Sprite>

      <Sprite start={45.5} end={50}>
        <OutroCard />
      </Sprite>

      <SceneChrome />
    </>
  );
}

function SceneChrome() {
  const time = useTime();
  let sceneLabel = '';
  if (time < 3.5) sceneLabel = '00 / intro';
  else if (time < 14) sceneLabel = '01 / dashboard';
  else if (time < 24) sceneLabel = '02 / daily log';
  else if (time < 34) sceneLabel = '03 / text input';
  else if (time < 45.5) sceneLabel = '04 / trends';
  else sceneLabel = '05 / outro';

  return (
    <>
      <div
        style={{
          position: 'absolute',
          right: 40,
          top: 40,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontFamily: MONO,
          fontSize: 11,
          color: 'rgba(245,242,234,0.4)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            background: ORANGE,
            boxShadow: `0 0 8px ${ORANGE}`,
            animation: 'funfacts-pulse 1.5s ease-in-out infinite',
          }}
        />
        fun facts · live feed
      </div>

      <div
        style={{
          position: 'absolute',
          left: 40,
          bottom: 40,
          fontFamily: MONO,
          fontSize: 11,
          color: 'rgba(245,242,234,0.4)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}
      >
        {sceneLabel}
      </div>

      <Timecode />
    </>
  );
}

function Timecode() {
  const time = useTime();
  const { duration } = useTimeline();
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60);
  const cs = Math.floor((time * 100) % 100);
  const str = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}:${String(cs).padStart(2, '0')}`;
  return (
    <div
      style={{
        position: 'absolute',
        right: 40,
        bottom: 40,
        fontFamily: MONO,
        fontSize: 11,
        color: 'rgba(245,242,234,0.4)',
        letterSpacing: '0.2em',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {str} / {Math.floor(duration / 60).toString().padStart(2, '0')}:
      {Math.floor(duration % 60).toString().padStart(2, '0')}:00
    </div>
  );
}

// ── Stage (canvas host + rAF loop) ─────────────────────────────────────────

const CANVAS_W = 1920;
const CANVAS_H = 1080;
const DURATION = 50;

interface StageHostProps {
  children: React.ReactNode;
}

function StageHost({ children }: StageHostProps) {
  const [time, setTime] = useState(0);
  const [scale, setScale] = useState(1);
  const [running, setRunning] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  // Auto-scale canvas to container width
  useLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      if (w > 0) setScale(w / CANVAS_W);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Pause offscreen / when tab hidden
  useEffect(() => {
    const host = wrapperRef.current;
    if (!host) return;
    let inView = false;
    let docVisible = !document.hidden;

    const update = () => setRunning(inView && docVisible);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) inView = e.isIntersecting;
        update();
      },
      { threshold: 0.15 }
    );
    io.observe(host);

    const onVis = () => {
      docVisible = !document.hidden;
      update();
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  // rAF time loop
  useEffect(() => {
    if (!running) {
      lastTsRef.current = null;
      return;
    }
    const step = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      setTime((t) => {
        let next = t + dt;
        if (next >= DURATION) next = next % DURATION;
        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [running]);

  const ctxValue = useMemo(() => ({ time, duration: DURATION }), [time]);

  return (
    <div ref={wrapperRef} style={{ width: '100%' }}>
      <style>{`
        @keyframes funfacts-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.3); }
        }
      `}</style>
      <div
        ref={frameRef}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: `${CANVAS_W} / ${CANVAS_H}`,
          background: BG,
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow:
            '0 20px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06)',
        }}
      >
        <div
          style={{
            width: CANVAS_W,
            height: CANVAS_H,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            position: 'absolute',
            top: 0,
            left: 0,
            color: INK,
            fontFamily: SANS,
          }}
        >
          <TimelineContext.Provider value={ctxValue}>
            {children}
          </TimelineContext.Provider>
        </div>
      </div>
    </div>
  );
}

// Public component
export default function FunFactsShow() {
  return (
    <StageHost>
      <Show />
    </StageHost>
  );
}
