import { Entity } from "../../@shared/entity/entity.abstract";
import { ProductValidatorFactory } from "../factory/product.validator.factory";
import { IProduct } from "./product.interface";

export class ProductB extends Entity implements IProduct {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;

    this.validate();
  }

  validate(): boolean {
    ProductValidatorFactory.create().validate(this);
    return !this.notification.hasErrors();
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changePrice(price: number): void {
    this._price = price;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get price(): number {
    return this._price * 2;
  }

  get name(): string {
    return this._name;
  }
}
