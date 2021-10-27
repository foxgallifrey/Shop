import {
    Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, UsePipes,
    UseGuards
} from '@nestjs/common';
import {ValidationPipe} from "../pipes/validation.pipe";
import {CreateCategoryDTO} from "./dto/create-category.dto";
import {UpdateCategoryDTO} from "./dto/update-category.dto";
import {CategoriesService} from "./categories.service";
import {AdminAuthGuard} from "../users/admin-auth.guard";

@Controller('categories')
export class CategoriesController {

    constructor (private readonly categotyService: CategoriesService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    getAll(){
        return this.categotyService.getAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getOne(@Param('id') id: string){
        return this.categotyService.getOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(ValidationPipe)
    @UseGuards(AdminAuthGuard)
    createCategory(@Body() createCategory: CreateCategoryDTO){
        return this.categotyService.createCategory(createCategory);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @UsePipes(ValidationPipe)
    @UseGuards(AdminAuthGuard)
    updateCategory(@Body() updateCategory: UpdateCategoryDTO, @Param('id') id: string){
        return this.categotyService.updateCategory(updateCategory, id);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AdminAuthGuard)
    deleteCategory(@Param('id') id: string){
        return this.categotyService.deleteCategory(id);
    }

}


