const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const CandleModel = require("../models/Candle.Model");
const InstrumentsModel = require("../models/Instruments.model");
const MetadataModel = require("../models/MetaData.Model");
const connectDB = require("../db/connectToDB");

const importData = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Define paths for the metadata, exchange, and candle JSON files
    const metadataPath = path.join(__dirname, "../data/metadata.json");
    const exchangePath = path.join(__dirname, "../data/exchange.json");
    const candlePath = path.join(__dirname, "../data/candle.json");

    // Read and parse metadata from the JSON file
    const metadata = JSON.parse(
      fs.readFileSync(metadataPath, "utf-8")
    ).hits.hits.map((hit) => hit._source);

    // Read and parse exchange data from the JSON file
    const exchanges = JSON.parse(
      fs.readFileSync(exchangePath, "utf-8")
    ).hits.hits.map((hit) => hit._source);

    // Read and parse candle data from the JSON file
    const candles = JSON.parse(
      fs.readFileSync(candlePath, "utf-8")
    ).hits.hits.map((hit) => hit._source);

    // Insert metadata into the database, with a fallback for missing symbols
    const metadataDocs = await MetadataModel.insertMany(
      metadata.map((meta) => ({
        ...meta,
        symbol: meta.symbol || generateUniqueSymbol(), // Fallback if no symbol is provided
      }))
    );
    console.log("Metadata imported successfully!");

    // Create instruments and link them to associated metadata
    const instruments = exchanges.map((exchange) => {
      // Find matching metadata for each exchange
      const meta = metadata.find(
        (item) =>
          item.symbol === exchange.symbol ||
          item.ticker === exchange.ticker ||
          item.name === exchange.name
      );

      const metadataDoc = meta
        ? metadataDocs.find(
            (doc) =>
              doc.symbol === meta.symbol ||
              doc.ticker === meta.ticker ||
              doc.name === meta.name
          )
        : null;

      // Return an object representing the instrument
      return {
        symbol: exchange.symbol,
        type: exchange.type || meta?.type || "",
        ticker: exchange.ticker || meta?.ticker || "",
        code: exchange.code || meta?.code || "",
        name: exchange.name || meta?.name || "",
        nameLong: exchange.nameLong || meta?.nameLong || "",
        region: exchange.region || meta?.region || "",
        country: exchange.country || meta?.country || "",
        currency: meta?.currency || exchange.currency || "",
        source: exchange.source || meta?.source || "",
        operatingMIC: exchange.operatingMIC || "",
        codeExchange: exchange.codeExchange || "",
        virtualExchange: exchange.virtualExchange || "",
        nameExchange: exchange.nameExchange || "",
        isArtificialExchange: exchange.isArtificialExchange || false,
        segmentExchange: exchange.segmentExchange || "",
        segmentNameExchange: exchange.segmentNameExchange || "",
        metadata: metadataDoc ? metadataDoc._id : null,
        candles: [], // Initialize an empty array for candle references
      };
    });

    // Remove duplicate instruments based on their symbol
    const uniqueInstruments = instruments.filter(
      (instrument, index, self) =>
        index === self.findIndex((i) => i.symbol === instrument.symbol)
    );

    // Insert unique instruments into the database
    const instrumentDocs = await InstrumentsModel.insertMany(uniqueInstruments);
    console.log("Instruments imported successfully!");

    // Insert candles into the database and link them to the appropriate instruments
    const candleDocs = [];
    const instrumentMap = new Map(); // A map to collect candles for each instrument

    for (const candle of candles) {
      const instrument = instrumentDocs.find(
        (inst) => inst.symbol === candle.symbol
      );

      if (instrument) {
        // Create a new candle document
        const newCandle = await CandleModel.create({
          symbol: candle.symbol,
          dateTime: new Date(candle.dateTime),
          startPrice: candle.startPrice,
          highestPrice: candle.highestPrice,
          lowestPrice: candle.lowestPrice,
          endPrice: candle.endPrice,
          volume: candle.volume,
          source: candle.source,
          candleType: candle.candleType,
          currency: candle.currency,
        });

        // Link the candle to the corresponding instrument
        instrument.candles.push(newCandle._id);
        candleDocs.push(newCandle);

        // Collect candles in the instrumentMap
        if (!instrumentMap.has(instrument.symbol)) {
          instrumentMap.set(instrument.symbol, []);
        }
        instrumentMap.get(instrument.symbol).push(newCandle);
      }
    }

    // Save the updated instruments, now with references to their linked candles
    for (const instrument of instrumentDocs) {
      const candlesForInstrument = instrument.candles || [];

      if (candlesForInstrument.length >= 2) {
        // Fetch the last two candles for the instrument
        const sortedCandles = await CandleModel.find({
          _id: { $in: candlesForInstrument.slice(-2) },
        }).sort({ dateTime: -1 });

        if (sortedCandles.length === 2) {
          const [latestCandle, previousCandle] = sortedCandles;

          // Calculate the current price, price change, and percentage change
          const price = latestCandle.endPrice;
          const change = latestCandle.endPrice - previousCandle.endPrice;
          const percentage = (change / previousCandle.endPrice) * 100;

          // Update the instrument with the calculated values
          instrument.currentPrice = price;
          instrument.priceChange = change;
          instrument.percentageChange = percentage;

          // Save the instrument to the database
          await instrument.save();
        }
      }
    }
    console.log("Candles imported and linked successfully!");

    // Close the database connection
    mongoose.connection.close();
    console.log("Data imported and database connection closed.");
  } catch (error) {
    console.error("Error importing data:", error.message);
    process.exit(1);
  }
};

// Utility function to generate a fallback symbol in case one is not provided
function generateUniqueSymbol() {
  return `SYM${Math.floor(Math.random() * 10000)}`;
}

// Run the data import process
importData();
