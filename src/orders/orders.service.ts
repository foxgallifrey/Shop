import { Injectable } from '@nestjs/common';
import {CreateOrderDTO} from "./dto/create-order.dto";
import {UpdateOrderDTO} from "./dto/update-order.dto";
import {Order} from "./order.model";
import {InjectModel} from "@nestjs/sequelize";
import {OrderItems} from "../order_items/order_items.model";
import {OrderItemsService} from "../order_items/order_items.service";
import {Product} from "../products/product.model";
import {EventEmitter2} from "@nestjs/event-emitter";
import {OrderUpdatedEvent} from "./events/order-updated.event";

@Injectable()
export class OrdersService {

    constructor(@InjectModel(Order) private orderRepository: typeof Order,
                @InjectModel(Product) private productRepository: typeof Product,
                @InjectModel(OrderItems) private orderItemsRepository: typeof OrderItems,
                private orderItemsService: OrderItemsService,
                private eventEmitter: EventEmitter2){}

    async ordering(request: any){
        const user = request.user;
        const order = await this.orderRepository.findOne({
            where: {user_id: user.id, status: "Open"}
        });

        if (!order){
            return "Ваша корзина пуста";
        }

        const order_items = await this.orderItemsRepository.findAll({
            where: {order_id: order.id}
        });

        for (let key in order_items){
            let product = await this.productRepository.findOne({
                where: {id: order_items[key].product_id}
            });
            await product.update({
                count: product.count - order_items[key].count
            });
        }

        await order.update({
            status: "Processed"
        });

        return 'Заказ оформлен';
    }

    async get(request: any){
        const order = await this.orderRepository.findOne({
            where: {user_id: request.user.id},
            include: OrderItems
        });
        return order;
    }

    async addProduct(id: string, request: any) {
        const user = request.user;
        const product = await this.productRepository.findByPk(id);

        const order = await this.orderRepository.findOne({
            where: { user_id: user.id, status: "Open" },
        });

        if (!order){
            const order = await this.orderRepository.create({
                user_id: user.id,
                status: "Open"
            });
        }

        const product_in_order = await this.orderItemsRepository.findOne({
            where: { product_id: id, order_id: order.id },
        });

        if (product.count != 0){
            if (product_in_order) {
                if (product.count > product_in_order.count){
                    await product_in_order.update({
                        price: product.price + product_in_order.price,
                        count: product_in_order.count + 1
                    })
                } else {
                    return 'Столько товара у нас пока нет';
                }
            } else {
                await this.orderItemsRepository.create({
                    product_id: product.id,
                    price: product.price,
                    count: 1,
                    order_id: order.id
                })
            }
            const orderUpdatedEvent = new OrderUpdatedEvent;
            orderUpdatedEvent.id = order.id;
            this.eventEmitter.emit('order.updated', orderUpdatedEvent);
        } else {
            return 'Товар закончился';
        }

        return this.orderRepository.findOne({
            where: {user_id: user.id, status: "Open"},
            include: OrderItems
        });
    }


    async deleteProduct(id: string, request: any){
        const user = request.user;
        const product = await this.productRepository.findByPk(id);
        const order = await this.orderRepository.findOne({
            where: { user_id: user.id, status: "Open" },
        });
        const product_in_order = await this.orderItemsRepository.findOne({
            where: { product_id: id, order_id: order.id },
        });

        if (product_in_order) {
            if (product_in_order.count == 1){
                await product_in_order.destroy();
            } else {
                await product_in_order.update({
                    price: product_in_order.price - product.price,
                    count: product_in_order.count - 1
                });
            }
            const orderUpdatedEvent = new OrderUpdatedEvent;
            orderUpdatedEvent.id = order.id;
            this.eventEmitter.emit('order.updated', orderUpdatedEvent);
        } else {
            return "Такого товара нет в корзине";
        }

        return this.orderRepository.findOne({
            where: {user_id: user.id, status: "Open"},
            include: OrderItems
        });
    }


}
