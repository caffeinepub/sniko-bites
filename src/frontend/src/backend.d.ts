import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CartItem {
    size: Size;
    productId: bigint;
    quantity: bigint;
}
export interface Order {
    id: bigint;
    status: OrderStatus;
    deliveryAddress: string;
    userId: Principal;
    items: Array<CartItem>;
    totalPrice: number;
}
export interface Product {
    id: bigint;
    imagePath: string;
    name: string;
    description: string;
    sizes: Array<Size>;
    category: ProductCategory;
}
export interface UserProfile {
    deliveryAddress: string;
    name: string;
    email: string;
    phoneNumber: string;
}
export enum OrderStatus {
    Delivered = "Delivered",
    Processing = "Processing",
    Shipped = "Shipped",
    Pending = "Pending"
}
export enum ProductCategory {
    Dark = "Dark",
    Milk = "Milk",
    White = "White",
    Special = "Special"
}
export enum Size {
    _100g = "_100g",
    _500g = "_500g"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addToCart(productId: bigint, size: Size, quantity: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<Array<CartItem>>;
    getMyOrders(): Promise<Array<Order>>;
    getOrder(orderId: bigint): Promise<Order>;
    getProductById(id: bigint): Promise<Product>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    placeOrder(): Promise<bigint>;
    removeFromCart(productId: bigint, size: Size): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    seedProducts(): Promise<void>;
    updateOrderStatus(orderId: bigint, status: OrderStatus): Promise<void>;
}
