import React, { useState, useEffect } from 'react';

import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';

import Loading from '~/components/Loading';
import Table from '~/components/Table';
import api from '~/services/api';

import { Container } from './styles';

export default function Problem() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const loadProblems = async () => {
    try {
      const { data } = await api.get('delivery/problems', {
        params: { page },
      });
      setProblems(data);
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
    loadProblems();
  }, [page]); //eslint-disable-line

  const handleCancel = problem => {
    confirmAlert({
      title: 'Confirme o cancelamento',
      message: `Deseja cancelar a encomenda ${problem.delivery.id} ?`,
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await api.delete(
                `problem/${problem.delivery.id}/cancel-delivery`
              );
              toast.success('Encomenda excluida com sucesso');
              setPage(problems.length === 1 && page > 1 ? page - 1 : page);
              setProblems(
                problems.filter(s => s.delivery.id !== problem.delivery.id)
              );
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
          <h2>Problemas na entrega</h2>
          {!problems.length ? (
            <p>Nenhum problema encontrado...</p>
          ) : (
            <>
              <Table
                data={problems}
                column="problems"
                handleCancel={handleCancel}
              />
            </>
          )}
        </>
      )}
    </Container>
  );
}
