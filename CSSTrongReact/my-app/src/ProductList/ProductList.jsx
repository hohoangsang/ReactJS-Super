import React from "react";
import "./ProductList.scss";
import styled from "styled-components";

const TitleH1 = styled.h1`
  color: red;
`;

const Container = styled.div`
  border: 1px solid orangered;
  width: 400px;
  margin: 16px auto;
  border-radius: 20px;
  padding: 16px;
`;

const ContainerExtends = styled(Container)`
  width: 300px;
`;

function Button() {
  return (
    <div className="button">
      <button className="button-primary">Click me</button>
    </div>
  );
}

export default function ProductList() {
  return (
    <Container>
      <TitleH1>Product List</TitleH1>
      <Button />
    </Container>
  );
}
