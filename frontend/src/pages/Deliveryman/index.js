import React, { useState, useEffect } from 'react';

import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { MdAdd, MdSearch } from 'react-icons/md';

import Loading from '~/components/Loading';
import Pagination from '~/components/Pagination';
import Empty from '~/components/Empty';
import Table from '~/components/Table';

import history from '~/services/history';
import api from '~/services/api';

import { Container, InputWrapper, Body } from './styles';

export default function Deliveryman() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadDeliverymen = async () => {
    try {
      const { data } = await api.get('deliveryman', {
        params: { page, q: filter },
      });

      setTotalPages(Math.ceil(data.count / 7));

      setDeliverymen(data.deliverymen);
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
    loadDeliverymen();
  }, [page]); //eslint-disable-line

  const handleSearch = () => {
    if (page === 1) return loadDeliverymen();

    return setPage(1);
  };

  const handleDelete = deliveryman => {
    confirmAlert({
      title: 'Confirme a exclusão',
      message: `Deseja remover o entregador ${deliveryman.name} ?`,
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await api.delete(`deliveryman/${deliveryman.id}`);
              if (deliverymen.length === 1) {
                setPage(1);
                return;
              }

              if (totalPages > page) {
                loadDeliverymen();
                return;
              }

              setDeliverymen(deliverymen.filter(s => s.id !== deliveryman.id));

              toast.success('Entregador excluido com sucesso');
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
    <Container>
      {loading ? (
        <Loading type="spinner" />
      ) : (
        <>
          <h2>Gerenciando entregadores</h2>
          <div className="header">
            <InputWrapper>
              <MdSearch size={18} color="#999" />
              <input
                type="text"
                placeholder="Buscar por entregadores"
                value={filter}
                onChange={({ target }) => setFilter(target.value)}
                onKeyPress={e => (e.key === 'Enter' ? handleSearch() : '')}
              />
            </InputWrapper>
            <button
              className="add"
              type="button"
              onClick={() => history.push('deliveryman/new')}
            >
              <MdAdd size={18} />
              <span>CADASTRAR</span>
            </button>
          </div>
          {!deliverymen.length ? (
            <Empty message="Nenhum entregador encontrado..." />
          ) : (
            <Body>
              <Table
                data={deliverymen}
                column="deliverymen"
                handleDelete={handleDelete}
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
  );
}
