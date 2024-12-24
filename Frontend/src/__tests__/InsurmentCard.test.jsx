import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import InstrumentCard from "../components/Home/InstrumentCard"; // Adjust the import path if necessary
import React from "react";

// Mock data for the instrument
const mockInstrument = {
  _id: "1",
  name: "Test Instrument",
  symbol: "TEST",
  nameExchange: "Test Exchange",
  currentPrice: 100.123,
  type: "Stock",
  country: "United States",
  operatingMIC: "TESTMIC",
  currency: "USD",
  priceChange: 2.5,
  percentageChange: 0.5,
};

// Mock function for the onDetails callback
const mockOnDetails = vi.fn();

describe("InstrumentCard", () => {
  test("renders correctly with provided data", () => {
    render(
      <InstrumentCard instrument={mockInstrument} onDetails={mockOnDetails} />
    );

    // Check that the instrument name is displayed
    expect(screen.getByText(mockInstrument.name)).toBeInTheDocument();

    // Check that the symbol is displayed
    expect(screen.getByText(mockInstrument.symbol)).toBeInTheDocument();

    // Check that the exchange name is displayed
    expect(screen.getByText(mockInstrument.nameExchange)).toBeInTheDocument();

    // Check that the current price is displayed correctly
    expect(
      screen.getByText(mockInstrument.currentPrice.toFixed(3))
    ).toBeInTheDocument();

    // Check that USD is displayed for the price
    const priceCurrency = screen.getByText(
      (content, element) =>
        element.tagName === "SPAN" && content === mockInstrument.currency
    );
    expect(priceCurrency).toBeInTheDocument();

    // Check the price change and percentage
    expect(screen.getByText("+2.50")).toBeInTheDocument();
    expect(screen.getByText(/\(\+0\.50%\)/)).toBeInTheDocument();

    // Check for type, country, and operatingMIC
    expect(screen.getByText(mockInstrument.type)).toBeInTheDocument();
    expect(screen.getByText(mockInstrument.country)).toBeInTheDocument();
    expect(screen.getByText(mockInstrument.operatingMIC)).toBeInTheDocument();
  });

  test("displays fallback text if any instrument data is missing", () => {
    const incompleteInstrument = {
      ...mockInstrument,
      type: null,
      country: null,
      operatingMIC: null,
    };

    render(
      <InstrumentCard
        instrument={incompleteInstrument}
        onDetails={mockOnDetails}
      />
    );

    // Check for fallback "N/A" for missing type, country, and operatingMIC
    const fallbackText = screen.getAllByText(/N\/A/i);
    expect(fallbackText.length).toBeGreaterThanOrEqual(3);
  });

  test("calls the onDetails function when the button is clicked", () => {
    render(
      <InstrumentCard instrument={mockInstrument} onDetails={mockOnDetails} />
    );

    const detailsButton = screen.getByRole("button", {
      name: /weitere details/i,
    });
    fireEvent.click(detailsButton);

    // Check that the onDetails function was called once
    expect(mockOnDetails).toHaveBeenCalledTimes(1);
  });
});
