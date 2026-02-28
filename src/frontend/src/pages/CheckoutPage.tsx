import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Loader2, MapPin, Package, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAllProducts,
  useCart,
  usePlaceOrder,
  useUserProfile,
} from "../hooks/useQueries";
import {
  getProductImage,
  getSizeLabel,
  getSizePrice,
} from "../utils/productImages";

export function CheckoutPage() {
  const { identity, login } = useInternetIdentity();
  const { data: cart } = useCart();
  const { data: products } = useAllProducts();
  const { data: profile } = useUserProfile();
  const placeOrder = usePlaceOrder();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");

  // Pre-fill from profile
  useEffect(() => {
    if (profile?.deliveryAddress) {
      setAddress(profile.deliveryAddress);
    }
  }, [profile]);

  const getProduct = (id: bigint): Product | undefined =>
    products?.find((p) => p.id === id);

  const cartItems = cart ?? [];

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + getSizePrice(item.size) * Number(item.quantity);
  }, 0);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      toast.error("Please enter a delivery address");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      const orderId = await placeOrder.mutateAsync();
      navigate({ to: "/order/$id", params: { id: orderId.toString() } });
    } catch {
      toast.error("Failed to place order. Please try again.");
    }
  };

  if (!identity) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <h2
            className="text-2xl font-bold mb-3"
            style={{
              fontFamily: '"Playfair Display", serif',
              color: "oklch(0.90 0.015 76)",
            }}
          >
            Sign in to checkout
          </h2>
          <button type="button" onClick={login} className="btn-gold gap-2">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
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
            Your cart is empty
          </h2>
          <Link to="/shop">
            <button type="button" className="btn-gold">
              Browse Chocolates
            </button>
          </Link>
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
            to="/cart"
            className="inline-flex items-center gap-2 text-sm mb-6 transition-colors duration-200"
            style={{ color: "oklch(0.52 0.04 55)" }}
          >
            <ArrowLeft size={14} /> Back to Cart
          </Link>
          <h1
            className="text-4xl font-bold"
            style={{
              fontFamily: '"Playfair Display", serif',
              color: "oklch(0.94 0.015 76)",
            }}
          >
            Checkout
          </h1>
        </motion.div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - delivery details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-sm border p-6"
                style={{
                  background: "oklch(0.14 0.02 44)",
                  borderColor: "oklch(0.28 0.03 50)",
                }}
              >
                <h2
                  className="font-bold text-lg mb-5 flex items-center gap-2"
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    color: "oklch(0.92 0.015 76)",
                  }}
                >
                  <MapPin size={18} style={{ color: "oklch(0.76 0.14 75)" }} />
                  Delivery Address
                </h2>
                <div className="space-y-2">
                  <Label
                    htmlFor="addr"
                    className="text-xs uppercase tracking-widest font-semibold"
                    style={{ color: "oklch(0.62 0.04 58)" }}
                  >
                    Full Delivery Address *
                  </Label>
                  <Input
                    id="addr"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Main St, City, State, ZIP, Country"
                    required
                    className="bg-background border-border focus:border-[oklch(0.76_0.14_75)] transition-colors duration-200"
                  />
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.45 0.03 52)" }}
                  >
                    Your profile address has been pre-filled. You can update it
                    for this order.
                  </p>
                </div>
              </motion.div>

              {/* Order review */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-sm border p-6"
                style={{
                  background: "oklch(0.14 0.02 44)",
                  borderColor: "oklch(0.28 0.03 50)",
                }}
              >
                <h2
                  className="font-bold text-lg mb-5 flex items-center gap-2"
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    color: "oklch(0.92 0.015 76)",
                  }}
                >
                  <Package size={18} style={{ color: "oklch(0.76 0.14 75)" }} />
                  Order Review
                </h2>
                <div className="space-y-3">
                  {cartItems.map((item) => {
                    const product = getProduct(item.productId);
                    const imageSrc = product
                      ? getProductImage(
                          product.name,
                          Number(item.productId) - 1,
                        )
                      : "/assets/generated/choco-dark-70.dim_600x600.jpg";
                    const lineTotal =
                      getSizePrice(item.size) * Number(item.quantity);

                    return (
                      <div
                        key={`${item.productId}-${item.size}`}
                        className="flex items-center gap-3"
                      >
                        <div
                          className="w-14 h-14 flex-shrink-0 rounded-sm overflow-hidden"
                          style={{ background: "oklch(0.18 0.022 46)" }}
                        >
                          <img
                            src={imageSrc}
                            alt={product?.name ?? "Chocolate"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-sm font-medium truncate"
                            style={{
                              color: "oklch(0.88 0.015 76)",
                              fontFamily: '"Playfair Display", serif',
                            }}
                          >
                            {product?.name ?? "Chocolate"}
                          </p>
                          <p
                            className="text-xs"
                            style={{ color: "oklch(0.52 0.04 55)" }}
                          >
                            {getSizeLabel(item.size)} × {Number(item.quantity)}
                          </p>
                        </div>
                        <div
                          className="font-bold text-sm"
                          style={{ color: "oklch(0.76 0.14 75)" }}
                        >
                          ${lineTotal}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Right - Order total */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="rounded-sm border p-6 sticky top-28"
                style={{
                  background: "oklch(0.14 0.02 44)",
                  borderColor: "oklch(0.76 0.14 75 / 0.2)",
                }}
              >
                <h2
                  className="font-bold text-lg mb-5"
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    color: "oklch(0.92 0.015 76)",
                  }}
                >
                  Payment Summary
                </h2>

                <div className="space-y-3 mb-5">
                  <div
                    className="flex justify-between text-sm"
                    style={{ color: "oklch(0.58 0.04 56)" }}
                  >
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  <div
                    className="flex justify-between text-sm"
                    style={{ color: "oklch(0.58 0.04 56)" }}
                  >
                    <span>Shipping</span>
                    <span style={{ color: "oklch(0.76 0.14 75)" }}>Free</span>
                  </div>
                  <div
                    className="flex justify-between text-sm"
                    style={{ color: "oklch(0.58 0.04 56)" }}
                  >
                    <span>Tax</span>
                    <span>Included</span>
                  </div>
                </div>

                <div
                  className="border-t pt-4 mb-6 flex justify-between items-center"
                  style={{ borderColor: "oklch(0.26 0.03 50)" }}
                >
                  <span
                    className="font-bold"
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
                  type="submit"
                  disabled={placeOrder.isPending}
                  className="btn-gold w-full justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {placeOrder.isPending ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Placing
                      Order…
                    </>
                  ) : (
                    "Place Order"
                  )}
                </button>

                <p
                  className="text-[11px] text-center mt-4"
                  style={{ color: "oklch(0.42 0.03 52)" }}
                >
                  Orders are processed on the Internet Computer — secure &amp;
                  transparent
                </p>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
