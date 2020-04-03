import styled from 'styled-components';

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
    line-height: 19px;
    letter-spacing: 0px;

    color: ${colors.darkGray};
    margin-bottom: 7px;
  }

  p {
    letter-spacing: 0px;
    font-size: 16px;
    line-height: 26px;
    color: ${colors.gray};
  }

  div.modal-deliveries {
    display: flex;
    flex-direction: column;

    div + div {
      padding-top: 12px;
      margin-top: 12px;
      border-top: 1px solid ${colors.lightBorder};
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
`;
