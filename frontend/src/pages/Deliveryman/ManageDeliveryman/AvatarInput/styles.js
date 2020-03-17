import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;

  label {
  }
`;

export const AvatarLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px dashed #ddd;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  overflow: hidden;

  &:hover {
    opacity: 0.7;
  }

  img {
    width: 150px;
    height: 150px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    background: #eee;
  }

  p {
    color: #ddd;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
  }

  input {
    display: none;
  }
`;
