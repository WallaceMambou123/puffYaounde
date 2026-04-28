import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/format";

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
  onOpen: (product: Product) => void;
};

export const ProductCard = ({ product, index = 0, onOpen }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.4) }}
      onClick={() => onOpen(product)}
      className="group cursor-pointer"
    >
      <div className="bg-white rounded-3xl overflow-hidden shadow-premium group-hover:shadow-gold transition-all duration-500 border border-transparent group-hover:border-primary/20">
        {/* Image Container */}
        <div className="aspect-square bg-[#F8F8F8] relative flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.title}
              className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <ShoppingCart size={48} className="text-black/5" />
          )}

          {/* New/Category Badge */}
          {product.category && (
            <div className="absolute top-4 left-4 bg-primary text-black text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
              {product.category}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex gap-1 mb-3">
            {[1, 2, 3, 4, 5].map(s => (
              <Star key={s} size={12} className="fill-primary text-primary" />
            ))}
          </div>

          <h3 className="text-[#0D0D0D] font-black text-sm uppercase tracking-tight mb-2 line-clamp-1">
            {product.title}
          </h3>

          <p className="text-primary font-black text-lg mb-6 tracking-tighter">
            {formatPrice(product.price, product.currency)}
          </p>

          <button className="w-full bg-black text-white py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all group-hover:bg-primary group-hover:text-black shadow-lg shadow-black/10 group-hover:shadow-primary/30">
            Commander
          </button>
        </div>
      </div>
    </motion.div>
  );
};