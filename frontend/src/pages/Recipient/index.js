import React, { useState, useEffect } from 'react';

import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { MdAdd, MdSearch } from 'react-icons/md';

import Loading from '~/components/Loading';
import Pagination from '~/components/Pagination';
import Table from '~/components/Table';
import Empty from '~/components/Empty';

import history from '~/services/history';
import api from '~/services/api';

import { Container, InputWrapper, Body } from './styles';

export default function Recipient() {
  const [recipients, setRecipients] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadRecipients = async () => {
    try {
      const { data } = await api.get('recipients', {
        params: { page, q: filter },
      });

      setTotalPages(Math.ceil(data.count / 7));

      setRecipients(data.recipients);
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
    loadRecipients();
  }, [page]); //eslint-disable-line

  const handleSearch = () => {
    if (page === 1) return loadRecipients();

    return setPage(1);
  };

  const handleDelete = recipient => {
    confirmAlert({
      title: 'Confirme a exclusão',
      message: `Deseja remover o destinatário ${recipient.name} ?`,
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await api.delete(`recipients/${recipient.id}`);

              if (recipients.length === 1 && page > 1) {
                setPage(page - 1);
                return;
              }

              if (totalPages > page) {
                loadRecipients();
                return;
              }

              setRecipients(recipients.filter(s => s.id !== recipient.id));

              toast.success('Destinatário excluido com sucesso');
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
          <h2>Gerenciando destinatários</h2>
          <div className="header">
            <InputWrapper>
              <MdSearch size={18} color="#999" />
              <input
                type="text"
                placeholder="Buscar por destinatários"
                value={filter}
                onChange={({ target }) => setFilter(target.value)}
                onKeyPress={e => (e.key === 'Enter' ? handleSearch() : '')}
              />
            </InputWrapper>
            <button
              className="add"
              type="button"
              onClick={() => history.push('recipients/new')}
            >
              <MdAdd size={18} />
              <span>CADASTRAR</span>
            </button>
          </div>
          {!recipients.length ? (
            <Empty message="Nenhum destinatário encontrado..." />
          ) : (
            <Body>
              <Table
                data={recipients}
                column="recipients"
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
