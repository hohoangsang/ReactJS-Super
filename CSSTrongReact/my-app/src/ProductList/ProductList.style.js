import styled from "styled-components";
import { Button } from "./ProductList";

export const TitleH1 = styled.h1`
  color: red;
`;

export const Container = styled.div`
  border: 1px solid orangered;
  width: 400px;
  margin: 16px auto;
  border-radius: 20px;
  padding: 16px;
`;

export const ContainerExtends = styled(Container)`
  // extened styled
  width: 300px;
`;

export const StyledButton = styled(Button)`
  //style for Component
  margin: 16px;
  background-color: ${(props) => props.bgColor || "transparent"};
`;
