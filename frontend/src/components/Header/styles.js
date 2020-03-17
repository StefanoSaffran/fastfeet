import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  min-width: 550px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
    width: 70%;

    img {
      width: 128px;
      height: 22.59px;
      margin-right: 30px;
      padding-right: 30px;
      border-right: 1px solid #ddd;
    }
    a {
      font-weight: bold;
      color: #999;
      font-size: 15px;
      margin-right: 20px;
      &:hover {
        color: ${darken(0.3, '#999')};
      }
    }
  }
  aside {
    display: flex;
    align-items: center;
  }
  @media (max-width: 768px) {
    nav {
      img {
        margin: 0;
        padding: 0;
        border: 0;
        margin-left: 56px;
        padding-left: 30px;
        border-left: 1px solid #ddd;
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  div {
    flex-direction: row;

    strong {
      color: #666;
      margin-bottom: 4px;
    }
  }

  button {
    color: #de3b3b;
    font-size: 14px;
    background: none;
    border: none;
    margin-top: 5px;
    &:hover {
      color: ${darken(0.1, '#de3b3b')};
    }
  }
`;
