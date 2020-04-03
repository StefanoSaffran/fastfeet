import React, { useState, useEffect } from 'react';

import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { MdAdd, MdSearch } from 'react-icons/md';
import { format, parseISO } from 'date-fns';

import Loading from '~/components/Loading';
import Pagination from '~/components/Pagination';
import Empty from '~/components/Empty';
import Table from '~/components/Table';
import Modal from '~/components/Modal';

import history from '~/services/history';
import api from '~/services/api';

import { Container, InputWrapper, Body } from './styles';

export default function Delivery() {
  const [deliveries, setDeliveries] = useState([]);
  const [deliveryModel, setDelivery] = useState(null);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const modalRef = React.createRef();

  const handleOpen = p => {
    setDelivery(p);
    modalRef.current.setIsComponentVisible(true);
  };

  const loadDeliveries = async () => {
    try {
      const { data } = await api.get('delivery', {
        params: { page, q: filter },
      });

      setTotalPages(Math.ceil(data.count / 7));

      setDeliveries(
        data.deliveries.map(d => ({
          ...d,
          start_date: d.start_date
            ? format(parseISO(d.start_date), 'dd/MM/yyyy')
            : null,
          end_date: d.end_date
            ? format(parseISO(d.end_date), 'dd/MM/yyyy')
            : null,
        }))
      );
    } catch (err) {
      toast.error(
        (err.response && err.response.data.error) ||
          'Erro de comunicação com o servidor'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    loadDeliveries();
  }, [page]); //eslint-disable-line

  const handleSearch = () => {
    if (page === 1) return loadDeliveries();

    return setPage(1);
  };

  const handleDelete = delivery => {
    confirmAlert({
      title: 'Confirme a exclusão',
      message: `Deseja remover a encomenda ${delivery.id} ?`,
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await api.delete(`delivery/${delivery.id}`);

              if (deliveries.length === 1 && page > 1) {
                setPage(page - 1);
                return;
              }

              if (totalPages > page) {
                console.tron.log('entrou');
                loadDeliveries();
                return;
              }

              setDeliveries(deliveries.filter(s => s.id !== delivery.id));

              toast.success('Encomenda excluida com sucesso');
            } catch (err) {
              toast.error(
                (err.response && err.response.data.error) ||
                  'Erro de comunicação com o servidor'
              );
            }
          },
        },
        {
          label: 'No',
          onClick: () => '',
        },
      ],
    });
  };

  return (
    <>
      <Container>
        {loading ? (
          <Loading type="spinner" />
        ) : (
          <>
            <h2>Gerenciando Encomendas</h2>
            <div className="header">
              <InputWrapper>
                <MdSearch size={18} color="#999" />
                <input
                  type="text"
                  placeholder="Buscar por encomendas"
                  value={filter}
                  onChange={({ target }) => setFilter(target.value)}
                  onKeyPress={e => (e.key === 'Enter' ? handleSearch() : '')}
                />
              </InputWrapper>
              <button
                className="add"
                type="button"
                onClick={() => history.push('deliveries/new')}
              >
                <MdAdd size={18} />
                <span>CADASTRAR</span>
              </button>
            </div>
            {!deliveries.length ? (
              <Empty message="Nenhuma encomenda encontrada..." />
            ) : (
              <Body>
                <Table
                  style={{ flex: 1 }}
                  data={deliveries}
                  column="deliveries"
                  handleDelete={handleDelete}
                  handleOpen={handleOpen}
                />
                {totalPages > 1 && (
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                  />
                )}
              </Body>
            )}
          </>
        )}
      </Container>
      <Modal ref={modalRef} height={350}>
        {deliveryModel ? (
          <>
            <h3>Informações da encomenda</h3>
            <div className="modal-deliveries">
              <div>
                <p>
                  {deliveryModel.recipient.street},{' '}
                  {deliveryModel.recipient.number} <br />
                  {deliveryModel.recipient.city} -{' '}
                  {deliveryModel.recipient.state} <br />
                  {deliveryModel.recipient.zip_code}
                </p>
              </div>
              <div>
                <h3>Datas</h3>
                <p>
                  <strong>Retirada:</strong>{' '}
                  {deliveryModel?.start_date || '-- / -- / --'} <br />
                  <strong>Entrega:</strong>{' '}
                  {deliveryModel?.end_date || '-- / -- / --'}
                </p>
              </div>
              <div>
                {deliveryModel.signature && (
                  <>
                    <h3>Assinatura do destinatário</h3>
                    <img src={deliveryModel?.signature?.url} alt="signature" />
                  </>
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
