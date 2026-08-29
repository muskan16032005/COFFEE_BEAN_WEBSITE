import { useEffect, useState } from "react";
import { fmt } from "../data/products";
import type { CartLine } from "./CartDrawer";
import { ArrowIcon, CardIcon, CheckIcon, CloseIcon, LockIcon } from "./icons";

interface CheckoutProps {
  open: boolean;
  lines: CartLine[];
  total: number;
  onClose: () => void;
  onComplete: () => void;
}

interface OrderRecord {
  id: string;
  email: string;
  lines: CartLine[];
  total: number;
}

const EMPTY_FORM = {
  name: "",
  email: "",
  address: "",
  city: "",
  zip: "",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

type FormState = typeof EMPTY_FORM;

function Input({
  label,
  value,
  onChange,
  error,
  placeholder,
  inputMode,
  maxLength,
  autoComplete,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  inputMode?: "text" | "numeric" | "email";
  maxLength?: number;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-cream-500">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        maxLength={maxLength}
        autoComplete={autoComplete}
        className={`w-full rounded-lg border bg-roast-850 px-4 py-2.5 text-sm text-cream-100 placeholder:text-cream-600 transition-colors focus:outline-none ${
          error
            ? "border-cherry-500/70 focus:border-cherry-400"
            : "border-cream-100/12 focus:border-ember-500/70"
        }`}
      />
      {error && <span className="mt-1 block text-xs text-cherry-400">{error}</span>}
    </label>
  );
}

export default function CheckoutModal({ open, lines, total, onClose, onComplete }: CheckoutProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);
  const [order, setOrder] = useState<OrderRecord | null>(null);

  useEffect(() => {
    if (open) {
      setStep(0);
      setForm(EMPTY_FORM);
      setErrors({});
      setProcessing(false);
      setOrder(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open || processing) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, processing, onClose]);

  if (!open) return null;

  const set = (key: keyof FormState) => (v: string) => {
    setForm((f) => ({ ...f, [key]: v }));
    setErrors((e) => {
      if (!e[key]) return e;
      const { [key]: _drop, ...rest } = e;
      return rest;
    });
  };

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const submitShipping = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Please enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = "Enter a valid email";
    if (form.address.trim().length < 4) e.address = "Enter a street address";
    if (!form.city.trim()) e.city = "Required";
    if (form.zip.trim().length < 3) e.zip = "Required";
    setErrors(e);
    if (Object.keys(e).length === 0) setStep(1);
  };

  const submitPayment = () => {
    const e: Record<string, string> = {};
    if (form.cardName.trim().length < 2) e.cardName = "Name as printed on card";
    if (form.cardNumber.replace(/\s/g, "").length !== 16) e.cardNumber = "Card number needs 16 digits";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) e.expiry = "Use MM/YY";
    if (!/^\d{3,4}$/.test(form.cvc)) e.cvc = "3–4 digits";
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    const snapshotLines = lines;
    const snapshotTotal = total;
    const snapshotEmail = form.email.trim();
    setProcessing(true);
    window.setTimeout(() => {
      setOrder({
        id: `EMB-${String(Date.now()).slice(-6)}`,
        email: snapshotEmail,
        lines: snapshotLines,
        total: snapshotTotal,
      });
      setProcessing(false);
      setStep(2);
      onComplete();
    }, 1900);
  };

  const stepLabels = ["Shipping", "Payment", "Confirm"];

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto p-3 sm:p-6" role="dialog" aria-modal="true" aria-label="Checkout">
      <button
        aria-label="Close checkout"
        onClick={() => !processing && onClose()}
        className="fixed inset-0 animate-fade cursor-default bg-roast-950/85 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-lg animate-rise rounded-xl border border-cream-100/12 bg-roast-900 shadow-2xl shadow-black/60">
        <header className="flex items-center justify-between border-b border-cream-100/8 px-6 py-4">
          <div>
            <h2 className="font-display text-xl text-cream-100">Checkout</h2>
            <p className="text-[11px] uppercase tracking-[0.18em] text-cream-600">
              {step === 2 ? "Order confirmed" : `${lines.reduce((n, l) => n + l.qty, 0)} items · ${fmt(total)}`}
            </p>
          </div>
          {!processing && (
            <button
              onClick={onClose}
              aria-label="Close"
              className="rounded-full border border-cream-100/12 p-2 text-cream-400 transition-all hover:rotate-90 hover:border-ember-500/50 hover:text-ember-300"
            >
              <CloseIcon className="size-4" />
            </button>
          )}
        </header>

        {/* progress */}
        {step < 2 && (
          <div className="flex items-center gap-2 px-6 pt-5">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex flex-1 items-center gap-2 last:flex-none">
                <span
                  className={`grid size-7 shrink-0 place-items-center rounded-full border text-xs font-bold transition-colors ${
                    i < step
                      ? "border-ember-500 bg-ember-500 text-roast-950"
                      : i === step
                        ? "border-ember-500 text-ember-300"
                        : "border-cream-100/15 text-cream-600"
                  }`}
                >
                  {i < step ? <CheckIcon className="size-3.5" /> : i + 1}
                </span>
                <span
                  className={`text-xs font-semibold ${
                    i <= step ? "text-cream-200" : "text-cream-600"
                  }`}
                >
                  {label}
                </span>
                {i < stepLabels.length - 1 && (
                  <span
                    className={`h-px flex-1 ${i < step ? "bg-ember-500/60" : "bg-cream-100/10"}`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="px-6 py-5">
          {processing ? (
            <div className="grid place-items-center py-12 text-center">
              <div className="size-11 animate-spin rounded-full border-2 border-cream-100/15 border-t-ember-500" />
              <p className="mt-5 font-display text-lg text-cream-100">Contacting the roastery…</p>
              <p className="mt-1.5 text-xs text-cream-500">
                Simulated payment — nothing is charged, ever.
              </p>
            </div>
          ) : step === 0 ? (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                submitShipping();
              }}
            >
              <Input label="Full name" value={form.name} onChange={set("name")} error={errors.name} placeholder="Rowan Ashford" autoComplete="name" />
              <Input label="Email" value={form.email} onChange={set("email")} error={errors.email} placeholder="rowan@example.com" inputMode="email" autoComplete="email" />
              <Input label="Street address" value={form.address} onChange={set("address")} error={errors.address} placeholder="2214 SE Belmont St" autoComplete="street-address" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="City" value={form.city} onChange={set("city")} error={errors.city} placeholder="Portland" autoComplete="address-level2" />
                <Input label="ZIP" value={form.zip} onChange={set("zip")} error={errors.zip} placeholder="97214" inputMode="numeric" maxLength={10} autoComplete="postal-code" />
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-ember-500 py-3.5 font-bold text-roast-950 transition-all hover:bg-ember-400 hover:shadow-lg hover:shadow-ember-500/25 active:scale-[0.98]"
              >
                Continue to payment
                <ArrowIcon className="size-4" />
              </button>
            </form>
          ) : step === 1 ? (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                submitPayment();
              }}
            >
              <div className="flex items-center gap-3 rounded-lg border border-cream-100/10 bg-roast-850/70 px-4 py-3">
                <CardIcon className="size-5 shrink-0 text-ember-400" />
                <p className="text-xs leading-relaxed text-cream-400">
                  This is a demo — use any 16 digits, any future date, any CVC.
                </p>
              </div>
              <Input label="Name on card" value={form.cardName} onChange={set("cardName")} error={errors.cardName} placeholder="ROWAN ASHFORD" autoComplete="cc-name" />
              <Input label="Card number" value={form.cardNumber} onChange={(v) => set("cardNumber")(formatCard(v))} error={errors.cardNumber} placeholder="4242 4242 4242 4242" inputMode="numeric" maxLength={19} autoComplete="cc-number" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Expiry" value={form.expiry} onChange={(v) => set("expiry")(formatExpiry(v))} error={errors.expiry} placeholder="08/27" inputMode="numeric" maxLength={5} autoComplete="cc-exp" />
                <Input label="CVC" value={form.cvc} onChange={(v) => set("cvc")(v.replace(/\D/g, "").slice(0, 4))} error={errors.cvc} placeholder="123" inputMode="numeric" maxLength={4} autoComplete="cc-csc" />
              </div>
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="rounded-full border border-cream-100/15 px-5 py-3 text-sm font-semibold text-cream-300 transition-colors hover:border-ember-500/50 hover:text-ember-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ember-500 py-3 font-bold text-roast-950 transition-all hover:bg-ember-400 hover:shadow-lg hover:shadow-ember-500/25 active:scale-[0.98]"
                >
                  <LockIcon className="size-4" />
                  Pay {fmt(total)}
                </button>
              </div>
            </form>
          ) : order ? (
            <div className="py-2 text-center">
              <span className="mx-auto grid size-16 animate-pop place-items-center rounded-full bg-moss-500/15 text-moss-300">
                <CheckIcon className="size-8" />
              </span>
              <h3 className="mt-5 font-display text-2xl text-cream-100">Order confirmed</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-cream-400">
                Thanks, {order.email.split("@")[0]}. A receipt is on its way to{" "}
                <strong className="text-cream-200">{order.email}</strong> — your beans leave the
                roastery within 96 hours.
              </p>

              <div className="mt-5 rounded-lg border border-cream-100/10 bg-roast-850/70 p-4 text-left">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cream-600">
                  Order <span className="text-ember-300">{order.id}</span>
                </p>
                <ul className="mt-3 space-y-1.5">
                  {order.lines.map(({ product, qty }) => (
                    <li key={product.id} className="flex justify-between text-sm">
                      <span className="text-cream-300">
                        {qty} × {product.name}
                      </span>
                      <span className="text-cream-400">{fmt(product.price * qty)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex justify-between border-t border-cream-100/10 pt-2.5">
                  <span className="font-bold text-cream-200">Total paid</span>
                  <span className="font-display text-lg text-ember-300">{fmt(order.total)}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="mt-6 w-full rounded-full bg-ember-500 py-3.5 font-bold text-roast-950 transition-all hover:bg-ember-400 active:scale-[0.98]"
              >
                Back to the roastery
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
