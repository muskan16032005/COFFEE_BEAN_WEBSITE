import { useEffect, useRef, useState } from "react";
import {
  BREW_LABEL,
  CATEGORIES,
  PRODUCTS,
  ROAST_LABEL,
  categoryLabel,
  fmt,
  type CategoryId,
  type Product,
} from "../data/products";
import Reveal from "./Reveal";
import {
  ArrowIcon,
  BatchIcon,
  BeanIcon,
  CheckIcon,
  ChevronIcon,
  EspressoIcon,
  MinusIcon,
  PlusIcon,
  PouroverIcon,
  PressIcon,
} from "./icons";

export type SortId = "featured" | "price-asc" | "price-desc" | "roast";

interface ShopProps {
  items: Product[];
  query: string;
  category: CategoryId | "all";
  sort: SortId;
  onCategory: (c: CategoryId | "all") => void;
  onSort: (s: SortId) => void;
  onClearFilters: () => void;
  onDetails: (p: Product) => void;
  onAdd: (p: Product) => void;
}

/* Five little beans showing roast depth */
export function RoastDots({ roast, className = "" }: { roast: Product["roast"]; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[3px] ${className}`} aria-label={`Roast level ${roast} of 5`}>
      {([1, 2, 3, 4, 5] as const).map((i) => (
        <BeanIcon
          key={i}
          className={`size-3.5 ${i <= roast ? "text-ember-400" : "text-roast-600"}`}
        />
      ))}
    </span>
  );
}

function ProductCard({
  product,
  index,
  onDetails,
  onAdd,
}: {
  product: Product;
  index: number;
  onDetails: (p: Product) => void;
  onAdd: (p: Product) => void;
}) {
  const [added, setAdded] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleAdd = () => {
    onAdd(product);
    setAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <Reveal delay={(index % 3) * 90}>
      <article
        role="button"
        tabIndex={0}
        onClick={() => onDetails(product)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onDetails(product);
          }
        }}
        className="group cursor-pointer overflow-hidden rounded-xl border border-cream-100/8 bg-roast-850 transition-all duration-300 hover:-translate-y-1.5 hover:border-ember-500/40 hover:shadow-xl hover:shadow-black/40"
      >
        <div className="relative aspect-square overflow-hidden bg-roast-800">
          <img
            src={product.image}
            alt={`${product.name} — ${product.origin} coffee bag`}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-roast-950/60 via-transparent to-transparent opacity-70" />
          <span className="absolute left-3.5 top-3.5 rounded-full border border-cream-100/12 bg-roast-950/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-cream-300 backdrop-blur-sm">
            {categoryLabel(product.category)}
          </span>
          <span
            className="absolute right-3.5 top-3.5 size-2.5 rounded-full ring-4 ring-roast-950/40"
            style={{ backgroundColor: product.accent }}
            aria-hidden
          />
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-[1.35rem] leading-tight text-cream-100 transition-colors group-hover:text-ember-300">
                {product.name}
              </h3>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cream-500">
                {product.origin}
              </p>
            </div>
            <p className="shrink-0 font-display text-lg text-ember-300">{fmt(product.price)}</p>
          </div>

          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {product.notes.map((n) => (
              <span
                key={n}
                className="rounded-full border border-cream-100/10 bg-roast-900/80 px-2.5 py-0.5 text-[11px] font-medium text-cream-400"
              >
                {n}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-cream-100/8 pt-4">
            <div>
              <RoastDots roast={product.roast} />
              <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-cream-600">
                {ROAST_LABEL[product.roast]} · {product.weightG} g
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAdd();
              }}
              aria-label={`Add ${product.name} to basket`}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold transition-all active:scale-90 ${
                added
                  ? "bg-moss-500 text-roast-950"
                  : "bg-ember-500 text-roast-950 hover:bg-ember-400 hover:shadow-lg hover:shadow-ember-500/25"
              }`}
            >
              {added ? (
                <>
                  <CheckIcon className="size-3.5" /> Added
                </>
              ) : (
                <>
                  <PlusIcon className="size-3.5" /> Add
                </>
              )}
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function BrewBand() {
  const methods = [
    {
      icon: PouroverIcon,
      name: "Pour-over",
      spec: "1 : 16",
      detail: "94°C · 250 ml · 2:45 total, bloom 40 s",
    },
    {
      icon: EspressoIcon,
      name: "Espresso",
      spec: "1 : 2",
      detail: "18 g in · 36 g out · 25–30 s",
    },
    {
      icon: PressIcon,
      name: "French press",
      spec: "1 : 14",
      detail: "Coarse grind · 96°C · 4:00 steep",
    },
    {
      icon: BatchIcon,
      name: "Batch brew",
      spec: "1 : 17",
      detail: "Medium grind · 93°C · drink it all",
    },
  ];
  return (
    <Reveal className="mt-16">
      <div id="brew" className="scroll-mt-24 rounded-xl border border-cream-100/8 bg-roast-900/70">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-cream-100/8 px-6 py-4">
          <h3 className="font-display text-xl text-cream-100">Brew it right</h3>
          <p className="text-xs uppercase tracking-[0.18em] text-cream-600">
            Ratios we stand behind
          </p>
        </div>
        <div className="grid divide-y divide-cream-100/8 sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
          {methods.map(({ icon: Icon, name, spec, detail }) => (
            <div key={name} className="group px-6 py-5 transition-colors hover:bg-roast-850/70">
              <div className="flex items-center justify-between">
                <Icon className="size-6 text-ember-400 transition-transform duration-300 group-hover:-translate-y-0.5" />
                <span className="font-display text-2xl text-cream-100">{spec}</span>
              </div>
              <p className="mt-3 font-bold text-cream-200">{name}</p>
              <p className="mt-1 text-xs leading-relaxed text-cream-500">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export default function Shop({
  items,
  query,
  category,
  sort,
  onCategory,
  onSort,
  onClearFilters,
  onDetails,
  onAdd,
}: ShopProps) {
  const counts = CATEGORIES.map((c) => ({
    ...c,
    count: PRODUCTS.filter((p) => p.category === c.id).length,
  }));

  return (
    <section id="shop" className="relative scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:pt-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.32em] text-ember-400">
                <span className="h-px w-10 bg-ember-500/60" />
                The shelf
              </p>
              <h2 className="mt-4 font-display text-3xl font-light text-cream-100 sm:text-[2.6rem] sm:leading-tight">
                Six roasts on the bench <em className="text-ember-400">this week.</em>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-cream-500">
              Every bag ships whole-bean, sealed with a one-way valve, stamped with its roast date.
            </p>
          </div>
        </Reveal>

        {/* toolbar */}
        <Reveal delay={80} className="mt-9">
          <div className="flex flex-wrap items-center gap-3">
            <div className="no-scrollbar -mx-1 flex flex-1 items-center gap-2 overflow-x-auto px-1 py-1">
              <button
                onClick={() => onCategory("all")}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all active:scale-95 ${
                  category === "all"
                    ? "border-ember-500 bg-ember-500 text-roast-950"
                    : "border-cream-100/12 text-cream-400 hover:border-ember-500/50 hover:text-ember-300"
                }`}
              >
                All beans · {PRODUCTS.length}
              </button>
              {counts.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onCategory(category === c.id ? "all" : c.id)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all active:scale-95 ${
                    category === c.id
                      ? "border-ember-500 bg-ember-500 text-roast-950"
                      : "border-cream-100/12 text-cream-400 hover:border-ember-500/50 hover:text-ember-300"
                  }`}
                >
                  {c.label} · {c.count}
                </button>
              ))}
            </div>

            <div className="relative">
              <select
                value={sort}
                onChange={(e) => onSort(e.target.value as SortId)}
                aria-label="Sort products"
                className="cursor-pointer appearance-none rounded-full border border-cream-100/12 bg-roast-850 py-2 pl-4 pr-10 text-sm font-semibold text-cream-300 transition-colors hover:border-ember-500/50 focus:border-ember-500/60 focus:outline-none"
              >
                <option value="featured">Sort · Featured</option>
                <option value="price-asc">Price · Low to high</option>
                <option value="price-desc">Price · High to low</option>
                <option value="roast">Roast · Light to dark</option>
              </select>
              <ChevronIcon className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-cream-500" />
            </div>
          </div>

          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-cream-600" aria-live="polite">
            Showing {items.length} of {PRODUCTS.length} roasts
            {query.trim() && (
              <>
                {" "}
                for <span className="text-ember-300">&ldquo;{query.trim()}&rdquo;</span>
              </>
            )}
          </p>
        </Reveal>

        {/* grid */}
        {items.length > 0 ? (
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} onDetails={onDetails} onAdd={onAdd} />
            ))}
          </div>
        ) : (
          <div className="mt-7 rounded-xl border border-dashed border-cream-100/15 py-24 text-center">
            <BeanIcon className="mx-auto size-12 animate-drift text-roast-600" />
            <h3 className="mt-5 font-display text-2xl text-cream-200">Nothing in the hopper</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-cream-500">
              No beans match that grind. Try a different word, or let the filters go.
            </p>
            <button
              onClick={onClearFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-ember-500/50 px-5 py-2.5 text-sm font-bold text-ember-300 transition-colors hover:bg-ember-500 hover:text-roast-950"
            >
              Clear search &amp; filters
            </button>
          </div>
        )}

        <BrewBand />
      </div>
    </section>
  );
}
