// Maps product names to their local generated images
// Products are seeded in the backend in a specific order - we match by name keywords

const PRODUCT_IMAGE_MAP: Record<string, string> = {
  "Dark 70": "/assets/generated/choco-dark-70.dim_600x600.jpg",
  "70%": "/assets/generated/choco-dark-70.dim_600x600.jpg",
  Milk: "/assets/generated/choco-milk.dim_600x600.jpg",
  "White Chocolate": "/assets/generated/choco-white.dim_600x600.jpg",
  "Pure White": "/assets/generated/choco-white.dim_600x600.jpg",
  Hazelnut: "/assets/generated/choco-hazelnut.dim_600x600.jpg",
  "Sea Salt": "/assets/generated/choco-sea-salt-caramel.dim_600x600.jpg",
  Caramel: "/assets/generated/choco-sea-salt-caramel.dim_600x600.jpg",
  Raspberry: "/assets/generated/choco-raspberry.dim_600x600.jpg",
  Orange: "/assets/generated/choco-orange.dim_600x600.jpg",
  Mint: "/assets/generated/choco-mint.dim_600x600.jpg",
  Almond: "/assets/generated/choco-almond.dim_600x600.jpg",
  Espresso: "/assets/generated/choco-espresso.dim_600x600.jpg",
  Chili: "/assets/generated/choco-chili.dim_600x600.jpg",
  Strawberry: "/assets/generated/choco-strawberry.dim_600x600.jpg",
  Pistachio: "/assets/generated/choco-pistachio.dim_600x600.jpg",
  Coconut: "/assets/generated/choco-coconut.dim_600x600.jpg",
  Lavender: "/assets/generated/choco-lavender.dim_600x600.jpg",
  Matcha: "/assets/generated/choco-matcha.dim_600x600.jpg",
  Truffle: "/assets/generated/choco-truffle-box.dim_600x600.jpg",
  Rose: "/assets/generated/choco-rose.dim_600x600.jpg",
  Cardamom: "/assets/generated/choco-cardamom.dim_600x600.jpg",
  Toffee: "/assets/generated/choco-toffee.dim_600x600.jpg",
  Saffron: "/assets/generated/choco-saffron.dim_600x600.jpg",
};

// Ordered fallback list for index-based assignment
const ORDERED_IMAGES = [
  "/assets/generated/choco-dark-70.dim_600x600.jpg",
  "/assets/generated/choco-milk.dim_600x600.jpg",
  "/assets/generated/choco-white.dim_600x600.jpg",
  "/assets/generated/choco-hazelnut.dim_600x600.jpg",
  "/assets/generated/choco-sea-salt-caramel.dim_600x600.jpg",
  "/assets/generated/choco-raspberry.dim_600x600.jpg",
  "/assets/generated/choco-orange.dim_600x600.jpg",
  "/assets/generated/choco-mint.dim_600x600.jpg",
  "/assets/generated/choco-almond.dim_600x600.jpg",
  "/assets/generated/choco-espresso.dim_600x600.jpg",
  "/assets/generated/choco-chili.dim_600x600.jpg",
  "/assets/generated/choco-strawberry.dim_600x600.jpg",
  "/assets/generated/choco-pistachio.dim_600x600.jpg",
  "/assets/generated/choco-coconut.dim_600x600.jpg",
  "/assets/generated/choco-lavender.dim_600x600.jpg",
  "/assets/generated/choco-matcha.dim_600x600.jpg",
  "/assets/generated/choco-truffle-box.dim_600x600.jpg",
  "/assets/generated/choco-rose.dim_600x600.jpg",
  "/assets/generated/choco-cardamom.dim_600x600.jpg",
  "/assets/generated/choco-toffee.dim_600x600.jpg",
  "/assets/generated/choco-saffron.dim_600x600.jpg",
];

export function getProductImage(name: string, index?: number): string {
  // First try exact keyword match
  for (const [keyword, imagePath] of Object.entries(PRODUCT_IMAGE_MAP)) {
    if (name.includes(keyword)) {
      return imagePath;
    }
  }
  // Fallback to index-based
  if (index !== undefined) {
    return ORDERED_IMAGES[index % ORDERED_IMAGES.length];
  }
  return ORDERED_IMAGES[0];
}

export const SIZE_PRICES: Record<string, number> = {
  _100g: 5,
  _500g: 150,
};

export function getSizeLabel(size: string): string {
  const labels: Record<string, string> = {
    _100g: "100g",
    _500g: "500g",
  };
  return labels[size] ?? size;
}

export function getSizePrice(size: string): number {
  return SIZE_PRICES[size] ?? 5;
}
