import { Product } from "../../../domain/product/entity/product";
import { IProductRepository } from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export class ListProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  public async execute(
    input: InputListProductDto
  ): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll();
    return OutputMapper.toOutput(products);
  }
}

// tslint:disable-next-line: max-classes-per-file
class OutputMapper {
  static toOutput(products: Product[]): OutputListProductDto {
    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}
