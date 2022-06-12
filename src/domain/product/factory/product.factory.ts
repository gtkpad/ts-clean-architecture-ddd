import { Product } from "../entity/product";
import { IProduct } from "../entity/product.interface";
import { v4 as uuid } from "uuid";
import { ProductB } from "../entity/product-b";

export class ProductFactory {
  public static create(type: string, name: string, price: number): IProduct {
    switch (type) {
      case "a":
        return new Product(uuid(), name, price);
        break;
      case "b":
        return new ProductB(uuid(), name, price);
        break;
      default:
        throw new Error("Invalid product type");
        break;
    }
  }
}
