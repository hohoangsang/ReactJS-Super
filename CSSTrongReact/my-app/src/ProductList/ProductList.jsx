import React from "react";
import "./ProductList.scss";
import { Container, StyledButton, TitleH1 } from "./ProductList.style";

export function Button(props) {
  const { className } = props;
  return (
    <div className={`${className} button`}>
      <button className="button-primary">Click me</button>
    </div>
  );
}

export default function ProductList() {
  return (
    <Container>
      <TitleH1>Product List</TitleH1>
      <StyledButton bgColor={"blue"} />
    </Container>
  );
}
