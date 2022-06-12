import { Customer } from "../../customer/entity/customer";
import { Order } from "../entity/order";
import { OrderItem } from "../entity/order_item";
import { OrderService } from "./order.service";

describe("Order Service Unit Test", () => {
  it("should place an order", () => {
    const customer = new Customer("cus1", "Customer1");
    const item = new OrderItem("item1", "Item1", 10, "product1", 1);

    const order = OrderService.placeOrder(customer, [item]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });
  it("should get total of all orders", () => {
    const item1 = new OrderItem("item1", "Item 1", 100, "p1", 1);
    const item2 = new OrderItem("item2", "Item 2", 200, "p1", 2);

    const order1 = new Order("order1", "customer1", [item1]);
    const order2 = new Order("order2", "customer1", [item2]);

    const total = OrderService.total(order1, order2);

    expect(total).toBe(500);
  });
});
