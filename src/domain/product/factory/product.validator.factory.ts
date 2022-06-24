import { IValidator } from "../../@shared/validator/validator.interface";
import { IProduct } from "../entity/product.interface";
import { ProductYupValidator } from "../validator/product.yup.validator";

export class ProductValidatorFactory {
  public static create(): IValidator<IProduct> {
    return new ProductYupValidator();
  }
}
