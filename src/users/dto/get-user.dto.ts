import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";

export class GetUserDTO {

    @IsNotEmpty({message: "Не должно быть пустым"})
    @IsString({message: "Должно быть строкой"})
    @Length(10, 60, {message: "Не меньше 10 и не больше 60"})
    @IsEmail({}, {message: "Некорректный email"})
    readonly email: string;

    @IsNotEmpty({message: "Не должно быть пустым"})
    @IsString({message: "Должно быть строкой"})
    @Length(8, 40, {message: "Не меньше 8 и не больше 40"})
    readonly password: string;

}