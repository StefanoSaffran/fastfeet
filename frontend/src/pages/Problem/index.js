import React, { useState, useEffect } from 'react';

import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';

import Loading from '~/components/Loading';
import Pagination from '~/components/Pagination';
import Empty from '~/components/Empty';
import Table from '~/components/Table';
import Modal from '~/components/Modal';

import api from '~/services/api';

import { Container, Body } from './styles';

export default function Problem() {
  const [problems, setProblems] = useState([]);
  const [problem, setProblem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const modalRef = React.createRef();

  const handleOpen = p => {
    setProblem(p);
    modalRef.current.setIsComponentVisible(true);
  };

  const loadProblems = async () => {
    try {
      const { data } = await api.get('delivery/problems', {
        params: { page },
      });

      setTotalPages(Math.ceil(data.count / 7));

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

  const handleCancel = problemToCancel => {
    confirmAlert({
      title: 'Confirme o cancelamento',
      message: `Deseja cancelar a encomenda ${problemToCancel.delivery.id} ?`,
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await api.delete(
                `problem/${problemToCancel.delivery.id}/cancel-delivery`
              );
              if (problems.length === 1) {
                setPage(1);
                return;
              }

              if (totalPages > page) {
                loadProblems();
                return;
              }

              setProblems(
                problems.filter(
                  s => s.delivery.id !== problemToCancel.delivery.id
                )
              );
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
            <h2>Problemas na entrega</h2>
            {!problems.length ? (
              <Empty message="Nenhuma encomenda com problemas no momento..." />
            ) : (
              <Body>
                <Table
                  data={problems}
                  column="problems"
                  handleCancel={handleCancel}
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
