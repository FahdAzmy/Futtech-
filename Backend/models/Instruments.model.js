const mongoose = require("mongoose");

const instrumentSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  type: String,
  ticker: String,
  code: String,
  name: String,
  nameLong: String,
  region: String,
  country: String,
  currency: String,
  source: String,
  operatingMIC: String,
  codeExchange: String,
  virtualExchange: String,
  nameExchange: String,
  isArtificialExchange: Boolean,
  segmentExchange: String,
  segmentNameExchange: String,
  metadata: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Metadata",
    require: false,
  },
  candles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candle",
      require: false,
    },
  ],
});

module.exports = mongoose.model("Instrument", instrumentSchema);
