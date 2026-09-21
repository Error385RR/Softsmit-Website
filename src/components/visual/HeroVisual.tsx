/** Decorative abstract illustration: a generic page wireframe plus a chat-style contact panel. No client work is depicted. */
export function HeroVisual({ className = "" }: { className?: string }) {
  const line = "fill-none stroke-line-strong";
  return (
    <svg viewBox="0 0 520 420" className={className} role="presentation" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="hero-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.1" className="fill-dot" />
        </pattern>
      </defs>
      <rect width="520" height="420" fill="url(#hero-dots)" />

      {/* Page wireframe */}
      <g>
        <rect x="30" y="34" width="350" height="290" rx="10" className="fill-bg stroke-line-strong" strokeWidth="1.5" pathLength={1} />
        <path d="M30 72h350" className={line} strokeWidth="1.5" />
        <circle cx="50" cy="53" r="4" className="fill-line-strong" />
        <circle cx="66" cy="53" r="4" className="fill-line-strong" />
        <circle cx="82" cy="53" r="4" className="fill-line-strong" />
        <rect x="56" y="98" width="170" height="14" rx="3" className="fill-fg" opacity="0.85" />
        <rect x="56" y="124" width="250" height="7" rx="3.5" className="fill-line-strong" />
        <rect x="56" y="139" width="210" height="7" rx="3.5" className="fill-line-strong" />
        <rect x="56" y="166" width="112" height="30" rx="6" className="fill-accent" />
        <rect x="56" y="224" width="90" height="70" rx="6" className={line} strokeWidth="1.5" />
        <rect x="160" y="224" width="90" height="70" rx="6" className={line} strokeWidth="1.5" />
        <rect x="264" y="224" width="90" height="70" rx="6" className={line} strokeWidth="1.5" />
      </g>

      {/* Contact panel */}
      <g>
        <rect x="318" y="150" width="152" height="250" rx="20" className="fill-bg stroke-accent" strokeWidth="1.8" />
        <rect x="336" y="184" width="96" height="32" rx="10" className="fill-surface stroke-line-strong" strokeWidth="1.2" />
        <rect x="360" y="230" width="92" height="32" rx="10" className="fill-accent" opacity="0.9" />
        <rect x="336" y="276" width="76" height="32" rx="10" className="fill-surface stroke-line-strong" strokeWidth="1.2" />
        <rect x="336" y="356" width="116" height="24" rx="12" className={line} strokeWidth="1.2" />
        <circle cx="440" cy="368" r="6" className="fill-amber" />
      </g>

      {/* Code glyphs */}
      <text x="406" y="70" className="fill-muted" fontWeight="500" fontSize="30">{"{ }"}</text>
      <text x="36" y="372" className="fill-muted" fontWeight="500" fontSize="26">{"</>"}</text>

      {/* Orchestrated moment: connector draws in once */}
      <path d="M380 200h-26" className="draw stroke-accent" strokeWidth="1.8" strokeLinecap="round" pathLength={1} fill="none" />
    </svg>
  );
}
