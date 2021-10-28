import { Injectable } from '@nestjs/common';
import {Basket} from "./basket.model";
import {InjectModel} from "@nestjs/sequelize";
import {Product} from "../products/product.model";

@Injectable()
export class BasketService {

    constructor(@InjectModel(Basket) private basketRepository: typeof Basket,
                @InjectModel(Product) private productRepository: typeof Product ){}

    async get(request: any){
        const basket = await this.basketRepository.findAll({
            where: {user_id: request.user.id}
        });
        return basket;
    }

    async addProduct(id: string, request: any) {
        const user = request.user;
        const product = await this.productRepository.findByPk(id);
        const product_in_basket = await this.basketRepository.findOne({
            where: { product_id: id, user_id: user.id },
        });

        if (product.count != 0){
            if (product_in_basket) {
                if (product.count > product_in_basket.count){
                    await product_in_basket.update({
                        price: product.price + product_in_basket.price,
                        count: product_in_basket.count + 1
                    })
                } else {
                    return 'Столько товара у нас пока нет';
                }
            } else {
                await this.basketRepository.create({
                    product_id: product.id,
                    price: product.price,
                    count: 1,
                    user_id: user.id
                });
            }
        } else {
            return 'Товар закончился';
        }

        return this.basketRepository.findAll({
            where: {user_id: user.id}
        });
    }


    async deleteProduct(id: string, request: any){
        const user = request.user;
        const product = await this.productRepository.findByPk(id);
        const product_in_basket = await this.basketRepository.findOne({
            where: { product_id: id, user_id: user.id },
        });

        if (product_in_basket) {
            if (product_in_basket.count == 1){
                await product_in_basket.destroy();
            } else {
                await product_in_basket.update({
                    price: product_in_basket.price - product.price,
                    count: product_in_basket.count - 1
                });
            }
        } else {
            return "Такого товара нет в корзине";
        }

        return this.basketRepository.findAll({
            where: {user_id: user.id}
        });
    }


    async deleting_basket(user: any){
        const products = await this.basketRepository.findAll({
            where: {user_id: user.id}
        });
        products.forEach(async (element) => {
            const product = await this.productRepository.findByPk(element.product_id);
            product.update({
                count: product.count - element.count
            });
            await element.destroy();
        });
    }

}
