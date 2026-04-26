export function formatPrice(price: number, currency: string = "XOF"): string {
  try {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return `${price.toLocaleString("fr-FR")} ${currency}`;
  }
}

export function buildWhatsappLink(phone: string, message: string): string {
  const cleaned = phone.replace(/[^\d+]/g, "").replace(/^\+/, "");
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}