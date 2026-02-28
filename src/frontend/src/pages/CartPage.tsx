import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAllProducts,
  useCart,
  useRemoveFromCart,
} from "../hooks/useQueries";
import {
  getProductImage,
  getSizeLabel,
  getSizePrice,
} from "../utils/productImages";

export function CartPage() {
  const { identity, login } = useInternetIdentity();
  const { data: cart, isLoading } = useCart();
  const { data: products } = useAllProducts();
  const removeFromCart = useRemoveFromCart();
  const navigate = useNavigate();

  const getProduct = (id: bigint): Product | undefined =>
    products?.find((p) => p.id === id);

  const cartItems = cart ?? [];

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + getSizePrice(item.size) * Number(item.quantity);
  }, 0);

  const handleRemove = async (productId: bigint, size: string) => {
    try {
      await removeFromCart.mutateAsync({ productId, size: size as never });
      toast.success("Item removed from cart");
    } catch {
      toast.error("Failed to remove item");
    }
  };

  if (!identity) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <ShoppingBag
            size={48}
            className="mx-auto mb-5"
            style={{ color: "oklch(0.40 0.04 52)" }}
          />
          <h2
            className="text-2xl font-bold mb-3"
            style={{
              fontFamily: '"Playfair Display", serif',
              color: "oklch(0.90 0.015 76)",
            }}
          >
            Sign in to view cart
          </h2>
          <p className="text-sm mb-6" style={{ color: "oklch(0.50 0.04 55)" }}>
            Your cart is saved to your account
          </p>
          <button type="button" onClick={login} className="btn-gold gap-2">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm mb-6 transition-colors duration-200"
            style={{ color: "oklch(0.52 0.04 55)" }}
          >
            <ArrowLeft size={14} /> Continue Shopping
          </Link>
          <h1
            className="text-4xl font-bold"
            style={{
              fontFamily: '"Playfair Display", serif',
              color: "oklch(0.94 0.015 76)",
            }}
          >
            Your Cart
          </h1>
        </motion.div>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }, (_, i) => `skel-${i}`).map((k) => (
              <div key={k} className="h-28 shimmer rounded-sm" />
            ))}
          </div>
        ) : cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <ShoppingBag
              size={56}
              className="mb-6"
              style={{ color: "oklch(0.35 0.04 52)" }}
            />
            <h2
              className="text-2xl font-bold mb-3"
              style={{
                fontFamily: '"Playfair Display", serif',
                color: "oklch(0.60 0.04 55)",
              }}
            >
              Your cart is empty
            </h2>
            <p
              className="text-sm mb-8"
              style={{ color: "oklch(0.45 0.03 52)" }}
            >
              Discover our collection of artisan chocolates
            </p>
            <Link to="/shop">
              <button type="button" className="btn-gold gap-2">
                Browse Chocolates <ArrowRight size={16} />
              </button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3">
              <AnimatePresence>
                {cartItems.map((item) => {
                  const product = getProduct(item.productId);
                  const price = getSizePrice(item.size);
                  const lineTotal = price * Number(item.quantity);
                  const imageSrc = product
                    ? getProductImage(product.name, Number(item.productId) - 1)
                    : "/assets/generated/choco-dark-70.dim_600x600.jpg";

                  return (
                    <motion.div
                      key={`${item.productId}-${item.size}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-4 p-4 rounded-sm border"
                      style={{
                        background: "oklch(0.15 0.022 46)",
                        borderColor: "oklch(0.26 0.03 50)",
                      }}
                    >
                      {/* Product image */}
                      <div
                        className="w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden"
                        style={{ background: "oklch(0.18 0.022 46)" }}
                      >
                        <img
                          src={imageSrc}
                          alt={product?.name ?? "Chocolate"}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-semibold text-sm mb-1 leading-snug truncate"
                          style={{
                            fontFamily: '"Playfair Display", serif',
                            color: "oklch(0.90 0.015 76)",
                          }}
                        >
                          {product?.name ?? "Chocolate"}
                        </h3>
                        <div
                          className="flex items-center gap-2 text-xs mb-2"
                          style={{ color: "oklch(0.52 0.04 55)" }}
                        >
                          <span>{getSizeLabel(item.size)}</span>
                          <span>·</span>
                          <span>${price} each</span>
                          <span>·</span>
                          <span>Qty: {Number(item.quantity)}</span>
                        </div>
                        <div
                          className="font-bold text-sm"
                          style={{ color: "oklch(0.76 0.14 75)" }}
                        >
                          ${lineTotal}
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => handleRemove(item.productId, item.size)}
                        disabled={removeFromCart.isPending}
                        className="flex-shrink-0 p-2 rounded-sm transition-colors duration-200 hover:bg-[oklch(0.22_0.025_48)] disabled:opacity-40"
                        style={{ color: "oklch(0.50 0.04 52)" }}
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div
                className="rounded-sm border p-6 sticky top-28"
                style={{
                  background: "oklch(0.14 0.02 44)",
                  borderColor: "oklch(0.76 0.14 75 / 0.2)",
                }}
              >
                <h2
                  className="text-lg font-bold mb-5"
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    color: "oklch(0.92 0.015 76)",
                  }}
                >
                  Order Summary
                </h2>

                <div className="space-y-3 mb-5">
                  <div
                    className="flex justify-between text-sm"
                    style={{ color: "oklch(0.58 0.04 56)" }}
                  >
                    <span>
                      Subtotal ({cartItems.length} item
                      {cartItems.length !== 1 ? "s" : ""})
                    </span>
                    <span>${subtotal}</span>
                  </div>
                  <div
                    className="flex justify-between text-sm"
                    style={{ color: "oklch(0.58 0.04 56)" }}
                  >
                    <span>Shipping</span>
                    <span style={{ color: "oklch(0.76 0.14 75)" }}>Free</span>
                  </div>
                </div>

                <div
                  className="border-t pt-4 mb-6 flex justify-between items-center"
                  style={{ borderColor: "oklch(0.26 0.03 50)" }}
                >
                  <span
                    className="font-bold text-base"
                    style={{ color: "oklch(0.92 0.015 76)" }}
                  >
                    Total
                  </span>
                  <span
                    className="font-bold text-2xl"
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      color: "oklch(0.76 0.14 75)",
                    }}
                  >
                    ${subtotal}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => navigate({ to: "/checkout" })}
                  className="btn-gold w-full justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
