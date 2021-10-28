import {IsNotEmpty, IsNumber} from "class-validator";

export class UpdateOrderItemsDTO {

    @IsNotEmpty({message: "Не должно быть пустым"})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly order_id: number

    @IsNotEmpty({message: "Не должно быть пустым"})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly product_id: number

    @IsNotEmpty({message: "Не должно быть пустым"})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly count_id: number

    @IsNotEmpty({message: "Не должно быть пустым"})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly price_id: number

}
