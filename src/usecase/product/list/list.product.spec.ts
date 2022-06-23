import { Product } from "../../../domain/product/entity/product";
import { ListProductUseCase } from "./list.product.usecase";

const product1 = new Product("123", "Product 1", 123);
const product2 = new Product("1234", "Product 2", 1234);

const MockRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
  create: jest.fn(),
  update: jest.fn(),
});

describe("Unit test list Product use case", () => {
  it("should list products", async () => {
    const productRepository = MockRepository();
    const useCase = new ListProductUseCase(productRepository);

    const output = await useCase.execute({});
    const expectedOutput = expect.arrayContaining([
      { id: "123", name: "Product 1", price: 123 },
      { id: "1234", name: "Product 2", price: 1234 },
    ]);

    expect(output.products).toEqual(expectedOutput);
  });
});
