import {IsNotEmpty, IsString, Length} from "class-validator";

export class UpdateCategoryDTO {

    @IsString({message: "Должно быть строкой"})
    @Length(2, 50, {message: "Не меньше 2 и не больше 50"})
    @IsNotEmpty({message: "Не должно быть пустым"})
    readonly title: string
}