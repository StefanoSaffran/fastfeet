import React from 'react';

import { Container, Tr } from './styles';

export default function THead({ columns }) {
  return (
    <Container>
      <Tr>
        {columns.map(c => (
          <th
            key={c.label}
            className={c.label === 'Encomenda' ? 'customWidth' : ''}
          >
            {c.label}
          </th>
        ))}
      </Tr>
    </Container>
  );
}
