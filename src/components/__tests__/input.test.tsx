import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "../ui/input";

describe("Input component", () => {
  it("applies custom className correctly", () => {
    render(<Input className="custom-class" placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toHaveClass("custom-class");
  });

  it("forwards the ref correctly", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} placeholder="Enter text" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("accepts and renders a custom type", () => {
    render(<Input type="password" placeholder="Enter password" />);
    const input = screen.getByPlaceholderText("Enter password");
    expect(input).toHaveAttribute("type", "password");
  });

  it("responds to user input", () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");
    fireEvent.change(input, { target: { value: "Test value" } });
    expect(input).toHaveValue("Test value");
  });

  it("disables input when disabled prop is passed", () => {
    render(<Input disabled placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeDisabled();
    expect(input).toHaveClass(
      "disabled:cursor-not-allowed disabled:opacity-50",
    );
  });

  it("renders additional props correctly", () => {
    render(<Input data-testid="custom-input" />);
    const input = screen.getByTestId("custom-input");
    expect(input).toBeInTheDocument();
  });
});
