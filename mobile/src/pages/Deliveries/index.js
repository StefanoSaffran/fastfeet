import React, { useState } from 'react';
import { ActivityIndicator, Image, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { showMessage } from 'react-native-flash-message';
import { MaterialIcons as Icon } from '@expo/vector-icons';

import { signOut } from '~/store/modules/deliveryman/actions';

import api from '~/services/api';

import Background from '~/components/Background';

import {
  Container,
  Header,
  Left,
  AvatarContainer,
  Avatar,
  AvatarText,
  NameContainer,
  Greetings,
  Name,
  LogoutButton,
  Body,
  TitleContainer,
  LeftTitle,
  RightTitleContainer,
  RightTitle,
} from './styles';

export default function Deliveries() {
  const profile = useSelector(state => state.deliveryman.profile);
  const dispatch = useDispatch();
  const [delivered, setDelivered] = useState(false);

  const nameInitials = !profile.avatar
    ? profile.name.split(' ').map(n => n.charAt(0).toUpperCase())
    : null;

  const handleLogout = () => {
    dispatch(signOut());
  };

  return (
    <Background>
      <Container>
        <Header>
          <Left>
            <AvatarContainer>
              {profile?.avatar ? (
                <Avatar
                  source={{
                    uri: `http://192.168.0.185:3003/files/${profile.avatar.path}`,
                  }}
                />
              ) : (
                <AvatarText>{nameInitials}</AvatarText>
              )}
            </AvatarContainer>
            <NameContainer>
              <Greetings>Bem vindo de volta,</Greetings>
              <Name>{profile.name}</Name>
            </NameContainer>
          </Left>
          <LogoutButton onPress={handleLogout}>
            <Icon name="exit-to-app" size={30} color="#E74040" />
          </LogoutButton>
        </Header>
        <Body>
          <TitleContainer>
            <LeftTitle>Entregas</LeftTitle>
            <RightTitleContainer>
              <RightTitle
                active={!delivered}
                onPress={() => setDelivered(false)}
              >
                Pendentes
              </RightTitle>
              <RightTitle active={delivered} onPress={() => setDelivered(true)}>
                Entregues
              </RightTitle>
            </RightTitleContainer>
          </TitleContainer>
        </Body>
      </Container>
    </Background>
  );
}
