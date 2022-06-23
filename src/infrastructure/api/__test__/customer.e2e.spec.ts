import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const requestBody = {
      name: "John",
      address: {
        street: "Street",
        city: "City",
        number: 123,
        zip: "123456789",
      },
    };

    const response = await request(app).post("/customer").send(requestBody);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(requestBody));
    expect(response.body.id).toBeDefined();
    expect(response.body.id).toEqual(expect.any(String));
  });

  it("should not create a customer", async () => {
    const response = await request(app).post("/customer").send({
      name: "John",
    });

    expect(response.status).toBe(500);
  });

  it("should list all customers", async () => {
    const responseCreate1 = await request(app)
      .post("/customer")
      .send({
        name: "John",
        address: {
          street: "Street",
          city: "City",
          number: 123,
          zip: "123456789",
        },
      });
    const responseCreate2 = await request(app)
      .post("/customer")
      .send({
        name: "Clark",
        address: {
          street: "Street 2",
          city: "City 2",
          number: 1234,
          zip: "987654321",
        },
      });
    expect(responseCreate1.status).toBe(200);
    expect(responseCreate2.status).toBe(200);

    const expectedList = expect.arrayContaining([
      responseCreate1.body,
      responseCreate2.body,
    ]);

    const responseList = await request(app).get("/customer").send();

    expect(responseList.status).toBe(200);
    expect(responseList.body.customers).toHaveLength(2);
    expect(responseList.body.customers).toEqual(expectedList);
  });
});
