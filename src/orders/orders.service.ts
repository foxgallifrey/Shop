import { Injectable } from '@nestjs/common';
import {CreateOrderDTO} from "./dto/create-order.dto";
import {UpdateOrderDTO} from "./dto/update-order.dto";
import {Order} from "./order.model";
import {InjectModel} from "@nestjs/sequelize";
import {OrderItems} from "../order_items/order_items.model";
import {OrderItemsService} from "../order_items/order_items.service";
import {Product} from "../products/product.model";

@Injectable()
export class OrdersService {

    constructor(@InjectModel(Order) private orderRepository: typeof Order,
                @InjectModel(Product) private productRepository: typeof Product,
                @InjectModel(OrderItems) private orderItemsRepository: typeof OrderItems,
                private orderItemsService: OrderItemsService){}

    async ordering(request: any){
        const user = request.user;
        const order = await this.orderRepository.findOne({
            where: {user_id: user.id, status: "Open"}
        });

        if (!order){
            return "Ваша корзина пуста";
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
            await order.update({
                price: order.price + product.price
            })
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
            await order.update({
                price: order.price - product.price
            })
        } else {
            return "Такого товара нет в корзине";
        }

        return this.orderRepository.findOne({
            where: {user_id: user.id, status: "Open"},
            include: OrderItems
        });
    }


}
