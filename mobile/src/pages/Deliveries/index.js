import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { showMessage } from 'react-native-flash-message';
import { MaterialIcons as Icon } from '@expo/vector-icons';

import { signOut } from '~/store/modules/deliveryman/actions';

import api from '~/services/api';

import Background from '~/components/Background';
import DeliveryCard from '~/components/DeliveryCard';

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
  RightViewButton,
  RightTitle,
  DeliveryList,
} from './styles';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [delivered, setDelivered] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const profile = useSelector(state => state.deliveryman.profile);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const loadDeliveries = async () => {
    try {
      const { data } = await api.get(`deliveryman/${profile.id}/deliveries`, {
        params: { page, delivered },
      });

      setDeliveries(
        page > 1 ? [...deliveries, ...data.deliveries] : data.deliveries
      );
      setTotalPages(Math.ceil(data.count / 10));
    } catch (err) {
      showMessage({
        message: 'Falha ao buscar encomendas',
        description: err.response
          ? err.response.data.error
          : 'Erro de conexão com o servidor',
        type: 'info',
      });
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadDeliveries();
    }
  }, [isFocused, delivered]); // eslint-disable-line

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
              <RightViewButton
                active={!delivered}
                onPress={() => setDelivered(false)}
              >
                <RightTitle active={!delivered}>Pendentes</RightTitle>
              </RightViewButton>
              <RightViewButton
                active={delivered}
                onPress={() => setDelivered(true)}
              >
                <RightTitle active={delivered}>Entregues</RightTitle>
              </RightViewButton>
            </RightTitleContainer>
          </TitleContainer>
          {loading && page === 1 ? (
            <ActivityIndicator color="#ee4e62" size={30} />
          ) : (
            <DeliveryList
              data={deliveries}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => <DeliveryCard delivery={item} />}
            />
          )}
          {loading && page !== 1 && (
            <ActivityIndicator color="#ee4e62" size={30} />
          )}
        </Body>
      </Container>
    </Background>
  );
}
