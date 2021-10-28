import {
    Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, UsePipes,
    UseGuards, Req
} from '@nestjs/common';
import {ValidationPipe} from "../pipes/validation.pipe";
import {JwtAuthGuard} from "../users/jwt-auth.guard";

import {OrderItemsService} from "./order_items.service";

@Controller('order')
export class OrderItemsController {

    constructor (private readonly orderItemsService: OrderItemsService){}


}
