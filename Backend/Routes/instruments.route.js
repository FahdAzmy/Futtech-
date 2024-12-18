const express = require("express");
const {
  getFinancialInstruments,
  getFinancialInstrument,
  getAllMetaData,
  GetCandles,
  getMetaData,
} = require("../Controllers/instruments.controller");
const router = express.Router();
router.get("/instruments", getFinancialInstruments);
router.get("/metadata", getAllMetaData);
router.get("/instrument/:symbol", getFinancialInstrument);
router.get("/candle/:symbol", GetCandles);
router.get("/metadata/:symbol", getMetaData);
// router.get("/prices/:symbol", getPricesOfInstrument);
module.exports = router;
