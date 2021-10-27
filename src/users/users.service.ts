import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDTO} from "./dto/create-user.dto";
import {UpdateUserDTO} from "./dto/update-user.dto";
import {GetUserDTO} from "./dto/get-user.dto";
import {User} from "./user.model";
import {InjectModel} from "@nestjs/sequelize";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs"

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private jwtService: JwtService){}

    async login(getUser: GetUserDTO){
        const user = await this.validateUser(getUser);
        return this.generateToken(user);
    }

    async register(createUser: CreateUserDTO){
        const existing_user = await this.getUserByEmail(createUser.email);
        if (existing_user){
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST);
        }
        const hash_password = await bcrypt.hash(createUser.password, 5);
        const user = await this.createNewUser({...createUser, password: hash_password});
        return this.generateToken(user);
    }

    private async generateToken(user: User){
        const payload = {email: user.email, id: user.id, is_admin: user.is_admin};
        return {
            token: this.jwtService.sign(payload)
        };
    }

    private async createNewUser(createUser: CreateUserDTO) {
        const user = await this.userRepository.create(createUser);
        return user;
    }

    async logout(createUser: CreateUserDTO){

    }

    private async getUserByEmail(email: string){
        const user = await this.userRepository.findOne({
            where: {
                email: email
            }
        });
        return user;
    }

    private async validateUser(getUser: GetUserDTO){
        const user = await this.getUserByEmail(getUser.email);
        if (!user){
            throw new UnauthorizedException({message: 'Нет пользователя с таким email'});
        }
        const password_verification = await bcrypt.compare(getUser.password, user.password);

        if (password_verification){
            return user;
        }
        throw new UnauthorizedException({message: 'Некорректный пароль'});
    }

}
