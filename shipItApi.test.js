"use strict";

const AxiosMockAdapter = require("axios-mock-adapter");
const axios = require("axios");
const axiosMock = new AxiosMockAdapter(axios);


const {
  shipProduct,
  shipProducts,
  SHIPIT_SHIP_URL,
} = require("./shipItApi");


beforeAll(function () {
  axiosMock.onPost(SHIPIT_SHIP_URL, {
    itemId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
    key: "SUPER-DUPER-SECRET",
  }).reply(200, {
    receipt: {
      itemId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
      shipId: 1,
    },
  });

  axiosMock.onPost(SHIPIT_SHIP_URL, {
    itemId: 2000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
    key: "SUPER-DUPER-SECRET",
  }).reply(200, {
    receipt: {
      itemId: 2000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
      shipId: 2,
    },
  });
});

afterAll(function( ) {
  axiosMock.reset();
})


test("shipProduct", async function () {
  const shipId = await shipProduct({
    productId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
  });

  expect(shipId).toEqual(1);
});

test("shipProducts", async function () {
  const shipIds = await shipProducts({
    productIds: [1000, 2000],
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
  });

  expect(shipIds).toEqual([1, 2]);
});

