import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address";
import { FindCustomerUseCase } from "./find.customer.usecase";

const customer = new Customer("123", "John Doe");
const address = new Address("Street", "City", 900, "Zip");
customer.changeAddress(address);

const MockRepository = () => ({
  find: jest.fn().mockReturnValue(Promise.resolve(customer)),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe("Test find customer use case", () => {
  it("should find a customer", async () => {
    const customerRepository = MockRepository();
    const useCase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: "123",
    };

    const expectedOutput = {
      id: "123",
      name: "John Doe",
      address: {
        street: "Street",
        city: "City",
        number: 900,
        zip: "Zip",
      },
    };

    const output = await useCase.execute(input);
    expect(output).toEqual(expectedOutput);
  });

  it("should not find a customer", async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementationOnce((id) => {
      throw new Error(`Customer with id ${id} not found`);
    });
    const useCase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: "123",
    };

    await expect(useCase.execute(input)).rejects.toThrow(
      `Customer with id 123 not found`
    );
  });
});
