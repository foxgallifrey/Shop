import { CreateBasketDTO } from "./dto/create-basket.dto";
export declare class BasketController {
    getAll(): string;
    addProduct(CreateBasket: CreateBasketDTO): string;
    checkout(): string;
    deleteProduct(id: string): string;
}
