import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.h1`
  text-align: center;
  font-family: "Open Sans", sans-serif;
`;

function Header() {
  return (
    <HeaderContainer>
      TWEET SAVER{" "}
      <img src="https://img.icons8.com/fluent/48/000000/twitter.png" alt="" />
    </HeaderContainer>
  );
}

export { Header };
