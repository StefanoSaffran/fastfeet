import React, { useRef, useState } from 'react';

import { MdMoreHoriz } from 'react-icons/md';
import PropTypes from 'prop-types';

import useMenuVisible from '~/helpers/hooks/useMenuVisible';

import { Container, ActionsContainer, Actions } from './styles';

export default function ActionsMenu({ children, height, width }) {
  const menuRef = useRef();
  const [visible, setVisible] = useState(false);

  useMenuVisible(menuRef, () => {
    if (visible) {
      setVisible(false);
    }
  });

  const handleToggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <Container ref={menuRef}>
      <button className="dots" type="button" onClick={handleToggleVisibility}>
        <MdMoreHoriz color="#C6C6C6" size={25} />
      </button>
      <>
        <ActionsContainer visible={visible} height={height} width={width}>
          <Actions>{children}</Actions>
        </ActionsContainer>
      </>
    </Container>
  );
}

ActionsMenu.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};
