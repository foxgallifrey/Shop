import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderUpdatedEvent } from '../events/order-updated.event';
import {InjectModel} from "@nestjs/sequelize";
import {Order} from "../order.model";
import {Product} from "../../products/product.model";
import {OrderItems} from "../../order_items/order_items.model";

@Injectable()
export class OrderUpdatedListener {

    constructor(@InjectModel(Order) private orderRepository: typeof Order,
                @InjectModel(Product) private productRepository: typeof Product,
                @InjectModel(OrderItems) private orderItemsRepository: typeof OrderItems){}


    @OnEvent('order.updated',  { async: true })
    async handleOrderUpdatedEvent(event: OrderUpdatedEvent) {
        console.log(event.id);

        const order = await this.orderRepository.findByPk(event.id);
        let price = 0;

        const order_items = await this.orderItemsRepository.findAll({
            where: {order_id: event.id}
        });

        Object.keys(order_items).forEach((key) => {
            price = price + order_items[key].price;
        });

        await order.update({
            price: price
        })

    }
}
