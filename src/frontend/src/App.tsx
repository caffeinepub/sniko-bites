import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { AboutSection } from "./components/AboutSection";
import { AllKicksSection } from "./components/AllKicksSection";
import { CollectionsSection } from "./components/CollectionsSection";
import { FeaturedSection } from "./components/FeaturedSection";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { MarqueeBar } from "./components/MarqueeBar";
import { Navbar } from "./components/Navbar";
import { NewsletterSection } from "./components/NewsletterSection";
import { ProductModal } from "./components/ProductModal";
import { type Sneaker, useSeedAndFetch } from "./hooks/useQueries";

export default function App() {
  const {
    allSneakers,
    featuredSneakers,
    isLoading,
    seed,
    isSeeded,
    actorReady,
  } = useSeedAndFetch();

  const [selectedSneaker, setSelectedSneaker] = useState<Sneaker | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // Seed once on first load
  useEffect(() => {
    if (actorReady && !isSeeded) {
      seed();
    }
  }, [actorReady, isSeeded, seed]);

  const handleQuickView = (sneaker: Sneaker, index: number) => {
    setSelectedSneaker(sneaker);
    setSelectedIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedSneaker(null);
  };

  const handleCategoryFilter = (category: string) => {
    setCategoryFilter(category);
  };

  // Use featured sneakers for featured section; fall back to all if empty
  const displayFeatured =
    featuredSneakers.length > 0
      ? featuredSneakers
      : allSneakers.filter((s) => s.isFeatured);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeBar />
        <FeaturedSection
          sneakers={displayFeatured}
          isLoading={isLoading}
          onQuickView={handleQuickView}
        />
        <CollectionsSection onCategoryFilter={handleCategoryFilter} />
        <AllKicksSection
          sneakers={allSneakers}
          isLoading={isLoading}
          activeFilter={categoryFilter}
          onQuickView={handleQuickView}
        />
        <AboutSection />
        <NewsletterSection />
      </main>
      <Footer />

      <ProductModal
        sneaker={selectedSneaker}
        index={selectedIndex}
        onClose={handleCloseModal}
      />

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "oklch(0.13 0 0)",
            border: "1px solid oklch(0.22 0 0)",
            color: "oklch(0.97 0 0)",
          },
        }}
      />
    </div>
  );
}
