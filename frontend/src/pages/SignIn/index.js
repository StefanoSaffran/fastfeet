import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import Loading from '~/components/Loading';
import Input from '~/components/Unform/Input';

import logo from '~/assets/logo.png';

export default function SignIn() {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const handleSubmit = async data => {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Insira um e-mail válido')
          .required('O e-mail é obrigatório'),
        password: Yup.string().required('A senha é obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { email, password } = data;
      dispatch(signInRequest(email, password));
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  };

  return (
    <>
      <img src={logo} alt="FastFeet" />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="email"
          label="SEU E-MAIL"
          type="email"
          placeholder="exemplo@email.com"
        />
        <Input
          name="password"
          label="SUA SENHA"
          type="password"
          placeholder="***********"
        />

        <button type="submit">
          {loading ? <Loading /> : 'Entrar no sistema'}
        </button>
      </Form>
    </>
  );
}
