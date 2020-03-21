import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { format, parseISO } from 'date-fns';

import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import {
  Container,
  Header,
  Delivery,
  Body,
  Slider,
  ProgressStage,
  Circle,
  ProgressContainer,
  ProgressText,
  Footer,
  DateContainer,
  Text,
  Label,
  CityContainer,
  DetailsButton,
  DetailsButtonText,
} from './styles';

export default function DeliveryCard({ delivery }) {
  const navigation = useNavigation();

  return (
    <Container>
      <Header>
        <Icon name="truck" color="#7D40E7" size={27} />
        <Delivery>Encomenda {delivery.id}</Delivery>
      </Header>
      <Body>
        <Slider />
        <ProgressContainer>
          <ProgressStage>
            <Circle reached />
          </ProgressStage>
          <ProgressStage>
            <Circle reached={delivery?.start_date} />
          </ProgressStage>
          <ProgressStage>
            <Circle reached={delivery?.end_date} last />
          </ProgressStage>
        </ProgressContainer>
        <ProgressContainer>
          <ProgressStage>
            <ProgressText custom>Aguardando Retirada</ProgressText>
          </ProgressStage>
          <ProgressStage>
            <ProgressText>Retirada</ProgressText>
          </ProgressStage>
          <ProgressStage>
            <ProgressText custom>Entregue</ProgressText>
          </ProgressStage>
        </ProgressContainer>
      </Body>
      <Footer>
        <DateContainer>
          <Label>Data</Label>
          <Text>{format(parseISO(delivery.createdAt), 'dd/MM/yyyy')}</Text>
        </DateContainer>
        <CityContainer>
          <Label>Cidade</Label>
          <Text>{delivery.recipient.city}</Text>
        </CityContainer>
        <DetailsButton>
          <DetailsButtonText
            onPress={() => navigation.navigate('Details', { delivery })}
          >
            Ver detalhes
          </DetailsButtonText>
        </DetailsButton>
      </Footer>
    </Container>
  );
}
