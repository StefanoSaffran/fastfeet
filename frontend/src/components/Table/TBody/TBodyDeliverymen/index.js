import React from 'react';

import PropTypes from 'prop-types';
import { MdEdit, MdDeleteForever } from 'react-icons/md';

import history from '~/services/history';
import Actions from '~/components/ActionsMenu';
import Avatar from '~/components/Avatar';

import { Container } from './styles';

export default function TBodyDeliverymen({ data, handleDelete }) {
  return (
    <Container>
      {data.map((item, index) => (
        <tr key={item.id}>
          <td>#{item.id}</td>
          <td>
            <div>
              <Avatar
                avatar={item.avatar?.url}
                name={item.name}
                index={index}
              />
            </div>
          </td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>
            <Actions height={90} width={150}>
              <li>
                <MdEdit color="#4D85EE" size={14} />
                <button
                  type="button"
                  onClick={() => history.push(`deliveryman/${item.id}`)}
                >
                  Editar
                </button>
              </li>
              <li>
                <MdDeleteForever color="#DE3B3B" size={14} />
                <button type="button" onClick={() => handleDelete(item)}>
                  Excluir
                </button>
              </li>
            </Actions>
          </td>
        </tr>
      ))}
    </Container>
  );
}

TBodyDeliverymen.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  handleDelete: PropTypes.func.isRequired,
};
