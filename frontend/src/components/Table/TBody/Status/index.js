import React from 'react';

import PropTypes from 'prop-types';
import { MdFiberManualRecord } from 'react-icons/md';

import { statusInfo } from '~/styles/colors';
import { Container } from './styles';

export default function Status({ status }) {
  return (
    <>
      {status && (
        <Container color={`${statusInfo[status].color}`}>
          <MdFiberManualRecord
            size={15}
            color={`${statusInfo[status].color}`}
          />
          <span>{statusInfo[status].title}</span>
        </Container>
      )}
    </>
  );
}

Status.propTypes = {
  status: PropTypes.string.isRequired,
};
