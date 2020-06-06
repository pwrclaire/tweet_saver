import React from "react";
import { Header } from "./Header";
import renderer from "react-test-renderer";

describe("Testing Header component", () => {
  test("should render", () => {
    const component = renderer.create(<Header />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
