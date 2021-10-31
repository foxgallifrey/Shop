import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {ManyToOne, OneToOne} from "typeorm";
import {Product} from "../products/product.model";
import {Order} from "../orders/order.model";

interface OrderItemsCreationAttr {
    order_id: number
    product_id: number
    count: number
    price: number
}

@Table({tableName: 'order_items'})
export class OrderItems extends Model<OrderItems, OrderItemsCreationAttr> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    count: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    price: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => Product)
    product_id: number;

    @BelongsTo(() => Product)
    product: Product;

    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => Order)
    order_id: number;

    @BelongsTo(() => Order)
    order: Order;

}