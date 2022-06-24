import { toXML } from "jstoxml";
import { OutputListCustomerDto } from "../../../usecase/customer/list/list.customer.dto";

export class CustomerPresenter {
  static toXML(data: OutputListCustomerDto): string {
    const xmlOptions = {
      header: true,
      indent: " ",
      newline: "\n",
      allowEmpty: true,
    };

    return toXML(
      {
        customers: {
          customer: data.customers.map((customer) => ({ ...customer })),
        },
      },
      xmlOptions
    );
  }
}
