import styled from 'styled-components';

export const Container = styled.div`
  color: ${({ color }) => color};
  background: ${({ color }) => `${color}33`};
  border-radius: 10px;
  width: min-content;
  padding: 5px 6px;
  display: flex;
  flex-direction: row !important;
  align-items: center;
  margin-bottom: 0 !important;
`;
