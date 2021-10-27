import {
    Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, UsePipes
} from '@nestjs/common';
import {CreateUserDTO} from "./dto/create-user.dto";
import {UpdateUserDTO} from "./dto/update-user.dto";
import {GetUserDTO} from "./dto/get-user.dto";
import {UsersService} from "./users.service";
import {ValidationPipe} from "../pipes/validation.pipe";

@Controller('users')
export class UsersController {

    constructor (private readonly userService: UsersService){}

    @Post("/login")
    @HttpCode(HttpStatus.OK)
    @UsePipes(ValidationPipe)
    login(@Body() getUser: GetUserDTO){
        return this.userService.login(getUser);
    }

    @Post("/register")
    @HttpCode(HttpStatus.OK)
    @UsePipes(ValidationPipe)
    register(@Body() createUser: CreateUserDTO){
        return this.userService.register(createUser);
    }

    @Post("/logout")
    @HttpCode(HttpStatus.OK)
    logout(@Body() createUser: CreateUserDTO){
        return this.userService.logout(createUser);
    }




}
