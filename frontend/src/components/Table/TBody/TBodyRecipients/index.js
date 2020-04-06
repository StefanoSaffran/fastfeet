import React from 'react';

import PropTypes from 'prop-types';
import { MdEdit, MdDeleteForever } from 'react-icons/md';

import history from '~/services/history';
import { Container } from './styles';
import Actions from '~/components/ActionsMenu';

export default function TBodyRecipients({ data, handleDelete }) {
  return (
    <Container>
      {data.map(item => (
        <tr key={item.id}>
          <td>#{item.id}</td>
          <td>{item.name}</td>
          <td>
            <address>
              {item.street}, {item.number}, {item.city} - {item.state}
            </address>
          </td>
          <td>
            <Actions height={90} width={150}>
              <li>
                <MdEdit color="#4D85EE" size={14} />
                <button
                  type="button"
                  onClick={() => history.push(`recipients/${item.id}`)}
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

TBodyRecipients.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  handleDelete: PropTypes.func.isRequired,
};
