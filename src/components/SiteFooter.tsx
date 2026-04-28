import { useSiteSettings } from "@/hooks/useSiteSettings";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from "lucide-react";
import logo from "@/assets/C.png";

export const SiteFooter = () => {
  const { data: settings } = useSiteSettings();
  const whatsapp = settings?.whatsapp_number ?? "+237 6XX XXX XXX";

  return (
    <footer className="bg-[#050505] pt-20 pb-10 border-t border-white/5">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Col */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-white/5 rounded-full p-2 border border-white/10 shrink-0">
                <img src={logo} alt="CAMERPUFF" className="h-8 w-auto" />
              </div>
              <span className="text-xl font-black tracking-tighter text-white">CAMER<span className="text-primary">PUFF</span></span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed font-medium">
              Votre boutique numéro 1 de puffs authentiques au Cameroun. Livraison rapide à Yaoundé & Douala.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-primary hover:bg-white/10 transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-primary hover:bg-white/10 transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-primary hover:bg-white/10 transition-all">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Liens Rapides</h4>
            <ul className="flex flex-col gap-4">
              <li><a href="#" className="text-white/40 hover:text-primary transition-colors text-sm font-medium">Accueil</a></li>
              <li><a href="#collection" className="text-white/40 hover:text-primary transition-colors text-sm font-medium">Boutique</a></li>
              <li><a href="#" className="text-white/40 hover:text-primary transition-colors text-sm font-medium">À propos</a></li>
              <li><a href="#" className="text-white/40 hover:text-primary transition-colors text-sm font-medium">Livraison</a></li>
              <li><a href="#" className="text-white/40 hover:text-primary transition-colors text-sm font-medium">Contact</a></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Informations</h4>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-3 text-white/40">
                <MapPin size={18} className="text-primary shrink-0" />
                <span className="text-sm font-medium">Yaoundé & Douala, Cameroun</span>
              </li>
              <li className="flex items-start gap-3 text-white/40">
                <Phone size={18} className="text-primary shrink-0" />
                <span className="text-sm font-medium">{whatsapp}</span>
              </li>
              <li className="flex items-start gap-3 text-white/40">
                <Mail size={18} className="text-primary shrink-0" />
                <span className="text-sm font-medium">contact@camerpuff.com</span>
              </li>
              <li className="flex items-start gap-3 text-white/40">
                <Clock size={18} className="text-primary shrink-0" />
                <span className="text-sm font-medium">Lun - Dim : 8h - 22h</span>
              </li>
            </ul>
          </div>

          {/* Payment */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Paiement Accepté</h4>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white rounded-lg p-2 h-12 flex items-center justify-center border border-white/10 shrink-0">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/MTN_Logo.svg" alt="MTN MoMo" className="h-6 w-auto" />
                <span className="text-[8px] font-black text-black ml-1 leading-none uppercase">MTN<br/>Money</span>
              </div>
              <div className="bg-white rounded-lg p-2 h-12 flex items-center justify-center border border-white/10 shrink-0">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/2048px-Orange_logo.svg.png" alt="Orange Money" className="h-6 w-auto" />
                <span className="text-[8px] font-black text-black ml-1 leading-none uppercase">Orange<br/>Money</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/20 text-[11px] font-bold">
            © {new Date().getFullYear()} CamerPuff. Tous droits réservés.
          </p>
          <div className="flex items-center gap-8 text-[11px] font-bold text-white/20">
            <a href="#" className="hover:text-primary">Mentions légales</a>
            <a href="#" className="hover:text-primary">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};