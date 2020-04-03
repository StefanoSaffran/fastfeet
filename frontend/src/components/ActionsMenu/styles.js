import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 !important;
  position: relative;

  button.dots {
    height: 50px;
    z-index: 50;
  }

  button {
    background: none;
    border: 0;
  }
`;

export const ActionsContainer = styled.div`
  background: white;
  position: absolute;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  left: calc(50% - (${({ width }) => width / 2}px));
  top: 42px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.149);
  border-radius: 4px;
  padding: 0 15px;
  z-index: 101;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  animation: 0.8s ease-out actionsSmoothEntry;

  &::before {
    content: '';
    position: absolute;
    left: ${({ width }) =>
      width === 150 ? '55.9%' : width === 200 ? '54.5%' : '58.5%'};
    width: 0;
    height: 0;
    box-sizing: border-box;
    border: 6px solid black;
    border-color: transparent transparent white white;

    transform-origin: 0 0;
    transform: rotate(-225deg);

    box-shadow: -3px 3px 4px -1px #0000001a;
  }
`;

export const Actions = styled.ul`
  li {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 20px 0 0;

    svg {
      margin-right: 5px;
    }
  }

  li + li {
    margin-top: 7px;
    padding-top: 7px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;
