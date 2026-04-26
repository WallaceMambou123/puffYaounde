import { Link } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogIn } from "lucide-react";

export const SiteHeader = () => {
  const { data: settings } = useSiteSettings();
  const { user, isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-md">
      {/* Cameroon Flag Line at the very top */}
      <div className="flag-line flex h-1 w-full">
        <div className="h-full w-1/3 bg-[#007A5E]" />
        <div className="h-full w-1/3 bg-[#CE1126]" />
        <div className="h-full w-1/3 bg-[#FCD116]" />
      </div>
      
      <div className="container flex h-20 items-center justify-between border-b border-border/40">
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="/logo.png" 
            alt="Puffs Cameroun" 
            className="h-16 w-auto object-contain transition-all duration-500 group-hover:scale-110 drop-shadow-2xl"
          />
        </Link>
        <nav className="flex items-center gap-3">
          {user && isAdmin ? (
            <Button asChild variant="outline" size="sm" className="border-primary/50 text-primary hover:bg-primary/10">
              <Link to="/admin">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Tableau de bord
              </Link>
            </Button>
          ) : (
            <Button asChild variant="ghost" size="sm" className="text-gold/80 hover:text-gold hover:bg-gold/10">
              <Link to="/auth">
                <LogIn className="mr-2 h-4 w-4" />
                Admin
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};