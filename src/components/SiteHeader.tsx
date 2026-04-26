import { Link } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogIn, Truck } from "lucide-react";

export const SiteHeader = () => {
  const { data: settings } = useSiteSettings();
  const { user, isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full" style={{
      background: "linear-gradient(90deg, #0BB5E0 0%, #00c8ef 50%, #38EFF7 100%)",
      boxShadow: "0 4px 24px rgba(11,181,224,0.35)"
    }}>
      <div className="container flex h-20 items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center group">
          <img
            src="/logo.png"
            alt="PuffYaounde"
            style={{
              height: 52,
              width: "auto",
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
              transition: "transform 0.3s ease",
              borderRadius: "50%",
            }}
            className="group-hover:scale-105"
          />
        </Link>

        {/* Center badge */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full" style={{
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.3)"
        }}>
          <Truck size={14} color="white" />
          <span style={{
            color: "white",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: "0.72rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase"
          }}>
            Livraison disponible
          </span>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-3">
          {user && isAdmin ? (
            <Button asChild size="sm" style={{
              background: "rgba(255,255,255,0.2)",
              border: "2px solid rgba(255,255,255,0.5)",
              color: "white",
              backdropFilter: "blur(8px)",
              borderRadius: "999px",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700
            }}>
              <Link to="/admin">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          ) : (
            <Button asChild size="sm" style={{
              background: "rgba(255,255,255,0.15)",
              color: "white",
              border: "1.5px solid rgba(255,255,255,0.35)",
              borderRadius: "999px",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700
            }}>
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