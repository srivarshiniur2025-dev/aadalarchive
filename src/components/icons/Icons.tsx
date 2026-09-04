import { cn } from "@/lib/utils";

type IconProps = {
  className?: string;
  title?: string;
};

function base(props: IconProps & { children: React.ReactNode }) {
  const { className, title, children } = props;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-5 w-5", className)}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export const Icons = {
  Discover: (p: IconProps) =>
    base({
      ...p,
      children: (
        <>
          <circle cx="12" cy="12" r="7.5" />
          <circle cx="12" cy="12" r="2.2" />
          <path d="M12 4.5v2.2M12 17.3v2.2M4.5 12h2.2M17.3 12h2.2" />
        </>
      ),
    }),
  Explore: (p: IconProps) =>
    base({
      ...p,
      children: (
        <>
          <circle cx="11" cy="11" r="6.5" />
          <path d="M16 16l4.2 4.2" />
          <circle cx="11" cy="11" r="2" opacity="0.5" />
        </>
      ),
    }),
  Save: (p: IconProps) =>
    base({
      ...p,
      children: (
        <>
          <path d="M7 4.5h10v15l-5-3.2-5 3.2z" />
          <path d="M9 4.5v4.5l3-1.6 3 1.6V4.5" opacity="0.55" />
        </>
      ),
    }),
  Boards: (p: IconProps) =>
    base({
      ...p,
      children: (
        <>
          <rect x="4.5" y="5.5" width="12" height="14" rx="0.8" />
          <path d="M8.5 3.8h11v14" />
        </>
      ),
    }),
  Albums: (p: IconProps) =>
    base({
      ...p,
      children: (
        <>
          <rect x="5" y="7" width="12" height="11" rx="0.6" />
          <path d="M8 4.8h12.5v11.5" />
          <path d="M7.5 12.5l2.4-2.2 2.2 2 3.2-3.3" opacity="0.7" />
        </>
      ),
    }),
  Choreography: (p: IconProps) =>
    base({
      ...p,
      children: (
        <>
          <path d="M4 16c3-7 5-3 8-8 2.2 4 3.5 2 8 8" />
          <circle cx="12" cy="7" r="1.4" />
        </>
      ),
    }),
  Video: (p: IconProps) =>
    base({
      ...p,
      children: (
        <>
          <circle cx="12" cy="12" r="8" />
          <path d="M10 9.2l5.2 2.8-5.2 2.8z" fill="currentColor" stroke="none" />
        </>
      ),
    }),
  Upload: (p: IconProps) =>
    base({
      ...p,
      children: (
        <>
          <path d="M12 17V7" />
          <path d="M8.5 10.5 12 7l3.5 3.5" />
          <path d="M6 18.5h12" />
        </>
      ),
    }),
  Record: (p: IconProps) =>
    base({
      ...p,
      children: (
        <>
          <circle cx="12" cy="12" r="7.5" />
          <circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none" />
        </>
      ),
    }),
  Camera: (p: IconProps) =>
    base({
      ...p,
      children: (
        <>
          <rect x="3.5" y="7" width="17" height="11.5" rx="1.2" />
          <path d="M8 7l1.4-2.4h5.2L16 7" />
          <circle cx="12" cy="12.8" r="3" />
        </>
      ),
    }),
  Profile: (p: IconProps) =>
    base({
      ...p,
      children: (
        <>
          <circle cx="12" cy="7.2" r="2.4" />
          <path d="M8.5 20c.8-4.2 2.2-6.2 3.5-8.8 1.4 2.6 2.6 4.4 3.5 8.8" />
          <path d="M9.2 13.5h5.6" opacity="0.55" />
        </>
      ),
    }),
  Collaborators: (p: IconProps) =>
    base({
      ...p,
      children: (
        <>
          <circle cx="9" cy="8" r="2.2" />
          <circle cx="15.5" cy="8.5" r="1.8" />
          <path d="M4.8 18c.7-3.4 2-5 4.2-6.5" />
          <path d="M12.2 18c.5-2.6 1.5-4 3.3-5.2" />
        </>
      ),
    }),
  Comments: (p: IconProps) =>
    base({
      ...p,
      children: (
        <>
          <path d="M5 6.5h14v9.5H11l-3.5 3v-3H5z" />
          <path d="M8 10.2h8M8 13h5" opacity="0.55" />
        </>
      ),
    }),
  Notes: (p: IconProps) =>
    base({
      ...p,
      children: (
        <>
          <path d="M7 4.5h10v15H7z" />
          <path d="M9.5 8h5M9.5 11.5h5M9.5 15h3.5" />
        </>
      ),
    }),
  Search: (p: IconProps) =>
    base({
      ...p,
      children: (
        <>
          <circle cx="11" cy="11" r="6.2" />
          <path d="M16.2 16.2 20 20" />
        </>
      ),
    }),
  Notifications: (p: IconProps) =>
    base({
      ...p,
      children: (
        <>
          <path d="M12 4.2c-3.2 0-5.2 2.2-5.2 5.4 0 3.4-1.3 4.6-1.3 4.6h13s-1.3-1.2-1.3-4.6c0-3.2-2-5.4-5.2-5.4z" />
          <path d="M10.4 18.4a1.8 1.8 0 0 0 3.2 0" />
          <path d="M12 2.8v1.4" />
        </>
      ),
    }),
  Settings: (p: IconProps) =>
    base({
      ...p,
      children: (
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6.1 6.1l1.6 1.6M16.3 16.3l1.6 1.6M17.9 6.1l-1.6 1.6M7.7 16.3l-1.6 1.6" />
        </>
      ),
    }),
  Privacy: (p: IconProps) =>
    base({
      ...p,
      children: (
        <>
          <path d="M7 11h10v9H7z" />
          <path d="M9 11V8.2a3 3 0 0 1 6 0V11" />
          <circle cx="12" cy="15.5" r="1.1" />
        </>
      ),
    }),
  Share: (p: IconProps) =>
    base({
      ...p,
      children: (
        <>
          <circle cx="6.5" cy="12" r="2" />
          <circle cx="17" cy="7" r="2" />
          <circle cx="17" cy="17" r="2" />
          <path d="M8.4 11.2 15 8M8.4 12.8 15 16" />
        </>
      ),
    }),
  Download: (p: IconProps) =>
    base({
      ...p,
      children: (
        <>
          <path d="M12 5v10" />
          <path d="M8.5 11.5 12 15l3.5-3.5" />
          <circle cx="12" cy="18.5" r="1" fill="currentColor" stroke="none" />
        </>
      ),
    }),
  Close: (p: IconProps) =>
    base({
      ...p,
      children: <path d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5" />,
    }),
  Menu: (p: IconProps) =>
    base({
      ...p,
      children: (
        <>
          <path d="M4.5 8h15" />
          <path d="M4.5 12h11" />
          <path d="M4.5 16h13" />
        </>
      ),
    }),
  Back: (p: IconProps) =>
    base({
      ...p,
      children: <path d="M14.5 6.5 8 12l6.5 5.5" />,
    }),
  Forward: (p: IconProps) =>
    base({
      ...p,
      children: <path d="M9.5 6.5 16 12l-6.5 5.5" />,
    }),
  Filter: (p: IconProps) =>
    base({
      ...p,
      children: (
        <>
          <path d="M5 7h14" />
          <path d="M7.5 12h9" />
          <path d="M10 17h4" />
        </>
      ),
    }),
  Create: (p: IconProps) =>
    base({
      ...p,
      children: (
        <>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v8M8 12h8" />
        </>
      ),
    }),
  Home: (p: IconProps) =>
    base({
      ...p,
      children: (
        <>
          <path d="M4.5 11.5 12 5l7.5 6.5" />
          <path d="M7 10.8V19h10v-8.2" />
        </>
      ),
    }),
};
