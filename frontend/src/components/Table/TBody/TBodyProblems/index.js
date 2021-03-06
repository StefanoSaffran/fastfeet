import React from 'react';

import PropTypes from 'prop-types';
import { MdRemoveRedEye, MdDeleteForever } from 'react-icons/md';

import Actions from '~/components/ActionsMenu';

import { Container } from './styles';

export default function TBodyProblems({ data, handleCancel, handleOpen }) {
  return (
    <>
      <Container>
        {data.map(item => (
          <tr key={item.id}>
            <td>#{item.delivery.id}</td>
            <td>
              <span>{item.description}</span>
            </td>
            <td>
              <Actions height={95} width={200}>
                <li>
                  <MdRemoveRedEye color="#4D85EE" size={14} />
                  <button type="button" onClick={() => handleOpen(item)}>
                    Visualizar
                  </button>
                </li>
                <li>
                  <MdDeleteForever color="#DE3B3B" size={14} />
                  <button type="button" onClick={() => handleCancel(item)}>
                    Cancelar encomenda
                  </button>
                </li>
              </Actions>
            </td>
          </tr>
        ))}
      </Container>
    </>
  );
}

TBodyProblems.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
};
