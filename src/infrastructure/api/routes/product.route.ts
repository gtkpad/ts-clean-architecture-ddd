import { Router, Request, Response } from "express";
import { CreateProductUseCase } from "../../../usecase/product/create/create.product.usecase";
import { ListProductUseCase } from "../../../usecase/product/list/list.product.usecase";
import { ProductRepository } from "../../order/repository/product.repository";

export const productRouter = Router();

productRouter.post("/", async (req: Request, res: Response) => {
  const useCase = new CreateProductUseCase(new ProductRepository());

  try {
    const { name, price } = req.body;
    const customerDto = {
      name,
      price,
    };
    const output = await useCase.execute(customerDto);
    return res.json(output);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

productRouter.get("/", async (req: Request, res: Response) => {
  const useCase = new ListProductUseCase(new ProductRepository());

  try {
    const output = await useCase.execute({});
    return res.json(output);
  } catch (err) {
    return res.status(500).send(err);
  }
});
