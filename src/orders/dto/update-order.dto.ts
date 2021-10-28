import {IsNotEmpty, IsNumber} from "class-validator";

export class UpdateOrderDTO {

    @IsNotEmpty({message: "Не должно быть пустым"})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly user_id: number

}
