import React from "react";
import { render, screen } from "@testing-library/react";
import { Label } from "../ui/label";

describe("Label component", () => {
  it("renders the label with default styles", () => {
    render(<Label htmlFor="test-input">Test Label</Label>);
    const label = screen.getByText("Test Label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    );
  });

  it("applies custom className correctly", () => {
    render(
      <Label className="custom-class" htmlFor="test-input">
        Test Label
      </Label>,
    );
    const label = screen.getByText("Test Label");
    expect(label).toHaveClass("custom-class");
  });

  it("renders with the correct `htmlFor` attribute", () => {
    render(<Label htmlFor="test-input">Test Label</Label>);
    const label = screen.getByText("Test Label");
    expect(label).toHaveAttribute("for", "test-input");
  });

  it("supports being rendered as another element", () => {
    render(
      <Label asChild>
        <span>Custom Element Label</span>
      </Label>,
    );
    const label = screen.getByText("Custom Element Label");
    expect(label.tagName).toBe("SPAN");
  });

  it("handles accessibility attributes properly", () => {
    render(<Label htmlFor="accessible-input">Accessible Label</Label>);
    const label = screen.getByText("Accessible Label");
    expect(label).toHaveAttribute("for", "accessible-input");
  });
});
