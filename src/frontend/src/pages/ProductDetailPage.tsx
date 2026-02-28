import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Check, ShoppingBag, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCategory, Size } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useAddToCart, useProductById } from "../hooks/useQueries";
import {
  getProductImage,
  getSizeLabel,
  getSizePrice,
} from "../utils/productImages";

const CATEGORY_DESC: Record<ProductCategory, string> = {
  [ProductCategory.Dark]: "Intense, complex flavors with deep cocoa notes",
  [ProductCategory.Milk]: "Smooth and creamy with balanced sweetness",
  [ProductCategory.White]: "Delicate ivory chocolate with vanilla undertones",
  [ProductCategory.Special]: "Limited edition with unique, rare ingredients",
};

export function ProductDetailPage() {
  const { id } = useParams({ from: "/product/$id" });
  const { data: product, isLoading } = useProductById(BigInt(id));
  const { identity, login } = useInternetIdentity();
  const addToCart = useAddToCart();

  const [selectedSize, setSelectedSize] = useState<Size>(Size._100g);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const productIndex = Number.parseInt(id) - 1;
  const imageSrc = product ? getProductImage(product.name, productIndex) : "";

  const handleAddToCart = async () => {
    if (!identity) {
      toast.error("Please sign in to add items to cart");
      return;
    }
    if (!product) return;

    try {
      await addToCart.mutateAsync({
        productId: product.id,
        size: selectedSize,
        quantity: BigInt(qty),
      });
      setAdded(true);
      toast.success(`${product.name} added to cart!`);
      setTimeout(() => setAdded(false), 2500);
    } catch {
      toast.error("Failed to add to cart. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="aspect-square shimmer rounded-sm" />
          <div className="space-y-6">
            <div className="h-8 shimmer rounded-sm w-3/4" />
            <div className="h-4 shimmer rounded-sm w-1/3" />
            <div className="h-20 shimmer rounded-sm" />
            <div className="h-12 shimmer rounded-sm" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p
            className="text-xl font-serif mb-4"
            style={{ color: "oklch(0.60 0.04 55)" }}
          >
            Product not found
          </p>
          <Link to="/shop" className="btn-gold text-sm px-6 py-3">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const price = getSizePrice(selectedSize);
  const sizeLabel = getSizeLabel(selectedSize);
  const categoryNote = CATEGORY_DESC[product.category] ?? "";

  return (
    <div className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm mb-10 transition-colors duration-200 hover:text-[oklch(0.76_0.14_75)]"
          style={{ color: "oklch(0.52 0.04 55)" }}
        >
          <ArrowLeft size={16} /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-sm"
            style={{ background: "oklch(0.14 0.02 44)" }}
          >
            <img
              src={imageSrc}
              alt={product.name}
              className="w-full aspect-square object-cover"
            />
            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <Badge
                className="text-[10px] tracking-widest uppercase px-2.5 py-1"
                style={{
                  background: "oklch(0.76 0.14 75 / 0.15)",
                  color: "oklch(0.76 0.14 75)",
                  borderColor: "oklch(0.76 0.14 75 / 0.3)",
                }}
              >
                {product.category}
              </Badge>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Stars */}
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }, (_, i) => `star-${i}`).map((k) => (
                <Star
                  key={k}
                  size={14}
                  fill="oklch(0.76 0.14 75)"
                  style={{ color: "oklch(0.76 0.14 75)" }}
                />
              ))}
              <span
                className="text-xs ml-2"
                style={{ color: "oklch(0.52 0.04 55)" }}
              >
                (Premium Artisan)
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl font-bold leading-tight mb-3"
              style={{
                fontFamily: '"Playfair Display", serif',
                color: "oklch(0.94 0.015 76)",
              }}
            >
              {product.name}
            </h1>

            <p
              className="text-sm mb-2"
              style={{ color: "oklch(0.76 0.14 75 / 0.8)" }}
            >
              {categoryNote}
            </p>

            <p
              className="text-sm leading-relaxed mb-8"
              style={{ color: "oklch(0.56 0.04 56)" }}
            >
              {product.description}
            </p>

            {/* Size selector */}
            <div className="mb-6">
              <p
                className="text-xs uppercase tracking-widest font-semibold mb-3"
                style={{ color: "oklch(0.65 0.04 58)" }}
              >
                Select Size
              </p>
              <div className="flex gap-3">
                {[Size._100g, Size._500g].map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      type="button"
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className="flex flex-col items-center justify-center px-6 py-4 border rounded-sm transition-all duration-200 min-w-[100px]"
                      style={
                        isSelected
                          ? {
                              borderColor: "oklch(0.76 0.14 75)",
                              background: "oklch(0.76 0.14 75 / 0.1)",
                              color: "oklch(0.94 0.015 76)",
                            }
                          : {
                              borderColor: "oklch(0.28 0.03 50)",
                              color: "oklch(0.55 0.04 55)",
                            }
                      }
                    >
                      <span
                        className="font-bold text-base"
                        style={
                          isSelected ? { color: "oklch(0.76 0.14 75)" } : {}
                        }
                      >
                        {getSizeLabel(size)}
                      </span>
                      <span className="text-xs font-bold mt-0.5">
                        ${getSizePrice(size)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <p
                className="text-xs uppercase tracking-widest font-semibold mb-3"
                style={{ color: "oklch(0.65 0.04 58)" }}
              >
                Quantity
              </p>
              <div
                className="flex items-center gap-0 w-fit border rounded-sm overflow-hidden"
                style={{ borderColor: "oklch(0.28 0.03 50)" }}
              >
                <button
                  type="button"
                  onClick={() => setQty((v) => Math.max(1, v - 1))}
                  className="w-10 h-10 flex items-center justify-center text-lg transition-colors duration-200 hover:bg-[oklch(0.20_0.025_48)]"
                  style={{ color: "oklch(0.76 0.14 75)" }}
                >
                  −
                </button>
                <span
                  className="w-12 h-10 flex items-center justify-center text-sm font-bold"
                  style={{
                    background: "oklch(0.16 0.022 45)",
                    color: "oklch(0.92 0.015 76)",
                  }}
                >
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((v) => v + 1)}
                  className="w-10 h-10 flex items-center justify-center text-lg transition-colors duration-200 hover:bg-[oklch(0.20_0.025_48)]"
                  style={{ color: "oklch(0.76 0.14 75)" }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span
                className="text-3xl font-bold"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  color: "oklch(0.76 0.14 75)",
                }}
              >
                ${price * qty}
              </span>
              <span
                className="text-sm"
                style={{ color: "oklch(0.50 0.04 55)" }}
              >
                {sizeLabel} × {qty}
              </span>
            </div>

            {/* Add to cart */}
            {identity ? (
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={addToCart.isPending || added}
                className="btn-gold gap-3 w-full sm:w-auto sm:max-w-xs justify-center text-base py-4"
              >
                {added ? (
                  <>
                    <Check size={18} /> Added to Cart
                  </>
                ) : addToCart.isPending ? (
                  "Adding..."
                ) : (
                  <>
                    <ShoppingBag size={18} /> Add to Cart
                  </>
                )}
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm" style={{ color: "oklch(0.52 0.04 55)" }}>
                  Sign in to add items to your cart
                </p>
                <button
                  type="button"
                  onClick={login}
                  className="btn-gold gap-3 w-full sm:w-auto sm:max-w-xs justify-center"
                >
                  Sign In to Purchase
                </button>
              </div>
            )}

            {/* Product features */}
            <div
              className="mt-10 pt-8 border-t space-y-3"
              style={{ borderColor: "oklch(0.26 0.03 50)" }}
            >
              {[
                "100% single-origin cacao",
                "No artificial preservatives",
                "Handcrafted in small batches",
                "Ethically sourced ingredients",
              ].map((feat) => (
                <div
                  key={feat}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: "oklch(0.56 0.04 56)" }}
                >
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "oklch(0.76 0.14 75 / 0.15)" }}
                  >
                    <Check size={10} style={{ color: "oklch(0.76 0.14 75)" }} />
                  </div>
                  {feat}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
