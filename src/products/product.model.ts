import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ManyToOne} from "typeorm";
import {Category} from "../categories/category.model";

interface ProductCreationAttr {
    title: string
    price: number
    count: number
}

@Table({tableName: 'products'})
export class Product extends Model<Product, ProductCreationAttr> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @Column({type: DataType.STRING})
    description: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    price: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    count: number;

    @Column({type: DataType.INTEGER})
    @ForeignKey(() => Category)
    category_id: number;


    @BelongsTo(() => Category)
    category: Category;

}