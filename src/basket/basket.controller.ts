import {
    Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, UsePipes,
    UseGuards, Req
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
    get(@Req() request: any){
        return this.basketService.get(request);
    }

    @Post(':id')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(JwtAuthGuard)
    addProduct(@Param('id') id: string, @Req() request: any){
        return this.basketService.addProduct(id, request);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    deleteProduct(@Param('id') id: string, @Req() request: any){
        return this.basketService.deleteProduct(id, request);
    }


}
