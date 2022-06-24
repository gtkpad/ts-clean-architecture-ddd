import { Notification } from "../../@shared/notification/notification";
export interface IProduct {
  notification: Notification;
  get id(): string;
  get name(): string;
  get price(): number;

  changeName(name: string): void;
  changePrice(price: number): void;
}
