import React from 'react';

import PropTypes from 'prop-types';
import { MdRemoveRedEye, MdEdit, MdDeleteForever } from 'react-icons/md';

import Status from '../Status';
import Actions from '~/components/ActionsMenu';
import Avatar from '~/components/Avatar';
import history from '~/services/history';

import { Container } from './styles';

export default function TBodyDeliveries({ data, handleDelete, handleOpen }) {
  return (
    <Container>
      {data.map(item => (
        <tr key={item.id}>
          <td>#{item.id}</td>
          <td>{item.product}</td>
          <td>{item.recipient.name}</td>
          <td className="deliveryman">
            <div>
              <Avatar
                avatar={item.deliveryman?.avatar?.url}
                name={item.deliveryman.name}
              />
              {item.deliveryman.name}
            </div>
          </td>
          <td>{item.recipient.city}</td>
          <td>{item.recipient.state}</td>
          <td className="status">
            <Status status={item.status} />
          </td>
          <td>
            <Actions height={120} width={150}>
              <li>
                <MdRemoveRedEye color="#8E5BE8" size={14} />
                <button type="button" onClick={() => handleOpen(item)}>
                  Visualizar
                </button>
              </li>
              <li>
                <MdEdit color="#4D85EE" size={14} />
                <button
                  type="button"
                  onClick={() => history.push(`deliveries/${item.id}`)}
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

TBodyDeliveries.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
};
