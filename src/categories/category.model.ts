import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {OneToMany} from "typeorm";
import {Product} from "../products/product.model";

interface CategoryCreationAttr {
    title: string
}

@Table({tableName: 'categories'})
export class Category extends Model<Category, CategoryCreationAttr> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string

    // @OneToMany(() => Product, product => product.category_id)
    // product: Product[];

    @HasMany(() => Product)
    products: Product[]
}