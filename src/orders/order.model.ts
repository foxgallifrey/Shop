import {Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {OneToOne} from "typeorm";
import {User} from "../users/user.model";

interface OrderCreationAttr {
    user_id: number;
}

@Table({tableName: 'orders'})
export class Order extends Model<Order, OrderCreationAttr> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => User)
    user_id: number;

    @OneToOne(() => User)
    user: User;
}