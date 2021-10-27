import { CreateProductDTO } from "./dto/create-product.dto";
import { UpdateProductDTO } from "./dto/update-product.dto";
import { ProductsService } from "./products.service";
export declare class ProductsController {
    private readonly productService;
    constructor(productService: ProductsService);
    getAll(): string;
    getById(id: string): string;
    createProduct(createProduct: CreateProductDTO): string;
    updateProduct(updateProduct: UpdateProductDTO, id: string): string;
    deleteProduct(id: string): string;
}
