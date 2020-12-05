import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import Employees from "./components/Employees";

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
    
    @media only screen and (max-width: 480px) {
      font-size: 12pt;
    }
  }
`;
export default App;
