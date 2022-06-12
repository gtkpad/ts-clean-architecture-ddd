import { Sequelize } from "sequelize-typescript";
import { Order } from "../../../../domain/checkout/entity/order";
import { OrderItem } from "../../../../domain/checkout/entity/order_item";
import { Address } from "../../../../domain/customer/value-object/address";
import { Customer } from "../../../../domain/customer/entity/customer";
import { Product } from "../../../../domain/product/entity/product";
import { CustomerModel } from "../../../customer/repository/sequelize/customer.model";
import { OrderItemModel } from "./order-item.model";
import { ProductModel } from "../../../product/repository/sequelize/product.model";
import { OrderRepository } from "./order.repository";
import { OrderModel } from "./order.model";
import { CustomerRepository } from "../../../customer/repository/sequelize/customer.repository";
import { ProductRepository } from "../../../product/repository/sequelize/product.repository";

describe("Order Repository Test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", "City 1", 1, "Zip 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const orderRepository = new OrderRepository();
    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("1", customer.id, [orderItem]);
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "1",
      customer_id: "1",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "1",
          product_id: "1",
        },
      ],
    });
  });

  it("should find a order by id", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", "City 1", 1, "Zip 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const orderRepository = new OrderRepository();
    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("1", customer.id, [orderItem]);
    await orderRepository.create(order);

    const findedOrder = await orderRepository.find(order.id);

    expect(findedOrder).toStrictEqual(order);
  });

  it("should throw error if try find an inexistent orderId", async () => {
    const orderRepository = new OrderRepository();
    await expect(orderRepository.find("1")).rejects.toThrow("Order not found");
  });

  it("should update one order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", "City 1", 1, "Zip 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    const product2 = new Product("2", "Product 2", 112);
    await productRepository.create(product);
    await productRepository.create(product2);

    const orderRepository = new OrderRepository();
    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("1", customer.id, [orderItem]);
    await orderRepository.create(order);

    const orderPreUpdate = await orderRepository.find(order.id);
    expect(orderPreUpdate).toStrictEqual(order);

    const newOrderItem = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      1
    );
    const updatedOrderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      6
    );

    const updatedOrder = new Order("1", customer.id, [
      updatedOrderItem,
      newOrderItem,
    ]);

    await orderRepository.update(updatedOrder);

    const findedOrder = await orderRepository.find(order.id);

    expect(findedOrder).toStrictEqual(updatedOrder);
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", "City 1", 1, "Zip 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    const product2 = new Product("2", "Product 2", 30);

    await productRepository.create(product);
    await productRepository.create(product2);

    const orderRepository = new OrderRepository();
    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      3
    );

    const order = new Order("1", customer.id, [orderItem]);
    const order2 = new Order("2", customer.id, [orderItem2]);
    await orderRepository.create(order);
    await orderRepository.create(order2);

    const findedOrder = await orderRepository.findAll();

    expect(findedOrder).toStrictEqual([order, order2]);
  });
});
