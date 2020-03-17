import styled from 'styled-components';

import colors from '~/styles/colors';

export const Container = styled.thead``;

export const Tr = styled.tr`
  th {
    color: ${colors.darkGray};
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    text-align: left;
  }

  th:first-child {
    padding-right: 15px;
  }
  th:last-child {
    width: 5%;
  }

  th.customWidth {
    width: 15%;
  }
`;
