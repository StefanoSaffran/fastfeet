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
import AvatarInput from './AvatarInput';

import { Container, Header } from './styles';

export default function ManageDeliveryman() {
  const formRef = useRef(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const loadDeliveryman = async () => {
    try {
      const { data } = await api.get(`deliveryman/${id}`);

      formRef.current.setData(data);
      formRef.current.setFieldValue('avatar', data.avatar?.url);
    } catch (err) {
      toast.error(
        (err.response && err.response.data.error) ||
          'Erro de comunicação com o servidor'
      );
    }
  };

  useEffect(() => {
    if (id) {
      loadDeliveryman();
    }
  }, [id]); //eslint-disable-line

  const handleAvatar = async avatar => {
    const data = new FormData();

    data.append('file', avatar);

    const res = await api.post('files', data);

    return res.data;
  };

  const handleSubmit = async data => {
    formRef.current.setErrors({});

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string().required('O email é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      let avatar = null;
      if (data.avatar) {
        avatar = await handleAvatar(data.avatar);
      }

      setLoading(true);

      if (id) {
        await api.put(`deliveryman/${id}`, {
          name: data?.name,
          email: data?.email,
          avatar_id: avatar?.id ?? undefined,
        });

        toast.success('Entregador atualizado com sucesso');
        history.push(`/deliveryman`);
      } else {
        const res = await api.post('deliveryman', {
          name: data?.name,
          email: data?.email,
          avatar_id: avatar?.id ?? undefined,
        });

        toast.success('Entregador cadastrado com sucesso');
        history.push(`/deliveryman/${res.data.id}`);
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
              {id ? 'Edição de entregadores' : 'Cadastro de entregadores'}
            </h2>
            <div className="form-buttons">
              <button
                type="button"
                onClick={() => history.push('/deliveryman')}
              >
                <MdKeyboardArrowLeft size={20} color="#fff" />
                <span>VOLTAR</span>
              </button>
              <button type="submit" form="form-deliveryman">
                <MdDone size={20} color="#fff" />
                <span>SALVAR</span>
              </button>
            </div>
          </Header>
          <Form ref={formRef} onSubmit={handleSubmit} id="form-deliveryman">
            <AvatarInput name="avatar" />
            <Input name="name" label="Nome" placeholder="Nome completo" />
            <Input
              name="email"
              label="Email"
              type="email"
              placeholder="Email"
            />
          </Form>
        </>
      )}
    </Container>
  );
}
