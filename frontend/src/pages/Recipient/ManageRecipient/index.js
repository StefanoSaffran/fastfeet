import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';

import history from '~/services/history';
import api from '~/services/api';
import Loading from '~/components/Loading';
import Input from '~/components/Unform/Input';

import { Container, Header } from './styles';

export default function ManageRecipient() {
  const formRef = useRef(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const loadRecipient = async () => {
    try {
      const { data } = await api.get(`recipients/${id}`);

      formRef.current.setData(data);
    } catch (err) {
      toast.error(
        (err.response && err.response.data.error) ||
          'Erro de comunicação com o servidor'
      );
    }
  };
  useEffect(() => {
    if (id) {
      loadRecipient();
    }
    }, [id]); //eslint-disable-line

  const handleStore = async data => {
    setLoading(true);
    try {
      const res = await api.post('recipients', { ...data });

      toast.success('Destinatário cadastrado com sucesso');
      history.push(`/recipients/${res.data.id}`);
    } catch (err) {
      toast.error(
        (err.response && err.response.data.error) ||
          'Erro de comunicação com o servidor'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async data => {
    setLoading(true);
    try {
      await api.put(`recipients/${id}`, { ...data });

      toast.success('Destinatário atualizado com sucesso');
      history.push(`/recipients`);
    } catch (err) {
      toast.error(
        (err.response && err.response.data.error) ||
          'Erro de comunicação com o servidor'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {loading ? (
        <Loading type="spinner" />
      ) : (
        <>
          <Header>
            <h2>
              {id ? 'Edição de destinatário' : 'Cadastro de destinatário'}
            </h2>
            <div className="form-buttons">
              <button type="button" onClick={() => history.push('/recipients')}>
                <MdKeyboardArrowLeft size={20} color="#fff" />
                <span>VOLTAR</span>
              </button>
              <button type="submit" form="form-recipient">
                <MdDone size={20} color="#fff" />
                <span>SALVAR</span>
              </button>
            </div>
          </Header>
          <Form
            ref={formRef}
            onSubmit={id ? handleUpdate : handleStore}
            id="form-recipient"
          >
            <Input name="name" label="Nome" placeholder="Nome completo" />
            <div className="address-second-line">
              <Input name="street" label="Rua" placeholder="Rua Beethoven" />
              <Input
                name="number"
                type="number"
                label="Número"
                placeholder="1729"
              />
              <Input name="address_details" label="Complemento" />
            </div>
            <div className="address-third-line">
              <Input name="city" label="Cidade" placeholder="Diadema" />
              <Input name="state" label="Estado" placeholder="SP" />
              <Input name="zip_code" label="CEP" placeholder="09960-580" />
            </div>
          </Form>
        </>
      )}
    </Container>
  );
}
