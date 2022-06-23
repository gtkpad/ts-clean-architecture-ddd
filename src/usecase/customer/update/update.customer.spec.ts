import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { Address } from "../../../domain/customer/value-object/address";
import { UpdateCustomerUseCase } from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "John",
  new Address("Street", "City", 123, "Zip")
);

const input = {
  id: customer.id,
  name: "John Updated",
  address: {
    street: "Street Updated",
    city: "City Updated",
    number: 1234,
    zip: "Zip Updated",
  },
};

const MockRepository = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(customer)),
  update: jest.fn(),
});

describe("Unit test for customer update use case", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const useCase = new UpdateCustomerUseCase(customerRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual(input);
  });
});
