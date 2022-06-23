import { Product } from "../../../domain/product/entity/product";
import { IProductRepository } from "../../../domain/product/repository/product-repository.interface";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./create.product.dto";
import { v4 as uuid } from "uuid";

export class CreateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  public async execute(
    input: InputCreateProductDto
  ): Promise<OutputCreateProductDto> {
    const { name, price } = input;
    const product = new Product(uuid(), name, price);

    await this.productRepository.create(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
