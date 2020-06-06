import React from "react";
import { SingleTweet } from "./SingleTweet";
import renderer from "react-test-renderer";

describe("Testing SingleTweet component", () => {
  test("should render", () => {
    const component = renderer.create(<SingleTweet tweet={mockData} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

const mockData = {
  createdAt: 1591476978000,
  id: 1269372565350494200,
  text: "@Friendlyperson0 Test test",
  user: {
    name: "GjeniAzelia",
    screenName: "AzeliaGjeni",
    profileImageUrlHttps:
      "https://pbs.twimg.com/profile_images/1225850319516635138/AAQ-gnQy_normal.jpg",
  },
};
