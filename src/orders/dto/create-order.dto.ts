import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateOrderDTO {

    @IsNotEmpty({message: "Не должно быть пустым"})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly user_id: number;

    @IsString({message: "Должно быть строкой"})
    readonly status: string;

}
