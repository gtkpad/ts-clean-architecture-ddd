import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const requestBody = {
      name: "Product",
      price: 123,
    };

    const response = await request(app).post("/product").send(requestBody);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(requestBody));
    expect(response.body.id).toBeDefined();
    expect(response.body.id).toEqual(expect.any(String));
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product",
    });

    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const responseCreate1 = await request(app).post("/product").send({
      name: "Product 1",
      price: 10,
    });
    const responseCreate2 = await request(app).post("/product").send({
      name: "Product 2",
      price: 20,
    });
    expect(responseCreate1.status).toBe(200);
    expect(responseCreate2.status).toBe(200);

    const expectedList = expect.arrayContaining([
      responseCreate1.body,
      responseCreate2.body,
    ]);

    const responseList = await request(app).get("/product").send();

    expect(responseList.status).toBe(200);
    expect(responseList.body.products).toHaveLength(2);
    expect(responseList.body.products).toEqual(expectedList);
  });
});
