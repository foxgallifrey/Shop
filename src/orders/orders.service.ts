import { Injectable } from '@nestjs/common';
import {CreateOrderDTO} from "./dto/create-order.dto";
import {UpdateOrderDTO} from "./dto/update-order.dto";
import {Order} from "./order.model";
import {InjectModel} from "@nestjs/sequelize";
import {Basket} from "../basket/basket.model";
import {OrderItems} from "../order_items/order_items.model";
import {OrderItemsService} from "../order_items/order_items.service";
import {BasketService} from "../basket/basket.service";

@Injectable()
export class OrdersService {

    constructor(@InjectModel(Order) private orderRepository: typeof Order,
                @InjectModel(Basket) private basketRepository: typeof Basket,
                private basketService: BasketService,
                private orderItemsService: OrderItemsService){}

    async ordering(request: any){
        const user = request.user;
        const order = await this.orderRepository.create({
            user_id: user.id
        });

        const products = await this.basketRepository.findAll({
            where: {user_id: user.id}
        });

        await this.orderItemsService.createItems(products, order.id);
        await this.basketService.deleting_basket(user);

        return 'Заказ оформлен';
    }

}
