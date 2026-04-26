import { Link } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogIn } from "lucide-react";

export const SiteHeader = () => {
  const { data: settings } = useSiteSettings();
  const { user, isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight text-primary">
            {settings?.shop_name ?? "Les Vagues"}
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          {user && isAdmin ? (
            <Button asChild variant="outline" size="sm">
              <Link to="/admin">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Tableau de bord
              </Link>
            </Button>
          ) : (
            <Button asChild variant="ghost" size="sm">
              <Link to="/auth">
                <LogIn className="mr-2 h-4 w-4" />
                Espace admin
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};