import React from "react";
import { GET_RESULTS } from "../chart";

describe("Chart Component", () => {
  test("calculates data correctly", () => {
    const calculateAge = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
    expect(calculateAge([5, 6, 7])).toBeCloseTo(6);

    const calculateMen = (arr) => arr.filter((item) => item === true).length;
    expect(calculateMen([true, false, true])).toBe(2);

    const calculateWomen = (arr) => arr.filter((item) => item === false).length;
    expect(calculateWomen([true, false, true])).toBe(1);
  });
});
