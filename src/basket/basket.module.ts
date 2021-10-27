import {Module} from "@nestjs/common";
import {BasketService} from "./basket.service";
import {BasketController} from "./basket.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {Basket} from "./basket.model";
import {Product} from "../products/product.model";

@Module({
    providers: [BasketService],
    controllers: [BasketController],
    imports: [
        SequelizeModule.forFeature([Basket, Product])
    ]
})

export class BasketModule{

}