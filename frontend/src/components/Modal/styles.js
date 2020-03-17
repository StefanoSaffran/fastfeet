import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Container = styled.div`
  position: fixed;
  display: table;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 150;
  background: rgba(0, 0, 0, 0.7);
  transform: ${props => (props.visible ? 'scaleY(.01) scaleX(0)' : 'scale(0)')};
  animation: ${props =>
    props.visible &&
    'unfoldIn 1s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards'};

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
`;

export const Content = styled.div`
  position: fixed;
  background: white;
  width: 450px;
  min-height: ${({ height }) => `${height}px`};
  height: auto;
  padding: 30px;
  left: calc(50% - 225px);
  top: calc(50% - (${({ height }) => height / 2}px));
  border-radius: 4px;
  z-index: 151;
  transform: ${props => props.visible && 'scale(0)'};
  animation: ${props =>
    props.visible &&
    'zoomIn .5s .8s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards'};

  h3 {
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;

    color: ${colors.darkGray};
    margin-bottom: 7px;
  }

  p {
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: ${colors.gray};
  }

  div.modal-deliveries {
    display: flex;
    flex-direction: column;

    span {
      font-size: 14px;
      line-height: 19px;
      color: ${colors.darkGray};
    }

    div + div {
      padding-top: 15px;
      margin-top: 15px;
      border-top: 1px solid ${colors.lightBorder};
    }

    div:first-child {
      padding-bottom: 40px;
    }

    div:nth-last-child(2) {
      padding-bottom: 20px;
    }
    div:last-child {
      display: flex;
      flex-direction: column;
      img {
        width: 100%;
        height: 70px;
      }
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
`;
