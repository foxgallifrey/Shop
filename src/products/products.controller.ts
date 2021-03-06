import {
    Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, UsePipes, UseGuards
} from '@nestjs/common';
import {CreateProductDTO} from "./dto/create-product.dto";
import {UpdateProductDTO} from "./dto/update-product.dto";
import {ProductsService} from "./products.service";
import {ValidationPipe} from "../pipes/validation.pipe";
import {JwtAuthGuard} from "../users/jwt-auth.guard";
import {AdminAuthGuard} from "../users/admin-auth.guard";

@Controller('products')
export class ProductsController {

    constructor (private readonly productService: ProductsService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    getAll(){
        return this.productService.getAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getById(@Param('id') id: string){
        return this.productService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(ValidationPipe)
    @UseGuards(AdminAuthGuard)
    createProduct(@Body() createProduct: CreateProductDTO){
        return this.productService.createProduct(createProduct);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @UsePipes(ValidationPipe)
    @UseGuards(AdminAuthGuard)
    updateProduct(@Body() updateProduct: UpdateProductDTO, @Param('id') id: string){
        return this.productService.updateProduct(updateProduct, id);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AdminAuthGuard)
    deleteProduct(@Param('id') id: string){
        return this.productService.deleteProduct(id);
    }

    @Post('search/:title')
    @HttpCode(HttpStatus.CREATED)
    searchProduct(@Param('title') title: string){
        return this.productService.searchProduct(title);
    }


}
