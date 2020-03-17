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
    align-items: flex-start;

    div.select-container {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }

    div#select {
      width: 50%;
      padding-right: 15px;
    }

    div#select + div#select {
      padding-right: 0;
      padding-left: 15px;
    }
  }

  label[for='product'] {
    margin-top: 15px;
  }

  span.error {
    margin-bottom: 15px;
    align-self: flex-start;

    font-weight: bold;
    color: ${darken(0.08, `${colors.primary}`)};
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
