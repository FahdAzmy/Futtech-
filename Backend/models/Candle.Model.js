const mongoose = require("mongoose");

const candleSchema = new mongoose.Schema({
  symbol: String,
  dateTime: Date,
  startPrice: Number,
  highestPrice: Number,
  lowestPrice: Number,
  endPrice: Number,
  volume: Number,
  source: String,
  candleType: String,
  currency: String,
});

const Candle = mongoose.model("Candle", candleSchema);

module.exports = Candle;
