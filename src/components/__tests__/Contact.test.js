import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";
describe("contact Us test cases", () => {
  test("should load contact us component", () => {
    render(<Contact />);
    const heading = screen.getByRole("heading");
    //Assertion
    expect(heading).toBeInTheDocument();
  });
  it("should load 2 input boxes inside contact component", () => {
    render(<Contact />);
    const inputBoxes = screen.getAllByRole("textbox");
    //   console.log(inputBoxes);
    //Assertion
    expect(inputBoxes.length).toBe(2);
  });
});
