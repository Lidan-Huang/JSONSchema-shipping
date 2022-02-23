"use strict";

const express = require("express");
const router = new express.Router();

const { shipProduct } = require("../shipItApi");
const jsonschema = require("jsonschema");
const shippingSchema = require("./shippingSchema.json");
const {BadRequestError} = require("../expressError");

/** POST /ship
 *
 * VShips an order coming from json body:
 *   { productId, name, addr, zip }
 *
 * Returns { shipped: shipId }
 */

router.post("/", async function (req, res, next) {
  if(!req.body.shipment) {
    throw new BadRequestError("Need key of the 'shipment'");
  }
  const result = jsonschema.validate(req.body.shipment, shippingSchema);
  if(!result.valid) {
    let errs = result.errors.map(err => err.stack);
    throw new BadRequestError(errs);
  }
  const { productId, name, addr, zip } = req.body;
  const shipId = await shipProduct({ productId, name, addr, zip });
  return res.json({ shipped: shipId });
});


module.exports = router;