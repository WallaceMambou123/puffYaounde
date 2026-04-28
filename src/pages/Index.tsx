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
import logo from "@/assets/C.png";
import heroImage from "@/assets/img1.png";

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
    <div className="min-h-screen bg-[#0A0A0A]">
      <SiteHeader />

      {/* Modal */}
      <ProductModal
        product={selectedProduct}
        whatsappNumber={whatsapp}
        shopName={shopName}
        onClose={() => setSelectedProduct(null)}
      />

      {/* HERO */}
      <section className="relative min-h-[600px] md:min-h-[80vh] flex items-center overflow-hidden bg-[#0A0A0A]">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -ml-24 -mb-24"></div>
        
        {/* Glow Ring behind product */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-primary/20 rounded-full hidden lg:block"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-primary/10 rounded-full hidden lg:block"></div>

        <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-12 bg-primary"></div>
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] md:text-[12px]">Puffs authentiques au Cameroun</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tighter">
              LES MEILLEURES <br />
              <span className="text-gold-gradient">PUFFS AU <br /> CAMEROUN</span>
            </h1>

            <p className="text-white/60 text-base md:text-lg max-w-lg mb-10 leading-relaxed font-medium">
              Qualité premium, saveurs intenses, livraison rapide et paiement sécurisé. Découvrez le luxe de la vape.
            </p>

            {/* Hero Badges */}
            <div className="flex flex-wrap gap-4 md:gap-8 mb-12">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                  <Truck size={18} className="text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Livraison rapide</span>
                  <span className="text-xs text-white font-bold">Yaoundé & Douala</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                  <Shield size={18} className="text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Produits 100%</span>
                  <span className="text-xs text-white font-bold">Authentiques</span>
                </div>
              </div>
            </div>

            <motion.a
              href={`https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 bg-gold-gradient px-8 py-4 rounded-xl text-black font-black uppercase tracking-wider text-sm shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all"
            >
              Commander sur WhatsApp
              <div className="bg-black/10 p-1 rounded-full">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Visual representation of pedestal and product */}
            <div className="relative w-full max-w-[500px] aspect-[4/5] flex items-center justify-center">
              {/* Pedestal Shadow */}
              <div className="absolute bottom-4 w-[70%] h-12 bg-black blur-[60px] opacity-80"></div>
              
              {/* Pedestal / Rock (Stylized) */}
              <div className="absolute bottom-0 w-[80%] h-24 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-[50%] blur-sm opacity-90 border-t border-white/10"></div>

              {/* Main Product Image */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <img
                  src={heroImage}
                  alt="Premium Puffs"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                />
                
                {/* Glow behind product */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
              </div>
              
              {/* Floating badges around product */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 -right-10 glass-dark p-6 rounded-3xl border-gold z-20 shadow-2xl"
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-primary font-black text-xl leading-none">10000</span>
                  <span className="text-white/40 text-[9px] font-black uppercase tracking-widest">PUFFS MAX</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 animate-pulse"></div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-20 -left-10 glass-dark p-5 rounded-full border-gold z-20 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Zap size={14} />
                  </div>
                  <span className="text-white text-[10px] font-black uppercase tracking-widest pr-2">Saveurs Intenses</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURE ICONS STRIP */}
      <section className="bg-[#050505] py-12 border-y border-white/5 overflow-hidden">
        <div className="container overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-between gap-8 min-w-[800px]">
            {[
              { label: "PUFFS JETABLES" },
              { label: "GRANDES PUFFS" },
              { label: "SAVEURS INTENSES" },
              { label: "BATTERIE LONGUE DURÉE" },
              { label: "LIVRAISON RAPIDE" },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center gap-4 group cursor-pointer shrink-0">
                <div className="w-16 h-16 rounded-full border border-primary/20 flex items-center justify-center group-hover:border-primary transition-all duration-500 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity"></div>
                  <div className="w-6 h-6 border-2 border-primary/40 group-hover:border-primary rounded flex items-center justify-center">
                    <div className="w-1 h-3 bg-primary/40 group-hover:bg-primary rounded-full"></div>
                  </div>
                </div>
                <span className="text-[10px] md:text-[11px] font-black text-white/40 tracking-[0.2em] group-hover:text-primary transition-colors text-center w-32 uppercase">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section id="collection" className="container pt-20 pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-[2px] w-8 bg-primary"></div>
              <span className="text-primary font-black uppercase tracking-widest text-[11px]">Notre Boutique Online</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              NOS PRODUITS <span className="text-gold-gradient">POPULAIRES</span>
            </h2>
          </div>
          
          <button className="px-6 py-3 border border-white/10 rounded-xl text-white/50 font-bold text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-all">
            Voir toute la boutique
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-grow max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Chercher un produit..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {[null, ...categories].map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-black"
                    : "bg-white/5 text-white/50 border border-white/10 hover:border-white/30"
                }`}
              >
                {cat ?? "Tout"}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-[4/5] bg-white/5 rounded-3xl animate-shimmer" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-[40px] border border-white/5">
            <p className="text-primary font-black text-xl mb-2">Aucun article pour l'instant</p>
            <p className="text-white/40 font-medium">Les premières créations seront publiées très bientôt.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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

      {/* WHY CHOOSE US */}
      <section className="bg-[#080808] py-24 border-y border-white/5">
        <div className="container grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse"></div>
            <div className="relative z-10 glass-dark p-8 rounded-[40px] border-gold max-w-md mx-auto aspect-square flex items-center justify-center">
              <div className="text-center">
                <span className="block text-4xl font-black text-white mb-2 leading-none">CAMER</span>
                <span className="block text-4xl font-black text-primary leading-none">PUFF</span>
                <div className="mt-8 relative inline-block">
                  <div className="w-24 h-24 rounded-full border border-primary/30 flex items-center justify-center animate-spin-slow">
                    <div className="w-2 h-2 rounded-full bg-primary absolute top-0 -mt-1"></div>
                  </div>
                  <img src={logo} className="w-12 h-12 absolute inset-0 m-auto" alt="logo" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-8 bg-primary"></div>
              <span className="text-primary font-black uppercase tracking-widest text-[11px]">Notre Engagement</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-8 leading-tight">
              POURQUOI CHOISIR <br /> <span className="text-gold-gradient">CAMERPUFF ?</span>
            </h2>
            <p className="text-white/50 font-medium mb-12 leading-relaxed max-w-xl">
              Nous nous engageons à vous offrir les meilleures puffs du marché à des prix compétitifs. Satisfaction garantie ou remboursé.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {[
                { title: "Qualité Premium", desc: "Produits de marques mondialement reconnues" },
                { title: "Meilleurs Prix", desc: "Le meilleur rapport qualité/prix du Cameroun" },
                { title: "Service Client 7J/7", desc: "Une équipe à votre écoute en permanence" },
                { title: "Paiement Sécurisé", desc: "Transactions protégées via MoMo et OM" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-widest mb-1">{item.title}</h4>
                    <p className="text-[11px] text-white/40 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHATSAPP BANNER */}
      <section className="bg-primary py-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-full bg-white/5 -skew-x-[25deg] translate-x-32 hidden md:block"></div>
        <div className="container relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-primary shadow-xl">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </div>
            <div>
              <h3 className="text-black font-black text-lg md:text-xl uppercase tracking-tighter leading-none">Une question ? Besoin d'aide pour commander ?</h3>
              <p className="text-black/60 font-bold text-sm md:text-base mt-1">Cliquez sur le bouton et discutez avec nous sur WhatsApp !</p>
            </div>
          </div>
          <a
            href={`https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-105 transition-transform"
          >
            Discutez avec nous
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Index;