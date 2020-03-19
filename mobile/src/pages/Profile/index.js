import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';

import { signOut } from '~/store/modules/deliveryman/actions';

import Background from '~/components/Background';
import {
  Container,
  DeliverymanInfo,
  AvatarContainer,
  Avatar,
  AvatarText,
  Label,
  Name,
  Email,
  Data,
  LogoutButton,
} from './styles';

export default function Profile() {
  const profile = useSelector(state => state.deliveryman.profile);
  const dispatch = useDispatch();

  const nameInitials = !profile.avatar
    ? profile.name.split(' ').map(n => n.charAt(0).toUpperCase())
    : null;

  async function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background>
      <Container>
        <DeliverymanInfo>
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
          <Label>Nome completo</Label>
          <Name>{profile.name}</Name>
          <Label>Email</Label>
          <Email>{profile.email}</Email>
          <Label>Data de cadastro</Label>
          <Data>{format(parseISO(profile.createdAt), 'dd/MM/yyyy')}</Data>
          <LogoutButton onPress={handleLogout}>Logout</LogoutButton>
        </DeliverymanInfo>
      </Container>
    </Background>
  );
}
