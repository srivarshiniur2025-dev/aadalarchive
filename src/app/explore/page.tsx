"use client";

import { useEffect } from "react";

/** Old /explore route → landing Explore section */
export default function ExploreRedirectPage() {
  useEffect(() => {
    window.location.replace("/#explore");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-charcoal text-cream/60">
      Opening Explore…
    </div>
  );
}
