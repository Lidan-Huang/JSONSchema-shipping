"use strict";

const shipItApi = require("../shipItApi");

shipItApi.shipProduct = jest.fn();
shipItApi.shipProducts = jest.fn();
const request = require("supertest");
const app = require("../app");


describe("POST /", function () {
  test("Valid", async function () {
    shipItApi.shipProduct.mockReturnValue(1234);

    const resp = await request(app).post("/shipments").send({
      shipment: {
        productId: 1000,
        name: "Test Tester",
        addr: "100 Test St",
        zipcode: "12345-6789"
      }
    });

    expect(resp.body).toEqual({ shipped: 1234 });
  });

  test("Not valid - No shipment key", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zipcode: "12345-6789",
    });

    expect(resp.body).toEqual({ "error": {"message": "Need key of the 'shipment'", "status": 400} });

    expect(resp.statusCode).toEqual(400);
  });

  test("Not valid - Zipcode should be string", async function () {
    const resp = await request(app).post("/shipments").send({
      shipment: {
        productId: 800,
        name: "Test Tester",
        addr: "100 Test St",
        zipcode: 12345
      }
    });

    expect(resp.body).toEqual({ "error": { "message": 
        ["instance.productId must be greater than or equal to 1000", 
        "instance.zipcode is not of a type(s) string"], 
        "status": 400,} });
  });
});
