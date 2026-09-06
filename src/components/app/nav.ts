import { Icons } from "@/components/icons/Icons";

export const APP_NAV = [
  { href: "/home", label: "Home", icon: Icons.Home },
  { href: "/explore", label: "Explore", icon: Icons.Explore },
  { href: "/boards", label: "Boards", icon: Icons.Boards },
  { href: "/albums", label: "Albums", icon: Icons.Albums },
  { href: "/choreography", label: "Choreography", icon: Icons.Video },
  { href: "/studio", label: "Practice Studio", icon: Icons.Record },
  { href: "/profile", label: "My Profile", icon: Icons.Profile },
] as const;

export const APP_BOTTOM_NAV = [
  { href: "/home", label: "Home", icon: Icons.Home },
  { href: "/explore", label: "Explore", icon: Icons.Explore },
  { href: "/create", label: "Create", icon: Icons.Upload, isCreate: true },
  { href: "/boards", label: "Boards", icon: Icons.Boards },
  { href: "/profile", label: "Profile", icon: Icons.Profile },
] as const;

export const PAGE_META: Record<string, { title: string; subtitle: string }> = {
  "/home": { title: "Your practice space", subtitle: "Find your next movement" },
  "/explore": { title: "Explore", subtitle: "Walk the rooms of the archive" },
  "/discover": { title: "Discover", subtitle: "Find ideas for your next movement" },
  "/boards": { title: "Your Boards", subtitle: "Arrange the ideas that move you" },
  "/albums": { title: "Your Albums", subtitle: "Keep every stage memory close" },
  "/choreography": { title: "Choreography", subtitle: "Store the movement. Return anytime." },
  "/studio": { title: "Practice Studio", subtitle: "A quiet space for your next movement" },
  "/profile": { title: "My Profile", subtitle: "Your dance story" },
  "/notifications": { title: "Notifications", subtitle: "Gentle updates from your archive" },
  "/settings": { title: "Settings", subtitle: "Shape your practice space" },
};

export const CREATE_ACTIONS = [
  {
    id: "board",
    title: "New board",
    description: "Collect ideas for a feeling, performance, or practice goal.",
    href: "/boards?create=1",
  },
  {
    id: "album",
    title: "New album",
    description: "Keep the memories from one event in one place.",
    href: "/albums?create=1",
  },
  {
    id: "choreography",
    title: "Upload choreography",
    description: "Store a movement for your future self.",
    href: "/choreography?upload=1",
  },
  {
    id: "note",
    title: "Add practice note",
    description: "Leave a note for your next rehearsal.",
    href: "/studio?note=1",
  },
  {
    id: "record",
    title: "Record movement",
    description: "Capture a short study in Practice Studio.",
    href: "/studio?record=1",
  },
] as const;
