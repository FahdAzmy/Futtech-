import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import HeaderOfInsurment from "../components/DetailsPage/HeaderOfInsurment";
import { expect, describe, it } from "vitest";
import React from "react";
describe("HeaderOfInsurment", () => {
  const mockInstrument = {
    name: "Test Instrument",
    symbol: "TI",
    currentPrice: 100.5,
    percentageChange: 2.5,
  };

  it("renders the instrument details correctly", () => {
    render(
      <BrowserRouter>
        {" "}
        {/* Wrap the component in BrowserRouter */}
        <HeaderOfInsurment instrument={mockInstrument} />
      </BrowserRouter>
    );

    // Check if the instrument name and symbol are displayed correctly
    expect(screen.getByText("Test Instrument (TI)")).toBeInTheDocument();

    // Check if the current price is displayed correctly
    expect(screen.getByText("€100.50")).toBeInTheDocument();

    // Check if the price change indicator is displayed correctly
    expect(screen.getByText("+2.50%")).toBeInTheDocument();
  });

  it("renders the fallback text when currentPrice is not available", () => {
    const instrumentWithoutPrice = {
      ...mockInstrument,
      currentPrice: undefined,
    };

    render(
      <BrowserRouter>
        {" "}
        {/* Wrap the component in BrowserRouter */}
        <HeaderOfInsurment instrument={instrumentWithoutPrice} />
      </BrowserRouter>
    );

    // Check if the fallback text is shown when price is not available
    expect(screen.getByText("Preis nicht verfügbar")).toBeInTheDocument();
  });

  it("renders the correct indicator color for positive percentage change", () => {
    render(
      <BrowserRouter>
        {" "}
        {/* Wrap the component in BrowserRouter */}
        <HeaderOfInsurment instrument={mockInstrument} />
      </BrowserRouter>
    );

    // Check if the price change indicator is green for positive changes
    const priceChange = screen.getByText("+2.50%");
    expect(priceChange).toHaveClass("bg-green-100");
    expect(priceChange).toHaveClass("text-green-800");
  });

  it("renders the correct indicator color for negative percentage change", () => {
    const instrumentWithNegativeChange = {
      ...mockInstrument,
      percentageChange: -2.5,
    };

    render(
      <BrowserRouter>
        {" "}
        {/* Wrap the component in BrowserRouter */}
        <HeaderOfInsurment instrument={instrumentWithNegativeChange} />
      </BrowserRouter>
    );

    // Check if the price change indicator is red for negative changes
    const priceChange = screen.getByText("-2.50%");
    expect(priceChange).toHaveClass("bg-red-100");
    expect(priceChange).toHaveClass("text-red-800");
  });
});
