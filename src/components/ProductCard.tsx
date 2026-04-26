import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, buildWhatsappLink } from "@/lib/format";

export type Product = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  currency: string;
  image_url: string | null;
  category: string | null;
};

type Props = {
  product: Product;
  whatsappNumber: string;
  shopName: string;
  index?: number;
};

export const ProductCard = ({ product, whatsappNumber, shopName, index = 0 }: Props) => {
  const message = `Bonjour ${shopName}, je suis intéressé(e) par "${product.title}" affiché à ${formatPrice(
    product.price,
    product.currency,
  )}. Est-il toujours disponible ?`;
  const link = buildWhatsappLink(whatsappNumber, message);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.4), ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className="group overflow-hidden border-border/60 bg-card shadow-card-elegant transition-elegant hover:-translate-y-1 hover:shadow-elegant">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              Sans image
            </div>
          )}
          {product.category && (
            <Badge className="absolute left-3 top-3 bg-background/90 text-foreground hover:bg-background/90">
              {product.category}
            </Badge>
          )}
        </div>
        <div className="p-5 space-y-3">
          <div>
            <h3 className="font-display text-xl font-semibold text-primary leading-tight">
              {product.title}
            </h3>
            {product.description && (
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>
            )}
          </div>
          <div className="flex items-end justify-between gap-3 pt-2">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Prix</p>
              <p className="font-display text-2xl font-semibold text-accent">
                {formatPrice(product.price, product.currency)}
              </p>
            </div>
            <Button
              asChild
              size="sm"
              className="bg-accent text-accent-foreground hover:bg-accent-glow shadow-accent-glow"
            >
              <a href={link} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};