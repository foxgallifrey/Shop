import { Model } from "sequelize-typescript";
interface BasketCreationAttr {
    product_id: number;
    price: number;
    count: number;
}
export declare class Basket extends Model<Basket, BasketCreationAttr> {
    id: number;
    product_id: number;
    price: number;
    count: number;
}
export {};
