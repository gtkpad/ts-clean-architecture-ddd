import { Product } from "../../../../domain/product/entity/product";
import { IProductRepository } from "../../../../domain/product/repository/product-repository.interface";
import { ProductModel } from "./product.model";

export class ProductRepository implements IProductRepository {
  public async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  public async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  public async find(id: string): Promise<Product> {
    let productModel: ProductModel;

    try {
      productModel = await ProductModel.findOne({
        where: { id },
        rejectOnEmpty: true,
      });
    } catch {
      throw new Error(`Product with id ${id} not found`);
    }

    return new Product(productModel.id, productModel.name, productModel.price);
  }

  public async findAll(): Promise<Product[]> {
    const productModels = await ProductModel.findAll();

    return productModels.map(
      (productModel) =>
        new Product(productModel.id, productModel.name, productModel.price)
    );
  }
}
