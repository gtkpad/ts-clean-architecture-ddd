import { Order } from "../../domain/entity/order";
import { OrderItem } from "../../domain/entity/order_item";
import { IOrderRepository } from "../../domain/repository/order-repository.interface";
import { OrderItemModel } from "../db/sequelize/model/order-item.model";
import { OrderModel } from "../db/sequelize/model/order.model";

export class OrderRepository implements IOrderRepository {
  public async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  public async update(entity: Order): Promise<void> {
    const transaction = await OrderModel.sequelize.transaction();
    try {
      await OrderItemModel.destroy({
        where: { order_id: entity.id },
        transaction,
      });
      await OrderModel.update(
        {
          customer_id: entity.customerId,
          total: entity.total(),
        },
        {
          where: { id: entity.id },
          transaction,
        }
      );

      const orderItems = entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id,
      }));
      await OrderItemModel.bulkCreate(orderItems, { transaction });
      await transaction.commit();
    } catch {
      await transaction.rollback();
    }
  }

  public async find(id: string): Promise<Order> {
    let order: OrderModel;
    try {
      order = await OrderModel.findOne({
        where: { id },
        include: [{ model: OrderItemModel }],
        rejectOnEmpty: true,
      });
    } catch {
      throw new Error("Order not found");
    }

    return new Order(
      order.id,
      order.customer_id,
      order.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          )
      )
    );
  }

  public async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });

    return orders.map(
      (order) =>
        new Order(
          order.id,
          order.customer_id,
          order.items.map(
            (item) =>
              new OrderItem(
                item.id,
                item.name,
                item.price,
                item.product_id,
                item.quantity
              )
          )
        )
    );
  }
}
