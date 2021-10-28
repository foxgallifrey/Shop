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

}
