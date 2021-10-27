import { Model } from "sequelize-typescript";
interface CategoryCreationAttr {
    title: string;
}
export declare class Category extends Model<Category, CategoryCreationAttr> {
    id: number;
    title: string;
}
export {};
