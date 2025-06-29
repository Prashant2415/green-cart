const express = require("express");
const { getBillingDetails } = require("../controller/billingController");
const billingRouter = express.Router();

//API calls

billingRouter.get("/billing/:id", getBillingDetails);

module.exports = billingRouter;