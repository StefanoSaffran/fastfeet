import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import * as Yup from 'yup';

import history from '~/services/history';
import api from '~/services/api';
import Loading from '~/components/Loading';
import Input from '~/components/Unform/Input';
import ZipCodeInput from '~/components/Unform/ZipCodeInput';

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

  const handleSubmit = async data => {
    formRef.current.setErrors({});

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        street: Yup.string().required('A rua é obrigatória'),
        number: Yup.string().required('O número é obrigatório'),
        city: Yup.string().required('A cidade é obrigatória'),
        state: Yup.string().required('O estado é obrigatório'),
        zip_code: Yup.string()
          .matches(/\d{5}-\d{3}/, 'CEP inválido')
          .required('O CEP é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      setLoading(true);

      if (id) {
        await api.put(`recipients/${id}`, { ...data });

        toast.success('Destinatário atualizado com sucesso');
        history.push(`/recipients`);
      } else {
        const res = await api.post('recipients', { ...data });

        toast.success('Destinatário cadastrado com sucesso');
        history.push(`/recipients/${res.data.id}`);
      }
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
      if (err.response) {
        toast.error(
          (err.response && err.response.data.error) ||
            'Erro de comunicação com o servidor'
        );
      }
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
          <Form ref={formRef} onSubmit={handleSubmit} id="form-recipient">
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
              <ZipCodeInput
                name="zip_code"
                label="CEP"
                placeholder="09960-580"
                mask="99999-999"
              />
            </div>
          </Form>
        </>
      )}
    </Container>
  );
}
