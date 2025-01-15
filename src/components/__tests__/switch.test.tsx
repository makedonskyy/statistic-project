import React from "react";
import { render, screen } from "@testing-library/react";
import { Switch } from "../ui/switch";

describe("Switch component", () => {
  it("renders the switch correctly", () => {
    render(<Switch />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toHaveClass(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
    );
  });

  it("applies custom className correctly", () => {
    render(<Switch className="custom-class" />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toHaveClass("custom-class");
  });

  it("handles the disabled state correctly", () => {
    render(<Switch disabled />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeDisabled();
    expect(switchElement).toHaveClass(
      "disabled:cursor-not-allowed disabled:opacity-50",
    );
  });
});
