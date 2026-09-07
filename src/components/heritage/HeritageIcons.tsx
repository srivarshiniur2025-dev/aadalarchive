import { cn } from "@/lib/utils";

type IconProps = { className?: string; title?: string };

function Svg({
  className,
  title,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-5 w-5", className)}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/** Refined classical-dance / temple line iconography */
export const HeritageIcons = {
  Home: (p: IconProps) => (
    <Svg {...p}>
      {/* Gopuram / doorway */}
      <path d="M5 20V9.5L12 4l7 5.5V20" />
      <path d="M9.5 20v-6h5v6" />
      <path d="M12 4v2.5" />
    </Svg>
  ),
  Explore: (p: IconProps) => (
    <Svg {...p}>
      {/* Lotus + eye */}
      <circle cx="12" cy="12" r="2.2" />
      <path d="M12 5.5c2.2 2 3.5 3.8 3.5 6.5S14.2 16.5 12 18.5C9.8 16.5 8.5 14.7 8.5 12S9.8 7.5 12 5.5Z" />
      <path d="M5.5 12h13" opacity="0.55" />
    </Svg>
  ),
  Discover: (p: IconProps) => (
    <Svg {...p}>
      {/* Ornamental search */}
      <circle cx="10.5" cy="10.5" r="5.2" />
      <path d="m14.8 14.8 4.2 4.2" />
      <path d="M10.5 7.8v5.4M7.8 10.5h5.4" opacity="0.55" />
    </Svg>
  ),
  Boards: (p: IconProps) => (
    <Svg {...p}>
      {/* Carved panel / collection */}
      <rect x="4.5" y="5" width="15" height="14" rx="1" />
      <path d="M4.5 9.5h15M9.5 9.5V19M14.5 9.5V19" />
    </Svg>
  ),
  Albums: (p: IconProps) => (
    <Svg {...p}>
      {/* Temple doorway / album frame */}
      <path d="M6 19V8.5C6 6.5 8.5 5 12 5s6 1.5 6 3.5V19" />
      <path d="M9 19v-5.5c0-1.2 1.3-2 3-2s3 .8 3 2V19" />
      <path d="M12 5v1.8" />
    </Svg>
  ),
  Choreography: (p: IconProps) => (
    <Svg {...p}>
      {/* Dancer silhouette line */}
      <circle cx="12" cy="5.5" r="1.6" />
      <path d="M12 7.5c-1.2 1.6-2.8 3.2-2.8 5.2 0 0 1.4.6 2.8.6s2.8-.6 2.8-.6C14.8 10.7 13.2 9.1 12 7.5Z" />
      <path d="M9.2 13.2 7 18.5M14.8 13.2 17 18.5M8 11.2H5.5M16 11.2h2.5" />
    </Svg>
  ),
  Practice: (p: IconProps) => (
    <Svg {...p}>
      {/* Salangai / ankle bells */}
      <path d="M5.5 14.5c1.2-2.5 3.5-4 6.5-4s5.3 1.5 6.5 4" />
      <circle cx="8" cy="15.5" r="1.3" />
      <circle cx="12" cy="16.2" r="1.3" />
      <circle cx="16" cy="15.5" r="1.3" />
      <path d="M7.2 10.5c1.4-1.2 3-1.8 4.8-1.8s3.4.6 4.8 1.8" opacity="0.55" />
    </Svg>
  ),
  Record: (p: IconProps) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="2.8" fill="currentColor" stroke="none" opacity="0.85" />
    </Svg>
  ),
  Save: (p: IconProps) => (
    <Svg {...p}>
      {/* Alapadma / open lotus mudra */}
      <path d="M12 19c0-3.2 2.2-5.5 2.2-8.5 0 0-2.2 1.2-2.2 3.5 0-2.3-2.2-3.5-2.2-3.5C9.8 13.5 12 15.8 12 19Z" />
      <path d="M7.5 15.5c1.8-1 3.2-1.2 4.5-.2M16.5 15.5c-1.8-1-3.2-1.2-4.5-.2" />
      <path d="M9 10.5c1.2-.8 2.2-1 3-.2M15 10.5c-1.2-.8-2.2-1-3-.2" />
    </Svg>
  ),
  Create: (p: IconProps) => (
    <Svg {...p}>
      {/* Anjali / namaskaram */}
      <path d="M8.5 18.5V9.5c0-2 1.4-3.5 3.5-3.5s3.5 1.5 3.5 3.5v9" />
      <path d="M8.5 12.5h7" />
      <path d="M10 6.5c.6-.8 1.3-1.2 2-1.2s1.4.4 2 1.2" />
    </Svg>
  ),
  Upload: (p: IconProps) => (
    <Svg {...p}>
      {/* Upward dancing hand */}
      <path d="M12 18.5V8" />
      <path d="M8.5 11.5 12 8l3.5 3.5" />
      <path d="M7 18.5h10" />
      <path d="M9.5 6.5c.8-.7 1.6-1 2.5-1s1.7.3 2.5 1" opacity="0.55" />
    </Svg>
  ),
  Profile: (p: IconProps) => (
    <Svg {...p}>
      {/* Ornamental portrait */}
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="10" r="2.4" />
      <path d="M7.8 17.2c1.2-2 2.6-2.8 4.2-2.8s3 0.8 4.2 2.8" />
    </Svg>
  ),
  Portfolio: (p: IconProps) => (
    <Svg {...p}>
      {/* Manuscript / inscription tablet */}
      <rect x="6" y="4.5" width="12" height="15" rx="1" />
      <path d="M9 8.5h6M9 12h6M9 15.5h4" />
    </Svg>
  ),
  Notifications: (p: IconProps) => (
    <Svg {...p}>
      {/* Temple bell */}
      <path d="M9 8.5c0-1.8 1.3-3 3-3s3 1.2 3 3c2.2.4 3.5 2 3.5 4.2V15H5.5v-2.3C5.5 10.5 6.8 8.9 9 8.5Z" />
      <path d="M10.5 15.2c0 1 .8 1.8 1.5 1.8s1.5-.8 1.5-1.8" />
      <path d="M12 5.5V4.2" />
    </Svg>
  ),
  Settings: (p: IconProps) => (
    <Svg {...p}>
      {/* Yantra / geometric wheel */}
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4.5v2.2M12 17.3v2.2M4.5 12h2.2M17.3 12h2.2M6.8 6.8l1.6 1.6M15.6 15.6l1.6 1.6M17.2 6.8l-1.6 1.6M8.4 15.6l-1.6 1.6" />
    </Svg>
  ),
  Search: (p: IconProps) => (
    <Svg {...p}>
      <circle cx="10.5" cy="10.5" r="5" />
      <path d="m14.6 14.6 4 4" />
      <path d="M10.5 8.2a2.3 2.3 0 0 1 2.3 2.3" opacity="0.5" />
    </Svg>
  ),
  Play: (p: IconProps) => (
    <Svg {...p}>
      {/* Movement-inspired play */}
      <path d="M9 7.5c2.5 1.8 5.2 3.5 7.2 4.5-2 1-4.7 2.7-7.2 4.5V7.5Z" />
      <path d="M7.5 6.5v11" opacity="0.4" />
    </Svg>
  ),
  Diya: (p: IconProps) => (
    <Svg {...p}>
      <path d="M8 15.5c1.2 1.5 2.5 2.2 4 2.2s2.8-.7 4-2.2c-1.5-.4-2.8-.4-4-.4s-2.5 0-4 .4Z" />
      <path d="M12 7.5c1.2 1.5 1.8 2.8 1.5 4.2-.8.2-1.5.2-1.5.2s-.7 0-1.5-.2C10.2 10.3 10.8 9 12 7.5Z" />
    </Svg>
  ),
  Bell: (p: IconProps) => (
    <Svg {...p}>
      <path d="M9 9c0-1.7 1.3-3 3-3s3 1.3 3 3c2 .5 3.2 2 3.2 4V14H5.8v-1C5.8 11 7 9.5 9 9Z" />
      <path d="M10.5 14.2c0 .9.7 1.6 1.5 1.6s1.5-.7 1.5-1.6" />
    </Svg>
  ),
  Lotus: (p: IconProps) => (
    <Svg {...p}>
      <path d="M12 18.5c0-3 2-5.2 2-8.2 0 0-2 1.1-2 3.3 0-2.2-2-3.3-2-3.3 0 3 2 5.2 2 8.2Z" />
      <path d="M7.5 14.8c1.6-.9 3-.9 4.5 0M16.5 14.8c-1.6-.9-3-.9-4.5 0" />
    </Svg>
  ),
  Archive: (p: IconProps) => (
    <Svg {...p}>
      <rect x="5" y="6" width="14" height="12" rx="1" />
      <path d="M5 10h14M9.5 13.5h5" />
    </Svg>
  ),
  Back: (p: IconProps) => (
    <Svg {...p}>
      <path d="M14.5 6.5 8.5 12l6 5.5" />
      <path d="M9 12h7.5" opacity="0.45" />
    </Svg>
  ),
  Forward: (p: IconProps) => (
    <Svg {...p}>
      <path d="M9.5 6.5 15.5 12l-6 5.5" />
      <path d="M7.5 12H15" opacity="0.45" />
    </Svg>
  ),
  Menu: (p: IconProps) => (
    <Svg {...p}>
      <path d="M5.5 7.5h13M5.5 12h13M5.5 16.5h13" />
    </Svg>
  ),
  Close: (p: IconProps) => (
    <Svg {...p}>
      <path d="M7 7 17 17M17 7 7 17" />
    </Svg>
  ),
  Mirror: (p: IconProps) => (
    <Svg {...p}>
      <path d="M12 4.5v15" />
      <path d="M5.5 8.5 12 12l6.5-3.5" />
      <path d="M5.5 15.5 12 12l6.5 3.5" opacity="0.55" />
    </Svg>
  ),
  Notes: (p: IconProps) => (
    <Svg {...p}>
      {/* Palm leaf */}
      <path d="M6.5 7.5c3-1.5 8-1.5 11 0v9c-3 1.5-8 1.5-11 0v-9Z" />
      <path d="M9 10.5h6M9 13.5h5" />
    </Svg>
  ),
  Logout: (p: IconProps) => (
    <Svg {...p}>
      <path d="M10 5.5H7.5A2 2 0 0 0 5.5 7.5v9a2 2 0 0 0 2 2H10" />
      <path d="M13 12h6.5M16.5 8.5 20 12l-3.5 3.5" />
    </Svg>
  ),
};
