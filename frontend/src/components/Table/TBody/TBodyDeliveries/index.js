import React, { useState } from 'react';

import { MdRemoveRedEye, MdEdit, MdDeleteForever } from 'react-icons/md';

import Status from '../Status';
import Actions from '~/components/ActionsMenu';
import Avatar from '~/components/Avatar';
import history from '~/services/history';
import Loading from '~/components/Loading';
import Modal from '~/components/Modal';

import { Container } from './styles';

export default function TBody({ data, handleDelete }) {
  const [delivery, setDelivery] = useState(null);

  const modalRef = React.createRef();

  const handleOpen = p => {
    setDelivery(p);
    modalRef.current.setIsComponentVisible(true);
  };

  return (
    <>
      <Container>
        {data.map((item, index) => (
          <tr key={item.id}>
            <td>#{item.id}</td>
            <td>{item.product}</td>
            <td>{item.recipient.name}</td>
            <td className="deliveryman">
              <div>
                <Avatar
                  avatar={item.deliveryman?.avatar?.url}
                  name={item.deliveryman.name}
                  index={index}
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
      <Modal ref={modalRef} height={350}>
        {delivery ? (
          <>
            <h3>Informações da encomenda</h3>
            <div className="modal-deliveries">
              <div>
                <p>
                  {delivery.recipient.street}, {delivery.recipient.number}{' '}
                  {delivery.recipient.city} - {delivery.recipient.state}{' '}
                  {delivery.recipient.zip_code}
                </p>
              </div>
              <div>
                <span>Datas</span>
                <p>
                  <strong>Retirada:</strong> {delivery?.start_date}{' '}
                  <strong>Entrega:</strong> {delivery?.end_date}
                </p>
              </div>
              <div>
                <span>Assinatura do destinatário</span>
                {delivery.signature && (
                  <img src={delivery?.signature?.url} alt="signature" />
                )}
              </div>
            </div>
          </>
        ) : (
          <Loading type="spinner" />
        )}
      </Modal>
    </>
  );
}
