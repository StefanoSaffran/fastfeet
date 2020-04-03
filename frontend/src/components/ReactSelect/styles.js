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

  span.error {
    margin-bottom: 15px;
    align-self: flex-start;

    font-weight: bold;
    color: ${darken(0.08, `${colors.primary}`)};
    animation: 0.3s ease-out 0s 1 slideIn;
  }
`;
