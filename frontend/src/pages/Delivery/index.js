import React, { useState, useEffect } from 'react';

import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { MdAdd, MdSearch } from 'react-icons/md';
import { format, parseISO } from 'date-fns';

import Loading from '~/components/Loading';
import Table from '~/components/Table';
import history from '~/services/history';
import api from '~/services/api';

import { Container, InputWrapper } from './styles';

export default function Delivery() {
  const [deliveries, setDeliveries] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const loadDeliveries = async () => {
    try {
      const { data } = await api.get('delivery', {
        params: { page, q: filter },
      });

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
              toast.success('Encomenda excluida com sucesso');
              setPage(deliveries.length === 1 && page > 1 ? page - 1 : page);
              setDeliveries(deliveries.filter(s => s.id !== delivery.id));
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
            <p>Nenhuma encomenda encontrada...</p>
          ) : (
            <>
              <Table
                data={deliveries}
                column="deliveries"
                handleDelete={handleDelete}
              />
            </>
          )}
        </>
      )}
    </Container>
  );
}
