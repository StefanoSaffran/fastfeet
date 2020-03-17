import React from 'react';
import { Spinner, Dots } from 'react-activity';
import PropTypes from 'prop-types';

import colors from '~/styles/colors';
import { Container } from './styles';

const Loading = ({ type }) => {
  if (type === 'spinner') {
    return (
      <Container>
        <Spinner size={24} color={`${colors.primary}`} speed={0.6} />
      </Container>
    );
  }
  return <Dots size={16} color={`${colors.white}`} speed={0.6} />;
};

Loading.defaultProps = {
  type: '',
};

Loading.propTypes = {
  type: PropTypes.string,
};

export default Loading;
