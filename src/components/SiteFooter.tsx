import { useSiteSettings } from "@/hooks/useSiteSettings";

export const SiteFooter = () => {
  const { data: settings } = useSiteSettings();
  return (
    <footer className="border-t border-border/60 bg-secondary/40 mt-24">
      <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-display text-xl text-primary">
          {settings?.shop_name ?? "Les Vagues"}
        </p>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} — Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};