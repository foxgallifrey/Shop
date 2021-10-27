import {Module} from "@nestjs/common";
import {CategoriesService} from "./categories.service";
import {CategoriesController} from "./categories.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {Category} from "./category.model";
import {UsersModule} from "../users/users.module";

@Module({
    providers: [CategoriesService],
    controllers: [CategoriesController],
    imports: [
        SequelizeModule.forFeature([Category]), UsersModule
    ]
})

export class CategoriesModule{

}