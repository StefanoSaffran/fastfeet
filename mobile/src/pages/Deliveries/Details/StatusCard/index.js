import React from 'react';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { format, parseISO } from 'date-fns';

import {
  Container,
  Header,
  HeaderTitle,
  Label,
  Text,
  DateContainer,
  Left,
  Right,
} from './styles';

export default function StatusCard({ delivery }) {
  const startDate = delivery?.start_date
    ? format(parseISO(delivery.start_date), 'dd / MM / yyyy')
    : '- - / - - / - -';

  const endDate = delivery?.end_date
    ? format(parseISO(delivery.end_date), 'dd / MM / yyyy')
    : '- - / - - / - -';

  const status =
    delivery?.status === 'Pending'
      ? 'Pendente'
      : delivery?.status === 'Withdrawal'
      ? 'Retirada'
      : 'Entregue';

  return (
    <Container>
      <Header>
        <Icon name="event" color="#7D40E7" size={27} />
        <HeaderTitle>Informações da entrega</HeaderTitle>
      </Header>
      <Label>Status</Label>
      <Text>{status}</Text>
      <DateContainer>
        <Left>
          <Label>data de retirada</Label>
          <Text>{startDate}</Text>
        </Left>
        <Right>
          <Label>data de entrega</Label>
          <Text>{endDate}</Text>
        </Right>
      </DateContainer>
    </Container>
  );
}
