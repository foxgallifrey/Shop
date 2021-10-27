import {Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, UsePipes} from '@nestjs/common';
import {ValidationPipe} from "../pipes/validation.pipe";

import {BasketService} from "./basket.service";

@Controller('basket')
export class BasketController {

    constructor (private readonly basketService: BasketService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    get(){
        return this.basketService.get()
    }

    @Post(':id')
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(ValidationPipe)
    addProduct(@Param('id') id: string){
        return this.basketService.addProduct(id)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    deleteProduct(@Param('id') id: string){
        return this.basketService.deleteProduct(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    ordering(){
        return this.basketService.ordering()
    }

}
