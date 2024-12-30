import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../ui/button";

describe("Button Component", () => {
  test("renders correctly", () => {
    render(<Button>Click Me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });

  test("applies default variant and size", () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole("button", { name: /default button/i });
    expect(button).toHaveClass(
      "bg-primary",
      "text-primary-foreground",
      "h-10",
      "px-4",
      "py-2",
    );
  });

  test("applies custom variant and size", () => {
    render(
      <Button variant="destructive" size="sm">
        Destructive Button
      </Button>,
    );
    const button = screen.getByRole("button", { name: /destructive button/i });
    expect(button).toHaveClass(
      "bg-destructive",
      "text-destructive-foreground",
      "h-9",
      "px-3",
    );
  });

  test("renders as child component", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: /link button/i });
    expect(link).toHaveAttribute("href", "/test");
  });

  test("applies additional className", () => {
    render(<Button className="custom-class">Custom Class Button</Button>);
    const button = screen.getByRole("button", { name: /custom class button/i });
    expect(button).toHaveClass("custom-class");
  });

  test("handles click event", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);
    const button = screen.getByRole("button", { name: /clickable button/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("disables button when disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole("button", { name: /disabled button/i });
    expect(button).toBeDisabled();
  });
});
