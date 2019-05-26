import React from 'react';
import { createGlobalStyle } from 'styled-components';

const Styles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900&amp;subset=latin-ext');

  @font-face {
      font-family: 'Merck Web';
      src: url('/fonts/MerckWeb-Regular.woff2') format('woff2'),
          url('/fonts/MerckWeb-Regular.woff') format('woff'),
          url('/fonts/MerckWeb-Regular.ttf') format('truetype');
  }

  html, #app-root, body {
    width: 100%;
    height: 100%;
    line-height: 1.6;
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
    margin: 0;
    parring: 0;
  }
  
`;

export const GlobalStyles = () => <Styles />;
