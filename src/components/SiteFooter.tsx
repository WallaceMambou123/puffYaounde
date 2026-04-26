import { useSiteSettings } from "@/hooks/useSiteSettings";

export const SiteFooter = () => {
  const { data: settings } = useSiteSettings();
  return (
    <footer className="border-t border-border/60 bg-secondary/40 mt-24">
      <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start gap-4">
          <img 
            src="/logo.png" 
            alt="Puffs Cameroun" 
            className="h-16 w-auto object-contain brightness-110"
          />
          <p className="font-display text-sm text-gold tracking-[0.2em] uppercase">
            {settings?.shop_name ?? "Puffs Cameroun"}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} — Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};