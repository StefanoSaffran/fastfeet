import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    align-self: flex-start;
    font-style: normal;
    font-size: 14px;
    line-height: 16px;

    color: #444444;
  }

  input {
    width: 100%;
    height: 45px;
    padding: 0 15px;
    margin: 11px 0 16px;
    border-radius: 4px;
    border: 1px solid ${colors.border};
  }

  span.error {
    margin-bottom: 15px;
    align-self: flex-start;

    font-weight: bold;
    color: ${darken(0.08, `${colors.primary}`)};
  }
`;
