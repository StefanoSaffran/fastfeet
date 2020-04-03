import React from 'react';

import { MdRemoveRedEye, MdDeleteForever } from 'react-icons/md';
import LinesEllipsis from 'react-lines-ellipsis';

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
              <LinesEllipsis text={item.description} basedOn="letters" />
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
