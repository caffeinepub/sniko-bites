# Harshellow Chocolates

## Current State
Existing project is "Sniko Bites" -- a sneaker e-commerce site with login, product grid, and Unsplash images. This is a full replacement with a new chocolate brand.

## Requested Changes (Diff)

### Add
- New brand: "Harshellow" -- premium artisan chocolate brand
- 20+ chocolate product varieties with real packaging-style images
- Product sizes and prices: 100g for $5, 500g for $150
- Login/signup page collecting: name, phone number, address, order history
- Add to Cart functionality with real cart state
- Order checkout flow with form and order confirmation
- "Chocolate Studio" section showing the real chocolate-making process
- Order history/checklist per user profile

### Modify
- Replace all sneaker content with chocolate products
- Replace existing auth (Internet Identity) with a custom profile form capturing name, phone, address
- Update branding, color scheme, and all copy to match chocolate luxury aesthetic

### Remove
- All sneaker/shoe content, images, and categories
- Sniko Bites branding

## Implementation Plan
1. Backend: Products catalog (20+ varieties), user profiles (name, phone, address), cart, orders
2. Frontend: Landing page with hero + studio section, product grid (20+ items), login/signup page with full profile form, cart drawer, checkout page, order history page
3. Images: Generate premium chocolate packaging images for 20+ products and studio shots
4. Auth: Custom login with profile stored in backend (name, phone, address, orders)
