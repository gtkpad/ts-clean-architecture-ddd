import { Sequelize } from "sequelize-typescript";
import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address";
import { CustomerModel } from "../../../infrastructure/customer/repository/sequelize/customer.model";
import { CustomerRepository } from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { FindCustomerUseCase } from "./find.customer.usecase";

describe("Test find customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const useCase = new FindCustomerUseCase(customerRepository);

    const customer = new Customer("123", "John Doe");
    const address = new Address("Street", "City", 900, "Zip");
    customer.changeAddress(address);

    await customerRepository.create(customer);

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
});
