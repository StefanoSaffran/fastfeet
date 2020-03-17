import styled from 'styled-components';

export const Container = styled.tbody`
  width: 100%;
  background: white;

  tr {
    height: 100%;
    max-height: 57px;

    td:first-child {
      padding-left: 8px;
    }

    td.deliveryman {
      div {
        display: flex;
        align-items: center;
        flex-direction: row;
      }
    }

    td.status:nth-last-child(2) {
      display: flex;
      align-items: center;
      flex-direction: row;
      height: 57px;
    }
  }
`;
