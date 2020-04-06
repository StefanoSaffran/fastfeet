import React from 'react';

import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Empty({ message }) {
  return (
    <Container>
      <h3>{message}</h3>
    </Container>
  );
}

Empty.propTypes = {
  message: PropTypes.string.isRequired,
};
