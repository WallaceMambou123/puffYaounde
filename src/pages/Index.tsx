import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Search, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard, type Product } from "@/components/ProductCard";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-waves.jpg";

const Index = () => {
  const { data: settings } = useSiteSettings();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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

  const shopName = settings?.shop_name ?? "Les Vagues";
  const tagline = settings?.tagline ?? "Élégance et qualité";
  const whatsapp = settings?.whatsapp_number ?? "+221000000000";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden h-[70vh] flex items-center" style={{ height: "600px" }}>
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" /> {/* Un voile très léger pour la lecture */}
        </div>
        <div className="container relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex flex-col items-center mb-8">
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                src="/logo.png"
                alt="Puffs Cameroun Logo"
                className="h-32 md:h-48 w-auto object-contain mb-8 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
              />
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-white backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" />
                L'élégance à la camerounaise
              </div>
            </div>
            <h1 className="text-gold text-5xl md:text-8xl font-bold leading-[1.05] tracking-tighter mb-8 drop-shadow-2xl">
              {shopName}
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white mb-12 font-medium drop-shadow-md">
              {tagline}. Découvrez une sélection premium d'articles authentiques.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-gold text-black hover:scale-105 transition-transform px-8 font-bold shadow-lg"
                onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explorer la collection
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 px-8"
              >
                <a href={`https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`} target="_blank" rel="noopener noreferrer">
                  Contact WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Collection */}
      <section id="collection" className="container py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 border-l-4 border-gold pl-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-primary font-bold mb-2">Prestige & Qualité</p>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
              Nos Articles
            </h2>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/50" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Chercher une puff, un accessoire..."
              className="pl-12 h-14 bg-white border-primary/20 text-foreground rounded-xl focus:border-primary shadow-sm"
            />
          </div>
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
                !activeCategory
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-primary text-muted-foreground hover:text-foreground"
              }`}
            >
              Tout
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-primary text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/5] bg-muted animate-pulse rounded" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border rounded-lg">
            <p className="font-display text-2xl text-primary">Aucun article pour l'instant</p>
            <p className="mt-2 text-muted-foreground">
              Les premières créations seront publiées très bientôt.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                whatsappNumber={whatsapp}
                shopName={shopName}
                index={i}
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
