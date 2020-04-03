import React from 'react';

import { Container } from './styles';

export default function Empty({ message }) {
  return (
    <Container>
      <h3>{message}</h3>
    </Container>
  );
}
