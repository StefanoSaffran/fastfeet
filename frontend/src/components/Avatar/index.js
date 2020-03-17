import React from 'react';

import { avatarColors } from '~/styles/colors';

import { Container } from './styles';

export default function Avatar({ avatar, name, index }) {
  const { color } = avatarColors[index];
  const nameInitials = !avatar
    ? name.split(' ').map(n => n.charAt(0).toUpperCase())
    : null;
  return (
    <Container color={color}>
      {avatar ? <img src={avatar} alt="Avatar" /> : <span>{nameInitials}</span>}
    </Container>
  );
}
