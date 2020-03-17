import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  button {
    background: none;
    border: 0;
    position: absolute;
    top: 19px;
  }

  div {
    display: flex;
    flex-direction: column;
    background: rgb(255, 255, 255);
    padding: 15px 5px;
    position: absolute;
    top: 64px;
    left: 0;
    height: 92.9%;
    z-index: 2;
    animation: ${props =>
      props.visible &&
      'modalFadeIn .3s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards'};

    a {
      font-weight: bold;
      color: #999;
      font-size: 15px;
      padding: 20px;
      animation: ${props =>
        props.visible &&
        'modalLinksFadeIn .8s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards'};

      &:hover {
        color: ${darken(0.3, '#999')};
      }
    }
  }

  div + div {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 64px;
    left: 0;
    z-index: 1;
    opacity: 0.8;
    transform: scale(1);
    animation: ${props =>
      props.visible &&
      'fadeIn 1s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards'};
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
