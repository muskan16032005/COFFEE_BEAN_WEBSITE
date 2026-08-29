import { useEffect, useState } from "react";
import {
  BREW_LABEL,
  ROAST_LABEL,
  categoryLabel,
  fmt,
  roastDateLabel,
  type BrewMethod,
  type Product,
} from "../data/products";
import { RoastDots } from "./Shop";
import {
  ArrowIcon,
  BatchIcon,
  CheckIcon,
  CloseIcon,
  EspressoIcon,
  MinusIcon,
  MountainIcon,
  PinIcon,
  PlusIcon,
  PouroverIcon,
  PressIcon,
} from "./icons";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAdd: (p: Product, qty: number) => void;
  onViewCart: () => void;
}

const BREW_ICON: Record<BrewMethod, typeof PouroverIcon> = {
  pourover: PouroverIcon,
  espresso: EspressoIcon,
  press: PressIcon,
  batch: BatchIcon,
};

export default function ProductModal({ product, onClose, onAdd, onViewCart }: ProductModalProps) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setQty(1);
    setAdded(false);
  }, [product?.id]);

  useEffect(() => {
    if (!added) return;
    const t = window.setTimeout(() => setAdded(false), 1600);
    return () => window.clearTimeout(t);
  }, [added]);

  if (!product) return null;

  const meta: [string, string][] = [
    ["Process", product.process],
    ["Altitude", product.altitude],
    ["Varietal", product.varietal],
  ];

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={`${product.name} details`}>
      <button
        aria-label="Close details"
        onClick={onClose}
        className="fixed inset-0 animate-fade cursor-default bg-roast-950/80 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-3xl animate-rise overflow-hidden rounded-xl border border-cream-100/12 bg-roast-900 shadow-2xl shadow-black/60">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3.5 top-3.5 z-10 rounded-full border border-cream-100/15 bg-roast-950/70 p-2 text-cream-300 backdrop-blur-sm transition-all hover:rotate-90 hover:border-ember-500/60 hover:text-ember-300"
        >
          <CloseIcon className="size-4" />
        </button>

        <div className="grid md:grid-cols-[0.9fr_1.1fr]">
          {/* image */}
          <div className="relative bg-roast-800">
            <img
              src={product.image}
              alt={`${product.name} coffee bag`}
              className="h-56 w-full object-cover sm:h-72 md:h-full"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-roast-950/50 to-transparent md:bg-gradient-to-r" />
            <span className="absolute left-4 top-4 rounded-full border border-ember-500/35 bg-roast-950/75 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-ember-300 backdrop-blur-sm">
              Roasted {roastDateLabel()}
            </span>
          </div>

          {/* details */}
          <div className="flex flex-col gap-5 p-6 sm:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-ember-500/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-ember-300">
                {categoryLabel(product.category)}
              </span>
              <span className="flex items-center gap-2 rounded-full bg-roast-850 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-cream-400">
                <RoastDots roast={product.roast} className="[&>svg]:size-3" />
                {ROAST_LABEL[product.roast]} roast
              </span>
            </div>

            <div>
              <h3 className="font-display text-3xl leading-tight text-cream-100">{product.name}</h3>
              <p className="mt-1.5 font-display text-base italic text-cream-400">{product.tagline}</p>
            </div>

            <p className="flex items-center gap-2 text-sm text-cream-500">
              <PinIcon className="size-4 shrink-0 text-ember-500" />
              {product.region}
            </p>

            <p className="flex items-baseline gap-2">
              <span className="font-display text-3xl text-ember-300">{fmt(product.price)}</span>
              <span className="text-sm text-cream-600">/ {product.weightG} g whole bean</span>
            </p>

            <p className="text-sm leading-relaxed text-cream-400">{product.description}</p>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cream-600">
                In the cup
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.notes.map((n) => (
                  <span
                    key={n}
                    className="rounded-full border border-ember-500/30 bg-ember-500/8 px-3.5 py-1 text-sm font-semibold capitalize text-cream-200"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-cream-100/8 bg-cream-100/8 sm:grid-cols-4">
              {[...meta, ["Roast", ROAST_LABEL[product.roast]]].map(([label, value]) => (
                <div key={label} className="bg-roast-850 px-3.5 py-3">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-cream-600">
                    {label}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-[13px] font-semibold text-cream-200">
                    {label === "Altitude" && <MountainIcon className="size-3.5 shrink-0 text-ember-500" />}
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cream-600">
                Best brewed as
              </p>
              <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-2">
                {product.brew.map((b) => {
                  const Icon = BREW_ICON[b];
                  return (
                    <span key={b} className="flex items-center gap-2 text-sm text-cream-300">
                      <Icon className="size-4.5 text-ember-400" />
                      {BREW_LABEL[b]}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* qty + add */}
            <div className="mt-auto flex flex-col gap-3 border-t border-cream-100/8 pt-5 sm:flex-row sm:items-center">
              <div className="flex shrink-0 items-center rounded-full border border-cream-100/15">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  aria-label="Decrease quantity"
                  className="p-3 text-cream-300 transition-colors hover:text-ember-300 disabled:opacity-25 disabled:hover:text-cream-300"
                >
                  <MinusIcon className="size-4" />
                </button>
                <span className="w-8 text-center font-display text-lg text-cream-100" aria-live="polite">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  disabled={qty >= 10}
                  aria-label="Increase quantity"
                  className="p-3 text-cream-300 transition-colors hover:text-ember-300 disabled:opacity-25 disabled:hover:text-cream-300"
                >
                  <PlusIcon className="size-4" />
                </button>
              </div>

              <button
                onClick={() => {
                  onAdd(product, qty);
                  setAdded(true);
                }}
                className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3 font-bold transition-all active:scale-[0.97] ${
                  added
                    ? "bg-moss-500 text-roast-950"
                    : "bg-ember-500 text-roast-950 hover:bg-ember-400 hover:shadow-lg hover:shadow-ember-500/25"
                }`}
              >
                {added ? (
                  <>
                    <CheckIcon className="size-4" /> In the basket
                  </>
                ) : (
                  <>Add {qty > 1 ? `${qty} bags` : "to basket"} — {fmt(product.price * qty)}</>
                )}
              </button>
            </div>

            <button
              onClick={onViewCart}
              className="group mx-auto flex items-center gap-2 text-sm font-semibold text-cream-500 transition-colors hover:text-ember-300"
            >
              View basket
              <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
