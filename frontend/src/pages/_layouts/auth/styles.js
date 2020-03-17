import styled from 'styled-components';
import { darken } from 'polished';
import colors from '~/styles/colors';

export const Wrapper = styled.div`
  height: 100%;
  background: ${colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 350px;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  background-color: ${colors.white};
  align-items: center;
  padding: 45px 20px;

  img {
    width: 100%;
    margin-top: 10px;
    max-width: 230.85px;
    height: 44.14px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 25px;
    padding: 0 8px;

    label + label {
      margin-top: 10px;
    }

    button {
      height: 44px;
      background: ${colors.primary};
      border: 0;
      border-radius: 4px;
      font-weight: normal;
      color: ${colors.white};
      margin: -1px 0 10px;
      font-size: 15px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.08, `${colors.primary}`)};
      }
    }
  }
`;
