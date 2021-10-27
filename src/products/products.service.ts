import { Injectable } from '@nestjs/common';
import {CreateProductDTO} from "./dto/create-product.dto";
import {UpdateProductDTO} from "./dto/update-product.dto";
import {Product} from "./product.model";
import {InjectModel} from "@nestjs/sequelize";
import {Category} from "../categories/category.model";

@Injectable()
export class ProductsService {

    constructor(@InjectModel(Product) private productRepository: typeof Product){}

    async getAll(){
        const products = await this.productRepository.findAll()
        return products
    }

    async getById(id: string){
        const product = await this.productRepository.findByPk(id, { include: Category })
        return product
    }

    async createProduct(createProduct: CreateProductDTO){
        const product = await this.productRepository.create(createProduct)
        return product
    }

    async updateProduct(updateProduct: UpdateProductDTO, id: string){
        const product = await this.productRepository.findByPk(id)
        const new_product = await product.update(updateProduct)
        return new_product
    }

    async deleteProduct(id: string){
        const product = await this.productRepository.findByPk(id)
        product.destroy()
        return 'OK'
    }

    async searchProduct(title: string) {
        const product = await this.productRepository.findOne({
            where: {
                title: title
            }
        })
        return product
    }

}
