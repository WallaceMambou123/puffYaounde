import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Star, Tag, Info, ShoppingBag } from "lucide-react";
import { formatPrice, buildWhatsappLink } from "@/lib/format";
import type { Product } from "@/components/ProductCard";

type Props = {
  product: Product | null;
  whatsappNumber: string;
  shopName: string;
  onClose: () => void;
};

export const ProductModal = ({ product, whatsappNumber, shopName, onClose }: Props) => {
  if (!product) return null;

  const message = `Bonjour ${shopName}, je suis intéressé(e) par "${product.title}" affiché à ${formatPrice(product.price, product.currency)}. Est-il toujours disponible ?`;
  const link = buildWhatsappLink(whatsappNumber, message);

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: "fixed", inset: 0, zIndex: 50,
              background: "rgba(0, 30, 50, 0.65)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 51,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                pointerEvents: "auto",
                width: "100%",
                maxWidth: 560,
                borderRadius: 24,
                overflow: "hidden",
                background: "white",
                boxShadow: "0 32px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(11,181,224,0.12)",
              }}
            >
              {/* Image section */}
              <div style={{
                position: "relative",
                background: "linear-gradient(135deg, #e0f5ff 0%, #c8ecf8 50%, #d8f5ff 100%)",
                minHeight: 260,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}>
                {/* Decorative circles */}
                <div style={{ position:"absolute", width:200, height:200, borderRadius:"50%", background:"rgba(11,181,224,0.08)", top:-60, right:-40, pointerEvents:"none" }} />
                <div style={{ position:"absolute", width:140, height:140, borderRadius:"50%", background:"rgba(0,212,255,0.06)", bottom:-40, left:-20, pointerEvents:"none" }} />

                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.title}
                    style={{
                      maxHeight: 280,
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "3rem" }}>
                    <ShoppingBag size={64} color="#0BB5E0" strokeWidth={1.5} />
                    <span style={{ color: "#0BB5E0", fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: "0.9rem" }}>
                      Image non disponible
                    </span>
                  </div>
                )}

                {/* Category badge */}
                {product.category && (
                  <div style={{
                    position: "absolute", top: 16, left: 16,
                    background: "linear-gradient(90deg, #0BB5E0, #00D4FF)",
                    color: "white",
                    borderRadius: "999px",
                    padding: "5px 14px",
                    fontSize: "0.72rem",
                    fontFamily: "'Montserrat',sans-serif",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    boxShadow: "0 2px 10px rgba(11,181,224,0.4)",
                    display: "flex", alignItems: "center", gap: 5,
                  }}>
                    <Tag size={11} />
                    {product.category}
                  </div>
                )}

                {/* Close button */}
                <button
                  onClick={onClose}
                  style={{
                    position: "absolute", top: 14, right: 14,
                    width: 36, height: 36,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.9)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                    transition: "all 0.2s ease",
                    color: "#0d2d3d",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "white";
                    (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.85)";
                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Info section */}
              <div style={{ padding: "1.75rem" }}>
                {/* Stars */}
                <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={14} style={{ fill: "#FFD700", color: "#FFD700" }} />
                  ))}
                  <span style={{ fontSize: "0.75rem", color: "#9bbcc7", marginLeft: 6, fontFamily: "'Montserrat',sans-serif", fontWeight: 600 }}>
                    Produit certifié
                  </span>
                </div>

                {/* Title */}
                <h2 style={{
                  fontFamily: "'Montserrat',sans-serif",
                  fontWeight: 800,
                  fontSize: "1.4rem",
                  color: "#0d2d3d",
                  lineHeight: 1.2,
                  marginBottom: "0.75rem",
                }}>
                  {product.title}
                </h2>

                {/* Description */}
                {product.description && (
                  <div style={{
                    display: "flex",
                    gap: 10,
                    background: "linear-gradient(135deg, #f0faff, #e8f8ff)",
                    border: "1px solid rgba(11,181,224,0.15)",
                    borderRadius: 14,
                    padding: "14px 16px",
                    marginBottom: "1.25rem",
                  }}>
                    <Info size={16} color="#0BB5E0" style={{ flexShrink: 0, marginTop: 2 }} />
                    <p style={{
                      fontFamily: "'Montserrat',sans-serif",
                      fontSize: "0.9rem",
                      color: "#3a6a7a",
                      lineHeight: 1.65,
                    }}>
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Price + CTA */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  flexWrap: "wrap",
                }}>
                  <div>
                    <p style={{
                      fontSize: "0.65rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: "#9bbcc7",
                      fontFamily: "'Montserrat',sans-serif",
                      fontWeight: 600,
                      marginBottom: 2,
                    }}>
                      Prix
                    </p>
                    <p style={{
                      fontFamily: "'Montserrat',sans-serif",
                      fontWeight: 900,
                      fontSize: "2rem",
                      background: "linear-gradient(90deg, #0BB5E0, #00D4FF)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      lineHeight: 1,
                    }}>
                      {formatPrice(product.price, product.currency)}
                    </p>
                  </div>

                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      background: "linear-gradient(90deg, #25D366, #1ebe5d)",
                      color: "white",
                      borderRadius: "999px",
                      padding: "0.85rem 2rem",
                      fontFamily: "'Montserrat',sans-serif",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      textDecoration: "none",
                      boxShadow: "0 6px 20px rgba(37,211,102,0.4)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(37,211,102,0.5)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(37,211,102,0.4)";
                    }}
                  >
                    <MessageCircle size={18} />
                    Commander via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};