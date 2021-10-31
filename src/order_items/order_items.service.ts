import { Injectable } from '@nestjs/common';
import {CreateOrderItemsDTO} from "./dto/create-order-items.dto";
import {UpdateOrderItemsDTO} from "./dto/update-order-items.dto";
import {InjectModel} from "@nestjs/sequelize";
import {OrderItems} from "./order_items.model";

@Injectable()
export class OrderItemsService {

    constructor(@InjectModel(OrderItems) private orderItemsRepository: typeof OrderItems){}

    // async createItems(products: any, order_id: number){
    //     Object.keys(products).forEach((key) => {
    //         this.orderItemsRepository.create({
    //             count: products[key].count,
    //             price: products[key].price,
    //             product_id: products[key].product_id,
    //             order_id: order_id
    //         })
    //     });
    //     return 'OK';
    // }

}
