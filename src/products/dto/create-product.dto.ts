import {IsNotEmpty, IsNumber, IsString, Length} from "class-validator";

export class CreateProductDTO {

    @IsString({message: "Должно быть строкой"})
    @Length(2, 50, {message: "Не меньше 2 и не больше 50"})
    @IsNotEmpty({message: "Не должно быть пустым"})

    readonly title: string

    readonly description: string

    @IsNotEmpty({message: "Не должно быть пустым"})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly price: number

    @IsNotEmpty({message: "Не должно быть пустым"})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly count: number

    readonly category_id: number
}