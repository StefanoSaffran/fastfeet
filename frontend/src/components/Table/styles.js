import styled from 'styled-components';

import colors from '~/styles/colors';

export const Container = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 20px;

  tbody {
    color: ${colors.gray};
  }
`;
