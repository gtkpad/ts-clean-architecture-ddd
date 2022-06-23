import { Router, Request, Response } from "express";
import { CreateCustomerUseCase } from "../../../usecase/customer/create/create.customer.usecase";
import { ListCustomerUseCase } from "../../../usecase/customer/list/list.customer.usecase";
import { CustomerRepository } from "../../customer/repository/sequelize/customer.repository";

export const customerRouter = Router();

customerRouter.post("/", async (req: Request, res: Response) => {
  const useCase = new CreateCustomerUseCase(new CustomerRepository());

  try {
    const { name, address } = req.body;
    const customerDto = {
      name,
      address: {
        street: address.street,
        city: address.city,
        number: address.number,
        zip: address.zip,
      },
    };
    const output = await useCase.execute(customerDto);
    return res.json(output);
  } catch (error) {
    return res.status(500).send(error);
  }
});

customerRouter.get("/", async (req: Request, res: Response) => {
  const useCase = new ListCustomerUseCase(new CustomerRepository());

  try {
    const output = await useCase.execute({});
    return res.json(output);
  } catch (err) {
    return res.status(500).send(err);
  }
});
