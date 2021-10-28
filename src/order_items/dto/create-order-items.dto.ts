import {IsNotEmpty, IsNumber} from "class-validator";

export class CreateOrderItemsDTO {

    @IsNotEmpty({message: "Не должно быть пустым"})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly order_id: number

    @IsNotEmpty({message: "Не должно быть пустым"})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly product_id: number

    @IsNotEmpty({message: "Не должно быть пустым"})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly count: number

    @IsNotEmpty({message: "Не должно быть пустым"})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly price: number

}
