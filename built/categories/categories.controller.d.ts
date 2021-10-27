import { CreateCategoryDTO } from "./dto/create-category.dto";
import { UpdateCategoryDTO } from "./dto/update-category.dto";
export declare class CategoriesController {
    getAll(): string;
    createCategory(createCategory: CreateCategoryDTO): string;
    updateCategory(updateCategory: UpdateCategoryDTO, id: string): string;
    deleteCategory(id: string): string;
}
