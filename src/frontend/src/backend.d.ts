import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Sneaker {
    id: bigint;
    name: string;
    description: string;
    sizes: Array<string>;
    isFeatured: boolean;
    category: string;
    price: number;
}
export interface backendInterface {
    getAllSneakers(): Promise<Array<Sneaker>>;
    getFeaturedSneakers(): Promise<Array<Sneaker>>;
    getSneakerById(id: bigint): Promise<Sneaker>;
    seedSneakers(): Promise<void>;
}
