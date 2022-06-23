import { ICustomerRepository } from "../../../domain/customer/repository/customer-repository.interface";
import { Address } from "../../../domain/customer/value-object/address";
import {
  InputUpdateCustomerDto,
  OutputUpdateCustomerDto,
} from "./update.customer.dto";

export class UpdateCustomerUseCase {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  public async execute(
    input: InputUpdateCustomerDto
  ): Promise<OutputUpdateCustomerDto> {
    const { name, address } = input;
    const customer = await this.customerRepository.find(input.id);

    customer.changeName(name);
    customer.changeAddress(
      new Address(address.street, address.city, address.number, address.zip)
    );

    await this.customerRepository.update(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        number: customer.address.number,
        zip: customer.address.zipcode,
      },
    };
  }
}
