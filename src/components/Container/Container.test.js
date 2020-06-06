import React from "react";
import { Container } from "./Container";
import renderer from "react-test-renderer";

describe("Testing Container component", () => {
  test("should render", () => {
    const component = renderer.create(<Container />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
