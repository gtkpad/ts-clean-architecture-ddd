import { IProductRepository } from "../../../domain/product/repository/product-repository.interface";
import {
  InputUpdateProductDto,
  OutputUpdateProductDto,
} from "./update.product.dto";

export class UpdateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  public async execute(
    input: InputUpdateProductDto
  ): Promise<OutputUpdateProductDto> {
    const { id, name, price } = input;
    const product = await this.productRepository.find(id);

    product.changeName(name);
    product.changePrice(price);

    await this.productRepository.update(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
