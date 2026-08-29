import { fmt, PRODUCTS, type Product } from "../data/products";
import { ArrowIcon, BeanIcon, FlameIcon, StarIcon } from "./icons";

interface HeroProps {
  onAdd: (p: Product) => void;
  onDetails: (p: Product) => void;
}

const TICKER_ITEMS = [
  "Roasted every Tuesday",
  "Free shipping over $40",
  "Direct trade since 2016",
  "Ships within 96 h of roast",
  "14 partner farms",
  "1962 Probat UG-22",
  "Portland, Oregon",
];

const CURVE = "M10,38 C28,92 46,122 72,126 C104,131 136,106 174,88 C214,69 262,48 330,32";

function Ticker() {
  const row = (ariaHidden: boolean) => (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-8 pr-8"
    >
      {TICKER_ITEMS.map((item) => (
        <span key={item} className="flex items-center gap-8">
          <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.26em] text-cream-400">
            {item}
          </span>
          <BeanIcon className="size-3 shrink-0 text-ember-600/80" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden border-b border-cream-100/8 bg-roast-900/70 py-2.5">
      <div className="flex w-max animate-marquee">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

function SteamCup({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 84" fill="none" className={className} aria-hidden="true">
      <path
        d="M30 30c-2.5-4 2.5-6 0-11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="animate-steam-a origin-bottom"
      />
      <path
        d="M40 30c-2.5-4 2.5-6 0-11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="animate-steam-b origin-bottom"
      />
      <path
        d="M50 30c-2.5-4 2.5-6 0-11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="animate-steam-c origin-bottom"
      />
      <path
        d="M22 38h36v18a10 10 0 0 1-10 10H32a10 10 0 0 1-10-10V38Z"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <path d="M58 42h4a7 7 0 0 1 0 14h-4" stroke="currentColor" strokeWidth="2.4" />
      <path d="M14 72h52" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function RoastCurve() {
  return (
    <svg viewBox="0 0 340 172" className="w-full" role="img" aria-label="Roast profile curve">
      {[30, 62, 94, 126, 158].map((y) => (
        <line key={y} x1="8" x2="332" y1={y} y2={y} stroke="rgba(248,240,222,0.07)" strokeWidth="1" />
      ))}
      {[
        ["220°", 33],
        ["190°", 65],
        ["160°", 97],
        ["130°", 129],
        ["100°", 161],
      ].map(([t, y]) => (
        <text key={t} x="8" y={Number(y)} fontSize="9" fill="rgba(201,174,135,0.55)">
          {t}
        </text>
      ))}
      {(
        [
          ["0:00", 36, "start"],
          ["4:00", 138, "middle"],
          ["8:00", 240, "middle"],
          ["11:48", 332, "end"],
        ] as [string, number, "start" | "middle" | "end"][]
      ).map(([t, x, anchor]) => (
        <text
          key={t}
          x={x}
          y="171"
          fontSize="9"
          fill="rgba(201,174,135,0.55)"
          textAnchor={anchor}
        >
          {t}
        </text>
      ))}

      {/* the curve itself, drawn in on load */}
      <path
        d={CURVE}
        fill="none"
        stroke="#e29240"
        strokeWidth="2.6"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="1"
        className="animate-draw"
      />
      <path d={CURVE} fill="none" stroke="rgba(226,146,64,0.16)" strokeWidth="8" strokeLinecap="round" />

      {/* first crack marker */}
      <circle cx="250" cy="52" r="3.6" fill="#d16a55" />
      <text x="250" y="40" fontSize="9.5" fill="#d16a55" textAnchor="middle" fontStyle="italic">
        first crack
      </text>

      {/* travelling heat dot */}
      <g>
        <circle r="9" fill="rgba(238,172,96,0.22)" />
        <circle r="4" fill="#eeac60" />
        <animateMotion dur="7s" repeatCount="indefinite" path={CURVE} />
      </g>
    </svg>
  );
}

export default function Hero({ onAdd, onDetails }: HeroProps) {
  const featured = PRODUCTS.find((p) => p.id === "copper-ridge") ?? PRODUCTS[0];

  return (
    <>
      <Ticker />
      <section id="top" className="relative overflow-hidden">
        {/* ambient rings + drifting beans */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 size-96 rounded-full border-[26px] border-ember-500/6" />
          <div className="absolute -right-10 -top-10 size-64 rounded-full border-[18px] border-cherry-500/6" />
          <div className="absolute -left-20 bottom-6 size-72 rounded-full border-[22px] border-moss-500/5" />
          <BeanIcon className="absolute left-[8%] top-24 size-7 animate-drift text-cream-100/10" />
          <BeanIcon className="absolute left-[46%] top-10 size-5 animate-drift text-ember-500/15 [animation-delay:2s]" />
          <BeanIcon className="absolute bottom-14 left-[30%] size-6 animate-drift text-cream-100/8 [animation-delay:5s]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:pt-16">
          {/* copy */}
          <div className="relative">
            <SteamCup className="absolute -top-8 right-0 hidden w-24 text-ember-400/70 lg:block" />
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.32em] text-ember-400">
              <span className="h-px w-10 bg-ember-500/60" />
              Portland, OR — roasting since 2016
            </p>
            <h1 className="mt-6 font-display text-[2.7rem] font-light leading-[1.02] text-cream-100 sm:text-6xl xl:text-[4.6rem]">
              Small-batch coffee,
              <br />
              <em className="font-normal text-ember-400">roasted the slow way.</em>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-cream-400 sm:text-lg">
              We buy fourteen lots a year from farms we can name, roast them every Tuesday on a
              1962 Probat, and ship them within 96 hours. If it isn&rsquo;t fresh, it isn&rsquo;t
              ours.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#shop"
                className="group inline-flex items-center gap-2.5 rounded-full bg-ember-500 px-7 py-3.5 font-bold text-roast-950 transition-all hover:bg-ember-400 hover:shadow-lg hover:shadow-ember-500/25 active:scale-[0.97]"
              >
                Browse the shelf
                <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#visit"
                className="inline-flex items-center gap-2 rounded-full border border-cream-100/15 px-6 py-3.5 text-sm font-semibold text-cream-300 transition-colors hover:border-ember-500/50 hover:text-ember-300"
              >
                Visit the roastery
              </a>
            </div>

            <dl className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
              {[
                ["14", "partner farms"],
                ["96 h", "roast-to-door"],
                ["4.9", "from 2,140 cups"],
              ].map(([value, label], i) => (
                <div key={label} className={i > 0 ? "border-l border-cream-100/10 pl-8" : ""}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="flex items-baseline gap-2">
                    <span className="font-display text-3xl text-cream-100">{value}</span>
                    {value === "4.9" && <StarIcon className="size-4 translate-y-0.5 text-ember-400" />}
                    <span className="text-xs uppercase tracking-[0.14em] text-cream-500">{label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* roast log card */}
          <div className="relative">
            <div className="absolute -inset-3 -z-10 rounded-2xl bg-gradient-to-br from-ember-500/12 via-transparent to-cherry-500/10 blur-sm" />
            <div className="rounded-xl border border-cream-100/10 bg-roast-900/85 p-5 shadow-2xl shadow-black/50 backdrop-blur-sm sm:p-6">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-cream-500">
                  Roast log · Batch №128
                </p>
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-moss-300">
                  <span className="size-2 animate-pulse-dot rounded-full bg-moss-400" />
                  cooling
                </p>
              </div>

              <button
                onClick={() => onDetails(featured)}
                className="mt-3 block text-left transition-opacity hover:opacity-80"
              >
                <span className="font-display text-2xl italic text-cream-100 sm:text-[1.7rem]">
                  {featured.name}
                </span>
                <span className="mt-1 flex items-center gap-2 text-sm text-cream-500">
                  <FlameIcon className="size-4 text-ember-500" />
                  {featured.origin} — house espresso
                </span>
              </button>

              <div className="mt-4">
                <RoastCurve />
              </div>

              <div className="mt-4 grid grid-cols-4 divide-x divide-cream-100/8 rounded-lg border border-cream-100/8 bg-roast-850/70 text-center">
                {[
                  ["199°C", "charge"],
                  ["96°C", "turn"],
                  ["9:42", "1st crack"],
                  ["212°C", "drop"],
                ].map(([v, l]) => (
                  <div key={l} className="px-1 py-3">
                    <p className="font-display text-base text-ember-300 sm:text-lg">{v}</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-cream-600">{l}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onAdd(featured)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-ember-500 py-3 font-bold text-roast-950 transition-all hover:bg-ember-400 hover:shadow-lg hover:shadow-ember-500/25 active:scale-[0.98]"
              >
                Add this roast — {fmt(featured.price)}
              </button>
              <p className="mt-3 text-center text-[11px] tracking-wide text-cream-600">
                Roasted Tuesday · at your door by Friday
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
