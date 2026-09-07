import { AppShell } from "@/components/app/AppShell";
import "@/components/app/app-temple.css";
import { getCurrentProfile, profileToUser } from "@/lib/services/profiles";
import { CURRENT_USER } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user = CURRENT_USER;

  if (isSupabaseConfigured()) {
    const profile = await getCurrentProfile();
    if (profile) {
      user = profileToUser(profile);
    }
  }

  return <AppShell user={user}>{children}</AppShell>;
}
