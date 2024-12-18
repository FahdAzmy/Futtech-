const mongoose = require("mongoose");

// 1. Metadata Schema
const metadataSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
    },
    performance: String,
    geography: String,
    sector: String,
    fundSize: Number,
    inceptionDate: Date,
    riskLevel: String,
    description: String,
    gicSector: String,
    gicGroup: String,
    gicIndustry: String,
    gicSubIndustry: String,
    addressDetails: {
      zip: String,
      city: String,
      state: String,
      street: String,
      country: String,
    },
    phone: String,
    webUrl: String,
    category: String,
    fundSummary: String,
    fundFamily: String,
    fundFiscalYearEnd: String,
    officers: [
      {
        name: String,
        title: String,
        yearBorn: String,
      },
    ],
    marketCapitalization: {
      value: Number,
      dominance: Number,
      diluted: Number,
      average: Number,
      bucket: [
        {
          category: String,
          size: String,
          categoryAverage: Number,
          benchmark: Number,
          portfolioPercent: Number,
          value: Number,
        },
      ],
    },
    technicals: {
      beta: Number,
      "52WeekHigh": Number,
      "52WeekLow": Number,
      "50DayMA": Number,
      "200DayMA": Number,
      sharesShort: Number,
      sharesShortPriorMonth: Number,
      shortRatio: Number,
      shortPercent: Number,
    },
  },
  {
    // Add a unique index on symbol to ensure no duplicates
    indexes: [{ symbol: 1 }],
  }
);

const Metadata = mongoose.model("Metadata", metadataSchema);
module.exports = Metadata;
