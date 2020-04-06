import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  margin-right: 5px;
  color: ${({ color }) => `${shade(0.09, `${color}`)}`};
  background: ${({ color }) => `${color}33`};
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
`;
