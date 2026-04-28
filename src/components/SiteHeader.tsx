import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogIn, Search, ShoppingCart, Truck, ShieldCheck, CreditCard } from "lucide-react";
import logo from "@/assets/C.png";

export const SiteHeader = () => {
  const { user, isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="w-full bg-[#050505] py-2 border-b border-white/5">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-2 text-[10px] md:text-[11px] font-medium text-white/70">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Truck size={12} className="text-primary" />
              <span>Livraison rapide à Yaoundé & Douala</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 border-l border-white/10 pl-4">
              <ShieldCheck size={12} className="text-primary" />
              <span>Produits 100% authentiques</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <CreditCard size={12} className="text-primary" />
            <span>Paiement sécurisé (MTN MoMo / Orange Money)</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="w-full bg-[#0C0C0C]/90 backdrop-blur-md border-b border-white/5 shadow-2xl">
        <div className="container flex h-20 items-center justify-between gap-4">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="bg-white/5 rounded-full p-2 border border-white/10">
              <img
                src={logo}
                alt="CAMERPUFF"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col -gap-1">
              <span className="text-xl font-black tracking-tighter text-white leading-none">CAMER<span className="text-primary">PUFF</span></span>
              <span className="text-[7px] font-bold tracking-[0.2em] text-primary uppercase">Best vapes in Cameroon</span>
            </div>
          </Link>

          {/* Navigation - Centered */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-[12px] font-black uppercase tracking-widest text-primary">Accueil</Link>
            <a href="#collection" className="text-[12px] font-bold uppercase tracking-widest text-white/70 hover:text-primary transition-colors">Boutique</a>
            <a href="#" className="text-[12px] font-bold uppercase tracking-widest text-white/70 hover:text-primary transition-colors">À propos</a>
            <a href="#" className="text-[12px] font-bold uppercase tracking-widest text-white/70 hover:text-primary transition-colors">Livraison</a>
            <a href="#" className="text-[12px] font-bold uppercase tracking-widest text-white/70 hover:text-primary transition-colors">Contact</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-white/70 hover:text-primary transition-colors">
              <Search size={20} />
            </button>
            
            {/* <div className="relative p-2 text-white/70 hover:text-primary transition-colors cursor-pointer">
              <ShoppingCart size={20} />
              <span className="absolute top-0 right-0 bg-primary text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-black">0</span>
            </div> */}

            <div className="h-6 w-[1px] bg-white/10 mx-1 hidden sm:block"></div>

            {user && isAdmin ? (
              <Button asChild size="sm" variant="outline" className="rounded-full border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary text-[11px] font-bold">
                <Link to="/admin">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  ADMIN
                </Link>
              </Button>
            ) : (
              <Button asChild size="sm" variant="ghost" className="rounded-full text-white/50 hover:text-white hover:bg-white/5 text-[11px] font-bold">
                <Link to="/auth">
                  <LogIn className="mr-2 h-4 w-4" />
                  LOGIN
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
