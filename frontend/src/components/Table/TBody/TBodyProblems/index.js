import React, { useState } from 'react';

import { MdRemoveRedEye, MdDeleteForever } from 'react-icons/md';
import LinesEllipsis from 'react-lines-ellipsis';

import Actions from '~/components/ActionsMenu';
import Loading from '~/components/Loading';
import Modal from '~/components/Modal';

import { Container } from './styles';

export default function TBodyProblems({ data, handleCancel }) {
  const [problem, setProblem] = useState(null);

  const modalRef = React.createRef();

  const handleOpen = p => {
    setProblem(p);
    modalRef.current.setIsComponentVisible(true);
  };

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
      <Modal ref={modalRef} height={400}>
        {problem ? (
          <>
            <h3>DESCRIÇÃO DO PROBLEMA</h3>
            <p>{problem.description}</p>
          </>
        ) : (
          <Loading type="spinner" />
        )}
      </Modal>
    </>
  );
}
