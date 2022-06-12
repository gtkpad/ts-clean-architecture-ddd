import { Sequelize } from "sequelize-typescript";
import { Address } from "../../../../domain/customer/value-object/address";
import { Customer } from "../../../../domain/customer/entity/customer";
import { CustomerModel } from "./customer.model";
import { CustomerRepository } from "./customer.repository";

describe("Customer Repository Test", () => {
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

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", "City 1", 1, "Zipcode 1");
    customer.address = address;
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: customer.address.street,
      number: customer.address.number,
      city: customer.address.city,
      zipcode: customer.address.zipcode,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", "City 1", 1, "Zipcode 1");
    customer.address = address;
    await customerRepository.create(customer);

    customer.changeName("Customer 2");

    await customerRepository.update(customer);

    const updatedCustomerModel = await CustomerModel.findOne({
      where: { id: "1" },
    });

    expect(updatedCustomerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      street: address.street,
      number: address.number,
      city: address.city,
      zipcode: address.zipcode,
      rewardPoints: customer.rewardPoints,
      active: customer.isActive(),
    });
  });

  it("should throw error when customer not exist", async () => {
    const customerRepository = new CustomerRepository();

    await expect(customerRepository.find("1")).rejects.toThrowError(
      "Customer with id 1 not found"
    );
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", "City 1", 1, "Zipcode 1");
    customer.address = address;
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    const foundCustomer = await customerRepository.find("1");

    expect(customerModel.toJSON()).toStrictEqual({
      id: foundCustomer.id,
      name: foundCustomer.name,
      active: foundCustomer.isActive(),
      rewardPoints: foundCustomer.rewardPoints,
      street: foundCustomer.address.street,
      number: foundCustomer.address.number,
      city: foundCustomer.address.city,
      zipcode: foundCustomer.address.zipcode,
    });
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();

    const customer1 = new Customer("1", "Customer 1");
    const address1 = new Address("Street 1", "City 1", 1, "Zipcode 1");
    customer1.address = address1;
    customer1.addRewardPoints(10);
    customer1.activate();

    const customer2 = new Customer("2", "Customer 2");
    const address2 = new Address("Street 2", "City 2", 2, "Zipcode 2");
    customer2.address = address2;
    customer2.addRewardPoints(20);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const foundCustomers = await customerRepository.findAll();

    expect(foundCustomers).toHaveLength(2);
    expect(foundCustomers).toContainEqual(customer1);
    expect(foundCustomers).toContainEqual(customer2);
  });
});
