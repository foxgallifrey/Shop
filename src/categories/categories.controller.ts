import {Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, UsePipes} from '@nestjs/common';
import {ValidationPipe} from "../pipes/validation.pipe";
import {CreateCategoryDTO} from "./dto/create-category.dto";
import {UpdateCategoryDTO} from "./dto/update-category.dto";
import {CategoriesService} from "./categories.service";

@Controller('categories')
export class CategoriesController {

    constructor (private readonly categotyService: CategoriesService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    getAll(){
        return this.categotyService.getAll()
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getOne(@Param('id') id: string){
        return this.categotyService.getOne(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(ValidationPipe)
    createCategory(@Body() createCategory: CreateCategoryDTO){
        return this.categotyService.createCategory(createCategory)
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @UsePipes(ValidationPipe)
    updateCategory(@Body() updateCategory: UpdateCategoryDTO, @Param('id') id: string){
        return this.categotyService.updateCategory(updateCategory, id)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    deleteCategory(@Param('id') id: string){
        return this.categotyService.deleteCategory(id)
    }

}


