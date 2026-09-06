"use client";

/**
 * Figma Make Explore design reference:
 * https://www.figma.com/make/20lMpdzXzgym7QrwfySQwO/Landing-page-design-recreation
 * fileKey: 20lMpdzXzgym7QrwfySQwO
 */

export const FIGMA_EXPLORE = {
  fileKey: "20lMpdzXzgym7QrwfySQwO",
  url: "https://www.figma.com/make/20lMpdzXzgym7QrwfySQwO/Landing-page-design-recreation",
  /** Mapped to AadalArchive theme tokens */
  gold: "#E5A93C",
  bg: "#15161A",
  cream: "#F4EBDD",
} as const;

export const FIGMA_CATEGORIES = [
  { id: "All", label: "All", image: "/explore/figma/cat-all.jpg", objectPosition: "50% 40%" },
  { id: "Temples", label: "Temples", image: "/explore/figma/cat-temples.jpg", objectPosition: "50% 40%" },
  { id: "Hastas", label: "Hastas", image: "/explore/figma/cat-hastas.jpg", objectPosition: "50% 35%" },
  { id: "Expressions", label: "Expressions", image: "/explore/figma/cat-expressions.jpg", objectPosition: "50% 25%" },
  { id: "Costumes", label: "Costumes", image: "/explore/figma/cat-costumes.jpg", objectPosition: "50% 40%" },
  { id: "Jewelry", label: "Jewelry", image: "/explore/figma/cat-jewelry.jpg", objectPosition: "50% 30%" },
  { id: "Salangai", label: "Salangai", image: "/explore/figma/cat-salangai.jpg", objectPosition: "50% 70%" },
  { id: "Poses", label: "Poses", image: "/explore/figma/cat-poses.jpg", objectPosition: "50% 25%" },
  { id: "Photography", label: "Photography", image: "/explore/figma/cat-photography.jpg", objectPosition: "50% 50%" },
  { id: "History", label: "History", image: "/explore/figma/cat-history.jpg", objectPosition: "50% 40%" },
] as const;

export type ExploreCategory = (typeof FIGMA_CATEGORIES)[number]["id"];

export const FIGMA_COLLECTIONS = [
  {
    id: "temples",
    title: "Temple Architecture",
    count: "112+ pieces",
    category: "Temples" as ExploreCategory,
    image: "/explore/figma/col-temple.jpg",
    objectPosition: "50% 45%",
    href: "/signup",
  },
  {
    id: "hastas",
    title: "Hastas & Mudras",
    count: "320+ pieces",
    category: "Hastas" as ExploreCategory,
    image: "/explore/figma/col-hastas.jpg",
    objectPosition: "50% 35%",
    href: "/signup",
  },
  {
    id: "expressions",
    title: "Expressions",
    count: "180+ pieces",
    category: "Expressions" as ExploreCategory,
    image: "/explore/figma/col-expressions.jpg",
    objectPosition: "50% 25%",
    href: "/signup",
  },
  {
    id: "costumes",
    title: "Costumes",
    count: "240+ pieces",
    category: "Costumes" as ExploreCategory,
    image: "/explore/figma/col-costumes.jpg",
    objectPosition: "50% 40%",
    href: "/signup",
  },
  {
    id: "salangai",
    title: "Salangai",
    count: "90+ pieces",
    category: "Salangai" as ExploreCategory,
    image: "/explore/figma/col-salangai.jpg",
    objectPosition: "50% 30%",
    href: "/signup",
  },
] as const;

export const FIGMA_FEATURED = "/explore/figma/featured.jpg";
export const FIGMA_CTA_BG = "/explore/figma/cta-bg.jpg";
