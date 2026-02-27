import { Badge } from "@/components/ui/badge";
import { Check, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { toast } from "sonner";
import type { Sneaker } from "../hooks/useQueries";
import { getSneakerImage } from "../utils/sneakerImages";

interface ProductModalProps {
  sneaker: Sneaker | null;
  index: number;
  onClose: () => void;
}

interface ModalContentProps {
  sneaker: Sneaker;
  index: number;
  onClose: () => void;
}

/** Inner content — mounted with a key, so state resets when sneaker changes */
function ModalContent({ sneaker, index, onClose }: ModalContentProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size first");
      return;
    }
    setAddedToCart(true);
    toast.success(`${sneaker.name} (Size ${selectedSize}) added to cart!`);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal wrapper */}
      <motion.div
        key="modal-wrapper"
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex items-center justify-center pointer-events-none"
      >
        <dialog
          ref={dialogRef}
          aria-labelledby={titleId}
          open
          className="bg-card border border-border w-full max-w-4xl max-h-[90vh] overflow-hidden pointer-events-auto flex flex-col md:flex-row p-0 m-0 outline-none"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === "Escape") onClose();
          }}
        >
          {/* Image */}
          <div className="relative md:w-1/2 bg-secondary flex-shrink-0 overflow-hidden">
            <div className="aspect-square w-full">
              <img
                src={getSneakerImage(sneaker.category, index)}
                alt={sneaker.name}
                className="w-full h-full object-cover"
              />
            </div>
            {sneaker.isFeatured && (
              <div className="absolute top-4 left-4">
                <span className="font-display font-black text-[10px] tracking-[0.2em] uppercase bg-primary text-primary-foreground px-2 py-1">
                  Featured Drop
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col overflow-y-auto p-6 md:p-8 relative">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-200 rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="pr-8">
              <Badge
                variant="outline"
                className="text-[10px] font-bold uppercase tracking-widest border-primary/50 text-primary rounded-none px-2 mb-4"
              >
                {sneaker.category}
              </Badge>

              <h2
                id={titleId}
                className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-foreground mb-3"
              >
                {sneaker.name}
              </h2>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {sneaker.description}
              </p>

              <div className="font-heading font-black text-4xl text-primary mb-8">
                ${sneaker.price.toFixed(0)}
              </div>

              {/* Sizes */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display font-bold text-xs uppercase tracking-widest text-foreground">
                    Select Size
                  </span>
                  {selectedSize && (
                    <span className="text-xs text-primary font-bold">
                      Size {selectedSize} selected
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {sneaker.sizes.map((size) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() =>
                        setSelectedSize(selectedSize === size ? null : size)
                      }
                      className={`size-btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        selectedSize === size ? "selected" : ""
                      }`}
                      aria-pressed={selectedSize === size}
                      aria-label={`Size ${size}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`w-full flex items-center justify-center gap-2 font-display font-black text-sm uppercase tracking-widest py-4 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  addedToCart ? "bg-green-600 text-white" : "btn-primary"
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-4 h-4" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </>
                )}
              </button>

              {/* Features */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Free Returns",
                    "Authentic Guarantee",
                    "Fast Shipping",
                    "Secure Payment",
                  ].map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </dialog>
      </motion.div>
    </>
  );
}

export function ProductModal({ sneaker, index, onClose }: ProductModalProps) {
  return (
    <AnimatePresence>
      {sneaker && (
        <ModalContent
          key={sneaker.id.toString()}
          sneaker={sneaker}
          index={index}
          onClose={onClose}
        />
      )}
    </AnimatePresence>
  );
}
