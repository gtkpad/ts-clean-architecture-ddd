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
    const responseListXML = await request(app)
      .get("/customer")
      .set("Accept", "application/xml")
      .send();

    expect(responseList.status).toBe(200);
    expect(responseList.body.customers).toHaveLength(2);
    expect(responseList.body.customers).toEqual(expectedList);

    expect(responseListXML.status).toBe(200);
    expect(responseListXML.text).toContain(
      `<?xml version="1.0" encoding="UTF-8"?>`
    );
    expect(responseListXML.text).toContain(`<customers>`);
    expect(responseListXML.text).toContain(`<customer>`);
    expect(responseListXML.text).toContain(`<name>John</name>`);
    expect(responseListXML.text).toContain(`<address>`);
    expect(responseListXML.text).toContain(`<street>Street</street>`);
    expect(responseListXML.text).toContain(`<city>City</city>`);
    expect(responseListXML.text).toContain(`<number>123</number>`);
    expect(responseListXML.text).toContain(`<zip>123456789</zip>`);
    expect(responseListXML.text).toContain(`</address>`);
    expect(responseListXML.text).toContain(`</customer>`);
    expect(responseListXML.text).toContain(`<customer>`);
    expect(responseListXML.text).toContain(`<name>Clark</name>`);
    expect(responseListXML.text).toContain(`<address>`);
    expect(responseListXML.text).toContain(`<street>Street 2</street>`);
    expect(responseListXML.text).toContain(`<city>City 2</city>`);
    expect(responseListXML.text).toContain(`<number>1234</number>`);
    expect(responseListXML.text).toContain(`<zip>987654321</zip>`);
    expect(responseListXML.text).toContain(`</address>`);
    expect(responseListXML.text).toContain(`</customer>`);
    expect(responseListXML.text).toContain(`</customers>`);
  });
});
