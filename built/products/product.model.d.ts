import { Model } from "sequelize-typescript";
interface ProductCreationAttr {
    title: string;
    price: number;
    count: number;
}
export declare class Product extends Model<Product, ProductCreationAttr> {
    id: number;
    title: string;
    description: string;
    price: number;
    count: number;
    category_id: number;
}
export {};
