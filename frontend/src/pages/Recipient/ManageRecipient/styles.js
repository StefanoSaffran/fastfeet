import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Container = styled.div`
  width: 100%;
  max-width: 900px;
  min-width: 450px;
  margin: 30px auto;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    background: ${colors.white};
    padding: 30px 30px;

    div.address-second-line {
      display: flex;
      width: 100%;
      justify-content: space-between;

      div#unformInput:first-child {
        width: 70%;
        margin: 0;
      }

      div#unformInput {
        width: 15%;
        margin-left: 15px;
      }
    }

    div.address-third-line {
      display: flex;
      width: 100%;
      justify-content: space-between;

      div#unformInput {
        width: 33%;
        padding-right: 15px;
      }

      div#zipCodeInput {
        width: 33%;
        padding-right: 0;
      }
    }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    color: ${colors.darkGray};
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 8px;
  }

  div.form-buttons {
    display: flex;
    align-items: center;

    button {
      display: flex;
      align-items: center;
      padding: 0 10px;
      width: 112px;
      height: 36px;
      border: 0;
      border-radius: 4px;
      color: ${colors.white};
      background: ${colors.backButton};

      &:hover {
        background: ${darken(0.04, `${colors.backButton}`)};
      }

      span {
        padding-left: 10px;
        font-weight: bold;
      }
    }

    button + button {
      background: ${colors.primary};
      margin-left: 16px;

      &:hover {
        background: ${darken(0.03, `${colors.primary}`)};
      }
    }
  }
`;
