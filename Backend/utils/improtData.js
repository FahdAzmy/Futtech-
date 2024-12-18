const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const CandleModel = require("../models/Candle.Model");
const InstrumentsModel = require("../models/Instruments.model");
const MetadataModel = require("../models/MetaData.Model");
const connectDB = require("../db/connectToDB");

const importData = async () => {
  try {
    // Connect to database
    await connectDB();

    // Define file paths
    const metadataPath = path.join(__dirname, "../data/metadata.json");
    const exchangePath = path.join(__dirname, "../data/exchange.json");
    const candlePath = path.join(__dirname, "../data/candle.json");

    // Read metadata
    const metadata = JSON.parse(
      fs.readFileSync(metadataPath, "utf-8")
    ).hits.hits.map((hit) => hit._source);

    // Read exchanges
    const exchanges = JSON.parse(
      fs.readFileSync(exchangePath, "utf-8")
    ).hits.hits.map((hit) => hit._source);

    // Read candles
    const candles = JSON.parse(
      fs.readFileSync(candlePath, "utf-8")
    ).hits.hits.map((hit) => hit._source);

    // Insert metadata
    const metadataDocs = await MetadataModel.insertMany(
      metadata.map((meta) => ({
        ...meta,
        symbol: meta.symbol || generateUniqueSymbol(), // Fallback if no symbol
      }))
    );
    console.log("Metadata imported successfully!");

    // Create instruments with associated metadata
    const instruments = exchanges.map((exchange) => {
      // Find matching metadata
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
        candles: [], // Initialize empty array for candle references
      };
    });

    // Remove duplicate instruments
    const uniqueInstruments = instruments.filter(
      (instrument, index, self) =>
        index === self.findIndex((i) => i.symbol === instrument.symbol)
    );

    // Insert instruments into DB
    const instrumentDocs = await InstrumentsModel.insertMany(uniqueInstruments);
    console.log("Instruments imported successfully!");

    // Insert candles and link them to instruments
    const candleDocs = [];
    for (const candle of candles) {
      const instrument = instrumentDocs.find(
        (inst) => inst.symbol === candle.symbol
      );

      if (instrument) {
        // Create candle document
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
      }
    }

    // Save updated instruments with candles references
    for (const instrument of instrumentDocs) {
      await instrument.save();
    }

    console.log("Candles imported and linked successfully!");

    // Close database connection
    mongoose.connection.close();
    console.log("Data imported and database connection closed.");
  } catch (error) {
    console.error("Error importing data:", error.message);
    process.exit(1);
  }
};

// Utility function to generate a fallback symbol
function generateUniqueSymbol() {
  return `SYM${Math.floor(Math.random() * 10000)}`;
}

// Run import process
importData();
