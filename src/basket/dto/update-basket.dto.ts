import {IsNotEmpty, IsString, Length, IsNumber} from "class-validator";

export class UpdateBasketDTO {

    @IsNotEmpty({message: "Не должно быть пустым"})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly product_id: number;

    @IsNotEmpty({message: "Не должно быть пустым"})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly count: number;

    @IsNotEmpty({message: "Не должно быть пустым"})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly price: number;

    @IsNotEmpty({message: "Не должно быть пустым"})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly user_id: number;
}