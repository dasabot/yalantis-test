import React from "react";
import Employees from "./components/Employees";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

function App() {
  return (
    <>
      <GlobalStyles />
      <Wrap>
        <Employees />
      </Wrap>
    </>
  );
}

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-family: "PT Sans", sans-serif;
`;
const GlobalStyles = createGlobalStyle`        
  ul, li {
    list-style-type: none;
  }

  h2 {
    text-align: center;
    padding-bottom: 20px;
  }
`;
export default App;
