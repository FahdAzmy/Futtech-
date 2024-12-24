import { render, screen } from "@testing-library/react";
import InsurmentInformation from "../components/DetailsPage/InsurmentInformation";
import React from "react";
import { expect, describe, it } from "vitest";

describe("InsurmentInformation", () => {
  const mockInstrument = {
    type: "Stock",
    symbol: "AAPL",
    country: "United States",
    currency: "USD",
  };

  it("renders the instrument details correctly", () => {
    render(<InsurmentInformation instrument={mockInstrument} />);

    // Check if the type is displayed correctly
    expect(screen.getByText("Asset-Typ")).toBeInTheDocument();
    expect(screen.getByText("Stock")).toBeInTheDocument();

    // Check if the symbol is displayed correctly
    expect(screen.getByText("Symbol")).toBeInTheDocument();
    expect(screen.getByText("AAPL")).toBeInTheDocument();

    // Check if the country and country code are displayed correctly
    expect(screen.getByText("Land")).toBeInTheDocument();
    expect(screen.getByText("United States (USD)")).toBeInTheDocument();

    // Check if the currency is displayed correctly
    expect(screen.getByText("Währung")).toBeInTheDocument();
    expect(screen.getByText("USD")).toBeInTheDocument();
  });

  it("renders fallback values when instrument properties are missing", () => {
    const instrumentWithMissingFields = {
      type: undefined,
      symbol: undefined,
      country: undefined,
      currency: undefined,
    };

    render(<InsurmentInformation instrument={instrumentWithMissingFields} />);

    // Check that there are exactly 3 instances of "N/A"
    const naElements = screen.getAllByText("N/A");
    expect(naElements.length).toBe(3); // Expecting exactly 3 "N/A" elements

    // Ensure each relevant field is correctly rendered
    expect(screen.getByText("Asset-Typ")).toBeInTheDocument();
    expect(screen.getByText("Symbol")).toBeInTheDocument();
    expect(screen.getByText("Währung")).toBeInTheDocument();
  });

  it("renders the correct country code based on the country name", () => {
    render(<InsurmentInformation instrument={mockInstrument} />);

    // Check if the correct country code (USD) is displayed for United States
    expect(screen.getByText("United States (USD)")).toBeInTheDocument();
  });

  it("renders fallback country code when country name is not in the map", () => {
    const instrumentWithUnknownCountry = {
      ...mockInstrument,
      country: "Unknown Country",
    };

    render(<InsurmentInformation instrument={instrumentWithUnknownCountry} />);

    // Check if fallback country code (first 3 letters of country name) is used
    expect(screen.getByText("Unknown Country (UNK)")).toBeInTheDocument();
  });

  it("renders N/A for country when the country name is missing", () => {
    const instrumentWithoutCountry = {
      ...mockInstrument,
      country: undefined,
    };

    render(<InsurmentInformation instrument={instrumentWithoutCountry} />);

    // Check if the fallback text "Land nicht verfügbar" is used when country is missing
    expect(screen.getByText("Land nicht verfügbar")).toBeInTheDocument();
  });
});
