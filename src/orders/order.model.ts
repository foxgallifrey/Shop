import {BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {OneToMany, OneToOne} from "typeorm";
import {User} from "../users/user.model";
import {OrderItems} from "../order_items/order_items.model";

interface OrderCreationAttr {
    user_id: number,
    status: string
}

@Table({tableName: 'orders'})
export class Order extends Model<Order, OrderCreationAttr> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false, defaultValue: "Open"})
    status: string;

    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 0})
    price: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => User)
    user_id: number;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => OrderItems)
    order_items: OrderItems[];


}