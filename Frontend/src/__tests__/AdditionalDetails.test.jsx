// eslint-disable-next-line no-unused-vars
import React from "react";
import { render, screen } from "@testing-library/react";
import AdditionalDetails from "../components/DetailsPage/AdditionalDetails";
import { test, expect, describe, it } from "vitest";

describe("AdditionalDetails", () => {
  const mockInstrument = {
    metadata: {
      sector: "Technology",
      performance: "5%",
      description: "This is a test description",
    },
  };

  it("renders correctly with metadata", () => {
    render(<AdditionalDetails instrument={mockInstrument} />);

    // Check that the values from metadata are rendered
    expect(screen.getByText("Sektor")).toBeInTheDocument();

    // Check that the value "Technology" is rendered
    expect(screen.getByText("Technology")).toBeInTheDocument();

    expect(screen.getByText("Leistung")).toBeInTheDocument();
    expect(screen.getByText("5%")).toBeInTheDocument();

    expect(screen.getByText("Beschreibung")).toBeInTheDocument();
    expect(screen.getByText("This is a test description")).toBeInTheDocument();
  });

  it("renders fallback values when metadata fields are missing", () => {
    const instrumentWithMissingFields = {
      metadata: {
        sector: "Technology",
        performance: undefined, // performance is missing
        description: undefined, // description is missing
      },
    };

    render(<AdditionalDetails instrument={instrumentWithMissingFields} />);

    // Check for fallback value in case metadata is missing
    expect(screen.getByText("Sektor")).toBeInTheDocument();
    expect(screen.getByText("Technology")).toBeInTheDocument();

    expect(screen.getByText("Leistung")).toBeInTheDocument();
    expect(screen.getByText("Nicht verfügbar")).toBeInTheDocument();

    expect(screen.getByText("Beschreibung")).toBeInTheDocument();
    expect(
      screen.getByText("Keine Beschreibung verfügbar")
    ).toBeInTheDocument();
  });

  it("does not render when metadata is undefined", () => {
    const instrumentWithoutMetadata = {
      metadata: undefined,
    };

    render(<AdditionalDetails instrument={instrumentWithoutMetadata} />);

    // Ensure that nothing is rendered
    expect(screen.queryByText("Sektor")).toBeNull();
    expect(screen.queryByText("Leistung")).toBeNull();
    expect(screen.queryByText("Beschreibung")).toBeNull();
  });
});
