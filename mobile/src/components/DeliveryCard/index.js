import React from 'react';
import { useNavigation } from '@react-navigation/native';

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
        <Delivery>Encomenda 01</Delivery>
      </Header>
      <Body>
        <Slider />
        <ProgressContainer>
          <ProgressStage>
            <Circle reached />
          </ProgressStage>
          <ProgressStage>
            <Circle reached />
          </ProgressStage>
          <ProgressStage>
            <Circle reached={false} last />
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
          <Text>14/01/2020</Text>
        </DateContainer>
        <CityContainer>
          <Label>Cidade</Label>
          <Text>Diadema</Text>
        </CityContainer>
        <DetailsButton>
          <DetailsButtonText onPress={() => navigation.navigate('Details')}>
            Ver detalhes
          </DetailsButtonText>
        </DetailsButton>
      </Footer>
    </Container>
  );
}
