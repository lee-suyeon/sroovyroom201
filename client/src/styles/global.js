import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  *, *:before, *:after, div{
    box-sizing: border-box;
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video, textarea {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    font-family: 'Noto Sans KR', 'Noto Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
  display: block;
  }

  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  input{
    font-family: 'Noto Sans KR', 'Noto Sans', sans-serif;
    -webkit-border-radius: 0;
    border-radius: 0;
  }

  button {
    font-family: 'Dosis', sans-serif;
    background-color: transparent;
  }

  a {color: inherit; text-decoration: none; outline: none; display: block;}

  a:hover, a:active {text-decoration: none;}

  ::placeholder{
    font-size: 0.825rem;
  }
`

export default GlobalStyle;