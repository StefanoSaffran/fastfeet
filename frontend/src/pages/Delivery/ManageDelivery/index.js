import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import debounce from 'debounce-promise';
// import * as Yup from 'yup';

import ReactSelect from '~/components/ReactSelect';
import Loading from '~/components/Loading';
import history from '~/services/history';
import api from '~/services/api';
import Input from '~/components/Unform/Input';
import colors from '~/styles/colors';

import { Container, Header } from './styles';

export default function ManageDelivery() {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [recipients, setRecipients] = useState([]);
  const [deliverymen, setDeliverymen] = useState([]);
  const { id } = useParams();

  const addLabelandValue = data => {
    const formattedData = data.map(d => ({
      value: d.id,
      label: d.name,
    }));

    return formattedData;
  };

  const loadDelivery = async () => {
    const { data } = await api.get(`/delivery/${id}`);

    formRef.current.setData(data);
    formRef.current.setFieldValue('recipient_id', {
      value: data.recipient.id,
      label: data.recipient.name,
    });
    formRef.current.setFieldValue('deliveryman_id', {
      value: data.deliveryman.id,
      label: data.deliveryman.name,
    });
  };

  const loadRecipients = async () => {
    const { data } = await api.get('recipients');

    const formattedData = await addLabelandValue(data);

    setRecipients(formattedData);
  };

  const loadDeliverymen = async () => {
    const { data } = await api.get('deliveryman');

    const formattedData = await addLabelandValue(data);

    setDeliverymen(formattedData);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(false);

    loadRecipients();
    loadDeliverymen();
    if (id) {
      loadDelivery();
    }
  }, [id]); //eslint-disable-line

  const getData = async (q, route) => {
    if (!q) {
      return [];
    }

    const { data } = await api.get(`${route}`, {
      params: {
        q,
      },
    });

    const formattedData = await addLabelandValue(data);
    return formattedData;
  };

  const wait = 1500; // milliseconds
  const loadOptions = (inputValue, route) => getData(inputValue, route);
  const debouncedLoadOptions = debounce(loadOptions, wait, {
    leading: true,
  });

  const handleStore = async data => {
    setLoading(true);
    try {
      const res = await api.post('delivery', { ...data });

      toast.success('Encomenda cadastrada com sucesso');
      history.push(`/deliveries/${res.data.id}`);
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
      await api.put(`delivery/${id}`, { ...data });

      toast.success('Encomenda atualizada com sucesso');
      history.push(`/deliveries`);
    } catch (err) {
      toast.error(
        (err.response && err.response.data.error) ||
          'Erro de comunicação com o servidor'
      );
    } finally {
      setLoading(false);
    }
  };

  const customStyles = {
    option: styles => ({
      ...styles,
      fontWeight: 'normal',
      marginTop: '0',
    }),
    control: (styles, state) => ({
      ...styles,
      border: `1px solid ${colors.border}`,
      boxShadow: state.isFocused && `1px solid ${colors.border}`,
      '&:hover': {
        border: `1px solid ${colors.border}`,
      },
      borderRadius: '4px',
      width: '100%',
      height: '45px',
      fontWeight: 'normal',
      marginTop: '11px',
    }),
    placeholder: styles => ({
      ...styles,
      fontWeight: 'normal',
    }),
    indicatorSeparator: styles => ({
      ...styles,
      display: 'none',
    }),
  };
  return (
    <Container>
      {loading ? (
        <Loading type="spinner" />
      ) : (
        <>
          <Header>
            <h2>{id ? 'Edição de encomendas' : 'Cadastro de encomendas'}</h2>
            <div className="form-buttons">
              <button type="button" onClick={() => history.push('/deliveries')}>
                <MdKeyboardArrowLeft size={20} color="#fff" />
                <span>VOLTAR</span>
              </button>
              <button type="submit" form="form-deliveries">
                <MdDone size={20} color="#fff" />
                <span>SALVAR</span>
              </button>
            </div>
          </Header>
          <Form
            ref={formRef}
            onSubmit={id ? handleUpdate : handleStore}
            id="form-deliveries"
          >
            <div className="select-container">
              <ReactSelect
                name="recipient_id"
                label="Destinatário"
                placeholder="Buscar Destinatário"
                defaultOptions={recipients}
                loadOptions={inputValue =>
                  debouncedLoadOptions(inputValue, 'recipients')
                }
                styles={customStyles}
              />
              <ReactSelect
                name="deliveryman_id"
                label="Entregador"
                placeholder="Buscar Entregador"
                defaultOptions={deliverymen}
                loadOptions={inputValue =>
                  debouncedLoadOptions(inputValue, 'deliveryman')
                }
                styles={customStyles}
              />
            </div>
            <Input
              name="product"
              label="Nome do produto"
              placeholder="Nome do produto"
            />
          </Form>
        </>
      )}
    </Container>
  );
}
