import {Module} from "@nestjs/common";
import {UsersService} from "./users.service";
import {UsersController} from "./users.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {JwtModule} from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";

@Module({
    providers: [UsersService],
    controllers: [UsersController],
    imports: [
        SequelizeModule.forFeature([User]),
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY,
            signOptions: {
                expiresIn: '5h'
            }
        })
    ],
    exports: [UsersService, JwtModule]
})

export class UsersModule{
}