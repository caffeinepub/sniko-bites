import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { useActor } from "./hooks/useActor";
import {
  useAllProducts,
  useIsSeeded,
  useSeedProducts,
} from "./hooks/useQueries";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { OrderConfirmationPage } from "./pages/OrderConfirmationPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ShopPage } from "./pages/ShopPage";

// ─── Root layout with seeding logic ───────────────────────────────
function RootLayout() {
  const { actor, isFetching } = useActor();
  const { data: products } = useAllProducts();
  const seedMutation = useSeedProducts();
  const isSeeded = useIsSeeded();

  const seedMutate = seedMutation.mutate;
  useEffect(() => {
    if (actor && !isFetching && !isSeeded) {
      if (products !== undefined && products.length === 0) {
        seedMutate();
      }
    }
  }, [actor, isFetching, products, isSeeded, seedMutate]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "oklch(0.16 0.022 45)",
            border: "1px solid oklch(0.76 0.14 75 / 0.3)",
            color: "oklch(0.95 0.015 75)",
            fontFamily: '"Plus Jakarta Sans", sans-serif',
          },
        }}
      />
    </div>
  );
}

// ─── Routes ───────────────────────────────────────────────────────
const rootRoute = createRootRoute({ component: RootLayout });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop",
  component: ShopPage,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$id",
  component: ProductDetailPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: CartPage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: CheckoutPage,
});

const orderConfirmRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order/$id",
  component: OrderConfirmationPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  shopRoute,
  productRoute,
  loginRoute,
  profileRoute,
  cartRoute,
  checkoutRoute,
  orderConfirmRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
