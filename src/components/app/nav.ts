import { HeritageIcons } from "@/components/heritage/HeritageIcons";

export const NAV_GROUPS = [
  {
    id: "main",
    label: "Main",
    items: [
      { href: "/home", label: "Home", icon: HeritageIcons.Home },
      { href: "/explore", label: "Explore", icon: HeritageIcons.Explore },
      { href: "/discover", label: "Discover", icon: HeritageIcons.Discover },
    ],
  },
  {
    id: "create",
    label: "Create",
    items: [
      { href: "/boards", label: "Boards", icon: HeritageIcons.Boards },
      { href: "/albums", label: "Events / Albums", icon: HeritageIcons.Albums },
      { href: "/choreography", label: "Choreography", icon: HeritageIcons.Choreography },
      { href: "/studio", label: "Practice Studio", icon: HeritageIcons.Practice },
    ],
  },
  {
    id: "personal",
    label: "Personal",
    items: [
      { href: "/saved", label: "Saved", icon: HeritageIcons.Save },
      { href: "/portfolio", label: "Portfolio", icon: HeritageIcons.Portfolio },
      { href: "/profile", label: "Profile", icon: HeritageIcons.Profile },
    ],
  },
] as const;

export const APP_NAV = NAV_GROUPS.flatMap((g) => [...g.items]);

export const APP_BOTTOM_NAV = [
  { href: "/home", label: "Home", icon: HeritageIcons.Home },
  { href: "/explore", label: "Explore", icon: HeritageIcons.Explore },
  { href: "/create", label: "Create", icon: HeritageIcons.Create, isCreate: true },
  { href: "/boards", label: "Boards", icon: HeritageIcons.Boards },
  { href: "/profile", label: "Profile", icon: HeritageIcons.Profile },
] as const;

export const PAGE_META: Record<string, { title: string; subtitle: string }> = {
  "/home": { title: "Home", subtitle: "Your private dance archive" },
  "/explore": { title: "Explore", subtitle: "Rooms that open live dance searches" },
  "/discover": { title: "Discover", subtitle: "Dancer-aware inspiration, ideas & research" },
  "/boards": { title: "Boards", subtitle: "Collections of ideas that move you" },
  "/albums": { title: "Events / Albums", subtitle: "Performance memory archives" },
  "/choreography": { title: "Choreography", subtitle: "Movement studies & references" },
  "/studio": { title: "Practice Studio", subtitle: "A private rehearsal hall" },
  "/saved": { title: "Saved", subtitle: "Inspiration waiting for rehearsal" },
  "/portfolio": { title: "Portfolio", subtitle: "Your archival dance identity" },
  "/profile": { title: "Profile", subtitle: "Classical dancer portfolio" },
  "/notifications": { title: "Notifications", subtitle: "Gentle updates from the archive" },
  "/settings": { title: "Settings", subtitle: "Shape your practice space" },
};

export const CREATE_ACTIONS = [
  {
    id: "board",
    title: "New board",
    description: "Collect ideas for a feeling, performance, or practice goal.",
    href: "/boards?create=1",
    icon: HeritageIcons.Boards,
  },
  {
    id: "album",
    title: "New event",
    description: "Keep the memories from one event in one place.",
    href: "/albums?create=1",
    icon: HeritageIcons.Albums,
  },
  {
    id: "choreography",
    title: "Upload choreography",
    description: "Store a movement for your future self.",
    href: "/choreography?upload=1",
    icon: HeritageIcons.Upload,
  },
  {
    id: "record",
    title: "Capture practice",
    description: "Capture a short study in Practice Studio.",
    href: "/studio?record=1",
    icon: HeritageIcons.Practice,
  },
] as const;
