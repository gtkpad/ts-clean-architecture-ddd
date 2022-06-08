import { Order } from "./order";
import { OrderItem } from "./order_item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const order = new Order("", "123", []);
    }).toThrowError("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      const order = new Order("123", "", []);
    }).toThrowError("customerId is required");
  });

  it("should throw error when item list is empty", () => {
    expect(() => {
      const order = new Order("123", "123", []);
    }).toThrowError("Item qtd must be greater than zero");
  });

  it("should calculate total", () => {
    const item1 = new OrderItem("123", "Item 1", 100, "p1", 2);
    const item2 = new OrderItem("123", "Item 2", 200, "p2", 2);

    const order1 = new Order("o1", "c1", [item1]);
    const order2 = new Order("02", "c2", [item1, item2]);
    const total1 = order1.total();
    const total2 = order2.total();

    expect(total1).toBe(200);
    expect(total2).toBe(600);
  });

  it("should throw error if the item qte is less or equal 0", () => {
    expect(() => {
      const item = new OrderItem("123", "Item 1", 100, "p1", 0);

      const order = new Order("o1", "c1", [item]);
    }).toThrowError("Quantity must be greater than zero");
  });
});
