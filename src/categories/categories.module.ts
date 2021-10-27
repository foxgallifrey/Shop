import {Module} from "@nestjs/common";
import {CategoriesService} from "./categories.service";
import {CategoriesController} from "./categories.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {Category} from "./category.model";

@Module({
    providers: [CategoriesService],
    controllers: [CategoriesController],
    imports: [
        SequelizeModule.forFeature([Category])
    ]
})

export class CategoriesModule{

}