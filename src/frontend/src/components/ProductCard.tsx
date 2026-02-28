import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import type { Product } from "../backend.d";
import { ProductCategory, Size } from "../backend.d";
import { getProductImage, getSizePrice } from "../utils/productImages";

interface ProductCardProps {
  product: Product;
  index: number;
}

const CATEGORY_COLORS: Record<ProductCategory, { bg: string; text: string }> = {
  [ProductCategory.Dark]: {
    bg: "oklch(0.22 0.025 40 / 0.9)",
    text: "oklch(0.85 0.06 60)",
  },
  [ProductCategory.Milk]: {
    bg: "oklch(0.28 0.03 55 / 0.9)",
    text: "oklch(0.90 0.06 70)",
  },
  [ProductCategory.White]: {
    bg: "oklch(0.35 0.02 65 / 0.9)",
    text: "oklch(0.95 0.03 78)",
  },
  [ProductCategory.Special]: {
    bg: "oklch(0.76 0.14 75 / 0.15)",
    text: "oklch(0.76 0.14 75)",
  },
};

export function ProductCard({ product, index }: ProductCardProps) {
  const imageSrc = getProductImage(product.name, index);
  const minPrice = getSizePrice(Size._100g);
  const colors =
    CATEGORY_COLORS[product.category] ?? CATEGORY_COLORS[ProductCategory.Dark];

  return (
    <Link to="/product/$id" params={{ id: product.id.toString() }}>
      <div className="choco-card group">
        {/* Image */}
        <div className="card-image-wrapper">
          <img
            src={imageSrc}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          {/* Category badge */}
          <div
            className="absolute top-3 left-3 category-badge text-[10px]"
            style={{
              background: colors.bg,
              color: colors.text,
              backdropFilter: "blur(8px)",
            }}
          >
            {product.category}
          </div>

          {/* Quick view overlay */}
          <div className="quick-view flex items-center justify-center gap-2">
            <ShoppingBag size={14} />
            View Details
          </div>
        </div>

        {/* Info */}
        <div className="p-4 space-y-2">
          <h3
            className="font-semibold text-sm leading-snug line-clamp-2"
            style={{
              color: "oklch(0.92 0.015 75)",
              fontFamily: '"Playfair Display", serif',
            }}
          >
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <span
                className="text-xs"
                style={{ color: "oklch(0.55 0.04 55)" }}
              >
                From{" "}
              </span>
              <span
                className="font-bold text-sm"
                style={{ color: "oklch(0.76 0.14 75)" }}
              >
                ${minPrice}
              </span>
            </div>
            <div
              className="text-[10px] uppercase tracking-wider"
              style={{ color: "oklch(0.50 0.04 55)" }}
            >
              100g – 500g
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
