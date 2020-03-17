import React, { useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import useComponentVisible from '~/helpers/hooks/useComponentVisible';

import { Container, Content } from './styles';

const Modal = React.forwardRef((props, forwardRef) => {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);

  const showHidestyle = { display: isComponentVisible ? '' : 'none' };

  useImperativeHandle(forwardRef, () => {
    return {
      setIsComponentVisible,
      isComponentVisible,
    };
  });

  return (
    <Container visible={isComponentVisible} style={showHidestyle}>
      <Content ref={ref} height={props.height}>
        {props.children}
      </Content>
    </Container>
  );
});

Modal.propTypes = {
  children: PropTypes.element,
  height: PropTypes.number.isRequired,
};

Modal.defaultProps = {
  children: null,
};

export default Modal;
