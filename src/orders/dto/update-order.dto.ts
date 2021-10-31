import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class UpdateOrderDTO {

    @IsNotEmpty({message: "Не должно быть пустым"})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly user_id: number;

    // @IsNumber({}, {message: "Должно быть числом"})
    // readonly price: number;

    @IsString({message: "Должно быть строкой"})
    readonly status: string;

}
