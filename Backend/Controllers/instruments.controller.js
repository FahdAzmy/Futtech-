const asyncHandler = require("../middlewares/asyncHandler");
const apiError = require("../utils/ApiError");
const Instruments = require("../models/Instruments.model");
const Metadata = require("../models/MetaData.Model");
const Candle = require("../models/Candle.Model");
/**
 * @desc Retrieve all financial instruments
 * @route GET /api/instruments
 * @access Public
 */
exports.getFinancialInstruments = asyncHandler(async (req, res) => {
  const instruments = await Instruments.find().populate("metadata");
  res.status(200).json(instruments);
});
/**
 * @desc Retrieve all metadata
 * @route GET /api/metadata
 * @access Public
 */
exports.getAllMetaData = asyncHandler(async (req, res) => {
  const metadata = await Metadata.find();
  res.status(200).json(metadata);
});
/**
 * @desc Retrieve a specific metadata
 * @route GET /api/metadata/:symbol
 * @access Public
 */
exports.getMetaData = asyncHandler(async (req, res) => {
  const { symbol } = req.params;
  const metadata = await Metadata.find({ symbol });
  if (!metadata) return next(apiError(404, "Instrument not found"));
  res.status(200).json(metadata);
});

/**
 * @desc Retrieve a specific financial instrument and its price history
 * @route GET /api/instrument/:symbol
 * @access Public
 */
exports.getFinancialInstrument = asyncHandler(async (req, res, next) => {
  const { symbol } = req.params;
  const instrument = await Instruments.findOne({ symbol }).populate(
    "metadata candles"
  );
  if (!instrument) return next(apiError(404, "Instrument not found"));

  res.status(200).json(instrument);
});

/**
 * @desc Get Candel of instrument
 * @route GET /api/candle/:symbol
 * @access Public
 */

exports.GetCandles = asyncHandler(async (req, res, next) => {
  const { symbol } = req.params;
  const candles = await Candle.find({ symbol });
  if (!candles) return next(apiError(404, "Instrument not found"));

  res.status(200).json({ status: "Success", candles });
});
