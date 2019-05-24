import React from 'react';
import { createGlobalStyle } from 'styled-components';

const Styles = createGlobalStyle`
  html, #app-root, body {
    width: 100%;
    height: 100%;
    line-height: 1.6;
    padding: 0;
    margin: 0;
  }
  
  body {
    overflow: hidden;
    color: ${props => props.theme && props.theme.defaultTextColor}
    background: #fff;
  }

  * {
    box-sizing: border-box;
    font-family: ${props => props.theme && props.theme.defaultFont};
    font-size: ${props => props.theme && props.theme.defaultFontSize};
  }
  
`;

export const GlobalStyles = () => <Styles />;
