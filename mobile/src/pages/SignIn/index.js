import React, { useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '../../../assets/logo.png';

import Background from '~/components/Background/BackgroundSignIn';
import { signInRequest } from '~/store/modules/deliveryman/actions';

import { Container, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const [id, setId] = useState('');

  const dispatch = useDispatch();

  const loading = useSelector(state => state.deliveryman.loading);

  const handleSubmit = () => {
    dispatch(signInRequest(id));
  };

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            autoCorrect={false}
            keyboardType="numeric"
            placeholder="Informe seu ID de cadastro"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={id}
            onChangeText={setId}
          />
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Entrar no sistema
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
