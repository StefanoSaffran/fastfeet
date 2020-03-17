import React, { useState, useEffect } from 'react';

import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { MdAdd, MdSearch } from 'react-icons/md';

import Loading from '~/components/Loading';
import Table from '~/components/Table';
import history from '~/services/history';
import api from '~/services/api';

import { Container, InputWrapper } from './styles';

export default function Recipient() {
  const [recipients, setRecipients] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const loadRecipients = async () => {
    try {
      const { data } = await api.get('recipients', {
        params: { page, q: filter },
      });
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
              toast.success('Destinatário excluido com sucesso');
              setPage(recipients.length === 1 && page > 1 ? page - 1 : page);
              setRecipients(recipients.filter(s => s.id !== recipient.id));
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
            <p>Nenhum destinatário encontrado...</p>
          ) : (
            <>
              <Table
                data={recipients}
                column="recipients"
                handleDelete={handleDelete}
              />
            </>
          )}
        </>
      )}
    </Container>
  );
}
