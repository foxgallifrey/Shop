import {forwardRef, Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {OrderItemsController} from "./order_items.controller";
import {OrderItemsService} from "./order_items.service";
import {OrderItems} from "./order_items.model";
import {OrdersModule} from "../orders/orders.module";

@Module({
    providers: [OrderItemsService],
    controllers: [OrderItemsController],
    imports: [
        SequelizeModule.forFeature([OrderItems]), forwardRef(() => OrdersModule)
    ],
    exports: [OrderItemsService]
})

export class OrderItemsModule{

}