import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { Address } from "../../../domain/customer/value-object/address";
import { ListCustomerUseCase } from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
  "Customer 1",
  new Address("Street 1", "City 1", 900, "Zip 1")
);

const customer2 = CustomerFactory.createWithAddress(
  "Customer 2",
  new Address("Street 2", "City 2", 900, "Zip 2")
);

const MockRepository = () => ({
  create: jest.fn(),
  findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
  find: jest.fn(),
  update: jest.fn(),
});

describe("Unit test for listing customer use case", () => {
  it("should list a customer", async () => {
    const customerRepository = MockRepository();
    const useCase = new ListCustomerUseCase(customerRepository);

    const output = await useCase.execute({});

    const expectedOutput = expect.arrayContaining([
      expect.objectContaining({
        address: {
          city: "City 1",
          number: 900,
          street: "Street 1",
          zip: "Zip 1",
        },
        name: "Customer 1",
      }),
      expect.objectContaining({
        address: {
          city: "City 2",
          number: 900,
          street: "Street 2",
          zip: "Zip 2",
        },
        name: "Customer 2",
      }),
    ]);

    expect(output.customers).toHaveLength(2);
    expect(output.customers).toEqual(expectedOutput);
  });
});
