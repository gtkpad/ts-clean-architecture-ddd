import { Order } from "../entity/order";
import { OrderItem } from "../entity/order_item";

interface IOrderFactoryProps {
  id: string;
  customerId: string;
  items: {
    id: string;
    name: string;
    productId: string;
    price: number;
    quantity: number;
  }[];
}

export class OrderFactory {
  public static create(props: IOrderFactoryProps): Order {
    const items = props.items.map(
      (item) =>
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.productId,
          item.quantity
        )
    );
    return new Order(props.id, props.customerId, items);
  }
}
