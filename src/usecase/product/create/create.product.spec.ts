import { CreateProductUseCase } from "./create.product.usecase";

const input = {
  name: "Product",
  price: 123,
};

const MockRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const expectedOutput = {
      id: expect.any(String),
      ...input,
    };
    const output = await useCase.execute(input);

    expect(output).toEqual(expectedOutput);
  });

  it("should throw error on create a product without name", async () => {
    const productRepository = MockRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const newInput = JSON.parse(JSON.stringify(input));

    newInput.name = "";

    await expect(useCase.execute(newInput)).rejects.toThrow("Name is required");
  });

  it("should throw error on create a product when price is less than 0", async () => {
    const productRepository = MockRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const newInput = JSON.parse(JSON.stringify(input));

    newInput.price = -10;

    await expect(useCase.execute(newInput)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
