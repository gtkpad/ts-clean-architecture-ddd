import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../customer/repository/sequelize/customer.model";
import { customerRouter } from "./routes/customer.route";

export const app: Express = express();
app.use(express.json());
app.use("/customer", customerRouter);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });

  sequelize.addModels([CustomerModel]);
  await sequelize.sync();
}

setupDb();
