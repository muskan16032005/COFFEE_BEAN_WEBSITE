interface IconProps {
  className?: string;
}

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function BeanIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <ellipse cx="12" cy="12" rx="7" ry="9.6" transform="rotate(28 12 12)" />
      <path d="M10.4 4.6c4 3.6 4 11.2 0 14.8" transform="rotate(28 12 12)" />
    </svg>
  );
}

export function SearchIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <circle cx="10.5" cy="10.5" r="6.2" />
      <path d="m15.4 15.4 5 5" />
    </svg>
  );
}

export function BasketIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M4.2 9h15.6l-1.5 10.2a2 2 0 0 1-2 1.8H7.7a2 2 0 0 1-2-1.8L4.2 9Z" />
      <path d="M8.2 9V7.6a3.8 3.8 0 0 1 7.6 0V9" />
      <path d="M9.6 13v3.4M14.4 13v3.4" />
    </svg>
  );
}

export function PlusIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base} strokeWidth={2.2}>
      <path d="M12 5.5v13M5.5 12h13" />
    </svg>
  );
}

export function MinusIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base} strokeWidth={2.2}>
      <path d="M5.5 12h13" />
    </svg>
  );
}

export function CloseIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base} strokeWidth={2}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function ArrowIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base} strokeWidth={2}>
      <path d="M4 12h15M13.5 6l6 6-6 6" />
    </svg>
  );
}

export function CheckIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base} strokeWidth={2.4}>
      <path d="m4.5 12.8 5 5L19.5 7" />
    </svg>
  );
}

export function FlameIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M12 21c3.9 0 6.5-2.5 6.5-6.1 0-4.3-3.7-6.4-5-10.4-2.6 1.6-3.3 4.2-3.1 6.6-.9-.4-1.7-1.2-2-2.4-1.6 1.5-2.9 3.7-2.9 6.2C5.5 18.5 8.1 21 12 21Z" />
      <path d="M12 21c1.8 0 3-1.3 3-3 0-1.9-1.6-2.9-3-4.8-1.4 1.9-3 2.9-3 4.8 0 1.7 1.2 3 3 3Z" />
    </svg>
  );
}

export function LeafIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M19.5 4.5c-8.6.3-13.9 4-14.7 10.6-.2 1.8.2 3.4.9 4.4 4.6.3 8.7-1 11.2-4.4 2.1-2.8 2.8-6.8 2.6-10.6Z" />
      <path d="M5.8 19.4C8.5 14 12.5 9.5 17 7" />
    </svg>
  );
}

export function MountainIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="m3 19 6.5-11 3.2 5.2L15 9.5 21 19H3Z" />
      <path d="M14.8 3.6c.9 1.2.9 2.4 0 3.6M18.3 5.2c.6.8.6 1.6 0 2.4" />
    </svg>
  );
}

export function DropIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M12 3.5c3.4 4.2 6 7.6 6 11a6 6 0 0 1-12 0c0-3.4 2.6-6.8 6-11Z" />
      <path d="M9.4 14.6a2.8 2.8 0 0 0 2.4 2.7" />
    </svg>
  );
}

export function TruckIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M2.5 6.5h11v10h-11zM13.5 10h4.2l3 3.2v3.3h-2.7" />
      <circle cx="7" cy="17.5" r="1.9" />
      <circle cx="16.4" cy="17.5" r="1.9" />
      <path d="M9 16.5h5.5" />
    </svg>
  );
}

export function LockIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8.2 10.5V8a3.8 3.8 0 0 1 7.6 0v2.5" />
      <path d="M12 14.5v2" />
    </svg>
  );
}

export function CardIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <rect x="2.8" y="5.5" width="18.4" height="13" rx="2.2" />
      <path d="M2.8 9.6h18.4M6.4 14.8h4" />
    </svg>
  );
}

export function ChevronIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base} strokeWidth={2}>
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  );
}

export function StarIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor" stroke="none">
      <path d="m12 3.4 2.5 5.2 5.7.7-4.2 3.9 1.1 5.6L12 16l-5.1 2.8 1.1-5.6-4.2-3.9 5.7-.7L12 3.4Z" />
    </svg>
  );
}

/* ---- brew method icons ---- */

export function PouroverIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M6 5h12l-3.4 7H9.4L6 5Z" />
      <path d="M12 12v2.2" />
      <path d="M7.5 17.5h9l-.8 3H8.3l-.8-3Z" />
    </svg>
  );
}

export function EspressoIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M4 8h16v2.6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V8Z" />
      <path d="M20 9h.8a2.2 2.2 0 0 1 0 4.4H19" />
      <path d="M9.5 16.5v1.6M14.5 16.5v1.6" />
      <path d="M7 20.5h10" />
    </svg>
  );
}

export function PressIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M7 8h10v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V8Z" />
      <path d="M12 8V4.5M9.5 4.5h5" />
      <path d="M7 12h10" />
      <path d="M17 10.5h2.2v5H17" />
    </svg>
  );
}

export function BatchIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M7 8.5 6 20h12L17 8.5" />
      <path d="M6.4 13h11.2" />
      <path d="M9 5.5c.8 1 .8 2 0 3M12.5 4.5c.8 1.2.8 2.4 0 3.6M15.5 5.5c.6.8.6 1.6 0 2.4" />
    </svg>
  );
}

export function MailIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

export function PinIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M12 21s-6.8-6-6.8-11a6.8 6.8 0 0 1 13.6 0c0 5-6.8 11-6.8 11Z" />
      <circle cx="12" cy="9.8" r="2.4" />
    </svg>
  );
}

export function ClockIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 7.5V12l3 2.2" />
    </svg>
  );
}
