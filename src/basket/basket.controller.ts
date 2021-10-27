import {
    Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, UsePipes,
    UseGuards
} from '@nestjs/common';
import {ValidationPipe} from "../pipes/validation.pipe";
import {JwtAuthGuard} from "../users/jwt-auth.guard";

import {BasketService} from "./basket.service";

@Controller('basket')
export class BasketController {

    constructor (private readonly basketService: BasketService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    get(){
        return this.basketService.get();
    }

    @Post(':id')
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    addProduct(@Param('id') id: string){
        return this.basketService.addProduct(id);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    deleteProduct(@Param('id') id: string){
        return this.basketService.deleteProduct(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(JwtAuthGuard)
    ordering(){
        return this.basketService.ordering();
    }

}
