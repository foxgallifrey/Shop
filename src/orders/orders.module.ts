import {forwardRef, Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {Order} from "./order.model";
import {UsersModule} from "../users/users.module";
import {OrdersService} from "./orders.service";
import {OrdersController} from "./orders.controller";
import {Basket} from "../basket/basket.model";
import {OrderItems} from "../order_items/order_items.model";
import {OrderItemsService} from "../order_items/order_items.service";
import {OrderItemsModule} from "../order_items/order_items.module";
import {BasketService} from "../basket/basket.service";
import {BasketModule} from "../basket/basket.module";

@Module({
    providers: [OrdersService],
    controllers: [OrdersController],
    imports: [
        SequelizeModule.forFeature([Order, Basket, OrderItems]), forwardRef(() => OrderItemsModule), UsersModule, BasketModule
    ]
})

export class OrdersModule{

}