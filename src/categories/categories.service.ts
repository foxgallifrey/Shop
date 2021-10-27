import { Injectable } from '@nestjs/common';
import {CreateCategoryDTO} from "./dto/create-category.dto";
import {UpdateCategoryDTO} from "./dto/update-category.dto";
import {Category} from "./category.model";
import {InjectModel} from "@nestjs/sequelize";
import {Product} from "../products/product.model";

@Injectable()
export class CategoriesService {

    constructor(@InjectModel(Category) private categoryRepository: typeof Category){}

    async getAll(){
        const categories = await this.categoryRepository.findAll()
        return categories
    }

    async getOne(id: string){
        const products = await this.categoryRepository.findByPk(id, { include: Product });
        return products
    }

    async createCategory(createCategory: CreateCategoryDTO){
        const category = await this.categoryRepository.create(createCategory)
        return category
    }

    async updateCategory(updateCategory: UpdateCategoryDTO, id: string){
        const category = await this.categoryRepository.findByPk(id)
        const new_category = await category.update(updateCategory)
        return new_category
    }

    async deleteCategory(id: string){
        const category = await this.categoryRepository.findByPk(id)
        category.destroy()
        return 'OK'
    }

}
