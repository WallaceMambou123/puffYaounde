import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Search, Zap, Shield, Truck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard, type Product } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const Index = () => {
  const { data: settings } = useSiteSettings();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", "public"],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from("products")
        .select("id,title,description,price,currency,image_url,category")
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.category && set.add(p.category));
    return Array.from(set);
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.description ?? "").toLowerCase().includes(search.toLowerCase());
      const matchesCat = !activeCategory || p.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [products, search, activeCategory]);

  const shopName = settings?.shop_name ?? "PuffYaounde";
  const tagline = settings?.tagline ?? "Vapes Premium à Yaoundé";
  const whatsapp = settings?.whatsapp_number ?? "+237000000000";

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg,#e0f5ff 0%,#f5fbff 50%,#fff 100%)" }}>
      <SiteHeader />

      {/* Modal */}
      <ProductModal
        product={selectedProduct}
        whatsappNumber={whatsapp}
        shopName={shopName}
        onClose={() => setSelectedProduct(null)}
      />

      {/* HERO */}
      <section style={{
        position: "relative",
        overflow: "hidden",
        minHeight: 560,
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg,#0BB5E0 0%,#00c8ef 40%,#38EFF7 70%,#7FFFED 100%)",
        padding: "4rem 0 5rem",
      }}>
        {/* Decorative circles */}
        <div style={{ position:"absolute", width:320, height:320, borderRadius:"50%", background:"rgba(255,255,255,0.07)", top:-80, right:-60, pointerEvents:"none" }} />
        <div style={{ position:"absolute", width:180, height:180, borderRadius:"50%", background:"rgba(255,255,255,0.05)", bottom:-40, left:"15%", pointerEvents:"none" }} />
        <div style={{ position:"absolute", width:100, height:100, borderRadius:"50%", background:"rgba(255,255,255,0.08)", top:80, left:"5%", pointerEvents:"none" }} />

        <div className="container" style={{ position: "relative", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}
            >
              <div style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderRadius: 24,
                padding: "1.25rem 2.5rem",
                border: "2px solid rgba(255,255,255,0.4)",
                display: "inline-block",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              }}>
                <img
                  src="/logo.png"
                  alt="PuffYaounde"
                  style={{
                    height: 90,
                    width: "auto",
                    objectFit: "contain",
                    filter: "brightness(0) invert(1)",
                    display: "block",
                    borderRadius: "50%",
                  }}
                />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              style={{
                fontFamily: "'Montserrat',sans-serif",
                fontWeight: 900,
                fontSize: "clamp(1.8rem,5.5vw,3.5rem)",
                color: "white",
                marginBottom: "0.9rem",
                textShadow: "0 4px 20px rgba(0,0,0,0.12)",
                lineHeight: 1.1,
              }}
            >
              {tagline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                fontFamily: "'Montserrat',sans-serif",
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.88)",
                marginBottom: "2.5rem",
                maxWidth: 480,
                margin: "0 auto 2.5rem",
              }}
            >
              Découvrez notre collection — Bang, VapSolo et bien plus encore.
            </motion.p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "white",
                  color: "#0BB5E0",
                  fontFamily: "'Montserrat',sans-serif",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  borderRadius: "999px",
                  padding: "0.85rem 2.2rem",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                  display: "flex", alignItems: "center", gap: 8,
                }}
              >
                <Zap size={16} />
                Voir la collection
              </motion.button>

              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                href={`https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "rgba(255,255,255,0.18)",
                  color: "white",
                  fontFamily: "'Montserrat',sans-serif",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  borderRadius: "999px",
                  padding: "0.85rem 2.2rem",
                  border: "2px solid rgba(255,255,255,0.55)",
                  backdropFilter: "blur(8px)",
                  textDecoration: "none",
                }}
              >
                <Shield size={16} />
                Nous contacter
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Wave */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" fill="none" style={{ width: "100%", display: "block" }}>
            <path d="M0 60L80 50C160 40 320 20 480 15C640 10 800 20 960 30C1120 40 1280 50 1360 55L1440 60V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Features strip */}
      <section className="container" style={{ paddingTop: "3rem", paddingBottom: "1rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
          {[
            { Icon: Zap, label: "Produits authentiques", sub: "Marques certifiées" },
            { Icon: Truck, label: "Livraison rapide", sub: "Partout à Yaoundé" },
            { Icon: Shield, label: "Paiement sécurisé", sub: "Mobile Money accepté" },
          ].map(({ Icon, label, sub }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                background: "white",
                borderRadius: 16,
                padding: "1.1rem 1.6rem",
                boxShadow: "0 4px 20px rgba(11,181,224,0.08)",
                border: "1.5px solid rgba(11,181,224,0.1)",
                flex: 1, minWidth: 200,
              }}
            >
              <div style={{
                width: 44, height: 44,
                background: "linear-gradient(135deg,#e0f8ff,#c8f0ff)",
                borderRadius: 12,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Icon size={20} color="#0BB5E0" />
              </div>
              <div>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "0.88rem", color: "#0d2d3d" }}>{label}</p>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.73rem", color: "#8aabb5" }}>{sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* COLLECTION */}
      <section id="collection" className="container" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <p style={{
            fontFamily: "'Montserrat',sans-serif", fontWeight: 700,
            fontSize: "0.72rem", letterSpacing: "0.3em",
            color: "#0BB5E0", textTransform: "uppercase", marginBottom: 8,
          }}>
            Notre sélection
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
            <h2 style={{
              fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
              fontSize: "clamp(1.8rem,4vw,2.8rem)",
              background: "linear-gradient(90deg,#0BB5E0,#00D4FF)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              lineHeight: 1.1,
            }}>
              Nos Articles
            </h2>

            {/* Search */}
            <div style={{ position: "relative", width: "100%", maxWidth: 340 }}>
              <Search size={17} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#0BB5E0", pointerEvents: "none" }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Chercher un produit..."
                style={{
                  width: "100%", paddingLeft: 46, paddingRight: 16, height: 50,
                  background: "white",
                  border: "2px solid rgba(11,181,224,0.2)",
                  borderRadius: "999px",
                  fontFamily: "'Montserrat',sans-serif", fontSize: "0.88rem",
                  color: "#0d2d3d", outline: "none",
                  boxShadow: "0 4px 16px rgba(11,181,224,0.07)",
                  transition: "border-color 0.3s",
                }}
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = "#0BB5E0"}
                onBlur={e => (e.target as HTMLInputElement).style.borderColor = "rgba(11,181,224,0.2)"}
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: "2rem" }}>
            {[null, ...categories].map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(cat)}
                style={{
                  borderRadius: "999px",
                  padding: "0.45rem 1.2rem",
                  fontSize: "0.8rem",
                  fontFamily: "'Montserrat',sans-serif",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  border: "2px solid",
                  ...(activeCategory === cat
                    ? { background: "linear-gradient(90deg,#0BB5E0,#00D4FF)", color: "white", borderColor: "transparent", boxShadow: "0 4px 12px rgba(11,181,224,0.35)" }
                    : { background: "white", color: "#0BB5E0", borderColor: "rgba(11,181,224,0.3)" }),
                }}
              >
                {cat ?? "Tout"}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        {isLoading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 24 }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ aspectRatio: "4/5", background: "linear-gradient(135deg,#e8f8ff,#d0f0ff)", borderRadius: 20, opacity: 0.6 }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "5rem 2rem",
            border: "2px dashed rgba(11,181,224,0.25)",
            borderRadius: 24,
            background: "rgba(11,181,224,0.02)",
          }}>
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#0BB5E0", marginBottom: 8 }}>
              Aucun article pour l'instant
            </p>
            <p style={{ fontFamily: "'Montserrat',sans-serif", color: "#9bbcc7" }}>
              Les premières créations seront publiées très bientôt.
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 24 }}>
            {filtered.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                whatsappNumber={whatsapp}
                shopName={shopName}
                index={i}
                onOpen={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
};

export default Index;