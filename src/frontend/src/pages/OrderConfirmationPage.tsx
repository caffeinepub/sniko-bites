import { Link, useParams } from "@tanstack/react-router";
import { ArrowRight, CheckCircle, Home, Package } from "lucide-react";
import { motion } from "motion/react";
import { OrderStatus } from "../backend.d";
import { useMyOrders } from "../hooks/useQueries";
import { getSizeLabel, getSizePrice } from "../utils/productImages";

const ORDER_STEPS = [
  { status: OrderStatus.Pending, label: "Order Placed", icon: "📦" },
  { status: OrderStatus.Processing, label: "Processing", icon: "🍫" },
  { status: OrderStatus.Shipped, label: "Shipped", icon: "🚚" },
  { status: OrderStatus.Delivered, label: "Delivered", icon: "✅" },
];

function getStepIndex(status: OrderStatus): number {
  const idx = ORDER_STEPS.findIndex((s) => s.status === status);
  return idx === -1 ? 0 : idx;
}

export function OrderConfirmationPage() {
  const { id } = useParams({ from: "/order/$id" });
  const { data: orders } = useMyOrders();

  const order = orders?.find((o) => o.id.toString() === id);
  const currentStep = order ? getStepIndex(order.status) : 0;

  return (
    <div className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Success animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="text-center mb-10"
        >
          <div
            className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{
              background: "oklch(0.76 0.14 75 / 0.15)",
              border: "2px solid oklch(0.76 0.14 75 / 0.4)",
            }}
          >
            <CheckCircle size={40} style={{ color: "oklch(0.76 0.14 75)" }} />
          </div>
          <h1
            className="text-4xl font-bold mb-3"
            style={{
              fontFamily: '"Playfair Display", serif',
              color: "oklch(0.94 0.015 76)",
            }}
          >
            Order Confirmed!
          </h1>
          <p className="text-base" style={{ color: "oklch(0.56 0.04 56)" }}>
            Your Harshellow chocolates are being prepared with care.
          </p>
        </motion.div>

        {/* Order details card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-sm border p-6 mb-6"
          style={{
            background: "oklch(0.14 0.02 44)",
            borderColor: "oklch(0.76 0.14 75 / 0.2)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Package size={20} style={{ color: "oklch(0.76 0.14 75)" }} />
            <div>
              <h2
                className="font-bold text-sm"
                style={{ color: "oklch(0.90 0.015 76)" }}
              >
                Order #{id}
              </h2>
              {order && (
                <p className="text-xs" style={{ color: "oklch(0.50 0.04 55)" }}>
                  {order.items.length} item{order.items.length !== 1 ? "s" : ""}{" "}
                  · Total: ${order.totalPrice.toFixed(2)}
                </p>
              )}
            </div>
          </div>

          {/* Status tracker */}
          <div className="flex items-center mb-6">
            {ORDER_STEPS.map(({ label, icon }, i) => {
              const isDone = i < currentStep;
              const isActive = i === currentStep;
              return (
                <div
                  key={label}
                  className="flex-1 flex flex-col items-center relative"
                >
                  {i > 0 && (
                    <div
                      className="absolute right-1/2 w-full h-0.5 top-5"
                      style={{
                        background: isDone
                          ? "oklch(0.76 0.14 75)"
                          : "oklch(0.26 0.03 50)",
                      }}
                    />
                  )}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm border-2 relative z-10 transition-all duration-500"
                    style={
                      isDone
                        ? {
                            background: "oklch(0.76 0.14 75)",
                            borderColor: "oklch(0.76 0.14 75)",
                            color: "oklch(0.10 0.02 45)",
                          }
                        : isActive
                          ? {
                              background: "oklch(0.76 0.14 75 / 0.1)",
                              borderColor: "oklch(0.76 0.14 75)",
                              color: "oklch(0.76 0.14 75)",
                              boxShadow: "0 0 12px oklch(0.76 0.14 75 / 0.4)",
                            }
                          : {
                              background: "oklch(0.18 0.022 46)",
                              borderColor: "oklch(0.26 0.03 50)",
                              color: "oklch(0.45 0.03 52)",
                            }
                    }
                  >
                    {icon}
                  </div>
                  <span
                    className="text-[10px] mt-2 text-center tracking-wide"
                    style={{
                      color:
                        isDone || isActive
                          ? "oklch(0.76 0.14 75)"
                          : "oklch(0.42 0.03 52)",
                    }}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Items */}
          {order?.items && order.items.length > 0 && (
            <div
              className="border-t pt-4 space-y-2"
              style={{ borderColor: "oklch(0.22 0.025 48)" }}
            >
              {order.items.map((item, i) => (
                <div
                  key={`${item.productId}-${item.size}-${i}`}
                  className="flex justify-between items-center text-sm"
                >
                  <span style={{ color: "oklch(0.62 0.04 58)" }}>
                    {getSizeLabel(item.size)} × {Number(item.quantity)}
                  </span>
                  <span style={{ color: "oklch(0.76 0.14 75)" }}>
                    ${getSizePrice(item.size) * Number(item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Delivery address */}
          {order?.deliveryAddress && (
            <div
              className="mt-4 pt-4 border-t text-sm"
              style={{
                borderColor: "oklch(0.22 0.025 48)",
                color: "oklch(0.52 0.04 55)",
              }}
            >
              <span
                className="font-semibold"
                style={{ color: "oklch(0.70 0.04 60)" }}
              >
                Delivering to:{" "}
              </span>
              {order.deliveryAddress}
            </div>
          )}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/profile" className="flex-1">
            <button
              type="button"
              className="btn-gold w-full justify-center gap-2"
            >
              <Package size={16} /> Track Order
            </button>
          </Link>
          <Link to="/shop" className="flex-1">
            <button
              type="button"
              className="btn-outline-gold w-full justify-center gap-2"
            >
              <ArrowRight size={16} /> Continue Shopping
            </button>
          </Link>
          <Link to="/" className="sm:flex-none">
            <button
              type="button"
              className="w-full sm:w-auto px-6 py-4 border rounded-sm text-sm font-semibold transition-all duration-200"
              style={{
                borderColor: "oklch(0.28 0.03 50)",
                color: "oklch(0.55 0.04 55)",
              }}
            >
              <Home size={14} className="inline mr-2" />
              Home
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
