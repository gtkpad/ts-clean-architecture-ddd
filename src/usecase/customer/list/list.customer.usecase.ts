import { Customer } from "../../../domain/customer/entity/customer";
import { ICustomerRepository } from "../../../domain/customer/repository/customer-repository.interface";
import {
  InputListCustomerDto,
  OutputListCustomerDto,
} from "./list.customer.dto";

export class ListCustomerUseCase {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  public async execute(
    input: InputListCustomerDto
  ): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll();

    return OutputMapper.toOutput(customers);
  }
}

// tslint:disable-next-line: max-classes-per-file
class OutputMapper {
  static toOutput(customers: Customer[]): OutputListCustomerDto {
    return {
      customers: customers.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address.street,
          number: customer.address.number,
          city: customer.address.city,
          zip: customer.address.zipcode,
        },
      })),
    };
  }
}
