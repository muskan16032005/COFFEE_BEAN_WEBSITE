import { FREE_SHIPPING_AT, fmt, type Product } from "../data/products";
import {
  ArrowIcon,
  BeanIcon,
  CheckIcon,
  CloseIcon,
  LockIcon,
  MinusIcon,
  PlusIcon,
  TruckIcon,
} from "./icons";

export interface CartLine {
  product: Product;
  qty: number;
}

interface CartDrawerProps {
  open: boolean;
  lines: CartLine[];
  subtotal: number;
  shipping: number;
  onClose: () => void;
  onSetQty: (id: string, qty: number) => void;
  onCheckout: () => void;
  onBrowse: () => void;
}

export default function CartDrawer({
  open,
  lines,
  subtotal,
  shipping,
  onClose,
  onSetQty,
  onCheckout,
  onBrowse,
}: CartDrawerProps) {
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const remaining = Math.max(0, FREE_SHIPPING_AT - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100);

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        aria-label="Close basket"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
        className={`absolute inset-0 cursor-default bg-roast-950/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-label="Shopping basket"
        className={`absolute right-0 top-0 flex h-full w-full flex-col border-l border-cream-100/10 bg-roast-900 shadow-2xl shadow-black/60 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] sm:max-w-[430px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-cream-100/8 px-5 py-4">
          <h2 className="font-display text-xl text-cream-100">
            Your basket{" "}
            <span className="ml-1 text-sm text-cream-500">
              {count} {count === 1 ? "item" : "items"}
            </span>
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            tabIndex={open ? 0 : -1}
            className="rounded-full border border-cream-100/12 p-2 text-cream-400 transition-all hover:rotate-90 hover:border-ember-500/50 hover:text-ember-300"
          >
            <CloseIcon className="size-4" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="grid flex-1 place-items-center p-8 text-center">
            <div>
              <BeanIcon className="mx-auto size-12 animate-drift text-roast-600" />
              <h3 className="mt-5 font-display text-2xl text-cream-200">Nothing brewing yet</h3>
              <p className="mx-auto mt-2 max-w-[240px] text-sm text-cream-500">
                Your basket is empty. The shelf, however, is full.
              </p>
              <button
                onClick={onBrowse}
                tabIndex={open ? 0 : -1}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-ember-500 px-6 py-3 font-bold text-roast-950 transition-all hover:bg-ember-400 active:scale-[0.97]"
              >
                Browse the shelf
                <ArrowIcon className="size-4" />
              </button>
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {lines.map(({ product, qty }) => (
                <li
                  key={product.id}
                  className="flex gap-3.5 rounded-xl border border-cream-100/6 bg-roast-850/60 p-3"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="size-[68px] shrink-0 rounded-lg border border-cream-100/10 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="truncate font-bold text-cream-100">{product.name}</p>
                        <p className="mt-0.5 text-xs text-cream-500">
                          {fmt(product.price)} · {product.weightG} g
                        </p>
                      </div>
                      <button
                        onClick={() => onSetQty(product.id, 0)}
                        aria-label={`Remove ${product.name}`}
                        className="rounded-full p-1.5 text-cream-600 transition-colors hover:bg-cherry-500/15 hover:text-cherry-400"
                      >
                        <CloseIcon className="size-3.5" />
                      </button>
                    </div>
                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-cream-100/15">
                        <button
                          onClick={() => onSetQty(product.id, qty - 1)}
                          aria-label="Decrease quantity"
                          className="p-1.5 text-cream-300 transition-colors hover:text-ember-300 active:scale-90"
                        >
                          <MinusIcon className="size-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm font-bold text-cream-100" aria-live="polite">
                          {qty}
                        </span>
                        <button
                          onClick={() => onSetQty(product.id, qty + 1)}
                          disabled={qty >= 10}
                          aria-label="Increase quantity"
                          className="p-1.5 text-cream-300 transition-colors hover:text-ember-300 active:scale-90 disabled:opacity-25"
                        >
                          <PlusIcon className="size-3.5" />
                        </button>
                      </div>
                      <p className="font-display text-base text-ember-300">
                        {fmt(product.price * qty)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="space-y-4 border-t border-cream-100/8 p-5">
              <div>
                {remaining > 0 ? (
                  <p className="flex items-center gap-2 text-xs text-cream-400">
                    <TruckIcon className="size-4 shrink-0 text-ember-400" />
                    Add <strong className="text-ember-300">{fmt(remaining)}</strong> more for free
                    shipping
                  </p>
                ) : (
                  <p className="flex items-center gap-2 text-xs font-semibold text-moss-300">
                    <CheckIcon className="size-4 shrink-0" />
                    Free shipping unlocked
                  </p>
                )}
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-roast-700">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      remaining > 0 ? "bg-ember-500" : "bg-moss-400"
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between text-cream-400">
                  <dt>Subtotal</dt>
                  <dd>{fmt(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-cream-400">
                  <dt>Shipping</dt>
                  <dd className={shipping === 0 ? "font-semibold text-moss-300" : ""}>
                    {shipping === 0 ? "Free" : fmt(shipping)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-cream-100/8 pt-2.5">
                  <dt className="font-bold text-cream-200">Total</dt>
                  <dd className="font-display text-xl text-ember-300">{fmt(subtotal + shipping)}</dd>
                </div>
              </dl>

              <button
                onClick={onCheckout}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-ember-500 py-3.5 font-bold text-roast-950 transition-all hover:bg-ember-400 hover:shadow-lg hover:shadow-ember-500/25 active:scale-[0.98]"
              >
                <LockIcon className="size-4" />
                Checkout · {fmt(subtotal + shipping)}
              </button>
              <p className="text-center text-[11px] text-cream-600">
                Demo storefront — no real payment is processed.
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
