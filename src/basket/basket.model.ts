import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {OneToOne} from "typeorm";
import {User} from "../users/user.model";

interface BasketCreationAttr {
    product_id: number
    price: number
    count: number
    user_id: number
}

@Table({tableName: 'basket'})
export class Basket extends Model<Basket, BasketCreationAttr> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    product_id: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    price: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    count: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => User)
    user_id: number;

    @OneToOne(() => User)
    user: User;
}