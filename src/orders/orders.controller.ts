import {
    Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, UsePipes,
    UseGuards, Req
} from '@nestjs/common';
import {ValidationPipe} from "../pipes/validation.pipe";
import {JwtAuthGuard} from "../users/jwt-auth.guard";

import {OrdersService} from "./orders.service";

@Controller('order')
export class OrdersController {

    constructor (private readonly orderService: OrdersService){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(JwtAuthGuard)
    ordering(@Req() request: any){
        return this.orderService.ordering(request);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    get(@Req() request: any){
        return this.orderService.get(request);
    }

    @Post(':id')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(JwtAuthGuard)
    addProduct(@Param('id') id: string, @Req() request: any){
        return this.orderService.addProduct(id, request);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    deleteProduct(@Param('id') id: string, @Req() request: any){
        return this.orderService.deleteProduct(id, request);
    }

}
