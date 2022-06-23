import { CreateCustomerUseCase } from "./create.customer.usecase";

const input = {
  name: "John",
  address: {
    street: "Street",
    number: 123,
    zip: "Zip",
    city: "City",
  },
};

const MockRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe("Unit Test create customer use case", () => {
  it("should create a customer", async () => {
    const customerRepository = MockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    const expectedOutput = {
      id: expect.any(String),
      ...input,
    };

    const output = await useCase.execute(input);
    expect(output).toEqual(expectedOutput);
  });

  it("should throw an error when name is missing", async () => {
    const customerRepository = MockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    const inputCopy = JSON.parse(JSON.stringify(input));

    inputCopy.name = "";

    await expect(useCase.execute(inputCopy)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should throw an error when street is missing", async () => {
    const customerRepository = MockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    const inputCopy = JSON.parse(JSON.stringify(input));

    inputCopy.address.street = "";

    await expect(useCase.execute(inputCopy)).rejects.toThrow(
      "Street is required"
    );
  });
});
