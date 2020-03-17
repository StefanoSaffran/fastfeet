import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const InputWrapper = styled.div`
  position: relative;

  svg {
    position: absolute;
    left: 10px;
    top: 9px;
  }
`;
export const Container = styled.div`
  width: 100%;
  max-width: 1230px;
  min-width: 550px;
  margin: 30px auto;
  padding: 0 30px;

  h2 {
    color: ${colors.darkGray};
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 28px;
  }

  div.header {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;

    input {
      padding-left: 35px;
      width: 237px;
      height: 36px;
      border-radius: 4px;
      border: 1px solid ${colors.border};
    }

    button.add {
      display: flex;
      align-items: center;
      padding: 0 10px;
      width: 142px;
      height: 36px;
      border: 0;
      border-radius: 4px;
      color: ${colors.white};
      background: ${colors.primary};
      margin: 5px 0 10px;

      &:hover {
        background: ${darken(0.06, `${colors.primary}`)};
      }

      span {
        padding-left: 10px;
        font-weight: bold;
      }
    }
  }

  @media (min-width: 768px) {
    div.header {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: 30px 0 10px;
      div {
        button.add {
          margin: 0;
        }
      }
    }
  }
`;