import { useRef, useState } from "react";
import { BasketIcon, BeanIcon, CloseIcon, SearchIcon } from "./icons";

interface HeaderProps {
  cartCount: number;
  cartPulse: number;
  query: string;
  onQuery: (q: string) => void;
  onCartOpen: () => void;
}

const scrollToShop = () =>
  document.getElementById("shop")?.scrollIntoView({ behavior: "smooth", block: "start" });

export default function Header({ cartCount, cartPulse, query, onQuery, onCartOpen }: HeaderProps) {
  const [mobileSearch, setMobileSearch] = useState(false);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  const searchField = (autoFocus = false) => (
    <div className="relative w-full">
      <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-cream-500" />
      <input
        ref={autoFocus ? mobileInputRef : undefined}
        autoFocus={autoFocus}
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && scrollToShop()}
        placeholder="Search roasts, origins, notes…"
        aria-label="Search coffee"
        className="w-full rounded-full border border-cream-100/10 bg-roast-850 py-2.5 pl-10 pr-9 text-sm text-cream-200 placeholder:text-cream-600 transition-colors focus:border-ember-500/60 focus:outline-none"
      />
      {query && (
        <button
          onClick={() => onQuery("")}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-cream-500 transition-colors hover:text-ember-300"
        >
          <CloseIcon className="size-3.5" />
        </button>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-cream-100/8 bg-roast-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:h-[72px] sm:gap-5 sm:px-6">
        {/* Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex shrink-0 items-center gap-2.5"
        >
          <span className="grid size-9 place-items-center rounded-full bg-ember-500 text-roast-950">
            <BeanIcon className="size-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm font-semibold tracking-[0.18em] text-cream-100 sm:text-base">
              EMBER &amp; OAK
            </span>
            <span className="block text-[10px] uppercase tracking-[0.3em] text-cream-500">
              Roastery · PDX
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm text-cream-400 lg:flex">
          <a href="#shop" className="transition-colors hover:text-ember-300">
            The Shelf
          </a>
          <a href="#brew" className="transition-colors hover:text-ember-300">
            Brew Guide
          </a>
          <a href="#visit" className="transition-colors hover:text-ember-300">
            Visit
          </a>
        </nav>

        {/* Desktop search */}
        <div className="hidden flex-1 justify-end md:flex">
          <div className="w-full max-w-sm">{searchField()}</div>
        </div>

        <button
          onClick={() => setMobileSearch((s) => !s)}
          aria-label="Toggle search"
          className="ml-auto rounded-full border border-cream-100/10 p-2.5 text-cream-300 transition-colors hover:border-ember-500/50 hover:text-ember-300 md:hidden"
        >
          {mobileSearch ? <CloseIcon className="size-4.5" /> : <SearchIcon className="size-4.5" />}
        </button>

        {/* Basket */}
        <button
          onClick={onCartOpen}
          aria-label={`Open basket, ${cartCount} items`}
          className="relative rounded-full border border-cream-100/10 p-2.5 text-cream-200 transition-all hover:border-ember-500/50 hover:text-ember-300 active:scale-95 md:ml-0"
        >
          <BasketIcon className="size-4.5" />
          {cartCount > 0 && (
            <span
              key={cartPulse}
              className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 animate-pop place-items-center rounded-full bg-ember-500 px-1 text-[11px] font-bold text-roast-950"
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {mobileSearch && (
        <div className="animate-rise border-t border-cream-100/8 px-4 py-3 md:hidden">
          {searchField(true)}
        </div>
      )}
    </header>
  );
}
