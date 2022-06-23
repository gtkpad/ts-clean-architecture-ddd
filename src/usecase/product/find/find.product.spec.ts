import { Product } from "../../../domain/product/entity/product";
import { FindProductUseCase } from "./find.product.usecase";

const product = new Product("123", "Produto", 123);

const MockRepository = () => ({
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe("Unit test find product use case", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const useCase = new FindProductUseCase(productRepository);

    const input = {
      id: "123",
    };

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  it("should throw error when find a non-existent product", async () => {
    const productRepository = MockRepository();
    const useCase = new FindProductUseCase(productRepository);

    productRepository.find.mockImplementationOnce(async (id) => {
      throw new Error(`Product with id ${id} not found`);
    });

    const input = {
      id: "123",
    };

    await expect(useCase.execute(input)).rejects.toThrow(
      `Product with id ${input.id} not found`
    );
  });
});
