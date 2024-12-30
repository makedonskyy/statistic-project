import React from "react";
import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";

describe("Card Component", () => {
  it("renders the Card component with children", () => {
    render(<Card>Test Card</Card>);
    expect(screen.getByText("Test Card")).toBeTruthy();
  });

  it("applies custom className", () => {
    const customClass = "custom-class";
    render(<Card className={customClass}>Styled Card</Card>);
    const cardElement = screen.getByText("Styled Card");
    expect(cardElement).toHaveClass("custom-class");
  });

  it("renders the CardHeader with children", () => {
    render(<CardHeader>Header Content</CardHeader>);
    expect(screen.getByText("Header Content")).toBeInTheDocument();
  });

  it("renders the CardTitle with the correct styles", () => {
    render(<CardTitle>Card Title</CardTitle>);
    const title = screen.getByText("Card Title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass(
      "text-2xl font-semibold leading-none tracking-tight",
    );
  });

  it("renders the CardDescription with the correct styles", () => {
    render(<CardDescription>Description</CardDescription>);
    const description = screen.getByText("Description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass("text-sm text-muted-foreground");
  });

  it("renders the CardContent and CardFooter", () => {
    render(
      <>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </>,
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
