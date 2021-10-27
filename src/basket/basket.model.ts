import {Column, DataType, Model, Table} from "sequelize-typescript";

interface BasketCreationAttr {
    product_id: number
    price: number
    count: number
}

@Table({tableName: 'basket'})
export class Basket extends Model<Basket, BasketCreationAttr> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.INTEGER, allowNull: false})
    product_id: number

    @Column({type: DataType.INTEGER, allowNull: false})
    price: number

    @Column({type: DataType.INTEGER, allowNull: false})
    count: number
}