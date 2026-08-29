import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FREE_SHIPPING_AT,
  PRODUCTS,
  SHIPPING_FLAT,
  fmt,
  type CategoryId,
  type Product,
} from "./data/products";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Shop, { type SortId } from "./components/Shop";
import ProductModal from "./components/ProductModal";
import CartDrawer, { type CartLine } from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import Footer from "./components/Footer";
import { BasketIcon, CheckIcon } from "./components/icons";

type CartMap = Record<string, number>;

interface Toast {
  id: number;
  kind: "cart" | "ok";
  title: string;
  sub?: string;
}

const CART_KEY = "ember-oak-cart";

function loadCart(): CartMap {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as CartMap;
    const clean: CartMap = {};
    for (const [id, qty] of Object.entries(parsed)) {
      if (PRODUCTS.some((p) => p.id === id) && typeof qty === "number" && qty > 0) {
        clean[id] = Math.min(10, Math.floor(qty));
      }
    }
    return clean;
  } catch {
    return {};
  }
}

export default function App() {
  const [cart, setCart] = useState<CartMap>(loadCart);
  const [cartPulse, setCartPulse] = useState(0);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [sort, setSort] = useState<SortId>("featured");
  const [active, setActive] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastSeq = useRef(0);

  /* ---------- persistence ---------- */
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* storage unavailable — cart lives for the session only */
    }
  }, [cart]);

  /* ---------- toasts ---------- */
  const pushToast = useCallback((kind: Toast["kind"], title: string, sub?: string) => {
    const id = ++toastSeq.current;
    setToasts((t) => [...t.slice(-2), { id, kind, title, sub }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3400);
  }, []);

  /* ---------- cart ops ---------- */
  const addToCart = useCallback(
    (product: Product, qty = 1) => {
      setCart((c) => ({ ...c, [product.id]: Math.min(10, (c[product.id] ?? 0) + qty) }));
      setCartPulse((n) => n + 1);
      pushToast("cart", `${product.name} added to basket`, `${qty} × ${product.weightG} g — ${fmt(product.price * qty)}`);
    },
    [pushToast],
  );

  const setQty = useCallback((id: string, qty: number) => {
    setCart((c) => {
      if (qty <= 0) {
        const { [id]: _removed, ...rest } = c;
        return rest;
      }
      return { ...c, [id]: Math.min(10, qty) };
    });
  }, []);

  const lines: CartLine[] = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({ product: PRODUCTS.find((p) => p.id === id), qty }))
        .filter((l): l is CartLine => Boolean(l.product)),
    [cart],
  );

  const cartCount = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce((n, l) => n + l.product.price * l.qty, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING_FLAT;

  /* ---------- filtering ---------- */
  const visible = useMemo(() => {
    let list = PRODUCTS.filter((p) => category === "all" || p.category === category);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) =>
        [p.name, p.origin, p.region, p.process, ...p.notes, ...p.notes].join(" ").toLowerCase().includes(q),
      );
    }
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "roast") sorted.sort((a, b) => a.roast - b.roast);
    return sorted;
  }, [query, category, sort]);

  /* ---------- overlays ---------- */
  const anyOverlay = Boolean(active) || cartOpen || checkoutOpen;
  useEffect(() => {
    document.body.style.overflow = anyOverlay ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [anyOverlay]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || checkoutOpen) return;
      if (active) setActive(null);
      else if (cartOpen) setCartOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, cartOpen, checkoutOpen]);

  const scrollToShop = () =>
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="relative min-h-screen overflow-x-clip">
      {/* ambient layered background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-44 -top-44 size-[560px] rounded-full bg-ember-600/12 blur-[130px]" />
        <div className="absolute -right-52 top-1/3 size-[620px] rounded-full bg-cherry-500/8 blur-[140px]" />
        <div className="absolute -bottom-24 left-1/4 size-[460px] rounded-full bg-moss-500/7 blur-[120px]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-roast-900 to-transparent" />
      </div>

      <div className="relative z-10">
        <Header
          cartCount={cartCount}
          cartPulse={cartPulse}
          query={query}
          onQuery={setQuery}
          onCartOpen={() => setCartOpen(true)}
        />

        <main>
          <Hero onAdd={(p) => addToCart(p)} onDetails={setActive} />
          <Shop
            items={visible}
            query={query}
            category={category}
            sort={sort}
            onCategory={setCategory}
            onSort={setSort}
            onClearFilters={() => {
              setQuery("");
              setCategory("all");
              setSort("featured");
            }}
            onDetails={setActive}
            onAdd={(p) => addToCart(p)}
          />
        </main>

        <Footer onNotify={(title, sub) => pushToast("ok", title, sub)} />
      </div>

      {/* overlays */}
      <ProductModal
        product={active}
        onClose={() => setActive(null)}
        onAdd={addToCart}
        onViewCart={() => {
          setActive(null);
          setCartOpen(true);
        }}
      />
      <CartDrawer
        open={cartOpen}
        lines={lines}
        subtotal={subtotal}
        shipping={shipping}
        onClose={() => setCartOpen(false)}
        onSetQty={setQty}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
        onBrowse={() => {
          setCartOpen(false);
          window.setTimeout(scrollToShop, 250);
        }}
      />
      <CheckoutModal
        open={checkoutOpen}
        lines={lines}
        total={subtotal + shipping}
        onClose={() => setCheckoutOpen(false)}
        onComplete={() => setCart({})}
      />

      {/* toasts */}
      <div className="pointer-events-none fixed bottom-5 left-4 z-[80] flex w-[calc(100%-2rem)] max-w-xs flex-col gap-2.5 sm:left-6">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex animate-rise items-start gap-3 rounded-xl border border-ember-500/25 bg-roast-800/95 px-4 py-3 shadow-xl shadow-black/50 backdrop-blur-sm"
            role="status"
          >
            <span
              className={`grid size-8 shrink-0 place-items-center rounded-full ${
                t.kind === "cart" ? "bg-ember-500/15 text-ember-400" : "bg-moss-500/15 text-moss-300"
              }`}
            >
              {t.kind === "cart" ? <BasketIcon className="size-4" /> : <CheckIcon className="size-4" />}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold text-cream-100">{t.title}</span>
              {t.sub && <span className="block text-xs text-cream-500">{t.sub}</span>}
            </span>
          </div>
        ))}
      </div>

      {/* film grain */}
      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[70] opacity-[0.05]" />
    </div>
  );
}
