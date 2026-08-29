import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";
import { ArrowIcon, BeanIcon, CheckIcon, ClockIcon, MailIcon, PinIcon } from "./icons";

interface FooterProps {
  onNotify: (title: string, sub?: string) => void;
}

export default function Footer({ onNotify }: FooterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("done");
    onNotify("You're on the roast list", "First pour: next Tuesday's roast log.");
  };

  return (
    <footer id="visit" className="relative mt-24 scroll-mt-20 border-t border-cream-100/8 bg-roast-900/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.32em] text-ember-400">
              <span className="h-px w-10 bg-ember-500/60" />
              The roast list
            </p>
            <h2 className="mt-4 font-display text-3xl font-light leading-tight text-cream-100 sm:text-4xl">
              Get Tuesday&rsquo;s roast log <em className="text-ember-400">before the beans cool.</em>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-cream-400">
              One email a week: what we roasted, what we cupped, and first dibs on micro-lots
              before they hit the shelf. No drip campaigns — just drip coffee.
            </p>

            {status === "done" ? (
              <p className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-moss-500/40 bg-moss-500/10 px-5 py-3 text-sm font-semibold text-moss-300">
                <CheckIcon className="size-4" />
                Subscribed — see you Tuesday.
              </p>
            ) : (
              <form onSubmit={subscribe} className="mt-6">
                <div className="flex max-w-md flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <MailIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-cream-500" />
                    <input
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      placeholder="you@example.com"
                      aria-label="Email address"
                      className={`w-full rounded-full border bg-roast-850 py-3 pl-11 pr-4 text-sm text-cream-100 placeholder:text-cream-600 transition-colors focus:outline-none ${
                        status === "error"
                          ? "border-cherry-500/70"
                          : "border-cream-100/12 focus:border-ember-500/70"
                      }`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-ember-500 px-6 py-3 font-bold text-roast-950 transition-all hover:bg-ember-400 active:scale-[0.97]"
                  >
                    Join the list
                    <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
                {status === "error" && (
                  <p className="mt-2 pl-2 text-xs text-cherry-400">
                    That email doesn&rsquo;t look quite brewed — try again?
                  </p>
                )}
              </form>
            )}
          </Reveal>

          <Reveal delay={120}>
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-cream-500">
                  The roastery
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-cream-400">
                  <li className="flex items-start gap-2.5">
                    <PinIcon className="mt-0.5 size-4 shrink-0 text-ember-500" />
                    2214 SE Belmont St
                    <br />
                    Portland, OR 97214
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ClockIcon className="mt-0.5 size-4 shrink-0 text-ember-500" />
                    <span>
                      Tue–Fri · 7a–4p
                      <br />
                      Sat–Sun · 8a–3p
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-cream-500">
                  Good to know
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-cream-400">
                  <li>Free shipping over $40</li>
                  <li>Orders ship Mon–Thu</li>
                  <li>30-day freshness promise</li>
                  <li>Subscriptions save 10%</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream-100/8 pt-6 text-xs text-cream-600 sm:flex-row">
          <p>© 2026 Ember &amp; Oak Roastery. All beans reserved.</p>
          <p className="flex items-center gap-2">
            Roasted on a 1962 Probat
            <BeanIcon className="size-3.5 text-ember-600" />
            with too much patience
          </p>
        </div>
      </div>
    </footer>
  );
}
