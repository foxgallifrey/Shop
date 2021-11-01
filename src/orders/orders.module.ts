import {forwardRef, Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {Order} from "./order.model";
import {UsersModule} from "../users/users.module";
import {OrdersService} from "./orders.service";
import {OrdersController} from "./orders.controller";
import {OrderItems} from "../order_items/order_items.model";
import {OrderItemsService} from "../order_items/order_items.service";
import {OrderItemsModule} from "../order_items/order_items.module";
import {Product} from "../products/product.model";
import {OrderUpdatedListener} from "./listeners/order-updated.listener";

@Module({
    providers: [OrdersService, OrderUpdatedListener],
    controllers: [OrdersController],
    imports: [
        SequelizeModule.forFeature([Order, OrderItems, Product]), forwardRef(() => OrderItemsModule), UsersModule
    ]
})

export class OrdersModule{

}