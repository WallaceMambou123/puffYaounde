import { useSiteSettings } from "@/hooks/useSiteSettings";
import { MapPin, Phone } from "lucide-react";

export const SiteFooter = () => {
  const { data: settings } = useSiteSettings();
  return (
    <footer style={{
      background: "linear-gradient(90deg,#0BB5E0 0%,#00c8ef 60%,#38EFF7 100%)",
      marginTop: "6rem",
      padding: "3rem 0 2rem",
    }}>
      <div className="container" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>

        {/* Logo */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <img
            src="/logo.png"
            alt="PuffYaounde"
            style={{
              height: 48, width: "auto", objectFit: "contain",
              filter: "brightness(0) invert(1)",
              borderRadius: "50%",
            }}
          />
          <div style={{ display: "none", gap: 6 }}>
            <div style={{ width: 18, height: 18, background: "#007A5E", borderRadius: 4 }} />
            <div style={{ width: 18, height: 18, background: "#CE1126", borderRadius: 4 }} />
            <div style={{ width: 18, height: 18, background: "#FCD116", borderRadius: 4 }} />
          </div>
        </div>

        {/* Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.85)" }}>
            <MapPin size={14} />
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.82rem" }}>Yaoundé, Cameroun</span>
          </div>
          {settings?.whatsapp_number && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.85)" }}>
              <Phone size={14} />
              <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.82rem" }}>{settings.whatsapp_number}</span>
            </div>
          )}
          <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.73rem", color: "rgba(255,255,255,0.65)", marginTop: 4 }}>
            Vapes premium • Livraison rapide • Qualité garantie
          </p>
        </div>

        <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.65)" }}>
          © {new Date().getFullYear()} {settings?.shop_name ?? "PuffYaounde"} — Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};