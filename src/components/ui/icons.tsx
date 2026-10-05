import type { AdvantageIcon } from "@/content/profile";

type IconProps = React.SVGProps<SVGSVGElement>;

function Stroke({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowIcon({ direction = "right", ...props }: IconProps & { direction?: "right" | "out" }) {
  return (
    <Stroke {...props}>
      {direction === "right" ? (
        <path d="M5 12h14M13 6l6 6-6 6" />
      ) : (
        <path d="M7 17 17 7M8 7h9v9" />
      )}
    </Stroke>
  );
}

export const CopyIcon = (props: IconProps) => (
  <Stroke {...props}>
    <rect x="8" y="8" width="12" height="12" rx="2" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </Stroke>
);

export const CheckIcon = (props: IconProps) => (
  <Stroke {...props}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Stroke>
);

export const MenuIcon = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M4 9h16M4 15h16" />
  </Stroke>
);

export const CloseIcon = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Stroke>
);

export const ReplayIcon = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M4 12a8 8 0 1 0 2.4-5.7L4 8.5" />
    <path d="M4 4v4.5h4.5" />
  </Stroke>
);

export const MailIcon = (props: IconProps) => (
  <Stroke {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Stroke>
);

export const TelegramIcon = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M21.5 4.5 2.5 11.5l7 2.5 2.5 7 3.5-5 5 3.5z" />
    <path d="m9.5 14 12-9.5" />
  </Stroke>
);

export const GitHubIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-1.97c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

const advantagePaths: Record<AdvantageIcon, React.ReactNode> = {
  gauge: (
    <>
      <path d="M3.5 16a8.5 8.5 0 1 1 17 0" />
      <path d="m12 16 4.5-5" />
      <circle cx="12" cy="16" r="1.25" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 19 6v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  puzzle: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <path d="M17.5 14v7M14 17.5h7" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.5 2.5 2.5L16 9.5" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </>
  ),
};

export function AdvantageGlyph({ name, ...props }: IconProps & { name: AdvantageIcon }) {
  return <Stroke {...props}>{advantagePaths[name]}</Stroke>;
}
