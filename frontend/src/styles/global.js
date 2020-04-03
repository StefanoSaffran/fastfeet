import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import 'react-activity/dist/react-activity.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

* {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  *:focus {
    outline: 0;
  }
  html, body, #root {
    height: 100%;
  }
  body {
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    background: #f5f5f5;
  }
  body, input, button, input::placeholder, textarea::placeholder {
    font: 14px 'Roboto', sans-serif;
  }

  input::placeholder, textarea::placeholder {
    color: #999;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  @keyframes unfoldIn {
    0% {
      transform: scaleY(0.005) scaleX(0);
    }
    50% {
      transform: scaleY(0.005) scaleX(1);
    }
    100% {
      transform: scaleY(1) scaleX(1);
    }
  }

  @keyframes zoomIn {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes actionsSmoothEntry {
    from {
      transform: translateY(-5%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideIn {
    0% {
      transform: translateX(-10%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    0% {
      background: rgba(0, 0, 0, 0);
    }
    100% {
      background: rgba(0, 0, 0, 0.8);
    }
  }

  @keyframes modalFadeIn {
    0% {
      background: rgb(255, 255, 255, 0);
    }
    100% {
      background: rgb(255, 255, 255);
    }
  }

  @keyframes modalLinksFadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

`;
