import styled from 'styled-components';

export const Container = styled.tbody`
  width: 100%;
  background: white;

  tr {
    height: 57px;

    td:first-child {
      padding-left: 8px;
    }

    td:nth-last-child(2) {
      position: relative;

      span {
        position: absolute;
        left: 0;
        right: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    td:nth-last-child(2):before {
      content: '&nbsp;';
      visibility: hidden;
    }
  }
`;
