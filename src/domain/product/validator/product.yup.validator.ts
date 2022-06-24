import { IValidator } from "../../@shared/validator/validator.interface";
import * as yup from "yup";
import { IProduct } from "../entity/product.interface";

export class ProductYupValidator implements IValidator<IProduct> {
  validate(entity: IProduct): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("Id is required"),
          name: yup.string().required("Name is required"),
          price: yup.number().moreThan(0, "Price must be greater than zero"),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            price: entity.price,
          },
          { abortEarly: false }
        );
    } catch (errors) {
      const yupErrors = errors as yup.ValidationError;
      yupErrors.errors.forEach((error) => {
        entity.notification.addError({
          context: "product",
          message: error,
        });
      });
    }
  }
}
