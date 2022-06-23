import { Product } from "../../../domain/product/entity/product";
import { UpdateProductUseCase } from "./update.product.usecase";

const product = new Product("123", "Product", 123);

const input = {
  id: product.id,
  name: "Product Updated",
  price: 1234,
};

const MockRepository = () => ({
  find: jest.fn().mockReturnValue(product),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe("Update product unit test", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const useCase = new UpdateProductUseCase(productRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual(input);
  });
});
