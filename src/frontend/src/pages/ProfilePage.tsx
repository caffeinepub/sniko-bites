import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import {
  Loader2,
  Mail,
  MapPin,
  Package,
  Phone,
  Save,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { OrderStatus } from "../backend.d";
import type { Order } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useIsAdmin,
  useMyOrders,
  useSaveProfile,
  useUpdateOrderStatus,
  useUserProfile,
} from "../hooks/useQueries";

const ORDER_STEPS: { status: OrderStatus; label: string }[] = [
  { status: OrderStatus.Pending, label: "Pending" },
  { status: OrderStatus.Processing, label: "Processing" },
  { status: OrderStatus.Shipped, label: "Shipped" },
  { status: OrderStatus.Delivered, label: "Delivered" },
];

function getStepIndex(status: OrderStatus): number {
  const idx = ORDER_STEPS.findIndex((s) => s.status === status);
  return idx === -1 ? 0 : idx;
}

function OrderCard({
  order,
  onStatusChange,
  isAdmin,
}: {
  order: Order;
  onStatusChange?: (status: OrderStatus) => void;
  isAdmin?: boolean;
}) {
  const currentStep = getStepIndex(order.status);

  const nextStatuses: Record<OrderStatus, OrderStatus | null> = {
    [OrderStatus.Pending]: OrderStatus.Processing,
    [OrderStatus.Processing]: OrderStatus.Shipped,
    [OrderStatus.Shipped]: OrderStatus.Delivered,
    [OrderStatus.Delivered]: null,
  };
  const nextStatus = nextStatuses[order.status];

  return (
    <div
      className="rounded-sm p-5 border"
      style={{
        background: "oklch(0.15 0.022 46)",
        borderColor: "oklch(0.28 0.03 50)",
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <span
            className="text-xs uppercase tracking-widest font-semibold"
            style={{ color: "oklch(0.52 0.04 55)" }}
          >
            Order #{order.id.toString()}
          </span>
          <div
            className="text-xs mt-1"
            style={{ color: "oklch(0.45 0.03 52)" }}
          >
            {order.items.length} item{order.items.length !== 1 ? "s" : ""} · $
            {order.totalPrice.toFixed(2)}
          </div>
        </div>
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-semibold"
          style={{
            background: "oklch(0.76 0.14 75 / 0.12)",
            color: "oklch(0.76 0.14 75)",
            border: "1px solid oklch(0.76 0.14 75 / 0.25)",
          }}
        >
          <Package size={12} />
          {order.status}
        </div>
      </div>

      {/* Status stepper */}
      <div className="flex items-center gap-0 mb-5">
        {ORDER_STEPS.map(({ label }, i) => {
          const isDone = i < currentStep;
          const isActive = i === currentStep;
          return (
            <div key={label} className="flex-1 flex flex-col items-center">
              {/* Connector left */}
              <div className="w-full flex items-center justify-center relative">
                {i > 0 && (
                  <div
                    className="absolute right-1/2 w-full h-0.5 top-4"
                    style={{
                      background:
                        isDone || isActive
                          ? "oklch(0.76 0.14 75 / 0.5)"
                          : "oklch(0.26 0.03 50)",
                    }}
                  />
                )}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 relative z-10 transition-all duration-300 ${
                    isDone ? "done" : isActive ? "active" : "pending"
                  } order-step-circle`}
                >
                  {isDone ? "✓" : i + 1}
                </div>
              </div>
              <span
                className="text-[10px] mt-2 text-center tracking-wide"
                style={{
                  color:
                    isDone || isActive
                      ? "oklch(0.76 0.14 75)"
                      : "oklch(0.45 0.03 52)",
                }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Delivery address */}
      <div
        className="flex items-start gap-2 text-xs pt-4 border-t"
        style={{
          borderColor: "oklch(0.22 0.025 48)",
          color: "oklch(0.52 0.04 55)",
        }}
      >
        <MapPin
          size={12}
          className="flex-shrink-0 mt-0.5"
          style={{ color: "oklch(0.76 0.14 75 / 0.6)" }}
        />
        {order.deliveryAddress || "No address set"}
      </div>

      {/* Admin controls */}
      {isAdmin && nextStatus && onStatusChange && (
        <div
          className="mt-4 pt-3 border-t"
          style={{ borderColor: "oklch(0.22 0.025 48)" }}
        >
          <button
            type="button"
            onClick={() => onStatusChange(nextStatus)}
            className="text-xs px-4 py-2 rounded-sm font-semibold tracking-wider uppercase transition-all duration-200"
            style={{
              background: "oklch(0.76 0.14 75 / 0.15)",
              color: "oklch(0.76 0.14 75)",
              border: "1px solid oklch(0.76 0.14 75 / 0.3)",
            }}
          >
            Mark as {nextStatus}
          </button>
        </div>
      )}
    </div>
  );
}

export function ProfilePage() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const { data: orders, isLoading: ordersLoading } = useMyOrders();
  const { data: isAdmin } = useIsAdmin();
  const saveProfile = useSaveProfile();
  const updateStatus = useUpdateOrderStatus();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    deliveryAddress: "",
  });

  // Populate form once profile loads
  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name ?? "",
        email: profile.email ?? "",
        phoneNumber: profile.phoneNumber ?? "",
        deliveryAddress: profile.deliveryAddress ?? "",
      });
    }
  }, [profile]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!identity) {
      navigate({ to: "/login" });
    }
  }, [identity, navigate]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    try {
      await saveProfile.mutateAsync(form);
      toast.success("Profile saved successfully!");
    } catch {
      toast.error("Failed to save profile. Please try again.");
    }
  };

  const handleStatusChange = async (orderId: bigint, status: OrderStatus) => {
    try {
      await updateStatus.mutateAsync({ orderId, status });
      toast.success(`Order updated to ${status}`);
    } catch {
      toast.error("Failed to update order status");
    }
  };

  if (!identity) return null;

  return (
    <div className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p
            className="text-xs tracking-[0.25em] uppercase font-semibold mb-3"
            style={{ color: "oklch(0.76 0.14 75)" }}
          >
            — Account
          </p>
          <h1
            className="text-4xl font-bold"
            style={{
              fontFamily: '"Playfair Display", serif',
              color: "oklch(0.94 0.015 76)",
            }}
          >
            My Profile
          </h1>
          <p
            className="text-sm mt-2 font-mono"
            style={{ color: "oklch(0.45 0.03 52)" }}
          >
            {identity.getPrincipal().toString().slice(0, 24)}…
          </p>
        </motion.div>

        {/* Profile form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-sm border p-6 sm:p-8 mb-10"
          style={{
            background: "oklch(0.14 0.02 44)",
            borderColor: "oklch(0.28 0.03 50)",
          }}
        >
          <h2
            className="text-xl font-bold mb-6"
            style={{
              fontFamily: '"Playfair Display", serif',
              color: "oklch(0.92 0.015 76)",
            }}
          >
            Personal Details
          </h2>

          {profileLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }, (_, i) => `skel-${i}`).map((k) => (
                <div key={k} className="h-12 shimmer rounded-sm" />
              ))}
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold"
                    style={{ color: "oklch(0.62 0.04 58)" }}
                  >
                    <User size={13} /> Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Your full name"
                    required
                    className="bg-background border-border focus:border-[oklch(0.76_0.14_75)] transition-colors duration-200"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold"
                    style={{ color: "oklch(0.62 0.04 58)" }}
                  >
                    <Phone size={13} /> Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phoneNumber}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phoneNumber: e.target.value }))
                    }
                    placeholder="+1 (555) 000-0000"
                    className="bg-background border-border focus:border-[oklch(0.76_0.14_75)] transition-colors duration-200"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold"
                    style={{ color: "oklch(0.62 0.04 58)" }}
                  >
                    <Mail size={13} /> Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="you@example.com"
                    className="bg-background border-border focus:border-[oklch(0.76_0.14_75)] transition-colors duration-200"
                  />
                </div>

                {/* Address */}
                <div className="space-y-2 sm:col-span-2">
                  <Label
                    htmlFor="address"
                    className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold"
                    style={{ color: "oklch(0.62 0.04 58)" }}
                  >
                    <MapPin size={13} /> Delivery Address
                  </Label>
                  <Input
                    id="address"
                    value={form.deliveryAddress}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        deliveryAddress: e.target.value,
                      }))
                    }
                    placeholder="123 Main St, City, State, ZIP"
                    className="bg-background border-border focus:border-[oklch(0.76_0.14_75)] transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saveProfile.isPending}
                  className="btn-gold gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saveProfile.isPending ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Saving…
                    </>
                  ) : (
                    <>
                      <Save size={16} /> Save Profile
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-2xl font-bold"
              style={{
                fontFamily: '"Playfair Display", serif',
                color: "oklch(0.92 0.015 76)",
              }}
            >
              My Orders
            </h2>
            {isAdmin && (
              <span
                className="text-xs px-3 py-1 rounded-sm font-semibold tracking-widest uppercase"
                style={{
                  background: "oklch(0.76 0.14 75 / 0.15)",
                  color: "oklch(0.76 0.14 75)",
                  border: "1px solid oklch(0.76 0.14 75 / 0.3)",
                }}
              >
                Admin
              </span>
            )}
          </div>

          {ordersLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 2 }, (_, i) => `skel-${i}`).map((k) => (
                <div key={k} className="h-32 shimmer rounded-sm" />
              ))}
            </div>
          ) : (orders ?? []).length === 0 ? (
            <div
              className="rounded-sm border p-12 text-center"
              style={{
                background: "oklch(0.14 0.02 44)",
                borderColor: "oklch(0.26 0.03 50)",
              }}
            >
              <Package
                size={36}
                className="mx-auto mb-4"
                style={{ color: "oklch(0.40 0.04 52)" }}
              />
              <p
                className="text-lg font-serif mb-2"
                style={{ color: "oklch(0.55 0.04 55)" }}
              >
                No orders yet
              </p>
              <p
                className="text-sm mb-6"
                style={{ color: "oklch(0.40 0.03 52)" }}
              >
                Your order history will appear here
              </p>
              <a href="/shop">
                <button type="button" className="btn-gold text-sm px-6 py-3">
                  Start Shopping
                </button>
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {(orders ?? []).map((order) => (
                <OrderCard
                  key={order.id.toString()}
                  order={order}
                  isAdmin={!!isAdmin}
                  onStatusChange={(status) =>
                    handleStatusChange(order.id, status)
                  }
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
