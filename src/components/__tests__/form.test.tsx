import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";

describe("Form component", () => {
  it("renders a form with all components", () => {
    const Wrapper = () => {
      const form = useForm();
      return (
        <Form {...form}>
          <FormField
            name="testField"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Test Field</FormLabel>
                <FormControl asChild>
                  <input {...field} placeholder="Enter value" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      );
    };

    render(<Wrapper />);
    expect(screen.getByLabelText("Test Field")).toBeInTheDocument();
  });

  it("passes input value to form state", () => {
    const Wrapper = () => {
      const form = useForm();

      return (
        <Form {...form}>
          <FormField
            name="testField"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Test Field</FormLabel>
                <FormControl asChild>
                  <input {...field} placeholder="Enter value" />
                </FormControl>
              </FormItem>
            )}
          />
        </Form>
      );
    };

    render(<Wrapper />);
    const input = screen.getByPlaceholderText("Enter value");

    fireEvent.change(input, { target: { value: "Test Value" } });
    expect(input).toHaveValue("Test Value");
  });
});
