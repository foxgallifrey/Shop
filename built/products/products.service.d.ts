import { CreateProductDTO } from "./dto/create-product.dto";
import { UpdateProductDTO } from "./dto/update-product.dto";
export declare class ProductsService {
    getAll(): string;
    getById(id: string): string;
    createProduct(createProduct: CreateProductDTO): string;
    updateProduct(updateProduct: UpdateProductDTO, id: string): string;
    deleteProduct(id: string): string;
}
