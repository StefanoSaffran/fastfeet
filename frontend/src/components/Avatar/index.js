import React, { useMemo } from 'react';

import PropTypes from 'prop-types';

import { Container } from './styles';

const deliverymen = [];

export default function Avatar({ avatar, name }) {
  if (!deliverymen.some(d => d.name === name)) {
    let newColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    if (newColor.split('').length < 6) newColor += 'f';
    deliverymen.push({ name, color: newColor });
  }

  const color = useMemo(
    () => deliverymen.filter(d => d.name === name).map(fd => fd.color),
    [name]
  );

  const { length } = color[0]?.split('');

  const nameInitials = !avatar
    ? name.split(' ').map(n => n.charAt(0).toUpperCase())
    : null;

  return (
    <Container color={length < 7 ? `${color}f` : color}>
      {avatar ? <img src={avatar} alt="Avatar" /> : <span>{nameInitials}</span>}
    </Container>
  );
}

Avatar.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string.isRequired,
};

Avatar.defaultProps = {
  avatar: null,
};
