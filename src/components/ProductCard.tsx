import { motion } from "framer-motion";
import { Eye, Star, Tag } from "lucide-react";
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.08, 0.4), ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onOpen(product)}
    >
      <div
        className="group"
        style={{
          borderRadius: 20,
          background: "white",
          boxShadow: "0 4px 24px rgba(11,181,224,0.1)",
          border: "1.5px solid rgba(11,181,224,0.1)",
          overflow: "hidden",
          cursor: "pointer",
          transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(-8px) scale(1.01)";
          el.style.boxShadow = "0 20px 48px rgba(11,181,224,0.22)";
          el.style.border = "1.5px solid rgba(11,181,224,0.35)";
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(0) scale(1)";
          el.style.boxShadow = "0 4px 24px rgba(11,181,224,0.1)";
          el.style.border = "1.5px solid rgba(11,181,224,0.1)";
        }}
      >
        {/* Image */}
        <div style={{
          position: "relative",
          aspectRatio: "4/5",
          overflow: "hidden",
          background: "linear-gradient(135deg, #e8f8ff, #d0f0ff)",
        }}>
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.title}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.6s ease",
              }}
              className="group-hover:scale-105"
            />
          ) : (
            <div style={{
              display: "flex", height: "100%", width: "100%",
              alignItems: "center", justifyContent: "center",
              flexDirection: "column", gap: 8,
            }}>
              <Tag size={40} color="#0BB5E0" strokeWidth={1.5} />
              <span style={{ color: "#9bbcc7", fontSize: "0.8rem", fontFamily: "'Poppins',sans-serif" }}>
                Sans image
              </span>
            </div>
          )}

          {/* Category badge */}
          {product.category && (
            <div style={{
              position: "absolute", left: 12, top: 12,
              background: "linear-gradient(90deg, #0BB5E0, #00D4FF)",
              color: "white",
              borderRadius: "999px",
              padding: "4px 12px",
              fontSize: "0.68rem",
              fontFamily: "'Montserrat',sans-serif",
              fontWeight: 700,
              letterSpacing: "0.05em",
              boxShadow: "0 2px 8px rgba(11,181,224,0.4)",
              display: "flex", alignItems: "center", gap: 4,
            }}>
              <Tag size={10} />
              {product.category}
            </div>
          )}

          {/* Hover overlay — "Voir détails" */}
          <div
            className="group-hover:opacity-100"
            style={{
              position: "absolute", inset: 0,
              background: "rgba(11,181,224,0.18)",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: 0,
              transition: "opacity 0.35s ease",
            }}
          >
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(8px)",
              borderRadius: "999px",
              padding: "10px 22px",
              fontFamily: "'Montserrat',sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              color: "#0BB5E0",
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            }}>
              <Eye size={16} />
              Voir les détails
            </div>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "1.1rem 1.25rem" }}>
          {/* Stars */}
          <div style={{ display: "flex", gap: 2, marginBottom: 6 }}>
            {[1,2,3,4,5].map(s => (
              <Star key={s} size={11} style={{ fill: "#FFD700", color: "#FFD700" }} />
            ))}
          </div>

          <h3 style={{
            fontFamily: "'Poppins',sans-serif",
            fontWeight: 700,
            fontSize: "0.95rem",
            color: "#0d2d3d",
            lineHeight: 1.3,
            marginBottom: 8,
          }}>
            {product.title}
          </h3>

          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", gap: 8,
          }}>
            <p style={{
              fontFamily: "'Montserrat',sans-serif",
              fontWeight: 800,
              fontSize: "1.2rem",
              background: "linear-gradient(90deg, #0BB5E0, #00D4FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {formatPrice(product.price, product.currency)}
            </p>

            <div style={{
              display: "flex", alignItems: "center", gap: 5,
              background: "linear-gradient(135deg, #e0f8ff, #c8f0ff)",
              color: "#0BB5E0",
              borderRadius: "999px",
              padding: "5px 12px",
              fontSize: "0.72rem",
              fontFamily: "'Montserrat',sans-serif",
              fontWeight: 700,
            }}>
              <Eye size={12} />
              Détails
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};