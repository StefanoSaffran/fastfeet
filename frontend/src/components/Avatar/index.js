import React, { useMemo } from 'react';

import { Container } from './styles';

const deliverymen = [];

export default function Avatar({ avatar, name }) {
  if (!deliverymen.some(d => d.name === name)) {
    const newColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    deliverymen.push({ name, color: newColor });
  }

  const color = useMemo(
    () => deliverymen.filter(d => d.name === name).map(fd => fd.color),
    [name]
  );

  const nameInitials = !avatar
    ? name.split(' ').map(n => n.charAt(0).toUpperCase())
    : null;

  return (
    <Container color={color}>
      {avatar ? <img src={avatar} alt="Avatar" /> : <span>{nameInitials}</span>}
    </Container>
  );
}
